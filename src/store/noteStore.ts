import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

type NoteStore = {
  notes: Note[];
  addNote: (title: string, description: string, color: string) => void;
  editNote: (id: number, title: string, description: string, color: string) => void;
  removeNote: (id: number) => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (title, description, color) => {
        const newNote: Note = {
          id: Date.now(),
          title,
          description,
          color,
        };
        set({ notes: [...get().notes, newNote] });
      },

      editNote: (id, title, description, color) => {
        const updated = get().notes.map((note) =>
          note.id === id ? { ...note, title, description, color } : note
        );
        set({ notes: updated });
      },

      removeNote: (id) => {
        const filtered = get().notes.filter((note) => note.id !== id);
        set({ notes: filtered });
      },
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
