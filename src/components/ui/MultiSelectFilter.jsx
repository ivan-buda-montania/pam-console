import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function MultiSelectFilter({ label, options, selected = [], onChange, allLabel = "Todas", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function toggle(v) {
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  }

  const resumen =
    selected.length === 0 ? allLabel : `${selected.length} seleccionada${selected.length > 1 ? "s" : ""}`;

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && <span className="label">{label}</span>}
      <button type="button" className="input flex items-center justify-between gap-2" onClick={() => setOpen((o) => !o)}>
        <span className={`truncate text-left ${selected.length ? "text-primary" : "text-muted"}`}>{resumen}</span>
        <Icon name="chevron-down" size={16} className="shrink-0 text-muted" />
      </button>
      {open && (
        <div className="glass absolute z-30 mt-1 max-h-64 w-full min-w-[16rem] overflow-auto rounded-lg p-1">
          {options.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-tint"
            >
              <input
                type="checkbox"
                className="accent-accent"
                checked={selected.includes(o.value)}
                onChange={() => toggle(o.value)}
              />
              <span className="truncate">{o.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
