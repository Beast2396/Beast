#!/usr/bin/env python3
"""Assemble THE APPSEC FILE from mag.css + ../content.js + mag.js."""
import os

CSS = open("mag.css", encoding="utf-8").read()
CONTENT = open("../content.js", encoding="utf-8").read()
APP = open("mag.js", encoding="utf-8").read()

HEAD = '''<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">'''

BODY = '''<header class="cover">
  <div class="sheet">
    <div class="masthead">
      <span class="title">The AppSec File</span>
      <span class="lab" id="issue"></span>
      <span class="lab" id="year"></span>
    </div>

    <h1 class="coverline" id="coverline"></h1>
    <p class="standfirst" id="standfirst"></p>
    <p class="byline" id="byline"></p>
    <p class="status-line" id="status"></p>

    <nav class="contents" aria-label="Contents">
      <div class="contents-head"><span class="lab">Inside this issue</span></div>
      <div id="toc"></div>
    </nav>
  </div>
</header>

<div class="runner" id="runner">
  <div class="sheet runner-row">
    <span class="lab" id="runner-title"></span>
    <span class="spacer"></span>
    <nav id="runner-nav" aria-label="Sections"></nav>
    <button class="tog" id="theme" type="button"></button>
  </div>
</div>

<main>
  <section class="page" id="credentials">
    <div class="sheet">
      <div class="page-head">
        <span class="folio">02</span>
        <div>
          <h2 class="page-title">Credentials, verified</h2>
          <p class="page-note">Every entry below links to the issuing body. Nothing here
            rests on my word for it.</p>
        </div>
      </div>
      <div class="spread"><span></span><div id="credentials-list"></div></div>
    </div>
  </section>

  <section class="page feature" id="research">
    <div class="sheet">
      <div class="page-head">
        <span class="folio">04</span>
        <div>
          <h2 class="page-title" id="research-title"></h2>
          <p class="page-note" id="research-note"></p>
        </div>
      </div>
      <div class="spread">
        <span></span>
        <div>
          <p class="feature-body" id="research-body"></p>
          <blockquote class="pull" id="research-pull"></blockquote>
        </div>
      </div>
    </div>
  </section>

  <section class="page" id="practice">
    <div class="sheet">
      <div class="page-head">
        <span class="folio">06</span>
        <div>
          <h2 class="page-title">Practice</h2>
          <p class="page-note">What I work on, and what I work with.</p>
        </div>
      </div>
      <div class="dept" id="practice-list"></div>
    </div>
  </section>

  <section class="page" id="record">
    <div class="sheet">
      <div class="page-head">
        <span class="folio">08</span>
        <div>
          <h2 class="page-title">Education &amp; experience</h2>
        </div>
      </div>
      <div class="record" id="record-list"></div>
    </div>
  </section>

  <section class="colophon" id="contact">
    <div class="sheet">
      <div class="page-head">
        <span class="folio">10</span>
        <div>
          <h2 class="page-title">Contact</h2>
          <p class="page-note">Open to security internships and new-grad roles in
            application security, offensive security, and cloud security.</p>
        </div>
      </div>
      <div class="contact-list" id="contact-list"></div>
      <div class="imprint" id="imprint"></div>
    </div>
  </section>
</main>

<script>''' + CONTENT + '''</script>
<script>''' + APP + '''</script>'''

open("page.html", "w", encoding="utf-8").write(
    f"<title>The AppSec File</title>\n{HEAD}\n<style>{CSS}</style>\n{BODY}\n")

open("index.html", "w", encoding="utf-8").write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>The AppSec File — Srinivas Koushik Kodukula</title>
<meta name="description" content="A technical journal issue: application security, offensive security and cloud security work by Srinivas Koushik Kodukula. Four verified credentials and published IEEE research.">
<meta name="author" content="Srinivas Koushik Kodukula">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#17171A">
<meta property="og:type" content="website">
<meta property="og:title" content="The AppSec File — Srinivas Koushik Kodukula">
{HEAD}
<style>{CSS}</style>
</head>
<body>
{BODY}
</body>
</html>
''')

print(f"index.html {os.path.getsize('index.html'):,} bytes | page.html {os.path.getsize('page.html'):,} bytes")
