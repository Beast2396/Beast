#!/usr/bin/env python3
"""Assemble the portfolio from site.css + anim.css + content.js + site.js."""
import os

CSS = open("site.css", encoding="utf-8").read()
CSS += "\n" + open("anim.css", encoding="utf-8").read()
CONTENT = open("content.js", encoding="utf-8").read()
APP = open("site.js", encoding="utf-8").read()

HEAD = '''<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap">'''


def section(num, sid, title, note, inner):
    return f'''  <section id="{sid}">
    <div class="wrap">
      <div class="sec-bar">
        <span class="sec-n">{num}</span>
        <div><h2 class="sec-t">{title}</h2>{f'<p class="sec-x" id="{note}"></p>' if note else ''}</div>
      </div>
{inner}
    </div>
  </section>
'''


BODY = f'''<header class="topbar" id="topbar">
  <div class="wrap bar">
    <a class="sig" id="sig" href="#top"></a>
    <nav id="nav" aria-label="Sections"></nav>
    <div class="bar-end"><button class="tog" id="theme" type="button"></button></div>
  </div>
</header>

<main id="top">
  <section class="hero">
    <div class="wrap">
      <div class="hero-grid">
        <h1 class="name" id="name"></h1>
        <ul class="annots" id="annots"></ul>
      </div>
      <p class="statement" id="statement"></p>
      <div class="hero-foot" id="herofoot"></div>
    </div>
  </section>

{section('01', 'focus', 'What I work on', None, '      <div class="entries" id="focus-list"></div>')}
{section('02', 'work', 'Internships', None,
         '      <div class="entries" id="work-list"></div>\n'
         '      <div class="sec-bar" style="margin-top:44px"><span class="sec-n">02.1</span>'
         '<div><h2 class="sec-t">Education</h2></div></div>\n'
         '      <div class="entries" id="edu-list"></div>')}
{section('03', 'research', 'Published work', None, '      <div class="entries" id="research-list"></div>')}
{section('04', 'certs', 'Certifications', 'cert-note', '      <div class="entries" id="cert-list"></div>')}
{section('05', 'toolkit', 'Toolkit', None, '      <div class="kit" id="kit"></div>')}
{section('06', 'writing', 'Notes &amp; writeups', None, '      <div class="entries" id="writing-list"></div>')}

  <section id="contact">
    <div class="wrap">
      <h2 class="contact-head">Let&rsquo;s talk.</h2>
      <p class="contact-x">Open to security internships and new-grad roles in application
        security, offensive security, and cloud security.</p>
      <div class="toc" id="toc"></div>
    </div>
  </section>
</main>

<footer><div class="wrap foot" id="foot"></div></footer>

<script>{CONTENT}</script>
<script>{APP}</script>'''

open("page.html", "w", encoding="utf-8").write(
    f"<title>Srinivas Koushik Kodukula</title>\n{HEAD}\n<style>{CSS}</style>\n{BODY}\n")

open("index.html", "w", encoding="utf-8").write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Srinivas Koushik Kodukula — Application &amp; Cloud Security</title>
<meta name="description" content="Cybersecurity master's candidate at the University of Maryland working across application security, offensive security, and cloud security. CAP and CEH certified, with published IEEE research.">
<meta name="author" content="Srinivas Koushik Kodukula">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#FAFAF8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0C0C0E" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:title" content="Srinivas Koushik Kodukula — Application &amp; Cloud Security">
{HEAD}
<style>{CSS}</style>
</head>
<body>
{BODY}
</body>
</html>
''')

print(f"index.html {os.path.getsize('index.html'):,} bytes | page.html {os.path.getsize('page.html'):,} bytes")
