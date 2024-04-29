import React, { useState, useEffect } from 'react';
import * as notesAPI from '../../utilities/notes-api';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState(""); // State to hold the input value

  useEffect(() => {
    async function getNotes() {
      const notes = await notesAPI.fetchNotes();
      setNotes(notes);
    }
    getNotes();
  }, []);

  async function handleAddNote() {
    if (newNoteText) { // Only add a note if there is text
      const note = await notesAPI.addNote({ text: newNoteText });
      setNotes([...notes, note]);
      setNewNoteText(""); // Clear input after adding
    }
  }

  function handleChange(event) {
    setNewNoteText(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Add a note..."
        value={newNoteText}
        onChange={handleChange}
        onKeyPress={event => event.key === 'Enter' && handleAddNote()}  
      />
      <button onClick={handleAddNote}>Add Note</button> 
      {notes.length ? (
        <ul>
          {notes.map(note => (
            <li key={note._id}>{note.text} - {new Date(note.createdAt).toLocaleString()}</li>
          ))}
        </ul>
      ) : (
        <p>No Notes Yet!</p>
      )}
    </div>
  );
}
