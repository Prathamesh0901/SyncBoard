import React from "react";
import WhiteBoard from "../../../components/Canvas/WhiteBoard";
import ToolBar from "../../../components/Canvas/ToolBar";
import { ZoomBar } from "../../../components/Canvas/ZoomBar";

export default async function RoomPage ({ params }: {
    params: {
        slug: string
    }
}) {
    const { slug } = await params;

    if (!slug) {
        return (
            <div>
                Invalid slug
            </div>
        )
    }

    return (
        <div className="w-full h-full flex justify-center">
            <ToolBar />
            <WhiteBoard slug={slug}/>
            <ZoomBar />
        </div>
    )
}