// Firebase configuration
const firebaseConfig = {
    // Load configuration from environment variables
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const newNoteBtn = document.getElementById('newNoteBtn');
const notesList = document.getElementById('notesList');
const noteEditor = document.getElementById('noteEditor');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const cancelBtn = document.getElementById('cancelBtn');

let currentNoteId = null;

// Auth state observer
auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    if (user) {
        console.log('User details:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        });
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        loadNotes();
    } else {
        console.log('No user is signed in');
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        notesList.innerHTML = '';
    }
});

// Event Listeners
loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Successfully signed in:', result.user);
        })
        .catch((error) => {
            console.error('Error during sign in:', error);
            alert('Error signing in: ' + error.message);
        });
});

logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

newNoteBtn.addEventListener('click', () => {
    currentNoteId = null;
    noteTitle.value = '';
    noteContent.value = '';
    noteEditor.classList.remove('hidden');
});

saveNoteBtn.addEventListener('click', saveNote);
deleteNoteBtn.addEventListener('click', deleteNote);
cancelBtn.addEventListener('click', () => {
    noteEditor.classList.add('hidden');
});

// Functions
function loadNotes() {
    const user = auth.currentUser;
    if (!user) return;

    const notesRef = database.ref(`notes/${user.uid}`);
    notesRef.on('value', (snapshot) => {
        notesList.innerHTML = '';
        const notes = snapshot.val() || {};
        
        Object.entries(notes).forEach(([id, note]) => {
            const noteCard = createNoteCard(id, note);
            notesList.appendChild(noteCard);
        });
    });
}

function createNoteCard(id, note) {
    const div = document.createElement('div');
    div.className = 'bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-blue-300 group relative';
    
    const date = new Date(note.updatedAt);
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    div.innerHTML = `
        <div class="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-blue-300 transition-colors rounded-l-xl"></div>
        <div class="flex justify-between items-start mb-3 pl-2">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">${note.title || 'Untitled'}</h3>
            <span class="text-xs text-gray-500">${formattedDate}</span>
        </div>
        <p class="text-gray-600 text-sm line-clamp-3 pl-2">${note.content ? note.content.substring(0, 150) + '...' : ''}</p>
        <div class="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity pl-2">
            <button class="text-blue-500 hover:text-blue-600 text-sm font-medium">Edit note</button>
        </div>
    `;
    
    div.addEventListener('click', () => {
        currentNoteId = id;
        noteTitle.value = note.title || '';
        noteContent.value = note.content || '';
        noteEditor.classList.remove('hidden');
    });
    
    return div;
}

function saveNote() {
    const user = auth.currentUser;
    if (!user) return;

    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (!title && !content) return;

    const noteData = {
        title,
        content,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
    };

    const notesRef = database.ref(`notes/${user.uid}`);
    
    if (currentNoteId) {
        notesRef.child(currentNoteId).update(noteData);
    } else {
        notesRef.push(noteData);
    }

    noteEditor.classList.add('hidden');
}

function deleteNote() {
    if (!currentNoteId) return;

    const user = auth.currentUser;
    if (!user) return;

    if (confirm('Are you sure you want to delete this note?')) {
        database.ref(`notes/${user.uid}/${currentNoteId}`).remove();
        noteEditor.classList.add('hidden');
    }
} 