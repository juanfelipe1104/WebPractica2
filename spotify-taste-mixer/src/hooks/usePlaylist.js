"use client";

import { useEffect, useState } from "react";
import { generatePlaylist, savePlaylistToSpotify as saveOnSpotifyApi } from "@/lib/spotify";

const FAVORITES_KEY = "spotify_favorite_tracks";

export function usePlaylist(preferences) {
    const [playlist, setPlaylist] = useState([]);
    const [generating, setGenerating] = useState(false);
    const [playlistError, setPlaylistError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [saving, setSaving] = useState(false);
    // cargar favoritos desde localStorage
    useEffect(() => {
        const raw = localStorage.getItem(FAVORITES_KEY);
        if (!raw) return;
        try {
            setFavorites(JSON.parse(raw));
        } catch {
            setFavorites([]);
        }
    }, []);

    const saveFavorites = (next) => {
        setFavorites(next);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    };

    const isTrackFavorite = (id) => favorites.some((t) => t.id === id);

    const toggleFavorite = (track) => {
        const exists = favorites.some((t) => t.id === track.id);
        if (exists) {
            const next = favorites.filter((t) => t.id !== track.id);
            saveFavorites(next);
        } else {
            const next = [...favorites, track];
            saveFavorites(next);
        }
    };

    const removeTrackFromPlaylist = (id) => {
        setPlaylist((prev) => prev.filter((t) => t.id !== id));
    };

    const hasSources = preferences.artists.length > 0 || preferences.tracks.length > 0 || preferences.genres.length > 0;

    const generate = async () => {
        if (!hasSources) {
            setPlaylistError("Selecciona al menos un artista, canción o género antes de generar la playlist.");
            setPlaylist([]);
            return;
        }
        setGenerating(true);
        setPlaylistError(null);
        try {
            const result = await generatePlaylist(preferences);
            setPlaylist(result);
        } catch (err) {
            console.error(err);
            setPlaylistError("Error generando la playlist.");
        } finally {
            setGenerating(false);
        }
    };

    const refresh = async () => {
        if (playlist.length === 0) return generate();

        setGenerating(true);
        setPlaylistError(null);
        try {
            const result = await generatePlaylist(preferences);
            setPlaylist(result);
        } catch (err) {
            console.error(err);
            setPlaylistError("Error al refrescar la playlist.");
        } finally {
            setGenerating(false);
        }
    };

    const addMore = async () => {
        if (!hasSources) {
            setPlaylistError("Selecciona al menos un artista, canción o género antes de añadir más canciones.");
            return;
        }
        setGenerating(true);
        setPlaylistError(null);
        try {
            const result = await generatePlaylist(preferences);
            const existingIds = new Set(playlist.map((t) => t.id));
            const newOnes = result.filter((t) => !existingIds.has(t.id));
            setPlaylist((prev) => [...prev, ...newOnes]);
        } catch (err) {
            console.error(err);
            setPlaylistError("Error al añadir más canciones.");
        } finally {
            setGenerating(false);
        }
    };

    const addTrackToPlaylist = (track) => {
        setPlaylist((prev) => {
            if (prev.some((t) => t.id === track.id)) return prev;
            return [...prev, track];
        });
    };

    const isInPlaylist = (id) => {
        playlist.some((t) => t.id === id);
    };

    const savePlaylistToSpotify = async (name, description) => {
        if (playlist.length === 0) {
            throw new Error("NO_TRACKS");
        }

        setSaving(true);
        try {
            const created = await saveOnSpotifyApi(playlist, { name, description, isPublic: false });
            return created;
        } catch (err) {
            console.error("Error al guardar playlist en Spotify:", err);
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const reorderTrackInPlaylist = (fromIndex, toIndex) => {
        setPlaylist((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;
        });
    };

    return {
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
        savePlaylistToSpotify,
        saving,
        reorderTrackInPlaylist
    };
}
