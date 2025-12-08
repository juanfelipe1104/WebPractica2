"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";

export default function ArtistWidget({ selectedArtists, onChange }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Saber si un artista ya está seleccionado
    const isSelected = (artist) =>
        selectedArtists.some((a) => a.id === artist.id);

    const toggleArtist = (artist) => {
        const alreadySelected = isSelected(artist);

        if (alreadySelected) {
            const updated = selectedArtists.filter((a) => a.id !== artist.id);
            onChange(updated);
        } else {
            // guardamos id, name e imagen
            const simplified = {
                id: artist.id,
                name: artist.name,
                image: artist.images?.[0]?.url || null,
            };
            const updated = [...selectedArtists, simplified];
            onChange(updated);
        }
    };

    // Buscar artistas en Spotify con debounce
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

                const url = `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}&limit=10`;

                const data = await spotifyRequest(url);
                console.log(data);
                setResults(data?.artists?.items ?? []);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los artistas.");
            } finally {
                setLoading(false);
            }
        }, 400); // debounce 400ms

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Artistas</h2>
            <p className="text-sm text-gray-500 mb-3">
                Busca artistas en Spotify y selecciónalos para usarlos en la playlist.
            </p>

            {/* input de búsqueda */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artista…"
                className="w-full mb-3 px-3 py-2 border rounded-md text-sm"
            />

            {loading && (
                <p className="text-xs text-gray-500 mb-2">Buscando artistas…</p>
            )}
            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

            {/* resultados */}
            <div className="flex flex-wrap gap-2 mb-3">
                {results.map((artist) => (
                    <button
                        key={artist.id}
                        onClick={() => toggleArtist(artist)}
                        className={`px-3 py-1 rounded-full text-sm border flex items-center gap-2 transition
                            ${isSelected(artist)
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-800"
                            }`}
                    >
                        {artist.images?.[0]?.url && (
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        )}
                        <span>{artist.name}</span>
                    </button>
                ))}

                {!loading && !error && query && results.length === 0 && (
                    <p className="text-xs text-gray-500">
                        No se encontraron artistas para "{query}".
                    </p>
                )}
            </div>

            {/* resumen de seleccionados */}
            <div className="mt-2 text-xs text-gray-600">
                Seleccionados:{" "}
                {selectedArtists.length === 0
                    ? "ninguno"
                    : selectedArtists.map((a) => a.name).join(", ")}
            </div>
        </div>
    );
}