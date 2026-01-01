"use client";

import { useEffect } from "react";
import { acceptToken } from "../lib/utils/fetch";
import { useRouter } from "next/navigation";

export default function AcceptInvite({ slug, inviteToken }: {
    slug: string;
    inviteToken?: string;
}) {
    const router = useRouter();
    useEffect(() => {
        if (!inviteToken) return;

        acceptToken(inviteToken)
        .then((message) => {
            if (!message) {
                alert('Invalid invite token');
                return;
            }
            router.push(`/canvas/${message.slug}`)
        });
    });

    return null;
}
