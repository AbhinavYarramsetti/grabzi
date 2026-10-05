# GrabZi

**GrabZi** is an AI-assisted food rescue platform that turns surplus food into an engaging treasure hunt. Users can discover nearby deals, solve puzzles, claim discounted food, and track their contribution to reducing food waste.

## 🚀 Live Demo

### [**Try GrabZi Online →**](https://grabzi-five.vercel.app/)

No installation required. Open the link above in your browser and start exploring GrabZi.

## ✨ Features

* **Nearby Food Deals** — Discover active deals based on your location.
* **Personalized Recommendations** — Get AI-assisted deal recommendations based on user preferences.
* **Puzzle-Based Deal Discovery** — Make food rescue more engaging through an interactive deal-claiming experience.
* **Deal Categories** — Browse nearby, popular, and expiring-soon deals.
* **User Authentication** — Sign up and log in securely using Firebase Authentication.
* **Deal Claiming** — Claim available deals and receive a unique redemption code.
* **Profile & History** — Track claimed deals and mark redeemed deals as used.
* **Leaderboard** — Compete with other food rescuers and track points.
* **Location-Based Discovery** — Find relevant deals within a defined radius.

## 🛠️ Tech Stack

* **Frontend:** Next.js 15, React, TypeScript
* **Styling:** Tailwind CSS, shadcn/ui
* **Backend & Database:** Firebase / Firestore
* **Authentication:** Firebase Authentication
* **AI:** Genkit with Google GenAI
* **Deployment:** Vercel

## 💻 Run Locally

### Prerequisites

* Node.js
* npm

### 1. Clone the repository

```bash
git clone https://github.com/AbhinavYarramsetti/grabzi.git
cd grabzi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your local development setup.

> **Important:** Never commit `.env` or other files containing private credentials to GitHub.

### 4. Start the development server

```bash
npm run dev
```

GrabZi will be available at:

```text
http://localhost:9002
```

## 📁 Project Structure

```text
grabzi/
├── docs/                 # Project documentation
├── src/
│   ├── ai/               # AI and Genkit functionality
│   ├── app/              # Next.js application pages
│   ├── components/       # Reusable UI components
│   ├── firebase/         # Firebase configuration and utilities
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Shared utilities, types and mock data
├── apphosting.yaml       # Firebase App Hosting configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🌐 Deployment

The production version of GrabZi is deployed on Vercel:

**https://grabzi-five.vercel.app/**

The Vercel project is connected to the `main` branch of this repository, so future changes pushed to `main` can be automatically deployed.

## 📄 License

This project is developed as an academic/project implementation.
