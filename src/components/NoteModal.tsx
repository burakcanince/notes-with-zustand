import { useState } from "react";
import { COLORS } from "../constants/colors";

interface NoteModalProps {
  isOpen: boolean;
  editingId: number | null;
  title: string;
  description: string;
  selectedColor: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onClose: () => void;
  onSave: () => boolean;
}

export default function NoteModal({
  isOpen,
  editingId,
  title,
  description,
  selectedColor,
  onTitleChange,
  onDescriptionChange,
  onColorChange,
  onClose,
  onSave,
}: NoteModalProps) {
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const titleEmpty = !title.trim();
  const descEmpty = !description.trim();
  const titleInvalid = Boolean(error) && titleEmpty;
  const descInvalid = Boolean(error) && descEmpty;

  const handleValidation = () => {
    if (titleEmpty && descEmpty) {
      return("Title and description are required");
    }

    if (titleEmpty) {
      return("Title is required");
    }

    if (descEmpty) {
      return("Description is required");
    }

    return null;
  };

  const handleSubmit = () => {
    const error = handleValidation();

    if (error) {
      setError(error);
      return;
    }

    setError(null);
    onSave();
  };

  const handleTitleChange = (value: string) => {
    onTitleChange(value);
  };
  
  const handleDescriptionChange = (value: string) => {
    onDescriptionChange(value);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Note" : "New Note"}
        </h2>

        {error && (
          <p className="text-sm text-red-600 mb-3 bg-red-50 border border-red-200 rounded-lg p-4">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm outline-none transition-colors
                ${titleInvalid
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-200"
                }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={6}
              className={`w-full p-3 border rounded-lg text-sm outline-none resize-none transition-colors
                ${descInvalid
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-200"
                }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onColorChange(color.value)}
                  className={`w-8 h-8 cursor-pointer rounded-full transition-transform 
                    ${selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-gray-800 scale-110"
                      : ""
                    }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 rounded-lg border border-gray-200 cursor-pointer text-gray-600 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 p-3 rounded-lg bg-black cursor-pointer text-white text-sm"
            >
              {editingId ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
