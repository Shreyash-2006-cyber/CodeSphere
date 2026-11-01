import { useState } from "react";
import { LuPlus, LuNotebookPen } from "react-icons/lu";
import { useTracker } from "./hooks/useTracker";
import TrackerCard from "./components/TrackerCard";
import TrackerFormModal from "./components/TrackerFormModal";
import { trackerCategories } from "./data/trackerMockData";
import Button from "../../shared/components/Button";
import SearchBar from "../../shared/components/SearchBar";
import Dropdown from "../../shared/components/Dropdown";
import EmptyState from "../../shared/components/EmptyState";
import { SkeletonCard } from "../../shared/components/Loader";
import { useToast } from "../../shared/components/Toast";
import "./styles/ManualTracker.css";

export default function ManualTracker() {
  const { items, loading, query, setQuery, category, setCategory, addTracker, deleteTracker, updateTracker } = useTracker();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { showToast } = useToast();

  function handleSave(data) {
    if (editing) {
      updateTracker(editing._id || editing.id, data);
      showToast("Tracker updated", "success");
    } else {
      addTracker(data);
      showToast("Tracker created", "success");
    }
    setEditing(null);
  }

  function handleDelete(id) {
    deleteTracker(id);
    showToast("Tracker deleted", "info");
  }

  return (
    <div className="tr-page fade-in">
      <div className="page-heading tr-heading">
        <div>
          <h2>Manual Tracker</h2>
          <p>Track any activity — gym, exams, side projects, habits — your way.</p>
        </div>
        <Button icon={LuPlus} onClick={() => { setEditing(null); setModalOpen(true); }}>
          Create Tracker
        </Button>
      </div>

      <div className="tr-toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search trackers…" className="tr-search" />
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={trackerCategories.map((c) => ({ label: c, value: c }))}
        />
      </div>

      {loading ? (
        <div className="grid grid-3">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={LuNotebookPen}
          title="No trackers found"
          description="Try a different search or category, or create a new tracker."
          action={<Button icon={LuPlus} onClick={() => setModalOpen(true)}>Create Tracker</Button>}
        />
      ) : (
        <div className="tr-grid">
          {items.map((t) => (
            <TrackerCard
              key={t._id || t.id}
              tracker={t}
              onEdit={(tr) => { setEditing(tr); setModalOpen(true); }}
              onDelete={(id) => handleDelete(t._id || t.id)}
            />
          ))}
        </div>
      )}

      <TrackerFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
