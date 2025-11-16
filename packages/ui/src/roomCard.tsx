export function RoomCard ({slug, createdAt}: {
    slug: string, 
    createdAt: Date
}) {
    const dateTime = new Date(createdAt);
    return (
        <div className="w-50 p-4 border-2 border-slate-500">
            <div>
                {slug}
            </div>
            <div>
                {dateTime.toDateString()}
            </div>
        </div>
    )
}