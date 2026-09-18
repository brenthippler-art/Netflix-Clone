# Netflix Clone

A Netflix UI clone built with React and the TMDB API, deployed as a single-page app on GitHub Pages.

🔗 [Live Demo](https://brenthippler-art.github.io/Netflix-Clone/)

## Features

- Browse movies/shows by category, pulled live from TMDB
- Responsive layout matching Netflix's row-based browsing UI

## Tech Stack

React, Vite, TMDB API

## Notable Engineering Details

- GitHub Pages doesn't natively support client-side routing for SPAs (a hard refresh on a nested route 404s). Solved with a `basename` config plus a `404.html` redirect trick so deep links resolve correctly.
- TMDB API key was originally exposed client-side; remediated by scrubbing it from git history with `git filter-repo` and moving it to an environment variable.

## Running Locally

```bash
git clone https://github.com/brenthippler-art/Netflix-Clone.git
cd Netflix-Clone
npm install
npm run dev
```

You'll need your own TMDB API key as an environment variable.

## Author

Brenton Hippler — Frontend Developer | [brentoncodes.dev](https://brentoncodes.dev)
