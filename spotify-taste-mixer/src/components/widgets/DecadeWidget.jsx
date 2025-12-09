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
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Décadas</h2>
            <p className="text-xs text-white/60 mb-3">
                Elige las décadas de lanzamiento que quieres priorizar.
            </p>

            <div className="flex flex-wrap gap-2">
                {DECADES.map((decade) => (
                    <button
                        key={decade}
                        onClick={() => toggleDecade(decade)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm border transition
                            ${isSelected(decade)
                                ? "bg-[#1DB954] text-black border-[#1DB954]"
                                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {decade.slice(0, 3)}0s
                    </button>
                ))}
            </div>

            <div className="mt-3 text-[11px] text-white/60">
                Seleccionadas:{" "}
                {selectedDecades.length === 0
                    ? "ninguna"
                    : selectedDecades.map((d) => `${d.slice(0, 3)}0s`).join(", ")}
            </div>
        </div>
    );
}
