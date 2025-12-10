"use client";

import { useAppState } from "@/context/AppStateContext";
import PlaylistPanel from "@/components/playlist/PlaylistPanel";
import FavoritesPanel from "@/components/playlist/FavoritesPanel";
import AddTrackPanel from "@/components/playlist/AddTrackPanel";
import { useState } from "react";

export default function PlaylistPage() {
    const {
        playlist,
        favorites,
        generating,
        playlistError,
        generate,
        refresh,
        removeTrackFromPlaylist,
        toggleFavorite,
        isTrackFavorite,
        addTrackToPlaylist,
        isInPlaylist,
        savePlaylistToSpotify,
        saving,
        reorderTrackInPlaylist,
        resetPlaylist
    } = useAppState();

    const [showAddPanel, setShowAddPanel] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);
    const [saveError, setSaveError] = useState(null);

    const handleSaveToSpotify = async () => {
        if (playlist.length === 0) {
            setSaveError("No hay canciones en la playlist para guardar.");
            setSaveMessage(null);
            return;
        }

        const defaultName =
            "Taste Mixer - " + new Date().toLocaleString("es-ES");

        const name = window.prompt(
            "Nombre de la playlist en tu cuenta de Spotify:",
            defaultName
        );

        if (!name) return; // usuario canceló

        setSaveError(null);
        setSaveMessage(null);

        try {
            const created = await savePlaylistToSpotify(
                name,
                "Generada con Spotify Taste Mixer"
            );
            const url = created?.external_urls?.spotify;

            setSaveMessage(
                url
                    ? `Playlist guardada correctamente. Puedes abrirla en Spotify aquí: ${url}`
                    : "Playlist guardada correctamente en tu cuenta de Spotify."
            );
        } catch (err) {
            setSaveError("No se pudo guardar la playlist en Spotify.");
        }
    };


    return (
        <main className="flex-1">
            <div className="max-w-6xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Columna izquierda: botones + playlist */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={generate}
                            disabled={generating}
                            className="px-4 py-2 rounded-full text-sm font-semibold bg-[#1DB954] text-black hover:bg-[#1ed760] disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {generating ? "Generando..." : "Generar playlist"}
                        </button>

                        <button
                            onClick={refresh}
                            disabled={generating || playlist.length === 0}
                            className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Refrescar
                        </button>

                        <button
                            onClick={() => setShowAddPanel((prev) => !prev)}
                            className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 transition"
                        >
                            {showAddPanel ? "Cerrar buscador" : "Añadir más"}
                        </button>
                        <button
                            onClick={resetPlaylist}
                            disabled={generating || playlist.length === 0}
                            className="px-4 py-2 rounded-full text-sm border border-red-500 text-red-400 hover:bg-red-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Reset playlist
                        </button>
                        <button
                            onClick={handleSaveToSpotify}
                            disabled={saving || generating || playlist.length === 0}
                            className="px-4 py-2 rounded-full text-sm border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {saving ? "Guardando..." : "Guardar en Spotify"}
                        </button>
                    </div>

                    {/* Mensajes de guardado */}
                    {(saveMessage || saveError) && (
                        <div className="text-xs">
                            {saveMessage && (
                                <p className="text-[#1DB954] wrap-break-words">{saveMessage}</p>
                            )}
                            {saveError && <p className="text-red-400">{saveError}</p>}
                        </div>
                    )}
                    {/* Panel desplegable para añadir canciones manualmente */}
                    {showAddPanel && (
                        <AddTrackPanel
                            onAddTrack={addTrackToPlaylist}
                            existingTrackIds={playlist.map((t) => t.id)}
                        />
                    )}

                    <PlaylistPanel
                        playlist={playlist}
                        playlistError={playlistError}
                        generating={generating}
                        onRemoveTrack={removeTrackFromPlaylist}
                        onToggleFavorite={toggleFavorite}
                        isTrackFavorite={isTrackFavorite}
                        onReorder={reorderTrackInPlaylist}
                    />
                </div>

                {/* Columna derecha: favoritos */}
                <FavoritesPanel
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onAddToPlaylist={addTrackToPlaylist}
                    isInPlaylist={isInPlaylist}
                />
            </div>
        </main>
    );
}
