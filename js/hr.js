/* Putri Space · HR Learning · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, C = PS.C, V = PS.views, A = PS.acts;
  const { esc, ic, icon, dayKey } = PS;
  const t = PS.t, S = () => PS.S();
  const TNAME = (n) => PS.L(C.HR_TOPICS[n]);
  const groupOf = (n) => C.HR_GROUPS.find((g) => g.topics.includes(+n));
  const cardsIn = (n) => S().hrCards.filter((c) => +c.topic === +n).sort((a, b) => String(a.no).localeCompare(String(b.no)));
  const known = (id) => !!(S().hr[id] && S().hr[id].known);
  const hrs = (id) => (S().hr[id] = S().hr[id] || {});

  /* ---------- import ---------- */
  PS.importCards = function (obj) {
    const s = S(); let added = 0, updated = 0;
    (obj.cards || []).forEach((c) => {
      if (!c || !c.title) return;
      c.id = c.id || 'c' + PS.uid(); c.topic = +c.topic || 1;
      const i = s.hrCards.findIndex((x) => x.id === c.id);
      if (i >= 0) { s.hrCards[i] = Object.assign(s.hrCards[i], c); updated++; } else { s.hrCards.push(c); added++; }
    });
    PS.save(); PS.toast(t('cardsImported', { a: added, u: updated }), 3500); PS.sheet(null); PS.render();
  };
  // Text block format: cards separated by "---"; lines "Key: value"
  const parseBlock = (txt) => {
    const cards = [];
    txt.replace(/^#PUTRISPACE-HR\s*/i, '').split(/\n-{3,}\n/).forEach((chunk) => {
      const c = { points: [] }; let quiz = [];
      chunk.split('\n').forEach((line) => {
        const m = line.match(/^\s*([A-Za-z ]+?)\s*:\s*(.*)$/); if (!m) return;
        const k = m[1].toLowerCase(), v = m[2].trim();
        if (/^(topik|topic)$/.test(k)) c.topic = parseInt(v, 10) || 1;
        else if (/^(kartu|card|judul|title)$/.test(k)) c.title = v;
        else if (/^(sub|subjudul|subtitle)$/.test(k)) c.subtitle = v;
        else if (/^(ringkasan|summary|key idea|ide)$/.test(k)) c.key = v;
        else if (/^(poin|point|key point)$/.test(k)) c.points.push(v);
        else if (/^(contoh|example|in practice|praktik)$/.test(k)) c.practice = v;
        else if (/^(kritik|critique)$/.test(k)) c.critique = v;
        else if (/^(istilah|terms|key terms)$/.test(k)) c.terms = v;
        else if (/^(sumber|source|sources)$/.test(k)) c.sources = v;
        else if (/^(kuis|quiz)$/.test(k)) { const [q, a] = v.split('|'); if (q && a) quiz.push({ q: q.trim(), a: a.trim() }); }
      });
      if (c.title) { c.quiz = quiz; c.id = 'c' + PS.norm(c.title).replace(/\s+/g, '-').slice(0, 40); c.src = c.sources ? '' : 'Claude chat'; cards.push(c); }
    });
    return cards;
  };

  /* ---------- HR home ---------- */
  V.hr = function (p) {
    if (p[0] === 'topic') return topicView(+p[1]);
    if (p[0] === 'card') return cardView(p[1]);
    if (p[0] === 'quiz') return quizView(p[1]);
    const s = S(), all = s.hrCards, kn = all.filter((c) => known(c.id)).length;
    const qs = s.hrQuiz.slice(0, 10), avg = qs.length ? Math.round(qs.reduce((a, b) => a + b.pct, 0) / qs.length) : null;
    const last = s.lastCard && all.find((c) => c.id === s.lastCard);
    const head = `<div class="top"><div class="grow"><div class="eyebrow">HR Learning</div><h1 class="h1">${esc(t('hrTitle', { goal: (s.profile && s.profile.goal) || t('hrGoalDefault') }))}</h1></div></div>`;
    if (!all.length) return `<div class="page">${head}<div class="card" style="align-items:center;text-align:center">${PS.owl(false, 80)}<b style="font-size:16px">${esc(t('hrEmpty'))}</b><span class="small">${esc(t('hrEmptySub'))}</span><button class="btn" data-act="importCards">${icon('importW', 22)}${esc(t('importCards'))}</button><a class="btn soft" href="#pdf">${esc(t('pdfTitle'))}</a></div>${groupsHtml()}</div>`;
    return `<div class="page">${head}
      ${last ? `<a class="hero" href="#hr/card/${last.id}" style="background:#5BBF97;text-decoration:none"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">${esc(t('continueLearning'))}</span><span class="big" style="font-size:18px;text-shadow:0 1px 0 rgba(0,0,0,.12)">${esc(last.title)}</span><span style="font-size:12px;font-weight:700">${esc(TNAME(last.topic))}${last.page ? ' · ' + esc(t('pageN', { n: last.page })) : ''}</span></div>${PS.owl(true, 60)}</a>` : ''}
      <div class="grid3"><div class="stat"><b style="color:#4B3DB0">${all.length}</b><span>${esc(t('cards'))}</span></div><div class="stat"><b style="color:#1F6E55">${kn}</b><span>${esc(t('understood'))}</span></div><div class="stat"><b style="color:#9A4A22">${avg == null ? '–' : avg + '%'}</b><span>${esc(t('quizScore'))}</span></div></div>
      ${groupsHtml()}
      <div class="row"><button class="btn" style="flex:1" data-act="importCards">${icon('importW', 20)}${esc(t('importCards'))}</button><a class="btn mint" style="flex:1" href="#hr/quiz/all">${icon('quiz', 20)}${esc(t('randomQuiz'))}</a></div>
      <a class="tile h" href="#pdf" style="background:#EEEAFE;border:none">${ic('reading', '#fff', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('pdfTitle'))}</span><span class="s" style="color:#4B3DB0">${esc(t('pdfTileSub'))}</span></span></a></div>`;
  };
  function groupsHtml() {
    return C.HR_GROUPS.map((g) => `<div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:${g.ink};color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">${g.id}</span><h2 class="h2" style="color:${g.ink};font-size:17px">${esc(PS.L(g.name))}${g.star ? icon('star', 16) : ''}</h2></div>
      <section class="grid2">${g.topics.map((n) => { const cs = cardsIn(n), k = cs.filter((c) => known(c.id)).length, pct = cs.length ? Math.round((k / cs.length) * 100) : 0, prio = C.HR_TOPICS[n].prio;
        return `<a class="tile" href="#hr/topic/${n}" style="border:${prio ? '1.5px solid ' + g.bar : '1px solid #ECE7FA'};min-height:116px"><div class="between" style="align-items:flex-start">${ic('t' + n, g.bg)}<span class="small">${n}</span></div><span class="t" style="font-size:13.5px;line-height:1.25">${esc(TNAME(n))}</span>${cs.length ? `<span class="s">${k}/${cs.length} ${esc(t('cards'))}</span><div class="bar" style="background:${g.bg};height:6px"><i style="width:${pct}%;background:${g.bar}"></i></div>` : `<span class="s">${esc(t('noCardsYet'))}</span>`}</a>`; }).join('')}</section>`).join('');
  }

  A.importCards = () => PS.sheet(`<h2 class="h2">${icon('import', 24)}${esc(t('importCards'))}</h2>
    <p class="small" style="margin:0">${esc(t('importHint'))}</p>
    <button class="btn soft" data-act="importFile">${esc(t('chooseFile'))}</button><input type="file" id="cardFile" accept=".json,application/json,.txt" hidden data-change="cardFileChosen">
    <label class="lbl" for="cardPaste">${esc(t('orPaste'))}</label><textarea id="cardPaste" class="in" rows="7" data-nofocus="1" placeholder="#PUTRISPACE-HR&#10;Topik: 9&#10;Kartu: Fraud Triangle&#10;Ringkasan: …&#10;Kuis: … | …"></textarea>
    <button class="btn" data-act="importPaste">${esc(t('import'))}</button>`);
  A.importFile = () => document.getElementById('cardFile').click();
  A.cardFileChosen = (el) => { const f = el.files[0]; if (!f) return; f.text().then(handleImportText); };
  A.importPaste = () => handleImportText(document.getElementById('cardPaste').value);
  function handleImportText(txt) {
    txt = String(txt || '').trim(); if (!txt) return;
    try {
      if (txt[0] === '{' || txt[0] === '[') { const o = JSON.parse(txt); if (o && o.type === 'putrispace-card-images') { PS.importImages(o); return; } if (o && o.type === 'putrispace-speaking') { PS.importSpeaking(o); return; } PS.importCards(Array.isArray(o) ? { cards: o } : o); return; }
      const cards = parseBlock(txt); if (!cards.length) throw new Error('empty'); PS.importCards({ cards });
    } catch (e) { PS.toast(t('badFile')); }
  }

  /* ---------- topic ---------- */
  function topicView(n) {
    const g = groupOf(n) || C.HR_GROUPS[0], cs = cardsIn(n);
    return `<div class="page">${PS.back('#hr', esc(TNAME(n)))}
      <section class="card" style="background:${g.bg};border:none;flex-direction:row;align-items:center">${ic('t' + n, '#fff')}<span class="stack grow" style="gap:2px"><b style="color:${g.ink}">${esc(PS.L(g.name))}</b><span class="small" style="color:${g.ink}">${cs.filter((c) => known(c.id)).length}/${cs.length} ${esc(t('understood'))}</span></span>${cs.length >= 4 ? `<a class="btn sm" style="background:${g.ink}" href="#hr/quiz/${n}">${esc(t('quiz'))}</a>` : ''}</section>
      ${cs.length ? cs.map((c, i) => `${c.chapter && (i === 0 || cs[i - 1].chapter !== c.chapter) ? `<div class="small" style="margin-top:6px;color:${g.ink};font-weight:800">${c.ch ? esc(c.ch) + ' · ' : ''}${esc(c.chapter)}</div>` : ''}<a class="tile h" href="#hr/card/${c.id}"><span class="ic sm" style="background:${known(c.id) ? '#DDF4EA' : g.bg};font-size:11px;font-weight:800;color:${g.ink}">${known(c.id) ? '✓' : esc(c.no || '•')}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(c.title)}</span><span class="s">${esc(c.subtitle || c.chapter || '')}</span></span>${S().hr[c.id] && S().hr[c.id].note ? icon('journal', 18) : ''}</a>`).join('')
        : `<div class="empty">${PS.owl(false, 64)}${esc(t('noCardsTopic'))}<button class="btn sm" data-act="importCards">${esc(t('importCards'))}</button></div>`}</div>`;
  }

  /* ---------- card (reading mode) ---------- */
  function cardView(id) {
    const s = S(), c = s.hrCards.find((x) => x.id === id); if (!c) return V.hr([]);
    const st = hrs(id), g = groupOf(c.topic) || C.HR_GROUPS[0], sib = cardsIn(c.topic), i = sib.findIndex((x) => x.id === id);
    if (s.lastCard !== id) { s.lastCard = id; PS.mark('hr'); PS.save({ noSync: true }); }
    const sec = (color, label, body) => body ? `<div><div class="sec-t" style="color:${color}">${label}</div>${body}</div>` : '';
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#hr/topic/' + c.topic, `<span style="font-size:12px;color:${g.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(TNAME(c.topic))}${c.no ? ' · ' + esc(c.no) : ''}</span>${esc(c.title)}`, `<button class="iconbtn" style="background:#E0EEFF;border:none" data-act="cardListen" data-id="${id}" aria-label="${esc(t('listen'))}">${icon('speaker', 24)}</button>`)}
      <article class="read-mode stack" style="gap:16px;padding:4px 2px">
        ${c.subtitle ? `<div style="font-style:italic;color:#6B6585">${esc(c.subtitle)}</div>` : ''}
        ${sec('#4B3DB0', '📌 Key idea', `<p style="margin:0">${esc(c.key)}</p>`)}
        <figure id="cardVis" style="margin:0;display:none"></figure>
        ${sec('#9A4A22', c.tip ? '🧭 When to use it' : '🔑 Key points', (c.points || []).length ? `<ul style="margin:0;padding-left:20px">${c.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '')}
        ${sec('#1F6E55', c.tip ? '📖 Real-life example' : '💡 In practice', c.practice ? `<p style="margin:0">${esc(c.practice)}</p>` : '')}
        ${sec('#6B4E00', '✨ Pro tip', c.tip ? `<p style="margin:0">${esc(c.tip)}</p>` : '')}
        ${sec('#8E3049', '⚖ Critique & limits', c.critique ? `<p style="margin:0">${esc(c.critique)}</p>` : '')}
        ${sec('#2B5C99', '🔤 Key terms', c.terms ? `<p style="margin:0">${esc(c.terms)}</p>` : '')}
        ${c.sources ? `<div class="small">📚 ${esc(c.sources)}${c.page ? ' · ' + esc(c.src || '') + ' p.' + c.page : ''}</div>` : ''}
      </article>
      <section class="card" style="border:1.5px dashed #B3A8EC"><label class="lbl" for="cardNote">${icon('journal', 18)} ${esc(t('myNote'))}</label><textarea id="cardNote" class="in" rows="3" data-in="cardNote" data-id="${id}" data-nofocus="1" placeholder="${esc(t('notePh'))}">${esc(st.note || '')}</textarea></section>
      <div class="row"><button class="btn ${known(id) ? 'mint' : ''}" style="flex:1" data-act="toggleKnown" data-id="${id}">${known(id) ? '✓ ' + esc(t('understood')) : esc(t('markUnderstood'))}</button><button class="btn soft" data-act="askCard" data-id="${id}">${icon('spark', 20)}${esc(t('askAI'))}</button></div>
      <div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#hr/card/${i > 0 ? sib[i - 1].id : ''}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${sib.length}</span><a class="btn ghost sm" style="flex:1;${i < sib.length - 1 ? '' : 'visibility:hidden'}" href="#hr/card/${i < sib.length - 1 ? sib[i + 1].id : ''}">${esc(t('next'))} ›</a></div></div>`;
  }
  V.hr_after = async (p) => {
    if (p[0] !== 'card') return;
    const box = document.getElementById('cardVis'); if (!box) return;
    const src = await PS.img.get(p[1]); if (!src || !document.body.contains(box)) return;
    const c = S().hrCards.find((x) => x.id === p[1]) || {};
    box.style.display = 'block';
    box.innerHTML = `<div class="sec-t" style="color:#2B5C99">🗺 Visual</div><button data-act="zoomImg" data-id="${esc(p[1])}" style="border:none;padding:0;background:none;width:100%;cursor:zoom-in" aria-label="${esc(t('enlarge'))}"><img src="${src}" alt="${esc(c.title || '')}" style="width:100%;display:block;border-radius:14px;border:1px solid #ECE7FA;background:#fff"></button><div class="small" style="font-family:Nunito,sans-serif;margin-top:4px">${esc(t('tapToEnlarge'))}</div>`;
  };
  A.zoomImg = async (el) => { const src = await PS.img.get(el.dataset.id); if (src) PS.sheet(`<div style="overflow:auto;-webkit-overflow-scrolling:touch;max-height:75vh"><img src="${src}" alt="" style="width:200%;max-width:none;display:block"></div><span class="small">${esc(t('scrollToSee'))}</span><button class="btn soft" data-act="closeSheet">${esc(t('close'))}</button>`); };
  A.closeSheet = () => PS.sheet(null);
  PS.inputs.cardNote = (el) => { hrs(el.dataset.id).note = el.value; clearTimeout(PS._nt); PS._nt = setTimeout(() => PS.save(), 800); };
  A.toggleKnown = (el) => { const st = hrs(el.dataset.id); st.known = !st.known; PS.save(); PS.render(); };
  A.cardListen = (el) => { const c = S().hrCards.find((x) => x.id === el.dataset.id); if (!c) return; PS.speak([c.title + '.', c.key, ...(c.points || []), c.practice ? 'In practice: ' + c.practice : '', c.critique ? 'Critique: ' + c.critique : '', c.tip ? 'Pro tip: ' + c.tip : ''].filter(Boolean).join(' ')); };
  A.askCard = (el) => PS.sheet(`<div class="row">${PS.owl(false, 40)}<h2 class="h2">${esc(t('askAI'))}</h2></div>
    <div class="row wrap">${['askSimple', 'askReg', 'askQuiz', 'askFraud'].map((k) => `<button class="chip" data-act="askPreset" data-id="${el.dataset.id}" data-k="${k}">${esc(t(k))}</button>`).join('')}</div>
    <div class="row"><input id="askQ" class="in" data-nofocus="1" placeholder="${esc(t('askPh'))}"><button class="btn sm" data-act="askGo" data-id="${el.dataset.id}">${esc(t('ask'))}</button></div>
    <div id="askOut" class="stack"></div>`);
  A.askPreset = (el) => { document.getElementById('askQ').value = t(el.dataset.k + 'Q'); A.askGo(el); };
  A.askGo = async (el) => {
    const c = S().hrCards.find((x) => x.id === el.dataset.id), q = document.getElementById('askQ').value.trim(); if (!q || !c) return;
    const out = document.getElementById('askOut'); out.innerHTML = PS.loading();
    try {
      const ans = await PS.ai({ feature: 'hr', max: 900, json: false, system: `You are an HRM tutor helping an adult learner who studies HR management, with an interest in ethical HR strategy. Answer in ${PS.langName()}, concise (max ~180 words), plain text with short paragraphs or "- " bullets, no markdown headings. Use generic public-sector examples; never invent confidential facts about any organisation.`,
        prompt: `Topic card: ${c.title} — ${c.key}\nKey points: ${(c.points || []).join(' ')}\nIn practice: ${c.practice || ''}\nQuestion: ${q}` });
      out.innerHTML = `<div style="white-space:pre-wrap;font-size:14.5px;line-height:1.55;background:#FAF7FF;border-radius:14px;padding:12px">${esc(ans)}</div><button class="btn mint sm" data-act="ansToNote" data-id="${c.id}">+ ${esc(t('addToNote'))}</button>`;
      st_last = ans;
    } catch (e) { out.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; }
  };
  let st_last = '';
  A.ansToNote = (el) => { const h = hrs(el.dataset.id); h.note = ((h.note || '') + '\n\n' + st_last).trim(); PS.save(); PS.sheet(null); PS.render(); PS.toast('✓'); };

  /* ---------- quiz (offline, generated from cards) ---------- */
  let qz = null;
  function buildQuiz(scope) {
    const pool = scope === 'all' ? S().hrCards : cardsIn(+scope);
    const custom = []; pool.forEach((c) => (c.quiz || []).forEach((q) => custom.push({ kind: 'qa', q: q.q, a: q.a, card: c })));
    const picks = PS.shuffle(pool).slice(0, Math.min(10, pool.length));
    const items = picks.map((c) => {
      const others = PS.shuffle(pool.filter((x) => x.id !== c.id)).slice(0, 3).map((x) => x.title);
      const words = c.title.split(/[\s:&()–-]+/).filter((w) => w.length > 3);
      let clue = c.key || ''; words.forEach((w) => { clue = clue.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '▢▢▢'); });
      return { kind: 'mc', q: clue, options: PS.shuffle([c.title, ...others]), a: c.title, card: c };
    });
    return { scope, items: PS.shuffle(items.concat(PS.shuffle(custom).slice(0, 3))).slice(0, 10), i: 0, score: 0, picked: null };
  }
  function quizView(scope) {
    if (!qz || qz.scope !== scope || qz.finished === 'reset') qz = buildQuiz(scope);
    const back = scope === 'all' ? '#hr' : '#hr/topic/' + scope;
    if (qz.items.length < 2) return `<div class="page">${PS.back(back, esc(t('quiz')))}<div class="empty">${esc(t('needMoreCards'))}</div></div>`;
    if (qz.i >= qz.items.length) {
      const pct = Math.round((qz.score / qz.items.length) * 100);
      return `<div class="page">${PS.back(back, esc(t('quiz')))}<div class="card" style="align-items:center;text-align:center">${PS.owl(pct >= 70, 90)}<b style="font-family:Fredoka,Nunito,sans-serif;font-size:30px;color:#4B3DB0">${qz.score}/${qz.items.length}</b><span>${esc(pct >= 70 ? t('quizGreat') : t('quizKeepGoing'))}</span><button class="btn" data-act="quizAgain">${esc(t('again'))}</button></div></div>`;
    }
    const it = qz.items[qz.i], answered = qz.picked != null;
    return `<div class="page">${PS.back(back, esc(t('quiz')), `<span class="pill" style="background:#DDF4EA;color:#1F6E55">${qz.i + 1}/${qz.items.length}</span>`)}
      <section class="card"><span class="small">${esc(it.kind === 'mc' ? t('whichModel') : t('question'))}</span><div class="read-mode" style="background:none;font-size:16px">${esc(it.q)}</div>
      ${it.kind === 'mc' ? `<div class="stack" style="gap:8px">${it.options.map((o, j) => `<button class="opt ${answered ? (o === it.a ? 'ok' : qz.picked === j ? 'no' : '') : ''}" data-act="quizPick" data-j="${j}" ${answered ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`
        : answered ? `<div class="right">${esc(it.a)}</div><div class="row"><button class="btn mint sm" style="flex:1" data-act="quizSelf" data-ok="1">${esc(t('gotIt'))}</button><button class="btn rose sm" style="flex:1" data-act="quizSelf" data-ok="0">${esc(t('notYet'))}</button></div>` : `<button class="btn soft" data-act="quizPick" data-j="-1">${esc(t('showAnswer'))}</button>`}
      ${answered && it.kind === 'mc' ? `<a class="small" href="#hr/card/${it.card.id}">${esc(t('openCard'))}: ${esc(it.card.title)}</a><button class="btn" data-act="quizNext">${esc(t('next'))}</button>` : ''}</section></div>`;
  }
  A.quizPick = (el) => { const it = qz.items[qz.i]; qz.picked = +el.dataset.j; if (it.kind === 'mc' && it.options[qz.picked] === it.a) qz.score++; PS.render(); };
  A.quizSelf = (el) => { if (el.dataset.ok === '1') qz.score++; A.quizNext(); };
  A.quizNext = () => { qz.i++; qz.picked = null; if (qz.i >= qz.items.length) { S().hrQuiz.unshift({ date: dayKey(), scope: qz.scope, pct: Math.round((qz.score / qz.items.length) * 100) }); PS.mark('hr'); PS.save(); } PS.render(); };
  A.quizAgain = () => { qz = null; PS.render(); };
})();
