"use client";

import TrackCard from "@/components/playlist/TrackCard";

export default function PlaylistPanel({playlist, playlistError, generating, onRemoveTrack, onToggleFavorite, isTrackFavorite}) {
    return (
        <section className="border rounded-md p-4 flex flex-col">
            <h2 className="font-semibold mb-2">Playlist generada</h2>

            {playlistError && (<p className="text-sm text-red-500 mb-2">{playlistError}</p>)}

            {!playlistError && playlist.length === 0 && !generating && (
                <p className="text-sm text-gray-500">
                    Aún no hay canciones. Selecciona tus preferencias y pulsa "Generar
                    playlist".
                </p>
            )}

            <div className="mt-2 flex-1 overflow-auto">
                {playlist.map((track) => (
                    <TrackCard
                        key={track.id}
                        track={track}
                        onRemove={onRemoveTrack}
                        onToggleFavorite={onToggleFavorite}
                        isFavorite={isTrackFavorite(track.id)}
                    />
                ))}
            </div>
        </section>
    );
}
