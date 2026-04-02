/**
 * UnitListEntry.tsx — Army list row component
 *
 * Displays a single unit entry in an army list. Shows the unit's name,
 * type, portrait, and build status. Supports an active/editing state.
 *
 * USAGE EXAMPLES:
 *   <UnitListEntry />
 *   <UnitListEntry status="complete" unitName="Jane-664" unitType="Spartan ZVEZDA" />
 *   <UnitListEntry status="pending"  unitName="Mk. VII Warrior" unitType="UNSC Marine" />
 *   <UnitListEntry status="complete" active unitName="Jane-664" unitType="Spartan ZVEZDA" />
 *   <UnitListEntry avatarSrc="/portraits/jane-664.png" status="complete" unitName="Jane-664" />
 */

import React from 'react';
import CheckCircle from '../icons/CheckCircle';
import DangerCircle from '../icons/DangerCircle';
import CloseCircle from '../icons/CloseCircle';

// ── Type definitions ──────────────────────────────────────────────────────────

/** Build status of the unit entry */
export type UnitStatus = 'blank' | 'pending' | 'complete';

export interface UnitListEntryProps {
  /**
   * Build status of this unit.
   * - blank    — placeholder slot, not yet filled in
   * - pending  — unit added but has unsaved changes
   * - complete — unit is fully configured
   */
  status?: UnitStatus;
  /**
   * Whether this entry is currently selected / being edited.
   * Applies a green border and highlights the name in success green.
   */
  active?: boolean;
  /** Primary label — the unit's display name */
  unitName?: string;
  /** Secondary label — unit faction or type (e.g. "Spartan ZVEZDA") */
  unitType?: string;
  /** URL for the unit's portrait thumbnail */
  avatarSrc?: string;
  /** Called when the row is clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Extra Tailwind classes on the root element */
  className?: string;
}

// ── Lookup tables ─────────────────────────────────────────────────────────────

/** Status icon component per status */
const StatusIcon = ({ status, active }: { status: UnitStatus; active: boolean }) => {
  const baseClass = 'w-5 h-5 shrink-0';

  if (status === 'complete') {
    return <CheckCircle className={`${baseClass} text-green-400`} />;
  }
  if (status === 'pending') {
    return <DangerCircle className={`${baseClass} text-amber-400`} />;
  }
  // blank
  return <CloseCircle className={`${baseClass} ${active ? 'text-gray-600' : 'text-gray-700'}`} />;
};

// ── Component ─────────────────────────────────────────────────────────────────

const UnitListEntry = ({
  status    = 'blank',
  active    = false,
  unitName,
  unitType,
  avatarSrc,
  onClick,
  className = '',
}: UnitListEntryProps) => {

  // Resolve display name — blank slots show a placeholder
  const displayName = unitName ?? (status === 'blank' ? 'New Unit' : 'Unknown Unit');

  // Container styles
  const containerBase =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors text-left';

  const containerState = active
    ? 'bg-gray-800 border-green-500'
    : 'bg-gray-900 border-gray-700 hover:border-gray-600';

  // Name text colour
  const nameColor = active && status === 'blank'
    ? 'text-green-400'
    : active
    ? 'text-gray-100'
    : status === 'blank'
    ? 'text-gray-500'
    : 'text-gray-100';

  // Subtitle text (active-blank shows "currently editing", others show unitType)
  const subtitle = active && status === 'blank'
    ? 'currently editing'
    : unitType ?? null;

  const subtitleColor = active && status === 'blank'
    ? 'text-green-700'
    : 'text-gray-500';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${containerBase} ${containerState} ${className}`}
    >
      {/* Portrait avatar */}
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-9 h-9 rounded-sm object-cover shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-sm bg-gray-700 shrink-0 flex items-center justify-center">
          <span className="text-xs font-body font-medium text-gray-500">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium font-body truncate ${nameColor}`}>
          {displayName}
        </p>
        {subtitle && (
          <p className={`text-xs font-body truncate ${subtitleColor}`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Status icon */}
      <StatusIcon status={status} active={active} />
    </button>
  );
};

export default UnitListEntry;
