"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EllipsisVertical, Plus, X } from "lucide-react";
import {
  createRoom,
  deleteRoom,
  fetchMyRooms,
  getUserId,
  updateCanvasName,
} from "../lib/utils/fetch";

interface Canvas {
  id: string;
  adminId: string;
  slug: string;
  createdAt: Date;
}

export default function RoomsPage() {
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const [canvasName, setCanvasName] = useState("");
  const [renameCanvasId, setRenameCanvasId] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [renaming, setRenaming] = useState(false);

  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("draw-app-data") || "null")
      : null;

  useEffect(() => {
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    fetchMyRooms()
      .then((data) => setCanvases(data.rooms))
      .catch(console.error);
  }, []);

  /* -------------------- CREATE CANVAS -------------------- */
  const handleCreate = async () => {
    if (!canvasName.trim() || creating) return;

    setCreating(true);
    try {
      const newCanvas = await createRoom(canvasName.trim());
      setCanvases((prev) => [newCanvas, ...prev]);
      setCanvasName("");
      setShowCreate(false);
      router.push(`/canvas/${newCanvas.slug}`);
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  /* -------------------- RENAME CANVAS -------------------- */
  const handleRenameOpen = (canvasId: string, currentName: string) => {
    setRenameCanvasId(canvasId);
    setCanvasName(currentName);
    setShowRename(true);
  };

  const confirmRename = async () => {
    if (!renameCanvasId || !canvasName.trim() || renaming) return;

    setRenaming(true);
    try {
      await updateCanvasName(renameCanvasId, canvasName.trim());

      setCanvases((prev) =>
        prev.map((c) =>
          c.id === renameCanvasId ? { ...c, slug: canvasName.trim() } : c
        )
      );

      setShowRename(false);
      setRenameCanvasId(null);
      setCanvasName("");
    } catch (err) {
      console.error(err);
    } finally {
      setRenaming(false);
    }
  };

  /* -------------------- DELETE CANVAS -------------------- */
  const handleDelete = async (canvasId: string) => {
    const success = await deleteRoom(canvasId);
    if (success) {
      setCanvases((prev) => prev.filter((c) => c.id !== canvasId));
    }
  };

  return (
    <div className="w-full relative">
        
      {/* Create canvas button */}
      <div className="mb-8">
        <button
          onClick={() => setShowCreate(true)}
          className="
            cursor-pointer
            flex items-center gap-2
            bg-zinc-800 hover:bg-zinc-700
            text-zinc-100
            px-4 py-2 rounded-lg
            transition
          "
        >
          <Plus size={18} />
          Create new canvas
        </button>
      </div>

      {/* Canvas grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {canvases.map((canvas) => (
          <CanvasCard
            key={canvas.id}
            canvas={canvas}
            onRename={handleRenameOpen}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* ---------------- CREATE MODAL ---------------- */}
      {showCreate && (
        <Modal
          title="Create canvas"
          value={canvasName}
          onChange={setCanvasName}
          onCancel={() => setShowCreate(false)}
          onConfirm={handleCreate}
          loading={creating}
          confirmText="Create"
        />
      )}

      {/* ---------------- RENAME MODAL ---------------- */}
      {showRename && (
        <Modal
          title="Rename canvas"
          value={canvasName}
          onChange={setCanvasName}
          onCancel={() => setShowRename(false)}
          onConfirm={confirmRename}
          loading={renaming}
          confirmText="Rename"
        />
      )}
    </div>
  );
}

/* ==================== CANVAS CARD ==================== */

function CanvasCard({
  canvas,
  onRename,
  onDelete,
}: {
  canvas: Canvas;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  const owned = getUserId() === canvas.adminId;
  const dateTime = new Date(canvas.createdAt);

  return (
    <div className="relative bg-zinc-900 rounded-xl p-5 hover:bg-zinc-800 transition">

      {owned && (
        <div className="absolute top-3 right-3 group">
          <div className="absolute -bottom-2 left-0 right-0 h-2" />

          <button className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition">
            <EllipsisVertical size={18} />
          </button>

          <div
            className="
              absolute right-0 mt-2 w-36
              bg-zinc-800 rounded-md shadow-lg
              opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              transition text-sm z-20
            "
          >
            <button
              className="w-full text-left px-4 py-2 hover:bg-zinc-700 cursor-pointer"
              onClick={() => onRename(canvas.id, canvas.slug)}
            >
              Rename
            </button>
            <button
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-700 cursor-pointer"
              onClick={() => onDelete(canvas.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <Link href={`/canvas/${canvas.slug}`}>
        <div className="h-32 flex items-center justify-center">
          <p className="text-2xl text-zinc-100 text-center break-all">
            {canvas.slug}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-xs text-zinc-400">
            {owned ? "owned" : "member"}
          </p>
          <p className="text-xs text-zinc-400">
            {dateTime.toDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}

/* ==================== MODAL ==================== */

function Modal({
  title,
  value,
  onChange,
  onCancel,
  onConfirm,
  loading,
  confirmText,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
  confirmText: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl">
      <div className="bg-zinc-900 rounded-xl p-6 w-96 shadow-2xl ring-1 ring-zinc-800">

        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-zinc-100">{title}</p>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onConfirm()}
          placeholder="Canvas name"
          className="
            w-full bg-transparent
            border-b border-zinc-600
            px-1 py-2
            text-zinc-100
            placeholder:text-zinc-500
            focus:outline-none focus:border-zinc-300
            transition
          "
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              bg-zinc-100 text-zinc-900
              px-4 py-2 rounded-lg
              hover:bg-white
              disabled:opacity-50
              transition cursor-pointer
            "
          >
            {loading ? `${confirmText}…` : confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}
