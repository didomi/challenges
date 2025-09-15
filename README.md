# Consent Manager
A small React SPA for collecting and listing user consents. It provides a validated form to submit consents and a paginated list to review them, backed by a mock data layer with React Query caching, accessible UI components, and strict TypeScript.
## Features
- Give consent form with validation (name, email, consent type)
- Persisted in-memory mock API (no network calls)
- Paginated consent list (client-side, via mock API abstraction)
- React Query caching & invalidation
- Accessible, keyboard-friendly UI
- Strict TypeScript & ESLint rules

## Getting Started
### Prerequisites
- Node.js >= 20
- pnpm >= 9

### Install
`pnpm install`

### Development
`pnpm dev` 

Visit: http://localhost:5173

### Type Check
`pnpm typecheck`

### Lint & Format
`pnpm lint`
`pnpm format`

### Tests
Run all tests:
`pnpm test`

Run with coverage:
`pnpm test:coverage`

### Build
`pnpm build`

`pnpm preview`  # Serves production build

## Project Structure
```text
src/
  main.tsx              App entry
  router.tsx            Route configuration
  tests/                Tests setup
  utils/                Global utilities
  components/           Reusable app-wide components
  features/             Feature-first modules
    <feature>/
      api/
      components/
      hooks/
      pages/
      validation/
      types.ts
```
