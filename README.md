# Next.js + TypeScript Template

Production-ready Next.js starter (App Router) with a fully configured toolchain:
strict TypeScript, ESLint (Next.js config) + Prettier, Husky git hooks, lint-staged,
and Conventional Commits.

## Tech Stack

| Area         | Tooling                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                                              |
| UI           | [React 19](https://react.dev/)                                                                         |
| Language     | [TypeScript](https://www.typescriptlang.org/)                                                          |
| Linting      | [ESLint 9](https://eslint.org/) + `eslint-config-next` (flat config)                                   |
| Formatting   | [Prettier](https://prettier.io/) (+ `eslint-config-prettier`)                                          |
| Git hooks    | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) |
| Commit style | [commitlint](https://commitlint.js.org/) (Conventional Commits)                                        |

## Requirements

- **Node.js** >= 20 (recommended: 22 LTS or newer)
- **npm**

## Getting Started

```bash
# install dependencies (also sets up Husky via the "prepare" script)
npm install

# start the dev server at http://localhost:3000
npm run dev
```

> If you cloned this template into a fresh folder, run `git init` first so Husky can
> install its git hooks during `npm install`.

## Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Next.js dev server (Turbopack) |
| `npm run build`        | Create an optimized production build     |
| `npm run start`        | Run the production server                |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Run ESLint and auto-fix                  |
| `npm run format`       | Format the project with Prettier         |
| `npm run format:check` | Check formatting without writing         |
| `npm run type-check`   | Type-check with `tsc --noEmit`           |

## Project Structure

```
NextTemplate/
├─ public/                # static assets
├─ src/
│  ├─ app/                  # App Router (routing, layouts, pages)
│  │  ├─ (routes)/          # route groups
│  │  ├─ layout.tsx         # root layout
│  │  └─ page.tsx           # home page
│  ├─ components/           # React components
│  │  ├─ ui/                # reusable UI primitives (Button, Input, ...)
│  │  ├─ layout/            # layout components
│  │  │  ├─ Header/
│  │  │  └─ Footer/
│  │  └─ features/          # feature-specific components
│  ├─ hooks/                # custom React hooks
│  ├─ lib/                  # framework-agnostic logic
│  │  ├─ api/               # API clients / data fetching
│  │  ├─ constants/         # shared constants
│  │  └─ helpers/           # utility functions
│  ├─ styles/               # global and shared styles
│  └─ types/                # shared TypeScript types
├─ public/                  # static assets
├─ .husky/                  # git hooks (pre-commit, commit-msg)
├─ eslint.config.mjs        # ESLint flat config (Next + Prettier)
├─ .prettierrc.json         # Prettier options
├─ commitlint.config.js     # Conventional Commits rules
├─ next.config.ts           # Next.js config
└─ tsconfig.json            # TypeScript config (path alias @ → src)
```

> Folders like `components`, `hooks`, `lib`, `styles` and `types` start out with a
> `.gitkeep` placeholder — they define the recommended architecture. Remove the
> placeholder once you add real files to a folder.

## Path Alias

`@` is mapped to `src/` (configured in `tsconfig.json`):

```tsx
import { Button } from '@/components/Button'
```

## Code Quality & Git Hooks

### `pre-commit`

1. **lint-staged** on staged files:
   - `*.{ts,tsx,js,jsx}` → `eslint --fix` then `prettier --write`
   - `*.{json,css,md}` → `prettier --write`
2. **type-check** (`tsc --noEmit`).

### `commit-msg`

Validates messages against [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

# examples
feat: add marketing landing page
fix(api): handle empty response body
chore: bump dependencies
```

## License

This template is provided as-is. Replace this section with your project's license.
