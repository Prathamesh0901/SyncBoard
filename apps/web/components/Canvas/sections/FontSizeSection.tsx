"use client";

import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";

const FONT_SIZES = [
  { size: 12, label: "S", title: "Small" },
  { size: 20, label: "M", title: "Medium" },
  { size: 28, label: "L", title: "Large" },
  { size: 36, label: "XL", title: "Extra Large" }
];

export function FontSizeSection() {
  const { fontSize } = useStyleStore();

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs">
        Font Size
      </p>
      <div className="flex gap-1.5">
        {FONT_SIZES.map(({ size, label, title }) => (
          <button
            key={size}
            onClick={() => applyStyle({ fontSize: size })}
            className={`cursor-pointer w-10 h-7 flex items-center justify-center rounded-lg transition-all ${fontSize === size
                ? "bg-zinc-700 border-2 border-zinc-600"
                : "bg-zinc-800 border-2 border-zinc-800 hover:bg-zinc-750"
              }`}
            title={title}
          >
            <span className="text-zinc-300 font-medium text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}