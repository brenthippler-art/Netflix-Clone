# Netflix Clone

A responsive Netflix-inspired streaming interface built with React and Vite, featuring Firebase authentication and live movie data from The Movie Database (TMDB) API.

**[Live Demo](https://brenthippler-art.github.io/Netflix-Clone/)**

## Overview

This project recreates the core browsing experience of Netflix's web UI: a hero banner, horizontally scrollable movie carousels organized by category, a trailer player, and full user authentication. It was built as a portfolio piece to demonstrate practical React development skills, including client-side routing, third-party API integration, and Firebase-backed auth.

## Features

- **User authentication** — sign up and sign in with email/password via Firebase Authentication, with session state persisted across page loads
- **Dynamic movie carousels** — separate rows for Top Rated, Popular, Upcoming, and Now Playing titles, each pulled live from the TMDB API
- **Horizontal scroll interaction** — carousel rows respond to mouse wheel input for a native-feeling browse experience
- **Trailer playback** — clicking a title opens a dedicated player page that fetches and embeds the movie's YouTube trailer
- **Toast notifications** — user-friendly error messages (e.g., invalid login, weak password) surfaced via react-toastify
- **Client-side routing** — React Router handles navigation between Home, Login, and Player views without full page reloads
- **Responsive layout** — built mobile-first with CSS

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Auth & Backend | Firebase Authentication, Firestore |
| Movie Data | TMDB API |
| Notifications | React Toastify |
| Deployment | GitHub Pages (via `gh-pages`) |
| Linting | ESLint |

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── TitleCards/       # Fetches & renders movie carousels from TMDB
│   └── Footer/
├── pages/
│   ├── Home/             # Hero banner + carousels
│   ├── Login/            # Sign in / sign up form
│   └── Player/           # Trailer playback view
├── firebase.js           # Firebase config + auth functions (signup, login, logout)
├── App.jsx               # Route definitions + auth state listener
└── main.jsx              # App entry point
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/brenthippler-art/Netflix-Clone.git
cd Netflix-Clone

# Install dependencies
npm install

# Add environment variables (see below)

# Run locally
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_TMDB_TOKEN=your_tmdb_read_access_token
```

You'll also need a Firebase project with Authentication (Email/Password) and Firestore enabled — update `src/firebase.js` with your own project config.

## Security Notes

- Firebase's client-side config values (`apiKey`, `authDomain`, etc.) are safe to expose publicly by design — access control is enforced through Firestore Security Rules, not by hiding the config.
- Firestore rules in this project restrict reads/writes so a signed-in user can only access their own profile document; all other access is denied by default.
- The TMDB access token is loaded from an environment variable (`VITE_TMDB_TOKEN`) rather than hardcoded, and `.env` is git-ignored.

## Deployment

This project deploys to GitHub Pages via the `gh-pages` package:

```bash
npm run build
npm run deploy
```

### SPA routing on GitHub Pages

GitHub Pages serves static files, so it has no way to handle client-side routes like `/login` on a direct page load or refresh. This project uses the standard workaround:

- `vite.config.js` sets `base: '/Netflix-Clone/'` to match the GitHub Pages subpath
- `BrowserRouter` in `main.jsx` is given a matching `basename="/Netflix-Clone"`
- `public/404.html` catches any unmatched path, stashes the intended URL in `sessionStorage`, and redirects to the app root
- An inline script in `index.html` restores that URL via `history.replaceState` once the app loads, handing control back to React Router

This means direct links and page refreshes on nested routes (e.g. `/Netflix-Clone/login`) work correctly, not just in-app navigation.

## Author

Built by [Brent Hippler](https://github.com/brenthippler-art) as part of a portfolio demonstrating frontend development skills following a career transition into web development.
