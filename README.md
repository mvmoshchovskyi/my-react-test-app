# Interview Playground

A React + TypeScript practice project built around realistic interview tasks.
Every page is a self-contained exercise: the UI and styles are ready, the logic
is what you implement.

**Legend:** ✅ done · 🚧 in progress · ⏳ to do · 📋 planned

## Pages

| Route    | Page             | Status |
| -------- | ---------------- | ------ |
| `/`      | Home / task list | ✅     |
| `/todos` | Todo List        | ✅     |
| `/users` | User Directory   | 🚧     |
| `*`      | 404              | ✅     |

## Tech stack

- React 19, TypeScript, Vite
- React Router 8
- styled-components 6
- `uuid` for ids

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run format   # prettier --write .
```

## Todo List — ✅ Done

The original exercise: a todo list with persistent storage, sorting, and
in-place editing.

### Requirements

- [x] Clicking a todo toggles the checked state
- [x] Todos are saved to and loaded from `localStorage` (`todos` key)
- [x] Completed items sink to the bottom automatically
- [x] Hovering a todo reveals an X button that deletes it
- [x] Hidden `created_at` / `completed_at` timestamps drive the sorting:
  - active todos: `created_at` descending
  - completed todos: `completed_at` ascending

### Extra features

- [x] Filter tabs: **All / Active / Completed** (filter is persisted separately)
- [x] Live counter "N items left" and **Clear completed**
- [x] Inline editing: double-click a todo, save with Enter, cancel with Escape
- [x] Empty state per filter; clicking a row toggles the todo
- [x] Accessible controls (`aria-label`, `aria-live`, focus states)
- [x] Client-only state management:
  - `TodoProvider` + `useTodos()` context
  - pure `todoReducer` with discriminated actions
  - `useLocalStorage<T>` custom hook with safe JSON parsing
  - derived sorting/filtering via `useMemo`, memoized `TodoItem`

## Next task: User Directory — 🚧 In progress

Build a searchable user directory on the `/users` page.

```
GET https://dummyjson.com/users?limit=10&skip=0
GET https://dummyjson.com/users/search?q=em&limit=10&skip=0
```

Response: `{ users, total, skip, limit }`. Add `&delay=3000` to simulate a slow
network, or use DevTools → Network → Offline to test failures.

### Already done (scaffold)

- [x] `/users` route, navigation entry and home-page card
- [x] Page layout and all styles (`src/pages/users/styles.ts`)
- [x] API client `fetchUsers({ query, skip, limit, signal })`
      (`src/api/usersApi.ts`) — typed, checks `response.ok`, supports `AbortSignal`
- [x] Controlled search input; initial value read from the `?q=` URL param

### To implement

- [ ] Debounce the input (400 ms) and write the query to the URL
      (`setSearchParams(..., { replace: true })`)
- [ ] `useUsersQuery(query)` hook: `items`, `total`, `status`, `error`,
      `loadMore`
- [ ] Cancel stale requests with `AbortController` and ignore out-of-order
      responses
- [ ] First load → skeleton cards (5)
- [ ] Error → message + **Retry** button
- [ ] Empty result → "No users found"
- [ ] Render user cards (avatar, name, email)
- [ ] Counter "Showing X of Y"
- [ ] **Load more** with `skip = users.length`, disabled while loading or when
      all users are loaded
- [ ] De-duplicate users by `id` when appending a page
- [ ] Keep the input in sync with the URL on back/forward navigation
- [ ] Enter triggers search immediately; Escape clears the input

### Acceptance criteria

- Typing `emily` produces one request, not one per keystroke
- The previous request is cancelled when the query changes
- A slow, outdated response never overwrites newer results
- `/users?q=em` can be opened directly and survives a page reload
- Errors keep the already loaded list and offer a retry
- "Load more" never duplicates users and disappears at the end of the list
- `npm run build` and `npm run lint` pass

## Planned practice pages

| Page            | What it trains                                       | Status |
| --------------- | ---------------------------------------------------- | ------ |
| Data Table      | sorting, filtering, pagination, row selection        | 📋     |
| Checkout Wizard | multi-step form, per-step validation, review step    | 📋     |
| File Explorer   | recursive tree rendering, expand/collapse, selection | 📋     |
| Kanban Board    | columns, cards, drag & drop without UI libraries     | 📋     |

## Project structure

```
src/
  api/             # API clients (DummyJSON)
  components/      # reusable UI (Todo components)
  context/         # TodoContext + TodoProvider
  data/            # initial demo data
  hooks/           # custom hooks (useLocalStorage)
  layouts/         # AppLayout with navigation
  pages/           # route-level pages (Home, Todos, Users, 404)
  reducers/        # pure todoReducer
  types/           # shared TypeScript types
  utils/           # storage, sorting/filtering helpers
```

## How to work on a task

1. Read the page's `TODO` comments — they describe the required logic.
2. Implement one checkpoint at a time and verify it manually in the browser.
3. Keep `npm run build` and `npm run lint` green after every step.
4. Write the logic yourself; the scaffold only saves time on styles and
   boilerplate.

## Conventions

- All code, comments, UI copy, documentation and commit messages are in
  **English**.
- Ukrainian is only used for chat communication with the user.
- See `AGENTS.md` for the short project rules.
