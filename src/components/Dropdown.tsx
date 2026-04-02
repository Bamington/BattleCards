/**
 * Dropdown.tsx — Click-triggered dropdown menu
 *
 * Manages its own open/close state. Closes when clicking outside.
 *
 * USAGE EXAMPLES:
 *   <Dropdown trigger={<Button rightIcon={<ChevronDown className="w-4 h-4" />}>Options</Button>}>
 *     <DropdownItem onClick={() => {}}>Edit</DropdownItem>
 *     <DropdownItem icon={<TrashBin className="w-4 h-4" />} onClick={() => {}}>Delete</DropdownItem>
 *   </Dropdown>
 *
 *   <Dropdown trigger={<Button>Account</Button>} align="right">
 *     <DropdownHeader>
 *       <p className="font-semibold">Jane Lee</p>
 *       <p className="text-sm text-gray-500">jane@example.com</p>
 *     </DropdownHeader>
 *     <DropdownDivider />
 *     <DropdownItem>Settings</DropdownItem>
 *     <DropdownItem disabled>Billing (unavailable)</DropdownItem>
 *     <DropdownDivider />
 *     <DropdownItem>Sign out</DropdownItem>
 *   </Dropdown>
 */

import React, { useState, useEffect, useRef } from 'react';

// ── Type definitions ──────────────────────────────────────────────────────────

export type DropdownAlign = 'left' | 'right';

export interface DropdownProps {
  /** The element that toggles the dropdown (e.g. a Button) */
  trigger: React.ReactNode;
  /** Aligns the menu to the left (default) or right edge of the trigger */
  align?: DropdownAlign;
  /** Minimum width of the menu — defaults to 'w-44' */
  menuClassName?: string;
  /** Extra classes on the outer container */
  className?: string;
  children: React.ReactNode;
}

export interface DropdownItemProps {
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** Prevents interaction and greys out the item */
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export interface DropdownHeaderProps {
  className?: string;
  children: React.ReactNode;
}

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * DropdownItem — A single clickable menu entry.
 * Must be rendered inside a Dropdown.
 */
export const DropdownItem = ({
  icon,
  disabled = false,
  onClick,
  className = '',
  children,
}: DropdownItemProps) => {
  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[
          'w-full text-left flex items-center gap-2 px-4 py-2 text-sm font-body',
          disabled
            ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
          className,
        ].filter(Boolean).join(' ')}
      >
        {icon && (
          <span className="shrink-0 text-gray-500 dark:text-gray-400" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </button>
    </li>
  );
};

/**
 * DropdownDivider — A thin horizontal rule for separating item groups.
 */
export const DropdownDivider = () => (
  <li role="separator" className="my-1 h-px bg-gray-100 dark:bg-gray-600" />
);

/**
 * DropdownHeader — A non-interactive section at the top of the menu,
 * typically used to show signed-in user info.
 */
export const DropdownHeader = ({ className = '', children }: DropdownHeaderProps) => (
  <li className={`px-4 py-3 text-sm text-gray-900 dark:text-white ${className}`}>
    {children}
  </li>
);

// ── Main component ────────────────────────────────────────────────────────────

const Dropdown = ({
  trigger,
  align     = 'left',
  menuClassName = 'w-44',
  className = '',
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef        = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const alignClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>

      {/* Trigger — wrapped in a div to capture clicks without overriding the trigger element */}
      <div onClick={() => setIsOpen((o) => !o)}>
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div
          className={[
            'absolute z-50 mt-2 rounded-lg shadow-lg',
            'bg-white dark:bg-gray-700',
            'border border-gray-100 dark:border-gray-600',
            alignClass,
            menuClassName,
          ].join(' ')}
          role="menu"
        >
          <ul className="py-1 text-sm" onClick={() => setIsOpen(false)}>
            {children}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Dropdown;
