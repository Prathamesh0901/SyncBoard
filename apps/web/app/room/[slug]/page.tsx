import { HTTP_BACKEND_URL } from "../../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoom(slug: string) {
    const data = await fetch(`${HTTP_BACKEND_URL}/room/${slug}`, {
        method: 'GET'
    });
    const parsedData = await data.json();
    return parsedData.room.id;
}

export default async function Room({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug;
    const roomId: string = await getRoom(slug);
    return (
        <div>
            <ChatRoom roomId={roomId} />
        </div>
    )
}