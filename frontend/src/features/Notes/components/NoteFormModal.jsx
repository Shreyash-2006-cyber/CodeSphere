import { useEffect, useState } from "react";
import Modal from "../../../shared/components/Modal";
import Button from "../../../shared/components/Button";
import { noteCategories } from "../data/notesMockData";

const EMPTY = { title: "", category: "DSA", content: "", tags: [] };

export default function NoteFormModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setTagsInput(initial.tags.join(", "));
    } else {
      setForm(EMPTY);
      setTagsInput("");
    }
  }, [initial, open]);

  function handleSubmit(e) {
    e.preventDefault();
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tags });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit note" : "New note"}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{initial ? "Save changes" : "Create note"}</Button>
        </>
      }
    >
      <form className="nt-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Title</label>
          <div className="form-input-wrap">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
        </div>
        <div className="form-field">
          <label>Category</label>
          <select className="nt-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {noteCategories.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Content</label>
          <textarea
            className="nt-textarea"
            rows={5}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Tags (comma separated)</label>
          <div className="form-input-wrap">
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="graphs, dp, react" />
          </div>
        </div>
      </form>
    </Modal>
  );
}
