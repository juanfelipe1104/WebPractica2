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
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Canciones</h2>
            <p className="text-sm text-gray-500 mb-3">
                Busca canciones en Spotify y selecciónalas para influir en la playlist.
            </p>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar canción…"
                className="w-full mb-3 px-3 py-2 border rounded-md text-sm"
            />

            {loading && (
                <p className="text-xs text-gray-500 mb-2">Buscando canciones…</p>
            )}
            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

            <div className="space-y-2 max-h-64 overflow-auto">
                {results.map((track) => (
                    <div
                        key={track.id}
                        className="flex items-center justify-between gap-2 border-b pb-2"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            {track.album.images?.[2]?.url && (
                                <img
                                    src={track.album.images[2].url}
                                    alt={track.name}
                                    className="w-10 h-10 rounded-md object-cover"
                                />
                            )}
                            <div className="min-w-0">
                                <div className="text-sm font-medium truncate">
                                    {track.name}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {track.artists.map((a) => a.name).join(", ")} •{" "}
                                    {track.album.name}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => toggleTrack(track)}
                            className={`text-xs px-2 py-1 rounded-md border whitespace-nowrap
                                ${isSelected(track)
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-white text-gray-800"
                                }`}
                        >
                            {isSelected(track) ? "Quitar" : "Añadir"}
                        </button>
                    </div>
                ))}

                {!loading && !error && query && results.length === 0 && (
                    <p className="text-xs text-gray-500">
                        No se encontraron canciones para "{query}".
                    </p>
                )}
            </div>

            <div className="mt-2 text-xs text-gray-600">
                Seleccionadas:{" "}
                {selectedTracks.length === 0
                    ? "ninguna"
                    : selectedTracks.map((t) => t.name).join(", ")}
            </div>
        </div>
    );
}