"use client";

import { Minus } from "lucide-react";
import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";
import { StrokeTypes } from "../../../lib/types/types";
import { ReactNode } from "react";

const types: {
    type: StrokeTypes;
    icon: ReactNode;
    title: string;
}[] = [
    { type: 'SOLID', icon: <Minus />, title: 'Solid' },
    { type: 'DASHED', icon: <DashIcon />, title: 'Dashed' },
    { type: 'DOTTED', icon: <DottedIcon />, title: 'Dotted' },
]

export function StrokeTypeSection() {
    const { strokeType } = useStyleStore();

    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs">
                Stroke Style
            </p>
            <div className="flex gap-1.5">
                {
                    types.map(({ type, icon, title }) => (
                        <button
                            key={type}
                            title={title}
                            onClick={() => applyStyle({ strokeType: type })}
                            className={`cursor-pointer w-10 h-7 flex items-center justify-center rounded-lg transition-all ${strokeType === type
                                ? "bg-zinc-700 border-2 border-zinc-600"
                                : "bg-zinc-800 border-2 border-zinc-800 hover:bg-zinc-750"
                                }`}
                        >
                            {
                                icon
                            }
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

function DashIcon() {
    return (
        <svg width="16" height="2" viewBox="0 0 16 2" className="text-zinc-300">
            <line
                x1="0"
                y1="1"
                x2="16"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4,2"
            />
        </svg>
    )
}

function DottedIcon() {
    return (
        <svg width="16" height="2" viewBox="0 0 16 2" className="text-zinc-300">
            <line
                x1="0"
                y1="1"
                x2="16"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2,2"
            />
        </svg>
    )
}