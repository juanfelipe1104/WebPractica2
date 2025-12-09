"use client";

import { useAppState } from "@/context/AppStateContext";
import PlaylistPanel from "@/components/playlist/PlaylistPanel";
import FavoritesPanel from "@/components/playlist/FavoritesPanel";

export default function PlaylistPage() {
    const {
        playlist,
        favorites,
        generating,
        playlistError,
        generate,
        refresh,
        addMore,
        removeTrackFromPlaylist,
        toggleFavorite,
        isTrackFavorite,
        addTrackToPlaylist,
        isInPlaylist,
    } = useAppState();

    return (
        <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto w-full">
            {/* Columna izquierda: botones + playlist */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={generate}
                        disabled={generating}
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-[#1DB954] text-black hover:bg-[#1ed760] disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {generating ? "Generando..." : "Generar playlist"}
                    </button>

                    <button
                        type="button"
                        onClick={refresh}
                        disabled={generating || playlist.length === 0}
                        className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Refrescar
                    </button>

                    <button
                        type="button"
                        onClick={addMore}
                        disabled={generating}
                        className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Añadir más
                    </button>
                </div>

                <PlaylistPanel
                    playlist={playlist}
                    playlistError={playlistError}
                    generating={generating}
                    onRemoveTrack={removeTrackFromPlaylist}
                    onToggleFavorite={toggleFavorite}
                    isTrackFavorite={isTrackFavorite}
                />
            </div>

            {/* Columna derecha: favoritos */}
            <FavoritesPanel
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToPlaylist={addTrackToPlaylist}
                isInPlaylist={isInPlaylist}
            />
        </main>
    );
}
