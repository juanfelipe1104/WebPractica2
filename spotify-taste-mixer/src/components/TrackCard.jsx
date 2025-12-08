"use client";

export default function TrackCard({ track }) {
	return (
		<div className="flex gap-3 items-center border-b py-2">
			{track.image && (
				<img
					src={track.image}
					alt={track.name}
					className="w-12 h-12 rounded-md object-cover"
				/>
			)}
			<div className="flex-1">
				<div className="font-medium text-sm">{track.name}</div>
				<div className="text-xs text-gray-500">
					{track.artists} - {track.album}
				</div>
			</div>
			{track.preview_url && (
				<audio src={track.preview_url} controls className="w-28" />
			)}
		</div>
	);
}