"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";
import Header from "@/components/Header";
import ArtistWidget from "@/components/widgets/ArtistWidget";

export default function DashBoardPage() {
    const [preferences, setPreferences] = useState({
        artists: [],
        tracks: [],
        genres: [],
        decades: [],
        mood: null,
        popularity: null,
    });


    const handleArtistsChange = (newArtists) => {
        setPreferences((prev) => ({
            ...prev,
            artists: newArtists,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <section className="space-y-4">
                    <ArtistWidget
                        selectedArtists={preferences.artists}
                        onChange={handleArtistsChange}
                    />
                </section>
                {/* Debug preferencias */}
                <section className="border rounded-md p-4">
                    <h2 className="font-semibold mb-2">Debug preferencias</h2>
                    <pre className="text-xs bg-black/5 p-2 rounded-md overflow-auto">
                        {JSON.stringify(preferences, null, 2)}
                    </pre>
                </section>
            </main>
        </div>
    );
}

/*
    const [result, setResult] = useState(null);
    const [error, setError]   = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const url = `https://api.spotify.com/v1/search?type=artist&q=radiohead&limit=5`;
  
      spotifyRequest(url)
        .then((data) => {
          console.log(data);
          setResult(data);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) return <h1>Cargando dashboard…</h1>;
    if (error)   return <h1>Error: {error.message}</h1>;
    */