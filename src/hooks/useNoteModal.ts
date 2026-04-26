import { useState } from "react";
import { COLORS } from "../constants/colors";
import type { Note } from "../store/noteStore";

interface UseNoteModalProps {
  addNote: (title: string, description: string, color: string) => void;
  editNote: (id: number, title: string, description: string, color: string) => void;
}

export function useNoteModal({ addNote, editNote }: UseNoteModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedColor(COLORS[0].value);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setSelectedColor(note.color || COLORS[0].value);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) return false;

    if (editingId) {
      editNote(editingId, trimmedTitle, trimmedDescription, selectedColor);
    } else {
      addNote(trimmedTitle, trimmedDescription, selectedColor);
    }
    handleClose();
    return true;
  };

  return {
    isModalOpen,
    editingId,
    title,
    description,
    selectedColor,
    setTitle,
    setDescription,
    setSelectedColor,
    handleOpenAdd,
    handleOpenEdit,
    handleClose,
    handleSave,
  };
}
