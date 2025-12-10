import { getAccessToken } from "./auth";

export async function generatePlaylist(preferences) {
	const { artists, tracks, genres, decades, popularity } = preferences;
	let allTracks = [];

	//0. Incluir tracks seleccionadas directamente
	allTracks.push(...tracks);

	// 1. Obtener top tracks de artistas seleccionados
	for (const artist of artists) {
		const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`);
		allTracks.push(...data.tracks);
	}

	// 2. Buscar por géneros
	for (const genre of genres) {
		const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`);
		allTracks.push(...data.tracks.items);
	}

	// 3. Filtrar por década
	if (decades.length > 0) {
		allTracks = allTracks.filter(track => {
			const release_date = track.album?.release_date;
			if (!release_date) return true; // Si no hay fecha, no filtrar
			const year = new Date(release_date).getFullYear();
			return decades.some(decade => {
				const decadeStart = parseInt(decade);
				return year >= decadeStart && year < decadeStart + 10;
			});
		});
	}

	// 4. Filtrar por popularidad
	if (popularity) {
		const [min, max] = popularity;
		allTracks = allTracks.filter(track => {
			if (typeof track.popularity !== "number") return true; // Si no hay popularidad, no filtrar
			return track.popularity >= min && track.popularity <= max;
		});
	}

	// 5. Simplificar objetos de canciones
	const simplified = allTracks.map((track) => {
		let artistsStr;
		if (Array.isArray(track.artists)) {
			artistsStr = track.artists.map((a) => a.name).join(", ");
		} else {
			artistsStr = track.artists ?? "";
		}
		const albumName = typeof track.album === "string" ? track.album : track.album?.name;

		const imageUrl = track.image ?? track.album?.images?.[0]?.url ?? null;

		return {
			id: track.id,
			name: track.name,
			artists: artistsStr,
			album: albumName,
			image: imageUrl,
			preview_url: track.preview_url,
		};
	});

	// 6. Eliminar duplicados y limitar a 100 canciones
	const uniqueTracks = Array.from(
		new Map(simplified.map(track => [track.id, track])).values()
	).slice(0, 100);

	// 7. Shuffle tracks
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// 8. Ver canciones elegidas por el usuario y completar con aleatorias
	const selectedTrackIds = new Set(tracks.map(t => t.id));
	const userTracks = uniqueTracks.filter((t) => selectedTrackIds.has(t.id));
	const otherTracks = uniqueTracks.filter((t) => !selectedTrackIds.has(t.id));
	shuffleArray(otherTracks);

	// 9. Combinar y limitar a 30 canciones
	const final = [...userTracks, ...otherTracks].slice(0, 30);

	return final;
}

// Crea una playlist en la cuenta del usuario actual
export async function createSpotifyPlaylist(name, description = "", isPublic = false) {
	const body = {
		name,
		description,
		public: isPublic,
	};

	const data = await spotifyRequest("https://api.spotify.com/v1/me/playlists", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return data; // contiene id, external_urls.spotify, ...
}

// Añade una lista de track IDs a una playlist de Spotify
export async function addTracksToSpotifyPlaylist(playlistId, trackIds) {
	if (!trackIds || trackIds.length === 0) return;

	const uris = trackIds.map((id) => `spotify:track:${id}`);

	// Spotify solo permite 100 URIs por petición
	const chunkSize = 100;
	for (let i = 0; i < uris.length; i += chunkSize) {
		const chunk = uris.slice(i, i + chunkSize);

		await spotifyRequest(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ uris: chunk })
		});
	}
}

// Guardar la playlist actual (array de tracks) en Spotify
export async function savePlaylistToSpotify(tracks, { name, description = "", isPublic = false } = {}) {
	if (!tracks || tracks.length === 0) {
		throw new Error("NO_TRACKS");
	}

	const created = await createSpotifyPlaylist(name, description, isPublic);

	await addTracksToSpotifyPlaylist(created.id, tracks.map((t) => t.id));

	return created; // devolvemos para obtener el enlace a Spotify
}

export async function spotifyRequest(url, options = {}) {
	let token = await getAccessToken();

	// Si no hay token, redirigir al login
	if (!token) {
		throw new Error("No hay token de Spotify. Inicia sesión de nuevo.");
	}

	const response = await fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error(`Error ${response.status}: ${response.statusText}`);
	}

	return response.json();
}