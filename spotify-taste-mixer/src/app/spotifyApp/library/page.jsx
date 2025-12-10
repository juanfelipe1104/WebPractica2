"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppState } from "@/context/AppStateContext";
import { getUserPlaylists, getPlaylistTracks } from "@/lib/spotify";

export default function LibraryPage() {
    const router = useRouter();
    const { loadPlaylist } = useAppState();

    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingPlaylistId, setLoadingPlaylistId] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setLoading(true);
                setError(null);
                const pls = await getUserPlaylists(30);
                setPlaylists(pls);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar tus playlists de Spotify.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    const handleLoadIntoMixer = async (playlistId) => {
        try {
            setLoadingPlaylistId(playlistId);
            const tracks = await getPlaylistTracks(playlistId, 100);
            loadPlaylist(tracks);
            router.push("/spotifyApp/playlist");
        } catch (err) {
            console.error(err);
            alert("No se pudieron cargar las canciones de esa playlist.");
        } finally {
            setLoadingPlaylistId(null);
        }
    };

    return (
        <main className="flex-1">
            <div className="max-w-6xl mx-auto w-full p-4 md:p-6">
                <h1 className="text-xl font-semibold mb-2">Tus playlists de Spotify</h1>
                <p className="text-sm text-white/60 mb-4">
                    Elige una playlist de tu cuenta para cargarla en el mixer.
                </p>

                {loading && <p className="text-sm text-white/60">Cargando playlists…</p>}
                {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

                {!loading && !error && playlists.length === 0 && (
                    <p className="text-sm text-white/60">
                        No se encontraron playlists en tu cuenta.
                    </p>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                    {playlists.map((pl) => (
                        <div
                            key={pl.id}
                            className="rounded-xl bg-[#181818]/90 border border-white/5 p-3 flex flex-col gap-2 hover:bg-white/5 transition"
                        >
                            {pl.image && (
                                <Image
                                    src={pl.image}
                                    alt={pl.name}
                                    width={200}
                                    height={200}
                                    className="rounded-md object-cover mb-2"
                                />
                            )}
                            <div className="min-w-0">
                                <div className="text-sm font-semibold truncate">{pl.name}</div>
                                <div className="text-[11px] text-white/60 truncate">
                                    {pl.owner} • {pl.tracksTotal} canciones
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleLoadIntoMixer(pl.id)}
                                disabled={loadingPlaylistId === pl.id}
                                className="mt-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                {loadingPlaylistId === pl.id
                                    ? "Cargando..."
                                    : "Cargar en mixer"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
