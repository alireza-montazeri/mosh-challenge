import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "./views/HomePage";
import NewSnapshotPage from "./views/NewSnapshotPage";
import SnapshotDetailPage from "./views/SnapshotDetailPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/snapshots/new" element={<NewSnapshotPage />} />
          <Route path="/snapshots/:id" element={<SnapshotDetailPage />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
