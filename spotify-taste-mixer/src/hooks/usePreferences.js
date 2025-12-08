"use client";

import { useState } from "react";

export function usePreferences() {
    const [preferences, setPreferences] = useState({
        artists: [],
        tracks: [],
        genres: [],
        decades: [],
        popularity: [0, 100],
        mood: {
            preset: null,
            energy: [0, 100],
            valence: [0, 100],
            danceability: [0, 100],
            acousticness: [0, 100],
        },
    });

    // Devuelve un handler genérico para cada clave
    function updatePreference(key) {
        return (value) => {
            setPreferences((prev) => ({
                ...prev,
                [key]: value
            }));
        };
    }

    return { preferences, updatePreference};
}