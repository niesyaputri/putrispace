/* Putri Space · shared Academic Library engine (lessons, passages with highlighter, practice, error log) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, A = PS.acts, IN = PS.inputs;
  const { esc, icon } = PS;
  const t = PS.t, S = () => PS.S();
  const LIB = (PS.LIB = { reg: {} });

  // highlighter + passage styles (kept here so styles.css does not change)
  const css = document.createElement('style');
  css.textContent = '.hw{border-radius:3px;cursor:pointer;-webkit-tap-highlight-color:transparent}.hw.on{background:#FFE58A;box-shadow:0 0 0 1px #FFE58A}.psg p{margin:0 0 12px}.psg p:last-child{margin:0}.lb-tabs a{flex:1;text-align:center;min-height:36px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:12.5px;font-weight:800;text-decoration:none;color:var(--muted2)}.lb-tabs a.on{background:#fff;color:var(--pri-d)}';
  document.head.appendChild(css);

  LIB.keep = () => { const y = window.scrollY; PS.render(); window.scrollTo(0, y); };
  LIB.state = (ns) => { const s = S(); s[ns] = s[ns] || {}; const l = s[ns]; ['done', 'notes'].forEach((k) => { l[k] = l[k] || {}; }); ['log', 'stars'].forEach((k) => { l[k] = l[k] || []; }); return l; };
  LIB.pic = (src, alt) => `<button class="ls-pic" data-act="lsZoom" data-src="${esc(src)}" aria-label="${esc(t('enlarge'))}" style="border:none;padding:0;background:none;width:100%;cursor:zoom-in"><img src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" style="width:100%;display:block;border-radius:14px;border:1px solid #ECE7FA;background:#fff" onerror="this.closest('.ls-pic').style.display='none'"></button>`;
  A.lsZoom = A.lsZoom || ((el) => PS.sheet(`<div style="overflow:auto;-webkit-overflow-scrolling:touch;max-height:75vh"><img src="${esc(el.dataset.src)}" alt="" style="width:190%;max-width:none;display:block"></div><span class="small">${esc(t('scrollToSee'))}</span><button class="btn soft" data-act="closeSheet">${esc(t('close'))}</button>`));
  A.closeSheet = A.closeSheet || (() => PS.sheet(null));
  const reasonName = (r) => (S().lang === 'en' ? r.en : r.id_);
  LIB.reasonName = reasonName;

  /* ---------- page frame + tabs ---------- */
  const TABS = [['learn', 'tabLearn'], ['ex', 'tabExample'], ['pr', 'tabPractice'], ['words', 'tabWords']];
  LIB.frame = (cfg, x, tab, body, list) => {
    const i = list.indexOf(x);
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#' + cfg.route, `<span style="font-size:12px;color:${cfg.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(x.code)} · ${esc(t('bookPage', { n: x.page }))}</span>${esc(x.title)}`)}
      <div class="seg lb-tabs" style="align-self:stretch">${TABS.map(([k, lab]) => `<a class="${tab === k ? 'on' : ''}" href="#${cfg.route}/${x.id}/${k}">${esc(t(lab))}</a>`).join('')}</div>
      ${body}
      <div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#${cfg.route}/${i > 0 ? list[i - 1].id : ''}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${list.length}</span><a class="btn ghost sm" style="flex:1;${i < list.length - 1 ? '' : 'visibility:hidden'}" href="#${cfg.route}/${i < list.length - 1 ? list[i + 1].id : cfg.after || ''}">${esc(t('next'))} ›</a></div></div>`;
  };
  const list = (arr, mark) => `<ul style="margin:0;padding-left:${mark ? 0 : 20}px;list-style:${mark ? 'none' : 'disc'}">${arr.map((s) => `<li style="margin:3px 0">${mark ? mark + ' ' : ''}${esc(s)}</li>`).join('')}</ul>`;
  const sec = (color, label, body) => `<div><div class="sec-t" style="color:${color}">${label}</div>${body}</div>`;

  LIB.learn = (cfg, x) => {
    PS.mark('review');
    return `${LIB.pic(cfg.img + x.id + '-idea.webp', x.title)}
      <section class="card" style="background:${cfg.bg};border:none"><span class="small" style="color:${cfg.ink}">💡 ${esc(t('ideaLine'))}</span><b style="font-size:15px;line-height:1.45;color:#2E2A45">${esc(x.idea.en)}</b><span style="font-size:13.5px;color:#4F4A68">${esc(x.idea.id)}</span><button class="btn soft sm" style="align-self:flex-start" data-act="say" data-text="${esc(x.idea.en)}">${icon('speaker', 18)}${esc(t('listen'))}</button></section>
      <article class="read-mode stack" style="gap:16px;padding:4px 2px">
        ${sec(cfg.ink, '🪜 ' + esc(t('stepsT')), `<ol style="margin:0;padding-left:22px">${x.steps.map((s) => `<li style="margin:4px 0">${esc(s)}</li>`).join('')}</ol>`)}
        ${sec('#6B4E00', '🧰 ' + esc(t('tipsT')), list(x.tips, '✓'))}
      </article>
      <section class="card"><h2 class="h2" style="font-size:16px">⚠️ ${esc(t('mistakesT'))}</h2>${x.mistakes.map(([w, r]) => `<div class="stack" style="gap:6px"><div class="wrong"><span>✕</span><span>${esc(w)}</span></div><div class="right"><span>✓</span><span>${esc(r)}</span></div></div>`).join('')}</section>
      <section class="card"><h2 class="h2" style="font-size:16px">📈 Band 6 → Band 7+ ${esc(x.band.label)}</h2>
        <div class="drill" style="background:#FCE4EA;color:#6E2238"><b style="font-size:12px">BAND 6</b><span style="font-size:14px">${esc(x.band.b6)}</span></div>
        <div class="drill" style="background:#DDF4EA;color:#164F3D"><b style="font-size:12px">BAND 7+</b><span style="font-size:14px">${esc(x.band.b7)}</span></div>
        <span class="small" style="font-weight:800">${esc(t('whyHigher'))}</span>${list(x.band.why)}</section>
      <a class="btn" href="#${cfg.route}/${x.id}/ex">${esc(t('tabExample'))} ›</a>`;
  };

  /* ---------- passage with tap-to-highlight ---------- */
  const hl = {};
  LIB.passage = (key, text, title) => {
    const set = hl[key] || (hl[key] = new Set());
    let n = 0;
    const paras = String(text).split(/\n\s*\n/).map((p) => `<p>${p.split(/(\s+)/).map((w) => (/^\s+$/.test(w) || !w ? w : `<span class="hw ${set.has(n) ? 'on' : ''}" data-act="lbHl" data-k="${esc(key)}" data-i="${n++}">${esc(w)}</span>`)).join('')}</p>`).join('');
    return `<article class="card read-mode psg" style="font-size:16px;line-height:1.7">${title ? `<h3 style="font-family:Fredoka,Nunito,sans-serif;font-size:19px;margin:0 0 4px">${esc(title)}</h3>` : ''}${paras}
      <div class="between" style="font-family:Nunito,sans-serif"><span class="small">🖍 ${esc(t('hlHint'))}</span>${set.size ? `<button class="btn ghost sm" data-act="lbHlClear" data-k="${esc(key)}">${esc(t('hlClear'))}</button>` : ''}</div></article>`;
  };
  A.lbHl = (el) => { const set = hl[el.dataset.k] || (hl[el.dataset.k] = new Set()), i = +el.dataset.i; if (set.has(i)) set.delete(i); else set.add(i); el.classList.toggle('on', set.has(i)); };
  A.lbHlClear = (el) => { delete hl[el.dataset.k]; LIB.keep(); };

  /* ---------- worked example ---------- */
  const exStep = {};
  LIB.example = (cfg, x) => {
    const e = x.ex, k = cfg.ns + ':' + x.id, n = exStep[k] || 0;
    return `<section class="card"><span class="small" style="color:${cfg.ink}">${esc(t('workedEx'))}</span>${cfg.exImg && cfg.exImg(x) ? LIB.pic(cfg.img + x.id + '-ex.webp', e.q) : `<b style="font-size:14.5px;line-height:1.5">${esc(e.q)}</b>`}</section>
      ${e.passage ? LIB.passage(k + ':ex', e.passage, cfg.exPassageLabel ? t(cfg.exPassageLabel) : '') : ''}
      <section class="card"><h2 class="h2" style="font-size:16px">🧭 ${esc(t('walkT'))}</h2>
        ${e.walk.slice(0, n).map(([s, tip], j) => `<div class="stack" style="gap:6px"><b style="font-size:14.5px">${j + 1}. ${esc(s)}</b><div class="drill" style="padding:9px 12px"><b style="font-size:11px;letter-spacing:.05em">TIP IN ACTION</b><span style="font-size:14px">${esc(tip)}</span></div></div>`).join('')}
        ${n < e.walk.length ? `<button class="btn soft" data-act="lbStep" data-k="${esc(k)}">${esc(n ? t('nextStep') : t('startWalk'))} (${n + 1}/${e.walk.length})</button>` : `<div class="right"><span>✓</span><b>${esc(e.answer)}</b></div><button class="btn ghost sm" data-act="lbStepReset" data-k="${esc(k)}">${esc(t('again'))}</button>`}</section>
      <a class="btn" href="#${cfg.route}/${x.id}/pr">${esc(t('tabPractice'))} ›</a>`;
  };
  A.lbStep = (el) => { exStep[el.dataset.k] = (exStep[el.dataset.k] || 0) + 1; LIB.keep(); };
  A.lbStepReset = (el) => { exStep[el.dataset.k] = 0; LIB.keep(); };

  /* ---------- vocabulary tab ---------- */
  LIB.words = (cfg, x) => {
    const L = LIB.state(cfg.ns);
    return `<section class="card"><h2 class="h2" style="font-size:16px">🔤 ${esc(t('vocabT'))}</h2>${x.vocab.map(([w, m]) => `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><span class="stack grow" style="gap:1px"><b style="font-size:14.5px">${esc(w)}</b><span class="small">${esc(m)}</span></span><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0" data-act="say" data-text="${esc(w.replace(/"/g, ''))}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button><button class="iconbtn" style="width:34px;height:34px;border:none;flex-shrink:0;font-weight:800;color:#1F6E55" data-act="lbToVocab" data-w="${esc(w)}" data-m="${esc(m)}" aria-label="${esc(t('addToMyVocab'))}">＋</button></div>`).join('')}<span class="small">＋ = ${esc(t('addToMyVocab'))}</span></section>
      <section class="card" style="background:#DDF4EA;border:none"><h2 class="h2" style="font-size:16px;color:#1F6E55">✅ ${esc(t('quickT'))}</h2>${list(x.quick, '✓')}</section>
      <section class="card" style="background:#FCE4EA;border:none"><h2 class="h2" style="font-size:16px;color:#8E3049">🚫 ${esc(t('killersT'))}</h2>${list(x.killers, '✕')}</section>
      <section class="card" style="border:1.5px dashed #B3A8EC"><label class="lbl" for="lbNote">${icon('journal', 18)} ${esc(t('myNote'))}</label><textarea id="lbNote" class="in" rows="3" data-in="lbNote" data-ns="${cfg.ns}" data-id="${x.id}" data-nofocus="1" placeholder="${esc(t('notePhLib'))}">${esc(L.notes[x.id] || '')}</textarea></section>`;
  };
  IN.lbNote = (el) => { LIB.state(el.dataset.ns).notes[el.dataset.id] = el.value; clearTimeout(PS._lbn); PS._lbn = setTimeout(() => PS.save(), 800); };
  LIB.toVocab = (w, m, ex) => {
    const s = S(); if (s.vocab.some((v) => v.word.toLowerCase() === w.toLowerCase())) { PS.toast(t('inVocab')); return false; }
    s.vocab.unshift({ id: PS.uid(), word: w, ipa: '', meaning: m || '', example: ex || '', date: PS.dayKey(), box: 0, due: PS.dayKey() });
    PS.save(); PS.toast(t('addedToVocab')); return true;
  };
  A.lbToVocab = (el) => LIB.toVocab(el.dataset.w, el.dataset.m, el.dataset.ex);

  /* ---------- practice engine ---------- */
  const pst = {};
  const qs = (key) => (pst[key] = pst[key] || { ans: {}, self: {} });
  const cleanAns = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/£/g, '').replace(/,(?=\d{3}\b)/g, '').replace(/(\d):(\d)/g, '$1.$2').replace(/[^a-z0-9.' ]+/g, ' ').replace(/\.(?!\d)/g, ' ').replace(/\s+/g, ' ').trim();
  const TF = { T: ['TRUE', 'FALSE', 'NOT GIVEN'], Y: ['YES', 'NO', 'NOT GIVEN'] };
  const isRight = (q, v) => {
    if (q.tf || q.pick) return String(v || '') === q.a;
    if (q.o) return String(v || '').toUpperCase() === q.a;
    const a = cleanAns(v); if (!a) return false;
    return q.a.some((x) => { const b = cleanAns(x); return a === b || a.replace(/\s+/g, '') === b.replace(/\s+/g, ''); });
  };
  const keyOf = (q) => q.key || (q.o ? q.a + ' — ' + q.o[q.a.charCodeAt(0) - 65] : q.tf || q.pick ? q.a : q.a[0]);
  const ctx = (key) => { const [ns, id] = key.split(':'); const cfg = LIB.reg[ns]; const x = cfg.find(id); return { cfg, x, pr: x.practice }; };
  LIB.practice = (cfg, x) => {
    const key = cfg.ns + ':' + x.id, st = qs(key), pr = x.practice, done = !!st.done, Q = pr.qs;
    const qHtml = Q.map((q, k) => {
      const v = st.ans[k], ok = done && st.marks[k];
      const btns = (labels, vals, wide) => `<div class="${wide ? 'stack' : 'row wrap'}" style="gap:6px">${labels.map((lab, j) => { const val = vals[j]; return `<button class="opt ${v === val ? 'sel' : ''} ${done ? (val === q.a ? 'ok' : v === val ? 'no' : '') : ''}" style="${wide ? '' : 'min-width:46px;text-align:center;font-weight:800'}" data-act="lbPick" data-key="${esc(key)}" data-k="${k}" data-v="${esc(val)}" ${done ? 'disabled' : ''}>${lab}</button>`; }).join('')}</div>`;
      let input;
      if (q.tf) input = btns(TF[q.tf].map(esc), TF[q.tf]);
      else if (q.pick) input = btns(q.pick.map(esc), q.pick);
      else if (q.o) input = btns(q.o.map((o, j) => `<b>${String.fromCharCode(65 + j)}</b> ${esc(o)}`), q.o.map((o, j) => String.fromCharCode(65 + j)), true);
      else if (q.rewrite) input = `<textarea class="in" rows="2" data-in="lbAns" data-key="${esc(key)}" data-k="${k}" placeholder="${esc(t('rewritePh'))}" ${done ? 'disabled' : ''}>${esc(v || '')}</textarea>`;
      else input = `<input class="in" data-in="lbAns" data-key="${esc(key)}" data-k="${k}" value="${esc(v || '')}" placeholder="${esc(t('typeAnswer'))}" autocapitalize="off" autocorrect="off" spellcheck="false" ${done ? 'disabled' : ''}>`;
      let res = '';
      if (done && q.rewrite) {
        const sm = st.self[k];
        res = `<div class="drill" style="background:#DDF4EA;color:#164F3D"><b style="font-size:12px">${esc(t('modelAns'))}</b><span style="font-size:14.5px">${esc(q.model)}</span><button class="iconbtn" style="width:34px;height:34px;border:none;background:#fff;align-self:flex-start" data-act="say" data-text="${esc(q.model.split(' / ')[0])}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button></div>
          <div class="row"><button class="btn sm ${sm === true ? 'mint' : 'ghost'}" style="flex:1" data-act="lbSelf" data-key="${esc(key)}" data-k="${k}" data-ok="1">✓ ${esc(t('selfOk'))}</button><button class="btn sm ${sm === false ? 'rose' : 'ghost'}" style="flex:1" data-act="lbSelf" data-key="${esc(key)}" data-k="${k}" data-ok="0">✕ ${esc(t('selfNo'))}</button></div>${sm === false && String(st.ans[k] || '').trim() ? `<span class="small">${esc(t('wrongSaved'))}</span>` : ''}`;
      } else if (done) {
        const r = st.reasons && st.reasons[k];
        res = ok ? `<span class="small" style="color:#1F6E55;font-weight:800">✓ ${esc(t('correctAns'))}</span>`
          : `<span class="small" style="color:#8E3049;font-weight:800">✕ ${esc(t('answerIs'))}: ${esc(keyOf(q))}</span>${cfg.reasons ? `<div class="stack" style="gap:6px;background:#FAF7FF;border-radius:12px;padding:8px 10px"><span class="small">${esc(t('whyWrong'))}</span><div class="row wrap" style="gap:6px">${cfg.reasons.map((rr) => `<button class="chip ${r === rr.id ? 'on' : ''}" style="min-height:32px;font-size:12px;padding:0 10px" data-act="lbReason" data-key="${esc(key)}" data-k="${k}" data-r="${rr.id}">${esc(reasonName(rr))}</button>`).join('')}</div></div>` : ''}`;
      }
      return `<div class="q"><b style="font-size:14.5px">${k + 1}. ${esc(q.q)}</b>${q.hint && (st.hints || q.rewrite) ? `<span class="pill" style="background:#FFF4D6;color:#6B4E00;align-self:flex-start">💡 ${esc(q.hint)}</span>` : ''}${input}${res}</div>`;
    }).join('');
    const auto = Q.filter((q) => !q.rewrite).length, selfN = Q.filter((q) => q.rewrite).length;
    const score = done ? st.marks.filter(Boolean).length : 0;
    const hasHints = Q.some((q) => q.hint && !q.rewrite);
    return `<section class="card"><div class="between"><span class="small" style="color:${cfg.ink}">${esc(t('practiceT'))}</span>${pr.mins ? `<button class="btn soft sm" data-act="timer" data-m="${pr.mins}" id="timerBtn">⏱ ${pr.mins}:00</button>` : ''}</div><b style="font-size:14.5px;line-height:1.45">${esc(pr.instr)}</b>
        ${pr.box ? `<div class="row wrap" style="gap:6px">${pr.box.map((b) => `<span class="pill" style="background:#EEEAFE;color:#4B3DB0;font-size:12px;white-space:normal;text-align:left">${esc(b)}</span>`).join('')}</div>` : ''}</section>
      ${pr.passage ? LIB.passage(key, pr.passage, pr.title) : ''}
      <section class="card"><div class="between"><h2 class="h2" style="font-size:16px">${icon('quiz', 22)}${esc(t('questions'))}</h2>${hasHints ? `<button class="chip ${st.hints ? 'on' : ''}" style="min-height:32px;font-size:12px" data-act="lbHints" data-key="${esc(key)}">💡 ${esc(t('hintsBtn'))}</button>` : ''}</div>${qHtml}
        ${done ? `<div class="drill" style="background:${cfg.bg};color:${cfg.ink}"><b>${esc(t('yourScore'))}: ${score}/${Q.length}</b>${selfN && Object.keys(st.self).length < selfN ? `<span class="small">${esc(t('selfGradeHint'))}</span>` : auto && score < Q.length && cfg.reasons ? `<span class="small">${esc(t('tagReasons'))}</span>` : score === Q.length ? `<span class="small">${esc(t('allRightLs'))}</span>` : ''}</div>
          <div class="row"><button class="btn soft sm" style="flex:1" data-act="lbRetry" data-key="${esc(key)}">${esc(t('again'))}</button>${auto && score < Q.length ? `<button class="btn sm" style="flex:1" data-act="lbAI" data-key="${esc(key)}">${icon('spark', 18)}${esc(t('aiExplain'))}</button>` : ''}</div><div id="lbAIout"></div>`
        : `<button class="btn" data-act="lbCheck" data-key="${esc(key)}">${esc(selfN && !auto ? t('compareModel') : t('checkAnswers'))}</button>`}</section>`;
  };
  IN.lbAns = (el) => { qs(el.dataset.key).ans[+el.dataset.k] = el.value; };
  A.lbPick = (el) => { qs(el.dataset.key).ans[+el.dataset.k] = el.dataset.v; el.parentElement.querySelectorAll('.opt').forEach((b) => b.classList.toggle('sel', b === el)); };
  A.lbHints = (el) => { const st = qs(el.dataset.key); st.hints = !st.hints; LIB.keep(); };
  const record = (key) => {
    const { cfg, x, pr } = ctx(key), st = qs(key), L = LIB.state(cfg.ns), prev = L.done[x.id];
    const score = st.marks.filter(Boolean).length, total = pr.qs.length;
    L.done[x.id] = { score, total, best: Math.max(score, prev ? prev.best || 0 : 0), date: PS.dayKey(), n: (prev ? prev.n || 0 : 0) + (st.counted ? 0 : 1) };
    st.counted = true;
  };
  A.lbCheck = (el) => {
    const key = el.dataset.key, st = qs(key), { cfg, pr } = ctx(key);
    if (pr.qs.some((q, k) => !String(st.ans[k] || '').trim())) { if (!confirm(t(pr.qs.every((q) => q.rewrite) ? 'blankConfirmW' : 'blankConfirm'))) return; }
    st.marks = pr.qs.map((q, k) => (q.rewrite ? null : isRight(q, st.ans[k])));
    st.done = true; st.reasons = {}; st.counted = false;
    if (cfg.mistakes) pr.qs.forEach((q, k) => { if (q.o && st.marks[k] === false && q.q.includes('___') && st.ans[k]) PS.addMistake({ original: q.q.replace('___', q.o[st.ans[k].charCodeAt(0) - 65]), corrected: q.q.replace('___', q.o[q.a.charCodeAt(0) - 65]), category: ctx(key).x.cat || 'Word choice', pattern: ctx(key).x.title, explanation: q.hint || '', source: cfg.srcName || cfg.ns }); });
    record(key); PS.mark(cfg.mark || 'review'); PS.save(); LIB.keep();
  };
  A.lbSelf = (el) => {
    const key = el.dataset.key, k = +el.dataset.k, st = qs(key), { cfg, x, pr } = ctx(key), q = pr.qs[k], ok = el.dataset.ok === '1';
    st.self[k] = ok; st.marks[k] = ok;
    if (!ok && String(st.ans[k] || '').trim()) PS.addMistake({ original: String(st.ans[k]).trim(), corrected: q.model.split(' / ')[0], category: x.cat || 'Other', pattern: x.title + (q.hint ? ' · ' + q.hint : ''), explanation: q.model, source: cfg.srcName || cfg.ns });
    record(key); PS.save(); LIB.keep();
  };
  A.lbRetry = (el) => { delete pst[el.dataset.key]; delete hl[el.dataset.key]; LIB.keep(); };
  A.lbReason = (el) => {
    const key = el.dataset.key, k = +el.dataset.k, st = qs(key), { cfg, x, pr } = ctx(key), L = LIB.state(cfg.ns), qid = x.id + ':' + k;
    L.log = L.log.filter((e) => e.qid !== qid || e.date !== PS.dayKey());
    if (st.reasons[k] === el.dataset.r) delete st.reasons[k];
    else { st.reasons[k] = el.dataset.r; L.log.unshift({ qid, date: PS.dayKey(), lesson: x.code, q: pr.qs[k].q, given: st.ans[k] || '', reason: el.dataset.r }); }
    L.log = L.log.slice(0, 300); PS.save();
    el.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.r === st.reasons[k]));
    if (st.reasons[k]) PS.toast(t('reasonSaved'));
  };
  A.lbAI = async (el) => {
    const key = el.dataset.key, st = qs(key), { cfg, x, pr } = ctx(key), out = document.getElementById('lbAIout');
    const wrong = pr.qs.map((q, k) => ({ q, k })).filter(({ q, k }) => !q.rewrite && !st.marks[k]);
    const items = wrong.map(({ q, k }) => `- Q${k + 1}: ${q.q}${q.o ? ' (' + q.o.map((o, j) => String.fromCharCode(65 + j) + ' ' + o).join(' / ') + ')' : ''} | her answer: "${st.ans[k] || '(blank)'}" | correct: "${keyOf(q)}"`).join('\n');
    el.disabled = true; out.innerHTML = PS.loading();
    try {
      const ans = await PS.ai({ feature: cfg.ns, max: 700, json: false, system: `You are a precise IELTS Academic coach for Putri (target band 7.5). Answer in ${PS.langName()}. Plain text, no markdown headings. For each wrong answer give 1-2 short lines: the evidence in the text (quote max 8 words), why her answer was wrong (trap type: Not Given logic, paraphrase, qualifier, word limit/form, distractor), and one habit for next time.`, prompt: `Task: ${x.code} ${x.title}. ${pr.instr}\n${pr.box ? 'OPTIONS: ' + pr.box.join(' | ') + '\n' : ''}TEXT:\n${pr.passage || ''}\nWRONG ANSWERS:\n${items}` });
      out.innerHTML = `<div style="white-space:pre-wrap;font-size:14.5px;line-height:1.55;background:#FAF7FF;border-radius:14px;padding:12px">${esc(ans)}</div>`;
    } catch (e) { out.innerHTML = `<span class="small">⚠ ${esc(e.message)}</span>`; el.disabled = false; }
  };

  /* ---------- hub helpers ---------- */
  LIB.errorCard = (cfg) => {
    const L = LIB.state(cfg.ns), counts = {}; L.log.forEach((e) => { counts[e.reason] = (counts[e.reason] || 0) + 1; });
    const maxC = Math.max(1, ...Object.values(counts));
    return `<section class="card"><div class="between"><h2 class="h2" style="font-size:16px">${icon('mistakes', 22)}${esc(t('errorPattern'))}</h2><span class="small">${L.log.length}</span></div>
      ${L.log.length ? cfg.reasons.map((r) => `<div class="stack" style="gap:3px"><div class="between"><span style="font-size:13px;font-weight:700">${esc(reasonName(r))}</span><span class="small">${counts[r.id] || 0}</span></div><div class="bar" style="height:7px;background:#F3F0FF"><i style="width:${Math.round(((counts[r.id] || 0) / maxC) * 100)}%;background:#F7A9BC"></i></div></div>`).join('') + `<span class="small">${esc(t('errorPatternHint'))}</span>` : `<span class="small">${esc(t('noErrors'))}</span>`}</section>`;
  };
  LIB.tile = (cfg, x, bg, ink) => { const d = LIB.state(cfg.ns).done[x.id]; return `<a class="tile h" href="#${cfg.route}/${x.id}"><span class="ic sm" style="background:${d ? '#DDF4EA' : bg};padding:6px"><img src="${esc(cfg.img + x.id + '-icon.webp')}" alt="" style="width:100%;height:100%;object-fit:contain" onerror="this.replaceWith(document.createTextNode('${esc(x.code)}'))"></span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(x.code)} · ${esc(x.title)}</span><span class="s">${esc(x.sub)}</span></span>${d ? `<span class="pill" style="background:${d.best === d.total ? '#DDF4EA' : bg};color:${d.best === d.total ? '#1F6E55' : ink}">${d.best}/${d.total}</span>` : ''}</a>`; };
  LIB.top30 = (cfg, groups, note, code, page) => {
    const L = LIB.state(cfg.ns); let n = 0;
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#' + cfg.route, `<span style="font-size:12px;color:${cfg.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(code)} · ${esc(t('bookPage', { n: page }))}</span>${esc(t(cfg.top30Title))}`)}
      <section class="card" style="background:${cfg.bg};border:none"><span style="font-size:14px;color:${cfg.ink}">${esc(t('top30IntroGen'))}</span></section>
      ${L.stars.length ? `<section class="card" style="border:1.5px solid #F2C14E"><h2 class="h2" style="font-size:16px">⭐ ${esc(t('myTop3'))}</h2>${L.stars.map((s) => `<div style="font-size:14.5px;font-weight:700">• ${esc(s)}</div>`).join('')}</section>` : `<span class="small">⭐ ${esc(t('myTop3Hint'))}</span>`}
      ${groups.map((g) => `<section class="card" style="gap:8px"><h2 class="h2" style="font-size:16px;color:${g.ink}">${esc(g.name)}</h2>${g.tips.map((tip) => { n++; const on = L.stars.includes(tip); return `<div class="row" style="align-items:flex-start;border-top:1px dashed #ECE7FA;padding-top:8px"><span style="min-width:26px;height:26px;border-radius:9px;background:${g.bg};color:${g.ink};font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center">${n}</span><span class="grow" style="font-size:14.5px;line-height:1.45">${esc(tip)}</span><button class="iconbtn" style="width:34px;height:34px;flex-shrink:0;margin-left:auto;border:none;background:${on ? '#FFF4D6' : 'transparent'};font-size:18px" data-act="lbStar" data-ns="${cfg.ns}" data-tip="${esc(tip)}" aria-label="star">${on ? '⭐' : '☆'}</button></div>`; }).join('')}</section>`).join('')}
      <section class="card" style="background:#E0EEFF;border:none"><b style="color:#1F4778;font-size:14.5px">${esc(note)}</b></section></div>`;
  };
  A.lbStar = (el) => {
    const L = LIB.state(el.dataset.ns), tip = el.dataset.tip, i = L.stars.indexOf(tip);
    if (i >= 0) L.stars.splice(i, 1); else { if (L.stars.length >= 3) { PS.toast(t('max3')); return; } L.stars.push(tip); }
    PS.save(); LIB.keep();
  };
})();
