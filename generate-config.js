// This script generates the config.js file from .env variables
// Run this script during your build process with: node generate-config.js

require('dotenv').config();

const fs = require('fs');

// Create the config content
const configContent = `// config.js - This file is generated from .env by generate-config.js
// DO NOT EDIT DIRECTLY

// Create a process.env-like object for client-side environment variables
window.process = {
    env: {
        FIREBASE_API_KEY: '${process.env.FIREBASE_API_KEY || ''}',
        FIREBASE_AUTH_DOMAIN: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
        FIREBASE_DATABASE_URL: '${process.env.FIREBASE_DATABASE_URL || ''}',
        FIREBASE_PROJECT_ID: '${process.env.FIREBASE_PROJECT_ID || ''}',
        FIREBASE_STORAGE_BUCKET: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
        FIREBASE_MESSAGING_SENDER_ID: '${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}',
        FIREBASE_APP_ID: '${process.env.FIREBASE_APP_ID || ''}',
        FIREBASE_MEASUREMENT_ID: '${process.env.FIREBASE_MEASUREMENT_ID || ''}'
    }
};
`;

// Write to config.js
fs.writeFileSync('config.js', configContent);

console.log('Config file generated successfully!'); 