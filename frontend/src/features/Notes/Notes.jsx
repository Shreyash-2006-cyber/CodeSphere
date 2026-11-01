import { useState } from "react";
import { LuPlus, LuStickyNote } from "react-icons/lu";
import { useNotes } from "./hooks/useNotes";
import NoteCard from "./components/NoteCard";
import NoteFormModal from "./components/NoteFormModal";
import { noteCategories } from "./data/notesMockData";
import Button from "../../shared/components/Button";
import SearchBar from "../../shared/components/SearchBar";
import Dropdown from "../../shared/components/Dropdown";
import EmptyState from "../../shared/components/EmptyState";
import { useToast } from "../../shared/components/Toast";
import "./styles/Notes.css";

export default function Notes() {
  const { notes, query, setQuery, category, setCategory, addNote, updateNote, deleteNote } = useNotes();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { showToast } = useToast();

  function handleSave(data) {
    if (editing) {
      updateNote(editing._id || editing.id, data);
      showToast("Note updated", "success");
    } else {
      addNote(data);
      showToast("Note created", "success");
    }
    setEditing(null);
  }

  function handleDelete(id) {
    deleteNote(id);
    showToast("Note deleted", "info");
  }

  return (
    <div className="nt-page fade-in">
      <div className="page-heading nt-heading">
        <div>
          <h2>Notes</h2>
          <p>Capture what you learn — DSA patterns, interview prep, or anything worth remembering.</p>
        </div>
        <Button icon={LuPlus} onClick={() => { setEditing(null); setModalOpen(true); }}>
          New Note
        </Button>
      </div>

      <div className="nt-toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search notes, tags…" className="nt-search" />
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={noteCategories.map((c) => ({ label: c, value: c }))}
        />
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon={LuStickyNote}
          title="No notes found"
          description="Try a different search or category, or create a new note."
          action={<Button icon={LuPlus} onClick={() => setModalOpen(true)}>New Note</Button>}
        />
      ) : (
        <div className="nt-grid">
          {notes.map((n) => (
            <NoteCard
              key={n._id || n.id}
              note={n}
              onEdit={(note) => { setEditing(note); setModalOpen(true); }}
              onDelete={(id) => handleDelete(n._id || n.id)}
            />
          ))}
        </div>
      )}

      <NoteFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  );
}
