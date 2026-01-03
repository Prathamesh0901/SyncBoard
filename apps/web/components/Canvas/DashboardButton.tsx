"use client";

import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardButton() {
    const router = useRouter();

    return (
        <div
            className="
        absolute top-4 left-4
        bg-zinc-900
        rounded-lg
        shadow-lg
        z-50
      "
        >
            <button
                onClick={() => router.push("/dashboard")}
                className="
                    cursor-pointer
                    flex items-center gap-2
                    px-3 py-2
                    rounded-md
                    text-zinc-300
                    hover:text-zinc-100
                    hover:bg-zinc-800
                    transition
                    "
                title="Go to dashboard"
            >
                <LayoutDashboard size={18} />
                <span className="text-sm">Dashboard</span>
            </button>
        </div>
    );
}
