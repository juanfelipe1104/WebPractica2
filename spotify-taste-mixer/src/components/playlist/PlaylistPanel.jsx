"use client";

import TrackCard from "@/components/playlist/TrackCard";

export default function PlaylistPanel({ playlist, playlistError, generating, onRemoveTrack, onToggleFavorite, isTrackFavorite }) {
    return (
        <section className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-xl shadow-black/40 flex flex-col">
            {/* Cabecera */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="font-semibold text-base">Playlist generada</h2>
                    <p className="text-[11px] text-white/60">
                        Basada en tus artistas, canciones, géneros y mood
                    </p>
                </div>
                <span className="text-[11px] text-white/50">
                    {playlist.length} canción{playlist.length !== 1 ? "es" : ""}
                </span>
            </div>

            {/* Mensajes de estado */}
            {playlistError && (
                <p className="text-sm text-red-400 mb-2">{playlistError}</p>
            )}

            {!playlistError && playlist.length === 0 && !generating && (
                <p className="text-sm text-white/60">
                    Aún no hay canciones. Ajusta tus preferencias y pulsa{" "}
                    <span className="font-semibold">"Generar playlist"</span>.
                </p>
            )}

            {/* Lista de temas */}
            <div className="mt-2 flex-1 overflow-auto pr-1 space-y-1">
                {playlist.map((track, index) => (
                    <div key={track.id} className="flex items-center gap-2">
                        {/* Número de pista */}
                        <span className="w-5 text-right text-[11px] text-white/50">
                            {index + 1}
                        </span>

                        <TrackCard
                            track={track}
                            onRemove={onRemoveTrack}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={isTrackFavorite(track.id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
