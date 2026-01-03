"use client";

import {
  ArrowUpRight,
  Circle,
  Eraser,
  Hand,
  Minus,
  MousePointer,
  Pencil,
  Square,
  Type,
} from "lucide-react";
import { ReactNode } from "react";
import { Tools } from "../../lib/types/types";
import { useToolStore } from "../../store/tool";

const tools: {
  type: Tools;
  icon: ReactNode;
}[] = [
  { type: "FREE_HAND", icon: <Hand size={18} /> },
  { type: "SELECT", icon: <MousePointer size={18} /> },
  { type: "RECTANGLE", icon: <Square size={18} /> },
  { type: "ELLIPSE", icon: <Circle size={18} /> },
  { type: "LINE", icon: <Minus size={18} /> },
  { type: "ARROW", icon: <ArrowUpRight size={18} /> },
  { type: "TEXT", icon: <Type size={18} /> },
  { type: "PENCIL", icon: <Pencil size={18} /> },
  { type: "ERASER", icon: <Eraser size={18} /> },
];

export default function ToolBar() {
  const { tool, setTool } = useToolStore();

  return (
    <div
      className="
        absolute top-4 left-1/2 -translate-x-1/2
        flex gap-2
        bg-zinc-900
        px-3 py-2
        rounded-xl
        shadow-lg
        z-50
      "
    >
      {tools.map((t) => {
        const active = tool === t.type;

        return (
          <button
            key={t.type}
            onClick={() => setTool(t.type)}
            className={`
              p-2 rounded-lg transition cursor-pointer
              ${
                active
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }
            `}
            title={t.type.replace("_", " ")}
          >
            {t.icon}
          </button>
        );
      })}
    </div>
  );
}
