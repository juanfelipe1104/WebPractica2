"use client";

const DECADES = ["1960", "1970", "1980", "1990", "2000", "2010", "2020"];

export default function DecadeWidget({ selectedDecades, onChange }) {
    const toggleDecade = (decade) => {
        if (selectedDecades.includes(decade)) {
            onChange(selectedDecades.filter((d) => d !== decade));
        } else {
            onChange([...selectedDecades, decade]);
        }
    };

    const isSelected = (decade) => selectedDecades.includes(decade);

    return (
        <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-3">Décadas</h2>
            <p className="text-sm text-gray-500 mb-3">
                Elige las décadas de lanzamiento de las canciones.
            </p>

            <div className="flex flex-wrap gap-2">
                {DECADES.map((decade) => (
                    <button
                        key={decade}
                        onClick={() => toggleDecade(decade)}
                        className={`px-3 py-1 rounded-full text-sm border transition
                            ${isSelected(decade)
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-800"
                            }`}
                    >
                        {decade.slice(0, 3)}0s
                    </button>
                ))}
            </div>

            <div className="mt-2 text-xs text-gray-600">
                Seleccionadas:{" "}
                {selectedDecades.length === 0
                    ? "ninguna"
                    : selectedDecades.map((d) => `${d.slice(0, 3)}0s`).join(", ")}
            </div>
        </div>
    );
}
