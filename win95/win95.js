/* SKK 95 — desktop shell. All copy comes from window.SITE (../content.js). */
(function () {
  'use strict';

  var S = window.SITE, O = S.owner;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ── icons, drawn on a 32-grid with hard edges ─────────────────────── */
  var ART = {
    user:
      '<rect x="4" y="3" width="24" height="26" fill="#fff" stroke="#000"/>' +
      '<rect x="7" y="6" width="18" height="12" fill="#000080"/>' +
      '<circle cx="16" cy="11" r="3.4" fill="#FFD9A0"/>' +
      '<path d="M10 18c1.6-2.6 10.4-2.6 12 0v0H10z" fill="#FFD9A0"/>' +
      '<rect x="7" y="21" width="18" height="1.6" fill="#808080"/>' +
      '<rect x="7" y="24" width="13" height="1.6" fill="#808080"/>',
    doc:
      '<path d="M6 2h14l6 6v22H6z" fill="#fff" stroke="#000"/>' +
      '<path d="M20 2v6h6" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="10" y="13" width="13" height="1.6" fill="#000080"/>' +
      '<rect x="10" y="17" width="13" height="1.6" fill="#808080"/>' +
      '<rect x="10" y="21" width="9" height="1.6" fill="#808080"/>',
    folder:
      '<path d="M3 7h9l3 3h14v18H3z" fill="#FFD34E" stroke="#000"/>' +
      '<path d="M3 12h26v16H3z" fill="#FFE08A" stroke="#000"/>',
    stack:
      '<rect x="3" y="6" width="16" height="20" fill="#fff" stroke="#000"/>' +
      '<rect x="7" y="4" width="16" height="20" fill="#fff" stroke="#000"/>' +
      '<rect x="11" y="2" width="16" height="20" fill="#fff" stroke="#000"/>' +
      '<rect x="14" y="6" width="10" height="1.6" fill="#000080"/>' +
      '<rect x="14" y="10" width="10" height="1.6" fill="#808080"/>' +
      '<rect x="14" y="14" width="7" height="1.6" fill="#808080"/>',
    cert:
      '<rect x="4" y="4" width="24" height="18" fill="#fff" stroke="#000"/>' +
      '<rect x="8" y="9" width="16" height="1.6" fill="#000080"/>' +
      '<rect x="8" y="13" width="11" height="1.6" fill="#808080"/>' +
      '<circle cx="22" cy="22" r="5.4" fill="#C81E2D" stroke="#000"/>' +
      '<path d="M19 27l1 5 2-1.6 2 1.6 1-5z" fill="#C81E2D" stroke="#000"/>',
    pdf:
      '<path d="M6 2h14l6 6v22H6z" fill="#fff" stroke="#000"/>' +
      '<path d="M20 2v6h6" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="6" y="17" width="20" height="9" fill="#C81E2D"/>' +
      '<text x="16" y="24.4" font-family="Tahoma,sans-serif" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">PDF</text>',
    pc:
      '<rect x="3" y="5" width="26" height="18" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="6" y="8" width="20" height="12" fill="#008080" stroke="#000"/>' +
      '<rect x="11" y="24" width="10" height="3" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="6" y="27" width="20" height="3" fill="#C0C0C0" stroke="#000"/>',
    mail:
      '<rect x="3" y="7" width="26" height="18" fill="#fff" stroke="#000"/>' +
      '<path d="M3 7l13 10L29 7" fill="none" stroke="#000"/>',
    phone:
      '<rect x="10" y="2" width="12" height="28" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="12" y="5" width="8" height="16" fill="#008080" stroke="#000"/>' +
      '<rect x="14" y="24" width="4" height="3" fill="#808080" stroke="#000"/>',
    globe:
      '<circle cx="16" cy="16" r="13" fill="#2E8BD6" stroke="#000"/>' +
      '<path d="M3 16h26M16 3c5 6 5 20 0 26M16 3c-5 6-5 20 0 26" fill="none" stroke="#fff" stroke-width="1.1"/>' +
      '<path d="M6 9c6 3 14 3 20 0M6 23c6-3 14-3 20 0" fill="none" stroke="#fff" stroke-width="1.1"/>',
    bin:
      '<path d="M9 9h14l-1.5 21h-11z" fill="#9AA0A6" stroke="#000"/>' +
      '<rect x="7" y="6" width="18" height="3.4" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="13" y="3" width="6" height="3" fill="#C0C0C0" stroke="#000"/>',
    win:
      '<rect x="2" y="4" width="13" height="11" fill="#C81E2D"/><rect x="17" y="4" width="13" height="11" fill="#2E8BD6"/>' +
      '<rect x="2" y="17" width="13" height="11" fill="#3FA34D"/><rect x="17" y="17" width="13" height="11" fill="#F2B441"/>',
    info:
      '<circle cx="16" cy="16" r="13" fill="#2E8BD6" stroke="#000"/>' +
      '<rect x="14.5" y="13" width="3" height="11" fill="#fff"/><rect x="14.5" y="8" width="3" height="3" fill="#fff"/>',
    power:
      '<circle cx="16" cy="16" r="12" fill="#C0C0C0" stroke="#000"/>' +
      '<rect x="14.6" y="6" width="2.8" height="11" fill="#C81E2D"/>' +
      '<path d="M9 12a9 9 0 1 0 14 0" fill="none" stroke="#C81E2D" stroke-width="2.6"/>'
  };
  function art(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 32 32" shape-rendering="crispEdges" ' +
      'stroke-width="1" aria-hidden="true">' + ART[name] + '</svg>';
  }

  /* ── window contents ───────────────────────────────────────────────── */
  function aboutDoc() {
    return '<div class="doc">' +
      '<h2>' + esc(O.name) + '</h2>' +
      '<p class="sub">' + esc(O.discipline) + ' &mdash; ' + esc(O.location.text) + '</p>' +
      '<span class="rule"></span>' +
      '<p>' + esc(O.intro) + '</p>' +
      S.capabilities.map(function (c) {
        return '<h3>' + esc(c.title) + '</h3><p>' + esc(c.body) + '</p>';
      }).join('') +
      '<span class="rule"></span>' +
      '<p class="sub">' + esc(O.status) + '</p>' +
      '</div>';
  }

  function resumeDoc() {
    return '<div class="doc">' +
      '<h2>Résumé</h2><p class="sub">' + esc(O.name) + ' &mdash; ' + esc(O.discipline) + '</p>' +
      '<span class="rule"></span>' +
      '<h3>Education</h3>' +
      S.education.map(function (e) {
        return '<dl><dt>' + esc(e.period) + '</dt><dd><b>' + esc(e.qualification) + '</b><br>' +
          esc(e.org) + (e.grade ? '<br>' + esc(e.grade) : '') + '</dd></dl>';
      }).join('') +
      '<h3>Experience</h3>' +
      S.experience.map(function (x) {
        return '<dl><dt>' + esc(x.meta) + '</dt><dd><b>' + esc(x.org) + '</b> &mdash; ' +
          x.roles.map(function (r) { return esc(r.title); }).join(' · ') +
          '<ul class="bul">' + (x.points || []).map(function (p) {
            return '<li><span>' + esc(p) + '</span></li>';
          }).join('') + '</ul></dd></dl>';
      }).join('') +
      '<h3>Certifications</h3>' +
      '<ul class="chips">' + S.certifications.map(function (c) {
        return '<li>' + esc(c.code) + '</li>'; }).join('') + '</ul>' +
      '<h3>Toolkit</h3>' +
      S.toolkit.map(function (g) {
        return '<dl><dt>' + esc(g.group) + '</dt><dd>' + esc(g.items.join(', ')) + '</dd></dl>';
      }).join('') +
      '</div>';
  }

  function certsFolder() {
    return '<div class="folder">' + S.certifications.map(function (c) {
      var target = c.href || c.about;
      var label = '<span>' + esc(c.code) + '</span><small>' + esc(c.issuer) + '</small>';
      return target
        ? '<a class="fitem" href="' + esc(target) + '" target="_blank" rel="noopener noreferrer" ' +
          'title="' + esc(c.title) + '">' + art('cert') + label + '</a>'
        : '<span class="fitem" title="' + esc(c.title) + '">' + art('cert') + label + '</span>';
    }).join('') + '</div>';
  }

  function projectsDoc() {
    return '<div class="doc"><h2>Projects</h2>' +
      '<p class="sub">' + S.projects.length + ' selected builds</p><span class="rule"></span>' +
      S.projects.map(function (p, i) {
        return (i ? '<span class="rule"></span>' : '') +
          '<h3 style="margin-top:0">' + esc(p.title) + '</h3>' +
          '<p class="sub">' + esc(p.tag) + '</p><p>' + esc(p.body) + '</p>' +
          '<ul class="chips">' + p.metrics.map(function (m) {
            return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>';
      }).join('') + '</div>';
  }

  function researchDoc() {
    var p = S.publications[0];
    return '<div class="doc">' +
      '<h2>' + esc(p.title) + '</h2>' +
      '<p class="sub">' + esc(p.venue) + ' &mdash; ' + esc(p.date) + '</p>' +
      '<span class="rule"></span>' +
      '<p>' + esc(p.body) + '</p>' +
      '<p class="quote">A grey-hole node forwards just enough traffic to look healthy while ' +
      'dropping the rest &mdash; which is exactly what makes it hard to spot.</p>' +
      '</div>';
  }

  function contactDoc() {
    function row(icon, label, f) {
      var v = esc(f.text) + (f.todo ? ' (to add)' : '');
      var inner = art(icon) + '<b>' + esc(label) + '</b><span>' + v + '</span>' +
        (f.href ? '<small>open</small>' : '');
      if (!f.href) return '<div class="rowlink">' + inner + '</div>';
      var ext = /^https?:/i.test(f.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a class="rowlink" href="' + esc(f.href) + '"' + ext + '>' + inner + '</a>';
    }
    return '<div class="doc"><h2>Contact</h2>' +
      '<p class="sub">Open to security internships and new-grad roles.</p>' +
      '<span class="rule"></span><div class="rows">' +
      row('mail', 'Email', O.email) +
      row('phone', 'Phone', O.phone) +
      row('globe', 'LinkedIn', O.linkedin) +
      row('globe', 'GitHub', O.github) +
      row('doc', 'Résumé', O.resume) +
      row('pc', 'Based in', O.location) +
      '</div></div>';
  }

  function systemDoc() {
    return '<div class="doc">' +
      '<h2>System properties</h2><span class="rule"></span>' +
      '<dl>' +
      '<dt>Registered to</dt><dd>' + esc(O.name) + '</dd>' +
      '<dt>Discipline</dt><dd>' + esc(O.discipline) + '</dd>' +
      '<dt>Institution</dt><dd>' + esc(S.education[0].org) + '</dd>' +
      '<dt>Credentials</dt><dd>' + S.certifications.map(function (c) { return esc(c.code); }).join(' · ') + '</dd>' +
      '<dt>Publications</dt><dd>' + S.publications.length + '</dd>' +
      '<dt>Status</dt><dd>' + esc(O.status) + '</dd>' +
      '</dl></div>';
  }

  /* ── the apps ──────────────────────────────────────────────────────── */
  var APPS = [
    { id: 'about',    icon: 'user',   title: 'About Me',        w: 520, h: 430, x: 128, y: 26,  body: aboutDoc },
    { id: 'resume',   icon: 'doc',    title: 'Résumé.doc',      w: 540, h: 460, x: 260, y: 96,  body: resumeDoc, menu: true },
    /* opens clear of About Me so the desktop reads as two real windows */
    { id: 'certs',    icon: 'folder', title: 'Certificates',    w: 430, h: 268, x: 690, y: 330, body: certsFolder, grey: true,
      status: function () { return S.certifications.length + ' object(s)'; } },
    { id: 'research', icon: 'pdf',    title: 'Research.pdf',    w: 500, h: 330, x: 330, y: 200, body: researchDoc },
    { id: 'contact',  icon: 'mail',   title: 'Contact',         w: 440, h: 310, x: 400, y: 250, body: contactDoc },
    { id: 'system',   icon: 'pc',     title: 'My Computer',     w: 400, h: 300, x: 700, y: 52,  body: systemDoc, grey: true }
  ];
  var byId = {};
  APPS.forEach(function (a) { byId[a.id] = a; });

  /* ── desktop icons ─────────────────────────────────────────────────── */
  var DESKTOP = ['about', 'resume', 'projects', 'certs', 'research', 'contact', 'system'];
  $('#icons').innerHTML = DESKTOP.map(function (id) {
    var a = byId[id];
    return '<button class="icon" data-open="' + id + '">' + art(a.icon) + '<span>' + esc(a.title) + '</span></button>';
  }).join('') +
  '<a class="icon" href="' + esc(O.linkedin.href) + '" target="_blank" rel="noopener noreferrer">' +
    art('globe') + '<span>LinkedIn</span></a>' +
  '<button class="icon" data-bin="1">' + art('bin') + '<span>Recycle Bin</span></button>';

  /* ── window management ─────────────────────────────────────────────── */
  var z = 100, open = {};
  var desk = $('#desktop'), tasks = $('#tasks');

  function focusWin(id) {
    Object.keys(open).forEach(function (k) {
      var w = open[k].el;
      var on = k === id;
      w.classList.toggle('blur', !on);
      var t = tasks.querySelector('[data-task="' + k + '"]');
      if (t) t.classList.toggle('on', on && !w.hidden);
    });
    if (open[id]) { open[id].el.style.zIndex = ++z; open[id].el.hidden = false; }
  }

  function openWin(id) {
    var a = byId[id];
    if (!a) return;
    if (open[id]) { open[id].el.hidden = false; focusWin(id); return; }

    var el = document.createElement('section');
    el.className = 'win';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', a.title);
    var maxW = Math.min(a.w, desk.clientWidth - 24);
    var maxH = Math.min(a.h, desk.clientHeight - 24);
    el.style.width = maxW + 'px';
    el.style.height = maxH + 'px';
    el.style.left = Math.max(6, Math.min(a.x, desk.clientWidth - maxW - 8)) + 'px';
    el.style.top = Math.max(6, Math.min(a.y, desk.clientHeight - maxH - 8)) + 'px';

    el.innerHTML =
      '<div class="titlebar">' + art('' + a.icon) + '<span class="t">' + esc(a.title) + '</span>' +
        '<span class="tbtns">' +
          '<button class="tbtn" data-act="min" aria-label="Minimise">_</button>' +
          '<button class="tbtn" data-act="max" aria-label="Maximise">□</button>' +
          '<button class="tbtn close" data-act="close" aria-label="Close">✕</button>' +
        '</span></div>' +
      (a.menu ? '<div class="menubar"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>' : '') +
      '<div class="winbody' + (a.grey ? ' grey' : '') + '">' + a.body() + '</div>' +
      '<div class="statusbar"><span>' + (a.status ? a.status() : 'Ready') + '</span><span>SKK 95</span></div>';

    desk.appendChild(el);
    open[id] = { el: el, restore: null };

    var t = document.createElement('button');
    t.className = 'task';
    t.dataset.task = id;
    t.innerHTML = art(a.icon) + '<span>' + esc(a.title) + '</span>';
    tasks.appendChild(t);

    dragify(el, id);
    focusWin(id);
  }

  function closeWin(id) {
    if (!open[id]) return;
    open[id].el.remove();
    var t = tasks.querySelector('[data-task="' + id + '"]');
    if (t) t.remove();
    delete open[id];
  }

  /* drag by the title bar; pointer capture keeps it smooth */
  function dragify(el, id) {
    var bar = $('.titlebar', el), dx = 0, dy = 0, on = false;
    bar.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.tbtn')) return;
      if (window.matchMedia('(max-width: 720px)').matches) return;
      on = true;
      dx = e.clientX - el.offsetLeft;
      dy = e.clientY - el.offsetTop;
      bar.setPointerCapture(e.pointerId);
      focusWin(id);
    });
    bar.addEventListener('pointermove', function (e) {
      if (!on) return;
      var x = Math.max(-el.offsetWidth + 90, Math.min(e.clientX - dx, desk.clientWidth - 60));
      var y = Math.max(0, Math.min(e.clientY - dy, desk.clientHeight - 26));
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    });
    bar.addEventListener('pointerup', function () { on = false; });
    el.addEventListener('pointerdown', function () { focusWin(id); });
  }

  /* ── events ────────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var ic = e.target.closest('[data-open]');
    if (ic) { openWin(ic.dataset.open); closeStart(); return; }

    if (e.target.closest('[data-bin]')) {
      dialog('info', 'Recycle Bin', 'The Recycle Bin is empty.<br>Nothing here was thrown away.');
      return;
    }

    var tb = e.target.closest('.tbtn');
    if (tb) {
      var w = tb.closest('.win');
      var id = Object.keys(open).filter(function (k) { return open[k].el === w; })[0];
      if (!id) return;
      if (tb.dataset.act === 'close') closeWin(id);
      if (tb.dataset.act === 'min') {
        w.hidden = true;
        var t = tasks.querySelector('[data-task="' + id + '"]');
        if (t) t.classList.remove('on');
      }
      if (tb.dataset.act === 'max') {
        var st = open[id];
        if (st.restore) {
          Object.assign(w.style, st.restore);
          st.restore = null;
        } else {
          st.restore = { left: w.style.left, top: w.style.top, width: w.style.width, height: w.style.height };
          Object.assign(w.style, { left: '0px', top: '0px', width: desk.clientWidth + 'px', height: desk.clientHeight + 'px' });
        }
        focusWin(id);
      }
      return;
    }

    var tk = e.target.closest('.task');
    if (tk) {
      var tid = tk.dataset.task;
      var win = open[tid].el;
      if (win.hidden) { win.hidden = false; focusWin(tid); }
      else if (tk.classList.contains('on')) { win.hidden = true; tk.classList.remove('on'); }
      else focusWin(tid);
      return;
    }

    if (e.target.closest('#start')) { toggleStart(); return; }
    if (!e.target.closest('#startmenu')) closeStart();

    if (e.target.closest('#desktop') && !e.target.closest('.win')) {
      document.querySelectorAll('.icon.sel').forEach(function (i) { i.classList.remove('sel'); });
    }
  });

  document.addEventListener('dblclick', function (e) {
    var ic = e.target.closest('[data-open]');
    if (ic) openWin(ic.dataset.open);
  });

  /* ── start menu ────────────────────────────────────────────────────── */
  var menu = $('#startmenu'), startBtn = $('#start');
  $('#startitems').innerHTML =
    DESKTOP.map(function (id) {
      var a = byId[id];
      return '<button class="sitem" data-open="' + id + '">' + art(a.icon) + esc(a.title) + '</button>';
    }).join('') +
    '<div class="sdiv"></div>' +
    '<a class="sitem" href="' + esc(O.linkedin.href) + '" target="_blank" rel="noopener noreferrer">' +
      art('globe') + 'LinkedIn</a>' +
    '<button class="sitem" data-about="1">' + art('info') + 'About SKK 95</button>' +
    '<div class="sdiv"></div>' +
    '<button class="sitem" data-shutdown="1">' + art('power') + 'Shut Down…</button>';

  function toggleStart() { menu.hidden ? openStart() : closeStart(); }
  function openStart() { menu.hidden = false; startBtn.classList.add('on'); }
  function closeStart() { menu.hidden = true; startBtn.classList.remove('on'); }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-shutdown]')) {
      closeStart();
      dialog('power', 'Shut Down', 'It is now safe to close this tab.<br><br>' +
        'Or stay &mdash; there are ' + S.certifications.length + ' verified credentials in that folder.');
    }
    if (e.target.closest('[data-about]')) {
      closeStart();
      dialog('win', 'About SKK 95', '<b>' + esc(O.name) + '</b><br>' + esc(O.discipline) +
        '<br><br>Built as a desktop because a portfolio is really just a machine someone else gets to look through.');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeStart();
    $('#modal').hidden = true;
  });

  /* ── dialog ────────────────────────────────────────────────────────── */
  function dialog(icon, title, html) {
    var m = $('#modal');
    m.innerHTML =
      '<div class="dlg" role="alertdialog" aria-label="' + esc(title) + '">' +
        '<div class="titlebar"><span class="t">' + esc(title) + '</span>' +
        '<span class="tbtns"><button class="tbtn close" data-dlg="1" aria-label="Close">✕</button></span></div>' +
        '<div class="dlg-body">' + art(icon) + '<div>' + html + '</div></div>' +
        '<div class="dlg-actions"><button class="btn95" data-dlg="1">OK</button></div>' +
      '</div>';
    m.hidden = false;
    m.querySelector('.btn95').focus();
  }
  $('#modal').addEventListener('click', function (e) {
    if (e.target.closest('[data-dlg]') || e.target.id === 'modal') $('#modal').hidden = true;
  });

  /* ── clock ─────────────────────────────────────────────────────────── */
  var clock = $('#clock');
  function tick() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
  }
  tick();
  setInterval(tick, 15000);

  /* open on a working desktop rather than an empty one */
  openWin('about');
  if (window.innerWidth > 900) openWin('certs');
  focusWin('about');
})();
