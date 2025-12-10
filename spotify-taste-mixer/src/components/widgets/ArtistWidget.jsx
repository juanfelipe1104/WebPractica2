"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";
import Image from "next/image";

export default function ArtistWidget({ selectedArtists, onChange }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Saber si un artista ya está seleccionado
    const isSelected = (artist) => {
        return selectedArtists.some((a) => a.id === artist.id);
    };

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
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Artistas</h2>
            <p className="text-xs text-white/60 mb-3">
                Busca artistas en Spotify y selecciónalos para influir en la playlist.
            </p>

            {/* Input de búsqueda */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artista…"
                className="w-full mb-3 px-3 py-2 rounded-full text-sm bg-white/5 border border-white/10 focus:border-[#1DB954] focus:outline-none placeholder:text-white/40"
            />

            {loading && (
                <p className="text-xs text-white/60 mb-2">Buscando artistas…</p>
            )}
            {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

            {/* Resultados */}
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
                {results.map((artist) => (
                    <button
                        key={artist.id}
                        onClick={() => toggleArtist(artist)}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition
                            ${isSelected(artist)
                                ? "bg-[#1DB954] text-black"
                                : "bg-white/5 hover:bg-white/10 text-white"
                            }`}
                    >
                        {artist.images?.[0]?.url && (
                            <Image
                                src={artist.images[0].url}
                                alt={artist.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover shrink-0"
                            />
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium truncate">
                                {artist.name}
                            </div>
                            <div className="text-[11px] text-white/60 truncate">
                                {artist.followers?.total
                                    ? Intl.NumberFormat("en", {
                                        notation: "compact",
                                    }).format(artist.followers.total) + " seguidores"
                                    : "Artista"}
                            </div>
                        </div>
                        <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border
                                ${isSelected(artist)
                                    ? "border-black/30 bg-black/10"
                                    : "border-white/20 bg-black/30"
                                }`}
                        >
                            {isSelected(artist) ? "Seleccionado" : "Añadir"}
                        </span>
                    </button>
                ))}

                {!loading && !error && query && results.length === 0 && (
                    <p className="text-xs text-white/60">
                        No se encontraron artistas para “{query}”.
                    </p>
                )}
            </div>

            {/* Resumen de seleccionados */}
            <div className="mt-3 text-[11px] text-white/60">
                Seleccionados:{" "}
                {selectedArtists.length === 0
                    ? "ninguno"
                    : selectedArtists.map((a) => a.name).join(", ")}
            </div>
        </div>
    );
}