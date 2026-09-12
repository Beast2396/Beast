#!/usr/bin/env python3
"""Assemble SKK 95 from win95.css + ../content.js + win95.js."""
import os

CSS = open("win95.css", encoding="utf-8").read()
CONTENT = open("../content.js", encoding="utf-8").read()
APP = open("win95.js", encoding="utf-8").read()

BODY = '''<div id="desktop">
  <div id="icons"></div>
</div>

<div id="modal" hidden></div>

<div id="startmenu" hidden>
  <div class="banner"><b>Srinivas<i> 95</i></b></div>
  <div id="startitems"></div>
</div>

<div id="taskbar">
  <button id="start" aria-haspopup="true">
    <svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="2" y="4" width="13" height="11" fill="#C81E2D"/><rect x="17" y="4" width="13" height="11" fill="#2E8BD6"/>
      <rect x="2" y="17" width="13" height="11" fill="#3FA34D"/><rect x="17" y="17" width="13" height="11" fill="#F2B441"/>
    </svg>Start
  </button>
  <span class="tsep"></span>
  <div id="tasks"></div>
  <div id="tray"><span id="clock">--:--</span></div>
</div>

<script>''' + CONTENT + '''</script>
<script>''' + APP + '''</script>'''

open("page.html", "w", encoding="utf-8").write(
    f"<title>SKK 95</title>\n<style>{CSS}</style>\n{BODY}\n")

open("index.html", "w", encoding="utf-8").write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%227%22%20fill%3D%22%230E1216%22%2F%3E%3Cpath%20d%3D%22M16%205%206%209v7c0%206.4%204.3%2010.6%2010%2012%205.7-1.4%2010-5.6%2010-12V9z%22%20fill%3D%22%23E8443F%22%2F%3E%3Cpath%20d%3D%22M11.4%2016.2l3.2%203.2%206-6.6%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SKK 95 — Srinivas Koushik Kodukula</title>
<meta name="description" content="The portfolio of Srinivas Koushik Kodukula, application and cloud security, presented as a desktop. Four verified credentials and published IEEE research.">
<meta name="author" content="Srinivas Koushik Kodukula">
<meta name="theme-color" content="#008080">
<meta property="og:type" content="website">
<meta property="og:title" content="SKK 95 — Srinivas Koushik Kodukula">
<style>{CSS}</style>
</head>
<body>
{BODY}
</body>
</html>
''')

print(f"index.html {os.path.getsize('index.html'):,} bytes | page.html {os.path.getsize('page.html'):,} bytes")
