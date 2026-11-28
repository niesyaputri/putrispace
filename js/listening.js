/* Putri Space · Listening Library (IELTS Academic, built-in content, no AI needed) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, ic, icon, dayKey } = PS;
  const t = PS.t, S = () => PS.S();
  const D = () => window.PS_LISTEN || { groups: [], lessons: [], tests: [], top30: [], official: [] };
  const keep = () => { const y = window.scrollY; PS.render(); window.scrollTo(0, y); };
  const IMG = (n) => 'img/listen/' + n + '.webp';
  const LS = () => { const s = S(); s.listen = s.listen || {}; const l = s.listen; l.done = l.done || {}; l.log = l.log || []; l.notes = l.notes || {}; l.stars = l.stars || []; l.real = l.real || []; return l; };
  const find = (id) => D().lessons.find((x) => x.id === id) || D().tests.find((x) => x.id === id);
  const grp = (id) => D().groups.find((g) => g.id === id) || D().groups[0];
  const BLUE = { ink: '#2B5C99', bg: '#E0EEFF', bar: '#6FA4EE' };
  const reasonName = (r) => (S().lang === 'en' ? r.en : r.id_);
  const toBand = (n) => (n >= 39 ? 9 : n >= 37 ? 8.5 : n >= 35 ? 8 : n >= 32 ? 7.5 : n >= 30 ? 7 : n >= 26 ? 6.5 : n >= 23 ? 6 : n >= 18 ? 5.5 : n >= 16 ? 5 : 4.5);
  PS.listenProgress = () => { const all = D().lessons.concat(D().tests), d = LS().done; return { total: all.length, done: all.filter((x) => d[x.id]).length }; };

  /* ---------- audio (speech synthesis, one voice per speaker) ---------- */
  const synth = window.speechSynthesis;
  // One clear voice per speaker: same gender → a different good voice (other accent if needed), never pitch tricks
  function voiceFor(spec) {
    const g = (spec || 'f')[0], n = /2$/.test(spec || '') ? 1 : 0;
    const acc = S().voice.accent || 'en-GB', vs = PS.enVoices().sort((x, y) => PS.voiceRank(y) - PS.voiceRank(x));
    const same = (v) => v.lang.replace('_', '-') === acc;
    const byG = vs.filter((v) => PS.voiceGender(v) === g);
    // distinct names only (a voice can be listed twice), home accent first
    const seen = {}, list = byG.filter(same).concat(byG.filter((v) => !same(v))).filter((v) => { const k = v.name.replace(/\s*\(.*\)/, ''); if (seen[k]) return false; seen[k] = 1; return true; });
    const voice = list[n] || list[0] || PS.pickVoice(acc, g) || vs[0] || null;
    return { voice, pitch: 1 };
  }
  const au = { token: 0, rate: 1, plays: {}, playing: null, line: -1 };
  function stop() { au.token++; au.playing = null; au.line = -1; if (synth) synth.cancel(); paintPlayer(); }
  function play(key, lines, voices, onDone) {
    if (!synth) { PS.toast(t('noTTS')); return; }
    stop(); const tok = au.token; au.playing = key; au.plays[key] = (au.plays[key] || 0) + 1;
    const spec = {}; let gi = 0;
    lines.forEach(([sp]) => { if (!(sp in spec)) spec[sp] = (voices && voices[sp]) || (gi++ % 2 ? 'm' : 'f'); });
    let i = 0;
    const next = () => {
      if (tok !== au.token) return;
      if (i >= lines.length) { au.playing = null; au.line = -1; paintPlayer(); if (onDone) onDone(); return; }
      const [sp, text, say] = lines[i]; au.line = i++; paintPlayer();
      const u = new SpeechSynthesisUtterance(String(say || text).replace(/[—–]/g, ', ').replace(/…/g, '... '));
      const v = voiceFor(spec[sp]); if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; } else u.lang = S().voice.accent || 'en-GB';
      u.pitch = v.pitch; u.rate = au.rate * (S().voice.rate || 1);
      u.onend = () => setTimeout(next, 350); u.onerror = () => setTimeout(next, 50);
      synth.speak(u);
    };
    next();
  }
  function paintPlayer() {
    document.querySelectorAll('[data-player]').forEach((el) => {
      const k = el.dataset.player, on = au.playing === k, n = au.plays[k] || 0, total = +el.dataset.n || 0;
      const b = el.querySelector('.pl-btn'); if (b) b.innerHTML = on ? '■ ' + esc(t('stopAudio')) : '▶ ' + esc(n ? t('playAgain') : t('playAudio'));
      const s = el.querySelector('.pl-stat'); if (s) s.textContent = on ? t('lineOf', { a: au.line + 1, b: total }) : n ? t('playedN', { n }) : '';
      const bar = el.querySelector('.pl-bar i'); if (bar) bar.style.width = (on && total ? Math.round(((au.line + 1) / total) * 100) : n ? 100 : 0) + '%';
    });
  }
  const player = (key, lines, label) => `<div class="card" data-player="${esc(key)}" data-n="${lines.length}" style="background:#E0EEFF;border:none;gap:8px">
      <div class="row">${icon('listening', 30)}<span class="stack grow" style="gap:0"><b style="color:#1F4778">${esc(label || t('playAudio'))}</b><span class="small pl-stat" style="color:#1F4778"></span></span></div>
      <div class="bar pl-bar" style="background:#fff;height:6px"><i style="width:0%;background:#6FA4EE"></i></div>
      <div class="row"><button class="btn pl-btn" style="flex:1;background:#2B5C99" data-act="lsPlay" data-key="${esc(key)}">▶ ${esc(t('playAudio'))}</button>
      <div class="seg">${[0.85, 1, 1.1].map((r) => `<button class="${au.rate === r ? 'on' : ''}" data-act="lsRate" data-v="${r}">${r}×</button>`).join('')}</div></div></div>`;
  const transcript = (lines, open) => `<details class="card" ${open ? 'open' : ''}><summary style="font-weight:800;cursor:pointer">📄 ${esc(t('showTranscript'))}</summary>${lines.map(([sp, tx]) => `<p style="margin:6px 0;font-size:14.5px;line-height:1.55">${sp && !/^\d+$/.test(sp) ? `<b>${esc(sp)}:</b> ` : sp ? `<b>${esc(sp)}.</b> ` : ''}${esc(tx)}</p>`).join('')}</details>`;
  const linesOf = (key) => {
    const [id, part] = key.split(':'); const x = find(id); if (!x) return null;
    if (part === 'ex') return { lines: x.ex.script, voices: x.ex.voices };
    if (part === 'pr') return { lines: x.practice.script, voices: x.practice.voices };
    if (part && part.startsWith('ln')) { const n = +part.slice(2); return { lines: [x.practice.script[n]], voices: x.practice.voices }; }
    return { lines: x.script, voices: x.voices };
  };
  A.lsPlay = (el) => { const k = el.dataset.key; if (au.playing === k) { stop(); return; } const L = linesOf(k); if (L) play(k, L.lines, L.voices); };
  A.lsRate = (el) => { au.rate = +el.dataset.v; el.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === el)); };
  A.lsLine = (el) => { const k = el.dataset.key; const L = linesOf(k); if (L) play(k, L.lines, L.voices); };
  window.addEventListener('hashchange', () => { if (au.playing) stop(); });

  /* ---------- images ---------- */
  const pic = (name, alt, cls = '') => `<button class="ls-pic ${cls}" data-act="lsZoom" data-src="${esc(IMG(name))}" aria-label="${esc(t('enlarge'))}" style="border:none;padding:0;background:none;width:100%;cursor:zoom-in"><img src="${esc(IMG(name))}" alt="${esc(alt || '')}" loading="lazy" style="width:100%;display:block;border-radius:14px;border:1px solid #ECE7FA;background:#fff" onerror="this.closest('.ls-pic').style.display='none'"></button>`;
  A.lsZoom = (el) => PS.sheet(`<div style="overflow:auto;-webkit-overflow-scrolling:touch;max-height:75vh"><img src="${esc(el.dataset.src)}" alt="" style="width:190%;max-width:none;display:block"></div><span class="small">${esc(t('scrollToSee'))}</span><button class="btn soft" data-act="closeSheet">${esc(t('close'))}</button>`);
  A.closeSheet = A.closeSheet || (() => PS.sheet(null));

  /* ================= hub ================= */
  V.listen = function (p) {
    if (p[0] === 'top30') return top30View();
    if (p[0] === 'official') return officialView();
    if (p[0]) { const x = find(p[0]); if (x && x.qs) return testView(x); if (x) return lessonView(x, p[1] || 'learn'); }
    const L = LS(), pr = PS.listenProgress();
    const counts = {}; L.log.forEach((e) => { counts[e.reason] = (counts[e.reason] || 0) + 1; });
    const maxC = Math.max(1, ...Object.values(counts));
    const tile = (x, g) => { const d = L.done[x.id]; return `<a class="tile h" href="#listen/${x.id}"><span class="ic sm" style="background:${d ? '#DDF4EA' : g.bg};padding:6px"><img src="${esc(IMG((x.icon || x.id + '-icon')))}" alt="" style="width:100%;height:100%;object-fit:contain" onerror="this.replaceWith(document.createTextNode('${esc(x.code)}'))"></span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(x.code)} · ${esc(x.title)}</span><span class="s">${esc(x.sub || x.part + ' · ' + x.instr)}</span></span>${d ? `<span class="pill" style="background:${d.score === d.total ? '#DDF4EA' : g.bg};color:${d.score === d.total ? '#1F6E55' : g.ink}">${d.best != null ? d.best : d.score}/${d.total}</span>` : ''}</a>`; };
    const head = (g) => `<div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:${g.ink};color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">${g.id}</span><h2 class="h2" style="color:${g.ink};font-size:17px">${esc(PS.L(g.name))}</h2></div>`;
    return `<div class="page">${PS.back('#english', esc(t('libListening')), `<span class="pill" style="background:#E0EEFF;color:#2B5C99">${pr.done}/${pr.total}</span>`)}
      <section class="hero" style="background:#6FA4EE"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">IELTS Academic · 30 min · 40 Qs · 4 parts</span><span class="big" style="font-size:18px">${esc(t('listenHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('listenHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      <section class="card"><div class="between"><h2 class="h2" style="font-size:16px">${icon('mistakes', 22)}${esc(t('errorPattern'))}</h2><span class="small">${L.log.length}</span></div>
        ${L.log.length ? D().reasons.map((r) => `<div class="stack" style="gap:3px"><div class="between"><span style="font-size:13px;font-weight:700">${esc(reasonName(r))}</span><span class="small">${counts[r.id] || 0}</span></div><div class="bar" style="height:7px;background:#F3F0FF"><i style="width:${Math.round(((counts[r.id] || 0) / maxC) * 100)}%;background:#F7A9BC"></i></div></div>`).join('') + `<span class="small">${esc(t('errorPatternHint'))}</span>` : `<span class="small">${esc(t('noErrors'))}</span>`}</section>
      ${D().groups.map((g) => { const items = g.id === 'A' ? D().tests : D().lessons.filter((x) => x.group === g.id); return head(g) + `<section class="stack" style="gap:8px">${items.map((x) => tile(x, g)).join('')}</section>`; }).join('')}
      <div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:#1F6E55;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">★</span><h2 class="h2" style="color:#1F6E55;font-size:17px">${esc(t('finalWeek'))}</h2></div>
      <section class="grid2"><a class="tile" href="#listen/top30" style="background:#DDF4EA;border:none">${ic('star', '#fff', 'sm')}<span class="t">${esc(t('top30T'))}</span><span class="s" style="color:#1F6E55">${esc(t('top30Sub'))}</span></a>
        <a class="tile" href="#listen/official" style="background:#FFF4D6;border:none">${ic('clock', '#fff', 'sm')}<span class="t">${esc(t('officialT'))}</span><span class="s" style="color:#6B4E00">${esc(t('officialSub'))}</span></a></section>
      <a class="tile h" href="#ielts/L">${ic('spark', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('aiListeningMore'))}</span><span class="s">${esc(t('aiListeningMoreSub'))}</span></span></a>
      <span class="small center">${esc(t('fromStudyBook'))}</span></div>`;
  };

  /* ================= lesson ================= */
  const TABS = [['learn', 'tabLearn'], ['ex', 'tabExample'], ['pr', 'tabPractice'], ['words', 'tabWords']];
  const exStep = {};
  function lessonView(x, tab) {
    const g = grp(x.group), L = LS(), i = D().lessons.indexOf(x), all = D().lessons;
    const sec = (color, label, body) => `<div><div class="sec-t" style="color:${color}">${label}</div>${body}</div>`;
    const list = (arr, mark) => `<ul style="margin:0;padding-left:${mark ? 0 : 20}px;list-style:${mark ? 'none' : 'disc'}">${arr.map((s) => `<li style="margin:3px 0">${mark ? mark + ' ' : ''}${esc(s)}</li>`).join('')}</ul>`;
    let body = '';
    if (tab === 'learn') {
      PS.mark('review');
      body = `${pic(x.id + '-idea', x.title)}
        <section class="card" style="background:${g.bg};border:none"><span class="small" style="color:${g.ink}">💡 ${esc(t('ideaLine'))}</span><b style="font-size:15px;line-height:1.45;color:#2E2A45">${esc(x.idea.en)}</b><span style="font-size:13.5px;color:#4F4A68">${esc(x.idea.id)}</span><button class="btn soft sm" style="align-self:flex-start" data-act="say" data-text="${esc(x.idea.en)}">${icon('speaker', 18)}${esc(t('listen'))}</button></section>
        <article class="read-mode stack" style="gap:16px;padding:4px 2px">
          ${sec(g.ink, '🪜 ' + esc(t('stepsT')), `<ol style="margin:0;padding-left:22px">${x.steps.map((s) => `<li style="margin:4px 0">${esc(s)}</li>`).join('')}</ol>`)}
          ${sec('#6B4E00', '🧰 ' + esc(t('tipsT')), list(x.tips, '✓'))}
        </article>
        <section class="card"><h2 class="h2" style="font-size:16px">⚠️ ${esc(t('mistakesT'))}</h2>${x.mistakes.map(([w, r]) => `<div class="stack" style="gap:6px"><div class="wrong"><span>✕</span><span>${esc(w)}</span></div><div class="right"><span>✓</span><span>${esc(r)}</span></div></div>`).join('')}</section>
        <section class="card"><h2 class="h2" style="font-size:16px">📈 Band 6 → Band 7+ ${esc(x.band.label)}</h2>
          <div class="drill" style="background:#FCE4EA;color:#6E2238"><b style="font-size:12px">BAND 6</b><span style="font-size:14px">${esc(x.band.b6)}</span></div>
          <div class="drill" style="background:#DDF4EA;color:#164F3D"><b style="font-size:12px">BAND 7+</b><span style="font-size:14px">${esc(x.band.b7)}</span></div>
          <span class="small" style="font-weight:800">${esc(t('whyHigher'))}</span>${list(x.band.why)}</section>
        <a class="btn" href="#listen/${x.id}/ex">${esc(t('tabExample'))} ›</a>`;
    } else if (tab === 'ex') {
      const e = x.ex, n = exStep[x.id] || 0;
      body = `<section class="card"><span class="small" style="color:${g.ink}">${esc(t('workedEx'))}</span>${pic(x.id + '-ex', e.q)}</section>
        ${e.script ? player(x.id + ':ex', e.script, t('exAudio')) + transcript(e.script, false) : ''}
        <section class="card"><h2 class="h2" style="font-size:16px">🧭 ${esc(t('walkT'))}</h2>
          ${e.walk.slice(0, n).map(([s, tip], k) => `<div class="stack" style="gap:6px"><b style="font-size:14.5px">${k + 1}. ${esc(s)}</b><div class="drill" style="padding:9px 12px"><b style="font-size:11px;letter-spacing:.05em">TIP IN ACTION</b><span style="font-size:14px">${esc(tip)}</span></div></div>`).join('')}
          ${n < e.walk.length ? `<button class="btn soft" data-act="lsStep" data-id="${x.id}">${esc(n ? t('nextStep') : t('startWalk'))} (${n + 1}/${e.walk.length})</button>` : `<div class="right"><span>✓</span><b>${esc(e.answer)}</b></div><button class="btn ghost sm" data-act="lsStepReset" data-id="${x.id}">${esc(t('again'))}</button>`}</section>
        <a class="btn" href="#listen/${x.id}/pr">${esc(t('tabPractice'))} ›</a>`;
    } else if (tab === 'pr') {
      body = practiceBlock(x, x.practice, x.id + ':pr');
    } else {
      body = `<section class="card"><h2 class="h2" style="font-size:16px">🔤 ${esc(t('vocabT'))}</h2>${x.vocab.map(([w, m]) => `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><span class="stack grow" style="gap:1px"><b style="font-size:14.5px">${esc(w)}</b><span class="small">${esc(m)}</span></span><button class="iconbtn" style="width:34px;height:34px;border:none" data-act="say" data-text="${esc(w.replace(/"/g, ''))}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button></div>`).join('')}</section>
        <section class="card" style="background:#DDF4EA;border:none"><h2 class="h2" style="font-size:16px;color:#1F6E55">✅ ${esc(t('quickT'))}</h2>${list(x.quick, '✓')}</section>
        <section class="card" style="background:#FCE4EA;border:none"><h2 class="h2" style="font-size:16px;color:#8E3049">🚫 ${esc(t('killersT'))}</h2>${list(x.killers, '✕')}</section>
        <section class="card" style="border:1.5px dashed #B3A8EC"><label class="lbl" for="lsNote">${icon('journal', 18)} ${esc(t('misheardT'))}</label><textarea id="lsNote" class="in" rows="3" data-in="lsNote" data-id="${x.id}" data-nofocus="1" placeholder="${esc(t('misheardPh'))}">${esc(L.notes[x.id] || '')}</textarea></section>`;
    }
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#listen', `<span style="font-size:12px;color:${g.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(x.code)} · ${esc(t('bookPage', { n: x.page }))}</span>${esc(x.title)}`)}
      <div class="seg" style="align-self:stretch">${TABS.map(([k, lab]) => `<a class="${tab === k ? 'on' : ''}" href="#listen/${x.id}/${k}" style="flex:1;text-align:center;min-height:36px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:12.5px;font-weight:800;text-decoration:none;color:${tab === k ? 'var(--pri-d)' : 'var(--muted2)'};background:${tab === k ? '#fff' : 'transparent'}">${esc(t(lab))}</a>`).join('')}</div>
      ${body}
      <div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#listen/${i > 0 ? all[i - 1].id : ''}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${all.length}</span><a class="btn ghost sm" style="flex:1;${i < all.length - 1 ? '' : 'visibility:hidden'}" href="#listen/${i < all.length - 1 ? all[i + 1].id : 'top30'}">${esc(t('next'))} ›</a></div></div>`;
  }
  A.lsStep = (el) => { exStep[el.dataset.id] = (exStep[el.dataset.id] || 0) + 1; keep(); };
  A.lsStepReset = (el) => { exStep[el.dataset.id] = 0; keep(); };
  IN.lsNote = (el) => { LS().notes[el.dataset.id] = el.value; clearTimeout(PS._lnt); PS._lnt = setTimeout(() => PS.save(), 800); };

  /* ================= practice / tests ================= */
  const pst = {}; // per practice key: { ans:{}, done, marks, reveal }
  const qState = (key) => (pst[key] = pst[key] || { ans: {} });
  const cleanAns = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/£/g, '').replace(/,(?=\d{3}\b)/g, '').replace(/(\d):(\d)/g, '$1.$2').replace(/[^a-z0-9.' ]+/g, ' ').replace(/\.(?!\d)/g, ' ').replace(/\s+/g, ' ').trim();
  const isRight = (q, v) => {
    if (q.o || q.letters) return String(v || '').toUpperCase() === q.a;
    const a = cleanAns(v); if (!a) return false;
    return q.a.some((x) => { const b = cleanAns(x); return a === b || a.replace(/\s+/g, '') === b.replace(/\s+/g, ''); });
  };
  const keyOf = (q) => q.key || (q.o ? q.a + ' — ' + q.o[q.a.charCodeAt(0) - 65] : q.letters ? q.a : q.a[0]);
  function practiceBlock(owner, pr, key) {
    const st = qState(key), done = !!st.done;
    const qs = pr.qs;
    const qHtml = qs.map((q, k) => {
      const v = st.ans[k], ok = done && !q.open && st.marks[k];
      let input;
      if (q.open) input = `<input class="in" data-in="lsAns" data-key="${esc(key)}" data-k="${k}" value="${esc(v || '')}" placeholder="${esc(t('predictPh'))}" ${done ? 'disabled' : ''}>`;
      else if (q.o) input = `<div class="stack" style="gap:6px">${q.o.map((o, j) => { const L = String.fromCharCode(65 + j); return `<button class="opt ${v === L ? 'sel' : ''} ${done ? (L === q.a ? 'ok' : v === L ? 'no' : '') : ''}" data-act="lsPick" data-key="${esc(key)}" data-k="${k}" data-v="${L}" ${done ? 'disabled' : ''}><b>${L}</b> ${esc(o)}</button>`; }).join('')}</div>`;
      else if (q.letters) input = `<div class="row wrap" style="gap:6px">${q.letters.split('').map((L) => `<button class="opt ${v === L ? 'sel' : ''} ${done ? (L === q.a ? 'ok' : v === L ? 'no' : '') : ''}" style="min-width:46px;text-align:center;font-weight:800" data-act="lsPick" data-key="${esc(key)}" data-k="${k}" data-v="${L}" ${done ? 'disabled' : ''}>${L}</button>`).join('')}</div>`;
      else input = `<div class="row">${pr.dictation ? `<button class="iconbtn" style="width:40px;height:40px;border:none;background:#E0EEFF" data-act="lsLine" data-key="${esc(owner.id + ':ln' + q.line)}" aria-label="${esc(t('listen'))}">${icon('speaker', 20)}</button>` : ''}<input class="in" data-in="lsAns" data-key="${esc(key)}" data-k="${k}" value="${esc(v || '')}" placeholder="${esc(t('typeAnswer'))}" autocapitalize="off" autocorrect="off" spellcheck="false" ${done ? 'disabled' : ''}></div>`;
      let res = '';
      if (done && q.open) res = `<div class="drill" style="background:#FFF4D6"><b style="font-size:12px">${esc(t('sampleAns'))}</b><span style="font-size:14px">${esc(q.sample)}</span></div>`;
      else if (done) {
        const log = (st.reasons || {})[k];
        res = ok ? `<span class="small" style="color:#1F6E55;font-weight:800">✓ ${esc(t('correctAns'))}</span>`
          : `<span class="small" style="color:#8E3049;font-weight:800">✕ ${esc(t('answerIs'))}: ${esc(keyOf(q))}</span>
            <div class="stack" style="gap:6px;background:#FAF7FF;border-radius:12px;padding:8px 10px"><span class="small">${esc(t('whyWrong'))}</span><div class="row wrap" style="gap:6px">${D().reasons.map((r) => `<button class="chip ${log === r.id ? 'on' : ''}" style="min-height:32px;font-size:12px;padding:0 10px" data-act="lsReason" data-key="${esc(key)}" data-k="${k}" data-r="${r.id}">${esc(reasonName(r))}</button>`).join('')}</div></div>`;
      }
      return `<div class="q"><b style="font-size:14.5px">${k + 1}. ${esc(q.q)}</b>${q.hint && (st.hints || q.open) ? `<span class="pill" style="background:#FFF4D6;color:#6B4E00;align-self:flex-start">💡 ${esc(q.hint)}</span>` : ''}${input}${res}</div>`;
    }).join('');
    const score = done ? st.marks.filter(Boolean).length : 0, gradable = qs.filter((q) => !q.open).length;
    const hasAudio = !!pr.script && !pr.dictation;
    return `<section class="card"><span class="small" style="color:#2B5C99">${esc(owner.part ? owner.part + ' · ' : '')}${esc(t('practiceT'))}</span><b style="font-size:14.5px;line-height:1.45">${esc(pr.instr)}</b>
        ${pr.img ? pic(pr.img, pr.imgAlt) : ''}
        ${pr.box ? `<div class="row wrap" style="gap:6px">${pr.box.map((b) => `<span class="pill" style="background:#EEEAFE;color:#4B3DB0;font-size:12px">${esc(b)}</span>`).join('')}</div>` : ''}
        ${hasAudio ? `<span class="small">🎧 ${esc(t('listenOnceHint'))}</span>` : ''}${pr.dictation ? `<span class="small">🎧 ${esc(t('dictationHint'))}</span>` : ''}${qs[0].open ? `<span class="small">✍️ ${esc(t('predictHint'))}</span>` : ''}</section>
      ${pr.script ? player(key, pr.script, pr.dictation ? t('playAll') : t('playAudio')) : ''}
      <section class="card"><div class="between"><h2 class="h2" style="font-size:16px">${icon('quiz', 22)}${esc(t('questions'))}</h2>${qs.some((q) => q.hint && !q.open) ? `<button class="chip ${st.hints ? 'on' : ''}" style="min-height:32px;font-size:12px" data-act="lsHints" data-key="${esc(key)}">💡 ${esc(t('hintsBtn'))}</button>` : ''}</div>${qHtml}
        ${done ? (gradable ? `<div class="drill" style="background:#E0EEFF;color:#1F4778"><b>${esc(t('yourScore'))}: ${score}/${gradable}</b>${score < gradable ? `<span class="small">${esc(t('tagReasons'))}</span>` : `<span class="small">${esc(t('allRightLs'))}</span>`}</div>` : '')
          + `<div class="row"><button class="btn soft sm" style="flex:1" data-act="lsRetry" data-key="${esc(key)}">${esc(t('again'))}</button>${gradable && score < gradable ? `<button class="btn sm" style="flex:1" data-act="lsAI" data-key="${esc(key)}">${icon('spark', 18)}${esc(t('aiExplain'))}</button>` : ''}</div><div id="lsAIout"></div>`
          : `<button class="btn" data-act="lsCheck" data-key="${esc(key)}">${esc(qs[0].open ? t('compareSample') : t('checkAnswers'))}</button>`}</section>
      ${pr.script ? (done ? transcript(pr.script, true) : `<span class="small center">${esc(t('transcriptAfter'))}</span>`) : ''}`;
  }
  function testView(x) {
    const d = LS().done[x.id];
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#listen', `<span style="font-size:12px;color:#8E3049;display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(x.code)} · ${esc(x.part)} · ${esc(t('bookPage', { n: x.page }))}</span>${esc(x.title)}`, d ? `<span class="pill" style="background:#FCE4EA;color:#8E3049">${esc(t('best'))} ${d.best}/${d.total}</span>` : '')}
      <section class="card" style="background:#FCE4EA;border:none"><span style="font-size:13.5px;color:#6E2238">${esc(PS.L(D().howTo))}</span></section>
      ${practiceBlock(x, x, x.id)}
      <section class="card" style="border:1.5px dashed #B3A8EC"><label class="lbl" for="lsNote">${icon('journal', 18)} ${esc(t('misheardT'))}</label><textarea id="lsNote" class="in" rows="3" data-in="lsNote" data-id="${x.id}" data-nofocus="1" placeholder="${esc(t('misheardPh'))}">${esc(LS().notes[x.id] || '')}</textarea></section></div>`;
  }
  A.lsHints = (el) => { const st = qState(el.dataset.key); st.hints = !st.hints; keep(); };
  IN.lsAns = (el) => { qState(el.dataset.key).ans[+el.dataset.k] = el.value; };
  A.lsPick = (el) => { qState(el.dataset.key).ans[+el.dataset.k] = el.dataset.v; el.parentElement.querySelectorAll('.opt').forEach((b) => b.classList.toggle('sel', b === el)); };
  const ownerOf = (key) => { const [id, part] = key.split(':'); const x = find(id); return { x, pr: part === 'pr' ? x.practice : x }; };
  A.lsCheck = (el) => {
    const key = el.dataset.key, st = qState(key), { x, pr } = ownerOf(key);
    if (pr.qs.some((q, k) => !q.open && !String(st.ans[k] || '').trim())) { if (!confirm(t('blankConfirm'))) return; }
    stop();
    st.marks = pr.qs.map((q, k) => (q.open ? null : isRight(q, st.ans[k])));
    st.done = true; st.reasons = {};
    const gradable = pr.qs.filter((q) => !q.open).length, score = st.marks.filter(Boolean).length;
    const L = LS(), prev = L.done[x.id];
    L.done[x.id] = { score, total: gradable || pr.qs.length, best: Math.max(score, prev ? prev.best || 0 : 0), date: dayKey(), n: (prev ? prev.n || 0 : 0) + 1 };
    if (!gradable) L.done[x.id] = { score: pr.qs.length, total: pr.qs.length, best: pr.qs.length, date: dayKey(), n: 1 };
    if (x.qs && gradable) S().practice.unshift({ id: PS.uid(), skill: 'L', date: dayKey(), title: 'Library · ' + x.code + ' ' + x.title, score, total: gradable, band: toBand(Math.round((score / gradable) * 40)) });
    PS.mark('ieltsL'); PS.save(); keep();
  };
  A.lsRetry = (el) => { delete pst[el.dataset.key]; au.plays[el.dataset.key] = 0; PS.render(); };
  A.lsReason = (el) => {
    const key = el.dataset.key, k = +el.dataset.k, st = qState(key), { x, pr } = ownerOf(key), L = LS();
    const qid = x.id + ':' + (key.includes(':') ? 'pr' : 't') + ':' + k;
    L.log = L.log.filter((e) => e.qid !== qid || e.date !== dayKey());
    if (st.reasons[k] === el.dataset.r) delete st.reasons[k];
    else { st.reasons[k] = el.dataset.r; L.log.unshift({ qid, date: dayKey(), lesson: x.code, q: pr.qs[k].q, given: st.ans[k] || '', reason: el.dataset.r }); }
    L.log = L.log.slice(0, 300);
    PS.save();
    el.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.r === st.reasons[k]));
    if (st.reasons[k]) PS.toast(t('reasonSaved'));
  };
  A.lsAI = async (el) => {
    const key = el.dataset.key, st = qState(key), { x, pr } = ownerOf(key), out = document.getElementById('lsAIout');
    const wrong = pr.qs.map((q, k) => ({ q, k })).filter(({ q, k }) => !q.open && !st.marks[k]);
    const script = pr.script.map(([sp, tx]) => (sp ? sp + ': ' : '') + tx).join('\n');
    const items = wrong.map(({ q, k }) => `- Q${k + 1}: ${q.q}${q.o ? ' (' + q.o.map((o, j) => String.fromCharCode(65 + j) + ' ' + o).join(' / ') + ')' : ''} | her answer: "${st.ans[k] || '(blank)'}" | correct: "${keyOf(q)}"`).join('\n');
    el.disabled = true; out.innerHTML = PS.loading();
    try {
      const ans = await PS.ai({ feature: 'listening', max: 700, json: false, system: `You are a precise IELTS Listening coach for an IELTS Academic candidate. Answer in ${PS.langName()}. Plain text, no markdown headings. For each wrong answer give 1-2 short lines: where the answer is in the script (quote max 8 words), why the answer was wrong (trap type: distractor, correction, synonym/paraphrase, spelling, word limit, plural), and one habit for next time.`, prompt: `Task: ${x.code} ${x.title}. ${pr.instr}\nSCRIPT:\n${script}\nWRONG ANSWERS:\n${items}` });
      out.innerHTML = `<div style="white-space:pre-wrap;font-size:14.5px;line-height:1.55;background:#FAF7FF;border-radius:14px;padding:12px">${esc(ans)}</div>`;
    } catch (e) { out.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; el.disabled = false; }
  };

  /* ================= Top 30 ================= */
  function top30View() {
    const L = LS(); let n = 0;
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#listen', `<span style="font-size:12px;color:#1F6E55;display:block;font-family:Nunito,sans-serif;font-weight:800">B11 · ${esc(t('bookPage', { n: 29 }))}</span>${esc(t('top30T'))}`)}
      <section class="card" style="background:#DDF4EA;border:none"><span style="font-size:14px;color:#164F3D">${esc(t('top30Intro'))}</span></section>
      ${L.stars.length ? `<section class="card" style="border:1.5px solid #F2C14E"><h2 class="h2" style="font-size:16px">⭐ ${esc(t('myTop3'))}</h2>${L.stars.map((s) => `<div style="font-size:14.5px;font-weight:700">• ${esc(s)}</div>`).join('')}</section>` : `<span class="small">⭐ ${esc(t('myTop3Hint'))}</span>`}
      ${D().top30.map((g) => `<section class="card" style="gap:8px"><h2 class="h2" style="font-size:16px;color:${g.ink}">${esc(g.name)}</h2>${g.tips.map((tip) => { n++; const on = L.stars.includes(tip); return `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><span style="min-width:26px;height:26px;border-radius:9px;background:${g.bg};color:${g.ink};font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center">${n}</span><span class="grow" style="font-size:14.5px;line-height:1.45">${esc(tip)}</span><button class="iconbtn" style="width:34px;height:34px;flex-shrink:0;margin-left:auto;border:none;background:${on ? '#FFF4D6' : 'transparent'};font-size:18px" data-act="lsStar" data-tip="${esc(tip)}" aria-label="star">${on ? '⭐' : '☆'}</button></div>`; }).join('')}</section>`).join('')}
      <section class="card" style="background:#E0EEFF;border:none"><b style="color:#1F4778;font-size:14.5px">${esc(D().top30Note)}</b></section></div>`;
  }
  A.lsStar = (el) => {
    const L = LS(), tip = el.dataset.tip, i = L.stars.indexOf(tip);
    if (i >= 0) L.stars.splice(i, 1); else { if (L.stars.length >= 3) { PS.toast(t('max3')); return; } L.stars.push(tip); }
    PS.save(); keep();
  };

  /* ================= Official tests + real-test log ================= */
  function officialView() {
    const L = LS();
    return `<div class="page">${PS.back('#listen', `<span style="font-size:12px;color:#6B4E00;display:block;font-family:Nunito,sans-serif;font-weight:800">B10 · ${esc(t('bookPage', { n: 28 }))}</span>${esc(t('officialT'))}`)}
      <section class="stack" style="gap:8px">${D().official.map((o) => `${o.url ? `<a class="tile h" href="${esc(o.url)}" target="_blank" rel="noopener">` : '<div class="tile h">'}${ic('grad', '#FFF4D6', 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(o.name)}</span><span class="s">${esc(o.path)}</span></span>${o.url ? '<span style="font-size:18px;color:#6B6585">↗</span></a>' : '</div>'}`).join('')}</section>
      <section class="card"><h2 class="h2" style="font-size:16px">🎯 ${esc(t('realHow'))}</h2><ol style="margin:0;padding-left:22px;font-size:14.5px;line-height:1.5">${D().officialHow.map((s) => `<li style="margin:3px 0">${esc(s)}</li>`).join('')}</ol></section>
      <section class="card"><h2 class="h2" style="font-size:16px">📒 ${esc(t('realLog'))}</h2>
        <div class="field"><label class="lbl" for="rlName">${esc(t('testName'))}</label><input id="rlName" class="in" placeholder="British Council · Academic Listening 1"></div>
        <div class="grid2"><div class="field"><label class="lbl" for="rlScore">${esc(t('score40'))}</label><input id="rlScore" class="in" inputmode="numeric" placeholder="30"></div>
          <div class="field"><label class="lbl" for="rlTrap">${esc(t('mainTrap'))}</label><select id="rlTrap" class="in">${D().reasons.map((r) => `<option value="${r.id}">${esc(reasonName(r))}</option>`).join('')}</select></div></div>
        <button class="btn" data-act="lsRealAdd">${esc(t('addLog'))}</button>
        ${L.real.map((r, i) => `<div class="between" style="border-top:1px dashed #ECE7FA;padding-top:8px"><span class="stack" style="gap:0"><b style="font-size:14px">${esc(r.name)}</b><span class="small">${esc(PS.fmtDate(r.date))} · ${esc(reasonName(D().reasons.find((x) => x.id === r.trap) || D().reasons[0]))}</span></span><span class="row"><span class="pill" style="background:#E0EEFF;color:#2B5C99">${r.score}/40 · ${toBand(r.score)}</span><button class="iconbtn" style="width:32px;height:32px;border:none" data-act="lsRealDel" data-i="${i}" aria-label="${esc(t('delete'))}">✕</button></span></div>`).join('')}
        <span class="small">${esc(t('bandTable'))}</span></section></div>`;
  }
  A.lsRealAdd = () => {
    const name = document.getElementById('rlName').value.trim() || 'Official test', score = parseInt(document.getElementById('rlScore').value, 10), trap = document.getElementById('rlTrap').value;
    if (!(score >= 0 && score <= 40)) { PS.toast(t('score40')); return; }
    LS().real.unshift({ date: dayKey(), name, score, trap });
    S().practice.unshift({ id: PS.uid(), skill: 'L', date: dayKey(), title: name, score, total: 40, band: toBand(score) });
    PS.mark('ieltsL'); PS.save(); PS.render();
  };
  A.lsRealDel = (el) => { if (!confirm(t('confirmDelete'))) return; LS().real.splice(+el.dataset.i, 1); PS.save(); PS.render(); };
})();
