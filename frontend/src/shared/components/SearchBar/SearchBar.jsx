import { LuSearch, LuX } from "react-icons/lu";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder = "Search…", className = "" }) {
  return (
    <div className={`search-bar ${className}`}>
      <LuSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} aria-label="Clear search">
          <LuX />
        </button>
      )}
    </div>
  );
}
