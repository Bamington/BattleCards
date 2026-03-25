/**
 * ComponentGallery.tsx — Component Gallery Page
 *
 * This page is a living reference for every UI component in the app.
 * It exists purely as a development tool — not a real screen users will see.
 *
 * HOW TO USE:
 * As new components are built, import them here and drop them into the
 * relevant section below. Each component should be shown in all of its
 * meaningful states (e.g. default, hover, disabled, loading).
 *
 * Navigate to this page at: http://localhost:5173/gallery
 */

const ComponentGallery = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-1">Component Gallery</h1>
        <p className="text-gray-400">
          A reference for every UI component used in BattleCards.
        </p>
      </div>

      {/*
       * ── SECTIONS ──────────────────────────────────────────────────
       * Add a new <section> block for each component category.
       * Example categories: Buttons, Cards, Inputs, Typography, Icons…
       *
       * Template for adding a new section:
       *
       *   <GallerySection title="Component Name">
       *     <YourComponent />
       *     <YourComponent variant="secondary" />
       *     <YourComponent disabled />
       *   </GallerySection>
       *
       */}

      {/* Placeholder — sections will appear here as components are built */}
      <p className="text-gray-600 italic">
        No components yet — they'll appear here as they're built.
      </p>

    </div>
  );
};

/**
 * GallerySection — Wrapper for each component group
 *
 * Renders a labelled section with a divider, keeping the gallery
 * organised as the number of components grows.
 *
 * Props:
 * - title:    The section heading (e.g. "Buttons", "Unit Cards")
 * - children: The component previews to display inside the section
 */
const GallerySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mb-16">

      {/* Section title + divider */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-300 whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px bg-gray-800 flex-1" />
      </div>

      {/* Component previews — wraps onto new rows automatically */}
      <div className="flex flex-wrap gap-4">
        {children}
      </div>

    </section>
  );
};

// Export GallerySection so it can be imported alongside ComponentGallery
// if sections are ever split into separate files.
export { GallerySection };
export default ComponentGallery;
