# Srinivas Koushik Kodukula — portfolio

Application security · cloud security · offensive security.
Cybersecurity MEng candidate at the University of Maryland.

**Live:** https://beast2396.github.io/Beast/

## Designs

**Beast** is the deployed site. Three alternates live in the repo but are not
published — add them back to `PAGES` in `publish.py` to serve them again.
All four read from a single `content.js`, so a fact is edited once.

| Design | Deployed | Source |
| --- | --- | --- |
| **Beast** — the portfolio as a Windows 11 desktop | `/` | `win11/` |
| Annotated — editorial margin rails and hairlines | — | project root |
| *The AppSec File* — a technical journal issue | — | `magazine/` |
| SKK 95 — the same desktop idea, Windows 95 | — | `win95/` |

## Layout

```
content.js              every fact on every page
win11/                  Beast          — win11.css, win11.js, build.py
magazine/               The AppSec File
win95/                  SKK 95
site.css site.js        Annotated (project root)
build.py                builds Annotated
publish.py              assembles docs/ for GitHub Pages
docs/                   the deployed output
```

## Building

Each design builds itself:

```bash
cd win11 && python3 build.py     # or magazine/ or win95/
python3 build.py                 # Annotated, from the project root
python3 publish.py               # refresh docs/ for deployment
```

## Wallpaper

`win11/` uses a local `wallpaper.jpg|png|webp` if one is present, and
otherwise draws its own. Those files are gitignored on purpose — don't
commit imagery you don't hold the rights to.
