/* Renderer. All copy comes from window.SITE (content.js).
   Every list on the page is the same object: a monospace margin rail on
   the left, content on the right, hairline rule between. */
(function () {
  'use strict';

  var S = window.SITE, O = S.owner;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var ICON = {
    arrow: '<path d="M5 12h13M12 5.5 18.5 12 12 18.5"/>',
    out:   '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:  '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>'
  };
  function ico(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
  }
  var TODO = '<span class="todo">Add detail</span>';

  /* an entry: rail on the left, content on the right */
  function entry(o) {
    var rail = '<div class="e-rail"><span class="e-id">' + esc(o.id) + '</span>' +
      (o.meta ? '<span class="e-meta">' + o.meta + '</span>' : '') +
      (o.todo ? '<span>' + TODO + '</span>' : '') + '</div>';
    var main = '<div><h3 class="e-title">' + o.title + '</h3>' +
      (o.sub ? '<div class="e-sub">' + esc(o.sub) + '</div>' : '') +
      (o.body ? '<p class="e-body">' + esc(o.body) + '</p>' : '') +
      (o.extra || '') +
      (o.link ? '<span class="e-link">' + esc(o.link.label) + ' ' + ico(o.link.icon || 'arrow') + '</span>' : '') +
      '</div>';
    var cls = 'entry' + (o.todo ? ' is-todo' : '');
    return o.href
      ? '<a class="' + cls + '" href="' + esc(o.href) + '" target="_blank" rel="noopener noreferrer">' + rail + main + '</a>'
      : '<article class="' + cls + '">' + rail + main + '</article>';
  }

  /* ── top bar ───────────────────────────────────────────────────────── */
  $('#sig').innerHTML = 'S.K.KODUKULA<b> //</b> SEC';
  $('#nav').innerHTML = [
    ['01', 'Focus', '#focus'], ['02', 'Work', '#work'], ['03', 'Projects', '#projects'],
    ['04', 'Research', '#research'], ['05', 'Certs', '#certs'], ['06', 'Contact', '#contact']
  ].map(function (n) {
    return '<a href="' + n[2] + '"><i>' + n[0] + '</i>' + n[1] + '</a>';
  }).join('');

  /* ── hero ──────────────────────────────────────────────────────────── */
  var parts = O.name.split(/\s+/);
  $('#name').innerHTML = parts.map(function (w, i) {
    return '<span class="lede' + (i === parts.length - 1 ? ' accent' : '') + '">' + esc(w) + '</span>';
  }).join('');

  var edu = S.education[0];
  var certCodes = S.certifications.filter(function (c) { return !c.todo; })
    .map(function (c) { return c.code; }).join(' · ');
  $('#annots').innerHTML = [
    ['Reading now', edu.qualification.replace(/^Master of Engineering, /, 'MEng ') + ' — ' + edu.grade],
    ['Certified', certCodes],
    ['Focus', O.discipline.replace(/ · /g, ' & ').toLowerCase()],
    ['Published', S.publications[0].venue + ', ' + S.publications[0].date]
  ].map(function (a) {
    return '<li class="annot"><span class="k">' + esc(a[0]) + '</span><span class="v">' + esc(a[1]) + '</span></li>';
  }).join('');

  $('#statement').innerHTML = esc(O.intro)
    .replace('application security', '<b>application security</b>')
    .replace('cloud security', '<b>cloud security</b>');

  $('#herofoot').innerHTML =
    '<span class="live m"><span class="d"></span>' + esc(O.status) + '</span>' +
    '<a class="cta" href="#contact">Get in touch ' + ico('arrow') + '</a>' +
    '<a class="cta" href="' + esc(O.linkedin.href) + '" target="_blank" rel="noopener noreferrer">LinkedIn ' + ico('out') + '</a>';

  /* ── 01 focus ──────────────────────────────────────────────────────── */
  $('#focus-list').innerHTML = S.capabilities.map(function (c, i) {
    return entry({
      id: pad(i + 1) + ' / ' + c.title.split(' ')[0].toUpperCase(),
      title: esc(c.title),
      body: c.body,
      extra: '<ul class="tags">' + c.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
    });
  }).join('');

  /* ── 02 work ───────────────────────────────────────────────────────── */
  $('#work-list').innerHTML = S.experience.map(function (x, i) {
    return entry({
      id: pad(i + 1) + ' / ROLE',
      meta: esc(x.meta).replace(/ · /g, '<br>'),
      title: esc(x.org),
      sub: x.roles.map(function (r) { return r.title; }).join(' · '),
      extra: '<ul class="tags" style="flex-direction:column;gap:8px;align-items:flex-start">' +
        (x.points || []).map(function (p) {
          return '<li style="color:var(--ink-2);font-family:var(--f-body);font-size:14.5px;' +
                 'letter-spacing:0">' + esc(p) + '</li>';
        }).join('') + '</ul>'
    });
  }).join('');

  $('#edu-list').innerHTML = S.education.map(function (e, i) {
    return entry({
      id: pad(i + 1) + ' / DEGREE',
      meta: esc(e.period),
      title: esc(e.qualification),
      sub: e.org,
      body: e.grade + (e.detail ? ' — ' + e.detail : '')
    });
  }).join('');

  /* ── projects ──────────────────────────────────────────────────────── */
  $('#projects-list').innerHTML = S.projects.map(function (p, i) {
    return entry({
      id: pad(i + 1) + ' / BUILD',
      meta: esc(p.tag),
      title: esc(p.title),
      body: p.body,
      extra: '<ul class="tags">' + p.metrics.map(function (m) {
        return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>',
      href: p.href,
      link: p.href ? { label: 'View', icon: 'out' } : null
    });
  }).join('');

  /* ── 03 research ───────────────────────────────────────────────────── */
  $('#research-list').innerHTML = S.publications.map(function (p, i) {
    return entry({
      id: pad(i + 1) + ' / PAPER',
      meta: esc(p.venue) + '<br>' + esc(p.date),
      title: esc(p.title),
      body: p.body,
      href: p.href,
      link: p.href ? { label: 'Read the paper', icon: 'out' } : null
    });
  }).join('');

  /* ── 04 certifications ─────────────────────────────────────────────── */
  var confirmed = S.certifications.filter(function (c) { return !c.todo; }).length;
  $('#cert-note').textContent = confirmed + ' confirmed of ' + S.certifications.length + ' listed.';
  $('#cert-list').innerHTML = S.certifications.map(function (c, i) {
    var target = c.href || c.about;
    return entry({
      id: pad(i + 1) + ' / ' + c.code,
      meta: c.meta ? esc(c.meta).replace(/ · /g, '<br>') : '',
      title: esc(c.title),
      sub: c.issuer,
      body: c.body,
      todo: c.todo,
      href: target,
      link: target ? { label: c.href ? 'Verify credential' : 'Exam details', icon: 'out' } : null
    });
  }).join('');

  /* ── 05 toolkit ────────────────────────────────────────────────────── */
  $('#kit').innerHTML = S.toolkit.map(function (g) {
    return '<div><h4>' + esc(g.group) + '</h4><ul>' +
      g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
  }).join('');

  /* ── 06 writing ────────────────────────────────────────────────────── */
  if (!S.writing.length) {
    var ws = document.getElementById('writing');
    if (ws) ws.remove();
    var wn = document.querySelector('a[href="#writing"]');
    if (wn) wn.remove();
  }
  $('#writing-list').innerHTML = (S.writing || []).map(function (w, i) {
    return entry({
      id: pad(i + 1) + ' / ' + w.tag.toUpperCase(),
      meta: esc(w.date),
      title: esc(w.title),
      body: w.blurb,
      todo: w.todo,
      href: w.href,
      link: w.href ? { label: 'Read', icon: 'arrow' } : null
    });
  }).join('');

  /* ── 07 contact ────────────────────────────────────────────────────── */
  function toc(label, field) {
    var v = esc(field.text) + (field.todo ? ' ' + TODO : '');
    var inner = '<span class="toc-k">' + esc(label) + '</span>' +
      '<span class="toc-dots"></span><span class="toc-v">' + v + '</span>';
    if (!field.href) return '<div class="toc-row">' + inner + '</div>';
    // mailto: opens a mail client, so it must not be forced into a new tab
    var ext = /^https?:/i.test(field.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<a class="toc-row" href="' + esc(field.href) + '"' + ext + '>' + inner + '</a>';
  }
  $('#toc').innerHTML =
    toc('LinkedIn', O.linkedin) + toc('Email', O.email) + toc('Phone', O.phone) +
    toc('GitHub', O.github) +
    toc('Résumé', O.resume) + toc('Based in', O.location);

  $('#foot').innerHTML =
    '<span class="m">© ' + new Date().getFullYear() + ' ' + esc(O.name) + '</span>' +
    '<span class="m">' + esc(O.discipline) + '</span>';

  /* ── theme ─────────────────────────────────────────────────────────── */
  var root = document.documentElement, tog = $('#theme');
  function isDark() {
    return root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function paint() {
    tog.innerHTML = ico(isDark() ? 'sun' : 'moon');
    tog.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  }
  try { var sv = localStorage.getItem('theme'); if (sv) root.dataset.theme = sv; } catch (e) {}
  paint();
  tog.addEventListener('click', function () {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paint();
  });

  /* ── chrome + motion ───────────────────────────────────────────────── */
  var bar = $('#topbar'), q = false;
  window.addEventListener('scroll', function () {
    if (q) return; q = true;
    requestAnimationFrame(function () { q = false; bar.classList.toggle('stuck', window.scrollY > 6); });
  }, { passive: true });

  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still) {
    var hero = Array.prototype.slice.call(document.querySelectorAll('.name .lede, .annot, .statement, .hero-foot > *'));
    hero.forEach(function (el, i) { el.classList.add('reveal'); el.style.transitionDelay = (60 + i * 55) + 'ms'; });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.forEach(function (el) { el.classList.add('in'); }); });
    });

    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
      document.querySelectorAll('.sec-bar, .entry, .kit > *, .toc-row, .contact-head, .contact-x')
        .forEach(function (el, i) {
          el.classList.add('reveal');
          el.style.transitionDelay = (i % 5) * 45 + 'ms';
          io.observe(el);
        });
    }
  }
})();
