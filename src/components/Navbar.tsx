/**
 * Navbar.tsx — Top navigation bar
 *
 * A responsive navigation bar fixed to the top of the screen.
 * On mobile (<md), nav links collapse behind a hamburger button.
 * On desktop (≥md), nav links are shown inline.
 *
 * STRUCTURE:
 * ┌─────────────────────────────────────────────────┐
 * │  [Brand / Logo]        [Nav Links]  [Actions]   │
 * └─────────────────────────────────────────────────┘
 *
 * ADDING CONTENT:
 * - Brand:   Replace the placeholder in the `brand` slot below
 * - Links:   Add <NavbarLink> elements inside the nav links slot
 * - Actions: Add buttons/icons inside the actions slot (right side)
 *
 * PROPS:
 * - fixed:     Pins the navbar to the top of the viewport (default: true)
 * - className: Optional extra Tailwind classes on the outer <nav>
 */

import { useState } from 'react';
import { Bars, Close } from 'flowbite-react-icons/outline';

interface NavbarProps {
  /** Pin navbar to top of viewport. Set false when previewing in the gallery. */
  fixed?: boolean;
  /** Extra Tailwind classes for the outer <nav> element */
  className?: string;
}

const Navbar = ({ fixed = true, className = '' }: NavbarProps) => {
  // Tracks whether the mobile menu is open or closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={[
        // Base styles
        'w-full z-30 bg-white dark:bg-gray-900',
        'border-b border-gray-200 dark:border-gray-700',
        // Fixed positioning (disabled in gallery preview)
        fixed ? 'fixed top-0 left-0' : 'relative',
        className,
      ].join(' ')}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ── Brand / Logo slot ─────────────────────────────────────────
            Replace this placeholder with your logo or app name.
            Example:
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.svg" className="h-7" alt="BattleCards" />
                <span className="font-heading text-xl text-white">BattleCards</span>
              </Link>
        ──────────────────────────────────────────────────────────────── */}
        <div className="font-heading text-lg text-gray-900 dark:text-white">
          {/* Brand goes here */}
          BattleCards
        </div>

        {/* ── Desktop nav links slot (hidden on mobile) ─────────────────
            Add <NavbarLink> or <a> elements here.
            Example:
              <NavbarLink href="/">Home</NavbarLink>
              <NavbarLink href="/library">Card Library</NavbarLink>
        ──────────────────────────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-6">
          {/* Nav links go here */}
          <li className="font-body text-sm text-gray-400 italic">No links yet</li>
        </ul>

        {/* ── Actions slot (right side) ─────────────────────────────────
            Place icon buttons, a user avatar, or a CTA button here.
            Example:
              <button className="..."><User /></button>
        ──────────────────────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          {/* Actions go here */}
        </div>

        {/* ── Mobile: hamburger toggle ───────────────────────────────────
            Visible only on mobile (<md). Toggles the mobile menu below.
        ──────────────────────────────────────────────────────────────── */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400
                     hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <Close /> : <Bars />}
        </button>

      </div>

      {/* ── Mobile menu (shown when hamburger is open) ─────────────────
          This panel drops down below the navbar on small screens.
          Add the same nav links and actions here as the desktop slots.
      ──────────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-900 px-4 py-3 space-y-1">

          {/* Mobile nav links go here */}
          <p className="font-body text-sm text-gray-400 italic">No links yet</p>

          {/* Mobile actions go here */}
        </div>
      )}

    </nav>
  );
};

/**
 * NavbarLink — A single navigation link for use inside Navbar.
 *
 * Renders an anchor tag styled for the navbar. Pass `active` to
 * highlight the currently active route.
 *
 * Props:
 * - href:      The URL to navigate to
 * - active:    Highlights this link as the current page
 * - children:  The link label
 */
interface NavbarLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

export const NavbarLink = ({ href, active = false, children }: NavbarLinkProps) => (
  <a
    href={href}
    className={[
      'font-body text-sm transition-colors',
      active
        ? 'text-blue-600 dark:text-blue-400 font-medium'
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
    ].join(' ')}
    aria-current={active ? 'page' : undefined}
  >
    {children}
  </a>
);

export default Navbar;
