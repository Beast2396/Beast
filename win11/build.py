#!/usr/bin/env python3
"""Assemble the Beast desktop from win11.css + ../content.js + win11.js."""
import os

SHELL = "Beast"          # the desktop's name, shown in titles and status bars

CSS = open("win11.css", encoding="utf-8").read()
CONTENT = open("../content.js", encoding="utf-8").read()
APP = open("win11.js", encoding="utf-8").read().replace("SKK 11", SHELL)

# Detect a local wallpaper at build time instead of probing three URLs at
# runtime: a deployed build has none, so it makes no request at all rather
# than logging three 404s in the console.
WALLPAPER = next((f for f in ("wallpaper.webp", "wallpaper.jpg", "wallpaper.png")
                  if os.path.exists(f)), None)
WALLPAPER_JS = "window.WALLPAPER=" + ('"%s"' % WALLPAPER if WALLPAPER else "null") + ";"
print("wallpaper:", WALLPAPER or "none (the drawn one will be used)")

HEAD = '''<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">'''

BODY = '''<div id="wall-photo" aria-hidden="true"></div>
<canvas id="wall" aria-hidden="true"></canvas>
<div id="vignette" aria-hidden="true"></div>

<div id="desktop"><div id="icons"></div></div>

<div id="modal" hidden></div>

<div id="start" hidden>
  <div class="searchbox">
    <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M20 20l7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
    Search
  </div>
  <div class="start-head"><b>Pinned</b></div>
  <div class="pinned" id="pinned"></div>
  <div class="start-head"><b>Recommended</b></div>
  <div class="reco" id="reco"></div>
  <div class="start-foot">
    <span class="avatar" id="avatar"></span>
    <span class="nm" id="username"></span>
    <button class="pw" data-power="1" aria-label="Shut down">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4v13" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M9 9a10 10 0 1 0 14 0" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</div>

<div id="taskbar">
  <div id="tb-center"></div>
  <div id="tray"><b id="clock">--:--</b><b id="date"></b></div>
</div>

<script>''' + WALLPAPER_JS + '''</script>
<script>''' + CONTENT + '''</script>
<script>''' + APP + '''</script>'''

open("page.html", "w", encoding="utf-8").write(
    f"<title>{SHELL}</title>\n{HEAD}\n<style>{CSS}</style>\n{BODY}\n")

open("index.html", "w", encoding="utf-8").write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%227%22%20fill%3D%22%230E1216%22%2F%3E%3Cpath%20d%3D%22M16%205%206%209v7c0%206.4%204.3%2010.6%2010%2012%205.7-1.4%2010-5.6%2010-12V9z%22%20fill%3D%22%23E8443F%22%2F%3E%3Cpath%20d%3D%22M11.4%2016.2l3.2%203.2%206-6.6%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{SHELL}</title>
<meta name="description" content="The portfolio of Srinivas Koushik Kodukula, application and cloud security, presented as a desktop. Four verified credentials and published IEEE research.">
<meta name="author" content="Srinivas Koushik Kodukula">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#0A0A0C">
<meta property="og:type" content="website">
<meta property="og:title" content="{SHELL} — Srinivas Koushik Kodukula">
{HEAD}
<style>{CSS}</style>
</head>
<body>
{BODY}
</body>
</html>
''')

print(f"index.html {os.path.getsize('index.html'):,} bytes | page.html {os.path.getsize('page.html'):,} bytes")
