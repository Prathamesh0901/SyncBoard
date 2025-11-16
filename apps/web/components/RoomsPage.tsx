"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HTTP_BACKEND_URL } from "../config";
import Link from "next/link";
// import { RoomCard } from "@repo/ui/roomCard";

interface Room {
    id: string;
    adminId: string;
    slug: string;
    createdAt: Date;
}

export default function RoomsPage () {
    const [rooms, setRooms] = useState<Room[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        if(!token) {
            router.push('/auth/signin');
        }
        fetch(`${HTTP_BACKEND_URL}/rooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((parsedData) => {
            setRooms(parsedData.rooms)
        })
        .catch(error => {
            console.log('Error fetching rooms', error);
        })
    }, []);

    return (
        <div className="w-full p-8 grid grid-cols-4 gap-15">
            {
                rooms.map(room => (
                    <RoomCard key={room.id} roomId={room.id} slug={room.slug} createdAt={room.createdAt}/>
                ))
            }
        </div>
    )
}

function RoomCard ({roomId, slug, createdAt}: {
    roomId: string,
    slug: string, 
    createdAt: Date
}) {
    const dateTime = new Date(createdAt);
    return (
        <div className="w-60 border-2 border-slate-500 rounded-xl cursor-pointer">
            <Link href={`/canvas/${roomId}`}>
                <div className="text-right pr-2">
                    <button className="cursor-pointer">
                        op
                    </button>
                </div>
                <div className="p-8 mt-2">
                    <p className="text-3xl text-center">
                        {slug}
                    </p>
                </div>
                <div className="text-right mt-4 pr-2">
                    <p className="text-xs">
                        {dateTime.toDateString()}
                    </p>
                </div>
            </Link>
        </div>
    )
}