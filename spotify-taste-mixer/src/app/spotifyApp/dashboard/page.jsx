"use client";

import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
import WidgetsPanel from "@/components/widgets/WidgetsPanel";

export default function DashboardPage() {
    const router = useRouter();
    const {
        preferences,
        updatePreference,
        resetPreferences,
        generate,
        generating
    } = useAppState();

    const goAndGenerate = async () => {
        await generate();
        router.push("/spotifyApp/playlist");
    };

    return (
        <main className="flex-1">
            <div className="max-w-6xl mx-auto w-full p-4 md:p-6">
                <WidgetsPanel
                    preferences={preferences}
                    updatePreference={updatePreference}
                    resetPreferences={resetPreferences}
                    generating={generating}
                    onGenerate={goAndGenerate}
                />
            </div>
        </main>
    );
}