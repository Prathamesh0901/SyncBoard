"use client";

import { Copy, CopyCheck, Loader2, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { getInviteToken } from "../../lib/utils/fetch";
import { useToastStore } from "../../store/toast";
import { PUBLIC_APP_URL } from "../../config";

export function Invite({ roomId }: { roomId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const { showToast } = useToastStore();

  const handleClick = async () => {
    setIsOpen(true);

    if (!inviteLink) {
      setIsLoading(true);
      const token = await getInviteToken(roomId);
      setIsLoading(false);

      if (!token) {
        alert("Error generating invite link");
        return;
      }

      setInviteLink(`${PUBLIC_APP_URL}/invite/${token}`);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      showToast('Invite link copied', 'success');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
      showToast('Failed to copy invite link', 'success');
    }
  };

  return (
    <>
      {/* Invite button (HUD style) */}
      <div
        className="
          absolute top-4 right-4
          bg-zinc-900
          p-2 rounded-lg
          shadow-lg
          z-50
        "
      >
        <button
          onClick={handleClick}
          className="
            cursor-pointer
            p-2 rounded-md
            text-zinc-300
            hover:text-zinc-100
            hover:bg-zinc-800
            transition
          "
          title="Invite people"
        >
          <UserPlus size={18} />
        </button>
      </div>

      {/* Centered invite overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-xl p-6 w-[520px] shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-zinc-100 text-lg">Invite to room</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="flex justify-center py-8 text-zinc-300">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-4 py-3">
                <div className="flex-1 overflow-hidden text-sm text-zinc-200 truncate select-all">
                  {inviteLink}
                </div>

                <button
                  onClick={handleCopy}
                  className="
                    cursor-pointer
                    p-2 rounded-md
                    hover:bg-zinc-700
                    transition
                    text-zinc-300
                  "
                  title="Copy link"
                >
                  {isCopied ? <CopyCheck size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
