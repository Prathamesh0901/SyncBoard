"use client";

import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";

export function ExtrasSection() {
  const { opacity, dash } = useStyleStore();

  return (
    <div className="flex flex-col gap-2 border-t border-zinc-700 pt-2">

      <input
        type="range"
        min={0.2}
        max={1}
        step={0.1}
        value={opacity}
        onChange={(e) => applyStyle({ opacity: (Number(e.target.value)) })}
      />

      <button
        onClick={() => applyStyle({ dash: !dash })}
        className={`h-8 text-xs rounded ${
          dash ? "bg-zinc-700" : "hover:bg-zinc-800"
        }`}
      >
        Dashed
      </button>
    </div>
  );
}
