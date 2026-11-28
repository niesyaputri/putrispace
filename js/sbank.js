/* Putri Space · Speaking Bank ("Speak with Confidence" book, imported privately to this phone; AI only for optional feedback) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs, LIB = PS.LIB;
  const { esc, ic, icon } = PS;
  const t = PS.t, S = () => PS.S();
  let SB = null, loading = false;
  const ST = () => { const s = S(); s.sbank = s.sbank || {}; const b = s.sbank; b.done = b.done || {}; b.notes = b.notes || {}; return b; };
  const ROSE = { ink: '#8E3049', bg: '#FCE4EA' };
  const load = () => {
    if (SB || loading) return; loading = true;
    PS.img.get('speakbook').then((txt) => { loading = false; if (txt) { try { SB = JSON.parse(txt); } catch (e) { SB = null; } } SB = SB || false; if (PS.route()[0] === 'sbank' || PS.route()[0] === 'english') PS.render(); });
  };
  PS.sbankProgress = () => { if (!SB) return null; const d = ST().done, total = SB.part1.length * 4 + SB.cards.length + SB.part3.length * 4 + SB.interview.length + SB.stories.length; return { total, done: Object.keys(d).length }; };

  /* ---------- import (private: IndexedDB on this phone, never synced) ---------- */
  PS.importSpeaking = async function (obj) {
    try {
      if (!obj || obj.type !== 'putrispace-speaking') throw new Error('bad');
      const images = obj.images || {}; const data = Object.assign({}, obj); delete data.images;
      const map = {}; Object.keys(images).forEach((k) => { map['sb-' + k] = images[k]; });
      map.speakbook = JSON.stringify(data);
      await PS.img.put(map); SB = data;
      PS.toast(t('sbImported'), 3500); PS.sheet(null); PS.go('sbank');
    } catch (e) { PS.toast(t('badFile'), 3500); }
  };
  A.sbImport = () => document.getElementById('sbFile').click();
  A.sbFileChosen = (el) => { const f = el.files[0]; if (!f) return; PS.toast(t('sbImporting'), 4000); f.text().then((txt) => { try { PS.importSpeaking(JSON.parse(txt)); } catch (e) { PS.toast(t('badFile')); } }); };

  /* ---------- small helpers ---------- */
  const say = (txt, label) => `<button class="iconbtn" style="width:36px;height:36px;border:none;background:#FCE4EA;flex-shrink:0" data-act="say" data-text="${esc(String(txt).replace(/\[\d\]/g, ''))}" aria-label="${esc(label || t('listen'))}">${icon('speaker', 18)}</button>`;
  const badge = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;background:#8E3049;color:#fff;font:800 10.5px Nunito,sans-serif;vertical-align:2px;margin:0 2px">${n}</span>`;
  const marks = (s) => esc(s).replace(/\[(\d)\]/g, (m, n) => badge(n));
  const upgrade = (b6, b7) => (b6 || b7) ? `<div class="stack" style="gap:6px"><span class="small" style="font-weight:800">⬆️ ${esc(t('upgradeIt'))}</span>${b6 ? `<div class="wrong"><span>✕</span><span><b style="font-size:11px">BAND 6</b> ${esc(b6)}</span></div>` : ''}${b7 ? `<div class="right"><span>✓</span><span><b style="font-size:11px">BAND 7+</b> ${esc(b7)}</span>${say(b7)}</div>` : ''}</div>` : '';
  const tipsHtml = (tips) => (tips || []).map((tp) => `<div class="drill" style="padding:9px 12px;background:#FFF4D6;color:#5C4600"><b style="font-size:11px;letter-spacing:.05em">TIP${tp.label ? ' · ' + esc(tp.label.toUpperCase()) : ''}</b><span style="font-size:14px">${esc(tp.text)}</span></div>`).join('');
  const open = {};
  A.sbOpen = (el) => { open[el.dataset.key] = !open[el.dataset.key]; LIB.keep(); };
  const reveal = (key, inner, label) => open[key] ? `${inner}<button class="btn ghost sm" data-act="sbOpen" data-key="${esc(key)}">${esc(t('hideModel'))}</button>` : `<button class="btn soft" data-act="sbOpen" data-key="${esc(key)}">💡 ${esc(label || t('sbShowModel'))}</button>`;

  /* ---------- practice widget: timer · record & listen · dictate · AI · done ---------- */
  const recs = {}; let recorder = null, recKey = null, chunks = [];
  const timers = {};
  function practice(key, qText, part, secs) {
    const d = ST().done[key], note = ST().notes[key] || '', r = recs[key], m = Math.floor(secs / 60), s = secs % 60;
    return `<section class="card" style="border:1.5px dashed #F7A9BC;gap:8px"><div class="between"><b style="font-size:14px;color:#8E3049">🗣 ${esc(t('yourTurn'))}</b><span class="small">${esc(t('practiceLoop'))}</span></div>
      <div class="row wrap" style="gap:6px"><button class="btn soft sm" id="sbt-${esc(key)}" data-act="sbTimer" data-key="${esc(key)}" data-s="${secs}">⏱ ${m}:${String(s).padStart(2, '0')}</button>
        <button class="btn sm ${recKey === key ? 'rose' : 'ghost'}" data-act="sbRec" data-key="${esc(key)}">${recKey === key ? '■ ' + esc(t('stopRec')) : '🎙 ' + esc(r ? t('reRecord') : t('record'))}</button>
        ${r ? `<audio controls src="${r}" style="height:36px;max-width:100%"></audio>` : ''}</div>
      <textarea class="in" rows="3" id="sbn-${esc(key)}" data-in="sbNote" data-key="${esc(key)}" data-nofocus="1" placeholder="${esc(t('sbNotePh'))}">${esc(note)}</textarea>
      <div class="row wrap" style="gap:6px"><button class="btn rose sm" data-act="dictate" data-for="sbn-${esc(key)}">${icon('mic', 18)}${esc(t('speak'))}</button>
        <button class="btn sm" data-act="sbAI" data-key="${esc(key)}" data-part="${esc(part)}" data-q="${esc(qText)}">${icon('spark', 18)}${esc(t('feedbackAI'))}</button>
        <button class="btn sm ${d ? 'mint' : 'ghost'}" data-act="sbDone" data-key="${esc(key)}">${d ? '✓ ' + esc(t('practised')) : esc(t('markPractised'))}</button></div>
      <div id="sbr-${esc(key)}"></div></section>`;
  }
  IN.sbNote = (el) => { ST().notes[el.dataset.key] = el.value; clearTimeout(PS._sbn); PS._sbn = setTimeout(() => PS.save(), 800); };
  A.sbDone = (el) => { const d = ST().done, k = el.dataset.key; if (d[k]) delete d[k]; else { d[k] = PS.dayKey(); PS.mark('ieltsS'); } PS.save(); LIB.keep(); };
  A.sbTimer = (el) => {
    const k = el.dataset.key, secs = +el.dataset.s, fmt = (x) => Math.floor(x / 60) + ':' + String(x % 60).padStart(2, '0');
    if (timers[k]) { clearInterval(timers[k]); delete timers[k]; el.textContent = '⏱ ' + fmt(secs); return; }
    const end = Date.now() + secs * 1000;
    timers[k] = setInterval(() => { const b = document.getElementById('sbt-' + k), left = Math.max(0, Math.round((end - Date.now()) / 1000)); if (!b) { clearInterval(timers[k]); delete timers[k]; return; } b.textContent = '⏱ ' + fmt(left); if (!left) { clearInterval(timers[k]); delete timers[k]; PS.toast(t('timeUp')); if (navigator.vibrate) navigator.vibrate(300); } }, 250);
  };
  A.sbRec = async (el) => {
    const k = el.dataset.key;
    if (recorder && recKey === k) { recorder.stop(); return; }
    if (recorder) { PS.toast(t('stopOtherRec')); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { PS.toast(t('noRecorder'), 3500); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = []; recorder = new MediaRecorder(stream); recKey = k;
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = () => { stream.getTracks().forEach((tr) => tr.stop()); if (recs[k]) URL.revokeObjectURL(recs[k]); recs[k] = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/mp4' })); recorder = null; recKey = null; LIB.keep(); };
      recorder.start(); LIB.keep();
    } catch (e) { recorder = null; recKey = null; PS.toast(t('micDenied'), 3500); }
  };
  A.sbAI = async (el) => {
    const k = el.dataset.key, ans = (ST().notes[k] || '').trim(), out = document.getElementById('sbr-' + k);
    if (ans.split(/\s+/).length < 12) { PS.toast(t('sbTooShort'), 3500); return; }
    if (!PS.conn().url) { PS.toast(t('needBackend'), 3500); return; }
    el.disabled = true; out.innerHTML = PS.loading(t('scoring'));
    try { const w = await PS.gradeSpeaking(el.dataset.part, el.dataset.q, ans); ST().done[k] = ST().done[k] || PS.dayKey(); PS.save(); out.innerHTML = PS.speakResult(w); }
    catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };

  /* ================= views ================= */
  const head = (back, eyebrow, title, color) => PS.back(back, `<span style="font-size:12px;color:${color || ROSE.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(eyebrow)}</span>${esc(title)}`);
  const nav = (base, i, n, labelOf) => `<div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#sbank/${base}/${i - 1}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${n}</span><a class="btn ghost sm" style="flex:1;${i < n - 1 ? '' : 'visibility:hidden'}" href="#sbank/${base}/${i + 1}">${esc(t('next'))} ›</a></div>`;
  const doneCount = (prefix) => Object.keys(ST().done).filter((k) => k.startsWith(prefix)).length;

  V.sbank = function (p) {
    load();
    if (SB === null) return `<div class="page">${head('#english', 'Speaking Bank', t('libSpeaking'))}${PS.loading(t('loadingData'))}</div>`;
    if (!SB) return importView();
    const i = +p[1] || 0;
    if (p[0] === 'p1' && SB.part1[i]) return qaView('p1', SB.part1, i);
    if (p[0] === 'p3' && SB.part3[i]) return qaView('p3', SB.part3, i);
    if (p[0] === 'p2' && SB.cards[i]) return cardView(i);
    if (p[0] === 'iv' && SB.interview[i]) return ivView(i);
    if (p[0] === 'st' && SB.stories[i]) return storyView(i);
    if (p[0] === 'g') return guideView(p[1]);
    if (p[0] === 'list') return listView(p[1]);
    return hub();
  };

  function importView() {
    return `<div class="page">${head('#english', 'Speaking Bank', t('libSpeaking'))}
      <section class="card" style="align-items:center;text-align:center">${PS.owl(false, 80)}<b style="font-size:16px">${esc(t('sbEmpty'))}</b><span class="small">${esc(t('sbEmptySub'))}</span>
        <button class="btn" data-act="sbImport">${icon('importW', 22)}${esc(t('sbImportBtn'))}</button><input type="file" id="sbFile" accept=".json,application/json" hidden data-change="sbFileChosen">
        <span class="small">🔒 ${esc(t('sbPrivate'))}</span></section></div>`;
  }

  function hub() {
    const pr = PS.sbankProgress();
    const tile = (href, iconName, bg, title, sub, n, tot) => `<a class="tile h" href="${href}">${ic(iconName, bg, 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(title)}</span><span class="s">${esc(sub)}</span></span>${tot ? `<span class="pill" style="background:${n ? '#DDF4EA' : '#F3F0FF'};color:${n ? '#1F6E55' : '#6B6585'}">${n}/${tot}</span>` : ''}</a>`;
    const g = (id) => (SB.guides || []).find((x) => x.id === id);
    const gtile = (id, bg) => { const x = g(id); return x ? `<a class="tile" href="#sbank/g/${id}" style="background:${bg};border:none;min-height:92px">${ic('quiz', '#fff', 'sm')}<span class="t" style="font-size:13px;line-height:1.25">${esc(x.title)}</span><span class="s">${esc(t('bookPage', { n: x.page }))}</span></a>` : ''; };
    const h2 = (code, ink, label) => `<div class="row" style="margin-top:4px"><span style="min-width:26px;height:26px;padding:0 6px;border-radius:9px;background:${ink};color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center">${code}</span><h2 class="h2" style="color:${ink};font-size:17px">${esc(label)}</h2></div>`;
    return `<div class="page">${PS.back('#english', esc(t('libSpeaking')), `<span class="pill" style="background:#FCE4EA;color:#8E3049">${pr.done}/${pr.total}</span>`)}
      <section class="hero" style="background:#F08DA5"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">Speak with Confidence · Band 6.0 → 7.0+</span><span class="big" style="font-size:18px">${esc(t('sbHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('sbHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      ${h2('A', '#8E3049', t('sbPartA'))}
      <section class="grid2">${gtile('p7', '#FCE4EA')}${gtile('p8', '#FCE4EA')}${gtile('p9', '#DDF4EA')}${gtile('p6', '#FFF4D6')}</section>
      <section class="stack" style="gap:8px">
        ${tile('#sbank/list/p1', 'speaking', '#FCE4EA', t('sbP1'), t('sbP1Sub'), doneCount('p1:'), SB.part1.length * 4)}
        ${tile('#sbank/list/p2', 'story', '#FFF4D6', t('sbP2'), t('sbP2Sub'), doneCount('p2:'), SB.cards.length)}
        ${tile('#sbank/list/p3', 'english', '#E0EEFF', t('sbP3'), t('sbP3Sub'), doneCount('p3:'), SB.part3.length * 4)}
        ${tile('#sbank/list/tk', 'tenses', '#EEEAFE', t('sbToolkit'), t('sbToolkitSub'), 0, 0)}</section>
      ${h2('B', '#4B3DB0', t('sbPartB'))}
      <section class="grid2">${gtile('p83', '#EEEAFE')}${gtile('p84', '#DDF4EA')}</section>
      <section class="stack" style="gap:8px">
        ${tile('#sbank/list/iv', 'grad', '#EEEAFE', t('sbIV'), t('sbIVSub'), doneCount('iv:'), SB.interview.length)}
        ${tile('#sbank/g/p113', 'mic', '#FCE4EA', t('sbPitch'), t('sbPitchSub'), 0, 0)}
        ${tile('#sbank/list/st', 'star', '#FFF4D6', t('sbStories'), t('sbStoriesSub'), doneCount('st:'), SB.stories.length)}
        ${tile('#sbank/g/p112', 'quiz', '#E0EEFF', t('sbAsk'), t('sbAskSub'), 0, 0)}
        ${tile('#sbank/g/p119', 'check', '#DDF4EA', t('sbCheck'), t('sbCheckSub'), 0, 0)}</section>
      <a class="tile h" href="#ielts/S">${ic('spark', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('aiListeningMore'))}</span><span class="s">${esc(t('aiSpeakingMoreSub'))}</span></span></a>
      <div class="row" style="justify-content:center"><button class="btn ghost sm" data-act="sbImport">${esc(t('sbReimport'))}</button><input type="file" id="sbFile" accept=".json,application/json" hidden data-change="sbFileChosen"></div>
      <span class="small center">🔒 ${esc(t('sbPrivate'))}</span></div>`;
  }

  function listView(kind) {
    const d = ST().done;
    const row = (href, code, title, sub, done) => `<a class="tile h" href="${href}"><span class="ic sm" style="background:${done ? '#DDF4EA' : '#FCE4EA'};font-weight:800;font-size:12px;color:${done ? '#1F6E55' : '#8E3049'}">${esc(code)}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(title)}</span>${sub ? `<span class="s">${esc(sub)}</span>` : ''}</span>${done ? '<span class="pill" style="background:#DDF4EA;color:#1F6E55">✓</span>' : ''}</a>`;
    let title = '', body = '', extra = '';
    if (kind === 'p1') { title = t('sbP1'); extra = guideLink('p2'); body = SB.part1.map((x, i) => row(`#sbank/p1/${i}`, String(i + 1).padStart(2, '0'), x.title, x.qs.map((q) => q.q).join(' · ').slice(0, 90) + '…', x.qs.every((q, j) => d[`p1:${i}:${j}`]))).join(''); }
    else if (kind === 'p2') { title = t('sbP2'); extra = guideLink('p30'); let cat = ''; body = SB.cards.map((x, i) => (x.cat !== cat ? `<div class="sec-t" style="color:#8E3049;margin-top:6px">${esc(cat = x.cat)}</div>` : '') + row(`#sbank/p2/${i}`, String(x.n).padStart(2, '0'), x.title, '', d[`p2:${i}`])).join(''); }
    else if (kind === 'p3') { title = t('sbP3'); extra = guideLink('p61'); body = SB.part3.map((x, i) => row(`#sbank/p3/${i}`, `${String(i * 2 + 1).padStart(2, '0')}–${String(i * 2 + 2).padStart(2, '0')}`, x.title, x.qs.map((q) => q.q).join(' · ').slice(0, 90) + '…', x.qs.every((q, j) => d[`p3:${i}:${j}`]))).join(''); }
    else if (kind === 'iv') { title = t('sbIV'); let cat = ''; body = SB.interview.map((x, i) => (x.cat !== cat ? `<div class="sec-t" style="color:#4B3DB0;margin-top:6px">${esc(cat = x.cat)}</div>` : '') + row(`#sbank/iv/${i}`, String(i + 1).padStart(2, '0'), x.q, x.aim.replace('Scholarship interview · ', ''), d[`iv:${i}`])).join(''); }
    else if (kind === 'st') { title = t('sbStories'); body = SB.stories.map((x, i) => row(`#sbank/st/${i}`, 'S' + (i + 1), x.title.replace(/^Story \d+:\s*/, ''), x.sub, d[`st:${i}`])).join(''); }
    else if (kind === 'tk') { title = t('sbToolkit'); body = (SB.guides || []).filter((g) => g.group === 'T').map((g) => row(`#sbank/g/${g.id}`, 'p' + g.page, g.title, '', false)).join(''); }
    return `<div class="page">${head('#sbank', 'Speaking Bank', title)}${extra}<section class="stack" style="gap:8px">${body}</section></div>`;
  }
  const guideLink = (id) => { const g = (SB.guides || []).find((x) => x.id === id); return g ? `<a class="tile h" href="#sbank/g/${id}" style="background:#FFF4D6;border:none">${ic('quiz', '#fff', 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(g.title)}</span><span class="s" style="color:#6B4E00">${esc(t('readFirst'))}</span></span></a>` : ''; };

  function guideView(id) {
    const g = (SB.guides || []).find((x) => x.id === id); if (!g) return hub();
    setTimeout(async () => { const box = document.getElementById('sbGuide'); const src = await PS.img.get('sb-' + id); if (box) box.innerHTML = src ? `<button data-act="sbZoom" data-id="${esc(id)}" style="border:none;padding:0;background:none;width:100%;cursor:zoom-in"><img src="${src}" alt="${esc(g.title)}" style="width:100%;display:block;border-radius:14px;border:1px solid #ECE7FA"></button>` : `<span class="small">${esc(t('imgMissing'))}</span>`; }, 0);
    return `<div class="page">${head('#sbank', t('bookPage', { n: g.page }), g.title)}
      <div id="sbGuide">${PS.loading()}</div><span class="small center">${esc(t('tapToZoom'))}</span>
      ${id === 'p113' && SB.pitch ? `<section class="card"><div class="between"><b>${esc(t('sbPitchFull'))}</b>${say(SB.pitch)}</div><div class="read-mode" style="font-size:16px;line-height:1.7">${marks(SB.pitch)}</div></section>${practice('pitch', 'Tell us about yourself (1-minute pitch).', 'interview', 65)}` : ''}</div>`;
  }
  A.sbZoom = async (el) => { const src = await PS.img.get('sb-' + el.dataset.id); if (src) PS.sheet(`<div style="overflow:auto;-webkit-overflow-scrolling:touch;max-height:75vh"><img src="${src}" alt="" style="width:220%;max-width:none;display:block"></div><span class="small">${esc(t('scrollToSee'))}</span><button class="btn soft" data-act="closeSheet">${esc(t('close'))}</button>`); };

  function qaView(kind, list, i) {
    const x = list[i], part = kind === 'p1' ? 'Part 1' : 'Part 3', secs = kind === 'p1' ? 20 : 45;
    let lastFrom = '';
    const items = x.qs.map((q, j) => {
      const key = `${kind}:${i}:${j}`, from = q.from && q.from !== lastFrom ? (lastFrom = q.from) : '';
      const model = `<div class="drill" style="background:#fff;border:1.5px solid #F7A9BC;color:#2E2A45"><div class="between"><b style="font-size:12px;color:#8E3049">${esc(t('sbModel'))}</b>${say(q.a)}</div><span style="font-size:15px;line-height:1.6">${esc(q.a)}</span></div>${upgrade(q.b6, q.b7)}${tipsHtml(q.tips)}`;
      return `${from ? `<div class="sec-t" style="color:#4B3DB0;margin-top:6px">${esc(t('fromCard'))} · ${esc(from)}</div>` : ''}
        <section class="card" style="gap:10px"><div class="row" style="align-items:flex-start"><span style="min-width:28px;height:28px;border-radius:10px;background:#8E3049;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center">${j + 1}</span><b class="grow" style="font-size:16px;line-height:1.4">${esc(q.q)}</b>${say(q.q)}</div>
        ${practice(key, q.q, kind, secs)}${reveal(key, model)}</section>`;
    }).join('');
    return `<div class="page" style="background:var(--cream);min-height:100vh">${head('#sbank/list/' + kind, `${part} · ${t('bookPage', { n: x.page })}`, x.title)}
      <section class="card" style="background:#FCE4EA;border:none"><span style="font-size:14px;color:#6E2238">${esc(x.sub)}</span></section>
      ${items}
      ${x.tip ? `<section class="card" style="background:#2E2A45;color:#fff;border:none"><span style="font-size:14px">💡 ${esc(x.tip)}</span></section>` : ''}
      ${nav(kind, i, list.length)}</div>`;
  }

  function cardView(i) {
    const c = SB.cards[i], key = `p2:${i}`, p3 = Math.floor((c.n - 1) / 2);
    const model = `<section class="card" style="background:#FFF4D6;border:none;gap:4px"><b style="font-size:13px;color:#6B4E00">📝 ${esc(t('sbNotePlan'))}</b>${c.notes.map((n, k) => `<div style="font-size:14px"><b>${k + 1}</b> · ${esc(n)}</div>`).join('')}</section>
      <article class="card read-mode" style="font-size:16px;line-height:1.7;gap:10px"><div class="between" style="font-family:Nunito,sans-serif"><span class="small" style="color:#8E3049;font-weight:800">${esc(t('sbModel2min'))}</span>${say(c.model.join(' '))}</div>${c.model.map((p) => `<p style="margin:0">${esc(p)}</p>`).join('')}</article>
      ${tipsHtml(c.tips)}
      <section class="card" style="gap:6px"><b style="font-size:13px">🔤 ${esc(t('vocabT'))}</b><div class="row wrap" style="gap:6px">${c.useful.map((u) => `<button class="chip" data-act="lbToVocab" data-w="${esc(u)}" data-m="">${esc(u)} ＋</button>`).join('')}</div><span class="small">＋ = ${esc(t('addToMyVocab'))}</span></section>
      ${upgrade(c.b6, c.b7)}`;
    return `<div class="page" style="background:var(--cream);min-height:100vh">${head('#sbank/list/p2', `Part 2 · ${t('sbCard')} ${String(c.n).padStart(2, '0')} · ${c.cat} · ${t('bookPage', { n: c.page })}`, c.title)}
      <section class="card" style="background:#FFF4D6;border:1.5px solid #F2C14E;gap:6px"><span class="small" style="color:#6B4E00;font-weight:800">CUE CARD</span><div class="row" style="align-items:flex-start"><b class="grow" style="font-size:17px;line-height:1.4">${esc(c.title)}</b>${say(c.title + ' You should say: ' + c.bullets.join(', '))}</div><span class="small">You should say:</span><ul style="margin:0;padding-left:20px;font-size:15px">${c.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        <div class="row"><button class="btn soft sm" id="sbt-prep${i}" data-act="sbTimer" data-key="prep${i}" data-s="60">⏱ ${esc(t('prep1min'))} 1:00</button></div></section>
      ${practice(key, c.title + ' (You should say: ' + c.bullets.join('; ') + ')', 'p2', 120)}
      ${reveal(key, model)}
      <a class="tile h" href="#sbank/p3/${p3}">${ic('english', '#E0EEFF', 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(t('sbP3ForCard'))}</span><span class="s">${esc(SB.part3[p3] ? SB.part3[p3].title : '')}</span></span></a>
      ${nav('p2', i, SB.cards.length)}</div>`;
  }

  function ivView(i) {
    const x = SB.interview[i], key = `iv:${i}`, secs = Math.max(45, +((x.aim.match(/(\d+)\s*sec/) || [])[1] || 60));
    const model = `<article class="card read-mode" style="font-size:16px;line-height:1.7;gap:10px"><div class="between" style="font-family:Nunito,sans-serif"><span class="small" style="color:#4B3DB0;font-weight:800">${esc(t('sbModelProfile'))}</span>${say(x.model.join(' '))}</div>${x.model.map((p) => `<p style="margin:0">${marks(p)}</p>`).join('')}</article>
      ${tipsHtml(x.tips)}${upgrade(x.b6, x.b7)}
      ${x.side && x.side.label ? `<section class="card" style="background:#EEEAFE;border:none;gap:4px"><b style="font-size:13px;color:#4B3DB0">${esc(x.side.label)}</b>${x.side.items.length ? x.side.items.map((s) => `<div style="font-size:14px">• ${esc(s)}</div>`).join('') : `<span class="small">${esc(t('sbFillIn'))}</span>`}</section>` : ''}`;
    return `<div class="page" style="background:var(--cream);min-height:100vh">${head('#sbank/list/iv', `${x.cat} · ${t('bookPage', { n: x.page })}`, '')}
      <section class="card" style="background:#EEEAFE;border:none;gap:6px"><div class="row" style="align-items:flex-start"><b class="grow" style="font-family:Fredoka,Nunito,sans-serif;font-size:20px;line-height:1.3;color:#2E2A45">“${esc(x.q)}”</b>${say(x.q)}</div><span class="small" style="color:#4B3DB0">${esc(x.aim)}</span></section>
      ${x.map.length ? `<section class="card" style="gap:6px"><b style="font-size:13px">🗺 ${esc(t('sbAnswerMap'))}</b><div class="row wrap" style="gap:6px">${x.map.map(([s, h], k) => `<span class="pill" style="background:#FCE4EA;color:#6E2238;white-space:normal;text-align:left;padding:6px 10px">${badge(k + 1)} <b>${esc(s)}</b>${h ? ' · ' + esc(h) : ''}</span>`).join('')}</div></section>` : ''}
      ${practice(key, x.q + ' (scholarship interview)', 'interview', secs)}
      ${reveal(key, model)}
      ${x.foot ? `<section class="card" style="background:#2E2A45;color:#fff;border:none"><span style="font-size:14px">💡 ${esc(x.foot)}</span></section>` : ''}
      ${nav('iv', i, SB.interview.length)}</div>`;
  }

  function storyView(i) {
    const x = SB.stories[i], key = `st:${i}`;
    const blk = (L, label, body, bg) => `<div class="row" style="align-items:flex-start;gap:10px"><span style="min-width:32px;height:32px;border-radius:10px;background:${bg};color:#fff;font:800 15px Fredoka,Nunito,sans-serif;display:flex;align-items:center;justify-content:center">${L}</span><div class="stack grow" style="gap:2px"><b style="font-size:12px;letter-spacing:.05em;color:#6B6585">${label}</b>${body}</div></div>`;
    const full = [x.situation, x.task, ...(x.action || []), x.result, x.lesson].filter(Boolean).join(' ');
    return `<div class="page" style="background:var(--cream);min-height:100vh">${head('#sbank/list/st', `STAR · ${t('bookPage', { n: x.page })}`, x.title)}
      <section class="card" style="background:#FFF4D6;border:none"><span style="font-size:14px;color:#5C4600">${esc(x.sub)}</span></section>
      <section class="card" style="gap:12px"><div class="between"><b>STAR</b>${say(full)}</div>
        ${blk('S', 'SITUATION', `<span style="font-size:15px;line-height:1.55">${esc(x.situation || '')}</span>`, '#6FA4EE')}
        ${blk('T', 'TASK', `<span style="font-size:15px;line-height:1.55">${esc(x.task || '')}</span>`, '#5BBF97')}
        ${blk('A', 'ACTION', `<ul style="margin:0;padding-left:18px;font-size:15px;line-height:1.5">${(x.action || []).map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`, '#F2A07B')}
        ${blk('R', 'RESULT', `<span style="font-size:15px;line-height:1.55">${esc(x.result || '')}</span>`, '#F08DA5')}</section>
      ${x.lesson ? `<section class="card" style="background:#2E2A45;color:#fff;border:none;gap:6px"><span class="small" style="color:#F7A9BC;font-weight:800">${esc(t('sbLesson'))}</span><b style="font-size:16px;line-height:1.5">“${esc(x.lesson)}”</b></section>` : ''}
      ${(x.use || []).length ? `<section class="card" style="gap:6px"><b style="font-size:13px">${esc(t('sbUseFor'))}</b><div class="row wrap" style="gap:6px">${x.use.map((u) => `<span class="pill" style="background:#EEEAFE;color:#4B3DB0">${esc(u)}</span>`).join('')}</div></section>` : ''}
      ${x.extra ? `<span class="small">💡 ${esc(x.extra)}</span>` : ''}
      ${practice(key, 'Tell the STAR story: ' + x.title + ' (' + x.sub + ')', 'interview', 90)}
      ${nav('st', i, SB.stories.length)}</div>`;
  }
})();
