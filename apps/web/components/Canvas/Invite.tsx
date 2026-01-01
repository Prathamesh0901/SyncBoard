"use client";

import { Copy, CopyCheck, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { getInviteToken } from "../../lib/utils/fetch";

export function Invite ({ roomId }: { roomId: string }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [inviteLink, setInviteLink] = useState<string>('');

    const handleClick = async () => {
        setIsOpen(p => !p);

        if (inviteLink === '') {
            setIsLoading(true);
            const token = await getInviteToken(roomId);
            setIsLoading(false);
            if (!token) {
                alert('Error generating invite token');
                return;
            }
            setInviteLink(`http://localhost:3000/invite/${token}`);
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.log('Failed to copy:', err);
            setIsCopied(false);
        }
    }

    return (
        <>
            <div className="h-10 p-2 rounded-lg z-100 absolute right-2 top-3 text-slate-300 flex items-center justify-between bg-gray-600">
                <button onClick={handleClick} className="cursor-pointer">
                    <UserPlus />
                </button>
            </div>
            {
                isOpen &&

                <div className="h-10 p-2 rounded-lg z-100 left-auto right-auto text-slate-300 flex items-center gap-4 justify-center bg-gray-600">
                    {
                        isLoading?
                        <Loader2 /> :
                        <div className="w-fit flex p-4">
                            <div className="w-xl overflow-hidden">
                                {inviteLink}
                            </div>
                            <button onClick={handleCopy} className="cursor-pointer" title="Copy Link">
                                {
                                    isCopied?
                                    <CopyCheck />:
                                    <Copy />
                                }
                            </button>
                        </div>
                    }
                </div>
            }
        </>
    )
}