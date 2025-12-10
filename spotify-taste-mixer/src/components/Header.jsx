"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/auth";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogout = () => {
		logout();
		router.replace("/");
	};

	const navItems = [
		{ href: "/spotifyApp/dashboard", label: "Dashboard" },
		{ href: "/spotifyApp/playlist", label: "Playlist" },
		{ href: "/spotifyApp/library", label: "Biblioteca" }
	];

	return (
		<header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur">
			{/* Logo + título */}
			<div className="flex items-center gap-3">
				<div className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/40">
					<span className="text-black font-extrabold text-lg">♫</span>
				</div>

				<div className="flex flex-col">
					<span className="text-base md:text-lg font-semibold tracking-tight">
						Spotify Taste Mixer
					</span>
					<span className="text-[11px] md:text-xs text-white/60">
						Combina artistas, canciones y moods para crear tu playlist
					</span>
				</div>
			</div>

			{/* Nav + logout */}
			<div className="flex items-center gap-4">
				<nav className="flex items-center gap-2">
					{navItems.map((item) => {
						const active = pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`px-3 py-1.5 rounded-full text-sm transition
                  					${active
										? "bg-white text-black font-semibold"
										: "text-white/70 hover:text-white hover:bg-white/10"
									}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<button
					onClick={handleLogout}
					className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white transition-colors"
				>
					Logout
				</button>
			</div>
		</header>
	);
}
