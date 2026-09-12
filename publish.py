#!/usr/bin/env python3
"""Assemble the deployable site into docs/ for GitHub Pages.

GitHub Pages can serve from the repo root or from /docs. Using /docs keeps
the sources and the built output in one repo without them colliding.

Beast is the only page published; the other designs remain as sources.
DEPLOY_WALLPAPER controls whether the desktop wallpaper ships with the site.
"""
import os, re, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, "docs")

# Only Beast is deployed. The other designs stay in the repo as sources —
# add them back here to publish them again.
PAGES = [
    ("win11/index.html", "index.html"),   # Beast — the site
]

# Ship the desktop wallpaper with the deployed site. Set False and the
# deployed build falls back to the wallpaper it draws for itself.
DEPLOY_WALLPAPER = True

def deployable(html):
    """Keep the wallpaper reference only when the image is being shipped —
    otherwise the deployed page points at a file that isn't there and logs
    a 404 for it."""
    if DEPLOY_WALLPAPER:
        return html
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

if DEPLOY_WALLPAPER:
    for name in ("wallpaper.webp", "wallpaper.jpg", "wallpaper.png"):
        src = os.path.join(ROOT, "win11", name)
        if os.path.exists(src):
            shutil.copyfile(src, os.path.join(DOCS, name))
            print(f"  win11/{name:16} -> docs/{name}")
            break

# tell Pages not to run the built output through Jekyll
open(os.path.join(DOCS, ".nojekyll"), "w").close()

total = sum(os.path.getsize(os.path.join(DOCS, d)) for _, d in PAGES)
print(f"\ndocs/ built — {len(PAGES)} pages, {total:,} bytes")
