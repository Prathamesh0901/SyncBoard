"use client";

import { CheckCircle, Info, XCircle } from "lucide-react";
import { useToastStore } from "../store/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="
            flex items-center gap-3
            bg-zinc-900
            text-zinc-100
            px-4 py-3
            rounded-lg
            shadow-lg
            min-w-[260px]
          "
        >
          {toast.type === "success" && (
            <CheckCircle size={18} className="text-green-400" />
          )}
          {toast.type === "error" && (
            <XCircle size={18} className="text-red-400" />
          )}
          {toast.type === "info" && (
            <Info size={18} className="text-blue-400" />
          )}

          <p className="flex-1 text-sm">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
