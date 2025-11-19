"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [slug, setSlug] = useState<string>("");
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <input type="text" placeholder="Room Slug" onChange={(e) => {
        setSlug(e.target.value);
      }} value={slug}></input>

      <button onClick={() => {
        router.push(`/canvas/${slug}`);
      }}>Join Room</button>
    </div>
  );
}
