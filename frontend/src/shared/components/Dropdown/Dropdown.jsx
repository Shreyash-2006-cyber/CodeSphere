import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import "./Dropdown.css";

export default function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-trigger" onClick={() => setOpen((o) => !o)}>
        {label && <span className="dropdown-label">{label}:</span>}
        <span>{current?.label ?? "Select"}</span>
        <LuChevronDown className={open ? "flip" : ""} />
      </button>
      {open && (
        <div className="dropdown-menu fade-in">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={opt.value === value ? "active" : ""}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
