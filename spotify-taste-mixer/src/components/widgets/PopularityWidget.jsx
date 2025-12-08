"use client";

export default function PopularityWidget({ popularity, onChange }) {
    // popularity será [min, max] o [20,80]
    const [min, max] = popularity ?? [20, 80];

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
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Popularidad</h2>
            <p className="text-sm text-gray-500 mb-3">
                Filtra las canciones según su popularidad en Spotify (0–100).
            </p>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                    <span>Mín: {min}</span>
                    <span>Máx: {max}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-600">
                        Popularidad mínima
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={min}
                            onChange={(e) => updateMin(e.target.value)}
                            className="w-full"
                        />
                    </label>

                    <label className="text-xs text-gray-600">
                        Popularidad máxima
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={max}
                            onChange={(e) => updateMax(e.target.value)}
                            className="w-full"
                        />
                    </label>
                </div>

                <button
                    type="button"
                    onClick={clearFilter}
                    className="self-start mt-1 px-2 py-1 text-xs border rounded-md"
                >
                    Quitar filtro de popularidad
                </button>

                <div className="text-xs text-gray-600 mt-1">
                    {popularity
                        ? `Filtrando canciones con popularidad entre ${min} y ${max}.`
                        : "Sin filtro de popularidad (se permiten todos los niveles)."}
                </div>
            </div>
        </div>
    );
}
