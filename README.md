# 🚀 GettKids Hub

A kids-friendly app download hub — all your Android, iOS, and Web apps in one place!

## Features

- 🤖 **Android** / 🍎 **iOS** / 🌐 **Web** categories
- 📚 **Educational** & 🎮 **Fun** subcategories
- 🌙 Dark, kid-friendly theme with playful design
- 🇮🇱 Hebrew + 🇺🇸 English with full RTL support
- 📱 Mobile-first responsive design
- 📦 APK/IPA files hosted directly in the repo

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/GettKidsHub/](http://localhost:5173/GettKidsHub/)

**Official URL: https://talsurizon.github.io/GettKidsHub/**

## Adding a New App

1. Edit `src/data/apps.json`
2. Add an entry following this structure:

```json
{
  "id": "my-app",
  "name": { "en": "My App", "he": "האפליקציה שלי" },
  "description": { "en": "A short description", "he": "תיאור קצר" },
  "category": "android",
  "subcategory": "fun",
  "icon": "my-app",
  "downloadUrl": "/apps/android/my-app.apk",
  "version": "1.0.0"
}
```

3. Place the installation file in `public/apps/android/` (or `ios/`)
4. For web apps, set `downloadUrl` to the full URL and `category` to `"web"`
5. Add an emoji icon mapping in `src/components/AppCard.jsx` → `iconMap`

## Deployment

Automatically deployed to GitHub Pages on push to `main` via GitHub Actions.

To deploy manually:
```bash
npm run build
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- react-i18next
- React Router (Hash Router)
