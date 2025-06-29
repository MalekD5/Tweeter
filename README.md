# Tweeter

Tweeter is a Twitter/X clone built with Next.js 14.

## 📁 Folder Structure

- `app/`:  
  Application routes using the Next.js App Router, including layouts, pages, route groups, and API endpoints (under `app/api/`).

- `components/`:  
  Reusable React components, organized by feature (e.g., `tweet/`, `layout/`) and base UI primitives under `ui/`.

- `lib/`:  
  Utility functions, configuration files, and foundational code such as `db.ts` (Prisma client), `auth/`, and shared constants.

- `models/`:  
  Optional domain model definitions or abstractions with Drizzle ORM

- `services/`:  
  Business logic and data access layer. Each file encapsulates logic related to a domain (e.g., `tweet.service.ts`, `auth.service.ts`).

- `hooks/`:  
  Custom React hooks for abstracting logic like authentication state or tweet interactions (`useAuth`, `useTweetActions`).

- `context/`:  
  React Context providers for app-wide state like authentication or UI preferences.

- `types/`:  
  Global TypeScript types and interfaces used across the app for consistency in API, components, and services.

- `public/`:  
  Static files such as images, icons, and web fonts (e.g., `fonts/chirp-*.woff`). Accessible via the root URL.

- `tests/`:  
  Contains unit and integration tests, typically organized to mirror the `services/` or `components/` structure.

