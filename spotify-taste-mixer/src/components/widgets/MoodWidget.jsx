"use client";

const PRESETS = {
    happy: {
        label: "Happy",
        emoji: "😊",
        energy: [50, 100],
        valence: [60, 100],
        danceability: [50, 100],
        acousticness: [0, 60],
    },
    sad: {
        label: "Sad",
        emoji: "😢",
        energy: [0, 60],
        valence: [0, 40],
        danceability: [0, 60],
        acousticness: [20, 100],
    },
    energetic: {
        label: "Energetic",
        emoji: "⚡",
        energy: [70, 100],
        valence: [40, 100],
        danceability: [60, 100],
        acousticness: [0, 40],
    },
    calm: {
        label: "Calm",
        emoji: "🌙",
        energy: [0, 50],
        valence: [30, 80],
        danceability: [0, 60],
        acousticness: [40, 100],
    },
};

export default function MoodWidget({ mood, onChange }) {
    const current = mood;

    const updateRange = (key, index, value) => {
        const num = Number(value);
        const range = [...current[key]];
        range[index] = num;
        onChange({ ...current, preset: null, [key]: range });
    };

    const applyPreset = (id) => {
        if (current.preset === id) {
            onChange({
                preset: null,
                energy: [0, 100],
                valence: [0, 100],
                danceability: [0, 100],
                acousticness: [0, 100],
            });
        } else {
            const p = PRESETS[id];
            onChange({
                preset: id,
                energy: p.energy,
                valence: p.valence,
                danceability: p.danceability,
                acousticness: p.acousticness,
            });
        }
    };

    const Slider = ({ label, field }) => (
        <div className="mb-3">
            <div className="flex justify-between text-[11px] text-white/60 mb-1">
                <span>{label}</span>
                <span>
                    {current[field][0]} – {current[field][1]}
                </span>
            </div>
            <div className="flex gap-2 items-center">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={current[field][0]}
                    onChange={(e) => updateRange(field, 0, e.target.value)}
                    className="w-full accent-[#1DB954]"
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={current[field][1]}
                    onChange={(e) => updateRange(field, 1, e.target.value)}
                    className="w-full accent-[#1DB954]"
                />
            </div>
        </div>
    );

    return (
        <div className="rounded-2xl bg-[#181818]/90 border border-white/5 p-4 shadow-lg shadow-black/40">
            <h2 className="font-semibold mb-2 text-base">Mood</h2>
            <p className="text-xs text-white/60 mb-3">
                Ajusta energía y características musicales, o selecciona un mood
                predefinido.
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(PRESETS).map(([id, p]) => (
                    <button
                        key={id}
                        onClick={() => applyPreset(id)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm border flex items-center gap-2 transition
              ${current.preset === id
                                ? "bg-[#1DB954] text-black border-[#1DB954]"
                                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                            }`}
                    >
                        <span>{p.emoji}</span>
                        <span>{p.label}</span>
                    </button>
                ))}
            </div>

            {/* Sliders */}
            <div className="space-y-2">
                <Slider label="Energía" field="energy" />
                <Slider label="Valence (positividad)" field="valence" />
                <Slider label="Danceability" field="danceability" />
                <Slider label="Acousticness" field="acousticness" />
            </div>

            <div className="mt-3 text-[11px] text-white/60">
                Mood seleccionado:{" "}
                {current.preset
                    ? PRESETS[current.preset].label
                    : "personalizado / ninguno"}
            </div>
        </div>
    );
}
