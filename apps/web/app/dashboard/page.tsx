import RoomsPage from "../../components/RoomsPage";

export default function Dashboard () {
    return (
        <div className="flex flex-col bg-gray-900 h-full w-full px-20 py-10 text-slate-300 gap-14">
            <p className="text-4xl">My Rooms</p>
            <RoomsPage />
        </div>
    )
}