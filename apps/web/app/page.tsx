"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <input type="text" placeholder="Room Slug" onChange={(e) => {
        setRoomId(e.target.value);
      }} value={roomId}></input>

      <button onClick={() => {
        router.push(`/room/${roomId}`);
      }}>Join Room</button>
    </div>
  );
}
