/* Putri Space · Writing Models (IELTS Academic Task 1 & 2, built-in content; AI only for optional scoring) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs, LIB = PS.LIB;
  const { esc, ic, icon } = PS;
  const t = PS.t, S = () => PS.S();
  const D = () => window.PS_WRITE || { lessons: [], essays: [], top: {}, topNotes: {} };
  const cfg = LIB.reg.wmod = { ns: 'wmod', srcName: 'Writing Models', route: 'wmod', img: 'img/write/', ink: '#9A4A22', bg: '#FFE6D9', mistakes: true, reasons: null, mark: 'ieltsW', find: (id) => D().lessons.find((x) => x.id === id) };
  const WS = () => { const s = S(); s.wmod = s.wmod || {}; const w = s.wmod; w.drafts = w.drafts || {}; w.done = w.done || {}; w.notes = w.notes || {}; return w; };
  const doneMark = (id) => { const w = WS(); if (!w.done[id]) { w.done[id] = { score: 1, total: 1, best: 1, date: PS.dayKey(), n: 1 }; PS.save(); } };
  PS.wmodProgress = () => { const d = WS().done, all = D().lessons.concat(D().essays); return { total: all.length, done: all.filter((x) => d[x.id]).length }; };
  const wc = (s) => (String(s || '').trim() ? String(s).trim().split(/\s+/).length : 0);

  /* annotated model answer: [n] → badge, margin tips below */
  const badge = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;background:#9A4A22;color:#fff;font:800 10.5px Nunito,sans-serif;vertical-align:2px;margin:0 2px">${n}</span>`;
  const annotated = (paras, margin, words, label) => `<article class="card read-mode" style="font-size:16px;line-height:1.7;gap:10px"><div class="between" style="font-family:Nunito,sans-serif"><span class="small" style="color:#9A4A22;font-weight:800">${esc(label)}${words ? ' · ≈ ' + esc(words) + ' ' + esc(t('words')) : ''}</span><button class="iconbtn" style="width:34px;height:34px;border:none;background:#FFE6D9" data-act="say" data-text="${esc(paras.join(' ').replace(/\[\d\]/g, ''))}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button></div>
      ${paras.map((p) => `<p style="margin:0">${esc(p).replace(/\[(\d)\]/g, (m, n) => badge(n))}</p>`).join('')}</article>
    ${margin && margin.length ? `<section class="card" style="background:#FFE6D9;border:none;gap:6px"><b style="font-size:13px;color:#9A4A22">📝 ${esc(t('marginTips'))}</b>${margin.map(([n, s]) => `<div class="row" style="align-items:flex-start;gap:8px">${badge(n)}<span style="font-size:14px;color:#4F2A12">${esc(s)}</span></div>`).join('')}</section>` : ''}`;

  /* ================= hub ================= */
  V.wmod = function (p) {
    if (p[0] === 'top') { const k = p[1] === 'e12' ? 'e12' : 'd10'; return LIB.top30(Object.assign({}, cfg, { ns: 'wmod' + k, top30Title: k === 'd10' ? 'top20T1' : 'top20T2' }), D().top[k] || [], D().topNotes[k] || '', k.toUpperCase(), k === 'd10' ? 81 : 107); }
    if (p[0] === 'essay') return essayView(p[1]);
    const x = p[0] && cfg.find(p[0]);
    if (x) {
      const tab = p[1] || 'learn';
      const body = tab === 'ex' ? exView(x) : tab === 'pr' ? (x.practice ? LIB.practice(cfg, x) : writeView(x)) : tab === 'words' ? LIB.words(cfg, x) : LIB.learn(cfg, x);
      if (tab === 'pr' && x.practice) doneMark(x.id);
      return LIB.frame(cfg, x, tab, body, D().lessons);
    }
    const pr = PS.wmodProgress(), dn = WS().done;
    const tile = (x) => { const d = dn[x.id]; return `<a class="tile h" href="#wmod/${x.question ? 'essay/' : ''}${x.id}"><span class="ic sm" style="background:${d ? '#DDF4EA' : '#FFE6D9'};padding:6px"><img src="${esc(cfg.img + x.id + '-icon.webp')}" alt="" style="width:100%;height:100%;object-fit:contain" onerror="this.replaceWith(document.createTextNode('${esc(x.code)}'))"></span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(x.code)} · ${esc(x.title)}</span><span class="s">${esc(x.sub)}</span></span>${d ? '<span class="pill" style="background:#DDF4EA;color:#1F6E55">✓</span>' : ''}</a>`; };
    const head = (code, ink, label) => `<div class="row" style="margin-top:4px"><span style="min-width:26px;height:26px;padding:0 6px;border-radius:9px;background:${ink};color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center">${code}</span><h2 class="h2" style="color:${ink};font-size:17px">${esc(label)}</h2></div>`;
    const topTile = (k, title) => `<a class="tile h" href="#wmod/top/${k}" style="background:#DDF4EA;border:none">${ic('star', '#fff', 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${k.toUpperCase()} · ${esc(t(title))}</span><span class="s" style="color:#1F6E55">${esc(t('top20Sub'))}</span></span></a>`;
    return `<div class="page">${PS.back('#english', esc(t('libWriting')), `<span class="pill" style="background:#FFE6D9;color:#9A4A22">${pr.done}/${pr.total}</span>`)}
      <section class="hero" style="background:#F2A07B"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">IELTS Academic · 60 min · Task 1 + Task 2</span><span class="big" style="font-size:18px">${esc(t('wmodHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('wmodHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      ${head('T1', '#2B5C99', t('wmodT1'))}<span class="small">${esc(t('wmodT1Sub'))}</span>
      <section class="stack" style="gap:8px">${D().lessons.filter((x) => x.task === 'D').map(tile).join('')}${topTile('d10', 'top20T1')}</section>
      ${head('T2', '#8E3049', t('wmodT2'))}<span class="small">${esc(t('wmodT2Sub'))}</span>
      <section class="stack" style="gap:8px">${D().lessons.filter((x) => x.task === 'E').map(tile).join('')}</section>
      ${head('★', '#9A4A22', t('wmodEssays'))}
      <section class="stack" style="gap:8px">${D().essays.map(tile).join('')}${topTile('e12', 'top20T2')}</section>
      <a class="tile h" href="#ielts/W">${ic('spark', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('aiListeningMore'))}</span><span class="s">${esc(t('aiWritingMoreSub'))}</span></span></a>
      <span class="small center">${esc(t('fromStudyBookW'))}</span></div>`;
  };

  /* ================= worked example ================= */
  const exStep = {};
  function exView(x) {
    const e = x.ex, n = exStep[x.id] || 0;
    return `<section class="card"><span class="small" style="color:#9A4A22">${esc(t('workedEx'))}</span><b style="font-size:14.5px;line-height:1.5">${esc(e.q)}</b>${e.chart ? LIB.pic(cfg.img + x.id + '-ex.webp', e.q) : ''}</section>
      <section class="card"><h2 class="h2" style="font-size:16px">🧭 ${esc(t('walkT'))}</h2>
        ${e.walk.slice(0, n).map(([s, tip], j) => `<div class="stack" style="gap:6px"><b style="font-size:14.5px">${j + 1}. ${esc(s)}</b>${tip ? `<div class="drill" style="padding:9px 12px"><b style="font-size:11px;letter-spacing:.05em">TIP IN ACTION</b><span style="font-size:14px">${esc(tip)}</span></div>` : ''}</div>`).join('')}
        ${n < e.walk.length ? `<button class="btn soft" data-act="wmStep" data-id="${x.id}">${esc(n ? t('nextStep') : t('startWalk'))} (${n + 1}/${e.walk.length})</button>` : `${e.answer ? `<div class="right"><span>✓</span><b>${esc(e.answer)}</b></div>` : ''}<button class="btn ghost sm" data-act="wmStepReset" data-id="${x.id}">${esc(t('again'))}</button>`}</section>
      ${e.model && e.model.length ? annotated(e.model, e.margin, e.modelWords, t('bandModel')) : ''}
      <a class="btn" href="#wmod/${x.id}/pr">${esc(t('tabPractice'))} ›</a>`;
  }
  A.wmStep = (el) => { exStep[el.dataset.id] = (exStep[el.dataset.id] || 0) + 1; LIB.keep(); };
  A.wmStepReset = (el) => { exStep[el.dataset.id] = 0; LIB.keep(); };

  /* ================= writing practice ================= */
  const ui = {};
  function writeView(x) {
    const w = x.write, u = ui[x.id] || (ui[x.id] = { show: false, checks: {} }), draft = WS().drafts[x.id] || '', task = x.task === 'D' ? 't1' : 't2';
    const n = wc(draft), mins = w.mins || (task === 't1' ? 20 : 40);
    const model = u.show ? (w.model ? annotated(splitModel(w.model), [], '', t('modelAns'))
      : `<section class="card" style="background:#DDF4EA;border:none;gap:8px"><b style="color:#1F6E55">${esc(t('modelPlanT'))}</b>${(w.key || []).map((k) => `<div style="font-size:14.5px;line-height:1.55;color:#164F3D">${esc(k)}</div>`).join('')}</section>`) : '';
    return `<section class="card"><div class="between"><span class="small" style="color:#9A4A22">${esc(t('practiceT'))} · ${task === 't1' ? 'Task 1' : 'Task 2'}</span><button class="btn soft sm" data-act="timer" data-m="${mins}" id="timerBtn">⏱ ${mins}:00</button></div>
        <b style="font-size:14.5px;line-height:1.45">${esc(w.instr)}</b>${w.title ? `<span style="font-size:14px">${esc(w.title)}</span>` : ''}${w.chart ? LIB.pic(cfg.img + x.id + '-pr.webp', w.title) : ''}
        <ol style="margin:0;padding-left:22px">${w.prompts.map((p) => `<li style="margin:4px 0;font-size:14.5px">${esc(p.q)}${p.tag ? ` <span class="pill" style="background:#FFF4D6;color:#6B4E00;font-size:11.5px">${esc(p.tag)}</span>` : ''}</li>`).join('')}</ol></section>
      <section class="card"><div class="between"><label class="lbl" for="wmDraft">${esc(t('yourAnswer'))}</label><span class="small" id="wmWc" style="font-weight:800;color:${n >= (w.minWords || 0) ? '#1F6E55' : '#9A4A22'}">${n}${w.minWords ? ' / ' + w.minWords + '+' : ''} ${esc(t('words'))}</span></div>
        <textarea id="wmDraft" class="in" rows="12" data-in="wmDraft" data-id="${x.id}" data-min="${w.minWords || 0}" data-nofocus="1" placeholder="${esc(t('startWriting'))}">${esc(draft)}</textarea>
        <span class="small">${esc(t('draftSavedHint'))}</span></section>
      <section class="card" style="gap:6px"><b style="font-size:14px">✅ ${esc(t('selfCheckT'))}</b>${x.quick.concat(x.killers.map((k) => t('avoidX', { x: k }))).map((c, i) => `<label class="row" style="align-items:flex-start;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" data-act="wmCheck" data-id="${x.id}" data-i="${i}" ${u.checks[i] ? 'checked' : ''} style="width:20px;height:20px;accent-color:#9A4A22;flex-shrink:0;margin-top:1px"><span>${esc(c)}</span></label>`).join('')}</section>
      <div class="row"><button class="btn soft" style="flex:1" data-act="wmShow" data-id="${x.id}">${esc(u.show ? t('hideModel') : (w.model ? t('showModel') : t('showModelPlan')))}</button><button class="btn" style="flex:1" data-act="wmGrade" data-id="${x.id}">${icon('spark', 20)}${esc(t('scoreWithAI'))}</button></div>
      ${model}<div id="wmResult"></div>`;
  }
  const splitModel = (txt) => {
    const s = String(txt).trim(), i = s.indexOf(' Overall');
    if (i < 0) return [s];
    const intro = s.slice(0, i).trim(), sents = s.slice(i + 1).match(/[^.!?]+[.!?]+(?=\s|$)/g) || [s.slice(i + 1)];
    const ov = [sents[0].trim()]; let k = 1;
    while (k < sents.length && ov.length < 2 && !/^\s*(In \d{4}|In 20|First|Among|By \d{4}|The park|The airport)/.test(sents[k])) ov.push(sents[k++].trim());
    const body = sents.slice(k).map((x) => x.trim()), half = Math.ceil(body.length / 2);
    return [intro, ov.join(' '), body.slice(0, half).join(' '), body.slice(half).join(' ')].filter(Boolean);
  };
  IN.wmDraft = (el) => {
    WS().drafts[el.dataset.id] = el.value; clearTimeout(PS._wmd); PS._wmd = setTimeout(() => PS.save(), 900);
    const n = wc(el.value), min = +el.dataset.min, o = document.getElementById('wmWc'); if (o) { o.textContent = n + (min ? ' / ' + min + '+' : '') + ' ' + t('words'); o.style.color = n >= min ? '#1F6E55' : '#9A4A22'; }
  };
  A.wmCheck = (el) => { const u = ui[el.dataset.id] || (ui[el.dataset.id] = { show: false, checks: {} }); u.checks[el.dataset.i] = el.checked; };
  A.wmShow = (el) => { const u = ui[el.dataset.id]; u.show = !u.show; if (u.show) doneMark(el.dataset.id); LIB.keep(); };
  A.wmGrade = async (el) => {
    const x = cfg.find(el.dataset.id), w = x.write, essay = (WS().drafts[x.id] || '').trim(), task = x.task === 'D' ? 't1' : 't2';
    if (wc(essay) < 40) { PS.toast(t('tooShort')); return; }
    if (!PS.conn().url) { PS.toast(t('needBackend'), 3500); return; }
    const out = document.getElementById('wmResult'); el.disabled = true; out.innerHTML = PS.loading(t('scoring'));
    const prompt = task === 't1' ? `${w.instr} Chart: ${w.title}.` : w.question;
    const ref = task === 't1' ? 'Model description of the same chart: ' + (w.model || '') : 'Book plan and openings: ' + (w.key || []).join(' | ');
    try { const r = await PS.gradeWriting(task, prompt, essay, ref); doneMark(x.id); out.innerHTML = PS.writingResult(r); }
    catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };

  /* ================= model essays E8–E11 ================= */
  function essayView(id) {
    const e = D().essays.find((x) => x.id === id); if (!e) return V.wmod([]);
    doneMark(e.id);
    const i = D().essays.indexOf(e), L = D().essays;
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#wmod', `<span style="font-size:12px;color:#9A4A22;display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(e.code)} · ${esc(t('bookPage', { n: e.page }))}</span>${esc(e.title)}`)}
      <section class="card" style="background:#FFE6D9;border:none"><span class="small" style="color:#9A4A22;font-weight:800">QUESTION · ${esc(e.sub)}</span><b style="font-size:15px;line-height:1.5">${esc(e.question)}</b></section>
      <section class="card"><h2 class="h2" style="font-size:16px">🗺 ${esc(t('plan10'))}</h2>${e.plan.map((p) => { const [h, ...r] = p.split(':'); return `<div style="font-size:14.5px"><b>${esc(h)}:</b>${esc(r.join(':'))}</div>`; }).join('')}</section>
      ${annotated(e.model, e.margin, e.modelWords, t('bandModelEssay'))}
      <section class="card"><h2 class="h2" style="font-size:16px">🔤 ${esc(t('stealVocab'))}</h2>${e.vocab.map(([w, m]) => `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><span class="stack grow" style="gap:1px"><b style="font-size:14.5px">${esc(w)}</b><span class="small">${esc(m)}</span></span><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0" data-act="say" data-text="${esc(w)}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0;font-weight:800;color:#1F6E55" data-act="lbToVocab" data-w="${esc(w)}" data-m="${esc(m)}" aria-label="${esc(t('addToMyVocab'))}">＋</button></div>`).join('')}</section>
      <section class="card" style="border:1.5px dashed #B3A8EC"><label class="lbl" for="wmThesis">✍️ ${esc(t('ownThesis'))}</label><textarea id="wmThesis" class="in" rows="3" data-in="wmThesis" data-id="${e.id}" data-nofocus="1" placeholder="${esc(t('ownThesisPh'))}">${esc(WS().notes[e.id] || '')}</textarea><a class="btn soft sm" href="#check" style="align-self:flex-start">${icon('check', 18)}${esc(t('geCheck'))}</a></section>
      <div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#wmod/essay/${i > 0 ? L[i - 1].id : ''}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${L.length}</span><a class="btn ghost sm" style="flex:1" href="#wmod/${i < L.length - 1 ? 'essay/' + L[i + 1].id : 'top/e12'}">${esc(t('next'))} ›</a></div></div>`;
  }
  IN.wmThesis = (el) => { WS().notes[el.dataset.id] = el.value; clearTimeout(PS._wmt); PS._wmt = setTimeout(() => PS.save(), 800); };
})();
