/**
 * Navbar.tsx — Top navigation bar
 *
 * Matches the Figma "Navbar" component (node 9:6518):
 * dark gray background, BattleCards logo on the left, and an optional
 * right-side slot for nav items / action buttons.
 *
 * STRUCTURE:
 * ┌─────────────────────────────────────────────────┐
 * │  BATTLECARDS                      [children]    │
 * └─────────────────────────────────────────────────┘
 *
 * USAGE:
 *   // Logo only
 *   <Navbar />
 *
 *   // With nav actions on the right
 *   <Navbar>
 *     <Button variant="ghost" color="secondary" size="xs">Library</Button>
 *     <Button size="xs">Sign In</Button>
 *   </Navbar>
 *
 * PROPS:
 *   fixed     — Pins the bar to the top of the viewport (default: true).
 *               Pass false when the navbar sits inside a scrollable layout.
 *   className — Extra Tailwind classes on the outer <nav> element.
 *   children  — Rendered in the right-side flex container.
 */

import { Link } from 'react-router-dom';

interface NavbarProps {
  /** Pin navbar to top of viewport. Set false for in-flow layouts. */
  fixed?: boolean;
  /** Extra Tailwind classes on the outer <nav> element */
  className?: string;
  /** Right-side content — buttons, links, user avatar, etc. */
  children?: React.ReactNode;
}

const Navbar = ({ fixed = true, className = '', children }: NavbarProps) => {
  return (
    <nav
      className={[
        'w-full z-30 bg-gray-900 border-b border-gray-700',
        fixed ? 'fixed top-0 left-0' : 'relative',
        className,
      ].join(' ')}
    >
      <div className="px-3 pt-3 pb-[13px] flex items-center">

        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link to="/" className="shrink-0 h-4 flex items-center">
          <span className="font-heading text-white text-[13px] leading-none uppercase tracking-wide">
            BattleCards
          </span>
        </Link>

        {/* ── Right-side slot ───────────────────────────────────────────
            Takes the remaining horizontal space. Children are right-aligned
            with a 12px gap, matching the Figma layout.
        ─────────────────────────────────────────────────────────────── */}
        <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
          {children}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
