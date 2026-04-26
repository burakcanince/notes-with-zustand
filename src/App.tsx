import { Plus } from "lucide-react";
import { useNoteModal } from "./hooks/useNoteModal";
import { useNoteStore } from "./store/noteStore";
import NoteModal from "./components/NoteModal";
import NoteList from "./components/NoteList";

function App() {
  const { notes, addNote, editNote, removeNote } = useNoteStore();
  const {
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
  } = useNoteModal({ addNote, editNote });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="bg-white border-r border-gray-200 flex flex-col items-center pt-8 w-20">
        <button
          onClick={handleOpenAdd}
          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center">Notes</h1>
        <NoteList
          notes={notes}
          onEdit={handleOpenEdit}
          onDelete={removeNote}
        />
      </div>

      <NoteModal
        key={String(isModalOpen)}
        isOpen={isModalOpen}
        editingId={editingId}
        title={title}
        description={description}
        selectedColor={selectedColor}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onColorChange={setSelectedColor}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
