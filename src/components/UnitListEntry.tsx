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

// ── Type definitions ──────────────────────────────────────────────────────────

/** Build status of the unit entry */
export type UnitStatus = 'blank' | 'pending' | 'complete';

export interface UnitListEntryProps {
  /**
   * Build status of this unit.
   * - blank    — placeholder slot, not yet filled in
   * - pending  — unit added but has unsaved changes
   * - complete — unit is fully configured and saved
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
  /** URL for the unit's portrait or game icon */
  avatarSrc?: string;
  /** Called when the row is clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Extra Tailwind classes on the root element */
  className?: string;
}

// ── Status icon ───────────────────────────────────────────────────────────────

const StatusIcon = ({ status, active }: { status: UnitStatus; active: boolean }) => {
  if (status === 'complete') {
    return <CheckCircle className="size-4 shrink-0 text-green-400" />;
  }
  if (status === 'pending') {
    return <DangerCircle className="size-4 shrink-0 text-amber-400" />;
  }
  // blank — plain outlined circle
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`size-4 shrink-0 ${active ? 'text-gray-600' : 'text-gray-700'}`}
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
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

  const displayName = unitName ?? 'New Unit';

  // Name colour
  const nameColor = active && status === 'blank'
    ? 'text-green-400'
    : active
    ? 'text-gray-100'
    : status === 'blank'
    ? 'text-gray-500'
    : 'text-gray-100';

  // Subtitle text
  const subtitle = active && status === 'blank' ? 'currently editing' : (unitType ?? null);
  const subtitleColor = active && status === 'blank' ? 'text-green-700' : 'text-gray-500';

  // Container border
  const borderClass = active ? 'border-green-500' : 'border-gray-700 hover:border-gray-600';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full flex items-center gap-[9px] pr-1 rounded overflow-hidden border transition-colors text-left',
        active ? 'bg-gray-800' : 'bg-gray-900',
        borderClass,
        className,
      ].join(' ')}
    >
      {/* Portrait / icon — 42×42, flush to the left edge, gradient bg */}
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt=""
          className="size-[42px] shrink-0 object-contain bg-gradient-to-b from-[#252525] to-[#181d24]"
        />
      ) : (
        <div className="size-[42px] shrink-0 flex items-center justify-center bg-gradient-to-b from-[#252525] to-[#181d24]">
          <span className="text-xs font-body font-medium text-gray-500">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className={`text-base font-medium font-body leading-6 truncate ${nameColor}`}>
          {displayName}
        </p>
        {subtitle && (
          <p className={`text-xs font-bold font-body uppercase tracking-[1.2px] leading-4 truncate ${subtitleColor}`}>
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
