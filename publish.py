#!/usr/bin/env python3
"""Assemble the deployable site into docs/ for GitHub Pages.

GitHub Pages can serve from the repo root or from /docs. Using /docs keeps
the sources and the built output in one repo without them colliding.

BEast is the site; the other designs stay reachable at their own paths.
Nothing copyrighted is copied — wallpaper.* is deliberately excluded, so a
deployed BEast falls back to its drawn wallpaper.
"""
import os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, "docs")

PAGES = [
    ("win11/index.html",    "index.html"),        # BEast — the site
    ("index.html",          "annotated/index.html"),
    ("magazine/index.html", "magazine/index.html"),
    ("win95/index.html",    "win95/index.html"),
]

shutil.rmtree(DOCS, ignore_errors=True)
for src, dst in PAGES:
    s = os.path.join(ROOT, src)
    d = os.path.join(DOCS, dst)
    os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.copyfile(s, d)
    print(f"  {src:22} -> docs/{dst}")

# tell Pages not to run the built output through Jekyll
open(os.path.join(DOCS, ".nojekyll"), "w").close()

total = sum(os.path.getsize(os.path.join(DOCS, d)) for _, d in PAGES)
print(f"\ndocs/ built — {len(PAGES)} pages, {total:,} bytes")
