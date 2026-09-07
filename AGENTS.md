# AGENTS.md

## Project overview
This repository is a Vite + React app called ElderLink. It helps elderly users learn common digital services in Thai with step-by-step tutorials, large touch targets, clear language, accessibility-friendly layout, and emergency contact shortcuts.

## Stack
- React
- Vite
- React Router
- Lucide React
- Custom CSS in src/styles.css

## Important product goals
- Keep the interface simple, calm, and forgiving.
- Prefer clear Thai wording over technical jargon.
- Maintain large tap targets and strong contrast.
- Ensure keyboard focus and screen reader support remain intact.
- Preserve the tutorial flow, localStorage favorites, and settings persistence.

## Key files
- src/App.jsx: route setup and shared state
- src/pages.jsx: page-level UI and tutorial logic
- src/components.jsx: reusable UI components, speech button, settings panel
- src/data/services.js: service catalog and tutorial content
- src/styles.css: design tokens and responsive layout

## Commands
- Install dependencies: npm install
- Start dev server: npm run dev
- Production build: npm run build

## Working rules
- Make small, targeted changes that match the app’s existing patterns.
- Favor consistency with current component structure and styling tokens.
- Do not remove accessibility features such as focus styling, semantics, or aria-live behavior.
- Keep route names and tutorial IDs stable when editing service data.
- If you add new features, prefer local state and existing UI components over introducing a new framework.
- Validate with npm run build before finishing work.

## Notes for future agents
This app is user-facing and designed for older adults. Always prioritize clarity, reassurance, and usability over cleverness or visual complexity.
