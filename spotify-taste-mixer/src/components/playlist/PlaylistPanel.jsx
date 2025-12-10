"use client";

import TrackCard from "@/components/playlist/TrackCard";
import { useState } from "react";

export default function PlaylistPanel({ playlist, playlistError, generating, onRemoveTrack, onToggleFavorite, isTrackFavorite, onReorder }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [overIndex, setOverIndex] = useState(null);

    const handleDragStart = (index, e) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (index, e) => {
        e.preventDefault();
        setOverIndex(index);
    };

    const handleDrop = (index, e) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            onReorder(draggedIndex, index);
        }
        setDraggedIndex(null);
        setOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setOverIndex(null);
    };
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
                    <div
                        key={track.id}
                        draggable
                        onDragStart={(e) => handleDragStart(index, e)}
                        onDragOver={(e) => handleDragOver(index, e)}
                        onDrop={(e) => handleDrop(index, e)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-grab active:cursor-grabbing transition
                            ${overIndex === index
                                ? "bg-white/10"
                                : "bg-transparent hover:bg-white/5"
                            }`}
                    >
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
