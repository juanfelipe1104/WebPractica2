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
    "lo-fi"
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
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Géneros</h2>
            <p className="text-xs text-white/60 mb-3">
                Selecciona uno o varios géneros para orientar la recomendación.
            </p>

            <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm border capitalize transition
                            ${isSelected(genre)
                                ? "bg-[#1DB954] text-black border-[#1DB954]"
                                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {genre.replace("-", " ")}
                    </button>
                ))}
            </div>

            <div className="mt-3 text-[11px] text-white/60">
                Seleccionados:{" "}
                {selectedGenres.length === 0
                    ? "ninguno"
                    : selectedGenres.join(", ")}
            </div>
        </div>
    );
}
