"use client";

import { BoxSelect, BoxSelectIcon, Circle, Eraser, Hand, LucideBoxSelect, MousePointerSquareDashed, MoveUpRight, Pencil, RectangleHorizontal, Spline, SquareArrowOutDownLeftIcon, Text, TextCursor, TextCursorIcon, TextCursorInput, TextIcon, TextSelect, TextWrap, Triangle } from "lucide-react";
import { ReactNode } from "react";
import { Tools } from "../../lib/types/types";
import { useToolStore } from "../../store/tool";

const tools: {
    type: Tools,
    icon: ReactNode
}[] = [{
    type: 'FREE_HAND',
    icon: <Hand />
}, {
    type: 'RECTANGLE',
    icon: <RectangleHorizontal />
}, {
    type: 'ELLIPSE',
    icon: <Circle />
}, {
    type: 'TEXT',
    icon: <TextCursorInput />
}, {
    type: 'ARROW',
    icon: <MoveUpRight />
}, {
    type: 'LINE',
    icon: <Spline />
}, {
    type: 'PENCIL',
    icon: <Pencil />
}, {
    type: 'ERASER',
    icon: <Eraser />
}, {
    type: 'SELECT',
    icon: <BoxSelect />
}];

export default function ToolBar() {

    const { tool, setTool } = useToolStore();

    return (
        <div className="absolute top-2 flex gap-8 bg-gray-700 px-6 rounded-xl border-2 py-2 border-white z-100">

            {
                tools.map(t => (
                    <button className={`text-md p-1 cursor-pointer rounded-md text-center hover:bg-gray-900 hover:shadow-md ${tool === t.type ? 'text-slate-900 hover:text-slate-300' : 'text-slate-300'}`} onClick={() => {
                        setTool(t.type);
                    }} key={t.type}>
                        {
                            t.icon
                        }
                    </button>
                ))
            }

        </div>
    )
}