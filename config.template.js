// config.template.js - Template for config.js
// DO NOT add real API keys here - this file is committed to version control
// Copy this file to config.js and replace the placeholder values with your actual keys

// Create a process.env-like object for client-side environment variables
window.process = {
    env: {
        FIREBASE_API_KEY: 'YOUR_API_KEY',
        FIREBASE_AUTH_DOMAIN: 'YOUR_AUTH_DOMAIN',
        FIREBASE_DATABASE_URL: 'YOUR_DATABASE_URL',
        FIREBASE_PROJECT_ID: 'YOUR_PROJECT_ID',
        FIREBASE_STORAGE_BUCKET: 'YOUR_STORAGE_BUCKET',
        FIREBASE_MESSAGING_SENDER_ID: 'YOUR_MESSAGING_SENDER_ID',
        FIREBASE_APP_ID: 'YOUR_APP_ID',
        FIREBASE_MEASUREMENT_ID: 'YOUR_MEASUREMENT_ID'
    }
};

// Instructions:
// 1. Copy this file to config.js
// 2. Replace the placeholder values with your actual Firebase configuration
// 3. Never commit the config.js file to version control 