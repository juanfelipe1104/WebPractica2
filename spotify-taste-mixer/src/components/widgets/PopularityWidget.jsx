"use client";

export default function PopularityWidget({ popularity, onChange }) {
    const [min, max] = popularity;

    const updateMin = (value) => {
        const newMin = Number(value);
        const safeMin = Math.min(newMin, max); // evitar que min supere a max
        onChange([safeMin, max]);
    };

    const updateMax = (value) => {
        const newMax = Number(value);
        const safeMax = Math.max(newMax, min); // evitar que max sea menor que min
        onChange([min, safeMax]);
    };

    const clearFilter = () => {
        onChange(null); // sin filtro de popularidad
    };

    return (
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Popularidad</h2>
            <p className="text-xs text-white/60 mb-3">
                Filtra las canciones según su popularidad en Spotify (0–100).
            </p>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                    <span>Mín: {min}</span>
                    <span>Máx: {max}</span>
                </div>

                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-[11px] text-white/60 mb-1">
                            <span>Popularidad mínima</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={min}
                            onChange={(e) => updateMin(e.target.value)}
                            className="w-full accent-[#1DB954]"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-[11px] text-white/60 mb-1">
                            <span>Popularidad máxima</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={max}
                            onChange={(e) => updateMax(e.target.value)}
                            className="w-full accent-[#1DB954]"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <button
                        onClick={clearFilter}
                        className="px-2 py-1 text-[11px] border border-white/20 rounded-full text-white/70 hover:bg-white/10 transition"
                    >
                        Quitar filtro
                    </button>
                    <span className="text-[11px] text-white/60">
                        {popularity
                            ? `Mostrando ${min}–${max}`
                            : "Sin filtro de popularidad"}
                    </span>
                </div>
            </div>
        </div>
    );
}
