"use client";

const GENRES = [
    "rock",
    "pop",
    "indie",
    "hip-hop",
    "rap",
    "metal",
    "punk",
    "electronic",
    "house",
    "techno",
    "dance",
    "reggaeton",
    "latin",
    "jazz",
    "blues",
    "soul",
    "r&b",
    "classical",
    "soundtrack",
    "lo-fi",
];

export default function GenreWidget({ selectedGenres, onChange }) {
    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            onChange(selectedGenres.filter((g) => g !== genre));
        } else {
            onChange([...selectedGenres, genre]);
        }
    };

    const isSelected = (genre) => selectedGenres.includes(genre);

    return (
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Géneros</h2>
            <p className="text-sm text-gray-500 mb-3">
                Selecciona uno o varios géneros para orientar la playlist.
            </p>

            <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1 rounded-full text-sm border capitalize transition
                            ${isSelected(genre)
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-800"
                            }`}
                    >
                        {genre.replace("-", " ")}
                    </button>
                ))}
            </div>

            <div className="mt-2 text-xs text-gray-600">
                Seleccionados:{" "}
                {selectedGenres.length === 0
                    ? "ninguno"
                    : selectedGenres.join(", ")}
            </div>
        </div>
    );
}
