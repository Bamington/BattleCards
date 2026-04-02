/**
 * App.tsx — Root component and router
 *
 * This is the top-level component that React renders first.
 * It defines all the routes (URLs) in the app and maps each
 * one to the appropriate page component.
 *
 * Current routes:
 * - /                       → Placeholder home screen (real screens added later)
 * - /gallery                → Component gallery (dev tool — not a user-facing screen)
 * - /app                    → App home (placeholder until designed)
 * - /app/login              → Pre-login screen (sign in / continue as guest)
 * - /app/builder/blood-bowl → Blood Bowl card builder
 *
 * As new pages are designed and built, import them here and add a
 * corresponding <Route> inside the <Routes> block.
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ComponentGallery from './pages/ComponentGallery';
import CardBuilderBloodBowl from './pages/CardBuilderBloodBowl';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Home (placeholder until designs are ready) ── */}
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white gap-4">
              <h1 className="text-4xl font-bold">BattleCards</h1>
              <p className="text-gray-400">App is running. Ready to build.</p>
              {/* Dev-only link — makes it easy to jump to the gallery */}
              <Link
                to="/gallery"
                className="mt-4 text-sm text-blue-400 underline"
              >
                → Open Component Gallery
              </Link>
            </div>
          }
        />

        {/* ── Component Gallery (dev tool) ── */}
        <Route path="/gallery" element={<ComponentGallery />} />

        {/* ── App home (placeholder until designed) ── */}
        <Route path="/app" element={<div className="flex items-center justify-center min-h-screen bg-gray-950 text-white"><p className="text-gray-400">App home coming soon.</p></div>} />

        {/* ── Login ── */}
        <Route path="/app/login" element={<Login />} />

        {/* ── Card Builder — Blood Bowl ── */}
        <Route path="/app/builder/blood-bowl" element={<CardBuilderBloodBowl />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
