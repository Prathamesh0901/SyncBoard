"use client";

import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";

const STROKES = [1, 2, 4];

export function StrokeWidthSection() {
  const { strokeWidth } = useStyleStore();

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs">
        Stroke Width
      </p>
      <div className="flex gap-1.5">
        {STROKES.map((w) => (
          <button
            key={w}
            onClick={() => applyStyle({ strokeWidth: w })}
            className={`cursor-pointer w-10 h-7 flex items-center justify-center rounded-lg transition-all ${strokeWidth === w
                ? "bg-zinc-700 border-2 border-zinc-600"
                : "bg-zinc-800 border-2 border-zinc-800 hover:bg-zinc-750"
              }`}
          >
            <div
              className="bg-zinc-300 rounded-full"
              style={{ width: '20px', height: `${w}px` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}