"use client";

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.replace("/");
	};

	return (
		<header className="flex items-center justify-between px-4 py-3 border-b">
			<h1 className="text-xl font-semibold">Spotify Taste Mixer</h1>
			<button onClick={handleLogout} className="px-3 py-1 rounded-md border text-sm">
				Logout
			</button>
		</header>
	);
}
