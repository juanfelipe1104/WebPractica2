"use client";

import { FaStar, FaRegStar } from "react-icons/fa";

export default function TrackCard({ track, onRemove, onToggleFavorite, isFavorite }) {
	return (
		<div className="flex items-center w-full px-2 py-2 rounded-lg hover:bg-white/5 transition">
			{/* Portada */}
			{track.image && (
				<img
					src={track.image}
					alt={track.name}
					className="w-12 h-12 rounded-md object-cover shrink-0"
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
						type="button"
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
				<audio
					src={track.preview_url}
					controls
					className="ml-3 w-28"
				/>
			)}
		</div>
	);
}
