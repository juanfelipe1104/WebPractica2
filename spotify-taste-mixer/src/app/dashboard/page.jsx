"use client";

import Header from "@/components/Header";
import { usePreferences } from "@/hooks/usePreferences";
import { usePlaylist } from "@/hooks/usePlaylist";
import WidgetsPanel from "@/components/widgets/WidgetsPanel";
import PlaylistPanel from "@/components/playlist/PlaylistPanel";

export default function DashboardPage() {
    const { preferences, updatePreference } = usePreferences();
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
    } = usePlaylist(preferences);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <WidgetsPanel
                    preferences={preferences}
                    updatePreference={updatePreference}
                    generating={generating}
                    onGenerate={generate}
                    onRefresh={refresh}
                    onAddMore={addMore}
                    playlistLength={playlist.length}
                />

                <PlaylistPanel
                    playlist={playlist}
                    playlistError={playlistError}
                    generating={generating}
                    onRemoveTrack={removeTrackFromPlaylist}
                    onToggleFavorite={toggleFavorite}
                    isTrackFavorite={isTrackFavorite}
                />
            </main>
        </div>
    );
}
