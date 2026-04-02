/**
 * BloodBowlCard.tsx — Blood Bowl unit card
 *
 * Architecture:
 *   Layer 1 — card-background.svg  : all static chrome (card shape, stat column,
 *             GP shield, section backgrounds, decorative elements)
 *   Layer 2 — Player image          : portrait clipped to a parallelogram using
 *             a CSS mask (image-mask.png from Figma's Image Mask Shape vector)
 *   Layer 3 — Interactive           : dynamically-bound text nodes, positioned to
 *             match the Figma "Interactive" group exactly (node 226:3515)
 *
 * The card renders at its native 556 × 779 px. Scale the outer wrapper with a
 * CSS transform for smaller display sizes.
 *
 * All positions and styles are taken directly from Figma — do not adjust by eye.
 */

import cardBackground      from '../assets/games/card assets/blood-bowl/card-background.svg';
// image-mask.png not used — clip-path polygon derived from Figma vector path instead
import portraitPlaceholder from '../assets/games/card assets/blood-bowl/example-image.jpg';

// ── Font shorthands ───────────────────────────────────────────────────────────
const BROTHERS = { fontFamily: "'Brothers', serif" } as const;
const NOTO     = { fontFamily: "'Noto Sans', sans-serif", fontVariationSettings: "'CTGR' 0, 'wdth' 100" } as const;
const NOTO_MED = { ...NOTO, fontWeight: 500 } as const;

// Stat numbers: Brothers, dark blue, white stroke behind fill (Figma spec)
const STAT_STYLE = {
  ...BROTHERS,
  color:            '#0e457d',
  WebkitTextStroke: '3px white',
  paintOrder:       'stroke fill',
} as const;

// Heading skew/rotate transform — matches Figma: -skew-x-15 rotate-[-6.46deg] scale-y-97
const HEADING_TRANSFORM = 'rotate(-6.46deg) skewX(-15deg) scaleY(0.97)';

// ── Props ─────────────────────────────────────────────────────────────────────

export interface BloodBowlCardProps {
  teamName?:           string;
  unitName?:           string;
  playerRole?:         string;
  /** GP cost displayed in the banner — e.g. "75,000" */
  cost?:               string | number;
  /** Comma-separated skills & traits */
  skills?:             string;
  primaryAttribute?:   string;
  secondaryAttribute?: string;
  /** Portrait image src — defaults to placeholder */
  portrait?:           string;
  ma?: number;
  st?: number;
  ag?: number;
  pa?: number;
  av?: number;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const BloodBowlCard = ({
  teamName           = 'Team Name',
  unitName           = 'Player Name',
  playerRole         = 'Player Role',
  cost               = '0',
  skills             = '—',
  primaryAttribute   = '—',
  secondaryAttribute = '—',
  portrait           = portraitPlaceholder,
  ma = 0,
  st = 0,
  ag = 0,
  pa = 0,
  av = 0,
  className = '',
}: BloodBowlCardProps) => (
  <div
    className={`relative overflow-clip rounded-[30px] shrink-0 ${className}`}
    style={{ width: 556, height: 779 }}
  >

    {/* ── Layer 1: static SVG background ─────────────────────────────── */}
    <img
      src={cardBackground}
      alt=""
      className="absolute inset-0 w-full h-full"
      draggable={false}
    />

    {/* ── Layer 2: player portrait, clipped to parallelogram ───────────
        Node: 240:4619 "Player Image" — x:163 y:50 w:393 h:407
        clip-path polygon derived from Figma's "Image Mask Shape" vector:
          M 0 38 L 393 0 L 393 369 L 0 407 Z */}
    <div
      className="absolute"
      style={{
        left:     163,
        top:      50,
        width:    393,
        height:   407,
        clipPath: 'polygon(0px 38px, 393px 0px, 393px 369px, 0px 407px)',
      }}
    >
      <img
        src={portrait}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>

    {/* ── Layer 3: interactive elements ──────────────────────────────── */}

    {/* ── Card Headings (node 31:11190) ─────────────────────────────── */}

    {/* Team name — 30px Brothers, white, drop shadow */}
    <div
      className="-translate-y-1/2 absolute flex h-[60.362px] items-center justify-start left-[30px] top-[45.18px] w-[232.747px]"
    >
      <div className="flex-none" style={{ transform: HEADING_TRANSFORM }}>
        <div
          className="flex flex-col justify-center leading-[0] not-italic relative text-[30px] text-white whitespace-nowrap"
          style={{ ...BROTHERS, textShadow: '2px 3px 0px black' }}
        >
          <p className="leading-[normal]">{teamName}</p>
        </div>
      </div>
    </div>

    {/* Unit name — 52px Brothers, white, drop shadow */}
    <div
      className="-translate-y-1/2 absolute flex h-[111.509px] items-center justify-start w-[469.971px]"
      style={{ left: '22.85px', top: '72.72px' }}
    >
      <div className="flex-none" style={{ transform: HEADING_TRANSFORM }}>
        <div
          className="flex flex-col justify-center leading-[0] not-italic relative text-[52px] text-white whitespace-nowrap"
          style={{ ...BROTHERS, textShadow: '3px 4px 0px black' }}
        >
          <p className="leading-[normal]">{unitName}</p>
        </div>
      </div>
    </div>

    {/* ── Stat Numbers (node 226:3097) ──────────────────────────────────
        Brothers 58px, #0e457d, 3px white stroke behind fill.
        MA/ST: no suffix. AG/PA/AV: "+" suffix at 28px. */}

    {/* MA — top 153 */}
    <div
      className="absolute flex gap-px items-center leading-[0] not-italic whitespace-nowrap"
      style={{ ...STAT_STYLE, left: 72, top: 153 }}
    >
      <div className="flex flex-col justify-end relative shrink-0 text-[58px]">
        <p className="leading-[normal]">{ma}</p>
      </div>
    </div>

    {/* ST — top 254 */}
    <div
      className="absolute flex gap-px items-center leading-[0] not-italic whitespace-nowrap"
      style={{ ...STAT_STYLE, left: 72, top: 254 }}
    >
      <div className="flex flex-col justify-end relative shrink-0 text-[58px]">
        <p className="leading-[normal]">{st}</p>
      </div>
    </div>

    {/* AG — top 356, with "+" */}
    <div
      className="absolute flex gap-px items-center leading-[0] not-italic whitespace-nowrap"
      style={{ ...STAT_STYLE, left: 72, top: 356 }}
    >
      <div className="flex flex-col justify-end relative shrink-0 text-[58px]">
        <p className="leading-[normal]">{ag}</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[28px]">
        <p className="leading-[normal]">+</p>
      </div>
    </div>

    {/* PA — top 459, with "+" */}
    <div
      className="absolute flex gap-px items-center leading-[0] not-italic whitespace-nowrap"
      style={{ ...STAT_STYLE, left: 72, top: 459 }}
    >
      <div className="flex flex-col justify-end relative shrink-0 text-[58px]">
        <p className="leading-[normal]">{pa}</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[28px]">
        <p className="leading-[normal]">+</p>
      </div>
    </div>

    {/* AV — top 562, with "+" */}
    <div
      className="absolute flex gap-px items-center leading-[0] not-italic whitespace-nowrap"
      style={{ ...STAT_STYLE, left: 72, top: 562 }}
    >
      <div className="flex flex-col justify-end relative shrink-0 text-[58px]">
        <p className="leading-[normal]">{av}</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[28px]">
        <p className="leading-[normal]">+</p>
      </div>
    </div>

    {/* ── GP Cost (node 31:11427) ───────────────────────────────────────
        Brothers 22px, white, centered in the GP banner ribbon. */}
    <div
      className="-translate-x-1/2 -translate-y-full absolute flex flex-col justify-end leading-[0] not-italic text-[22px] text-center text-white whitespace-nowrap"
      style={{ ...BROTHERS, left: 'calc(50% - 196px)', top: 'calc(50% + 330.5px)' }}
    >
      <p className="leading-[normal]">{cost}</p>
    </div>

    {/* ── Player Role (node 240:4610) ───────────────────────────────────
        Brothers 33px, white, centered, tracking -0.66px, uppercase.
        x:163 y:696 w:363 h:38 */}
    <div
      className="absolute flex flex-col justify-center leading-[0] not-italic text-[33px] text-center text-white uppercase"
      style={{ ...BROTHERS, left: 163, top: 696, width: 363, height: 38, letterSpacing: '-0.66px' }}
    >
      <p className="leading-[normal]">{playerRole}</p>
    </div>

    {/* ── Skills and Development (node 31:11374) ───────────────────────
        left:163 top:476 width:367
        gap-[10px] between sections (updated from 18px in Figma redesign)
        Skills Container:   h-[118px] pt-[12px] px-[7px]
        Development Container: gap-px px-[7px] (no vertical padding) */}
    <div
      className="absolute flex flex-col gap-[10px] items-start w-[367px]"
      style={{ left: 163, top: 476 }}
    >
      {/* Skills Container */}
      <div className="flex flex-col h-[118px] items-start pt-[12px] px-[7px] relative shrink-0 w-full">
        <div
          className="flex flex-col font-normal justify-end leading-[0] relative shrink-0 text-[20px] text-black w-[353px]"
          style={NOTO}
        >
          <p className="leading-[normal]">{skills}</p>
        </div>
      </div>

      {/* Development Container */}
      <div
        className="flex flex-col gap-px items-start leading-[0] px-[7px] relative text-[18px] text-black tracking-[-0.36px] size-full"
      >
        {/* Primary */}
        <div className="flex gap-[4px] h-[32px] items-center justify-center relative shrink-0 w-full">
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap" style={NOTO_MED}>
            <p className="leading-[normal]">Primary:</p>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-normal h-full justify-center min-h-px min-w-px relative" style={NOTO}>
            <p className="leading-[normal]">{primaryAttribute}</p>
          </div>
        </div>
        {/* Secondary */}
        <div className="flex gap-[4px] h-[32px] items-center justify-center relative shrink-0 w-full">
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap" style={NOTO_MED}>
            <p className="leading-[normal]">Secondary:</p>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-normal h-full justify-center min-h-px min-w-px relative" style={NOTO}>
            <p className="leading-[normal]">{secondaryAttribute}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default BloodBowlCard;
