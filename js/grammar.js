/* Putri Space · Grammar Cards (Academic Library) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts;
  const { esc, ic, icon, dayKey } = PS;
  const t = PS.t, S = () => PS.S();
  const G = () => window.PS_GRAMMAR || { groups: [], cards: [] };
  const gs = (id) => { const s = S(); s.gram = s.gram || {}; return (s.gram[id] = s.gram[id] || {}); };
  const known = (id) => !!(S().gram && S().gram[id] && S().gram[id].known);
  const grp = (id) => G().groups.find((g) => g.id === id) || G().groups[0];
  PS.grammarProgress = () => { const cs = G().cards; return { total: cs.length, known: cs.filter((c) => known(c.id)).length }; };

  /* timeline visual for tenses: 0 = far past, 50 = now, 100 = far future */
  const timeline = (tl, ink) => {
    if (!tl) return '';
    const X = (v) => 20 + v * 3.2;
    const parts = tl.map((p) => {
      if (p.t === 'dot') return `<circle cx="${X(p.a)}" cy="34" r="7" fill="${ink}"/>${p.label ? `<text x="${X(p.a)}" y="18" text-anchor="middle" font-size="12" font-weight="800" fill="${ink}" font-family="Nunito,sans-serif">${p.label}</text>` : ''}`;
      if (p.t === 'dots') { let d = ''; for (let v = p.a; v <= p.b; v += 12) d += `<circle cx="${X(v)}" cy="34" r="5" fill="${ink}"/>`; return d; }
      if (p.t === 'wave') { let d = `M${X(p.a)} 34`; for (let v = p.a; v < p.b; v += 4) d += ` Q${X(v + 1)} 24 ${X(v + 2)} 34 T${X(v + 4)} 34`; return `<path d="${d}" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`; }
      if (p.t === 'arrow') return `<path d="M${X(p.a)} 34 L${X(p.b) - 6} 34" stroke="${ink}" stroke-width="3" stroke-dasharray="5 4"/><path d="M${X(p.b) - 8} 28 L${X(p.b)} 34 L${X(p.b) - 8} 40" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`;
      if (p.t === 'mark') return `<path d="M${X(p.a)} 20 V48" stroke="#E0708F" stroke-width="3" stroke-linecap="round"/><text x="${X(p.a)}" y="14" text-anchor="middle" font-size="10" font-weight="800" fill="#A23B57" font-family="Nunito,sans-serif">by…</text>`;
      return '';
    }).join('');
    return `<svg viewBox="0 0 360 66" role="img" aria-label="Timeline" style="width:100%;display:block;background:#fff;border:1px solid #ECE7FA;border-radius:14px">
      <path d="M14 34 H346" stroke="#C9C0F2" stroke-width="2"/><path d="M${X(50)} 22 V46" stroke="#2E2A45" stroke-width="2"/>
      <text x="${X(10)}" y="60" text-anchor="middle" font-size="11" fill="#6B6585" font-family="Nunito,sans-serif" font-weight="700">${esc(t('past'))}</text>
      <text x="${X(50)}" y="60" text-anchor="middle" font-size="11" fill="#2E2A45" font-family="Nunito,sans-serif" font-weight="800">${esc(t('now'))}</text>
      <text x="${X(90)}" y="60" text-anchor="middle" font-size="11" fill="#6B6585" font-family="Nunito,sans-serif" font-weight="700">${esc(t('future'))}</text>${parts}</svg>`;
  };

  /* ---------- library list ---------- */
  V.grammar = function (p) {
    if (p[0]) return cardView(p[0]);
    const pr = PS.grammarProgress();
    return `<div class="page">${PS.back('#english', esc(t('grammarCards')), `<span class="pill" style="background:#EEEAFE;color:#4B3DB0">${pr.known}/${pr.total}</span>`)}
      <section class="hero" style="background:#5BBF97"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">IELTS Academic</span><span class="big" style="font-size:18px">${esc(t('grammarHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('grammarHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      ${G().groups.map((g) => { const cs = G().cards.filter((c) => c.group === g.id); return `<div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:${g.ink};color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">${g.id}</span><h2 class="h2" style="color:${g.ink};font-size:17px">${esc(PS.L(g.name))}</h2><span class="small">${cs.filter((c) => known(c.id)).length}/${cs.length}</span></div>
        <section class="stack" style="gap:8px">${cs.map((c, i) => `<a class="tile h" href="#grammar/${c.id}"><span class="ic sm" style="background:${known(c.id) ? '#DDF4EA' : g.bg};font-size:12px;font-weight:800;color:${g.ink}">${known(c.id) ? '✓' : i + 1}</span><span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(c.title)}</span><span class="s">${esc(c.formula)}</span></span>${gs(c.id).quiz != null ? `<span class="pill" style="background:${g.bg};color:${g.ink}">${gs(c.id).quiz}/3</span>` : ''}</a>`).join('')}</section>`; }).join('')}</div>`;
  };

  /* ---------- card ---------- */
  let qstate = {};
  function cardView(id) {
    const cs = G().cards, c = cs.find((x) => x.id === id); if (!c) return V.grammar([]);
    const g = grp(c.group), i = cs.indexOf(c), st = gs(id), q = qstate[id] || {};
    const sec = (color, label, body) => `<div><div class="sec-t" style="color:${color}">${label}</div>${body}</div>`;
    PS.mark('review');
    return `<div class="page" style="background:var(--cream);min-height:100vh">${PS.back('#grammar', `<span style="font-size:12px;color:${g.ink};display:block;font-family:Nunito,sans-serif;font-weight:800">${esc(PS.L(g.name))}</span>${esc(c.title)}`, `<button class="iconbtn" style="background:#E0EEFF;border:none" data-act="gListen" data-id="${id}" aria-label="${esc(t('listen'))}">${icon('speaker', 24)}</button>`)}
      <section class="card" style="background:${g.bg};border:none"><span class="small" style="color:${g.ink}">${esc(t('formula'))}</span><b style="font-size:16px;color:#2E2A45;line-height:1.4">${esc(c.formula)}</b></section>
      ${c.tl ? timeline(c.tl, g.ink) : ''}
      <article class="read-mode stack" style="gap:16px;padding:4px 2px">
        ${sec(g.ink, '📌 ' + esc(t('gRule')), `<p style="margin:0">${esc(PS.L(c.rule))}</p>`)}
        ${sec('#9A4A22', '🎯 ' + esc(t('gWhen')), `<ul style="margin:0;padding-left:20px">${c.uses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>`)}
        ${sec('#1F6E55', '✍️ ' + esc(t('gExamples')), c.examples.map((e) => `<div class="right" style="margin-top:6px;font-family:Nunito,sans-serif"><span style="flex:1">${esc(e)}</span><button class="iconbtn" style="width:34px;height:34px;border:none" data-act="say" data-text="${esc(e)}" aria-label="${esc(t('listen'))}">${icon('speaker', 18)}</button></div>`).join(''))}
        ${sec('#8E3049', '⚠️ ' + esc(t('gMistakes')), c.mistakes.map(([w, r]) => { const d = PS.diff(w, r); return `<div class="stack" style="gap:6px;margin-top:6px;font-family:Nunito,sans-serif"><div class="wrong"><span>✕</span><span>${d.wrong}</span></div><div class="right"><span>✓</span><span>${d.right}</span></div></div>`; }).join(''))}
        ${sec('#6B4E00', '💡 Tip', `<p style="margin:0">${esc(PS.L(c.tip))}</p>`)}
      </article>
      <section class="card"><h2 class="h2">${icon('quiz', 24)}${esc(t('miniQuiz'))}</h2>
        ${c.quiz.map((qq, k) => { const pick = q.picks ? q.picks[k] : null, done = !!q.done; return `<div class="q"><b style="font-size:14.5px">${k + 1}. ${esc(qq.q)}</b><div class="stack" style="gap:6px">${qq.o.map((o, j) => `<button class="opt ${pick === j ? 'sel' : ''} ${done ? (j === qq.a ? 'ok' : pick === j ? 'no' : '') : ''}" data-act="gPick" data-id="${id}" data-k="${k}" data-j="${j}" ${done ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>${done ? `<span class="small">${pick === qq.a ? '✓ ' : '✕ '}${esc(qq.why)}</span>` : ''}</div>`; }).join('')}
        ${q.done ? `<div class="drill" style="background:#DDF4EA;color:#1F6E55"><b>${esc(t('yourScore'))}: ${q.score}/3</b>${q.score < 3 ? `<span class="small">${esc(t('wrongSaved'))}</span>` : ''}</div><button class="btn soft sm" data-act="gRetry" data-id="${id}">${esc(t('again'))}</button>` : `<button class="btn" data-act="gCheck" data-id="${id}">${esc(t('checkAnswers'))}</button>`}
      </section>
      <div class="row"><button class="btn ${st.known ? 'mint' : ''}" style="flex:1" data-act="gKnown" data-id="${id}">${st.known ? '✓ ' + esc(t('understood')) : esc(t('markUnderstood'))}</button><a class="btn soft" href="#check">${icon('check', 20)}${esc(t('geCheck'))}</a></div>
      <div class="row"><a class="btn ghost sm" style="flex:1;${i > 0 ? '' : 'visibility:hidden'}" href="#grammar/${i > 0 ? cs[i - 1].id : ''}">‹ ${esc(t('prev'))}</a><span class="small">${i + 1}/${cs.length}</span><a class="btn ghost sm" style="flex:1;${i < cs.length - 1 ? '' : 'visibility:hidden'}" href="#grammar/${i < cs.length - 1 ? cs[i + 1].id : ''}">${esc(t('next'))} ›</a></div></div>`;
  }
  A.gPick = (el) => { const id = el.dataset.id; qstate[id] = qstate[id] || { picks: [] }; qstate[id].picks[+el.dataset.k] = +el.dataset.j; el.parentElement.querySelectorAll('.opt').forEach((b) => b.classList.toggle('sel', b === el)); };
  A.gCheck = (el) => {
    const id = el.dataset.id, c = G().cards.find((x) => x.id === id), q = qstate[id] || { picks: [] };
    if (c.quiz.some((qq, k) => q.picks[k] == null)) { PS.toast(t('answerAll')); return; }
    q.done = true; q.score = c.quiz.filter((qq, k) => q.picks[k] === qq.a).length; qstate[id] = q;
    gs(id).quiz = q.score;
    c.quiz.forEach((qq, k) => { if (q.picks[k] !== qq.a && qq.q.includes('___')) PS.addMistake({ original: qq.q.replace('___', qq.o[q.picks[k]]), corrected: qq.q.replace('___', qq.o[qq.a]), category: c.group === 'T' ? 'Tenses' : 'Other', pattern: c.title, explanation: qq.why, source: 'grammar' }); });
    if (q.score === 3) gs(id).known = true;
    PS.save(); PS.render();
  };
  A.gRetry = (el) => { delete qstate[el.dataset.id]; PS.render(); };
  A.gKnown = (el) => { const st = gs(el.dataset.id); st.known = !st.known; PS.save(); PS.render(); };
  A.gListen = (el) => { const c = G().cards.find((x) => x.id === el.dataset.id); if (c) PS.speak([c.title + '.', c.rule.en, ...c.examples].join(' ')); };
})();
