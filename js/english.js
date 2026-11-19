/* Putri Space · English & IELTS · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, C = PS.C, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, ic, icon, dayKey, addDays } = PS;
  const t = PS.t, S = () => PS.S();
  const SK = { L: ['listening', '#E0EEFF', '#2B5C99', '#6FA4EE'], R: ['reading', '#DDF4EA', '#1F6E55', '#5BBF97'], W: ['writing', '#FFE6D9', '#9A4A22', '#E8875A'], S: ['speaking', '#FCE4EA', '#8E3049', '#E0708F'] };
  const SKNAME = { L: 'Listening', R: 'Reading', W: 'Writing', S: 'Speaking' };
  const CATS = ['Tenses', 'Preposition', 'Article', 'Word choice', 'Word form', 'Agreement', 'Spelling', 'Punctuation', 'Other'];
  const BOX = [0, 1, 3, 7, 14];
  const coach = () => `You are a warm, precise English and IELTS coach for Putri, an Indonesian public-sector professional (IELTS overall 6.5; Writing 6.0, Speaking 6.0) preparing for a master's degree in HRM abroad. Write every explanation, comment and tip in ${PS.langName()}. Keep English examples in English. Return ONLY valid JSON, no markdown.`;

  /* ---------- mistakes engine ---------- */
  PS.addMistake = function (m) {
    const s = S();
    const item = Object.assign({ id: PS.uid(), date: dayKey(), box: 0, due: dayKey(), reps: 0, mastered: false, source: 'check' }, m);
    if (!item.original || !item.corrected || PS.norm(item.original) === PS.norm(item.corrected)) return null;
    if (s.mistakes.some((x) => PS.norm(x.original) === PS.norm(item.original))) return null;
    s.mistakes.unshift(item);
    return item;
  };
  PS.dueMistakes = () => S().mistakes.filter((m) => !m.mastered && m.due <= dayKey());
  const repeatCount = (m) => S().mistakes.filter((x) => x.pattern && m.pattern && x.pattern.toLowerCase() === m.pattern.toLowerCase()).length;
  const resultFromAI = (r, source) => ({ original: r.original, corrected: r.corrected, category: CATS.includes(r.category) ? r.category : 'Other', pattern: r.pattern || '', explanation: r.explanation || '', tip: r.tip || '', drill: r.drill && r.drill.q ? r.drill : null, source });

  const correctionCard = (r, saved) => {
    const d = PS.diff(r.original, r.corrected);
    return `<div class="card">
      ${r.correct ? `<div class="row">${PS.owl(true, 34)}<b style="font-size:15px">${esc(t('perfect'))}</b></div><div class="right">${esc(r.original)}</div>` :
      `<div class="wrong"><span aria-hidden="true">✕</span><span>${d.wrong}</span></div>
      <div class="right"><span aria-hidden="true">✓</span><span style="flex:1">${d.right}</span><button class="iconbtn" style="width:36px;height:36px;border:none" aria-label="${esc(t('listen'))}" data-act="say" data-text="${esc(r.corrected)}">${icon('speaker', 20)}</button></div>
      <div class="row wrap"><span class="pill" style="background:#EEEAFE;color:#4B3DB0">${esc(r.category || '')}${r.pattern ? ' · ' + esc(r.pattern) : ''}</span>${saved ? `<span class="pill" style="background:#DDF4EA;color:#1F6E55">✓ ${esc(t('savedToBank'))}</span>` : ''}</div>
      <div style="font-size:14px;line-height:1.5">${esc(r.explanation || '')}</div>${r.tip ? `<div class="small">💡 ${esc(r.tip)}</div>` : ''}
      ${r.drill ? drillBox(r.drill, PS.uid()) : ''}`}</div>`;
  };
  const drillBox = (dr, id) => `<div class="drill"><span style="font-size:12px;font-weight:800">${esc(t('practiceAgain'))}</span><label for="dr${id}" style="font-size:14px">${esc(dr.q)}</label>
    <div class="row"><input id="dr${id}" class="in" style="background:#fff" placeholder="${esc(t('typeAnswer'))}"><button class="btn sm" data-act="checkDrill" data-for="dr${id}" data-a="${esc(dr.a)}">${esc(t('check'))}</button></div><span class="small" id="dr${id}r"></span></div>`;
  A.checkDrill = (el) => {
    const inp = document.getElementById(el.dataset.for), out = document.getElementById(el.dataset.for + 'r');
    const ok = PS.norm(inp.value) === PS.norm(el.dataset.a) || PS.norm(el.dataset.a).split(' / ').includes(PS.norm(inp.value));
    out.innerHTML = ok ? `<b style="color:#1F6E55">✓ ${esc(t('correctAns'))}</b>` : `<b style="color:#8E3049">✕ ${esc(t('answerIs'))}: ${esc(el.dataset.a)}</b>`;
  };
  A.say = (el) => PS.speak(el.dataset.text);

  async function checkSentences(text, source) {
    const r = await PS.ai({ feature: source, max: 2200, system: coach(), prompt:
`Check the English below sentence by sentence (max 10 sentences). For each sentence return an object:
{"original": exact sentence, "correct": true/false, "corrected": natural corrected sentence (same as original if correct),
 "category": one of ${JSON.stringify(CATS)} (main error), "pattern": short grammar pattern name in English (e.g. "for vs since", "Present Perfect Continuous"),
 "explanation": 1-3 short sentences on why, "tip": one-line rule, "drill": {"q": a NEW short fill-in-the-blank sentence with ___ practising the same rule (give the base verb in brackets if needed), "a": the answer}}
For correct sentences set drill to null and explanation to a short note.
Return {"results":[...]}.
TEXT:
"""${text}"""` });
    return (r.results || []).filter((x) => x && x.original);
  }

  /* ================= English hub ================= */
  V.english = function () {
    const s = S(), due = PS.dueMistakes().length;
    const skill = (k) => { const [i, bg, ink, bar] = SK[k], sc = s.ielts[k], pct = Math.max(8, Math.min(100, ((sc.score - 4) / (sc.target - 4)) * 100)); const prio = sc.score <= Math.min(...['L', 'R', 'W', 'S'].map((x) => s.ielts[x].score));
      return `<a class="tile" href="#ielts/${k}" style="border:${prio ? '1.5px solid ' + bar : '1px solid #ECE7FA'};position:relative">
        ${prio ? `<span class="pill" style="position:absolute;top:-9px;left:12px;background:${ink};color:#fff;font-size:10px">${esc(t('priority'))}</span>` : ''}
        <div class="between" style="align-items:flex-start">${ic(i, bg)}<span style="font-size:12px;font-weight:800;color:${ink}">${sc.score.toFixed(1)} → ${sc.target.toFixed(1)}</span></div>
        <span class="t" style="font-size:15px">${SKNAME[k]}</span><span class="s">${esc(t('sk' + k))}</span>
        <div class="bar" style="background:${bg};height:7px"><i style="width:${pct}%;background:${bar}"></i></div></a>`; };
    const ge = [['check', 'check', '#EEEAFE', 'geCheck', 'geCheckSub'], ['mistakes', 'mistakes', '#FCE4EA', 'geMistakes', 'geMistakesSub'], ['stories', 'story', '#E0EEFF', 'geStories', 'geStoriesSub'], ['vocab', 'vocab', '#DDF4EA', 'geVocab', 'geVocabSub'], ['journal', 'journal', '#FFE6D9', 'geJournal', 'geJournalSub']];
    return `<div class="page">
      <div class="top"><div class="grow"><div class="eyebrow">English &amp; IELTS</div><h1 class="h1">Road to Band ${Math.max(...['L', 'R', 'W', 'S'].map((k) => s.ielts[k].target)).toFixed(1)}</h1></div>
        <button class="ring" style="cursor:pointer" data-act="editScores" aria-label="${esc(t('editScores'))}"><b>${PS.overall().toFixed(1)}</b><span>overall</span></button></div>
      <div class="row"><span class="pill" style="background:#5BBF97;color:#fff">1</span><h2 class="h2">${esc(t('academicLibrary'))}</h2><span class="small">IELTS Academic</span></div>
      ${(() => { const pr = PS.grammarProgress ? PS.grammarProgress() : { known: 0, total: 0 }; return `<a class="tile h" href="#grammar" style="background:#DDF4EA;border:none;min-height:76px">${ic('tenses', '#fff')}<span class="stack grow" style="gap:2px"><span class="t" style="font-size:15px">${esc(t('grammarCards'))}</span><span class="s" style="color:#1F6E55">${esc(t('grammarCardsSub', { n: pr.total }))}</span><div class="bar" style="background:#fff;height:6px;margin-top:4px"><i style="width:${pr.total ? Math.round(pr.known / pr.total * 100) : 0}%;background:#5BBF97"></i></div></span><span class="pill" style="background:#fff;color:#1F6E55">${pr.known}/${pr.total}</span></a>`; })()}
      ${(() => { const pr = PS.listenProgress ? PS.listenProgress() : { done: 0, total: 0 }, LD = window.PS_LISTEN || { lessons: [], tests: [] }; return `<a class="tile h" href="#listen" style="background:#E0EEFF;border:none;min-height:76px">${ic('listening', '#fff')}<span class="stack grow" style="gap:2px"><span class="t" style="font-size:15px">${esc(t('libListening'))}</span><span class="s" style="color:#2B5C99">${esc(t('libListeningSub', { n: LD.lessons.length, m: LD.tests.length + LD.lessons.filter((x) => x.practice && x.practice.script).length }))}</span><div class="bar" style="background:#fff;height:6px;margin-top:4px"><i style="width:${pr.total ? Math.round(pr.done / pr.total * 100) : 0}%;background:#6FA4EE"></i></div></span><span class="pill" style="background:#fff;color:#2B5C99">${pr.done}/${pr.total}</span></a>`; })()}
      ${(() => { const pr = PS.readProgress ? PS.readProgress() : { done: 0, total: 0 }; return `<a class="tile h" href="#read" style="background:#DDF4EA;border:none;min-height:76px">${ic('reading', '#fff')}<span class="stack grow" style="gap:2px"><span class="t" style="font-size:15px">${esc(t('libReading'))}</span><span class="s" style="color:#1F6E55">${esc(t('libReadingSub', { n: pr.total }))}</span><div class="bar" style="background:#fff;height:6px;margin-top:4px"><i style="width:${pr.total ? Math.round(pr.done / pr.total * 100) : 0}%;background:#5BBF97"></i></div></span><span class="pill" style="background:#fff;color:#1F6E55">${pr.done}/${pr.total}</span></a>`; })()}
      ${(() => { const pr = PS.vsetProgress ? PS.vsetProgress() : { known: 0, total: 0, sets: 0, lessons: 0 }; return `<a class="tile h" href="#vset" style="background:#FFF4D6;border:none;min-height:76px">${ic('vocab', '#fff')}<span class="stack grow" style="gap:2px"><span class="t" style="font-size:15px">${esc(t('libVocab'))}</span><span class="s" style="color:#6B4E00">${esc(t('libVocabSub', { s: pr.sets, l: pr.lessons }))}</span><div class="bar" style="background:#fff;height:6px;margin-top:4px"><i style="width:${pr.total ? Math.round(pr.known / pr.total * 100) : 0}%;background:#F2C14E"></i></div></span><span class="pill" style="background:#fff;color:#6B4E00">${pr.known}/${pr.total}</span></a>`; })()}
      <section class="grid2">${[['speaking', '#FCE4EA', 'libSpeaking'], ['writing', '#FFE6D9', 'libWriting']].map(([i, bg, k]) => `<div class="tile h" style="opacity:.8">${ic(i, bg, 'sm')}<span class="stack" style="gap:0"><span class="t" style="font-size:13px">${esc(t(k))}</span><span class="pill" style="background:#F3F0FF;color:#6B6585;align-self:flex-start;margin-top:2px">${esc(t('soon'))}</span></span></div>`).join('')}</section>
      <div class="row" style="margin-top:4px"><span class="pill" style="background:#6A5ACD;color:#fff">2</span><h2 class="h2">IELTS · ${esc(t('aiPracticeTitle'))}</h2></div>
      <section class="grid2">${['L', 'R', 'W', 'S'].map(skill).join('')}</section>
      <div class="tile h" style="background:#2E2A45;color:#fff;border:none">${ic('clock', 'rgba(255,255,255,.12)')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('mockTest'))}</span><span class="s" style="color:#DAD5F2">${esc(t('mockTestSub'))}</span></span><span class="pill" style="background:#FFE7C2;color:#6B4E00">${esc(t('soon'))}</span></div>
      ${due ? `<a class="tile h" href="#review" style="background:#FFF4D6;border:none">${PS.owl(true, 40)}<span class="stack grow" style="gap:0"><span class="t">${esc(t('dueCards', { n: due }))}</span><span class="s">${esc(PS.dueMistakes().slice(0, 3).map((m) => m.pattern || m.category).join(' · '))}</span></span></a>` : ''}
      <div class="row" style="margin-top:4px"><span class="pill" style="background:#E8875A;color:#fff">3</span><h2 class="h2">${esc(t('aiTools'))}</h2><span class="small">${esc(t('grammarTenses'))}</span></div>
      <section class="grid2">${ge.map(([r, i, bg, k, sub]) => `<a class="tile h" href="#${r}">${ic(i, bg, 'sm')}<span class="stack" style="gap:0"><span class="t">${esc(t(k))}</span><span class="s">${esc(t(sub))}</span></span></a>`).join('')}</section></div>`;
  };
  A.editScores = () => {
    const s = S();
    PS.sheet(`<h2 class="h2">${esc(t('editScores'))}</h2>
      ${['L', 'R', 'W', 'S'].map((k) => `<div class="grid3" style="align-items:end"><span style="font-weight:800">${SKNAME[k]}</span><div class="field"><label class="lbl" for="sc${k}">${esc(t('score'))}</label><input id="sc${k}" class="in" inputmode="decimal" value="${s.ielts[k].score}"></div><div class="field"><label class="lbl" for="tg${k}">${esc(t('target'))}</label><input id="tg${k}" class="in" inputmode="decimal" value="${s.ielts[k].target}"></div></div>`).join('')}
      <button class="btn" data-act="saveScores">${esc(t('save'))}</button>`);
  };
  A.saveScores = () => { const s = S(); ['L', 'R', 'W', 'S'].forEach((k) => { const a = parseFloat(document.getElementById('sc' + k).value), b = parseFloat(document.getElementById('tg' + k).value); if (a >= 0 && a <= 9) s.ielts[k].score = a; if (b >= 0 && b <= 9) s.ielts[k].target = b; }); PS.save(); PS.render(); };

  /* ================= IELTS skill pages ================= */
  const st = { wTask: 't2', wIdx: 0, wCustom: '', timer: null, timerEnd: 0, sPart: 'p2', sIdx: 0, reading: null, listening: null, busy: false };
  V.ielts = function (p) {
    const k = p[0];
    if (k === 'W') return writingView();
    if (k === 'S') return speakingView();
    if (k === 'R') return readingView();
    if (k === 'L') return listeningView();
    return V.english();
  };
  const skillHead = (k) => { const [i, bg, ink] = SK[k], sc = S().ielts[k]; return PS.back('#english', SKNAME[k], `<span class="pill" style="background:${bg};color:${ink}">${sc.score.toFixed(1)} → ${sc.target.toFixed(1)}</span>`); };
  const historyList = (items, render) => items.length ? `<section class="card"><h2 class="h2">${esc(t('history'))}</h2>${items.slice(0, 8).map(render).join('')}</section>` : '';

  /* ----- Writing ----- */
  function writingView() {
    const s = S(), task = st.wTask;
    const list = C.WRITING[task], item = list[st.wIdx % list.length];
    const prompt = st.wCustom || (task === 't1' ? item.prompt : item);
    const table = !st.wCustom && task === 't1' ? `<table class="data"><tr>${item.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${item.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>` : '';
    const minW = task === 't1' ? 150 : 250, mins = task === 't1' ? 20 : 40;
    return `<div class="page">${skillHead('W')}
      <div class="seg" style="align-self:flex-start"><button class="${task === 't1' ? 'on' : ''}" data-act="wTask" data-v="t1">Task 1</button><button class="${task === 't2' ? 'on' : ''}" data-act="wTask" data-v="t2">Task 2</button></div>
      <section class="card"><div class="between"><span class="small">${esc(t('question'))} ${st.wCustom ? '' : (st.wIdx % list.length) + 1 + '/' + list.length}</span><span class="row"><button class="btn soft sm" data-act="wNext">${esc(t('another'))}</button><button class="btn soft sm" data-act="wCustom">${esc(t('ownQuestion'))}</button></span></div>
        <div style="font-size:15px;line-height:1.55;font-weight:600">${esc(prompt)}</div>${table}
        <span class="small">${esc(t('writeAtLeast', { n: minW, m: mins }))}</span></section>
      <section class="card">
        <div class="between"><label class="lbl" for="essay">${esc(t('yourAnswer'))}</label><span class="row"><span class="small" id="wc">0 ${esc(t('words'))}</span><button class="btn soft sm" data-act="timer" data-m="${mins}" id="timerBtn">⏱ ${mins}:00</button></span></div>
        <textarea id="essay" class="in" rows="12" data-in="essay" placeholder="${esc(t('startWriting'))}">${esc(st.draft || '')}</textarea>
        <button class="btn" data-act="scoreWriting">${icon('spark', 20)}${esc(t('scoreWithAI'))}</button></section>
      <div id="wResult"></div>
      ${historyList(s.writings, (w) => `<button class="tile h" data-act="showWriting" data-id="${w.id}"><span class="pill" style="background:#FFE6D9;color:#9A4A22">Band ${esc(w.band)}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:13px">${esc((w.prompt || '').slice(0, 70))}…</span><span class="s">${esc(PS.fmtDate(w.date))} · ${w.task === 't1' ? 'Task 1' : 'Task 2'} · ${w.words} ${esc(t('words'))}</span></span></button>`)}
    </div>`;
  }
  V.ielts_after = function (p) { if (p[0] === 'W') { const e = document.getElementById('essay'); if (e) IN.essay(e); } };
  IN.essay = (el) => { st.draft = el.value; const n = el.value.trim() ? el.value.trim().split(/\s+/).length : 0; const w = document.getElementById('wc'); if (w) w.textContent = n + ' ' + t('words'); };
  A.wTask = (el) => { st.wTask = el.dataset.v; st.wCustom = ''; st.wIdx = 0; PS.render(); };
  A.wNext = () => { st.wIdx++; st.wCustom = ''; PS.render(); };
  A.wCustom = () => { PS.sheet(`<h2 class="h2">${esc(t('ownQuestion'))}</h2><textarea id="cq" class="in" rows="6">${esc(st.wCustom)}</textarea><button class="btn" data-act="wCustomSave">${esc(t('use'))}</button>`); };
  A.wCustomSave = () => { st.wCustom = document.getElementById('cq').value.trim(); PS.render(); };
  A.timer = (el) => {
    if (st.timer) { clearInterval(st.timer); st.timer = null; el.textContent = '⏱ ' + el.dataset.m + ':00'; return; }
    st.timerEnd = Date.now() + (+el.dataset.m) * 60000;
    st.timer = setInterval(() => { const b = document.getElementById('timerBtn'); const left = Math.max(0, st.timerEnd - Date.now()); if (!b) { clearInterval(st.timer); st.timer = null; return; } b.textContent = '⏱ ' + Math.floor(left / 60000) + ':' + String(Math.floor(left / 1000) % 60).padStart(2, '0'); if (!left) { clearInterval(st.timer); st.timer = null; PS.toast(t('timeUp')); } }, 1000);
  };
  const critRow = (name, c) => `<div class="stack" style="gap:4px"><div class="between"><b style="font-size:13px">${esc(name)}</b><span class="pill" style="background:#EEEAFE;color:#4B3DB0">${esc(c && c.band)}</span></div><div class="bar"><i style="width:${((+(c && c.band) || 0) / 9) * 100}%"></i></div><span style="font-size:13px;color:#4F4A68">${esc(c && c.comment)}</span></div>`;
  const errorsBlock = (errs) => (errs || []).length ? `<h3 class="h2" style="font-size:16px">${esc(t('correctionsSaved'))}</h3>${errs.map((e) => { const d = PS.diff(e.original, e.corrected); return `<div class="stack" style="gap:6px"><div class="wrong"><span>✕</span><span>${d.wrong}</span></div><div class="right"><span>✓</span><span>${d.right}</span></div><span style="font-size:13px">${esc(e.explanation || '')}</span></div>`; }).join('')}` : '';
  function writingResult(w) {
    const r = w.result, keys = w.task === 't1' ? [['TA', 'Task Achievement'], ['CC', 'Coherence & Cohesion'], ['LR', 'Lexical Resource'], ['GRA', 'Grammar Range & Accuracy']] : [['TR', 'Task Response'], ['CC', 'Coherence & Cohesion'], ['LR', 'Lexical Resource'], ['GRA', 'Grammar Range & Accuracy']];
    return `<section class="card"><div class="row">${PS.owl(true, 44)}<div class="stack grow" style="gap:0"><span class="small">${esc(t('estimatedBand'))}</span><b style="font-family:Fredoka,Nunito,sans-serif;font-size:28px;color:#4B3DB0">${esc(r.band)}</b></div></div>
      ${keys.map(([k, n]) => critRow(n, r.criteria && (r.criteria[k] || r.criteria.TR || r.criteria.TA))).join('')}
      ${(r.strengths || []).length ? `<div><b style="font-size:13px;color:#1F6E55">${esc(t('strengths'))}</b><ul style="margin:4px 0 0;padding-left:18px;font-size:14px">${r.strengths.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      ${(r.improve || []).length ? `<div><b style="font-size:13px;color:#9A4A22">${esc(t('toImprove'))}</b><ul style="margin:4px 0 0;padding-left:18px;font-size:14px">${r.improve.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      ${errorsBlock(r.errors)}
      ${r.model_paragraph ? `<div class="drill" style="background:#E0EEFF;color:#1F4778"><b style="font-size:12px">${esc(t('modelParagraph'))}</b><span style="font-size:14px;line-height:1.55">${esc(r.model_paragraph)}</span></div>` : ''}
      <span class="small">${esc(t('aiDisclaimer'))}</span></section>`;
  }
  A.scoreWriting = async (el) => {
    const essay = document.getElementById('essay').value.trim(); const words = essay ? essay.split(/\s+/).length : 0;
    if (words < 40) { PS.toast(t('tooShort')); return; }
    const task = st.wTask, list = C.WRITING[task], item = list[st.wIdx % list.length];
    const prompt = st.wCustom || (task === 't1' ? item.prompt + '\nDATA: ' + JSON.stringify(item.table) : item);
    const out = document.getElementById('wResult'); el.disabled = true; out.innerHTML = PS.loading(t('scoring'));
    try {
      const crit = task === 't1' ? 'TA, CC, LR, GRA' : 'TR, CC, LR, GRA';
      const r = await PS.ai({ feature: 'writing', max: 3000, system: coach(), prompt:
`Assess this IELTS Academic Writing ${task === 't1' ? 'Task 1' : 'Task 2'} answer using the official public band descriptors. Be honest and calibrated (do not inflate).
QUESTION: ${prompt}
ANSWER (${words} words): """${essay}"""
Return JSON: {"band": overall band like 6.5, "criteria": {${crit.split(', ').map((c) => `"${c}": {"band": number, "comment": "1-2 sentences"}`).join(', ')}},
"strengths": [max 3 short points], "improve": [max 4 specific, actionable points],
"errors": [max 6 {"original": exact sentence from the answer, "corrected": corrected sentence, "category": one of ${JSON.stringify(CATS)}, "pattern": short pattern name, "explanation": short why}],
"model_paragraph": "rewrite ONE weak paragraph of the answer at band 7.5+ level"}` });
      const w = { id: PS.uid(), date: dayKey(), task, prompt: st.wCustom || (task === 't1' ? item.prompt : item), essay, words, band: r.band, result: r };
      S().writings.unshift(w);
      (r.errors || []).forEach((e) => PS.addMistake(Object.assign(resultFromAI(e, 'writing'), {})));
      PS.mark('ieltsW'); st.draft = ''; PS.save();
      out.innerHTML = writingResult(w);
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };
  A.showWriting = (el) => { const w = S().writings.find((x) => x.id === el.dataset.id); if (!w) return; PS.sheet(`<h2 class="h2">${w.task === 't1' ? 'Task 1' : 'Task 2'} · ${esc(PS.fmtDate(w.date))}</h2><div class="small">${esc(w.prompt)}</div><div style="white-space:pre-wrap;font-size:14px;line-height:1.55;background:#FAF7FF;border-radius:14px;padding:12px">${esc(w.essay)}</div>${writingResult(w)}`); };

  /* ----- Speaking ----- */
  function speakingView() {
    const s = S(), part = st.sPart, list = C.SPEAKING[part], q = list[st.sIdx % list.length];
    const qText = part === 'p2' ? q.topic : q;
    return `<div class="page">${skillHead('S')}
      <div class="seg" style="align-self:flex-start">${['p1', 'p2', 'p3'].map((p) => `<button class="${part === p ? 'on' : ''}" data-act="sPart" data-v="${p}">Part ${p[1]}</button>`).join('')}</div>
      <section class="card" style="background:${part === 'p2' ? '#FFF4D6' : '#fff'}">
        <div class="between"><span class="small">${part === 'p2' ? 'Cue card' : esc(t('question'))}</span><span class="row"><button class="iconbtn" style="width:40px;height:40px" aria-label="${esc(t('listen'))}" data-act="say" data-text="${esc(qText)}">${icon('speaker', 22)}</button><button class="btn soft sm" data-act="sNext">${esc(t('another'))}</button></span></div>
        <div style="font-size:17px;font-weight:800;line-height:1.4">${esc(qText)}</div>
        ${part === 'p2' ? `<div class="small">${esc(t('youShouldSay'))}</div><ul style="margin:0;padding-left:18px;font-size:14px">${q.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><button class="btn soft sm" data-act="timer" data-m="1" id="timerBtn" style="align-self:flex-start">⏱ ${esc(t('prep'))} 1:00</button>` : ''}
        <span class="small">${esc(part === 'p1' ? t('p1Hint') : part === 'p2' ? t('p2Hint') : t('p3Hint'))}</span></section>
      <section class="card">
        <label class="lbl" for="spk">${esc(t('yourAnswerSpoken'))}</label>
        <textarea id="spk" class="in" rows="7" placeholder="${esc(t('tapMic'))}"></textarea>
        <div class="row"><button class="btn rose" data-act="dictate" data-for="spk" aria-label="${esc(t('dictate'))}">${icon('mic', 22)}${esc(t('speak'))}</button><button class="btn" style="flex:1" data-act="scoreSpeaking">${icon('spark', 20)}${esc(t('feedbackAI'))}</button></div>
        ${PS.canDictate ? '' : `<span class="small">${esc(t('useKeyboardMic'))}</span>`}</section>
      <div id="sResult"></div>
      ${historyList(s.speakings, (w) => `<button class="tile h" data-act="showSpeaking" data-id="${w.id}"><span class="pill" style="background:#FCE4EA;color:#8E3049">Band ${esc(w.band)}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:13px">${esc(w.q.slice(0, 70))}</span><span class="s">${esc(PS.fmtDate(w.date))} · Part ${w.part[1]}</span></span></button>`)}</div>`;
  }
  A.sPart = (el) => { st.sPart = el.dataset.v; st.sIdx = Math.floor(Math.random() * C.SPEAKING[st.sPart].length); PS.render(); };
  A.sNext = () => { st.sIdx++; PS.render(); };
  A.dictate = (el) => PS.dictate(document.getElementById(el.dataset.for), el);
  const speakResult = (w) => { const r = w.result; return `<section class="card"><div class="row">${PS.owl(true, 44)}<div class="stack grow" style="gap:0"><span class="small">${esc(t('estimatedBand'))}</span><b style="font-family:Fredoka,Nunito,sans-serif;font-size:28px;color:#8E3049">${esc(r.band)}</b></div></div>
      ${[['FC', 'Fluency & Coherence'], ['LR', 'Lexical Resource'], ['GRA', 'Grammar Range & Accuracy']].map(([k, n]) => critRow(n, r.criteria && r.criteria[k])).join('')}
      <span class="small">${esc(t('pronNote'))}</span>
      ${r.comment ? `<div style="font-size:14px;line-height:1.5">${esc(r.comment)}</div>` : ''}
      ${errorsBlock(r.errors)}
      ${(r.useful_phrases || []).length ? `<div><b style="font-size:13px;color:#1F6E55">${esc(t('usefulPhrases'))}</b><div class="row wrap" style="margin-top:6px">${r.useful_phrases.map((x) => `<button class="chip" data-act="say" data-text="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>` : ''}
      ${r.better_answer ? `<div class="drill" style="background:#E0EEFF;color:#1F4778"><div class="between"><b style="font-size:12px">${esc(t('betterAnswer'))}</b><button class="btn sm soft" data-act="say" data-text="${esc(r.better_answer)}">${icon('speaker', 18)}${esc(t('listen'))}</button></div><span style="font-size:14px;line-height:1.55">${esc(r.better_answer)}</span></div>` : ''}</section>`; };
  A.scoreSpeaking = async (el) => {
    const ans = document.getElementById('spk').value.trim();
    if (ans.split(/\s+/).length < 12) { PS.toast(t('tooShort')); return; }
    const part = st.sPart, q = C.SPEAKING[part][st.sIdx % C.SPEAKING[part].length], qText = part === 'p2' ? q.topic + ' (You should say: ' + q.points.join('; ') + ')' : q;
    const out = document.getElementById('sResult'); el.disabled = true; out.innerHTML = PS.loading(t('scoring'));
    try {
      const r = await PS.ai({ feature: 'speaking', max: 2400, system: coach(), prompt:
`This is a transcript (from speech-to-text) of an IELTS Speaking ${part.toUpperCase()} answer. Ignore missing punctuation caused by dictation. Pronunciation cannot be judged from text, so do not score it.
QUESTION: ${qText}
TRANSCRIPT: """${ans}"""
Return JSON: {"band": estimated band (FC, LR, GRA only), "criteria": {"FC": {"band":n,"comment":""}, "LR": {"band":n,"comment":""}, "GRA": {"band":n,"comment":""}},
"comment": "2-3 sentence overall advice", "errors": [max 5 {"original","corrected","category" one of ${JSON.stringify(CATS)},"pattern","explanation"}],
"useful_phrases": [4-6 natural phrases she could use for this question], "better_answer": "a natural band 7.5 answer of similar length, in first person, keeping her ideas"}` });
      const w = { id: PS.uid(), date: dayKey(), part, q: part === 'p2' ? q.topic : q, answer: ans, band: r.band, result: r };
      S().speakings.unshift(w); (r.errors || []).forEach((e) => PS.addMistake(resultFromAI(e, 'speaking')));
      PS.mark('ieltsS'); PS.save(); out.innerHTML = speakResult(w);
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };
  A.showSpeaking = (el) => { const w = S().speakings.find((x) => x.id === el.dataset.id); if (w) PS.sheet(`<h2 class="h2">${esc(w.q)}</h2><div style="font-size:14px;background:#FAF7FF;border-radius:14px;padding:12px">${esc(w.answer)}</div>${speakResult(w)}`); };

  /* ----- Reading & Listening (AI-generated practice) ----- */
  const TOPICS = { random: 'any common IELTS Academic topic (science, history, environment, technology, psychology, society)', work: 'work, organisations and human resources', society: 'society, education and public policy', science: 'science, nature and technology' };
  const qInputs = (qs, prefix, done) => qs.map((q, i) => {
    const name = prefix + i, ans = done ? done.answers[i] : '';
    let body = '';
    if (q.type === 'tfng' || q.type === 'ynng') {
      const opts = q.type === 'tfng' ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['YES', 'NO', 'NOT GIVEN'];
      body = `<div class="row wrap">${opts.map((o) => `<button class="opt ${ans === o ? 'sel' : ''} ${done ? (o === String(q.answer).toUpperCase() ? 'ok' : ans === o ? 'no' : '') : ''}" data-act="pickOpt" data-q="${name}" data-v="${o}" ${done ? 'disabled' : ''}>${o}</button>`).join('')}</div>`;
    } else if (q.type === 'mcq' && q.options) {
      body = `<div class="stack" style="gap:6px">${q.options.map((o, j) => { const L = String.fromCharCode(65 + j); return `<button class="opt ${ans === L ? 'sel' : ''} ${done ? (L === String(q.answer).toUpperCase().trim()[0] ? 'ok' : ans === L ? 'no' : '') : ''}" data-act="pickOpt" data-q="${name}" data-v="${L}" ${done ? 'disabled' : ''}><b>${L}.</b> ${esc(String(o).replace(/^[A-D][.)]\s*/, ''))}</button>`; }).join('')}</div>`;
    } else {
      body = `<input class="in" id="in_${name}" value="${esc(ans)}" ${done ? 'disabled' : ''} placeholder="${esc(t('typeAnswer'))}">`;
    }
    const res = done ? (done.marks[i] ? `<span class="small" style="color:#1F6E55">✓ ${esc(t('correctAns'))}</span>` : `<span class="small" style="color:#8E3049">✕ ${esc(t('answerIs'))}: ${esc(q.answer)}</span>`) + (q.explain ? `<span class="small">${esc(q.explain)}</span>` : '') : '';
    return `<div class="q"><b style="font-size:14px">${i + 1}. ${esc(q.q)}</b>${body}<input type="hidden" id="h_${name}" value="${esc(ans)}">${res}</div>`;
  }).join('');
  A.pickOpt = (el) => { el.parentElement.querySelectorAll('.opt').forEach((b) => b.classList.remove('sel')); el.classList.add('sel'); document.getElementById('h_' + el.dataset.q).value = el.dataset.v; };
  const grade = (qs, prefix) => {
    const answers = qs.map((q, i) => { const h = document.getElementById('h_' + prefix + i).value; const inp = document.getElementById('in_' + prefix + i); return inp ? inp.value.trim() : h; });
    const marks = qs.map((q, i) => { const a = answers[i]; if (!a) return false; if (q.type === 'mcq') return a.toUpperCase() === String(q.answer).toUpperCase().trim()[0]; if (q.type === 'tfng' || q.type === 'ynng') return a === String(q.answer).toUpperCase(); return String(q.answer).split('/').some((x) => PS.norm(x) === PS.norm(a)); });
    return { answers, marks, score: marks.filter(Boolean).length };
  };
  const rawToBand = (score, total) => { const p = score / total; return p >= .9 ? 8 : p >= .8 ? 7.5 : p >= .72 ? 7 : p >= .62 ? 6.5 : p >= .5 ? 6 : p >= .4 ? 5.5 : 5; };

  function readingView() {
    const r = st.reading;
    const gen = `<section class="card"><div class="row">${ic('reading', '#DDF4EA')}<span class="stack grow" style="gap:0"><b>${esc(t('newReading'))}</b><span class="small">${esc(t('newReadingSub'))}</span></span></div>
      <div class="row wrap">${Object.keys(TOPICS).map((k) => `<button class="chip ${st.rTopic === k || (!st.rTopic && k === 'random') ? 'on' : ''}" data-act="rTopic" data-v="${k}">${esc(t('topic_' + k))}</button>`).join('')}</div>
      <button class="btn" data-act="genReading">${icon('spark', 20)}${esc(t('generate'))}</button></section>`;
    if (!r) return `<div class="page">${skillHead('R')}${gen}<div id="rOut"></div>${historyList(S().practice.filter((x) => x.skill === 'R'), (x) => `<div class="tile h"><span class="pill" style="background:#DDF4EA;color:#1F6E55">${x.score}/${x.total}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:13px">${esc(x.title)}</span><span class="s">${esc(PS.fmtDate(x.date))} · ≈ Band ${x.band}</span></span></div>`)}</div>`;
    return `<div class="page">${skillHead('R')}
      <article class="card read-mode" style="font-size:16px"><h2 style="font-family:Fredoka,Nunito,sans-serif;font-size:20px">${esc(r.title)}</h2>${String(r.passage).split(/\n\s*\n/).map((p) => `<p style="margin:0">${esc(p)}</p>`).join('')}</article>
      <section class="card"><h2 class="h2">${esc(t('questions'))}</h2>${qInputs(r.questions, 'r', r.done)}
        ${r.done ? `<div class="drill" style="background:#DDF4EA;color:#1F6E55"><b>${esc(t('yourScore'))}: ${r.done.score}/${r.questions.length} · ≈ Band ${rawToBand(r.done.score, r.questions.length)}</b></div><button class="btn soft" data-act="rNew">${esc(t('newPractice'))}</button>` : `<button class="btn" data-act="checkReading">${esc(t('checkAnswers'))}</button>`}</section></div>`;
  }
  A.rTopic = (el) => { st.rTopic = el.dataset.v; PS.render(); };
  A.rNew = () => { st.reading = null; PS.render(); };
  // Two small AI calls (text first as plain text, then questions as JSON) so replies are never cut off
  const QFORMAT = `{"questions": [{"type": "tfng|mcq|short", "q": "", "options": ["..."] (mcq only), "answer": "", "explain": ""}]}`;
  A.genReading = async (el) => {
    const out = document.getElementById('rOut'); el.disabled = true; out.innerHTML = PS.loading(t('generating') + ' (1/2)');
    try {
      const text = await PS.ai({ feature: 'reading', max: 2000, json: false, system: 'You write original IELTS Academic Reading passages. Output plain text only, no markdown.', prompt:
`Write an ORIGINAL IELTS Academic Reading passage at band 7-8 difficulty on: ${TOPICS[st.rTopic || 'random']}.
Format: first line = the title only. Then a blank line. Then 5-6 academic paragraphs (520-620 words in total) separated by blank lines.` });
      const lines = String(text).trim().split('\n'); const title = lines.shift().replace(/^[#*\s]+|[*\s]+$/g, '');
      const passage = lines.join('\n').trim();
      if (passage.split(/\s+/).length < 250) throw new Error(t('aiBadFormat'));
      out.innerHTML = PS.loading(t('generating') + ' (2/2)');
      const r = await PS.ai({ feature: 'reading', max: 2500, system: coach(), prompt:
`Write 9 IELTS Academic Reading questions for the passage below, in passage order: 4 "tfng" (answer TRUE/FALSE/NOT GIVEN), 3 "mcq" (4 options, answer = letter A-D), 2 "short" (answer max 3 words copied from the passage; alternatives separated by "/").
"explain": max 15 words in ${PS.langName()}, pointing to the evidence. No line breaks inside strings.
Return JSON: ${QFORMAT}
PASSAGE:
${passage}` });
      if (!(r.questions || []).length) throw new Error(t('aiBadFormat'));
      st.reading = { title, passage, questions: r.questions }; PS.render();
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; el.disabled = false; }
  };
  A.checkReading = () => {
    const r = st.reading, g = grade(r.questions, 'r'); r.done = g;
    S().practice.unshift({ id: PS.uid(), skill: 'R', date: dayKey(), title: r.title, score: g.score, total: r.questions.length, band: rawToBand(g.score, r.questions.length) });
    PS.mark('ieltsR'); PS.save(); PS.render();
  };

  function listeningView() {
    const l = st.listening;
    const gen = `<section class="card"><div class="row">${ic('listening', '#E0EEFF')}<span class="stack grow" style="gap:0"><b>${esc(t('newListening'))}</b><span class="small">${esc(t('newListeningSub'))}</span></span></div>
      <div class="row wrap">${[1, 2, 3, 4].map((n) => `<button class="chip ${(st.lSec || 1) === n ? 'on' : ''}" data-act="lSec" data-v="${n}">Section ${n}</button>`).join('')}</div>
      <span class="small">${esc(t('lSec' + (st.lSec || 1)))}</span>
      <button class="btn" data-act="genListening">${icon('spark', 20)}${esc(t('generate'))}</button></section>`;
    if (!l) return `<div class="page">${skillHead('L')}${gen}<div id="lOut"></div>${historyList(S().practice.filter((x) => x.skill === 'L'), (x) => `<div class="tile h"><span class="pill" style="background:#E0EEFF;color:#2B5C99">${x.score}/${x.total}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:13px">${esc(x.title)}</span><span class="s">${esc(PS.fmtDate(x.date))} · ≈ Band ${x.band}</span></span></div>`)}</div>`;
    return `<div class="page">${skillHead('L')}
      <section class="card" style="background:#E0EEFF;border:none"><div class="row">${PS.owl(false, 44)}<span class="stack grow" style="gap:0"><b>${esc(l.title)}</b><span class="small" style="color:#1F4778">Section ${esc(l.section || st.lSec || 1)} · ${esc(t('listenOnce'))}</span></span></div>
        <div class="row"><button class="btn" style="flex:1" data-act="lPlay">▶ ${esc(t('play'))}</button><button class="btn ghost" data-act="lStop">■</button></div>
        <div class="seg" style="align-self:flex-start">${[0.85, 1, 1.1].map((r) => `<button class="${(st.lRate || 1) === r ? 'on' : ''}" data-act="lRate" data-v="${r}">${r}×</button>`).join('')}</div></section>
      <section class="card"><h2 class="h2">${esc(t('questions'))}</h2>${qInputs(l.questions, 'l', l.done)}
        ${l.done ? `<div class="drill" style="background:#E0EEFF;color:#1F4778"><b>${esc(t('yourScore'))}: ${l.done.score}/${l.questions.length} · ≈ Band ${rawToBand(l.done.score, l.questions.length)}</b></div>
        <details class="card"><summary style="font-weight:800;cursor:pointer">${esc(t('showScript'))}</summary>${l.script.map((x) => `<p style="margin:6px 0;font-size:14px"><b>${esc(x.speaker)}:</b> ${esc(x.text)}</p>`).join('')}</details><button class="btn soft" data-act="lNew">${esc(t('newPractice'))}</button>` : `<button class="btn" data-act="checkListening">${esc(t('checkAnswers'))}</button>`}</section></div>`;
  }
  A.lSec = (el) => { st.lSec = +el.dataset.v; PS.render(); };
  A.lRate = (el) => { st.lRate = +el.dataset.v; PS.render(); };
  A.lNew = () => { PS.stopSpeak(); st.listening = null; PS.render(); };
  A.lStop = () => PS.stopSpeak();
  A.lPlay = () => {
    const l = st.listening; if (!l) return; PS.stopSpeak();
    const spk = {}; let gi = 0; l.script.forEach((x) => { if (!(x.speaker in spk)) spk[x.speaker] = x.voice || (gi++ % 2 ? 'm' : 'f'); });
    let i = 0; const next = () => { if (i >= l.script.length) return; const x = l.script[i++]; PS.speak(x.text, { queue: true, gender: spk[x.speaker], rate: st.lRate || 1, onend: next }); };
    next();
  };
  A.genListening = async (el) => {
    const out = document.getElementById('lOut'); el.disabled = true; out.innerHTML = PS.loading(t('generating') + ' (1/2)');
    const sec = st.lSec || 1;
    const kind = { 1: 'a conversation between two people in an everyday social context (e.g. booking, enquiry) with names, numbers, dates and addresses', 2: 'a monologue in an everyday social context (e.g. a tour guide or facility announcement)', 3: 'a conversation between two or three people in an academic context (students and a tutor discussing an assignment)', 4: 'a university lecture monologue on an academic subject' }[sec];
    try {
      const text = await PS.ai({ feature: 'listening', max: 1800, json: false, system: 'You write original IELTS Listening scripts. Output plain text only, no markdown.', prompt:
`Write an ORIGINAL IELTS Listening Section ${sec} script: ${kind}. 380-460 words of natural spoken English.
Format: first line = a short title. Then one line per turn as "Speaker name (f) : text" or "Speaker name (m) : text" (f = female voice, m = male voice).` });
      const lines = String(text).trim().split('\n').map((x) => x.trim()).filter(Boolean);
      const title = lines.shift().replace(/^[#*\s]+|[*\s]+$/g, '');
      const script = lines.map((l) => { const m = l.match(/^\**([^:(]{1,40}?)\s*(?:\((f|m)\))?\s*\**\s*:\s*(.+)$/i); return m ? { speaker: m[1].trim(), voice: (m[2] || '').toLowerCase(), text: m[3].trim() } : { speaker: '', voice: '', text: l }; });
      if (script.length < 3) throw new Error(t('aiBadFormat'));
      out.innerHTML = PS.loading(t('generating') + ' (2/2)');
      const plain = script.map((x) => (x.speaker ? x.speaker + ': ' : '') + x.text).join('\n');
      const r = await PS.ai({ feature: 'listening', max: 2200, system: coach(), prompt:
`Write 8 IELTS Listening Section ${sec} questions for this script, in script order. ${sec <= 2 ? 'Mostly "short" (form/note completion, answer max 2 words or a number; alternatives separated by "/") plus 2 "mcq".' : 'Mostly "mcq" (4 options, answer = letter A-D) plus 2 "short".'}
"explain": max 15 words in ${PS.langName()}. No line breaks inside strings.
Return JSON: {"questions": [{"type": "short|mcq", "q": "", "options": [], "answer": "", "explain": ""}]}
SCRIPT:
${plain}` });
      if (!(r.questions || []).length) throw new Error(t('aiBadFormat'));
      st.listening = { title, section: sec, script, questions: r.questions }; PS.render();
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; el.disabled = false; }
  };
  A.checkListening = () => {
    const l = st.listening, g = grade(l.questions, 'l'); l.done = g; PS.stopSpeak();
    S().practice.unshift({ id: PS.uid(), skill: 'L', date: dayKey(), title: l.title, score: g.score, total: l.questions.length, band: rawToBand(g.score, l.questions.length) });
    PS.mark('ieltsL'); PS.save(); PS.render();
  };

  /* ================= Cek Kalimat ================= */
  V.check = function () {
    return `<div class="page">${PS.back('#english', esc(t('geCheck')), `<span class="pill" style="background:#EEEAFE;color:#4B3DB0">${icon('spark', 14)}AI Haiku</span>`)}
      <section class="card"><label class="lbl" for="ck">${esc(t('checkLabel'))}</label>
        <textarea id="ck" class="in" rows="4" placeholder="I have been working in this company since 18 years.">${esc(st.ck || '')}</textarea>
        <div class="row"><button class="btn rose" data-act="dictate" data-for="ck" aria-label="${esc(t('dictate'))}">${icon('mic', 22)}</button><button class="btn" style="flex:1" data-act="runCheck">${icon('spark', 20)}${esc(t('checkWithAI'))}</button></div></section>
      <div id="ckOut" class="stack"></div></div>`;
  };
  A.runCheck = async (el) => {
    const text = document.getElementById('ck').value.trim(); if (!text) return; st.ck = text;
    const out = document.getElementById('ckOut'); el.disabled = true; out.innerHTML = PS.loading();
    try {
      const res = await checkSentences(text, 'check');
      const wrongN = res.filter((r) => !r.correct).length;
      const html = res.map((r) => { const saved = !r.correct && PS.addMistake(resultFromAI(r, 'check')); return correctionCard(r, saved); }).join('');
      PS.mark('check'); PS.save();
      out.innerHTML = `<div class="row">${PS.owl(!wrongN, 40)}<b style="font-size:15px">${esc(wrongN ? t('fixesFound', { n: wrongN }) : t('allCorrect'))}</b></div>${html}`;
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };

  /* ================= Journal ================= */
  V.journal = function () {
    const s = S();
    return `<div class="page">${PS.back('#english', esc(t('geJournal')))}
      <section class="card" style="background:#FFE6D9;border:none"><b>${esc(t('journalPrompt'))}</b><span class="small" style="color:#7A3A18">${esc(t('journalHint'))}</span></section>
      <section class="card"><textarea id="jr" class="in" rows="7" placeholder="Today I…"></textarea>
        <div class="row"><button class="btn rose" data-act="dictate" data-for="jr" aria-label="${esc(t('dictate'))}">${icon('mic', 22)}</button><button class="btn" style="flex:1" data-act="runJournal">${icon('spark', 20)}${esc(t('checkWithAI'))}</button></div></section>
      <div id="jrOut" class="stack"></div>
      ${historyList(s.journal, (j) => `<div class="tile"><span class="s">${esc(PS.fmtDate(j.date))} · ${j.errors} ${esc(t('fixes'))}</span><span style="font-size:13.5px">${esc(j.text.slice(0, 160))}</span></div>`)}</div>`;
  };
  A.runJournal = async (el) => {
    const text = document.getElementById('jr').value.trim(); if (text.split(/\s+/).length < 8) { PS.toast(t('tooShort')); return; }
    const out = document.getElementById('jrOut'); el.disabled = true; out.innerHTML = PS.loading();
    try {
      const res = await checkSentences(text, 'journal'); let n = 0;
      out.innerHTML = res.map((r) => { const saved = !r.correct && PS.addMistake(resultFromAI(r, 'journal')); if (!r.correct) n++; return correctionCard(r, saved); }).join('');
      S().journal.unshift({ id: PS.uid(), date: dayKey(), text, errors: n }); PS.mark('journal'); PS.save();
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };

  /* ================= Mistakes & Review ================= */
  V.mistakes = function () {
    const s = S(), f = st.mFilter || 'all';
    const weekAgo = addDays(dayKey(), -7);
    const week = s.mistakes.filter((m) => m.date > weekAgo), mastered = s.mistakes.filter((m) => m.mastered).length, due = PS.dueMistakes().length;
    const top = {}; week.forEach((m) => { const k = m.pattern || m.category; top[k] = (top[k] || 0) + 1; });
    const topList = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 2).map((x) => x[0]);
    const list = s.mistakes.filter((m) => f === 'all' ? true : f === 'mastered' ? m.mastered : m.category === f);
    const cats = ['all', ...CATS.filter((c) => s.mistakes.some((m) => m.category === c)), 'mastered'];
    return `<div class="page">${PS.back('#english', esc(t('geMistakes')))}
      <section class="hero" style="flex-direction:column;align-items:stretch;gap:10px"><span style="font-size:12px;font-weight:800;opacity:.9">${esc(t('weekRecap'))}</span>
        <div class="grid3">${[[week.length, t('mistakesWord')], [mastered, 'mastered'], [due, t('dueToday')]].map(([n, l]) => `<div style="background:rgba(255,255,255,.16);border-radius:14px;padding:8px;display:flex;flex-direction:column;align-items:center"><b style="font-size:22px">${n}</b><span style="font-size:11px;font-weight:700">${esc(l)}</span></div>`).join('')}</div>
        ${topList.length ? `<span style="font-size:13px;font-weight:700">${esc(t('mostOften'))}: <b>${esc(topList.join(' & '))}</b></span>` : ''}</section>
      ${due ? `<a class="btn" href="#review">${icon('spark', 20)}${esc(t('startReview', { n: due }))}</a>` : ''}
      <div class="row wrap">${cats.map((c) => `<button class="chip ${f === c ? 'on' : ''}" data-act="mFilter" data-v="${esc(c)}">${esc(c === 'all' ? t('all') : c === 'mastered' ? 'Mastered' : c)}</button>`).join('')}</div>
      ${list.length ? list.map((m) => { const d = PS.diff(m.original, m.corrected), rep = repeatCount(m); return `<article class="card" style="${m.mastered ? 'background:#F3FBF7;border-color:#CFEBDD' : ''}">
        <div class="between"><span class="small">${esc(PS.fmtDate(m.date))} · ${esc(m.source)}</span>${m.mastered ? `<span class="pill" style="background:#DDF4EA;color:#1F6E55">${icon('star', 12)}Mastered</span>` : rep > 1 ? `<span class="pill" style="background:#FFF4D6;color:#6B4E00">${esc(t('repeated', { n: rep }))}</span>` : `<span class="pill" style="background:#EEEAFE;color:#4B3DB0">${esc(m.category)}</span>`}</div>
        <span style="font-size:14px;color:#8E3049"><b>✕</b> ${d.wrong}</span><span style="font-size:14px;color:#1F6E55"><b>✓</b> ${d.right}</span>
        <span style="font-size:13px;color:#4F4A68">${esc(m.tip || m.pattern || '')}</span>
        ${m.mastered ? '' : `<div class="dots">${[1, 2, 3, 4].map((i) => `<i class="${m.box >= i ? 'f' : ''}"></i>`).join('')}<span class="small" style="margin-left:4px">${esc(t('practiceOf', { n: m.box }))}</span></div>`}
        <div class="row"><button class="btn sm soft" data-act="say" data-text="${esc(m.corrected)}">${icon('speaker', 16)}${esc(t('listen'))}</button><button class="btn sm ghost" data-act="delMistake" data-id="${m.id}">${esc(t('delete'))}</button></div></article>`; }).join('') : `<div class="empty">${PS.owl(true, 64)}${esc(t('noMistakes'))}<a class="btn sm" href="#check">${esc(t('geCheck'))}</a></div>`}</div>`;
  };
  A.mFilter = (el) => { st.mFilter = el.dataset.v; PS.render(); };
  A.delMistake = (el) => { if (!confirm(t('confirmDelete'))) return; S().mistakes = S().mistakes.filter((m) => m.id !== el.dataset.id); PS.save(); PS.render(); };

  V.review = function () {
    const due = PS.dueMistakes();
    if (!due.length) return `<div class="page">${PS.back('#mistakes', esc(t('review')))}<div class="empty">${PS.owl(true, 80)}<b>${esc(t('reviewDone'))}</b><a class="btn" href="#english">${esc(t('back'))}</a></div></div>`;
    const m = due[0], revealed = st.revealed === m.id;
    const q = m.drill && m.drill.q ? m.drill.q : null;
    return `<div class="page">${PS.back('#mistakes', esc(t('review')), `<span class="pill" style="background:#FFF4D6;color:#6B4E00">${due.length} ${esc(t('left'))}</span>`)}
      <section class="card"><span class="small">${esc(t('fixThis'))}</span><div class="wrong"><span>✕</span><span>${esc(m.original)}</span></div>
        <label class="lbl" for="rvIn">${esc(t('yourCorrection'))}</label><textarea id="rvIn" class="in" rows="2">${esc(st.rvTyped || '')}</textarea>
        ${revealed ? `<div class="right"><span>✓</span><span>${PS.diff(m.original, m.corrected).right}</span></div><span style="font-size:14px">${esc(m.explanation || '')}</span>${q ? drillBox(m.drill, 'rv') : ''}
          <div class="row"><button class="btn mint" style="flex:1" data-act="grade" data-ok="1">${esc(t('gotIt'))}</button><button class="btn rose" style="flex:1" data-act="grade" data-ok="0">${esc(t('notYet'))}</button></div>`
        : `<button class="btn" data-act="reveal">${esc(t('checkAnswer'))}</button>`}</section></div>`;
  };
  A.reveal = () => {
    const m = PS.dueMistakes()[0]; const typed = document.getElementById('rvIn').value; st.rvTyped = typed; st.revealed = m.id; PS.render();
    if (typed && PS.norm(typed) === PS.norm(m.corrected)) PS.toast('✓ ' + t('correctAns'));
  };
  A.grade = (el) => {
    const m = PS.dueMistakes()[0]; if (!m) return;
    if (el.dataset.ok === '1') { m.box = Math.min(4, m.box + 1); m.reps++; if (m.box >= 4) m.mastered = true; m.due = addDays(dayKey(), BOX[m.box] || 14); }
    else { m.box = Math.max(0, m.box - 1); m.due = addDays(dayKey(), 1); }
    st.revealed = null; st.rvTyped = ''; PS.mark('review'); PS.save(); PS.render();
  };

  /* ================= Tenses Lab ================= */
  V.tenses = function () {
    return `<div class="page">${PS.back('#english', esc(t('geTenses')))}
      <p class="small" style="margin:0">${esc(t('tensesIntro'))}</p>
      <section class="stack" style="gap:8px">${C.TENSES.map((x, i) => `<a class="tile h" href="#tense/${x.id}"><span class="ic sm" style="background:${['#E0EEFF', '#FFF4D6', '#FCE4EA', '#DDF4EA'][Math.floor(i / 4)]};font-weight:800;color:#4F4A68">${i + 1}</span><span class="stack grow" style="gap:0"><span class="t">${esc(x.en)}</span><span class="s">${esc(x.f)} · ${esc(PS.L(x.use))}</span></span></a>`).join('')}</section></div>`;
  };
  V.tense = function (p) {
    const x = C.TENSES.find((y) => y.id === p[0]) || C.TENSES[0], quiz = st.tq && st.tq.id === x.id ? st.tq : null;
    return `<div class="page">${PS.back('#tenses', esc(x.en))}
      <section class="card" style="background:#FFF4D6;border:none"><span class="small" style="color:#6B4E00">${esc(t('formula'))}</span><b style="font-size:18px;color:#5C4600">${esc(x.f)}</b><span style="font-size:14px;color:#5C4600">${esc(PS.L(x.use))}</span></section>
      <section class="card"><span class="small">${esc(t('example'))}</span><div class="right"><span style="flex:1">${esc(x.ex)}</span><button class="iconbtn" style="width:36px;height:36px;border:none" data-act="say" data-text="${esc(x.ex)}" aria-label="${esc(t('listen'))}">${icon('speaker', 20)}</button></div></section>
      <button class="btn" data-act="genTenseQuiz" data-id="${x.id}">${icon('spark', 20)}${esc(t('aiPractice6'))}</button>
      <div id="tqOut">${quiz ? tenseQuizHtml(quiz) : ''}</div></div>`;
  };
  const tenseQuizHtml = (q) => `<section class="card"><h2 class="h2">${esc(t('practice'))}</h2>${q.items.map((it, i) => `<div class="q"><label for="tq${i}" style="font-size:14.5px;font-weight:700">${i + 1}. ${esc(it.q)}</label><input id="tq${i}" class="in" ${q.done ? 'disabled' : ''} value="${esc(q.done ? q.done[i] : '')}">${q.done ? (q.marks[i] ? `<span class="small" style="color:#1F6E55">✓ ${esc(t('correctAns'))}</span>` : `<span class="small" style="color:#8E3049">✕ ${esc(t('answerIs'))}: ${esc(it.a)}</span><span class="small">${esc(it.explain || '')}</span>`) : ''}</div>`).join('')}
    ${q.done ? `<div class="drill"><b>${esc(t('yourScore'))}: ${q.marks.filter(Boolean).length}/${q.items.length}</b>${q.marks.some((m) => !m) ? `<span class="small">${esc(t('wrongSaved'))}</span>` : ''}</div>` : `<button class="btn" data-act="checkTenseQuiz">${esc(t('checkAnswers'))}</button>`}</section>`;
  A.genTenseQuiz = async (el) => {
    const x = C.TENSES.find((y) => y.id === el.dataset.id); const out = document.getElementById('tqOut'); el.disabled = true; out.innerHTML = PS.loading(t('generating'));
    try {
      const r = await PS.ai({ feature: 'tenses', max: 1500, system: coach(), prompt: `Create 6 fill-in-the-blank sentences practising "${x.en}" (formula ${x.f}), mixed with 1-2 contrast items from a commonly confused tense. Workplace / study-abroad contexts. Put the base verb in brackets after ___. Return JSON {"items":[{"q":"","a":"exact answer words (alternatives separated by /)","explain":"short, in ${PS.langName()}"}]}` });
      st.tq = { id: x.id, name: x.en, items: r.items || [] }; out.innerHTML = tenseQuizHtml(st.tq);
    } catch (e) { out.innerHTML = `<div class="card">⚠ ${esc(e.message)}</div>`; }
    el.disabled = false;
  };
  A.checkTenseQuiz = () => {
    const q = st.tq; q.done = q.items.map((it, i) => document.getElementById('tq' + i).value.trim());
    q.marks = q.items.map((it, i) => String(it.a).split('/').some((a) => PS.norm(a) === PS.norm(q.done[i])));
    q.items.forEach((it, i) => { if (!q.marks[i] && q.done[i]) PS.addMistake({ original: it.q.replace('___', q.done[i]), corrected: it.q.replace('___', String(it.a).split('/')[0].trim()), category: 'Tenses', pattern: q.name, explanation: it.explain || '', source: 'tenses' }); });
    PS.mark('review'); PS.save(); document.getElementById('tqOut').innerHTML = tenseQuizHtml(q);
  };

  /* ================= Read & Listen stories ================= */
  const splitSent = (text) => String(text).match(/[^.!?]+[.!?]+["”’]?\s*|[^.!?]+$/g).map((s) => s.trim()).filter(Boolean);
  const allStories = () => C.STORIES.concat(S().stories);
  V.stories = function () {
    return `<div class="page">${PS.back('#english', esc(t('geStories')))}
      <section class="card"><div class="row">${ic('story', '#E0EEFF')}<span class="stack grow" style="gap:0"><b>${esc(t('newStory'))}</b><span class="small">${esc(t('newStorySub'))}</span></span></div>
        <div class="field"><label class="lbl" for="sFocus">${esc(t('focusTense'))}</label><select id="sFocus" class="in">${C.TENSES.slice(0, 12).map((x) => `<option>${esc(x.en)}</option>`).join('')}<option>Mixed tenses</option></select></div>
        <div class="field"><label class="lbl" for="sTopic">${esc(t('storyTopic'))}</label><input id="sTopic" class="in" placeholder="${esc(t('storyTopicPh'))}"></div>
        <button class="btn" data-act="genStory">${icon('spark', 20)}${esc(t('generate'))}</button><div id="stOut"></div></section>
      <section class="stack" style="gap:8px">${allStories().map((x) => `<a class="tile h" href="#story/${x.id}">${ic('story', '#E0EEFF', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(x.title)}</span><span class="s">${esc(x.focus)} · ${esc(x.level || 'B2')}</span></span></a>`).join('')}</section></div>`;
  };
  A.genStory = async (el) => {
    const out = document.getElementById('stOut'); el.disabled = true; out.innerHTML = PS.loading(t('generating'));
    const focus = document.getElementById('sFocus').value, topic = document.getElementById('sTopic').value.trim() || 'work life and studying abroad';
    try {
      const r = await PS.ai({ feature: 'story', max: 1200, system: coach(), prompt: `Write an ORIGINAL short story (170-220 words, B2 level, natural modern English) that uses "${focus}" many times naturally. Topic: ${topic}. Return JSON {"title":"","focus":"${focus}","level":"B2","text":""}` });
      if (!r.text) throw new Error(t('aiBadFormat'));
      const story = { id: 'u' + PS.uid(), title: r.title || focus, focus: r.focus || focus, level: r.level || 'B2', text: r.text };
      S().stories.unshift(story); PS.save(); PS.go('story/' + story.id);
    } catch (e) { out.innerHTML = `<div class="small">⚠ ${esc(e.message)}</div>`; el.disabled = false; }
  };
  const player = { idx: 0, playing: false, shadow: false };
  V.story = function (p) {
    const x = allStories().find((y) => y.id === p[0]); if (!x) return V.stories();
    if (!player.story || player.story.id !== x.id) { player.idx = 0; player.playing = false; }
    const sents = splitSent(x.text); player.story = x; player.sents = sents;
    return `<div class="page">${PS.back('#stories', esc(x.title))}
      <div class="row wrap"><span class="pill" style="background:#E0EEFF;color:#1F4778">${esc(t('focus'))}: ${esc(x.focus)}</span><span class="pill" style="background:#E0EEFF;color:#1F4778">Level ${esc(x.level || 'B2')}</span>${x.id[0] === 'u' ? `<button class="pill" style="background:#FCE4EA;color:#8E3049;border:none;cursor:pointer" data-act="delStory2" data-id="${x.id}">${esc(t('delete'))}</button>` : ''}</div>
      <article class="reader" id="reader">${sents.map((s, i) => `<span class="sent ${i === player.idx ? 'now' : ''}" data-i="${i}">${s.split(/(\s+)/).map((w) => /\s+/.test(w) ? w : `<span class="w" data-act="word" data-w="${esc(w.replace(/[^A-Za-z'’-]/g, ''))}">${esc(w)}</span>`).join('')}</span> `).join('')}</article>
      <span class="small">${esc(t('tapWordHint'))}</span>
      <section class="card">
        <div class="row" style="justify-content:center;gap:18px"><button class="iconbtn" style="border-radius:99px;width:48px;height:48px" data-act="pPrev" aria-label="${esc(t('prev'))}">⏮</button><button class="btn" style="width:64px;height:64px;border-radius:99px;padding:0;font-size:22px" data-act="pPlay" id="pBtn" aria-label="${esc(t('play'))}">▶</button><button class="iconbtn" style="border-radius:99px;width:48px;height:48px" data-act="pNext" aria-label="${esc(t('next'))}">⏭</button></div>
        <div class="between wrap"><div class="seg">${[0.75, 1, 1.25].map((r) => `<button class="${(S().voice.rate || 1) === r ? 'on' : ''}" data-act="pRate" data-v="${r}">${r}×</button>`).join('')}</div>
          <div class="seg">${['en-US', 'en-GB', 'en-AU'].map((a) => `<button class="${S().voice.accent === a ? 'on' : ''}" data-act="pAccent" data-v="${a}">${a.slice(3)}</button>`).join('')}</div></div>
        <button class="btn ${player.shadow ? 'rose' : 'soft'}" data-act="pShadow">${icon('mic', 20)}${esc(t('shadowMode'))}: ${player.shadow ? 'ON' : 'OFF'}</button>
        <span class="small">${esc(t('shadowHint'))}</span></section></div>`;
  };
  V.story_after = () => { player.playing = false; };
  const hl = () => { document.querySelectorAll('#reader .sent').forEach((el) => el.classList.toggle('now', +el.dataset.i === player.idx)); const n = document.querySelector('#reader .sent.now'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  const playFrom = () => {
    if (!player.playing || player.idx >= player.sents.length) { player.playing = false; const b = document.getElementById('pBtn'); if (b) b.textContent = '▶'; if (player.idx >= player.sents.length) { player.idx = 0; PS.mark('story'); PS.save({ noSync: true }); } return; }
    hl(); const text = player.sents[player.idx];
    PS.speak(text, { onend: () => {
      if (!player.playing) return;
      const go = () => { player.idx++; playFrom(); };
      if (player.shadow) setTimeout(go, Math.min(9000, 900 + text.split(/\s+/).length * 450)); else go();
    } });
  };
  A.pPlay = (el) => { if (player.playing) { player.playing = false; PS.stopSpeak(); el.textContent = '▶'; return; } player.playing = true; el.textContent = '❚❚'; playFrom(); };
  A.pPrev = () => { player.idx = Math.max(0, player.idx - 1); hl(); if (player.playing) { PS.stopSpeak(); playFrom(); } else PS.speak(player.sents[player.idx]); };
  A.pNext = () => { player.idx = Math.min(player.sents.length - 1, player.idx + 1); hl(); if (player.playing) { PS.stopSpeak(); playFrom(); } else PS.speak(player.sents[player.idx]); };
  A.pRate = (el) => { S().voice.rate = +el.dataset.v; PS.save({ noSync: true }); el.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === el)); };
  A.pAccent = (el) => { S().voice.accent = el.dataset.v; PS.save({ noSync: true }); el.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === el)); };
  A.pShadow = (el) => { player.shadow = !player.shadow; el.className = 'btn ' + (player.shadow ? 'rose' : 'soft'); el.lastChild.textContent = t('shadowMode') + ': ' + (player.shadow ? 'ON' : 'OFF'); };
  A.delStory2 = (el) => { if (!confirm(t('confirmDelete'))) return; S().stories = S().stories.filter((x) => x.id !== el.dataset.id); PS.save(); PS.go('stories'); };
  A.word = (el, e) => {
    const sent = el.closest('.sent'); if (sent && !player.playing) { player.idx = +sent.dataset.i; hl(); }
    const w = el.dataset.w; if (!w) return; PS.speak(w);
    const known = S().vocab.find((v) => v.word.toLowerCase() === w.toLowerCase());
    PS.sheet(`<div class="between"><h2 class="h2" style="font-size:24px">${esc(w)}</h2><button class="iconbtn" data-act="say" data-text="${esc(w)}" aria-label="${esc(t('listen'))}">${icon('speaker', 24)}</button></div>
      <div id="wMeaning">${known ? `<div style="font-size:15px">${esc(known.ipa || '')} · ${esc(known.meaning || '')}</div>` : `<button class="btn soft" data-act="wordMeaning" data-w="${esc(w)}" data-ctx="${esc(sent ? sent.textContent : '')}">${icon('spark', 18)}${esc(t('meaningAI'))}</button>`}</div>
      ${known ? `<span class="pill" style="background:#DDF4EA;color:#1F6E55;align-self:flex-start">✓ ${esc(t('inVocab'))}</span>` : `<button class="btn mint" data-act="addVocab" data-w="${esc(w)}" data-ctx="${esc(sent ? sent.textContent.trim() : '')}">+ ${esc(t('saveToVocab'))}</button>`}`);
  };
  A.wordMeaning = async (el) => {
    const box = document.getElementById('wMeaning'); box.innerHTML = PS.loading();
    try {
      const r = await PS.ai({ feature: 'word', max: 300, system: coach(), prompt: `Word: "${el.dataset.w}" in the sentence: "${el.dataset.ctx}". Return JSON {"ipa":"British IPA","pos":"part of speech","meaning":"meaning in this context, in ${PS.langName()}","example":"a new short example sentence"}` });
      st.lastMeaning = Object.assign({ word: el.dataset.w }, r);
      box.innerHTML = `<div style="font-size:15px"><b>${esc(r.ipa || '')}</b> · <i>${esc(r.pos || '')}</i></div><div style="font-size:15px">${esc(r.meaning || '')}</div><div class="small">${esc(r.example || '')}</div>`;
    } catch (e) { box.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; }
  };

  /* ================= Vocabulary ================= */
  A.addVocab = (el) => {
    const w = el.dataset.w, m = st.lastMeaning && st.lastMeaning.word === w ? st.lastMeaning : {};
    if (S().vocab.some((v) => v.word.toLowerCase() === w.toLowerCase())) { PS.toast(t('inVocab')); return; }
    S().vocab.unshift({ id: PS.uid(), word: w, ipa: m.ipa || '', meaning: m.meaning || '', example: m.example || el.dataset.ctx || '', date: dayKey(), box: 0, due: dayKey() });
    PS.save(); PS.sheet(null); PS.toast('✓ ' + t('saveToVocab'));
  };
  V.vocab = function () {
    const s = S(), due = s.vocab.filter((v) => v.due <= dayKey() && v.box < 4);
    const card = st.vocabCard ? s.vocab.find((v) => v.id === st.vocabCard) : null;
    return `<div class="page">${PS.back('#english', esc(t('geVocab')), `<span class="pill" style="background:#DDF4EA;color:#1F6E55">${s.vocab.length}</span>`)}
      ${card ? `<section class="card" style="align-items:center;text-align:center;min-height:200px;justify-content:center"><b style="font-size:28px;font-family:Fredoka,Nunito,sans-serif">${esc(card.word)}</b><button class="btn soft sm" data-act="say" data-text="${esc(card.word)}">${icon('speaker', 18)}${esc(t('listen'))}</button>
          ${st.vocabShow ? `<div style="font-size:15px">${esc(card.ipa)} · ${esc(card.meaning)}</div><div class="small">${esc(card.example)}</div><div class="row" style="width:100%"><button class="btn mint" style="flex:1" data-act="vGrade" data-ok="1">${esc(t('gotIt'))}</button><button class="btn rose" style="flex:1" data-act="vGrade" data-ok="0">${esc(t('notYet'))}</button></div>` : `<button class="btn" data-act="vShow">${esc(t('showMeaning'))}</button>`}</section>`
      : due.length ? `<button class="btn" data-act="vStart">${icon('vocab', 22)}${esc(t('reviewWords', { n: due.length }))}</button>` : ''}
      <section class="card"><h2 class="h2">${esc(t('addWord'))}</h2><div class="row"><input id="vw" class="in" placeholder="e.g. accountability"><button class="btn sm" data-act="vAdd">+</button></div><span class="small">${esc(t('addWordHint'))}</span></section>
      ${s.vocab.map((v) => `<div class="tile h"><button class="iconbtn" style="width:38px;height:38px;border:none;background:#DDF4EA" data-act="say" data-text="${esc(v.word)}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button><span class="stack grow" style="gap:0"><span class="t">${esc(v.word)} <span class="small">${esc(v.ipa || '')}</span></span><span class="s">${esc(v.meaning || '—')}</span></span><button class="btn sm ghost" data-act="vDel" data-id="${v.id}" aria-label="${esc(t('delete'))}">✕</button></div>`).join('')}</div>`;
  };
  A.vStart = () => { const d = S().vocab.filter((v) => v.due <= dayKey() && v.box < 4); st.vocabCard = d[0] && d[0].id; st.vocabShow = false; PS.render(); };
  A.vShow = () => { st.vocabShow = true; PS.render(); };
  A.vGrade = (el) => { const v = S().vocab.find((x) => x.id === st.vocabCard); if (v) { if (el.dataset.ok === '1') { v.box++; v.due = addDays(dayKey(), BOX[Math.min(4, v.box)] || 14); } else { v.box = 0; v.due = addDays(dayKey(), 1); } } PS.mark('review'); PS.save(); const d = S().vocab.filter((x) => x.due <= dayKey() && x.box < 4); st.vocabCard = d[0] && d[0].id; st.vocabShow = false; PS.render(); };
  A.vDel = (el) => { S().vocab = S().vocab.filter((v) => v.id !== el.dataset.id); PS.save(); PS.render(); };
  A.vAdd = async (el) => {
    const w = document.getElementById('vw').value.trim(); if (!w) return;
    if (S().vocab.some((v) => v.word.toLowerCase() === w.toLowerCase())) { PS.toast(t('inVocab')); return; }
    const item = { id: PS.uid(), word: w, ipa: '', meaning: '', example: '', date: dayKey(), box: 0, due: dayKey() };
    S().vocab.unshift(item); PS.save(); PS.render();
    if (PS.conn().url) { try { const r = await PS.ai({ feature: 'word', max: 300, system: coach(), prompt: `Word or phrase: "${w}". Return JSON {"ipa":"British IPA","meaning":"common meaning in ${PS.langName()}","example":"short natural example sentence"}` }); Object.assign(item, { ipa: r.ipa || '', meaning: r.meaning || '', example: r.example || '' }); PS.save(); if (PS.route()[0] === 'vocab') PS.render(); } catch (e) { /* offline is fine */ } }
  };
})();
