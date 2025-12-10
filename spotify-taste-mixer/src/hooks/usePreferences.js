"use client";

import { useState, useEffect } from "react";

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

    useEffect(() => {
        const saved = localStorage.getItem("taste_mixer_preferences");
        if (saved) {
            try {
                setPreferences(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading saved preferences:", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("taste_mixer_preferences", JSON.stringify(preferences));
    }, [preferences]);

    const resetPreferences = () => {
        setPreferences({
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
    };

    return { preferences, updatePreference, resetPreferences };
}