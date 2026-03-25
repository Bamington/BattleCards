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
    <div>
      {/* Placeholder — real screens will be added here once designs are ready */}
      <h1>BattleCards</h1>
      <p>App is running. Ready to build.</p>
    </div>
  );
}

export default App;
