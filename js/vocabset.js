/* Putri Space · Vocabulary Sets (IELTS Academic, built-in content, no AI needed) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, LIB = PS.LIB;
  const { esc, ic, icon } = PS;
  const t = PS.t, S = () => PS.S();
  const D = () => window.PS_VOCAB || { lessons: [], sets: [] };
  const cfg = LIB.reg.vset = { ns: 'vset', srcName: 'Vocabulary Sets', route: 'vset', img: 'img/vocab/', ink: '#6B4E00', bg: '#FFF4D6', mistakes: true, reasons: null, mark: 'review', find: (id) => D().lessons.find((x) => x.id === id), exImg: () => false, exPassageLabel: '' };
  const VS = () => { const s = S(); s.vset = s.vset || {}; s.vset.known = s.vset.known || {}; return s.vset; };

  /* sets = built-in topic sets + sets collected from the Listening and Reading libraries */
  const allSets = () => {
    const out = D().sets.slice();
    const collect = (lessons, id, title, iconName, bg, ink, src) => { const items = []; (lessons || []).forEach((x) => (x.vocab || []).forEach(([w, m]) => items.push([w, m, '', x.code]))); if (items.length) out.push({ id, title, icon: iconName, bg, ink, src, items }); };
    collect(window.PS_LISTEN && window.PS_LISTEN.lessons, 'lis', t('setListening'), 'listening', '#E0EEFF', '#2B5C99', 'Section B · B1–B8');
    collect(window.PS_READ && window.PS_READ.lessons, 'rdg', t('setReading'), 'reading', '#DDF4EA', '#1F6E55', 'Section C · C1–C11');
    return out;
  };
  const known = (setId) => VS().known[setId] || [];
  PS.vsetProgress = () => { const sets = allSets(); let n = 0, k = 0; sets.forEach((s) => { n += s.items.length; k += s.items.filter((it) => known(s.id).includes(it[0])).length; }); return { total: n, known: k, sets: sets.length, lessons: D().lessons.length }; };

  V.vset = function (p) {
    if (p[0] === 'set') return setView(p[1]);
    const x = p[0] && cfg.find(p[0]);
    if (x) {
      const tab = p[1] || 'learn';
      const body = tab === 'ex' ? LIB.example(cfg, x) : tab === 'pr' ? LIB.practice(cfg, x) : tab === 'words' ? LIB.words(cfg, x) : LIB.learn(cfg, x);
      return LIB.frame(Object.assign({}, cfg, { ink: '#9A4A22' }), x, tab, body, D().lessons);
    }
    const pr = PS.vsetProgress();
    return `<div class="page">${PS.back('#english', esc(t('libVocab')), `<span class="pill" style="background:#FFF4D6;color:#6B4E00">${pr.known}/${pr.total}</span>`)}
      <section class="hero" style="background:#F2C14E"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800;color:#5C4600">IELTS Academic · Lexical Resource + Grammar</span><span class="big" style="font-size:18px;color:#3E2F00">${esc(t('vsetHero'))}</span><span style="font-size:12.5px;font-weight:700;color:#5C4600">${esc(t('vsetHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      <div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:#6B4E00;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">S</span><h2 class="h2" style="color:#6B4E00;font-size:17px">${esc(t('vsetSets'))}</h2></div>
      <section class="grid2">${allSets().map((s) => { const k = s.items.filter((it) => known(s.id).includes(it[0])).length; return `<a class="tile" href="#vset/set/${s.id}" style="min-height:118px">${ic(s.icon, s.bg, 'sm')}<span class="t" style="font-size:13.5px;line-height:1.25">${esc(s.title)}</span><span class="s">${k}/${s.items.length} ${esc(t('memorised'))}</span><div class="bar" style="background:${s.bg};height:6px"><i style="width:${Math.round((k / s.items.length) * 100)}%;background:${s.ink}"></i></div></a>`; }).join('')}</section>
      <div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:#9A4A22;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">G</span><h2 class="h2" style="color:#9A4A22;font-size:17px">${esc(t('vsetLessons'))}</h2></div>
      <section class="stack" style="gap:8px">${D().lessons.map((x) => LIB.tile(cfg, x, '#FFE6D9', '#9A4A22')).join('')}</section>
      <a class="tile h" href="#vocab">${ic('vocab', '#DDF4EA', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('geVocab'))}</span><span class="s">${esc(t('myVocabLink', { n: S().vocab.length }))}</span></span></a>
      <span class="small center">${esc(t('fromStudyBookV'))}</span></div>`;
  };

  /* ---------- a set: list + flashcards ---------- */
  const fc = {};
  function setView(id) {
    const s = allSets().find((x) => x.id === id); if (!s) return V.vset([]);
    const kn = known(id), f = fc[id];
    const head = PS.back('#vset', `<span style="font-size:12px;color:${s.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(s.src)}</span>${esc(s.title)}`, `<span class="pill" style="background:${s.bg};color:${s.ink}">${kn.filter((w) => s.items.some((it) => it[0] === w)).length}/${s.items.length}</span>`);
    if (f && f.i < f.order.length) {
      const it = s.items[f.order[f.i]];
      return `<div class="page">${head}
        <div class="between"><span class="small">${f.i + 1}/${f.order.length}</span><button class="btn ghost sm" data-act="vsStop" data-id="${id}">✕ ${esc(t('close'))}</button></div>
        <button class="card" data-act="vsFlip" data-id="${id}" style="min-height:220px;align-items:center;justify-content:center;text-align:center;background:${f.show ? '#fff' : s.bg};border:${f.show ? '1.5px solid ' + s.ink : 'none'};cursor:pointer;font:inherit">
          <b style="font-family:Fredoka,Nunito,sans-serif;font-size:24px;line-height:1.3;color:#2E2A45">${esc(it[0])}</b>
          ${f.show ? `<span style="font-size:16px;color:#4F4A68">${esc(it[1])}</span>${it[2] ? `<span class="small" style="font-style:italic">"${esc(it[2])}"</span>` : ''}` : `<span class="small">${esc(t('tapToFlip'))}</span>`}</button>
        <div class="row"><button class="btn soft" style="flex:1" data-act="say" data-text="${esc(it[2] || it[0].split(' → ')[0])}">${icon('speaker', 20)}${esc(t('listen'))}</button><button class="btn ghost" data-act="lbToVocab" data-w="${esc(it[0])}" data-m="${esc(it[1])}" data-ex="${esc(it[2] || '')}">＋ ${esc(t('myVocabShort'))}</button></div>
        ${f.show ? `<div class="row"><button class="btn mint" style="flex:1" data-act="vsGrade" data-id="${id}" data-ok="1">${esc(t('gotIt'))}</button><button class="btn rose" style="flex:1" data-act="vsGrade" data-id="${id}" data-ok="0">${esc(t('notYet'))}</button></div>` : ''}</div>`;
    }
    const done = f && f.i >= f.order.length;
    return `<div class="page">${head}
      ${done ? `<section class="card" style="align-items:center;text-align:center">${PS.owl(true, 64)}<b>${esc(t('setDone', { a: f.ok, b: f.order.length }))}</b></section>` : ''}
      <div class="row"><button class="btn" style="flex:1" data-act="vsStart" data-id="${id}" data-mode="todo">${icon('vocab', 20)}${esc(t('flashTodo', { n: s.items.filter((it) => !kn.includes(it[0])).length }))}</button><button class="btn soft" data-act="vsStart" data-id="${id}" data-mode="all">${esc(t('flashAll'))}</button></div>
      <section class="card" style="gap:4px">${s.items.map((it) => { const on = kn.includes(it[0]); return `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><button class="iconbtn" style="width:30px;height:30px;flex-shrink:0;border:none;background:${on ? '#DDF4EA' : '#F3F0FF'};font-size:14px;font-weight:800;color:#1F6E55" data-act="vsKnown" data-id="${id}" data-w="${esc(it[0])}" aria-label="${esc(t('memorised'))}">${on ? '✓' : ''}</button><span class="stack grow" style="gap:1px"><b style="font-size:14.5px">${esc(it[0])}${it[3] ? ` <span class="small">${esc(it[3])}</span>` : ''}</b><span class="small">${esc(it[1])}</span>${it[2] ? `<span class="small" style="font-style:italic">"${esc(it[2])}"</span>` : ''}</span><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0" data-act="say" data-text="${esc(it[2] || it[0].split(' → ')[0])}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0;font-weight:800;color:#1F6E55" data-act="lbToVocab" data-w="${esc(it[0])}" data-m="${esc(it[1])}" data-ex="${esc(it[2] || '')}" aria-label="${esc(t('addToMyVocab'))}">＋</button></div>`; }).join('')}</section>
      <span class="small">✓ = ${esc(t('memorised'))} · ＋ = ${esc(t('addToMyVocab'))}</span>
      <section class="card" style="border:1.5px dashed #B3A8EC"><b style="font-size:14px">✍️ ${esc(t('ownSentenceT'))}</b><span class="small">${esc(t('ownSentenceSub'))}</span><a class="btn soft sm" href="#check" style="align-self:flex-start">${icon('check', 18)}${esc(t('geCheck'))}</a></section></div>`;
  }
  A.vsStart = (el) => {
    const id = el.dataset.id, s = allSets().find((x) => x.id === id), kn = known(id);
    let order = s.items.map((it, i) => i); if (el.dataset.mode === 'todo') order = order.filter((i) => !kn.includes(s.items[i][0]));
    if (!order.length) { PS.toast(t('allMemorised')); return; }
    fc[id] = { order: PS.shuffle(order), i: 0, show: false, ok: 0 }; PS.render();
  };
  A.vsFlip = (el) => { const f = fc[el.dataset.id]; if (f) { f.show = !f.show; LIB.keep(); } };
  A.vsStop = (el) => { delete fc[el.dataset.id]; PS.render(); };
  const setKnown = (id, w, on) => { const v = VS(); const arr = (v.known[id] = v.known[id] || []); const i = arr.indexOf(w); if (on && i < 0) arr.push(w); if (!on && i >= 0) arr.splice(i, 1); };
  A.vsGrade = (el) => {
    const id = el.dataset.id, f = fc[id], s = allSets().find((x) => x.id === id), it = s.items[f.order[f.i]], ok = el.dataset.ok === '1';
    setKnown(id, it[0], ok); if (ok) f.ok++; f.i++; f.show = false; PS.mark('review'); PS.save(); PS.render();
  };
  A.vsKnown = (el) => { const id = el.dataset.id, w = el.dataset.w; setKnown(id, w, !known(id).includes(w)); PS.save(); LIB.keep(); };
})();
