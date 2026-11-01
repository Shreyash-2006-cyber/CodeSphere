import { useState, useEffect } from "react";
import Modal from "../../../shared/components/Modal";
import Button from "../../../shared/components/Button";
import { trackerCategories } from "../data/trackerMockData";

const EMPTY = { name: "", category: "Fitness", goal: "", notes: "", progress: 0, streak: 0, color: "#2563eb" };

export default function TrackerFormModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...initial } : EMPTY);
  }, [initial, open]);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit tracker" : "Create tracker"}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{initial ? "Save changes" : "Create tracker"}</Button>
        </>
      }
    >
      <form className="tr-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name</label>
          <div className="form-input-wrap">
            <input value={form.name} onChange={update("name")} placeholder="e.g. Gym, Reading, JEE" required />
          </div>
        </div>
        <div className="form-field">
          <label>Category</label>
          <select className="tr-select" value={form.category} onChange={update("category")}>
            {trackerCategories.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Goal</label>
          <div className="form-input-wrap">
            <input value={form.goal} onChange={update("goal")} placeholder="e.g. 4 sessions / week" />
          </div>
        </div>
        <div className="form-field">
          <label>Notes</label>
          <div className="form-input-wrap">
            <input value={form.notes} onChange={update("notes")} placeholder="Optional notes" />
          </div>
        </div>
      </form>
    </Modal>
  );
}
