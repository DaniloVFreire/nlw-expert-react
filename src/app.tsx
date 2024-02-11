import logo from './assets/logo-nlw-expert.svg';
import { NoteCard } from './components/note-card';
import { NewNoteCard } from './components/new-note-card';
import { ChangeEvent, useState } from 'react';

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      return JSON.parse(storedNotes);
    }
    return [];
  });
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    };
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
  function onNoteDeletion(noteId: string) {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  }

  const filteredNotes =
    search !== ''
      ? notes.filter(note =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="Logo do NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
          value={search}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeletion={onNoteDeletion}
            />
          );
        })}
      </div>
    </div>
  );
}
