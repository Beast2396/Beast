/* THE APPSEC FILE — renderer. All copy comes from window.SITE (../content.js). */
(function () {
  'use strict';

  var S = window.SITE, O = S.owner;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var ICON = {
    arrow: '<path d="M5 12h13M12 5.5 18.5 12 12 18.5"/>',
    out:   '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:  '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>'
  };
  var ico = function (n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
  };

  var ROMAN = (function (y) {
    var map = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
               [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    var out = '';
    map.forEach(function (p) { while (y >= p[0]) { out += p[1]; y -= p[0]; } });
    return out;
  })(new Date().getFullYear());

  /* contents — the folios are the real section order */
  var SECTIONS = [
    { folio: '02', id: 'credentials', title: 'Credentials, verified',
      note: S.certifications.length + ' entries' },
    { folio: '04', id: 'research', title: 'Research',
      note: S.publications[0].venue + ' ' + S.publications[0].date.replace(/^\w+ /, '') },
    { folio: '06', id: 'projects', title: 'Projects',
      note: S.projects.length + ' builds' },
    { folio: '08', id: 'practice', title: 'Practice',
      note: S.capabilities.length + ' departments' },
    { folio: '10', id: 'record', title: 'Education & experience',
      note: S.education.length + ' degrees' },
    { folio: '12', id: 'contact', title: 'Contact', note: O.status.indexOf('Open') === 0 ? 'Open' : '' }
  ];

  /* ── cover ─────────────────────────────────────────────────────────── */
  $('#issue').textContent = 'Issue 01';
  $('#year').textContent = ROMAN;
  $('#coverline').innerHTML = 'The<br>AppSec<br><em>File</em>';
  $('#standfirst').textContent =
    'On reading code closely enough to find what shipped broken.';
  $('#byline').innerHTML = '<b>' + esc(O.name) + '</b> — ' + esc(O.discipline) +
    '. ' + esc(O.intro.split('. ').slice(1).join('. '));
  $('#status').innerHTML = '<span class="dot"></span><span>' + esc(O.status) + '</span>';

  $('#toc').innerHTML = SECTIONS.map(function (s) {
    return '<a class="toc-item" href="#' + s.id + '">' +
      '<span class="toc-folio">' + s.folio + '</span>' +
      '<span class="toc-title">' + esc(s.title) + '</span>' +
      '<span class="toc-note">' + esc(s.note) + '</span></a>';
  }).join('');

  $('#runner-nav').innerHTML = SECTIONS.map(function (s) {
    return '<a href="#' + s.id + '">' + esc(s.title.split(',')[0].split(' & ')[0]) + '</a>';
  }).join('');
  $('#runner-title').textContent = 'The AppSec File · Issue 01';

  /* ── 02 credentials ────────────────────────────────────────────────── */
  $('#credentials-list').innerHTML = S.certifications.map(function (c) {
    var target = c.href || c.about;
    var inner =
      '<div class="item-side"><span class="k">' + esc(c.code) + '</span>' +
      (c.meta ? '<span class="v">' + esc(c.meta).replace(/ · /g, '<br>') + '</span>' : '') + '</div>' +
      '<div><h3>' + esc(c.title) + '</h3>' +
      '<div class="who">' + esc(c.issuer) + '</div>' +
      '<p>' + esc(c.body) + '</p>' +
      (target ? '<span class="more">' + (c.href ? 'Verify credential' : 'Exam details') + ' ' + ico('out') + '</span>' : '') +
      '</div>';
    return target
      ? '<a class="item" href="' + esc(target) + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>'
      : '<article class="item">' + inner + '</article>';
  }).join('');

  /* ── 04 research — the feature ─────────────────────────────────────── */
  var pub = S.publications[0];
  $('#research-title').textContent = pub.title.split(' — ')[0];
  $('#research-note').innerHTML =
    '<span class="lab">' + esc(pub.venue) + ' · ' + esc(pub.date) + '</span>';
  $('#research-body').innerHTML =
    esc(pub.title.split(' — ').slice(1).join(' — ') || pub.title) + '. ' + esc(pub.body);
  $('#research-pull').textContent =
    'Vehicular networks fail quietly: a grey-hole node forwards enough traffic to look healthy while dropping the rest.';

  /* ── 06 projects ───────────────────────────────────────────────────── */
  $('#projects-list').innerHTML = S.projects.map(function (p, i) {
    return '<article class="item">' +
      '<div class="item-side"><span class="k">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span>' +
      '<span class="v">' + esc(p.tag) + '</span></div>' +
      '<div><h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.body) + '</p>' +
      '<ul class="tags" style="margin-top:14px">' + p.metrics.map(function (m) {
        return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' +
      '</div></article>';
  }).join('');

  /* ── 08 practice ───────────────────────────────────────────────────── */
  $('#practice-list').innerHTML = S.capabilities.map(function (c) {
    return '<div><h4>' + esc(c.title) + '</h4><p>' + esc(c.body) + '</p>' +
      '<ul class="tags">' + c.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
      '</ul></div>';
  }).join('') + S.toolkit.map(function (g) {
    return '<div><h4>' + esc(g.group) + '</h4>' +
      '<ul class="tags">' + g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
      '</ul></div>';
  }).join('');

  /* ── 08 record ─────────────────────────────────────────────────────── */
  $('#record-list').innerHTML =
    S.education.map(function (e) {
      return '<div class="rec-row"><div class="rec-when">' + esc(e.period) + '</div>' +
        '<div><div class="rec-what"><b>' + esc(e.qualification) + '</b></div>' +
        '<div class="rec-where">' + esc(e.org) +
        (e.detail ? '<br>' + esc(e.detail) : '') + '</div></div>' +
        '<div class="rec-note">' + esc(e.grade || '') + '</div></div>';
    }).join('') +
    S.experience.map(function (x) {
      return '<div class="rec-row"><div class="rec-when">' + esc(x.meta.split(' · ').pop()) + '</div>' +
        '<div><div class="rec-what"><b>' + esc(x.org) + '</b></div>' +
        '<ul class="stint">' + x.roles.map(function (r) {
          return '<li>' + esc(r.title) + ' — ' + esc(r.period) + '</li>';
        }).join('') + '</ul></div>' +
        '<div class="rec-note">Internship</div></div>';
    }).join('');

  /* ── 10 contact ────────────────────────────────────────────────────── */
  function row(label, f) {
    var v = esc(f.text) + (f.todo ? ' — to add' : '');
    var inner = '<span class="k">' + esc(label) + '</span><span class="v">' + v + '</span>' +
      (f.href ? '<span class="arw">' + ico('arrow') + '</span>' : '');
    if (!f.href) return '<div class="contact-row">' + inner + '</div>';
    var ext = /^https?:/i.test(f.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<a class="contact-row" href="' + esc(f.href) + '"' + ext + '>' + inner + '</a>';
  }
  $('#contact-list').innerHTML =
    row('Email', O.email) + row('LinkedIn', O.linkedin) + row('GitHub', O.github) +
    row('Résumé', O.resume) + row('Based in', O.location);

  $('#imprint').innerHTML = [
    'The AppSec File · Issue 01',
    'Set in Bodoni Moda, Archivo & IBM Plex Mono',
    '© ' + new Date().getFullYear() + ' ' + O.name
  ].map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');

  /* ── chrome ────────────────────────────────────────────────────────── */
  var root = document.documentElement, tog = $('#theme');
  var dark = function () {
    return root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  var paint = function () {
    tog.innerHTML = ico(dark() ? 'sun' : 'moon');
    tog.setAttribute('aria-label', dark() ? 'Switch to light theme' : 'Switch to dark theme');
  };
  try { var sv = localStorage.getItem('mag-theme'); if (sv) root.dataset.theme = sv; } catch (e) {}
  paint();
  tog.addEventListener('click', function () {
    root.dataset.theme = dark() ? 'light' : 'dark';
    try { localStorage.setItem('mag-theme', root.dataset.theme); } catch (e) {}
    paint();
  });

  var runner = $('#runner'), q = false;
  window.addEventListener('scroll', function () {
    if (q) return; q = true;
    requestAnimationFrame(function () { q = false; runner.classList.toggle('stuck', window.scrollY > 6); });
  }, { passive: true });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.IntersectionObserver) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    document.querySelectorAll('.page-head, .item, .rec-row, .dept > *, .pull, .contact-row')
      .forEach(function (el, i) {
        el.classList.add('rise');
        el.style.transitionDelay = (i % 4) * 55 + 'ms';
        io.observe(el);
      });
  }
})();
