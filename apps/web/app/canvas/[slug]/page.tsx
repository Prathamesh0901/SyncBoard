import React from "react";
import WhiteBoard from "../../../components/Canvas/WhiteBoard";
import ToolBar from "../../../components/Canvas/ToolBar";

export default async function RoomPage ({ params }: {
    params: {
        slug: string
    }
}) {
    const { slug } = await params;

    return (
        <div className="w-full h-full flex justify-center">
            <ToolBar />
            <WhiteBoard slug={slug}/>
        </div>
    )
}