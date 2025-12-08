"use client";

import { useEffect, useState } from "react";
import { getAccessToken, refreshAccessToken } from "@/lib/auth";

async function spotifyRequest(url) {
  let token = getAccessToken();
  
  if (!token) {
    token = await refreshAccessToken();
    if (!token) {
      window.location.href = "/";
      return null;
    }
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export default function DashBoardPage() {
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

  return (
    <>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}
