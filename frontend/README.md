# CodeSphere — Frontend

A collaborative study and productivity dashboard where developers track GitHub activity,
LeetCode/NeetCode progress, personal goals, and custom habit trackers — and study together
with friends via leaderboards, challenges, and shared goals.

This is a **frontend-only** build. There is no backend, authentication, or database — every
screen is powered by mock data so the UI can be reviewed and iterated on before any API exists.

## Tech stack

- React 19 + Vite
- React Router DOM
- Chart.js / react-chartjs-2
- Axios (client is wired up and ready, but has no live backend behind it yet)
- React Icons (Lucide set)
- Plain CSS with a shared design-token file (no Tailwind)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── assets/                 # images, icons, logo
├── shared/
│   ├── components/         # Navbar, Sidebar, Footer, Button, Card, Table, Charts, etc.
│   ├── layouts/             # AppLayout (sidebar+navbar) and PublicLayout (navbar+footer)
│   ├── hooks/                # useLocalStorage, useDebounce, useToggle
│   ├── services/            # apiClient.js — single Axios instance
│   ├── utils/                 # formatDate, formatNumber, classNames
│   └── constants/            # routes.js, navigation.js
├── features/
│   ├── Home, Dashboard, Auth, GitHub, LeetCode, NeetCode, ManualTracker,
│   │   Friends, Leaderboard, TopPerformers, Challenges, Goals, Notes,
│   │   Analytics, Profile, Settings
│   └── each feature has its own components/, hooks/, services/, data/, styles/
├── App.jsx                 # route definitions
└── main.jsx                 # entry point
```

## Connecting a real backend later

Every feature's `data/` folder holds static mock data, and most features have a small
`services/*.js` file (or inline resolver) that currently just returns that mock data as a
resolved Promise. To wire up a real API:

1. Point `src/shared/services/apiClient.js`'s `baseURL` at your backend (or set `VITE_API_BASE_URL`).
2. In each feature's service file, replace the mock-data return with a real `apiClient` call,
   keeping the same return shape so components and hooks don't need to change.
3. Add real authentication in `features/Auth` and store the token via `apiClient`'s existing
   request interceptor (`cs_token` in localStorage).

No UI code should need to change — the mock/service layer was built specifically so the
swap is isolated.
