"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import { MainLayer } from "../../lib/layers/MainLayer";
import { DraftLayer } from "../../lib/layers/DraftLayer";
import { useElementStore } from "../../store/element";
import { useTransformStore } from "../../store/transform";
import { useSelectStore } from "../../store/selectElement";
import { SelectionLayer } from "../../lib/layers/SelectionLayer";

export default function WhiteBoard ({ slug }: {
    slug: string
}) {

    // const [size, setSize] = useState({
    //     w: 0,
    //     h:0
    // });

    const mainRef = useRef<HTMLCanvasElement>(null);
    const draftRef = useRef<HTMLCanvasElement>(null);
    const selectRef = useRef<HTMLCanvasElement>(null);

    const mainLayerRef = useRef<MainLayer>(null);
    const selectLayerRef = useRef<SelectionLayer>(null);

    const elements = useElementStore();
    const boundingBoxes = useSelectStore().boundingBoxes;

    const transform = useTransformStore();

    const {socket, loading} = useSocket(slug);

    useEffect(() => {
        if (mainRef.current && draftRef.current && selectRef.current && socket) {
            mainLayerRef.current = new MainLayer(mainRef.current, slug);
            new DraftLayer(draftRef.current, slug, socket);
            selectLayerRef.current = new SelectionLayer(selectRef.current, slug);
        };
        // const update = () => {
        //     setSize({w: window.innerWidth, h: window.innerHeight})    
        // }
        // update();
        // window.addEventListener('resize', update);

        // return () => {
        //     window.removeEventListener('resize', update);
        // }
    }, [slug, socket]);

    useEffect(() => {
        if (!mainLayerRef.current) return;

        mainLayerRef.current.clearCanvas();
        mainLayerRef.current.draw();
        
    }, [elements, transform]);

    useEffect(() => {
        if (!selectLayerRef.current) return;

        selectLayerRef.current.clearSelectCanvas();
        selectLayerRef.current.drawBoundingBox(boundingBoxes, transform);

    }, [boundingBoxes, transform]);

    if (loading) {
        return (
            <div>
                Connecting to websocket...
            </div>
        )
    }

    return (
        <>
            <canvas ref={mainRef} width={window.innerWidth} height={window.innerHeight} className="absolute top-0 left-0"/>
            <canvas ref={selectRef} width={window.innerWidth} height={window.innerHeight} className="absolute top-0 left-0 bg-transparent"/>
            <canvas ref={draftRef} width={window.innerWidth} height={window.innerHeight} className="absolute top-0 left-0 bg-transparent"/>
        </>
    )
}