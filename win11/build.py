#!/usr/bin/env python3
"""Assemble the BEast desktop from win11.css + ../content.js + win11.js."""
import os

SHELL = "BEast"          # the desktop's name, shown in titles and status bars

CSS = open("win11.css", encoding="utf-8").read()
CONTENT = open("../content.js", encoding="utf-8").read()
APP = open("win11.js", encoding="utf-8").read().replace("SKK 11", SHELL)

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

<script>''' + CONTENT + '''</script>
<script>''' + APP + '''</script>'''

open("page.html", "w", encoding="utf-8").write(
    f"<title>{SHELL}</title>\n{HEAD}\n<style>{CSS}</style>\n{BODY}\n")

open("index.html", "w", encoding="utf-8").write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{SHELL} — Srinivas Koushik Kodukula</title>
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
