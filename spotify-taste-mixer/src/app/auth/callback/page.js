"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/lib/auth";

export default function CallbackPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevenir ejecución duplicada
    if (hasProcessed.current) return;

    // Leemos los parámetros de la URL directamente
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const errorParam = params.get("error");

    if (errorParam) {
      setError("Autenticación cancelada");
      return;
    }

    if (!code) {
      setError("No se recibió código de autorización");
      return;
    }

    // Validar state para prevenir CSRF
    const savedState = localStorage.getItem("spotify_auth_state");
    if (!state || state !== savedState) {
      setError(
        "Error de validación de seguridad (CSRF). Intenta iniciar sesión de nuevo."
      );
      localStorage.removeItem("spotify_auth_state");
      return;
    }

    // Limpiar state después de validar
    localStorage.removeItem("spotify_auth_state");

    // Marcar como procesado
    hasProcessed.current = true;

    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch("/api/spotify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al obtener token");
        }

        // Guardar tokens (access + refresh + expiración)
        saveTokens(data.access_token, data.refresh_token, data.expires_in);

        // Redirigir al dashboard
        router.push("/spotifyApp/dashboard");
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "Error desconocido");
      }
    };

    exchangeCodeForToken();
  }, [router]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-white mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Estado normal (mientras procesa el code)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
        <p className="text-white text-xl">Autenticando...</p>
      </div>
    </div>
  );
}
