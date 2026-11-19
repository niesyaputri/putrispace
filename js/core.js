/* Putri Space · core (state, i18n, router, AI, sync, speech) · Created by CreanovativeCo */
(function () {
  'use strict';
  const C = window.PS_CONTENT;
  const VERSION = '1.1.3';
  const KEY = 'putrispace.v1';
  const CONN_KEY = 'putrispace.conn';
  const PS = (window.PS = { VERSION, C, views: {}, acts: {}, inputs: {} });

  /* ---------- utils ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const addDays = (key, n) => { const d = new Date(key + 'T00:00:00'); d.setDate(d.getDate() + n); return dayKey(d); };
  const daysUntil = (key) => Math.round((new Date(key + 'T00:00:00') - new Date(dayKey() + 'T00:00:00')) / 864e5);
  const icon = (name, size) => `<svg viewBox="0 0 24 24" ${size ? `width="${size}" height="${size}"` : ''} aria-hidden="true">${C.I[name] || ''}</svg>`;
  const ic = (name, bg, cls = '') => `<span class="ic ${cls}" style="background:${bg}">${icon(name)}</span>`;
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  Object.assign(PS, { esc, uid, dayKey, addDays, daysUntil, icon, ic, shuffle, norm });

  /* ---------- state ---------- */
  const defaults = () => ({
    v: 1, lang: 'id', name: 'Putri', pinHash: null, onboarded: false,
    profile: JSON.parse(JSON.stringify(C.PROFILE)),
    deadlines: JSON.parse(JSON.stringify(C.DEADLINES)),
    ielts: JSON.parse(JSON.stringify(C.IELTS)), ieltsDate: '',
    cpe: { done: 2, need: 20, year: 2026 },
    mistakes: [], vocab: [], writings: [], speakings: [], practice: [], stories: [], journal: [],
    hrCards: [], hr: {}, hrQuiz: [], lastCard: null,
    activity: {}, usage: { month: '', usd: 0, calls: 0, input: 0, output: 0 },
    voice: { accent: 'en-GB', rate: 1 },
    updated: 0
  });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
  let conn = {};
  try { conn = JSON.parse(localStorage.getItem(CONN_KEY) || '{}'); } catch (e) { conn = {}; }
  PS.S = () => S;
  PS.conn = () => conn;

  let syncTimer = null;
  PS.save = function (opts = {}) {
    S.updated = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { PS.toast(PS.t('storageFull')); }
    if (!opts.noSync && conn.url && conn.token && conn.auto !== false) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => PS.push(true), 8000);
    }
  };
  PS.replaceState = function (obj) { S = Object.assign(defaults(), obj); PS.save({ noSync: true }); };
  PS.setConn = function (c) { conn = Object.assign(conn, c); localStorage.setItem(CONN_KEY, JSON.stringify(conn)); };
  PS.mark = function (kind) { const k = dayKey(); S.activity[k] = S.activity[k] || {}; S.activity[k][kind] = (S.activity[k][kind] || 0) + 1; };
  PS.streak = function () {
    let n = 0, k = dayKey();
    if (!S.activity[k]) k = addDays(k, -1);
    while (S.activity[k]) { n++; k = addDays(k, -1); }
    return n;
  };

  /* ---------- i18n ---------- */
  PS.t = function (key, vars) {
    const D = window.PS_I18N;
    let s = (D[S.lang] && D[S.lang][key]) ?? D.id[key] ?? key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };
  PS.L = (obj) => (obj && (obj[S.lang] || obj.id || obj.en)) || '';
  const t = PS.t;

  /* ---------- ui helpers ---------- */
  PS.toast = function (msg, ms = 2400) {
    const el = document.getElementById('toast');
    el.textContent = msg; el.hidden = false;
    clearTimeout(PS._tt); PS._tt = setTimeout(() => { el.hidden = true; }, ms);
  };
  PS.sheet = function (html) {
    const w = document.getElementById('sheet');
    if (!html) { w.hidden = true; w.innerHTML = ''; return; }
    w.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
    w.hidden = false;
    const f = w.querySelector('input,textarea'); if (f && !f.dataset.nofocus) setTimeout(() => f.focus(), 60);
  };
  document.getElementById('sheet').addEventListener('click', (e) => { if (e.target.id === 'sheet') PS.sheet(null); });
  PS.loading = (msg) => `<div class="loading"><span class="spinner"></span>${esc(msg || t('aiThinking'))}</div>`;
  PS.back = (href, title, right = '') => `<div class="top"><a class="iconbtn" href="${href}" aria-label="${esc(t('back'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></a><h1 class="h1 grow" style="font-size:22px">${title}</h1>${right}</div>`;
  PS.owl = (happy, size = 58) => `<span style="width:${size}px;height:${size}px;display:inline-block;flex-shrink:0">${happy ? C.OWL_HAPPY : C.OWL}</span>`;
  PS.fmtDate = function (key) {
    const d = new Date(key + 'T00:00:00');
    return d.toLocaleDateString(S.lang === 'en' ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  PS.download = function (name, text, type = 'application/json') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---------- card images (IndexedDB, stays on this phone, not synced) ---------- */
  let _db = null;
  const idb = () => _db || (_db = new Promise((res, rej) => {
    const r = indexedDB.open('putrispace-img', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('img');
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  PS.img = {
    put: async (map) => { const db = await idb(); const ids = Object.keys(map || {}); await new Promise((res, rej) => { const tx = db.transaction('img', 'readwrite'); ids.forEach((id) => tx.objectStore('img').put(map[id], id)); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); return ids.length; },
    get: async (id) => { try { const db = await idb(); return await new Promise((res) => { const q = db.transaction('img').objectStore('img').get(id); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); } catch (e) { return null; } },
    count: async () => { try { const db = await idb(); return await new Promise((res) => { const q = db.transaction('img').objectStore('img').count(); q.onsuccess = () => res(q.result); q.onerror = () => res(0); }); } catch (e) { return 0; } }
  };
  PS.importImages = async function (obj) {
    try { const n = await PS.img.put(obj.images); PS.toast(t('imagesImported', { n }), 3500); PS.sheet(null); PS.render(); }
    catch (e) { PS.toast(t('imagesFailed'), 4000); }
  };

  /* ---------- IELTS rounding ---------- */
  PS.ieltsRound = function (avg) { const f = Math.floor(avg), r = avg - f; return r < 0.25 ? f : r < 0.75 ? f + 0.5 : f + 1; };
  PS.overall = () => { const i = S.ielts; return PS.ieltsRound((i.L.score + i.R.score + i.W.score + i.S.score) / 4); };

  /* ---------- word diff (for corrections) ---------- */
  PS.diff = function (a, b) {
    const A = String(a).split(/\s+/).filter(Boolean), B = String(b).split(/\s+/).filter(Boolean);
    const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    const eq = (x, y) => norm(x) === norm(y);
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = eq(A[i], B[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    let i = 0, j = 0; const left = [], right = [];
    while (i < n && j < m) {
      if (eq(A[i], B[j])) { left.push(esc(A[i])); right.push(esc(B[j])); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { left.push('<del>' + esc(A[i]) + '</del>'); i++; }
      else { right.push('<b>' + esc(B[j]) + '</b>'); j++; }
    }
    while (i < n) left.push('<del>' + esc(A[i++]) + '</del>');
    while (j < m) right.push('<b>' + esc(B[j++]) + '</b>');
    return { wrong: left.join(' '), right: right.join(' ') };
  };

  /* ---------- backend ---------- */
  PS.call = async function (body, timeoutMs = 60000) {
    if (!conn.url || !conn.token) throw new Error(t('noBackend'));
    const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(conn.url, { method: 'POST', body: JSON.stringify(Object.assign({ token: conn.token }, body)), signal: ctrl.signal, redirect: 'follow' });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error === 'unauthorized' ? t('badToken') : data.error || 'Error');
      return data;
    } catch (e) {
      if (e.name === 'AbortError') throw new Error(t('timeout'));
      if (e instanceof TypeError) throw new Error(t('offline'));
      throw e;
    } finally { clearTimeout(tm); }
  };

  PS.ai = async function ({ system, prompt, max = 1200, feature = 'ai', json = true }) {
    const r = await PS.call({ action: 'ai', system, prompt, max_tokens: max, feature }, 90000);
    const month = dayKey().slice(0, 7);
    if (S.usage.month !== month) S.usage = { month, usd: 0, calls: 0, input: 0, output: 0 };
    const u = r.usage || {};
    S.usage.calls++; S.usage.input += u.input || 0; S.usage.output += u.output || 0;
    S.usage.usd += (u.input || 0) * 0.10 / 1e6 + (u.output || 0) * 0.50 / 1e6;
    PS.save();
    if (!json) return r.text;
    return PS.parseJSON(r.text, r.stop);
  };
  // Escapes raw line breaks/tabs inside JSON strings and drops trailing commas (common in long AI replies)
  const repairJSON = function (s) {
    let out = '', inStr = false, esc = false;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (inStr) {
        if (esc) { out += c; esc = false; continue; }
        if (c === '\\') { out += c; esc = true; continue; }
        if (c === '"') { inStr = false; out += c; continue; }
        if (c === '\n') { out += '\\n'; continue; }
        if (c === '\r') continue;
        if (c === '\t') { out += '\\t'; continue; }
        out += c;
      } else { if (c === '"') inStr = true; out += c; }
    }
    return out.replace(/,\s*([}\]])/g, '$1');
  };
  PS.parseJSON = function (text, stop) {
    let s = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const a = s.indexOf('{'), b = s.lastIndexOf('}');
    const tries = [s];
    if (a >= 0 && b > a) tries.push(s.slice(a, b + 1));
    for (const x of tries) {
      try { return JSON.parse(x); } catch (e) { /* next */ }
      try { return JSON.parse(repairJSON(x)); } catch (e) { /* next */ }
    }
    throw new Error(stop === 'max_tokens' ? t('aiTooLong') : t('aiBadFormat'));
  };
  PS.langName = () => (S.lang === 'en' ? 'English' : 'Bahasa Indonesia');

  PS.push = async function (silent) {
    try {
      const data = JSON.stringify(S);
      await PS.call({ action: 'save', key: 'state', data });
      PS.setConn({ lastSync: Date.now() });
      if (!silent) PS.toast(t('syncPushed'));
    } catch (e) { if (!silent) PS.toast(e.message); }
  };
  PS.pull = async function () {
    const r = await PS.call({ action: 'load', key: 'state' });
    if (!r.data) return null;
    return JSON.parse(r.data);
  };

  /* ---------- speech ---------- */
  const synth = window.speechSynthesis;
  PS.voices = () => (synth ? synth.getVoices() : []);
  if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', () => {});
  PS.pickVoice = function (accent, gender) {
    const vs = PS.voices().filter((v) => v.lang && v.lang.replace('_', '-').startsWith('en'));
    let pool = vs.filter((v) => v.lang.replace('_', '-') === accent);
    if (!pool.length) pool = vs;
    if (gender) {
      const fem = /female|samantha|karen|serena|moira|tessa|kate|stephanie|catherine|martha|fiona|victoria|zira|susan|libby|sonia|natasha/i;
      const g = pool.filter((v) => (gender === 'f') === fem.test(v.name));
      if (g.length) pool = g;
    }
    const enhanced = pool.find((v) => /premium|enhanced|natural/i.test(v.name));
    return enhanced || pool[0] || null;
  };
  PS.speak = function (text, opts = {}) {
    if (!synth) { PS.toast(t('noTTS')); return null; }
    if (!opts.queue) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = PS.pickVoice(opts.accent || S.voice.accent, opts.gender);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = opts.accent || S.voice.accent;
    u.rate = opts.rate || S.voice.rate || 1;
    if (opts.onend) u.onend = opts.onend;
    if (opts.onstart) u.onstart = opts.onstart;
    synth.speak(u);
    return u;
  };
  PS.stopSpeak = () => synth && synth.cancel();

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  PS.canDictate = !!SR;
  PS.dictate = function (textarea, btn) {
    if (!SR) { PS.toast(t('useKeyboardMic'), 3500); textarea.focus(); return; }
    if (PS._rec) { PS._rec.stop(); return; }
    const rec = new SR(); PS._rec = rec;
    rec.lang = S.voice.accent || 'en-GB'; rec.continuous = true; rec.interimResults = false;
    const base = textarea.value ? textarea.value.trimEnd() + ' ' : '';
    let finalText = '';
    rec.onresult = (e) => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) finalText += e.results[i][0].transcript + ' '; textarea.value = base + finalText; textarea.dispatchEvent(new Event('input', { bubbles: true })); };
    rec.onend = () => { PS._rec = null; if (btn) btn.classList.remove('on'); btn && (btn.style.background = ''); };
    rec.onerror = () => { PS._rec = null; PS.toast(t('useKeyboardMic'), 3500); };
    rec.start(); if (btn) btn.style.background = '#F7A9BC';
    PS.toast(t('listeningNow'));
  };

  /* ---------- PIN ---------- */
  PS.hash = async function (pin) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('putrispace:' + pin));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  };
  let unlocked = false;
  PS.isLocked = () => !!S.pinHash && !unlocked;
  PS.unlock = () => { unlocked = true; };
  PS.lockNow = () => { unlocked = false; PS.render(); };
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else if (S.pinHash && hiddenAt && Date.now() - hiddenAt > 5 * 60 * 1000) { unlocked = false; PS.render(); }
  });

  /* ---------- router & render ---------- */
  PS.route = () => (location.hash.replace(/^#\/?/, '') || 'home').split('/');
  PS.go = (h) => { if (location.hash === '#' + h) PS.render(); else location.hash = h; };
  const NAV = [
    { r: 'profile', icon: 'profile', key: 'navProfile' },
    { r: 'english', icon: 'english', key: 'navEnglish' },
    { r: 'home', icon: 'home', key: 'navHome', home: true },
    { r: 'hr', icon: 'hr', key: 'navHR' },
    { r: 'more', icon: 'more', key: 'navMore' }
  ];
  const SECTION = { home: 'home', profile: 'profile', cv: 'profile', deadlines: 'home', english: 'english', ielts: 'english', check: 'english', mistakes: 'english', review: 'english', tenses: 'english', tense: 'english', stories: 'english', story: 'english', vocab: 'english', journal: 'english', hr: 'hr', more: 'more' };
  PS.renderNav = function (sec) {
    const nav = document.getElementById('nav');
    nav.innerHTML = NAV.map((n) => {
      const on = n.r === sec;
      if (n.home) return `<a href="#home" class="home ${on ? 'on' : ''}" ${on ? 'aria-current="page"' : ''}><span class="disc">${icon('home', 28)}</span>${esc(t(n.key))}</a>`;
      return `<a href="#${n.r}" class="${on ? 'on' : ''}" ${on ? 'aria-current="page"' : ''}>${icon(n.icon)}${esc(t(n.key))}<span class="dot"></span></a>`;
    }).join('');
  };
  PS.render = function () {
    document.documentElement.lang = S.lang;
    const app = document.getElementById('app'), nav = document.getElementById('nav');
    PS.sheet(null);
    if (!S.onboarded) { nav.hidden = true; document.body.classList.add('nonav'); app.innerHTML = PS.views.onboarding(); PS.after && PS.after(); return; }
    if (PS.isLocked()) { nav.hidden = true; document.body.classList.add('nonav'); app.innerHTML = PS.views.lock(); return; }
    const parts = PS.route();
    const view = PS.views[parts[0]] || PS.views.home;
    const sec = SECTION[parts[0]] || 'home';
    const noNav = parts[0] === 'cv';
    nav.hidden = noNav; document.body.classList.toggle('nonav', noNav);
    if (!noNav) PS.renderNav(sec);
    app.innerHTML = view(parts.slice(1));
    window.scrollTo(0, 0);
    const hook = PS.views[parts[0] + '_after']; if (hook) hook(parts.slice(1));
  };
  window.addEventListener('hashchange', () => { PS.stopSpeak(); PS.render(); });

  /* ---------- event delegation ---------- */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const fn = PS.acts[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-in]');
    if (el && PS.inputs[el.dataset.in]) PS.inputs[el.dataset.in](el, e);
  });
  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-change]');
    if (el && PS.acts[el.dataset.change]) PS.acts[el.dataset.change](el, e);
  });

  /* ---------- boot ---------- */
  PS.boot = function () {
    PS.render();
    if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  };
})();
