/**
 * CardBuilderBloodBowl.tsx — Blood Bowl card builder screen
 *
 * Allows the user to edit a Blood Bowl card. The live card component
 * (BloodBowlCard) is rendered in the centre column, wired to the editor
 * state in the right panel.
 *
 * LAYOUT:
 * ┌──────────────────────────────────────────────────────────┐
 * │  Navbar (fixed, full width)                              │
 * ├──────────┬──────────────────────────┬────────────────────┤
 * │  Unit    │      Card display        │    Edit Card       │
 * │  List    │   (logo + live card)     │   (editor panel)   │
 * │  (256px) │        (flex-1)          │      (256px)       │
 * └──────────┴──────────────────────────┴────────────────────┘
 *
 * Route: /app/builder/blood-bowl
 */

import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UnitListEntry from '../components/UnitListEntry';
import Input from '../components/Input';
import Counter from '../components/Counter';
import Button from '../components/Button';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import BloodBowlCard from '../components/BloodBowlCard';
import UsersGroupRounded from '../icons/UsersGroupRounded';
import UserRounded from '../icons/UserRounded';
import Star from '../icons/Star';
import AddCircle from '../icons/AddCircle';

// ── Navbar height ─────────────────────────────────────────────────────────────
// Matches the Figma header height (53px). Used to offset the body below the
// fixed navbar without wrapping it in a normal-flow spacer element.
const NAVBAR_H = 53;

// ── Card native dimensions ────────────────────────────────────────────────────
const CARD_W = 556;
const CARD_H = 779;

// ── Blood Bowl attribute options ──────────────────────────────────────────────
const ATTRIBUTE_OPTIONS = ['Agility', 'General', 'Mutations', 'Passing', 'Strength', 'Devious'];

// ── Component ─────────────────────────────────────────────────────────────────

const CardBuilderBloodBowl = () => {

  // ── Card scaling — contain within the card content container ────────────────
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const el = cardContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCardScale(Math.min(width / CARD_W, height / CARD_H));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Basic details ───────────────────────────────────────────────────────────
  const [teamName,   setTeamName]   = useState('');
  const [unitName,   setUnitName]   = useState('');
  const [playerRole, setPlayerRole] = useState('');
  const [cost,       setCost]       = useState('');

  // ── Unit stats ──────────────────────────────────────────────────────────────
  const [move,     setMove]     = useState(0);
  const [strength, setStrength] = useState(0);
  const [agility,  setAgility]  = useState(0);
  const [passing,  setPassing]  = useState(0);
  const [armor,    setArmor]    = useState(0);

  // ── Player development ──────────────────────────────────────────────────────
  const [primaryAttr,   setPrimaryAttr]   = useState<string[]>([]);
  const [secondaryAttr, setSecondaryAttr] = useState<string[]>([]);

  // ── Skills ──────────────────────────────────────────────────────────────────
  // Comma-separated list; user adds skills via the Add Skill flow (TBD).
  const [skills, _setSkills] = useState('');

  return (
    <>
      {/* Fixed top navbar */}
      <Navbar />

      {/* ── Page body — fills the viewport below the navbar ──────────────────
          Three-column layout:
          • Left  (w-64): unit list sidebar
          • Center (flex-1): Blood Bowl logo + live card preview
          • Right (w-64): editor form
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="flex overflow-hidden bg-gray-950"
        style={{
          marginTop: NAVBAR_H,
          height: `calc(100vh - ${NAVBAR_H}px)`,
        }}
      >

        {/* ── Left panel: unit list ──────────────────────────────────────── */}
        <aside className="w-64 shrink-0 flex flex-col bg-gray-900
                          border-r border-gray-700 overflow-hidden">

          {/* Deck name */}
          <div className="px-4 py-4 border-b border-gray-700 shrink-0">
            <p className="font-heading text-sm font-bold text-white uppercase tracking-wide
                          truncate">
              Imperial Nobility 11's team
            </p>
          </div>

          {/* Unit list — scrollable */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
            <UnitListEntry
              status="complete"
              unitName="Derrik von Smortz"
              unitType="Linesman"
            />
            <UnitListEntry
              status="pending"
              unitName="Alfred von Klep"
              unitType="Blitzer"
            />
            <UnitListEntry
              status="blank"
              active
              unitName="New Unit"
            />
          </nav>

        </aside>

        {/* ── Center: live card display ──────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center overflow-hidden bg-gray-950">

          {/* Game logo */}
          <div className="flex items-center justify-center w-full shrink-0 h-10">
            <span className="font-heading text-2xl font-bold text-white tracking-[0.25em] uppercase">
              Blood Bowl
            </span>
          </div>

          {/* ── Card content container ────────────────────────────────────
              Fills remaining space. ResizeObserver computes the contain
              scale so the card always fits without overflow. */}
          <div
            ref={cardContainerRef}
            className="flex flex-1 min-h-0 w-full items-center justify-center overflow-hidden"
          >
            {/* Outer wrapper — sized to the card's visual footprint after scaling */}
            <div style={{ width: CARD_W * cardScale, height: CARD_H * cardScale, position: 'relative', flexShrink: 0 }}>
              {/* Inner wrapper — native card size, scaled from top-left */}
              <div
                style={{
                  position:        'absolute',
                  top:             0,
                  left:            0,
                  transform:       `scale(${cardScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <BloodBowlCard
                  teamName={teamName   || 'Team Name'}
                  unitName={unitName     || 'Unit Name'}
                  playerRole={playerRole || 'Player Role'}
                  cost={cost           || '?'}
                  skills={skills}
                  primaryAttribute={primaryAttr.length   ? primaryAttr.join(', ')   : '—'}
                  secondaryAttribute={secondaryAttr.length ? secondaryAttr.join(', ') : '—'}
                  ma={move}
                  st={strength}
                  ag={agility}
                  pa={passing}
                  av={armor}
                />
              </div>
            </div>
          </div>

        </main>

        {/* ── Right panel: editor ───────────────────────────────────────── */}
        <aside className="w-64 shrink-0 flex flex-col bg-gray-900
                          border-l border-gray-700 overflow-hidden">

          {/* "Edit Card" header */}
          <div className="px-4 py-4 border-b border-gray-700 shrink-0">
            <h2 className="font-heading text-sm font-bold text-white uppercase tracking-wide">
              Edit Card
            </h2>
          </div>

          {/* Editor fields — scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

            {/* ── Basic Details ──────────────────────────────────────── */}
            <section className="space-y-3">
              <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Basic Details
              </p>

              <Input
                label="Team Name"
                required
                placeholder="Team Name"
                leftIcon={<UsersGroupRounded className="w-4 h-4" />}
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
              />
              <Input
                label="Unit Name"
                required
                placeholder="Unit Name"
                leftIcon={<UserRounded className="w-4 h-4" />}
                value={unitName}
                onChange={e => setUnitName(e.target.value)}
              />
              <Input
                label="Player Role"
                required
                placeholder="e.g. Thrower, Blitzer"
                leftIcon={<UserRounded className="w-4 h-4" />}
                value={playerRole}
                onChange={e => setPlayerRole(e.target.value)}
              />
              <Input
                label="Cost"
                required
                placeholder="Cost in your roster."
                leftIcon={<Star className="w-4 h-4" />}
                value={cost}
                onChange={e => setCost(e.target.value)}
              />
            </section>

            {/* ── Unit Stats ─────────────────────────────────────────── */}
            <section className="space-y-3">
              <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Unit Stats
              </p>

              {/* Stats displayed in pairs: MA+ST, AG+PA, then AV alone */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <Counter
                  label="Move"
                  required
                  min={0}
                  value={move}
                  onChange={setMove}
                  className="w-full"
                />
                <Counter
                  label="Strength"
                  required
                  min={0}
                  value={strength}
                  onChange={setStrength}
                  className="w-full"
                />
                <Counter
                  label="Agility"
                  required
                  min={0}
                  value={agility}
                  onChange={setAgility}
                  className="w-full"
                />
                <Counter
                  label="Passing"
                  required
                  min={0}
                  value={passing}
                  onChange={setPassing}
                  className="w-full"
                />
              </div>

              <Counter
                label="Armor"
                required
                min={0}
                value={armor}
                onChange={setArmor}
              />
            </section>

            {/* ── Player Development ─────────────────────────────────── */}
            <section className="space-y-3">
              <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Player Development
              </p>

              <MultiSelectDropdown
                label="Primary Attributes"
                required
                helperText="Used for league progression."
                options={ATTRIBUTE_OPTIONS}
                selected={primaryAttr}
                disabledOptions={secondaryAttr}
                onChange={setPrimaryAttr}
              />

              <MultiSelectDropdown
                label="Secondary Attributes"
                required
                helperText="Used for league progression."
                options={ATTRIBUTE_OPTIONS}
                selected={secondaryAttr}
                disabledOptions={primaryAttr}
                onChange={setSecondaryAttr}
              />
            </section>

            {/* ── Skills ─────────────────────────────────────────────── */}
            <section className="space-y-3">
              <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Skills
              </p>

              {/* Placeholder — Add Skill flow to be built separately */}
              <Button
                leftIcon={<AddCircle className="w-4 h-4" />}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Add Skill
              </Button>
            </section>

          </div>
        </aside>

      </div>
    </>
  );
};

export default CardBuilderBloodBowl;
