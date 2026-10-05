# **App Name**: GrabZi: Food Rescue Challenge

## Core Features:

- Deal Discovery: Displays nearby food clearance deals on a Google Maps interface.
- Puzzle Challenge: Presents users with food-themed puzzles fetched from Firestore, which they must solve to unlock deals.
- Gamified Leaderboard: Tracks user points, total food saved, and displays a leaderboard to encourage friendly competition. Updates when deals are claimed.
- Personalized Recommendations: Analyzes user preferences and past behavior to suggest relevant deals.
- Smart Expiry Tool: A Cloud Function monitors deal expiration times, automatically expiring them and sending reminders via push notification when deals are about to expire to those nearby.
- Vendor Dashboard: Enables vendors to post deals, assign puzzles, and track sales and waste reduction metrics.
- Automated QR Code Generation: After a deal is claimed, generates a unique QR code stored in Firestore for easy redemption and verification.

## Style Guidelines:

- Primary color: Fresh green (#A7D1AB) to evoke feelings of nature, health, and sustainability.
- Background color: Very light green (#F5FBF6), creating a clean and unobtrusive backdrop.
- Accent color: Bright orange (#FFB347) to highlight key interactive elements like buttons and timers.
- Body and headline font: 'PT Sans', a humanist sans-serif for its readability and modern warmth.
- Custom icons in a flat style, featuring a map pin, puzzle piece, timer, trophy, heart, and QR code to support gamified app functionality.
- Card-based layout with rounded corners and subtle shadows to present deals and vendor information clearly, optimized for mobile viewing.
- Gentle animations for deal transitions and puzzle reveals to enhance user engagement without being distracting.