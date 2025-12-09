"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";

export default function TrackWidget({ selectedTracks, onChange }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isSelected = (track) => selectedTracks.some((t) => t.id === track.id);

    const toggleTrack = (track) => {
        if (isSelected(track)) {
            const updated = selectedTracks.filter((t) => t.id !== track.id);
            onChange(updated);
        } else {
            const simplified = {
                id: track.id,
                name: track.name,
                artists: track.artists.map((a) => a.name).join(", "),
                album: track.album.name,
                image: track.album.images?.[0]?.url || null,
                preview_url: track.preview_url,
            };
            const updated = [...selectedTracks, simplified];
            onChange(updated);
        }
    };

    useEffect(() => {
        if (!query || query.trim().length < 2) {
            setResults([]);
            setError(null);
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}&limit=10`;

                const data = await spotifyRequest(url);
                setResults(data?.tracks?.items ?? []);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las canciones.");
            } finally {
                setLoading(false);
            }
        }, 400); // debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Canciones</h2>
            <p className="text-xs text-white/60 mb-3">
                Busca canciones en Spotify y añádelas como referencia para tu playlist.
            </p>

            {/* Input búsqueda */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar canción…"
                className="w-full mb-3 px-3 py-2 rounded-full text-sm bg-white/5 border border-white/10 focus:border-[#1DB954] focus:outline-none placeholder:text-white/40"
            />

            {loading && (
                <p className="text-xs text-white/60 mb-2">Buscando canciones…</p>
            )}
            {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

            {/* Resultados */}
            <div className="space-y-1 max-h-64 overflow-auto pr-1">
                {results.map((track) => (
                    <button
                        key={track.id}
                        type="button"
                        onClick={() => toggleTrack(track)}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition
                            ${isSelected(track)
                                ? "bg-[#1DB954] text-black"
                                : "bg-white/5 hover:bg-white/10 text-white"
                            }`}
                    >
                        {track.album.images?.[1]?.url && (
                            <img
                                src={track.album.images[1].url}
                                alt={track.name}
                                className="w-10 h-10 rounded-md object-cover shrink-0"
                            />
                        )}

                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium truncate">
                                {track.name}
                            </div>
                            <div className="text-[11px] text-white/70 truncate">
                                {track.artists.map((a) => a.name).join(", ")} •{" "}
                                {track.album.name}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                            <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border
                                    ${isSelected(track)
                                        ? "border-black/30 bg-black/10"
                                        : "border-white/20 bg-black/30"
                                    }`}
                            >
                                {isSelected(track) ? "Seleccionada" : "Añadir"}
                            </span>

                            {track.preview_url && (
                                <span className="text-[10px] text-white/70">
                                    Preview disponible
                                </span>
                            )}
                        </div>
                    </button>
                ))}

                {!loading && !error && query && results.length === 0 && (
                    <p className="text-xs text-white/60">
                        No se encontraron canciones para “{query}”.
                    </p>
                )}
            </div>

            {/* Resumen seleccionadas */}
            <div className="mt-3 text-[11px] text-white/60">
                Seleccionadas:{" "}
                {selectedTracks.length === 0
                    ? "ninguna"
                    : selectedTracks.map((t) => t.name).join(", ")}
            </div>
        </div>
    );
}