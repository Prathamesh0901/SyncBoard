"use client";

import { useRouter } from "next/navigation";
import RoomsPage from "../../components/RoomsPage";

export default function Dashboard() {
	const router = useRouter();
	return (
		<div className="min-h-screen bg-zinc-950 px-20 py-10 text-zinc-100">
			<div className="flex items-center justify-between mb-10">
				<p className="text-4xl">My Canvas</p>

				<button
					onClick={() => {
						localStorage.removeItem("draw-app-data");
						router.push("/auth/signin");
					}}
					className="
						text-zinc-400
						hover:text-zinc-100
						transition
						cursor-pointer
						"
				>
					Logout
				</button>
			</div>

			<RoomsPage />
		</div>
	);
}
