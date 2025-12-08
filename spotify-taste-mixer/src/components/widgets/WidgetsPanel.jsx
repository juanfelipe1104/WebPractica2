"use client";

import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
//import MoodWidget from "@/components/widgets/MoodWidget";

export default function WidgetsPanel({preferences, updatePreference, generating, onGenerate, onRefresh, onAddMore, playlistLength}) {
    const setArtists = updatePreference("artists");
    const setTracks = updatePreference("tracks");
    const setGenres = updatePreference("genres");
    const setDecades = updatePreference("decades");
    const setPopularity = updatePreference("popularity");
    // const setMood = updatePreference("mood");

    return (
        <section className="space-y-4">
            <ArtistWidget
                selectedArtists={preferences.artists}
                onChange={setArtists}
            />

            <TrackWidget
                selectedTracks={preferences.tracks}
                onChange={setTracks}
            />

            <GenreWidget
                selectedGenres={preferences.genres}
                onChange={setGenres}
            />

            <DecadeWidget
                selectedDecades={preferences.decades}
                onChange={setDecades}
            />

            <PopularityWidget
                popularity={preferences.popularity}
                onChange={setPopularity}
            />

            {/*<MoodWidget mood={preferences.mood} onChange={setMood} />*/}

            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={generating}
                    className="px-4 py-2 rounded-md border text-sm disabled:opacity-60"
                >
                    {generating ? "Generando..." : "Generar playlist"}
                </button>

                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={generating || playlistLength === 0}
                    className="px-4 py-2 rounded-md border text-sm disabled:opacity-60"
                >
                    Refrescar
                </button>

                <button
                    type="button"
                    onClick={onAddMore}
                    disabled={generating}
                    className="px-4 py-2 rounded-md border text-sm disabled:opacity-60"
                >
                    Añadir más
                </button>
            </div>
        </section>
    );
}