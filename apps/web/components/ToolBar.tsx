import { Tools } from "@repo/common/types";
import { useDrawStore } from "@repo/store/store";
import { Circle, Eraser, Hand, MoveUpRight, Pencil, RectangleHorizontal, Spline, Triangle } from "lucide-react";
import { ReactNode } from "react";

const shapes: {
    type: Tools,
    icon: ReactNode
}[] = [{
        type: 'free_hand',
        icon: <Hand />
    }, {
        type: 'rect',
        icon: <RectangleHorizontal />
    }, {
        type: 'circle',
        icon: <Circle />
    },{
        type: 'triangle',
        icon: <Triangle />
    }, {
       type: 'arrow',
       icon: <MoveUpRight />
    }, {
       type: 'line',
       icon: <Spline />
    }, {
        type: 'pencil',
        icon: <Pencil />
    }, {
        type: 'eraser',
        icon: <Eraser />
}];

export default function ToolBar() {
    
    const { selectedTool, setSelectedTool } = useDrawStore();

    return (
        <div className="absolute top-2 flex gap-8 bg-gray-700 px-6 rounded-xl border-2 py-2 border-white z-100">

            {
                shapes.map(shape => (
                    <button className={`text-md p-1 cursor-pointer rounded-md text-center hover:bg-gray-900 hover:shadow-md ${selectedTool === shape.type ? 'text-slate-900 hover:text-slate-300' : 'text-slate-300'}`} onClick={() => {
                        setSelectedTool(shape.type);
                    }} key={shape.type}>
                        {
                            shape.icon
                        }
                    </button>
                ))
            }

        </div>
    )
}