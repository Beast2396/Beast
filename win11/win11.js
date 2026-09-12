/* SKK 11 — Fluent desktop shell. Copy comes from window.SITE (../content.js). */
(function () {
  'use strict';

  var S = window.SITE, O = S.owner;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ══ wallpaper ═══════════════════════════════════════════════════════
     Drawn rather than loaded: a sodium bloom over near-black, faint
     terminal noise, scanlines and film grain. Original artwork in the
     register the request asked for, not the show's own assets. */
  (function wallpaper() {
    var c = $('#wall'), ctx = c.getContext('2d');
    var GLYPH = '01ABCDEF#$%&*<>[]{}/\\|_-=+';
    var photo = null;

    /* If you drop your own wallpaper next to index.html it is used instead.
       Nothing copyrighted ships with the site; this just reads a local file
       if one happens to be there. */
    /* window.WALLPAPER is written at build time — the filename if one sits
       next to index.html, otherwise null. Handing it to the compositor as a
       CSS background keeps it at native quality, and a build with no
       wallpaper makes no request at all. */
    if (window.WALLPAPER) {
      var im = new Image();
      im.onload = function () {
        photo = window.WALLPAPER;
        var layer = $('#wall-photo');
        layer.style.backgroundImage = 'url("' + window.WALLPAPER + '")';
        layer.classList.add('on');
        c.style.display = 'none';
      };
      im.src = window.WALLPAPER;
    }

    function paint() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.floor(innerWidth * dpr);
      c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var W = innerWidth, H = innerHeight;

      if (photo) return;   // a real image is on the layer above

      /* ── drawn wallpaper ──────────────────────────────────────────────
         Graded after the series' cinematography rather than copied from
         it: teal-green shadows, tungsten pools, a red practical low left,
         shallow bokeh, and heavy film grain. */
      ctx.fillStyle = '#0A100E';
      ctx.fillRect(0, 0, W, H);

      function glow(x, y, r, stops) {
        var g = ctx.createRadialGradient(x, y, 0, x, y, r);
        stops.forEach(function (s) { g.addColorStop(s[0], s[1]); });
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // tungsten practical, mid right — the warm key
      glow(W * 0.74, H * 0.34, Math.max(W, H) * 0.62, [
        [0, 'rgba(198, 132, 58, 0.26)'], [0.4, 'rgba(140, 86, 38, 0.10)'], [1, 'rgba(0,0,0,0)']]);
      // red practical, low left
      glow(W * 0.16, H * 0.82, Math.max(W, H) * 0.55, [
        [0, 'rgba(168, 44, 32, 0.30)'], [0.45, 'rgba(96, 26, 22, 0.12)'], [1, 'rgba(0,0,0,0)']]);
      // cold fill, top left — the teal that makes the warm read warm
      glow(W * 0.12, H * 0.08, Math.max(W, H) * 0.7, [
        [0, 'rgba(46, 92, 92, 0.20)'], [1, 'rgba(0,0,0,0)']]);

      // out-of-focus highlights
      [[0.62, 0.18, 46], [0.88, 0.52, 30], [0.30, 0.62, 22], [0.52, 0.80, 34]].forEach(function (b) {
        var g = ctx.createRadialGradient(W * b[0], H * b[1], 0, W * b[0], H * b[1], b[2]);
        g.addColorStop(0, 'rgba(226, 176, 104, 0.10)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(W * b[0], H * b[1], b[2], 0, 6.29);
        ctx.fill();
      });

      // terminal noise, only legible if you go looking for it
      ctx.font = '12px ui-monospace, Consolas, monospace';
      ctx.textBaseline = 'top';
      for (var y = 30; y < H - 30; y += 19) {
        var line = '', n = Math.floor(W / 8.4);
        for (var i = 0; i < n; i++) line += GLYPH[(Math.random() * GLYPH.length) | 0];
        ctx.fillStyle = Math.random() > 0.9
          ? 'rgba(212, 132, 60, 0.05)'
          : 'rgba(180, 210, 200, 0.022)';
        ctx.fillText(line, 20, y);
      }

      // foreground silhouette, bottom left — the framing the show always uses
      var sil = ctx.createRadialGradient(W * 0.06, H * 1.02, 0, W * 0.06, H * 1.02, Math.max(W, H) * 0.45);
      sil.addColorStop(0, 'rgba(0,0,0,0.88)');
      sil.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sil;
      ctx.fillRect(0, 0, W, H);

      // film grain
      var dots = Math.floor(W * H / 240);
      for (var d = 0; d < dots; d++) {
        ctx.fillStyle = Math.random() > 0.5
          ? 'rgba(255,246,232,' + (Math.random() * 0.055).toFixed(3) + ')'
          : 'rgba(0,0,0,' + (Math.random() * 0.07).toFixed(3) + ')';
        ctx.fillRect(Math.random() * W | 0, Math.random() * H | 0, 1, 1);
      }
    }

    paint();
    var t;
    addEventListener('resize', function () { clearTimeout(t); t = setTimeout(paint, 220); });
  })();

  /* ══ Fluent-style icons, drawn here rather than shipped from Windows ══ */
  var G = {
    person:
      '<defs><linearGradient id="gp" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#57B3F5"/><stop offset="1" stop-color="#1E68C8"/></linearGradient></defs>' +
      '<rect x="3" y="5" width="26" height="22" rx="4" fill="url(#gp)"/>' +
      '<rect x="3" y="5" width="26" height="22" rx="4" fill="none" stroke="rgba(255,255,255,.28)"/>' +
      '<circle cx="13" cy="14" r="4" fill="#fff" opacity=".95"/>' +
      '<path d="M7 23c1-3.4 11-3.4 12 0z" fill="#fff" opacity=".95"/>' +
      '<rect x="21" y="12" width="5" height="1.8" rx=".9" fill="#fff" opacity=".7"/>' +
      '<rect x="21" y="16" width="5" height="1.8" rx=".9" fill="#fff" opacity=".45"/>',
    doc:
      '<defs><linearGradient id="gd" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#4A9BE8"/><stop offset="1" stop-color="#1B5FB5"/></linearGradient></defs>' +
      '<path d="M7 3h12l7 7v19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#F4F6F9"/>' +
      '<path d="M19 3l7 7h-6a1 1 0 0 1-1-1z" fill="#CBD6E4"/>' +
      '<rect x="5" y="17" width="16" height="12" rx="2" fill="url(#gd)"/>' +
      '<text x="13" y="26.2" font-family="Segoe UI,Inter,sans-serif" font-size="8.5" font-weight="700" fill="#fff" text-anchor="middle">W</text>',
    folder:
      '<defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#FFD35C"/><stop offset="1" stop-color="#F0A92E"/></linearGradient>' +
      '<linearGradient id="gf2" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#FFE9A8"/><stop offset="1" stop-color="#FFC64D"/></linearGradient></defs>' +
      '<path d="M3 8a2 2 0 0 1 2-2h7l3 3h10a2 2 0 0 1 2 2v3H3z" fill="url(#gf)"/>' +
      '<path d="M3 12h26v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="url(#gf2)"/>' +
      '<path d="M3 12h26v2H3z" fill="rgba(255,255,255,.5)"/>',
    stack:
      '<defs><linearGradient id="gst" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#4FE0B8"/><stop offset="1" stop-color="#0C8A70"/></linearGradient>' +
      '<linearGradient id="gst2" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#2FB795"/><stop offset="1" stop-color="#0A6B57"/></linearGradient></defs>' +
      '<path d="M16 20.5 3.5 14.2l2.6-1.3L16 18l9.9-5.1 2.6 1.3z" fill="url(#gst2)"/>' +
      '<path d="M16 26 3.5 19.7l2.6-1.3L16 23.5l9.9-5.1 2.6 1.3z" fill="url(#gst2)" opacity=".72"/>' +
      '<path d="M16 4.2 29 11l-13 6.8L3 11z" fill="url(#gst)"/>' +
      '<path d="M16 4.2 29 11l-13 6.8z" fill="rgba(255,255,255,.18)"/>',
    cert:
      '<defs><linearGradient id="gc" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D8DEE8"/></linearGradient></defs>' +
      '<rect x="4" y="4" width="24" height="17" rx="2.5" fill="url(#gc)"/>' +
      '<rect x="8" y="9" width="15" height="1.8" rx=".9" fill="#2E6FCB"/>' +
      '<rect x="8" y="13" width="10" height="1.8" rx=".9" fill="#9BA7B8"/>' +
      '<circle cx="22" cy="22" r="6" fill="#E8443F"/>' +
      '<path d="M18.4 26.6 17 31l5-2 5 2-1.4-4.4z" fill="#C42B1C"/>' +
      '<path d="M19.6 22.2l1.8 1.8 3-3.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    pdf:
      '<path d="M7 3h12l7 7v19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#F4F6F9"/>' +
      '<path d="M19 3l7 7h-6a1 1 0 0 1-1-1z" fill="#CBD6E4"/>' +
      '<rect x="4" y="17" width="18" height="12" rx="2" fill="#D0322B"/>' +
      '<text x="13" y="26.2" font-family="Segoe UI,Inter,sans-serif" font-size="7.6" font-weight="700" fill="#fff" text-anchor="middle">PDF</text>',
    mail:
      '<defs><linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#3FA0F0"/><stop offset="1" stop-color="#1652B8"/></linearGradient></defs>' +
      '<rect x="3" y="7" width="26" height="18" rx="3" fill="url(#gm)"/>' +
      '<path d="M4.5 9.5 16 18l11.5-8.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>',
    phone:
      '<defs><linearGradient id="gph" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#5BD07A"/><stop offset="1" stop-color="#128A46"/></linearGradient></defs>' +
      '<rect x="9" y="2.5" width="14" height="27" rx="3.2" fill="url(#gph)"/>' +
      '<rect x="11" y="6" width="10" height="17" rx="1.4" fill="#0B3F23" opacity=".5"/>' +
      '<circle cx="16" cy="26" r="1.5" fill="#fff" opacity=".9"/>',
    pc:
      '<defs><linearGradient id="gpc" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#5C6672"/><stop offset="1" stop-color="#2B333C"/></linearGradient></defs>' +
      '<rect x="3" y="5" width="26" height="17" rx="2.5" fill="url(#gpc)"/>' +
      '<rect x="5.5" y="7.5" width="21" height="12" rx="1.5" fill="#0E5FC4"/>' +
      '<path d="M11 25h10l1.5 3h-13z" fill="#48525E"/>',
    bin:
      '<path d="M10 10h12l-1 18a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2z" fill="rgba(180,196,214,.5)" stroke="rgba(255,255,255,.45)"/>' +
      '<rect x="8" y="7" width="16" height="3" rx="1.5" fill="rgba(200,214,230,.7)"/>' +
      '<rect x="13" y="4" width="6" height="3" rx="1.5" fill="rgba(200,214,230,.7)"/>',
    link:
      '<rect x="3" y="3" width="26" height="26" rx="4" fill="#0A66C2"/>' +
      '<rect x="7.5" y="13" width="4" height="12" fill="#fff"/>' +
      '<circle cx="9.5" cy="9.3" r="2.3" fill="#fff"/>' +
      '<path d="M14 13h4v1.8a4.6 4.6 0 0 1 7 4v6.2h-4v-5.6c0-1.6-.6-2.5-2-2.5s-2 1-2 2.6V25h-3z" fill="#fff"/>',
    logo:
      '<rect x="3" y="3" width="12" height="12" rx="1" fill="#4CC2FF"/>' +
      '<rect x="17" y="3" width="12" height="12" rx="1" fill="#4CC2FF"/>' +
      '<rect x="3" y="17" width="12" height="12" rx="1" fill="#4CC2FF"/>' +
      '<rect x="17" y="17" width="12" height="12" rx="1" fill="#4CC2FF"/>',
    search: '<circle cx="14" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M20 20l7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    power: '<path d="M16 4v13" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M9 9a10 10 0 1 0 14 0" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    min:   '<path d="M1 5h8" stroke="currentColor" stroke-width="1.1"/>',
    max:   '<rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.1"/>',
    close: '<path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.1"/>'
  };
  function ic(n, box) {
    return '<svg viewBox="0 0 ' + (box || 32) + ' ' + (box || 32) + '" aria-hidden="true">' + G[n] + '</svg>';
  }
  var capIco = function (n) { return '<svg viewBox="0 0 10 10" aria-hidden="true">' + G[n] + '</svg>'; };

  /* ══ window contents ═════════════════════════════════════════════════ */
  function aboutDoc() {
    return '<div class="doc"><h2>' + esc(O.name) + '</h2>' +
      '<p class="sub">' + esc(O.discipline) + ' &middot; ' + esc(O.location.text) + '</p>' +
      '<div class="sep"></div><p>' + esc(O.intro) + '</p>' +
      S.capabilities.map(function (c) {
        return '<h3>' + esc(c.title) + '</h3><p>' + esc(c.body) + '</p>' +
          '<ul class="chips">' + c.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
      }).join('') +
      '<div class="callout">' + esc(O.status) + '</div></div>';
  }
  function resumeDoc() {
    return '<div class="doc"><h2>Résumé</h2><p class="sub">' + esc(O.name) + '</p><div class="sep"></div>' +
      '<h3>Education</h3>' + S.education.map(function (e) {
        return '<dl><dt>' + esc(e.period) + '</dt><dd><b>' + esc(e.qualification) + '</b><br>' +
          esc(e.org) + (e.grade ? '<br>' + esc(e.grade) : '') +
          (e.detail ? '<br>' + esc(e.detail) : '') + '</dd></dl>';
      }).join('') +
      '<h3>Experience</h3>' + S.experience.map(function (x) {
        return '<dl><dt>' + esc(x.meta) + '</dt><dd><b>' + esc(x.org) + '</b><br>' +
          x.roles.map(function (r) { return esc(r.title); }).join(' · ') +
          '<ul class="bul">' + (x.points || []).map(function (p) {
            return '<li>' + esc(p) + '</li>'; }).join('') +
          '</ul></dd></dl>';
      }).join('') +
      '<h3>Certifications</h3><ul class="chips">' +
      S.certifications.map(function (c) { return '<li>' + esc(c.code) + '</li>'; }).join('') + '</ul>' +
      '<h3>Toolkit</h3>' + S.toolkit.map(function (g) {
        return '<dl><dt>' + esc(g.group) + '</dt><dd>' + esc(g.items.join(', ')) + '</dd></dl>';
      }).join('') + '</div>';
  }
  function certsFolder() {
    return '<div class="grid">' + S.certifications.map(function (c) {
      var t = c.href || c.about;
      var inner = ic('cert') + '<b>' + esc(c.code) + '</b><small>' + esc(c.issuer) + '</small>';
      return t ? '<a class="gitem" href="' + esc(t) + '" target="_blank" rel="noopener noreferrer" title="' +
        esc(c.title) + '">' + inner + '</a>' : '<div class="gitem">' + inner + '</div>';
    }).join('') + '</div>';
  }
  function projectsDoc() {
    return '<div class="doc"><h2>Projects</h2>' +
      '<p class="sub">' + S.projects.length + ' selected builds</p><div class="sep"></div>' +
      S.projects.map(function (p, i) {
        return (i ? '<div class="sep"></div>' : '') +
          '<h3 style="margin-top:0">' + esc(p.title) + '</h3>' +
          '<p class="sub">' + esc(p.tag) + '</p>' +
          '<p>' + esc(p.body) + '</p>' +
          '<ul class="chips">' + p.metrics.map(function (m) {
            return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>';
      }).join('') + '</div>';
  }

  function researchDoc() {
    var p = S.publications[0];
    return '<div class="doc"><h2>' + esc(p.title) + '</h2>' +
      '<p class="sub">' + esc(p.venue) + ' &middot; ' + esc(p.date) + '</p><div class="sep"></div>' +
      '<p>' + esc(p.body) + '</p>' +
      '<div class="callout">A grey-hole node forwards just enough traffic to look healthy while ' +
      'dropping the rest &mdash; which is exactly what makes it hard to spot.</div></div>';
  }
  function contactDoc() {
    function row(icon, k, f) {
      var v = esc(f.text) + (f.todo ? ' <span style="color:var(--text-3)">(to add)</span>' : '');
      var inner = ic(icon) + '<span class="k">' + esc(k) + '</span><span class="v">' + v + '</span>' +
        (f.href ? '<span class="go">Open &rsaquo;</span>' : '');
      if (!f.href) return '<div class="row">' + inner + '</div>';
      var ext = /^https?:/i.test(f.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a class="row" href="' + esc(f.href) + '"' + ext + '>' + inner + '</a>';
    }
    return '<div class="doc"><h2>Contact</h2>' +
      '<p class="sub">Open to security internships and new-grad roles.</p>' +
      '<div class="rows">' + row('mail', 'Email', O.email) +
      row('phone', 'Phone', O.phone) + row('link', 'LinkedIn', O.linkedin) +
      row('link', 'GitHub', O.github) + row('doc', 'Résumé', O.resume) +
      row('pc', 'Based in', O.location) + '</div></div>';
  }
  function systemDoc() {
    return '<div class="doc"><h2>About</h2><p class="sub">Device specifications</p><div class="sep"></div>' +
      '<dl><dt>Device name</dt><dd>' + esc(O.name) + '</dd>' +
      '<dt>Discipline</dt><dd>' + esc(O.discipline) + '</dd>' +
      '<dt>Institution</dt><dd>' + esc(S.education[0].org) + '</dd>' +
      '<dt>Credentials</dt><dd>' + S.certifications.map(function (c) { return esc(c.code); }).join(' · ') + '</dd>' +
      '<dt>Projects</dt><dd>' + S.projects.length + '</dd>' +
      '<dt>Publications</dt><dd>' + S.publications.length + ' (' + esc(S.publications[0].venue) + ')</dd>' +
      '<dt>Status</dt><dd>' + esc(O.status) + '</dd></dl></div>';
  }

  var APPS = [
    { id: 'about',    icon: 'person', title: 'About Me',     w: 640, h: 540, x: 140, y: 46,  body: aboutDoc },
    { id: 'resume',   icon: 'doc',    title: 'Résumé',       w: 660, h: 570, x: 250, y: 84,  body: resumeDoc },
    { id: 'certs',    icon: 'folder', title: 'Certificates', w: 560, h: 350, x: 790, y: 360, body: certsFolder, pad0: true,
      status: function () { return S.certifications.length + ' items'; } },
    { id: 'projects', icon: 'stack',  title: 'Projects',     w: 660, h: 520, x: 300, y: 130, body: projectsDoc,
      status: function () { return S.projects.length + ' projects'; } },
    { id: 'research', icon: 'pdf',    title: 'Research',     w: 620, h: 410, x: 330, y: 200, body: researchDoc },
    { id: 'contact',  icon: 'mail',   title: 'Contact',      w: 560, h: 400, x: 420, y: 240, body: contactDoc, pad0: true },
    { id: 'system',   icon: 'pc',     title: 'Settings',     w: 540, h: 400, x: 820, y: 56,  body: systemDoc }
  ];
  var byId = {}; APPS.forEach(function (a) { byId[a.id] = a; });
  var ORDER = ['about', 'resume', 'projects', 'certs', 'research', 'contact', 'system'];

  /* ── desktop icons ─────────────────────────────────────────────────── */
  $('#icons').innerHTML = ORDER.map(function (id) {
    var a = byId[id];
    return '<button class="dicon" data-open="' + id + '">' + ic(a.icon) + '<span>' + esc(a.title) + '</span></button>';
  }).join('') +
  '<a class="dicon" href="' + esc(O.linkedin.href) + '" target="_blank" rel="noopener noreferrer">' +
    ic('link') + '<span>LinkedIn</span></a>' +
  '<button class="dicon" data-bin="1">' + ic('bin') + '<span>Recycle Bin</span></button>';

  /* ── window management ─────────────────────────────────────────────── */
  var z = 100, open = {}, desk = $('#desktop'), center = $('#tb-center');

  function syncTaskbar() {
    center.querySelectorAll('.tb[data-task]').forEach(function (b) {
      var id = b.dataset.task, st = open[id];
      b.classList.toggle('open', !!st);
      b.classList.toggle('on', !!st && !st.el.hidden && st.focused);
    });
  }
  function focusWin(id) {
    Object.keys(open).forEach(function (k) {
      open[k].focused = k === id;
      open[k].el.classList.toggle('blur', k !== id);
    });
    if (open[id]) { open[id].el.style.zIndex = ++z; open[id].el.hidden = false; }
    syncTaskbar();
  }
  /* viewport classes — the desktop metaphor only earns its keep above a
     certain size, so below it windows behave as sheets */
  function device() {
    var w = innerWidth;
    if (w <= 700) return 'phone';
    if (w <= 900) return 'tablet';
    if (w <= 1200) return 'laptop';
    if (w >= 1800) return 'large';
    return 'desktop';
  }
  var SCALE = { phone: 1, tablet: .82, laptop: .9, desktop: 1, large: 1.12 };

  /* place a window proportionally rather than at fixed pixels, so the
     layout holds from a 13" laptop to a 4K display */
  function geometry(a) {
    var d = device(), W = desk.clientWidth, H = desk.clientHeight;
    if (d === 'phone') return null;               // CSS makes it a sheet
    var s = SCALE[d];
    var w = Math.min(Math.round(a.w * s), W - 32);
    var h = Math.min(Math.round(a.h * s), H - 32);
    /* windows must clear the desktop icon column, or they cover its labels */
    var rail = parseInt(getComputedStyle(document.documentElement)
                 .getPropertyValue('--di-w'), 10) || 112;
    var minX = rail + 26;
    var x = Math.round(a.x * (W / 1600));
    if (w < W - minX - 20) x = Math.max(minX, x);
    return {
      w: w, h: h,
      x: Math.max(12, Math.min(x, W - w - 16)),
      y: Math.max(12, Math.min(Math.round(a.y * (H / 940)), H - h - 16))
    };
  }

  function openWin(id) {
    var a = byId[id]; if (!a) return;
    if (open[id]) { open[id].el.hidden = false; focusWin(id); return; }

    var el = document.createElement('section');
    el.className = 'win';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', a.title);
    var g = geometry(a);
    if (g) {
      el.style.width = g.w + 'px'; el.style.height = g.h + 'px';
      el.style.left = g.x + 'px'; el.style.top = g.y + 'px';
    }
    el.innerHTML =
      '<div class="titlebar">' + ic(a.icon) + '<span class="t">' + esc(a.title) + '</span>' +
        '<span class="caps">' +
          '<button class="cap" data-act="min" aria-label="Minimise">' + capIco('min') + '</button>' +
          '<button class="cap" data-act="max" aria-label="Maximise">' + capIco('max') + '</button>' +
          '<button class="cap x" data-act="close" aria-label="Close">' + capIco('close') + '</button>' +
        '</span></div>' +
      '<div class="winbody' + (a.pad0 ? ' pad0' : '') + '">' + a.body() + '</div>' +
      '<div class="statusbar"><span>' + (a.status ? a.status() : 'Ready') + '</span><span class="sp">SKK 11</span></div>';

    desk.appendChild(el);
    open[id] = { el: el, restore: null, focused: true };
    dragify(el, id);
    focusWin(id);
  }
  function closeWin(id) {
    if (!open[id]) return;
    open[id].el.remove(); delete open[id]; syncTaskbar();
  }
  function dragify(el, id) {
    var bar = $('.titlebar', el), dx = 0, dy = 0, on = false;
    bar.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.cap')) return;
      if (matchMedia('(max-width: 760px)').matches) return;
      on = true; dx = e.clientX - el.offsetLeft; dy = e.clientY - el.offsetTop;
      bar.setPointerCapture(e.pointerId); focusWin(id);
    });
    bar.addEventListener('pointermove', function (e) {
      if (!on) return;
      el.style.left = Math.max(-el.offsetWidth + 110, Math.min(e.clientX - dx, desk.clientWidth - 70)) + 'px';
      el.style.top = Math.max(0, Math.min(e.clientY - dy, desk.clientHeight - 34)) + 'px';
    });
    bar.addEventListener('pointerup', function () { on = false; });
    el.addEventListener('pointerdown', function () { focusWin(id); });
  }

  /* ── taskbar + start ───────────────────────────────────────────────── */
  center.innerHTML =
    '<button class="tb" id="startbtn" aria-label="Start">' + ic('logo') + '</button>' +
    ORDER.map(function (id) {
      var a = byId[id];
      return '<button class="tb" data-task="' + id + '" data-open="' + id + '" aria-label="' + esc(a.title) + '">' +
        ic(a.icon) + '</button>';
    }).join('');

  var start = $('#start'), startBtn = $('#startbtn');
  $('#pinned').innerHTML = ORDER.map(function (id) {
    var a = byId[id];
    return '<button class="pin" data-open="' + id + '">' + ic(a.icon) + '<span>' + esc(a.title) + '</span></button>';
  }).join('');
  $('#reco').innerHTML =
    '<a href="' + esc(O.linkedin.href) + '" target="_blank" rel="noopener noreferrer">' + ic('link') +
      '<span><b>LinkedIn</b><small>' + esc(O.linkedin.text) + '</small></span></a>' +
    '<a href="' + esc(O.github.href) + '" target="_blank" rel="noopener noreferrer">' + ic('link') +
      '<span><b>GitHub</b><small>' + esc(O.github.text) + '</small></span></a>' +
    '<button data-open="research">' + ic('pdf') +
      '<span><b>' + esc(S.publications[0].title.split(' — ')[0]) + '</b><small>' +
      esc(S.publications[0].venue) + ' · ' + esc(S.publications[0].date) + '</small></span></button>';
  $('#avatar').textContent = O.name.split(/\s+/).map(function (s) { return s[0]; }).slice(0, 2).join('');
  $('#username').textContent = O.name;

  function openStart() { start.hidden = false; startBtn.classList.add('on'); }
  function closeStart() { start.hidden = true; startBtn.classList.remove('on'); }

  document.addEventListener('click', function (e) {
    if (e.target.closest('#startbtn')) { start.hidden ? openStart() : closeStart(); return; }
    var op = e.target.closest('[data-open]');
    if (op) {
      var id = op.dataset.open;
      if (op.classList.contains('tb') && open[id] && open[id].focused && !open[id].el.hidden) {
        open[id].el.hidden = true; open[id].focused = false; syncTaskbar();
      } else openWin(id);
      closeStart();
      return;
    }
    if (e.target.closest('[data-bin]')) {
      dialog('Recycle Bin', 'Empty. Nothing here was thrown away.'); return;
    }
    if (e.target.closest('[data-power]')) {
      closeStart();
      dialog('Shut down', 'It is now safe to close this tab.<br><br>Or stay — there are ' +
        S.certifications.length + ' verified credentials in that folder.');
      return;
    }
    var cap = e.target.closest('.cap');
    if (cap) {
      var win = cap.closest('.win');
      var wid = Object.keys(open).filter(function (k) { return open[k].el === win; })[0];
      if (!wid) return;
      if (cap.dataset.act === 'close') closeWin(wid);
      if (cap.dataset.act === 'min') { win.hidden = true; open[wid].focused = false; syncTaskbar(); }
      if (cap.dataset.act === 'max') {
        var st = open[wid];
        if (st.restore) { Object.assign(win.style, st.restore); st.restore = null; }
        else {
          st.restore = { left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height };
          Object.assign(win.style, { left: '0px', top: '0px', width: desk.clientWidth + 'px', height: desk.clientHeight + 'px' });
        }
        focusWin(wid);
      }
      return;
    }
    if (!e.target.closest('#start')) closeStart();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeStart(); $('#modal').hidden = true; }
  });

  function dialog(title, html) {
    var m = $('#modal');
    m.innerHTML = '<div class="dlg" role="alertdialog" aria-label="' + esc(title) + '">' +
      '<div class="dlg-h">' + esc(title) + '</div><div class="dlg-b">' + html + '</div>' +
      '<div class="dlg-f"><button class="btn pri" data-dlg="1">OK</button></div></div>';
    m.hidden = false;
    m.querySelector('.btn').focus();
  }
  $('#modal').addEventListener('click', function (e) {
    if (e.target.closest('[data-dlg]') || e.target.id === 'modal') $('#modal').hidden = true;
  });

  /* ── clock ─────────────────────────────────────────────────────────────
     Aligned to the minute boundary rather than polled on a loose interval,
     and re-synced whenever the tab comes back, so it never drifts or shows
     a stale minute after the machine sleeps. */
  var clockEl = $('#clock'), dateEl = $('#date'), timer = null;

  function tick() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes(), ap = h >= 12 ? 'PM' : 'AM';
    clockEl.textContent = (h % 12 || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
    // fixed DD/MM/YYYY rather than the browser locale, which orders it MM/DD
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    dateEl.textContent = p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear();
    clockEl.setAttribute('datetime', d.toISOString());
  }

  function schedule() {
    clearTimeout(timer);
    tick();
    var now = new Date();
    var msToMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    timer = setTimeout(schedule, msToMinute + 40);
  }

  schedule();
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });
  addEventListener('focus', schedule);

  /* nudge windows back into view after a resize or orientation change */
  var rz;
  addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      var W = desk.clientWidth, H = desk.clientHeight;
      Object.keys(open).forEach(function (k) {
        var el = open[k].el;
        if (matchMedia('(max-width: 700px)').matches) {
          el.style.width = ''; el.style.height = ''; el.style.left = ''; el.style.top = '';
          return;
        }
        var w = Math.min(el.offsetWidth, W - 24), h = Math.min(el.offsetHeight, H - 24);
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.style.left = Math.max(8, Math.min(el.offsetLeft, W - w - 12)) + 'px';
        el.style.top = Math.max(0, Math.min(el.offsetTop, H - 40)) + 'px';
      });
    }, 180);
  });

  /* Start on a clean desktop so the wallpaper reads. Every app is one click
     away from the dock or the desktop icons.
     To have windows open on load again, add e.g.:
       openWin('about'); focusWin('about'); */
})();
