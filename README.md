# Goose Choose

Goose Choose is a small browser app for weighing a decision with scored considerations.

## Open locally

Open `Open Goose Choose.html` in a browser, or open `app/index.html` directly.

For a static-server preview, run `python3 -m http.server 8765` from the repository
root, then open `http://localhost:8765/`.

## Language routes and previews

`/` opens English, `/ko/` Korean, and `/ga/` Irish. The URL takes precedence
over previously saved language preferences. The selector updates browser history
without reloading; Back/Forward and Markdown imports keep the language in sync.
The legacy `/app/index.html` entry still works and normalizes to `/` when hosted.

All entries load the same `app/shell.js`, `app/app.js`, stylesheet, and assets.
Edit the interface in `app/shell.html` and preview names/descriptions in
`app/locales.json`, then run:

```sh
python3 scripts/build-pages.py
```

Commit the generated entry HTML, `app/shell.js`, and `app/locales.js` alongside
the sources. GitHub Pages serves these files directly without a build workflow
or SPA rewrite. Every entry contains static localized social metadata, canonical
and alternate links. The original preview artwork is `previewimage.png` in the
repository root (given a PNG extension for the correct HTTP content type).
The generator and routing helper use `https://unpixelated-ideas.github.io/goosechoose/`
as the public origin; update both if the production domain changes.

With the local server running, Playwright available to Node, and Chrome installed,
run `node tests/language-routes.cjs` for the route and application regression checks.
Set `TEST_URL` to test a different server. After deployment, confirm the production
language URLs and `previewimage.png` return HTTP 200; local tests do not deploy files.

## Features

- Score considerations from strongly nay to strongly yea
- Use the default yea/nay framing or custom decision labels
- Break ties with Slots or a two-option blackjack chooser with wildcard jokers
- Switch between English, Korean, and Irish
- Export and reload a decision as Markdown
- Use light, dark, or system theme
