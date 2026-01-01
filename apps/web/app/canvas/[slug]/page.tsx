import React from "react";
import WhiteBoard from "../../../components/Canvas/WhiteBoard";
import ToolBar from "../../../components/Canvas/ToolBar";
import { ZoomBar } from "../../../components/Canvas/ZoomBar";
import { Invite } from "../../../components/Canvas/Invite";
import AcceptInvite from "../../../components/AcceptInvite";

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
                Invalid slug
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
                    <WhiteBoard slug={slug} />
                    <ZoomBar />
                    <Invite roomId={slug} />
                </div>
            }
        </>
    )
}