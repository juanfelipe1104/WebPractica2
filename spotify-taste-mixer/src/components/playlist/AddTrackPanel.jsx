"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";

export default function AddTrackPanel({ onAddTrack, existingTrackIds = [] }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [justAddedIds, setJustAddedIds] = useState([]);

    const isAlreadyInPlaylist = (trackId) => existingTrackIds.includes(trackId);

    const isJustAdded = (trackId) => justAddedIds.includes(trackId);

    const handleAddClick = (track) => {
        const simplified = {
            id: track.id,
            name: track.name,
            artists: track.artists.map((a) => a.name).join(", "),
            album: track.album.name,
            image: track.album.images?.[0]?.url || null,
            preview_url: track.preview_url,
        };

        onAddTrack(simplified);

        setJustAddedIds((prev) =>
            prev.includes(track.id) ? prev : [...prev, track.id]
        );
    };

    // Limpiar justAddedIds si la canción ya no está en la playlist
    useEffect(() => {
        setJustAddedIds((prev) =>
            prev.filter((id) => existingTrackIds.includes(id))
        );
    }, [existingTrackIds]);

    // Búsqueda con debounce
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
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="rounded-2xl bg-[#181818]/90 border border-white/10 p-4 shadow-lg shadow-black/40">
            <h3 className="font-semibold mb-2 text-sm">
                Añadir canciones manualmente
            </h3>
            <p className="text-[11px] text-white/60 mb-3">
                Busca canciones en Spotify y añádelas directamente a esta playlist.
            </p>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar canción para añadir…"
                className="w-full mb-3 px-3 py-2 rounded-full text-sm bg-white/5 border border-white/10 focus:border-[#1DB954] focus:outline-none placeholder:text-white/40"
            />

            {loading && (<p className="text-xs text-white/60 mb-2">Buscando canciones…</p>)}
            {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

            <div className="space-y-1 max-h-64 overflow-auto pr-1">
                {results.map((track) => {
                    const inPlaylist = isAlreadyInPlaylist(track.id);
                    const justAdded = isJustAdded(track.id);

                    return (
                        <div
                            key={track.id}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left bg-white/5 hover:bg-white/10 text-white transition"
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

                            <div className="flex flex-col items-end gap-1 text-[11px]">
                                <button
                                    type="button"
                                    onClick={() => handleAddClick(track)}
                                    disabled={inPlaylist}
                                    className={`px-2 py-1 rounded-full border transition ${inPlaylist
                                        ? "border-white/20 text-white/40 cursor-default"
                                        : "border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                                        }`}
                                >
                                    {inPlaylist
                                        ? "En playlist"
                                        : justAdded
                                            ? "Añadida"
                                            : "Añadir"}
                                </button>

                                {track.preview_url && (
                                    <span className="text-[10px] text-white/60">
                                        Preview disponible
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}

                {!loading && !error && query && results.length === 0 && (
                    <p className="text-xs text-white/60">
                        No se encontraron canciones para “{query}”.
                    </p>
                )}
            </div>
        </div>
    );
}
