/**
 * App.tsx — Root component
 *
 * This is the top-level component that React renders first.
 * As the app grows, this will handle routing between pages
 * (e.g. Home, Card Editor, Card Library).
 *
 * For now it renders a simple placeholder so we can confirm
 * the dev server and build pipeline are working correctly.
 */

function App() {
  return (
    /* Tailwind smoke test — these classes confirm Tailwind is processing correctly */
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-2">BattleCards</h1>
      <p className="text-gray-400">App is running. Ready to build.</p>
    </div>
  );
}

export default App;
