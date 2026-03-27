/**
 * ComponentGallery.tsx — Component Gallery Page
 *
 * A living reference for every UI component in the app.
 * This page is a development tool only — not a screen users will see.
 *
 * HOW TO USE:
 * As new components are built, import them here and add a <GallerySection>
 * below. Show every meaningful variant and state so components can be
 * reviewed and tweaked in isolation from the pages that use them.
 *
 * Navigate to this page at: http://localhost:5173/gallery
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/Text';
import List from '../components/List';
import TextLink from '../components/TextLink';
import HR from '../components/HR';
import { RAW_PALETTE, SEMANTIC_PALETTE, type ColorFamily } from '../data/colors';

// ── Icon imports (outline) ────────────────────────────────────────────────────
import {
  Home, Search, Bell, BellActive, Cog, Star, Bookmark,
  Plus, Minus, Close, Check, CheckCircle, CloseCircle,
  Edit, TrashBin, Download, Upload, FloppyDisk, ShareNodes,
  Filter, DotsHorizontal, DotsVertical, Eye, EyeSlash,
  Lock, LockOpen, InfoCircle, ExclamationCircle, QuestionCircle,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  User, Users, UserAdd, UserCircle,
  Grid, List as ListIcon, Inbox, Envelope,
  Image, FileLines, Folder, Clipboard,
  Play, Pause, Stop, Microphone, VideoCamera,
  Moon, Sun, Rocket, Shield, Flag, Heart,
} from 'flowbite-react-icons/outline';

// ── Icon imports (solid) ──────────────────────────────────────────────────────
// Note: not every outline icon has a solid counterpart — those show null in the grid.
import {
  Home as HomeSolid, Search as SearchSolid,
  Bell as BellSolid, BellActive as BellActiveSolid, Cog as CogSolid,
  Star as StarSolid, Bookmark as BookmarkSolid, Heart as HeartSolid,
  Rocket as RocketSolid, Shield as ShieldSolid, Flag as FlagSolid,
  CheckCircle as CheckCircleSolid, CloseCircle as CloseCircleSolid,
  InfoCircle as InfoCircleSolid, ExclamationCircle as ExclamationCircleSolid,
  QuestionCircle as QuestionCircleSolid,
  Edit as EditSolid, TrashBin as TrashBinSolid,
  Download as DownloadSolid, Upload as UploadSolid,
  FloppyDisk as FloppyDiskSolid, ShareNodes as ShareNodesSolid,
  Filter as FilterSolid, Eye as EyeSolid, EyeSlash as EyeSlashSolid,
  Lock as LockSolid, LockOpen as LockOpenSolid,
  User as UserSolid, Users as UsersSolid,
  UserAdd as UserAddSolid, UserCircle as UserCircleSolid,
  Grid as GridSolid, Inbox as InboxSolid, Envelope as EnvelopeSolid,
  Image as ImageSolid, FileLines as FileLinesSolid,
  Folder as FolderSolid, Clipboard as ClipboardSolid,
  Play as PlaySolid, Pause as PauseSolid, Stop as StopSolid,
  Microphone as MicrophoneSolid, VideoCamera as VideoCameraSolid,
  Moon as MoonSolid, Sun as SunSolid,
} from 'flowbite-react-icons/solid';

// ── Gallery wrapper ───────────────────────────────────────────────────────────

const ComponentGallery = () => {
  return (
    // The gallery uses Tailwind's light/dark bg so components are previewed
    // against the correct background colour in both modes.
    <div className="min-h-screen bg-white dark:bg-gray-950 px-10 py-12">

      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="mb-2">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
          Component Gallery
        </h1>
        <p className="font-body text-sm text-gray-500 dark:text-gray-400 mt-1">
          A reference for every UI component used in BattleCards.
        </p>
      </div>
      <Link to="/" className="font-body text-xs text-blue-500 hover:underline">
        ← Back to app
      </Link>

      <HR variant="default" />

      {/* ════════════════════════════════════════════════════════════════
          ICONS — Outline
          Flowbite React Icons (flowbite-react-icons/outline)
          Full library: https://flowbite.com/icons/
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Icons / Outline">
        <IconGrid icons={[
          { name: 'Home',              outline: <Home />,              solid: <HomeSolid /> },
          { name: 'Search',            outline: <Search />,            solid: <SearchSolid /> },
          { name: 'Bell',              outline: <Bell />,              solid: <BellSolid /> },
          { name: 'BellActive',        outline: <BellActive />,        solid: <BellActiveSolid /> },
          { name: 'Cog',               outline: <Cog />,               solid: <CogSolid /> },
          { name: 'Star',              outline: <Star />,              solid: <StarSolid /> },
          { name: 'Bookmark',          outline: <Bookmark />,          solid: <BookmarkSolid /> },
          { name: 'Heart',             outline: <Heart />,             solid: <HeartSolid /> },
          { name: 'Rocket',            outline: <Rocket />,            solid: <RocketSolid /> },
          { name: 'Shield',            outline: <Shield />,            solid: <ShieldSolid /> },
          { name: 'Flag',              outline: <Flag />,              solid: <FlagSolid /> },
          { name: 'Plus',              outline: <Plus />,              solid: null },
          { name: 'Minus',             outline: <Minus />,             solid: null },
          { name: 'Close',             outline: <Close />,             solid: null },
          { name: 'Check',             outline: <Check />,             solid: null },
          { name: 'CheckCircle',       outline: <CheckCircle />,       solid: <CheckCircleSolid /> },
          { name: 'CloseCircle',       outline: <CloseCircle />,       solid: <CloseCircleSolid /> },
          { name: 'InfoCircle',        outline: <InfoCircle />,        solid: <InfoCircleSolid /> },
          { name: 'ExclamationCircle', outline: <ExclamationCircle />, solid: <ExclamationCircleSolid /> },
          { name: 'QuestionCircle',    outline: <QuestionCircle />,    solid: <QuestionCircleSolid /> },
          { name: 'Edit',              outline: <Edit />,              solid: <EditSolid /> },
          { name: 'TrashBin',          outline: <TrashBin />,          solid: <TrashBinSolid /> },
          { name: 'Download',          outline: <Download />,          solid: <DownloadSolid /> },
          { name: 'Upload',            outline: <Upload />,            solid: <UploadSolid /> },
          { name: 'FloppyDisk',        outline: <FloppyDisk />,        solid: <FloppyDiskSolid /> },
          { name: 'ShareNodes',        outline: <ShareNodes />,        solid: <ShareNodesSolid /> },
          { name: 'Filter',            outline: <Filter />,            solid: <FilterSolid /> },
          { name: 'DotsHorizontal',    outline: <DotsHorizontal />,    solid: null },
          { name: 'DotsVertical',      outline: <DotsVertical />,      solid: null },
          { name: 'Eye',               outline: <Eye />,               solid: <EyeSolid /> },
          { name: 'EyeSlash',          outline: <EyeSlash />,          solid: <EyeSlashSolid /> },
          { name: 'Lock',              outline: <Lock />,              solid: <LockSolid /> },
          { name: 'LockOpen',          outline: <LockOpen />,          solid: <LockOpenSolid /> },
          { name: 'ArrowLeft',         outline: <ArrowLeft />,         solid: null },
          { name: 'ArrowRight',        outline: <ArrowRight />,        solid: null },
          { name: 'ArrowUp',           outline: <ArrowUp />,           solid: null },
          { name: 'ArrowDown',         outline: <ArrowDown />,         solid: null },
          { name: 'ChevronLeft',       outline: <ChevronLeft />,       solid: null },
          { name: 'ChevronRight',      outline: <ChevronRight />,      solid: null },
          { name: 'ChevronUp',         outline: <ChevronUp />,         solid: null },
          { name: 'ChevronDown',       outline: <ChevronDown />,       solid: null },
          { name: 'User',              outline: <User />,              solid: <UserSolid /> },
          { name: 'Users',             outline: <Users />,             solid: <UsersSolid /> },
          { name: 'UserAdd',           outline: <UserAdd />,           solid: <UserAddSolid /> },
          { name: 'UserCircle',        outline: <UserCircle />,        solid: <UserCircleSolid /> },
          { name: 'Grid',              outline: <Grid />,              solid: <GridSolid /> },
          { name: 'List',              outline: <ListIcon />,          solid: null },
          { name: 'Inbox',             outline: <Inbox />,             solid: <InboxSolid /> },
          { name: 'Envelope',          outline: <Envelope />,          solid: <EnvelopeSolid /> },
          { name: 'Image',             outline: <Image />,             solid: <ImageSolid /> },
          { name: 'FileLines',         outline: <FileLines />,         solid: <FileLinesSolid /> },
          { name: 'Folder',            outline: <Folder />,            solid: <FolderSolid /> },
          { name: 'Clipboard',         outline: <Clipboard />,         solid: <ClipboardSolid /> },
          { name: 'Play',              outline: <Play />,              solid: <PlaySolid /> },
          { name: 'Pause',             outline: <Pause />,             solid: <PauseSolid /> },
          { name: 'Stop',              outline: <Stop />,              solid: <StopSolid /> },
          { name: 'Microphone',        outline: <Microphone />,        solid: <MicrophoneSolid /> },
          { name: 'VideoCamera',       outline: <VideoCamera />,       solid: <VideoCameraSolid /> },
          { name: 'Moon',              outline: <Moon />,              solid: <MoonSolid /> },
          { name: 'Sun',               outline: <Sun />,               solid: <SunSolid /> },
        ]} />
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          COLOUR PALETTE — Raw
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Colour Palette / Raw">
        <div className="w-full space-y-6">
          {RAW_PALETTE.map((family) => (
            <ColorRow key={family.name} family={family} />
          ))}
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          COLOUR PALETTE — Semantic Tokens
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Colour Palette / Semantic Tokens">
        <div className="w-full space-y-6">
          {SEMANTIC_PALETTE.map((family) => (
            <ColorRow key={family.name} family={family} />
          ))}
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Headings
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Headings">
        <div className="w-full space-y-4">
          <Text variant="h1">H1 — The Battle Begins</Text>
          <Text variant="h2">H2 — Choose Your Forces</Text>
          <Text variant="h3">H3 — Deploy Your Units</Text>
          <Text variant="h4">H4 — Unit Statistics</Text>
          <Text variant="h5">H5 — Abilities &amp; Traits</Text>
          <Text variant="h6">H6 — Footnotes &amp; References</Text>
        </div>
      </GallerySection>

      {/* ── Heading composition patterns (partial text styling) ───── */}
      <GallerySection title="Text / Headings — Composition Patterns">
        <div className="w-full space-y-6">

          {/* Highlighted heading — wrap key words in a brand-coloured span */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Highlighted</p>
            <Text variant="h2">
              Build your{' '}
              <span className="text-blue-600 dark:text-blue-400">perfect army</span>
            </Text>
          </div>

          {/* Gradient heading */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Gradient</p>
            <Text variant="h2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Command the battlefield
              </span>
            </Text>
          </div>

          {/* Underlined heading */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Underlined</p>
            <Text variant="h2">
              <span className="underline underline-offset-4 decoration-4 decoration-blue-500">
                Forge your legend
              </span>
            </Text>
          </div>

          {/* Mark / highlight heading */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Mark</p>
            <Text variant="h2">
              Create{' '}
              <mark className="px-2 text-white bg-blue-600 rounded-sm">custom cards</mark>
            </Text>
          </div>

          {/* Heading with secondary text */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">With secondary text</p>
            <Text variant="h2">
              Heavy Infantry{' '}
              <small className="font-body ms-2 font-normal text-gray-500 dark:text-gray-400">
                Unit Card
              </small>
            </Text>
          </div>

        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Paragraphs
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Paragraphs">
        <div className="w-full space-y-6 max-w-2xl">

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Default</p>
            <Text variant="paragraph">
              Heavy Infantry are the backbone of any great army. Clad in thick armour and wielding
              heavy weapons, they hold the line while lighter units flank the enemy.
            </Text>
          </div>

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Lead (intro paragraph)</p>
            <Text variant="paragraph-lead">
              Build and share custom unit cards for any tabletop wargame. Define stats,
              abilities, and lore — then take them to the battlefield.
            </Text>
          </div>

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-1">Drop cap</p>
            <Text variant="paragraph-dropcap">
              Heavy infantry are the backbone of any great army. Clad in thick armour and wielding
              heavy weapons, they hold the line while lighter units flank the enemy and archers
              rain fire from above.
            </Text>
          </div>

        </div>
      </GallerySection>

      {/* ── Inline paragraph modifiers ─────────────────────────────── */}
      <GallerySection title="Text / Paragraph Modifiers">
        <div className="w-full space-y-3">
          <Text variant="paragraph" weight="bold">Bold paragraph text</Text>
          <Text variant="paragraph" italic>Italic paragraph text</Text>
          <Text variant="paragraph" underline>Underlined paragraph text</Text>
          <Text variant="paragraph" strikethrough>Strikethrough paragraph text</Text>
          <Text variant="paragraph" uppercase>Uppercase paragraph text</Text>
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Blockquotes
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Blockquotes">
        <div className="w-full space-y-8 max-w-2xl">

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-2">Default</p>
            <Text variant="blockquote">
              "An army marches on its stomach — but it wins on the strength of its cards."
            </Text>
          </div>

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-2">Solid (border + background)</p>
            <Text variant="blockquote-solid">
              "An army marches on its stomach — but it wins on the strength of its cards."
            </Text>
          </div>

          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-2">Icon (with quotation mark)</p>
            <Text variant="blockquote-icon">
              "An army marches on its stomach — but it wins on the strength of its cards."
            </Text>
          </div>

          {/* Alignment variants */}
          <div>
            <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-2">Alignments</p>
            <div className="space-y-4">
              <Text variant="blockquote" align="left">"Left-aligned quote."</Text>
              <Text variant="blockquote" align="center">"Centred quote."</Text>
              <Text variant="blockquote" align="right">"Right-aligned quote."</Text>
            </div>
          </div>

        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Sizing scale
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Sizing Scale">
        <div className="w-full space-y-2">
          {(
            ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const
          ).map((size) => (
            <Text key={size} variant="paragraph" size={size}>
              {size} — The quick brown fox jumps over the lazy dog
            </Text>
          ))}
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Font weights
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Font Weights">
        <div className="w-full space-y-2">
          {(
            ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const
          ).map((weight) => (
            <Text key={weight} variant="paragraph" weight={weight}>
              {weight} — The quick brown fox jumps over the lazy dog
            </Text>
          ))}
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          TEXT — Colour roles
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Text / Colour Roles">
        <div className="w-full space-y-2">
          <Text variant="paragraph" color="default">default — Standard body text</Text>
          <Text variant="paragraph" color="brand">brand — Blue accent text</Text>
          <Text variant="paragraph" color="success">success — Positive / confirmed</Text>
          <Text variant="paragraph" color="danger">danger — Error / destructive</Text>
          <Text variant="paragraph" color="purple">purple — Special / legendary</Text>
          <Text variant="paragraph" color="teal">teal — Informational / secondary</Text>
        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          LISTS
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Lists / Unordered">
        <List
          variant="unordered"
          items={['Heavy Infantry', 'Mounted Archers', 'Siege Engineers', 'Scout Raiders']}
        />
      </GallerySection>

      <GallerySection title="Lists / Ordered">
        <List
          variant="ordered"
          items={['Deploy units', 'Roll for initiative', 'Resolve attacks', 'Check morale']}
        />
      </GallerySection>

      <GallerySection title="Lists / Unstyled">
        <List
          variant="unstyled"
          items={['No bullets', 'No numbers', 'Just clean text']}
        />
      </GallerySection>

      <GallerySection title="Lists / Horizontal">
        <List
          variant="horizontal"
          items={['Infantry', 'Cavalry', 'Artillery', 'Support', 'Hero']}
        />
      </GallerySection>

      <GallerySection title="Lists / Description">
        <List
          variant="description"
          descriptionItems={[
            { term: 'Attack',   detail: 'Number of dice rolled when this unit attacks.' },
            { term: 'Defence',  detail: 'Damage absorbed before wounds are applied.' },
            { term: 'Movement', detail: 'Maximum distance in inches per turn.' },
            { term: 'Morale',   detail: 'Threshold at which the unit may flee.' },
          ]}
        />
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          LINKS
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="Links / Variants">
        <div className="w-full space-y-4">

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400 dark:text-gray-500 w-24">Default</span>
            <TextLink href="https://example.com">Visit example.com</TextLink>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400 dark:text-gray-500 w-24">Paragraph</span>
            <Text variant="paragraph">
              Read more about{' '}
              <TextLink variant="paragraph" href="https://example.com">unit card rules</TextLink>
              {' '}in the handbook.
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400 dark:text-gray-500 w-24">Icon</span>
            <TextLink
              variant="icon"
              href="https://example.com"
              icon={
                // Simple arrow icon — replace with your icon library of choice
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Learn more
            </TextLink>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400 dark:text-gray-500 w-24">CTA</span>
            <TextLink variant="cta" to="/">Go to home</TextLink>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400 dark:text-gray-500 w-24">Button</span>
            <TextLink variant="button" to="/">Create a card</TextLink>
          </div>

        </div>
      </GallerySection>

      {/* ════════════════════════════════════════════════════════════════
          HORIZONTAL RULES
      ════════════════════════════════════════════════════════════════ */}
      <GallerySection title="HR / Variants">
        <div className="w-full space-y-2">

          <p className="font-body text-xs text-gray-400 dark:text-gray-500">Default</p>
          <HR variant="default" />

          <p className="font-body text-xs text-gray-400 dark:text-gray-500">Trimmed</p>
          <HR variant="trimmed" />

          <p className="font-body text-xs text-gray-400 dark:text-gray-500">Text</p>
          <HR variant="text" label="or" />

          <p className="font-body text-xs text-gray-400 dark:text-gray-500">Icon</p>
          <HR
            variant="icon"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />

          <p className="font-body text-xs text-gray-400 dark:text-gray-500">Shape</p>
          <HR variant="shape" />

        </div>
      </GallerySection>

    </div>
  );
};

// ── IconGrid ──────────────────────────────────────────────────────────────────

/**
 * IconGrid — Displays a grid of icon previews.
 *
 * Each cell shows:
 * - The outline variant on the left
 * - The solid variant on the right (or a dash if no solid exists)
 * - The icon's import name below
 *
 * Used only in ComponentGallery — not a reusable app component.
 */
interface IconEntry {
  name: string;
  outline: React.ReactNode;
  /** Pass null if no solid variant exists for this icon */
  solid: React.ReactNode | null;
}

const IconGrid = ({ icons }: { icons: IconEntry[] }) => (
  <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
    {icons.map(({ name, outline, solid }) => (
      <div
        key={name}
        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900"
      >
        {/* Outline + Solid side by side */}
        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
          {/* Outline variant */}
          <div title="outline">{outline}</div>
          {/* Solid variant — greyed out dash if unavailable */}
          <div title={solid ? 'solid' : 'no solid variant'} className={solid ? '' : 'text-gray-300 dark:text-gray-700'}>
            {solid ?? '—'}
          </div>
        </div>
        {/* Icon name */}
        <span className="font-body text-xs text-center text-gray-500 dark:text-gray-400 leading-tight break-all">
          {name}
        </span>
      </div>
    ))}
  </div>
);

// ── ColorRow ──────────────────────────────────────────────────────────────────

/**
 * ColorRow — Displays a single color family as a horizontal strip of swatches.
 *
 * Each swatch shows:
 * - The color as a filled block (via inline style)
 * - The shade number (50 → 900)
 * - The hex value
 *
 * Used only in ComponentGallery — not a reusable app component.
 */
const ColorRow = ({ family }: { family: ColorFamily }) => (
  <div>
    {/* Family name + example class */}
    <div className="flex items-baseline gap-3 mb-2">
      <span className="font-body text-sm font-semibold text-gray-900 dark:text-white">
        {family.name}
      </span>
      <span className="font-body text-xs text-gray-400 dark:text-gray-500">
        bg-{family.prefix}-500
      </span>
    </div>

    {/* Swatch strip */}
    <div className="flex rounded-lg overflow-hidden">
      {family.shades.map(({ shade, hex, darkText }) => (
        <div
          key={shade}
          className="flex-1 flex flex-col items-center justify-end py-2 gap-0.5"
          style={{ backgroundColor: hex }}
        >
          {/* Shade number */}
          <span
            className={`font-body text-xs font-medium ${
              darkText ? 'text-gray-900' : 'text-white'
            }`}
          >
            {shade}
          </span>
          {/* Hex value */}
          <span
            className={`font-body text-xs ${
              darkText ? 'text-gray-600' : 'text-white/70'
            }`}
          >
            {hex}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ── GallerySection ────────────────────────────────────────────────────────────

/**
 * GallerySection — Wrapper for each component group
 *
 * Renders a labelled section with a divider, keeping the gallery
 * organised as the number of components grows.
 *
 * Props:
 * - title:    Section heading (e.g. "Buttons", "Unit Cards")
 * - children: Component previews to display inside the section
 */
const GallerySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mb-14">

      {/* Section title + divider */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
      </div>

      {/* Component previews */}
      <div className="flex flex-wrap gap-4">
        {children}
      </div>

    </section>
  );
};

export { GallerySection };
export default ComponentGallery;
