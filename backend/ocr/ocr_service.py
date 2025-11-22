import os
import cv2
import numpy as np
from PIL import Image
import pytesseract    
import re   
import json



def preprocess_receipt_image(image_path, save_debug=False, debug_path="debug_preprocessed.png"):
    """
    MUCH BETTER preprocessing using OpenCV adaptive thresholding.
    Preserves tiny text, improves line clarity.
    """

    # Load in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    if img is None:
        raise FileNotFoundError(f"Failed to load: {image_path}")

    # 1) Denoise lightly
    img = cv2.fastNlMeansDenoising(img, h=10)

    # 2) Adaptive threshold (keeps fine detail!!)
    img = cv2.adaptiveThreshold(
        img,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,  # block size
        9    # constant subtracted — adjust if needed
    )

    # 3) Upscale for better OCR
    img = cv2.resize(img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)

    # Save debug image
    if save_debug:
        cv2.imwrite(debug_path, img)

    # Convert back to PIL for pytesseract
    return Image.fromarray(img)


# ---------------- OCR WRAPPERS ---------------- #

def extract_text_from_image(image_path):
    """
    Extract raw text from an image file using Tesseract OCR with
    receipt-friendly defaults.
    """
    img = preprocess_receipt_image(image_path, save_debug=False)

    # LSTM engine, treat as a block of text, English, keep spaces, set DPI
    config = (
        "--oem 1 "
        "--psm 6 "
        "-l eng "
        "-c preserve_interword_spaces=1 "
        "-c user_defined_dpi=300"
    )

    text = pytesseract.image_to_string(img, config=config)
    return text


def extract_text_with_config(image_path, config=""):
    """
    Extract text from an image file using Tesseract OCR with custom config,
    still using the same preprocessing pipeline.
    """
    img = preprocess_receipt_image(image_path, save_debug=False)

    if not config:
        config = (
            "--oem 1 "
            "--psm 6 "
            "-l eng "
            "-c preserve_interword_spaces=1 "
            "-c user_defined_dpi=300"
        )

    text = pytesseract.image_to_string(img, config=config)
    return text


# ---------------- PARSING HELPERS ---------------- #

def _guess_store_name(lines):
    """
    Generic store name guess: look at first few lines and pick the most
    letter-heavy line; normalize common big chains but keep it generic.
    """
    candidates = []
    for i, ln in enumerate(lines[:8]):
        # keep lines with at least 3 letters
        letters = re.findall(r"[A-Za-z]", ln)
        if len(letters) >= 3:
            candidates.append((len(letters), ln))

    if not candidates:
        return None

    # pick line with most letters
    _, best = max(candidates, key=lambda x: x[0])
    up = best.upper()

    # normalize some common store names, but still generic
    if "SAVE MONEY" in up and "LIVE BETTER" in up:
        return "WALMART"
    if "WALMART" in up or "WAL MART" in up or "ALMART" in up:
        return "WALMART"
    if "TARGET" in up:
        return "TARGET"
    if "COSTCO" in up:
        return "COSTCO"
    if "KROGER" in up:
        return "KROGER"
    if "PUBLIX" in up:
        return "PUBLIX"
    if "ALDI" in up:
        return "ALDI"
    if "SAFEWAY" in up:
        return "SAFEWAY"
    if "TRADER JOE" in up:
        return "TRADER JOE'S"
    if "WHOLE FOODS" in up or "WHOLEFOODS" in up:
        return "WHOLE FOODS"

    # fallback: cleaned version of the best line
    cleaned = re.sub(r"[^A-Z0-9 &']", " ", up)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned or None


# ---------------- RECEIPT PARSER (GENERIC) ---------------- #
def clean_item_name(name: str) -> str:
    """
    Clean an OCR item name by stripping barcode fragments, numeric clusters,
    and single-letter / common flag tokens. Generic for grocery receipts.
    """
    tokens = name.split()
    cleaned_tokens = []

    COMMON_FLAGS = {"LB", "IB", "PK", "PC", "EA", "CS"}

    for tok in tokens:
        up = tok.upper()

        # Pure numbers (barcode fragments)
        if up.isdigit():
            continue

        # Mostly digits (e.g. '00D82', '3A0700D82')
        digit_ratio = sum(c.isdigit() for c in up) / len(up)
        if digit_ratio > 0.6:
            continue

        # Single-letter flags
        if len(up) == 1 and up.isalpha():
            continue

        # Common 2-letter grocery flags like LB, IB, PK, etc.
        if up in COMMON_FLAGS:
            continue

        cleaned_tokens.append(tok)

    cleaned = " ".join(cleaned_tokens).strip()
    return cleaned if cleaned else name
def looks_like_real_item_name(name: str) -> bool:
    """
    Heuristic filter: keep names that look like actual item descriptions.
    - Must contain at least one word with 3+ letters.
    - Reject lines where all alpha words are very short (like 'LB IB', 'IB DP').
    """
    if not name:
        return False

    words = name.split()
    alpha_words = [
        re.sub(r"[^A-Za-z]", "", w)
        for w in words
        if re.sub(r"[^A-Za-z]", "", w)
    ]

    if not alpha_words:
        return False

    # At least one word with 3+ letters → looks like a product
    if not any(len(w) >= 3 for w in alpha_words):
        return False

    # If ALL words are <=2 letters (LB, IB, DP...), it's junk
    if all(len(w) <= 2 for w in alpha_words):
        return False

    return True

def parse_receipt_text(raw_text):
    """
    Parse raw OCR-ed grocery receipt text into structured data:

    {
      "store": "WALMART",
      "phone": "251-633-2211",
      "items": [
          {"name": "BANANAS", "price": 1.41},
          ...
      ],
      "subtotal": float | None,
      "tax": float | None,
      "total": float | None
    }
    """
    lines = [ln.strip() for ln in raw_text.splitlines() if ln.strip()]
    result = {
        "store": None,
        "phone": None,
        "items": [],
        "subtotal": None,
        "tax": None,
        "total": None,
    }

    if not lines:
        return result

    # -------- STORE NAME (GENERIC) -------- #
    store = _guess_store_name(lines)
    if store:
        result["store"] = store
    else:
        # fallback: first line cleaned
        up = lines[0].upper()
        result["store"] = re.sub(r"[^A-Z0-9 &']", " ", up).strip()

    # -------- PHONE NUMBER (HEADER AREA, NO LEADING 0) -------- #
    loose_phone_re = re.compile(r"(\d{3}\D?\d{3}\D?\d{4})")
    for idx, ln in enumerate(lines):
        if idx > 10:  # only search near top
            break
        m = loose_phone_re.search(ln)
        if not m:
            continue
        digits = re.sub(r"\D", "", m.group(1))
        if len(digits) != 10:
            continue
        if digits[0] == "0" or len(set(digits)) < 3:
            # ignore stuff like 0000000404
            continue
        result["phone"] = f"{digits[0:3]}-{digits[3:6]}-{digits[6:]}"
        break

    # -------- ITEMS + TOTALS -------- #
    subtotal_candidates = []
    tax_candidates = []
    total_candidates = []
    all_prices = []  # all prices seen anywhere on the receipt

    ignore_words = (
        "SUBTOTAL", "SUB-TOTAL", "SUB TOTAL", "SUB TUT", "SUBTUT",
        "TAX", "VAT",
        "TOTAL", "AMOUNT DUE", "BALANCE", "BALANCE DUE",
        "CHANGE", "CASH", "TEND", "TENDER",
        "CARD", "VISA", "MASTERCARD", "AMEX", "DISCOVER",
        "APPROVAL", "AUTH", "DEBIT", "CREDIT"
    )

    for ln in lines:
        up = ln.upper()
        norm_ln = ln.replace(",", ".")  # in case commas used as decimal sep

        price_matches = list(re.finditer(r"(\d+\.\d{2})", norm_ln))
        if not price_matches:
            continue

        # collect every price for later fallback logic
        for m in price_matches:
            try:
                all_prices.append(float(m.group(1)))
            except ValueError:
                pass

        last_match = price_matches[-1]
        try:
            price = float(last_match.group(1))
        except ValueError:
            continue

        flat = up.replace(" ", "")

        # ---- classify totals/subtotals/tax via keywords ---- #
        if "TAX" in up or "VAT" in up:
            tax_candidates.append(price)
            continue

        if ("SUBTOTAL" in flat or
            "SUBTOT" in flat or
            ("SUB" in flat and "TOT" in flat)):
            subtotal_candidates.append(price)
            continue

        if ("TOTAL" in up or
            "AMOUNTDUE" in flat or
            "BALANCEDUE" in flat):
            total_candidates.append(price)
            continue

        # ---- treat as line item if it has letters and isn't clearly payment/total ---- #
        if re.search(r"[A-Za-z]", ln) and not any(word in up for word in ignore_words):
            name_part = norm_ln[: last_match.start()]
            name_clean = re.sub(r"[^A-Za-z0-9 &']", " ", name_part)
            name_clean = re.sub(r"\s+", " ", name_clean).strip().upper()

            if name_clean:
                name_clean = clean_item_name(name_clean)

                # NEW: skip junk lines like 'LB IB', 'IB DP', 'IB'
                if not looks_like_real_item_name(name_clean):
                    continue

                result["items"].append({"name": name_clean, "price": price})



    # -------- PRIMARY TOTALS FROM KEYWORDS -------- #
    if subtotal_candidates:
        result["subtotal"] = max(subtotal_candidates)
    if tax_candidates:
        result["tax"] = max(tax_candidates)
    if total_candidates:
        result["total"] = max(total_candidates)

    # track if subtotal came from items only
    subtotal_inferred = False

    # 1) If we have items but no subtotal, use sum of item prices.
    if result["items"] and result["subtotal"] is None:
        result["subtotal"] = round(sum(item["price"] for item in result["items"]), 2)
        subtotal_inferred = True

    # 2) If we have prices and a subtotal but no total:
    if all_prices and result["total"] is None and result["subtotal"] is not None:
        candidates = [p for p in all_prices if p >= result["subtotal"]]
        if candidates:
            result["total"] = min(candidates)
        else:
            if subtotal_inferred:
                result["total"] = result["subtotal"]
            else:
                result["total"] = max(all_prices)

    # 3) If we have subtotal and total but no tax, infer it.
    if result["subtotal"] is not None and result["total"] is not None and result["tax"] is None:
        inferred_tax = round(result["total"] - result["subtotal"], 2)
        if inferred_tax >= 0:
            result["tax"] = inferred_tax

    return result


# ---------------- CLI TEST ENTRYPOINT ---------------- #

if __name__ == "__main__":
    # Change this to your own image when testing
    test_image = "test_image.png"

    if os.path.exists(test_image):
        raw_text = extract_text_from_image(test_image)
        receipt_data = parse_receipt_text(raw_text)
        print(json.dumps(receipt_data, indent=2))
    else:
        print(f"Please add a test image named '{test_image}' to test the OCR service.")