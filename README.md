# Amazon Clone - Full Stack

This project is a full-stack Amazon clone built with React (Frontend) and Firebase Functions (Backend).

## Prerequisites
- Node.js
- Firebase CLI (`npm install -g firebase-tools`)
- Java (required for Firebase Emulators)

## How to Run Locally

You need to run both the Frontend and Backend servers simultaneously in separate terminals.

### 1. Start the Backend (Firebase Functions)
Open a new terminal and run:
```bash
cd functions
npm install
npm run serve
```
This will start the backend server on `http://localhost:5001`.
*Note: Ensure you have `.runtimeconfig.json` in the `functions/` folder for Stripe keys to work.*

### 2. Start the Frontend (React App)
Open another terminal (or use existing one) and run:
```bash
npm install
npm start
```
This will start the React app on `http://localhost:3000`.

## Environment Variables
- The frontend uses `.env` file for API keys.
- The backend uses `functions/.runtimeconfig.json` for Stripe secret keys locally.

## Deploying
To deploy the full app:
```bash
npm run build
firebase deploy
```
