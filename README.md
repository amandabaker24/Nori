# Nori – AI Kitchen Assistant
Nori is an intelligent, privacy-focused kitchen assistant designed to help users manage their pantry, track ingredients, plan meals, and interact naturally through voice commands.
Nori uses local LLMs, OCR, speech-to-text, and computer vision to provide a seamless cooking and pantry management experience—all running securely on local hardware.
## Key Features
### Pantry Tracking
Automatically identifies items using OCR + image classification.
### Recipe Suggestions
Personalized recommendations based on dietary preferences and inventory.
### Voice Interaction
Local Whisper.cpp for STT + TTS for natural dialogue.
No cloud storage required
All processing and data remain encrypted and local.
### Receipt Scanning
Add items instantly by snapping a photo of a grocery receipt.
### Smart Alerts
Low-stock and expiration detection.
## Technologies Used
### Frontend
React.js
Custom CSS (touch-optimized)
Responsive 1280×800 layout for tablet displays
Backend
Django or FastAPI
SQLite (encrypted)
AI & ML
Whisper.cpp (local speech recognition)
Tesseract OCR
Llama 3.2 (local intent + conversation)
Computer Vision for pantry detection
