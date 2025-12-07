"use client";

import { Minus, Plus } from "lucide-react";
import { useTransformStore } from "../../store/transform"

export function ZoomBar () {
    const {scale, setZoom} = useTransformStore();

    return (
        <div className="w-34 h-10 p-2 rounded-lg z-100 absolute left-2 bottom-3 text-slate-300 flex items-center justify-between bg-gray-600">
            <button className={`p-2 cursor-pointer hover:bg-gray-500`} 
            onClick={() => setZoom(scale - 0.1)}
            disabled={scale === 0.1}
            >
                <Minus />
            </button>
            {
                (scale * 100).toFixed()
            }
            <button className={`p-2 cursor-pointer hover:bg-gray-500`} 
            onClick={() => setZoom(scale + 0.1)}
            disabled={scale === 30}
            >
                <Plus />
            </button>
        </div>
    )
}