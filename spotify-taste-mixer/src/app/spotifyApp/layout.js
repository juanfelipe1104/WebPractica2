import Header from "@/components/Header";
import { AppStateProvider } from "@/context/AppStateContext";

export default function AppLayout({ children }) {
  return (
    <AppStateProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        {children}
      </div>
    </AppStateProvider>
  );
}