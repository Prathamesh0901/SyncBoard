"use client";

import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";

export function OpacitySection() {
    const { opacity, setOpacity } = useStyleStore();

    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs">
                Opacity
            </p>
            <div className="w-full flex flex-col gap-1.5 max-w-sx">
                <input
                    id="default-range"
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={opacity}
                    onChange={(e) => {
                        setOpacity(Number(e.target.value));
                        debouncedApplyStyle({ opacity: (Number(e.target.value)) })
                    }}
                    className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer"
                    title={(opacity * 100).toString()}
                />
                <div className="flex justify-between mt-2 text-xs w-full pl-1">
                    <span>0</span>
                    <span className="pl-2.5">50</span>
                    <span>100</span>
                </div>
            </div>
        </div>
    );
}

let timeout: ReturnType<typeof setTimeout> | null = null;

export function debouncedApplyStyle(
    style: Parameters<typeof applyStyle>[0],
    delay = 80
) {
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        applyStyle(style);
        timeout = null;
    }, delay);
}