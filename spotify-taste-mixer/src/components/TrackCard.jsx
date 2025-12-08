"use client";

export default function TrackCard({ track, onRemove, onToggleFavorite, isFavorite }) {
	return (
		<div className="flex gap-3 items-center border-b py-2">
			{track.image && (
				<img
					src={track.image}
					alt={track.name}
					className="w-12 h-12 rounded-md object-cover"
				/>
			)}

			<div className="flex-1 min-w-0">
				<div className="font-medium text-sm truncate">{track.name}</div>
				<div className="text-xs text-gray-500 truncate">
					{track.artists} • {track.album}
				</div>
			</div>

			<div className="flex flex-col items-end gap-1">
				{onToggleFavorite && (
					<button
						type="button"
						onClick={() => onToggleFavorite(track)}
						className="text-xs"
					>
						{isFavorite ? "★ Fav" : "☆ Fav"}
					</button>
				)}

				{onRemove && (
					<button
						type="button"
						onClick={() => onRemove(track.id)}
						className="text-xs text-red-500"
					>
						Eliminar
					</button>
				)}
			</div>

			{track.preview_url && (
				<audio src={track.preview_url} controls className="w-28" />
			)}
		</div>
	);
}
