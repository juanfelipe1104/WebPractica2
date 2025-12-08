"use client";

import { useEffect, useState } from "react";
import { spotifyRequest } from "@/lib/spotify";
import Header from "@/components/Header";

export default function DashBoardPage() {
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
  return (
    <>
      <Header></Header>
      <h1>Dashboard</h1>
    </>
  );
}
