"use client";

import { createContext, useContext } from "react";
import { usePreferences } from "@/hooks/usePreferences";
import { usePlaylist } from "@/hooks/usePlaylist";

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const prefs = usePreferences();
  const playlist = usePlaylist(prefs.preferences);

  return (
    <AppStateContext.Provider value={{ ...prefs, ...playlist }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}