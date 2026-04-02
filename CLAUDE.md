# BattleCards — Claude Instructions

These rules apply to every command in this project.

## UI Components

- **Always use existing components first.** Before writing any UI, check `src/components/` and use what's already there. Do not recreate something that exists.
- **Never create a new UI component without permission.** If a task requires a component that doesn't exist yet, stop and ask before building it.
- **Build new components from existing ones.** When a new component is approved, compose it from existing components wherever possible (e.g. use `<Button>` inside a new modal, use `<Badge>` inside a new card, etc.). Avoid reinventing primitives.
- **Always add new components to the gallery.** After any new UI component is created, add a demo section for it in `src/pages/ComponentGallery.tsx` showing every meaningful variant and state.
