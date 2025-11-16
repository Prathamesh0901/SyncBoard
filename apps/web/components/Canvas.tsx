import { useEffect, useRef } from "react";
import ToolBar from "./ToolBar";
import { Draw } from "../draw/Draw";
import { useDrawStore } from "@repo/store/store";

export default function Canvas({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {

    const mainCanvasRef = useRef<HTMLCanvasElement>(null);
    const draftCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawRef   = useRef<Draw>(null);

    useEffect(() => {

        if (!drawRef.current && mainCanvasRef.current && draftCanvasRef.current) {
            const d = new Draw(mainCanvasRef.current, draftCanvasRef.current, roomId, socket);
            if (d) {
                drawRef.current = d;
            }
        }

        return () => {
            drawRef.current?.destroy();
        }
            
    }, [mainCanvasRef, roomId, socket]);

    return (
        <div className="w-full h-full flex justify-center overflow-hidden">
            
            <ToolBar />
            {/* <ColorPanel /> */}

            <div className= {`overflow-hidden`}>
                <canvas ref={mainCanvasRef} height={window.innerHeight} width={window.innerWidth} className="absolute top-0 left-0 z-1 overflow-hidden"></canvas>
                <canvas ref={draftCanvasRef} height={window.innerHeight} width={window.innerWidth} className="absolute top-0 left-0 z-2 bg-transparent overflow-hidden"></canvas>
            </div>
            
        </div>
    )
}