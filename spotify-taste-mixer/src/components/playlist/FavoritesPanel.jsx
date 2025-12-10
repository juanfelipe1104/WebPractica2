"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function FavoritesPanel({ favorites, onToggleFavorite, onAddToPlaylist, isInPlaylist }) {
    return (
        <section className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-xl shadow-black/40 flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="font-semibold text-base">Tus favoritos</h2>
                    <p className="text-[11px] text-white/60">
                        Canciones marcadas como favoritas en el mixer
                    </p>
                </div>
                <span className="text-[11px] text-white/50">
                    {favorites.length} tema{favorites.length !== 1 ? "s" : ""}
                </span>
            </div>

            {favorites.length === 0 && (
                <p className="text-sm text-white/60">
                    Aún no has marcado ninguna canción como favorita. Usa el botón{" "}
                    <span className="font-semibold">“Favorito”</span> en la playlist.
                </p>
            )}

            <div className="mt-2 flex-1 overflow-auto pr-1 space-y-1">
                {favorites.map((track) => (
                    <div
                        key={track.id}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition"
                    >
                        {track.image && (
                            <Image
                                src={track.image}
                                alt={track.name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover shrink-0"
                            />
                        )}

                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                                {track.name}
                            </div>
                            <div className="text-[11px] text-white/60 truncate">
                                {track.artists} - {track.album}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 text-[11px]">
                            <button
                                type="button"
                                onClick={() => onToggleFavorite(track)}
                                className="flex items-center gap-1 text-white/70 hover:text-red-400 transition"
                            >
                                <span><FaStar /></span>
                                <span>Quitar</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => onAddToPlaylist(track)}
                                disabled={isInPlaylist(track.id)}
                                className={`px-2 py-1 rounded-full border text-[11px] transition ${isInPlaylist(track.id)
                                    ? "border-white/20 text-white/40 cursor-default"
                                    : "border-white/30 text-white/80 hover:bg-white/10"
                                    }`}
                            >
                                {isInPlaylist(track.id) ? "En playlist" : "Añadir a playlist"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
