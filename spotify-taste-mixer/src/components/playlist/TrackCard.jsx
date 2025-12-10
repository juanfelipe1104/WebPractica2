"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function TrackCard({ track, onRemove, onToggleFavorite, isFavorite }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleTogglePlay = () => {
		if (!track.preview_url) return;

		// Crear el audio la primera vez
		if (!audioRef.current) {
			audioRef.current = new Audio(track.preview_url);
			audioRef.current.addEventListener("ended", () => {
				setIsPlaying(false);
			});
		}

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current
				.play()
				.then(() => setIsPlaying(true))
				.catch((err) => {
					console.error("Error al reproducir preview:", err);
				});
		}
	};

	// Limpiar audio al desmontar el componente
	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	return (
		<div className="flex items-center w-full px-2 py-2 rounded-lg hover:bg-white/5 transition">
			{/* Portada */}
			{track.image && (
				<Image
					src={track.image}
					alt={track.name}
					width={48}
					height={48}
					className="rounded-md object-cover shrink-0"
				/>
			)}

			{/* Info principal */}
			<div className="flex-1 min-w-0 ml-3">
				<div className="text-sm font-medium truncate">{track.name}</div>
				<div className="text-[11px] text-white/60 truncate">
					{track.artists} - {track.album}
				</div>
			</div>

			{/* Acciones */}
			<div className="flex flex-col items-end gap-1 ml-3 text-[11px]">
				{onToggleFavorite && (
					<button
						onClick={() => onToggleFavorite(track)}
						className="flex items-center gap-1 text-white/70 hover:text-[#1DB954] transition"
					>
						<span>{isFavorite ? <FaStar /> : <FaRegStar />}</span>
						<span>{isFavorite ? "Favorita" : "Favorito"}</span>
					</button>
				)}

				{onRemove && (
					<button
						type="button"
						onClick={() => onRemove(track.id)}
						className="text-red-400 hover:text-red-300 transition"
					>
						Eliminar
					</button>
				)}
			</div>

			{/* Preview */}
			{track.preview_url && (
				<button
					type="button"
					onClick={handleTogglePlay}
					className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border transition
            			${isPlaying
							? "border-red-400 text-red-400 hover:bg-red-400/10"
							: "border-white/30 text-white/80 hover:border-white"
						}`}
				>
					{isPlaying ? "Pausar" : "Preview"}
				</button>
			)}
		</div>
	);
}
