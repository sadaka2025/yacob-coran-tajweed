import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuranAyahPage from "./pages/QuranAyahPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection automatique vers le premier ayah */}
        <Route path="/" element={<Navigate to="/quran/1/1" />} />

        {/* Route principale */}
        <Route
          path="/quran/:surah/:ayah"
          element={
            <QuranAyahPage
              surah={1}
              ayah={1}
              text="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
              ruleTrees={{}} // Remplace par tes vraies données RuleTrees
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
