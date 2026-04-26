import type { Note } from "../store/noteStore";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export default function NotesList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 flex flex-col items-center justify-center gap-4 h-[calc(100vh-100px)]">
        <p className="text-2xl">No notes yet</p>
        <p className="text-lg">Please click the + button to create note</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
