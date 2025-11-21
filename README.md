<div align="center">
  <img src="frontend/public/noriLogo.png" alt="savr.ai" width="200" />
</div>

---

## Project Overview 
**Nori** is an intelligent, privacy-focused kitchen assistant designed to help users manage their pantry, track ingredients, plan meals, and interact naturally through voice commands.
Nori uses local LLMs, OCR, speech-to-text, and computer vision to provide a seamless cooking and pantry management experience—all running securely on local hardware.
## Key Features
- Pantry Tracking
- Recipe Suggestions
- Local Whisper.cpp for STT + TTS for natural dialogue.
- Receipt Scanning
- Adds grocery items to Kroger cart
  
---

## Tech Stack & Backend Services
### Frontend
![React](https://skillicons.dev/icons?i=react)
### Backend
![Postgresql](https://skillicons.dev/icons?i=postgres)
![Django](https://skillicons.dev/icons?i=django)
### AI & ML
* Whisper.cpp (local speech recognition)
* Tesseract OCR
* Llama 3.2 (local intent + conversation)

--- 

## Architecture 
### High-Level Flow:
1. User interacts with Nori
   - Voice input
   - Touch input

2. Speech → Text
   - Whisper / ASR engine transcribes audio

3. Intent Processing
   - Detects actions (view pantry, get recipes, etc.)

4. Backend Actions
   - Pantry API
     - fetch items
     - update items
   - Recipe Engine
     - match meals
     - filter allergies

---
### Repository Structure
```
nori/
├── frontend/                          # React (Vite) touchscreen UI
│   ├── src/
│   │   ├── pages/                     # Dashboard, Pantry, Recipes, Meal Planner
│   │   ├── components/                # Reusable UI components (Cards, Widgets, Modals)
│   │   ├── services/                  # API calls to Django backend
│   │   ├── context/                   # Global state (PantryContext, AuthContext)
│   │   └── hooks/                     # Custom hooks (usePantry, useRecipes)
│   └── public/                        # Static assets (logo, icons)
│
├── backend/                           # Django REST API + Local AI pipeline
│   ├── nori_backend/
│   │   ├── settings/                  # Environment, DB, and service configs
│   │   ├── models/                    # Ingredient, PantryItem, UserPreferences
│   │   ├── views/                     # REST endpoints
│   │   ├── serializers/               # Model → JSON transformation
│   │   ├── ocr/                       # Tesseract OCR + preprocessing
│   │   ├── llm/                       # Local Llama 3.2 (Ollama) classification
│   │   └── utils/                     # Helpers for parsing, categorizing, expiration lookup
│   └── media/                         # User-uploaded receipt images
│
├── local_ai/                          # Optional: fully offline AI stack
│   ├── whisper/                       # whisper.cpp for voice → text
│   ├── tesseract/                     # OCR binaries / configs
│   └── llama/                         # Local model weights for classification
│
├── raspi/                             # Raspberry Pi touchscreen environment
│   ├── kiosk/                         # Auto-boot kiosk mode
│   ├── camera/                        # Receipt capture service
│   └── startup/                       # Systemd services for auto-launch
│
└── infra/                             # Deployment / setup
    ├── scripts/                       # Installation, migration, setup scripts
    └── config/                        # Environment variables, secrets templates
```
---

## Mockups 
<img width="512" height="372" alt="image" src="https://github.com/user-attachments/assets/6436850c-e194-4548-9375-dd496bd0963e" />
<img width="512" height="372" alt="image" src="https://github.com/user-attachments/assets/3c495c8d-5d00-435e-81f3-eac597b02358" />
