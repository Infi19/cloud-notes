# Cloud Notes App

A simple, modern notes-taking web application with cloud storage using Firebase Realtime Database.

## Features

- Create, edit, and delete notes
- Real-time cloud synchronization
- Google Authentication
- Modern, responsive UI
- Auto-save functionality

## Setup Instructions

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication
   - Create a Realtime Database
   - Set up database rules for security

2. Configure Firebase:
   - In your Firebase project settings, find the configuration object
   - Replace the `firebaseConfig` object in `app.js` with your configuration:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

3. Set up Firebase Realtime Database Rules:
   ```json
   {
     "rules": {
       "notes": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       }
     }
   }
   ```

4. Run the application:
   - You can use any local server to run the application
   - For example, using Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
   - Or using Node.js's `http-server`:
     ```bash
     npx http-server
     ```

5. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Click the "Login" button to sign in with your Google account
2. Click "New Note" to create a new note
3. Enter a title and content for your note
4. Click "Save" to store your note in the cloud
5. Click on any existing note to edit it
6. Use the "Delete" button to remove a note

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase Realtime Database
- Firebase Authentication

## Security

- All data is stored securely in Firebase
- Authentication is required to access notes
- Each user can only access their own notes
- Real-time database rules ensure data privacy 