#!/usr/bin/env python3
"""Assemble the deployable site into docs/ for GitHub Pages.

GitHub Pages can serve from the repo root or from /docs. Using /docs keeps
the sources and the built output in one repo without them colliding.

Beast is the site; the other designs stay reachable at their own paths.
Nothing copyrighted is copied — wallpaper.* is deliberately excluded, so a
deployed BEast falls back to its drawn wallpaper.
"""
import os, re, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, "docs")

PAGES = [
    ("win11/index.html",    "index.html"),        # Beast — the site
    ("index.html",          "annotated/index.html"),
    ("magazine/index.html", "magazine/index.html"),
    ("win95/index.html",    "win95/index.html"),
]

def deployable(html):
    """The wallpaper is never deployed, so a build made on a machine that has
    one would point at a file that isn't there — three 404s in the console.
    Null it out on the way into docs/ and the drawn wallpaper is used."""
    return re.sub(r'window\.WALLPAPER=(?:"[^"]*"|null);',
                  "window.WALLPAPER=null;", html)


shutil.rmtree(DOCS, ignore_errors=True)
for src, dst in PAGES:
    s = os.path.join(ROOT, src)
    d = os.path.join(DOCS, dst)
    os.makedirs(os.path.dirname(d), exist_ok=True)
    with open(s, encoding="utf-8") as fh:
        html = deployable(fh.read())
    with open(d, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"  {src:22} -> docs/{dst}")

# the résumé sits at the site root; every design links to it absolutely
shutil.copyfile(os.path.join(ROOT, "resume.pdf"), os.path.join(DOCS, "resume.pdf"))
print("  resume.pdf             -> docs/resume.pdf")

# tell Pages not to run the built output through Jekyll
open(os.path.join(DOCS, ".nojekyll"), "w").close()

total = sum(os.path.getsize(os.path.join(DOCS, d)) for _, d in PAGES)
print(f"\ndocs/ built — {len(PAGES)} pages, {total:,} bytes")
