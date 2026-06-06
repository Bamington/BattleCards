/**
 * PackListItem.tsx — Pack list row card
 *
 * A compact card representing a single content pack as seen in the home
 * screen's Packs column. Shows a 64×64 game thumbnail on the left, the
 * pack name + game name centred, and a download button on the right.
 * Below that: an HR, a wrap of badges summarising the pack contents
 * (Units / Rules / per-addon-type), and a brief description.
 *
 * Matches the Figma "Card / Rules Pack" component (node 897:15279).
 *
 * USAGE EXAMPLES:
 *   <PackListItem
 *     name="Black Orc Player Cards"
 *     gameName="Blood Bowl"
 *     thumbnailBg="bg-[#15417e]"
 *     thumbnail={<img src={iconBloodBowl} alt="" className="size-full object-cover" />}
 *     badges={[
 *       { label: '8 Units',    icon: <UserRounded className="size-3.5" /> },
 *       { label: '14 Skills',  icon: <Star        className="size-3.5" /> },
 *     ]}
 *     description="All the Black Orc players from Season 3 of Blood Bowl, including all skills and traits."
 *     onDownload={() => importPack(pack.id)}
 *   />
 *
 * PROPS:
 *   name         — Pack title displayed in Tanker (heading) font.
 *   gameName     — Name of the game the pack belongs to. Rendered small
 *                  under the title at 50% opacity.
 *   thumbnail    — Content for the 64×64 thumbnail (typically an <img>).
 *                  Omit to show only the thumbnailBg colour.
 *   thumbnailBg  — Tailwind bg class(es) for the thumbnail container.
 *                  Defaults to bg-gray-700.
 *   badges       — Ordered array of content badges. Each badge takes a
 *                  label (e.g. "8 Units") and an optional icon node.
 *                  The component renders them via the existing <Badge>
 *                  with variant=solid, color=primary, size=lg.
 *   description  — Free-text blurb. Author-written.
 *   onDownload   — Called when the user clicks the download button.
 *   className    — Extra Tailwind classes on the outer element.
 */

import React from 'react';
import Badge from './Badge';
import ArrowDown from '../icons/ArrowDown';

// ── Type definitions ──────────────────────────────────────────────────────────

export interface PackBadge {
  /** Label text, e.g. "8 Units", "14 Skills". */
  label: string;
  /** Optional icon node. Size the icon to size-3.5 (14×14) so it fits
   *  the Badge component's icon slot without overflow. */
  icon?: React.ReactNode;
}

export interface PackListItemProps {
  /** Pack title */
  name: string;
  /** Game name displayed under the title */
  gameName: string;
  /**
   * Content rendered inside the 64×64 thumbnail container.
   * Typically <img src={icon} alt="" className="size-full object-cover" />.
   * Omit to show only the thumbnailBg colour.
   */
  thumbnail?: React.ReactNode;
  /** Tailwind class(es) for the thumbnail background */
  thumbnailBg?: string;
  /** Content summary badges (Units, Rules, per-addon-type) */
  badges?: PackBadge[];
  /** Author-written description */
  description?: string;
  /** Called when the user clicks the download button */
  onDownload?: () => void;
  /** Extra Tailwind classes on the outer element */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const PackListItem = ({
  name,
  gameName,
  thumbnail,
  thumbnailBg = 'bg-gray-700',
  badges      = [],
  description,
  onDownload,
  className   = '',
}: PackListItemProps) => {
  return (
    <div
      className={[
        // Layout
        'flex flex-col gap-1.5 w-full p-[13px]',
        // Appearance — matches Figma Card / Rules Pack
        'bg-gray-800 border border-gray-700 rounded-lg shadow-sm',
        className,
      ].filter(Boolean).join(' ')}
    >

      {/* ── Top row: thumbnail + title + download ─────────────────────── */}
      <div className="flex gap-1.5 items-center w-full">

        {/* Thumbnail */}
        <div
          className={[
            'shrink-0 size-16 overflow-hidden rounded',
            thumbnailBg,
          ].join(' ')}
        >
          {thumbnail}
        </div>

        {/* Title + game name */}
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="font-heading text-[18px] leading-6 text-white truncate">
            {name}
          </p>
          <p className="font-body font-bold text-sm leading-5 text-gray-300 opacity-50 truncate">
            {gameName}
          </p>
        </div>

        {/* Download button — icon-only, styled to match Button's
            outline + primary variant. Built as a plain <button> rather
            than the Button component because Button doesn't forward
            aria-label and is designed for text+icon, not icon-only. */}
        {onDownload && (
          <button
            type="button"
            aria-label={`Download ${name}`}
            onClick={onDownload}
            className={[
              'shrink-0 inline-flex items-center justify-center p-2.5 rounded-lg',
              'border transition-colors focus:outline-none',
              'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300',
              'dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950 dark:focus:ring-blue-800',
            ].join(' ')}
          >
            <ArrowDown className="size-4" />
          </button>
        )}

      </div>

      {/* ── Divider ───────────────────────────────────────────────────── */}
      {/* Plain <hr> rather than the HR component — the latter ships with
          my-8, which is way too much spacing for this card. Outer card's
          gap-1.5 controls the breathing room here. */}
      {(badges.length > 0 || description) && (
        <hr className="border-0 h-px bg-gray-700 m-0 w-full" />
      )}

      {/* ── Badge row ─────────────────────────────────────────────────── */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {badges.map((b, i) => (
            <Badge
              key={`${b.label}-${i}`}
              variant="solid"
              color="primary"
              size="lg"
              icon={b.icon}
            >
              {b.label}
            </Badge>
          ))}
        </div>
      )}

      {/* ── Description ───────────────────────────────────────────────── */}
      {description && (
        <p className="font-body text-base leading-6 text-white">
          {description}
        </p>
      )}

    </div>
  );
};

export default PackListItem;
