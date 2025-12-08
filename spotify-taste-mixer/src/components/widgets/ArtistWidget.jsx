// src/components/widgets/ArtistWidget.jsx
"use client";

const TEST_ARTISTS = [
    { id: "1", name: "Radiohead" },
    { id: "2", name: "Daft Punk" },
    { id: "3", name: "Taylor Swift" },
    { id: "4", name: "Arctic Monkeys" },
    { id: "5", name: "Kendrick Lamar" },
];

export default function ArtistWidget({ selectedArtists, onChange }) {
    // Función para alternar selección
    const toggleArtist = (artist) => {
        const alreadySelected = selectedArtists.some((a) => a.id === artist.id);

        if (alreadySelected) {
            // quitarlo
            const updated = selectedArtists.filter((a) => a.id !== artist.id);
            onChange(updated);
        } else {
            // añadirlo
            const updated = [...selectedArtists, artist];
            onChange(updated);
        }
    };

    const isSelected = (artist) => {
        selectedArtists.some((a) => a.id === artist.id);
    };

    return (
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Artistas</h2>
            <p className="text-sm text-gray-500 mb-3">
                Haz clic para seleccionar/deseleccionar artistas de prueba.
            </p>
            <div className="flex flex-wrap gap-2">
                {TEST_ARTISTS.map((artist) => (
                    <button
                        key={artist.id}
                        onClick={() => toggleArtist(artist)}
                        className={`px-3 py-1 rounded-full text-sm border transition
                            ${isSelected(artist)
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-800"
                            }`}
                    >
                        {artist.name}
                    </button>
                ))}
            </div>

            <div className="mt-4 text-xs text-gray-600">
                Seleccionados:{" "}
                {selectedArtists.length === 0
                    ? "ninguno"
                    : selectedArtists.map((a) => a.name).join(", ")}
            </div>
        </div>
    );
}