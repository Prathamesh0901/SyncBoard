"use client";

import { useToolStore } from "../../store/tool";
import { ColorSection } from "./sections/ColorSection";
import { StrokeWidthSection } from "./sections/StrokeWidthSection";
import { FontSizeSection } from "./sections/FontSizeSection";
import { Tools } from "../../lib/types/types";
import { useSelectStore } from "../../store/selectElement";
import { useElementStore } from "../../store/element";
import { StrokeTypeSection } from "./sections/StrokeTypeSection";
import { OpacitySection } from "./sections/OpacitySection";

const DRAWING_TOOLS: Tools[] = [
    'RECTANGLE',
    'ARROW',
    'ELLIPSE',
    'LINE',
    'PENCIL',
    'TEXT'
];

function isDrawingTool(tool: Tools) {
    return DRAWING_TOOLS.includes(tool);
}

export default function SidePanel() {
    const tool = useToolStore((s) => s.tool);
    const selectedIds = useSelectStore(s => s.selectedIds);
    const { hasText, hasNonText } = useSelectStore(s => s.selectionMeta);

    const visible = isDrawingTool(tool) || selectedIds.length;

    if (!visible) {
        return <></>
    }

    const showText = tool === 'TEXT' || hasText;

    return (
        <div
            className="
            absolute left-4 top-20 
            bg-zinc-900 
            border border-zinc-800
            rounded-lg
            flex flex-col gap-3
            p-4
            w-50
            h-fit
            shadow-lg
        ">

            <ColorSection />

            {
                showText ?
                    <>
                        <FontSizeSection />
                        {
                            hasNonText &&
                            <>
                                <StrokeWidthSection />
                                <StrokeTypeSection />
                            </>
                        }
                    </>
                :
                    <>
                        <StrokeWidthSection />
                        <StrokeTypeSection />
                    </>
            }
            <OpacitySection />

        </div>
    );
}
