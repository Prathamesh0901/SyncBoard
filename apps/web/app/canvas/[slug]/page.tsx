import React from "react";
import WhiteBoard from "../../../components/Canvas/WhiteBoard";
import ToolBar from "../../../components/Canvas/ToolBar";
import { ZoomBar } from "../../../components/Canvas/ZoomBar";
import { Invite } from "../../../components/Canvas/Invite";
import AcceptInvite from "../../../components/AcceptInvite";
import { DashboardButton } from "../../../components/Canvas/DashboardButton";
import { HTTP_BACKEND_URL } from "../../../config";

export default async function RoomPage({ params, searchParams }: {
    params: {
        slug: string
    },
    searchParams: {
        invite: string
    }
}) {
    const { slug } = await params;
    const { invite } = await searchParams;

    if (!slug) {
        return (
            <div>
                Slug is required
            </div>
        )
    }

    const message = await getRoomId(slug);

    if (message.type === 'error') {
        return (
            <div>
                Invalid room
            </div>
        )
    }
    
    return (
        <>
            {
                invite?
                <AcceptInvite
                slug={slug}
                inviteToken={invite}
                /> :
                <div className="w-full h-full flex justify-center">
                    <ToolBar />
                    <WhiteBoard slug={slug} roomId={message.roomId}/>
                    <ZoomBar />
                    <Invite roomId={slug} />
                    <DashboardButton />
                </div>
            }
        </>
    )
}

async function getRoomId (slug: string) {
    const data = await fetch(`${HTTP_BACKEND_URL}/rooms/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const message = await data.json();
    return message;
}