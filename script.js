class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.date = new Date().toLocaleString();
    }
}

class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.saveButton = document.getElementById('saveNote');
        this.notesList = document.getElementById('notesList');
        
        this.saveButton.addEventListener('click', () => this.addNote());
        this.displayNotes();
    }

    addNote() {
        if (this.noteTitle.value.trim() === '' || this.noteContent.value.trim() === '') {
            alert('Please fill in both title and content!');
            return;
        }

        const newNote = new Note(this.noteTitle.value, this.noteContent.value);
        this.notes.push(newNote);
        this.saveToLocalStorage();
        this.displayNotes();
        
        // Clear input fields
        this.noteTitle.value = '';
        this.noteContent.value = '';
    }

    deleteNote(index) {
        this.notes.splice(index, 1);
        this.saveToLocalStorage();
        this.displayNotes();
    }

    saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    displayNotes() {
        this.notesList.innerHTML = '';
        this.notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <small>${note.date}</small>
                <button class="delete-btn" onclick="app.deleteNote(${index})">Delete</button>
            `;
            this.notesList.appendChild(noteCard);
        });
    }
}

// Initialize the app
const app = new NotesApp();
