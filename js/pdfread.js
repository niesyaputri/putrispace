/* Putri Space · Mode Baca PDF (your own PDFs, stored only on this phone: highlighter, notes, Ask AI, save as card) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, ic, icon } = PS;
  const t = PS.t, S = () => PS.S(), C = () => window.PS_CONTENT;
  const keep = () => { const y = window.scrollY; PS.render(); window.scrollTo(0, y); };

  /* ---------- storage (IndexedDB via PS.img, never synced) ---------- */
  let META = null;
  const getJSON = async (k, d) => { const v = await PS.img.get(k); if (!v) return d; try { return typeof v === 'string' ? JSON.parse(v) : v; } catch (e) { return d; } };
  const putJSON = (k, v) => PS.img.put({ [k]: JSON.stringify(v) });
  const loadMeta = async () => { if (!META) META = await getJSON('pdfmeta', []); return META; };
  const saveMeta = () => putJSON('pdfmeta', META || []);
  const ANN = {};
  const ann = async (id) => { if (!ANN[id]) ANN[id] = await getJSON('pdfann:' + id, { hl: {}, notes: {}, marks: [] }); return ANN[id]; };
  let annT = null;
  const saveAnn = (id) => { clearTimeout(annT); annT = setTimeout(() => putJSON('pdfann:' + id, ANN[id]), 500); };

  /* ---------- pdf.js (lazy, vendored, works offline after first use) ---------- */
  let libP = null;
  const lib = () => libP || (libP = new Promise((res, rej) => {
    if (window.pdfjsLib) return res(window.pdfjsLib);
    const s = document.createElement('script'); s.src = 'vendor/pdfjs/pdf.min.js';
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js'; res(window.pdfjsLib); };
    s.onerror = () => { libP = null; rej(new Error(t('pdfLibFail'))); };
    document.head.appendChild(s);
  }));
  const DOCS = {};
  const openDoc = async (id) => {
    if (DOCS[id]) return DOCS[id];
    const [pdfjs, buf] = await Promise.all([lib(), PS.img.get('pdf:' + id)]);
    if (!buf) throw new Error(t('pdfMissing'));
    DOCS[id] = await pdfjs.getDocument({ data: new Uint8Array(buf.slice ? buf.slice(0) : buf), isEvalSupported: false }).promise;
    return DOCS[id];
  };

  /* ---------- text extraction → paragraphs (handles 2 columns) ---------- */
  const TXT = {};
  async function pageText(id, n) {
    const k = id + ':' + n; if (TXT[k]) return TXT[k];
    const doc = await openDoc(id), page = await doc.getPage(n), vp = page.getViewport({ scale: 1 }), tc = await page.getTextContent();
    const items = tc.items.filter((it) => it.str && it.str.trim()).map((it) => ({ s: it.str, x: it.transform[4], y: vp.height - it.transform[5], h: Math.abs(it.transform[3]) || 10, w: it.width }));
    const W = vp.width, mid = W / 2;
    const right = items.filter((i) => i.x > mid + 5).length, left = items.filter((i) => i.x + i.w < mid - 5).length, cross = items.filter((i) => i.x < mid - 5 && i.x + i.w > mid + 5).length;
    const twoCol = right > items.length * 0.25 && left > items.length * 0.25 && cross < items.length * 0.08;
    const cols = twoCol ? [items.filter((i) => i.x < mid), items.filter((i) => i.x >= mid)] : [items];
    const paras = [];
    cols.forEach((col) => {
      const lines = [];
      col.sort((a, b) => a.y - b.y || a.x - b.x).forEach((it) => { const L = lines.find((l) => Math.abs(l.y - it.y) < Math.max(2.5, it.h * 0.35)); if (L) L.items.push(it); else lines.push({ y: it.y, h: it.h, items: [it] }); });
      lines.sort((a, b) => a.y - b.y);
      const gaps = lines.slice(1).map((l, i) => l.y - lines[i].y).filter((g) => g > 0).sort((a, b) => a - b), med = gaps.length ? gaps[Math.floor(gaps.length / 2)] : 14;
      let cur = '', prev = null;
      lines.forEach((l) => {
        const txt = l.items.sort((a, b) => a.x - b.x).reduce((acc, it, i, arr) => { if (!i) return it.s; const gap = it.x - (arr[i - 1].x + arr[i - 1].w); return acc + (gap > 1.5 && !/\s$/.test(acc) && !/^\s/.test(it.s) ? ' ' : '') + it.s; }, '').replace(/\s+/g, ' ').trim();
        if (!txt) return;
        const newPara = prev && (l.y - prev.y > med * 1.45 || Math.abs(l.h - prev.h) > 2.5);
        if (newPara && cur) { paras.push(cur); cur = ''; }
        cur = !cur ? txt : /[A-Za-z]-$/.test(cur) && /^[a-z]/.test(txt) ? cur.slice(0, -1) + txt : cur + ' ' + txt;
        prev = l;
      });
      if (cur) paras.push(cur);
    });
    TXT[k] = paras;
    return paras;
  }

  /* ---------- library ---------- */
  V.pdf = function (p) {
    if (META === null) { loadMeta().then(() => { if (PS.route()[0] === 'pdf') PS.render(); }); return `<div class="page">${PS.back('#hr', esc(t('pdfTitle')))}${PS.loading(t('loadingData'))}</div>`; }
    if (p[0] === 'hl' && p[1]) return hlView(p[1]);
    if (p[0]) return readerView(p[0], Math.max(1, +p[1] || 0));
    return libView();
  };
  function libView() {
    const list = META.slice().sort((a, b) => (b.opened || b.added).localeCompare(a.opened || a.added));
    return `<div class="page">${PS.back('#hr', esc(t('pdfTitle')))}
      <section class="hero" style="background:#8C7BE8"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">${esc(t('pdfEyebrow'))}</span><span class="big" style="font-size:18px">${esc(t('pdfHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('pdfHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      <button class="btn" data-act="pdfAdd">${icon('importW', 22)}${esc(t('pdfAdd'))}</button><input type="file" id="pdfFile" accept="application/pdf,.pdf" hidden data-change="pdfFileChosen">
      ${list.length ? `<section class="stack" style="gap:8px">${list.map((d) => { const pct = d.pages ? Math.round(((d.last || 1) / d.pages) * 100) : 0; return `<div class="tile h" style="align-items:center"><a href="#pdf/${d.id}/${d.last || 1}" class="row grow" style="text-decoration:none;color:inherit;gap:10px;min-width:0">${ic('reading', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:2px;min-width:0"><span class="t" style="font-size:14px;overflow:hidden;text-overflow:ellipsis">${esc(d.title)}</span><span class="s">${esc(t('pdfPageOf', { a: d.last || 1, b: d.pages }))} · ${(d.size / 1048576).toFixed(1)} MB${d.hls ? ' · 🖍 ' + d.hls : ''}</span><div class="bar" style="height:5px"><i style="width:${pct}%"></i></div></span></a><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0" data-act="pdfMenu" data-id="${d.id}" aria-label="menu">⋯</button></div>`; }).join('')}</section>`
        : `<section class="card" style="align-items:center;text-align:center">${PS.owl(false, 70)}<b>${esc(t('pdfEmpty'))}</b><span class="small">${esc(t('pdfEmptySub'))}</span></section>`}
      <section class="card" style="gap:6px"><b style="font-size:14px">${esc(t('pdfHowT'))}</b>${['pdfHow1', 'pdfHow2', 'pdfHow3', 'pdfHow4'].map((k) => `<div style="font-size:14px">• ${esc(t(k))}</div>`).join('')}</section>
      <span class="small center">🔒 ${esc(t('pdfPrivate'))}</span></div>`;
  }
  A.pdfAdd = () => document.getElementById('pdfFile').click();
  A.pdfFileChosen = async (el) => {
    const f = el.files[0]; if (!f) return;
    PS.toast(t('pdfImporting'), 5000);
    try {
      const buf = await f.arrayBuffer(), pdfjs = await lib();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(buf.slice(0)), isEvalSupported: false }).promise;
      let title = f.name.replace(/\.pdf$/i, '').replace(/^[0-9a-f]{8}-/i, '').replace(/[_]+/g, ' ').trim();
      try { const md = await doc.getMetadata(); if (md && md.info && md.info.Title && md.info.Title.trim().length > 3) title = md.info.Title.trim(); } catch (e) { /* keep file name */ }
      const id = 'p' + PS.uid();
      await PS.img.put({ ['pdf:' + id]: buf });
      await loadMeta(); META.push({ id, title, pages: doc.numPages, size: f.size, added: new Date().toISOString(), last: 1 }); await saveMeta();
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      DOCS[id] = doc; PS.toast(t('pdfAdded'), 3000); PS.go('pdf/' + id + '/1');
    } catch (e) { PS.toast(t('pdfFail') + ' ' + (e.message || ''), 5000); }
    el.value = '';
  };
  A.pdfMenu = (el) => {
    const d = META.find((x) => x.id === el.dataset.id); if (!d) return;
    PS.sheet(`<h2 class="h2">${esc(d.title)}</h2>
      <div class="field"><label class="lbl" for="pdfName">${esc(t('pdfRename'))}</label><input id="pdfName" class="in" value="${esc(d.title)}"></div>
      <button class="btn soft" data-act="pdfRenameSave" data-id="${d.id}">${esc(t('save'))}</button>
      <a class="btn soft" href="#pdf/hl/${d.id}" data-act="closeSheet">🖍 ${esc(t('pdfMyHl'))}</a>
      <button class="btn ghost" style="color:#8E3049" data-act="pdfDelete" data-id="${d.id}">${esc(t('delete'))}</button>`);
  };
  A.pdfRenameSave = async (el) => { const d = META.find((x) => x.id === el.dataset.id), v = document.getElementById('pdfName').value.trim(); if (d && v) { d.title = v; await saveMeta(); } PS.sheet(null); PS.render(); };
  A.pdfDelete = async (el) => {
    if (!confirm(t('confirmDelete'))) return;
    const id = el.dataset.id; META = META.filter((x) => x.id !== id); await saveMeta();
    if (PS.img.del) { await PS.img.del('pdf:' + id); await PS.img.del('pdfann:' + id); }
    delete DOCS[id]; delete ANN[id]; PS.sheet(null); PS.render();
  };

  /* ---------- reader ---------- */
  const R = { mode: 'text', zoom: 1 };
  function readerView(id, n) {
    const d = META.find((x) => x.id === id); if (!d) return libView();
    n = Math.min(n, d.pages || n);
    if (d.last !== n || !d.opened) { d.last = n; d.opened = new Date().toISOString(); saveMeta(); }
    setTimeout(() => fillPage(id, n), 0);
    const a = ANN[id], note = a && a.notes[n], marked = a && a.marks.includes(n);
    return `<div class="page" style="background:var(--cream);min-height:100vh;padding-bottom:150px">
      ${PS.back('#pdf', `<span style="font-size:12px;color:#4B3DB0;display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(t('pdfPageOf', { a: n, b: d.pages }))}</span><span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:62vw">${esc(d.title)}</span>`, `<button class="iconbtn" style="width:38px;height:38px;border:none;background:${marked ? '#FFF4D6' : 'transparent'}" data-act="pdfMark" data-id="${id}" data-n="${n}" aria-label="bookmark">${marked ? '🔖' : '📑'}</button>`)}
      <div class="seg" style="align-self:stretch"><button class="${R.mode === 'text' ? 'on' : ''}" style="flex:1" data-act="pdfMode" data-v="text">📖 ${esc(t('pdfModeText'))}</button><button class="${R.mode === 'page' ? 'on' : ''}" style="flex:1" data-act="pdfMode" data-v="page">📄 ${esc(t('pdfModePage'))}</button></div>
      ${note ? `<section class="card" style="background:#FFF4D6;border:none;gap:4px"><b style="font-size:12px;color:#6B4E00">📝 ${esc(t('pdfNote'))}</b><span style="font-size:14px;white-space:pre-wrap">${esc(note)}</span></section>` : ''}
      <div id="pdfBody">${PS.loading(t('pdfRendering'))}</div>
      <div style="position:fixed;left:0;right:0;bottom:calc(74px + env(safe-area-inset-bottom));display:flex;justify-content:center;z-index:30;pointer-events:none">
        <div class="row" style="pointer-events:auto;gap:6px;background:#fff;border:1px solid #ECE7FA;border-radius:18px;padding:6px;box-shadow:0 6px 24px rgba(46,42,69,.15);max-width:460px;width:calc(100% - 24px)">
          <a class="iconbtn" style="width:40px;height:40px;border:none;${n > 1 ? '' : 'opacity:.3;pointer-events:none'}" href="#pdf/${id}/${n - 1}" aria-label="${esc(t('prev'))}">‹</a>
          <button class="btn soft sm" style="flex:1;padding:0 6px" data-act="pdfGoto" data-id="${id}" data-max="${d.pages}">${n}/${d.pages}</button>
          <button class="iconbtn" style="width:40px;height:40px;border:none;background:#FFF4D6" data-act="pdfNoteEdit" data-id="${id}" data-n="${n}" aria-label="${esc(t('pdfNote'))}">📝</button>
          <button class="iconbtn" style="width:40px;height:40px;border:none;background:#EEEAFE" data-act="pdfAsk" data-id="${id}" data-n="${n}" aria-label="AI">✨</button>
          <button class="iconbtn" style="width:40px;height:40px;border:none;background:#DDF4EA" data-act="pdfCard" data-id="${id}" data-n="${n}" aria-label="${esc(t('pdfMakeCard'))}">🗂</button>
          <a class="iconbtn" style="width:40px;height:40px;border:none;${n < d.pages ? '' : 'opacity:.3;pointer-events:none'}" href="#pdf/${id}/${n + 1}" aria-label="${esc(t('next'))}">›</a>
        </div></div></div>`;
  }
  async function fillPage(id, n) {
    const box = document.getElementById('pdfBody'); if (!box) return;
    try {
      const a = await ann(id);
      if (R.mode === 'page') {
        const doc = await openDoc(id), page = await doc.getPage(n), w = box.clientWidth || 360, base = page.getViewport({ scale: 1 }), scale = (w / base.width) * R.zoom, dpr = Math.min(window.devicePixelRatio || 1, 2.5), vp = page.getViewport({ scale: scale * dpr });
        const cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height; cv.style.width = (vp.width / dpr) + 'px'; cv.style.height = (vp.height / dpr) + 'px'; cv.style.display = 'block'; cv.style.borderRadius = '10px'; cv.style.background = '#fff';
        await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
        if (!document.body.contains(box)) return;
        box.innerHTML = `<div class="row" style="justify-content:flex-end;gap:6px;margin-bottom:6px"><button class="btn ghost sm" data-act="pdfZoom" data-v="-1">−</button><span class="small">${Math.round(R.zoom * 100)}%</span><button class="btn ghost sm" data-act="pdfZoom" data-v="1">+</button></div><div style="overflow:auto;-webkit-overflow-scrolling:touch;border-radius:10px;box-shadow:0 2px 12px rgba(46,42,69,.1)" id="pdfCanvasWrap"></div><span class="small center" style="display:block;margin-top:6px">${esc(t('pdfPageHint'))}</span>`;
        document.getElementById('pdfCanvasWrap').appendChild(cv);
        return;
      }
      const paras = await pageText(id, n), hl = new Set(a.hl[n] || []);
      if (!document.body.contains(box)) return;
      if (!paras.length) { box.innerHTML = `<section class="card" style="align-items:center;text-align:center"><b>${esc(t('pdfNoText'))}</b><span class="small">${esc(t('pdfNoTextSub'))}</span><button class="btn soft" data-act="pdfMode" data-v="page">📄 ${esc(t('pdfModePage'))}</button></section>`; return; }
      let w = 0;
      const html = paras.map((p) => `<p>${p.split(/(\s+)/).map((tok) => (/^\s+$/.test(tok) || !tok ? tok : `<span class="hw ${hl.has(w) ? 'on' : ''}" data-act="pdfHl" data-id="${id}" data-n="${n}" data-i="${w++}">${esc(tok)}</span>`)).join('')}</p>`).join('');
      box.innerHTML = `<article class="card read-mode psg" style="font-size:${S().pdfFont || 17}px;line-height:1.75">${html}
        <div class="between" style="font-family:Nunito,sans-serif;gap:6px"><span class="small">🖍 ${esc(t('pdfHlHint'))}</span><span class="row" style="gap:4px">${hl.size ? `<button class="btn ghost sm" data-act="pdfHlClear" data-id="${id}" data-n="${n}">${esc(t('hlClear'))}</button>` : ''}<button class="btn ghost sm" data-act="pdfFont" data-v="-1">A−</button><button class="btn ghost sm" data-act="pdfFont" data-v="1">A+</button></span></div></article>`;
    } catch (e) { if (document.body.contains(box)) box.innerHTML = `<section class="card">⚠ ${esc(e.message || String(e))}</section>`; }
  }
  A.pdfMode = (el) => { R.mode = el.dataset.v; PS.sheet(null); keep(); };
  A.pdfZoom = (el) => { R.zoom = Math.max(0.6, Math.min(3, R.zoom + (+el.dataset.v) * 0.25)); keep(); };
  A.pdfFont = (el) => { S().pdfFont = Math.max(14, Math.min(24, (S().pdfFont || 17) + (+el.dataset.v))); PS.save({ noSync: true }); keep(); };
  A.pdfHl = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, i = +el.dataset.i, a = await ann(id), arr = a.hl[n] || (a.hl[n] = []), k = arr.indexOf(i);
    if (k >= 0) arr.splice(k, 1); else arr.push(i);
    if (!arr.length) delete a.hl[n];
    el.classList.toggle('on', k < 0); saveAnn(id); countHl(id);
  };
  A.pdfHlClear = async (el) => { const a = await ann(el.dataset.id); delete a.hl[el.dataset.n]; saveAnn(el.dataset.id); countHl(el.dataset.id); keep(); };
  const countHl = (id) => { const d = META.find((x) => x.id === id), a = ANN[id]; if (d && a) { d.hls = Object.values(a.hl).reduce((s, arr) => s + snippetsFrom(arr.slice().sort((x, y) => x - y)).length, 0); saveMeta(); } };
  const snippetsFrom = (idx) => { const runs = []; idx.forEach((i) => { const r = runs[runs.length - 1]; if (r && i === r[1] + 1) r[1] = i; else runs.push([i, i]); }); return runs; };
  const words = (paras) => paras.join(' ').split(/\s+/).filter(Boolean);
  async function snippets(id, n) {
    const a = await ann(id), idx = (a.hl[n] || []).slice().sort((x, y) => x - y); if (!idx.length) return [];
    const w = words(await pageText(id, n));
    return snippetsFrom(idx).map(([s, e]) => w.slice(s, e + 1).join(' '));
  }
  A.pdfMark = async (el) => { const a = await ann(el.dataset.id), n = +el.dataset.n, k = a.marks.indexOf(n); if (k >= 0) a.marks.splice(k, 1); else a.marks.push(n); saveAnn(el.dataset.id); keep(); };
  A.pdfGoto = (el) => PS.sheet(`<h2 class="h2">${esc(t('pdfGotoQ', { n: el.dataset.max }))}</h2><input id="pdfGo" class="in" type="number" inputmode="numeric" min="1" max="${el.dataset.max}"><button class="btn" data-act="pdfGo" data-id="${el.dataset.id}" data-max="${el.dataset.max}">${esc(t('open'))}</button>`);
  A.pdfGo = (el) => { const v = parseInt(document.getElementById('pdfGo').value, 10); if (v >= 1 && v <= +el.dataset.max) { PS.sheet(null); PS.go('pdf/' + el.dataset.id + '/' + v); } };
  A.pdfNoteEdit = async (el) => {
    const a = await ann(el.dataset.id), n = el.dataset.n;
    PS.sheet(`<h2 class="h2">📝 ${esc(t('pdfNote'))} · ${esc(t('pdfPageOf', { a: n, b: '' })).replace(/\s*\/?\s*$/, '')}</h2><textarea id="pdfNoteTx" class="in" rows="7" placeholder="${esc(t('pdfNotePh'))}">${esc(a.notes[n] || '')}</textarea><button class="btn" data-act="pdfNoteSave" data-id="${el.dataset.id}" data-n="${n}">${esc(t('save'))}</button>`);
  };
  A.pdfNoteSave = async (el) => { const a = await ann(el.dataset.id), v = document.getElementById('pdfNoteTx').value.trim(); if (v) a.notes[el.dataset.n] = v; else delete a.notes[el.dataset.n]; saveAnn(el.dataset.id); PS.sheet(null); keep(); };

  /* ---------- Ask AI ---------- */
  A.pdfAsk = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, sn = await snippets(id, n);
    PS.sheet(`<h2 class="h2">✨ ${esc(t('pdfAskT'))}</h2>
      ${sn.length ? `<div class="drill" style="background:#FFF4D6;color:#5C4600"><b style="font-size:12px">🖍 ${esc(t('pdfYourHl'))}</b>${sn.map((s) => `<span style="font-size:14px">“${esc(s)}”</span>`).join('')}</div>` : `<span class="small">${esc(t('pdfNoHlYet'))}</span>`}
      <div class="stack" style="gap:6px">
        ${sn.length ? `<button class="btn soft" data-act="pdfAI" data-id="${id}" data-n="${n}" data-k="explain">💡 ${esc(t('pdfAIExplain'))}</button><button class="btn soft" data-act="pdfAI" data-id="${id}" data-n="${n}" data-k="translate">🇮🇩 ${esc(t('pdfAITranslate'))}</button>` : ''}
        <button class="btn soft" data-act="pdfAI" data-id="${id}" data-n="${n}" data-k="summary">📋 ${esc(t('pdfAISummary'))}</button>
        <button class="btn soft" data-act="pdfAI" data-id="${id}" data-n="${n}" data-k="apply">🏛 ${esc(t('pdfAIApply'))}</button>
        ${sn.some((s) => s.split(' ').length <= 4) ? `<button class="btn ghost" data-act="pdfToVocab" data-id="${id}" data-n="${n}">＋ ${esc(t('pdfHlToVocab'))}</button>` : ''}</div>
      <div class="field"><label class="lbl" for="pdfQ">${esc(t('pdfAskOwn'))}</label><textarea id="pdfQ" class="in" rows="2" placeholder="${esc(t('pdfAskPh'))}"></textarea></div>
      <button class="btn" data-act="pdfAI" data-id="${id}" data-n="${n}" data-k="own">${icon('spark', 20)}${esc(t('pdfAskBtn'))}</button>
      <div id="pdfAIout"></div>`);
  };
  A.pdfToVocab = async (el) => { const sn = await snippets(el.dataset.id, el.dataset.n); let c = 0; sn.filter((s) => s.split(' ').length <= 4).forEach((s) => { if (PS.LIB.toVocab(s.replace(/^[^\w]+|[^\w]+$/g, ''), '', '')) c++; }); };
  A.pdfAI = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, k = el.dataset.k, out = document.getElementById('pdfAIout');
    if (!PS.conn().url) { PS.toast(t('needBackend'), 3500); return; }
    const d = META.find((x) => x.id === id), paras = await pageText(id, n), sn = await snippets(id, n), page = paras.join('\n\n').slice(0, 7000);
    const q = k === 'own' ? (document.getElementById('pdfQ').value || '').trim() : '';
    if (k === 'own' && !q) { PS.toast(t('pdfAskPh')); return; }
    const task = { explain: 'Explain the highlighted passages simply and precisely, then give one concrete example.', translate: 'Translate the highlighted passages into natural Indonesian, then note any key term worth keeping in English.', summary: 'Summarise this page in 5 short bullet points, then one sentence: why it matters.', apply: 'Explain how the ideas on this page could be applied in a public financial regulator (HR, integrity, anti-fraud, governance). Give 3 practical applications.', own: 'Answer the question: ' + q }[k];
    out.innerHTML = PS.loading(); el.disabled = true;
    try {
      const ans = await PS.ai({ feature: 'pdf', max: 900, json: false, system: `You are a careful study assistant for Putri, an HR & anti-fraud professional at Indonesia's financial services authority (OJK) preparing a master's in HR. Base your answer on the page text; say so if the page does not contain the answer. Answer in ${k === 'translate' ? 'Indonesian' : PS.langName()}. Plain text, short paragraphs or "- " bullets, no markdown headings.`, prompt: `DOCUMENT: ${d.title}, page ${n}\nPAGE TEXT:\n${page}\n${sn.length ? 'HIGHLIGHTED: ' + sn.map((s) => '"' + s + '"').join(' | ') + '\n' : ''}TASK: ${task}` });
      out.innerHTML = `<div style="white-space:pre-wrap;font-size:14.5px;line-height:1.55;background:#FAF7FF;border-radius:14px;padding:12px">${esc(ans)}</div><button class="btn soft sm" data-act="pdfAIToNote" data-id="${id}" data-n="${n}">📝 ${esc(t('pdfSaveToNote'))}</button>`;
      out.dataset.ans = ans;
    } catch (e) { out.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; }
    el.disabled = false;
  };
  A.pdfAIToNote = async (el) => { const a = await ann(el.dataset.id), n = el.dataset.n, ans = document.getElementById('pdfAIout').dataset.ans || ''; a.notes[n] = (a.notes[n] ? a.notes[n] + '\n\n' : '') + '✨ ' + ans; saveAnn(el.dataset.id); PS.toast(t('saved')); };

  /* ---------- save as HR card ---------- */
  A.pdfCard = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, sn = await snippets(id, n), d = META.find((x) => x.id === id), a = await ann(id);
    const topics = Object.keys(C().HR_TOPICS).map((k) => `<option value="${k}">${k} · ${esc(PS.L(C().HR_TOPICS[k]))}</option>`).join('');
    PS.sheet(`<h2 class="h2">🗂 ${esc(t('pdfMakeCard'))}</h2><span class="small">${esc(t('pdfCardSub'))}</span>
      <div class="field"><label class="lbl" for="pcTopic">${esc(t('pdfCardTopic'))}</label><select id="pcTopic" class="in">${topics}</select></div>
      <div class="field"><label class="lbl" for="pcTitle">${esc(t('pdfCardTitle'))}</label><input id="pcTitle" class="in" placeholder="${esc(t('pdfCardTitlePh'))}"></div>
      ${sn.length ? `<div class="drill" style="background:#FFF4D6;color:#5C4600"><b style="font-size:12px">🖍 ${esc(t('pdfYourHl'))} (${sn.length})</b>${sn.slice(0, 6).map((s) => `<span style="font-size:13.5px">“${esc(s)}”</span>`).join('')}</div>` : `<span class="small">${esc(t('pdfNoHlYet'))}</span>`}
      <button class="btn" data-act="pdfCardAI" data-id="${id}" data-n="${n}">${icon('spark', 20)}${esc(t('pdfCardAI'))}</button>
      <button class="btn soft" data-act="pdfCardManual" data-id="${id}" data-n="${n}" ${sn.length ? '' : 'disabled'}>${esc(t('pdfCardManual'))}</button><div id="pcOut"></div>`);
  };
  const cardBase = (id, n) => { const d = META.find((x) => x.id === id); return { topic: +document.getElementById('pcTopic').value || 1, sources: `${d.title}, p. ${n} (Mode Baca)`, src: 'Mode Baca PDF' }; };
  A.pdfCardManual = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, sn = await snippets(id, n), a = await ann(id), title = document.getElementById('pcTitle').value.trim() || sn[0].split(' ').slice(0, 8).join(' ');
    PS.importCards({ cards: [Object.assign(cardBase(id, n), { id: 'c' + PS.uid(), title, key: sn[0], points: sn.slice(1), practice: a.notes[n] || '', quiz: [] })] });
  };
  A.pdfCardAI = async (el) => {
    const id = el.dataset.id, n = el.dataset.n, out = document.getElementById('pcOut');
    if (!PS.conn().url) { PS.toast(t('needBackend'), 3500); return; }
    const d = META.find((x) => x.id === id), paras = await pageText(id, n), sn = await snippets(id, n), a = await ann(id), title = document.getElementById('pcTitle').value.trim(), base = cardBase(id, n);
    el.disabled = true; out.innerHTML = PS.loading();
    try {
      const r = await PS.ai({ feature: 'pdf', max: 1400, system: 'You turn reading into concise HR learning cards for Putri (HR & anti-fraud professional at OJK, Indonesia). English. Stay faithful to the source text; do not invent studies or numbers.', prompt: `SOURCE: ${d.title}, page ${n}\nTEXT:\n${paras.join('\n\n').slice(0, 7000)}\n${sn.length ? 'HIGHLIGHTED (focus on these): ' + sn.join(' | ') + '\n' : ''}${a.notes[n] ? 'HER NOTE: ' + a.notes[n] + '\n' : ''}${title ? 'CARD TITLE: ' + title + '\n' : ''}Return JSON {"title":"short concept name","subtitle":"one line","key":"2-3 sentence key idea","points":["4-5 key points"],"practice":"how it applies in a public-sector HR / integrity context, 2-3 sentences","terms":"3-5 key terms with short definitions, separated by · ","quiz":[{"q":"","a":""},{"q":"","a":""}]}` });
      PS.importCards({ cards: [Object.assign(base, { id: 'c' + PS.uid(), title: title || r.title, subtitle: r.subtitle || '', key: r.key || '', points: r.points || [], practice: r.practice || '', terms: r.terms || '', quiz: r.quiz || [] })] });
    } catch (e) { out.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; el.disabled = false; }
  };

  /* ---------- all highlights & notes of a document ---------- */
  function hlView(id) {
    const d = META.find((x) => x.id === id); if (!d) return libView();
    setTimeout(async () => {
      const box = document.getElementById('pdfHlList'), a = await ann(id);
      const pages = [...new Set(Object.keys(a.hl).concat(Object.keys(a.notes)).concat(a.marks.map(String)))].map(Number).sort((x, y) => x - y);
      if (!pages.length) { if (box) box.innerHTML = `<span class="small">${esc(t('pdfNoHlAll'))}</span>`; return; }
      const parts = [];
      for (const n of pages) { const sn = a.hl[n] ? await snippets(id, n) : []; parts.push(`<a class="card" href="#pdf/${id}/${n}" style="text-decoration:none;color:inherit;gap:6px"><b style="font-size:13px;color:#4B3DB0">${a.marks.includes(n) ? '🔖 ' : ''}${esc(t('pdfPageOf', { a: n, b: d.pages }))}</b>${sn.map((s) => `<span style="font-size:14.5px;background:#FFF4D6;border-radius:6px;padding:2px 6px">“${esc(s)}”</span>`).join('')}${a.notes[n] ? `<span style="font-size:13.5px;white-space:pre-wrap;color:#5C4600">📝 ${esc(a.notes[n])}</span>` : ''}</a>`); }
      if (box) box.innerHTML = parts.join('');
    }, 0);
    return `<div class="page">${PS.back('#pdf', `<span style="font-size:12px;color:#4B3DB0;display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(t('pdfMyHl'))}</span>${esc(d.title)}`)}<div id="pdfHlList" class="stack" style="gap:8px">${PS.loading()}</div></div>`;
  }
  PS.pdfCount = () => (META ? META.length : null);
})();
