"use client";

import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
import MoodWidget from "@/components/widgets/MoodWidget";

export default function WidgetsPanel({ preferences, updatePreference, generating, onGenerate, onRefresh, onAddMore, playlistLength }) {
    const setArtists = updatePreference("artists");
    const setTracks = updatePreference("tracks");
    const setGenres = updatePreference("genres");
    const setDecades = updatePreference("decades");
    const setPopularity = updatePreference("popularity");
    const setMood = updatePreference("mood");

    return (
        <section className="space-y-4">
            {/* Botones superiores */}
            <div className="flex flex-wrap gap-2 mb-2">
                <button
                    onClick={onGenerate}
                    disabled={generating}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-[#1DB954] text-black hover:bg-[#1ed760] disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    {generating ? "Generando..." : "Generar playlist"}
                </button>

                <button
                    onClick={onRefresh}
                    disabled={generating || playlistLength === 0}
                    className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Refrescar
                </button>

                <button
                    type="button"
                    onClick={onAddMore}
                    disabled={generating}
                    className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/90 hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Añadir más
                </button>
            </div>

            {/* Grid de widgets: 1 col en móvil, 2 cols en pantallas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Fila 1 */}
                <ArtistWidget
                    selectedArtists={preferences.artists}
                    onChange={setArtists}
                />

                <GenreWidget
                    selectedGenres={preferences.genres}
                    onChange={setGenres}
                />

                {/* Fila 2 */}
                <TrackWidget
                    selectedTracks={preferences.tracks}
                    onChange={setTracks}
                />

                <DecadeWidget
                    selectedDecades={preferences.decades}
                    onChange={setDecades}
                />

                {/* Fila 3 */}
                <PopularityWidget
                    popularity={preferences.popularity}
                    onChange={setPopularity}
                />

                <MoodWidget
                    mood={preferences.mood} onChange={setMood}
                />
            </div>
        </section>
    );
}
