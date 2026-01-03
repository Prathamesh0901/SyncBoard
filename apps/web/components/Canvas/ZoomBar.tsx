"use client";

import { Minus, Plus } from "lucide-react";
import { useTransformStore } from "../../store/transform";

export function ZoomBar() {
    const { scale, setZoom } = useTransformStore();

    return (
        <div
            className="
        absolute left-4 bottom-4
        flex items-center gap-2
        bg-zinc-900
        px-3 py-2
        rounded-xl
        shadow-lg
        text-zinc-300
        z-50
      "
        >
            <button
                onClick={() => setZoom(scale - 0.1)}
                disabled={scale <= 0.1}
                className="
                    cursor-pointer
                    p-2 rounded-md
                    hover:bg-zinc-800
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                    "
                title="Zoom out"
            >
                <Minus size={16} />
            </button>

            <div className="min-w-12 text-center text-sm text-zinc-200 select-none">
                {(scale * 100).toFixed()}%
            </div>

            <button
                onClick={() => setZoom(scale + 0.1)}
                disabled={scale >= 30}
                className="
                    cursor-pointer
                    p-2 rounded-md
                    hover:bg-zinc-800
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                    "
                title="Zoom in"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}
