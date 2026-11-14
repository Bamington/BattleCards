/**
 * DeckPage.tsx — Single entry point for opening a deck: /app/deck/:slug?deckId=…
 *
 * Games with a custom card builder are listed in GAME_PAGES and render that
 * page. Every other game falls back to the generic <ListBuilder> (static card
 * images + play mode). Upgrading a list game to custom cards later is one new
 * entry here — existing decks keep working because cards with a face_path
 * still render as static images.
 *
 * The custom builders read ?deckId= themselves, so rendering them here is
 * equivalent to their legacy /app/builder/<slug> routes (which still work).
 */

import type { ComponentType } from 'react';
import { useParams } from 'react-router-dom';
import CardBuilderBloodBowl from './CardBuilderBloodBowl';
import CardBuilderHaloFlashpoint from './CardBuilderHaloFlashpoint';
import CardBuilderKillTeam from './CardBuilderKillTeam';
import CardBuilderStarcraft from './CardBuilderStarcraft';
import CardBuilderRyg from './CardBuilderRyg';
import ListBuilder from './ListBuilder';

export const GAME_PAGES: Record<string, ComponentType> = {
  'blood-bowl':      CardBuilderBloodBowl,
  'halo-flashpoint': CardBuilderHaloFlashpoint,
  'kill-team':       CardBuilderKillTeam,
  'starcraft':       CardBuilderStarcraft,
  'ryg':             CardBuilderRyg,
};

/** URL for opening a deck, whatever kind of game it is. */
export const deckUrl = (slug: string, deckId: string) => `/app/deck/${slug}?deckId=${deckId}`;

const DeckPage = () => {
  const { slug = '' } = useParams();
  const Page = GAME_PAGES[slug] ?? ListBuilder;
  // key forces a fresh mount when switching between games.
  return <Page key={slug} />;
};

export default DeckPage;
