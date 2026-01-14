"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { MainLayer } from "../../lib/layers/MainLayer";
import { DraftLayer } from "../../lib/layers/DraftLayer";
import { useElementStore } from "../../store/element";
import { useTransformStore } from "../../store/transform";
import { useSelectStore } from "../../store/selectElement";
import { SelectionLayer } from "../../lib/layers/SelectionLayer";
import { useStyleStore } from "../../store/style";

export default function WhiteBoard({ slug, roomId }: {
    slug: string,
    roomId: string
}) {

    const [size, setSize] = useState({
        w: 0,
        h: 0
    });

    const mainRef = useRef<HTMLCanvasElement>(null);
    const draftRef = useRef<HTMLCanvasElement>(null);
    const selectRef = useRef<HTMLCanvasElement>(null);

    const mainLayerRef = useRef<MainLayer>(null);
    const draftLayerRef = useRef<DraftLayer>(null);
    const selectLayerRef = useRef<SelectionLayer>(null);

    const { elements } = useElementStore();
    const { selectedIds, boundingBoxes } = useSelectStore();

    const transform = useTransformStore();

    const { socket, loading } = useSocket(roomId);

    useEffect(() => {
        if (mainRef.current && draftRef.current && selectRef.current && socket) {
            mainLayerRef.current = new MainLayer(mainRef.current, slug, roomId);
            draftLayerRef.current = new DraftLayer(draftRef.current, slug, roomId, socket);
            selectLayerRef.current = new SelectionLayer(selectRef.current, slug, roomId);
        };
        const update = () => {
            setSize({ w: window.innerWidth, h: window.innerHeight })
        }
        update();
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('resize', update);
        }
    }, [slug, socket, roomId]);


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

    useEffect(() => {
        const styleStore = useStyleStore.getState();
        const styles = {
            strokeColor: styleStore.strokeColor,
            strokeWidth: styleStore.strokeWidth,
            opacity: styleStore.opacity,
            strokeType: styleStore.strokeType,
            fontSize: styleStore.fontSize
        };
        const selectedElements = Object.values(elements).filter(el => selectedIds.includes(el.id));
        if (selectedElements.length > 0) {
            selectedElements.forEach(element => {
                styles.strokeColor = element.data.strokeColor;
                styles.strokeWidth = element.data.strokeWidth;
                styles.opacity = element.data.opacity
                if (element.type === 'TEXT') styles.fontSize = element.data.fontSize;
                else if (element.type !== 'PENCIL') {
                    styles.strokeType = element.data.strokeType;
                }
            });
            useStyleStore.setState(styles);
        }
    }, [selectedIds, elements]);

    if (!roomId || !slug) {
        return <div>
            Invalid room slug
        </div>
    }

    if (loading) {
        return (
            <div className=" flex items-center justify-center">
                Connecting to websocket...
            </div>
        )
    }

    return (
        <>
            <canvas ref={mainRef} width={size.w} height={size.h} className="absolute top-0 left-0 overflow-hidden w-screen h-screen" />
            <canvas ref={selectRef} width={size.w} height={size.h} className="absolute top-0 left-0 bg-transparent overflow-hidden w-screen h-screen" />
            <canvas ref={draftRef} width={size.w} height={size.h} className="absolute top-0 left-0 bg-transparent overflow-hidden w-screen h-screen" />
        </>
    )
}