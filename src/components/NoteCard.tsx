import { Pencil, Trash } from "lucide-react";
import type { Note } from "../store/noteStore";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div
      className="flex flex-col justify-between min-h-[200px] rounded-xl p-6 transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: note.color }}
    >
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">{note.title}</h3>
        <p className="text-gray-700 text-sm whitespace-pre-wrap">{note.description}</p>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-black/5">
        <span className="text-xs text-gray-600 font-medium">
          {new Date(note.id).toLocaleDateString()}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(note)}
            className="bg-black cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:opacity-70"
          >
            <Pencil size={14} className="text-white" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="bg-black cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:opacity-70"
          >
            <Trash size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
