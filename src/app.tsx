import logo from './assets/logo-nlw-expert.svg';
import { NoteCard } from './components/note-card';
import { NewNoteCard } from './components/new-note-card';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { ALargeSmall } from 'lucide-react';

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [CaseSensitive, setCaseSensitive] = useState(false);
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
  function onNoteDeleted(noteId: string) {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    toast.success('nota excluída com sucesso!');
  }
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  }

  const filteredNotes =
    search !== ''
      ? notes.filter(note => {
          if (CaseSensitive === false) {
            return note.content
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          }
          return note.content.includes(search);
        })
      : notes;
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="Logo do NLW Expert" />
      <form className="w-full relative">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
          value={search}
        />
        {CaseSensitive ? (
          <button
            type="button"
            className="absolute right-0 top-0 p-1.5 bg-lime-600 rounded-md"
            aria-label="Habilitar case sensitive"
            onClick={() => setCaseSensitive(false)}
          >
            <ALargeSmall className="size-8" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute right-0 top-0 p-1.5 bg-slate-600 hover:bg-lime-600 rounded-md"
            aria-label="Habilitar case sensitive"
            onClick={() => setCaseSensitive(true)}
          >
            <ALargeSmall className="size-8" />
          </button>
        )}
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map(note => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          );
        })}
      </div>
    </div>
  );
}
