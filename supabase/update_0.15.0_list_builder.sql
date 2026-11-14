-- BattleCards 0.15.0 release note — inserted UNPUBLISHED (published = false).
-- Publish it from the updates admin when the release ships.

insert into public.updates (title, body, version, apps, published, visible)
select
  'Introducing List Builder',
  $body$Hey folks!

Some games are all about making your own cards. Others already come with beautiful official cards in the box, and all you really want is to pick your force and get playing. This release adds a new way to use BattleCards for exactly that: **List Builder**.

### What's new

- **List Builder games** - For supported games, you no longer design cards from scratch. Open a deck, tap **Add Cards**, and pick from the official cards in that game's pack. Need two of the same unit? Add it twice - we'll show you how many copies are already in your list.

- **Units and Tactics, sorted** - Your list is grouped by card type, so your units and your tactics cards each have their own section.

- **Play Mode works too** - Static cards still get the full play experience. Switch to **Play** to track damage with a health bar under each card, mark units as activated, and hit **New Turn** to reset for the next round.

- **Official packs, automatically** - When you create a deck for a List Builder game, the official cards are added to your library for you, ready to pick.

### Coming soon: Gundam Assemble

The first List Builder game will be **Gundam Assemble**. We're loading in the cards now and will let you know as soon as it's ready to play.

### Under the hood

Cards can now carry an official card image separately from your own model photos. That means down the track we can support mixing official and custom cards in the same deck - and even official card art with a photo of *your* painted model on top.

Happy building!$body$,
  '0.15.0',
  array['battlecards'],
  false,
  true
where not exists (
  select 1 from public.updates where version = '0.15.0' and 'battlecards' = any(apps)
);
