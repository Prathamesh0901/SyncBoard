"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { MainLayer } from "../../lib/layers/MainLayer";
import { DraftLayer } from "../../lib/layers/DraftLayer";
import { useElementStore } from "../../store/element";
import { useTransformStore } from "../../store/transform";
import { useSelectStore } from "../../store/selectElement";
import { SelectionLayer } from "../../lib/layers/SelectionLayer";
import { useRoomStore } from "../../store/room";

export default function WhiteBoard ({ slug }: {
    slug: string
}) {

    const [size, setSize] = useState({
        w: 0,
        h:0
    });

    const mainRef = useRef<HTMLCanvasElement>(null);
    const draftRef = useRef<HTMLCanvasElement>(null);
    const selectRef = useRef<HTMLCanvasElement>(null);

    const mainLayerRef = useRef<MainLayer>(null);
    const selectLayerRef = useRef<SelectionLayer>(null);

    const elements = useElementStore();
    const roomStore = useRoomStore.getState();
    const boundingBoxes = useSelectStore().boundingBoxes;

    const transform = useTransformStore();

    const {socket, loading} = useSocket(roomStore.roomId);

    useEffect(() => {
        if (mainRef.current && draftRef.current && selectRef.current && socket) {
            mainLayerRef.current = new MainLayer(mainRef.current, slug);
            new DraftLayer(draftRef.current, slug, socket);
            selectLayerRef.current = new SelectionLayer(selectRef.current, slug);
        };
        const update = () => {
            setSize({w: window.innerWidth, h: window.innerHeight})    
        }
        update();
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('resize', update);
        }
    }, [slug, socket]);

    
    useEffect(() => {
        if (!selectLayerRef.current) return;

        selectLayerRef.current.clearSelectCanvas();
        selectLayerRef.current.drawBoundingBox(boundingBoxes, transform);

    }, [boundingBoxes, transform]);
    
    useEffect(() => {
        if (!mainLayerRef.current) return;

        mainLayerRef.current.clearCanvas();
        mainLayerRef.current.draw();
        
    }, [elements, transform]);

    if (loading) {
        return (
            <div>
                Connecting to websocket...
            </div>
        )
    }

    return (
        <>
            <canvas ref={mainRef} width={size.w} height={size.h} className="absolute top-0 left-0"/>
            <canvas ref={selectRef} width={size.w} height={size.h} className="absolute top-0 left-0 bg-transparent"/>
            <canvas ref={draftRef} width={size.w} height={size.h} className="absolute top-0 left-0 bg-transparent"/>
        </>
    )
}