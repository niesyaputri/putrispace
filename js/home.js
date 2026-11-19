/* Putri Space · onboarding, lock, Beranda, Profil, Lainnya · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, C = PS.C, V = PS.views, A = PS.acts;
  const { esc, ic, icon, dayKey, daysUntil, t } = Object.assign({}, PS, { t: PS.t });
  const S = () => PS.S();
  const COLORS = { peach: ['#FFE6D9', '#9A4A22', 'grad'], sky: ['#E0EEFF', '#2B5C99', 'calendar'], rose: ['#FCE4EA', '#8E3049', 'clock'], butter: ['#FFF4D6', '#6B4E00', 'medal'], mint: ['#DDF4EA', '#1F6E55', 'star'], lav: ['#EEEAFE', '#4B3DB0', 'spark'] };

  /* ================= Onboarding ================= */
  let ob = { step: 0, pin: '', pin1: '' };
  V.onboarding = function () {
    const s = S();
    if (ob.step === 0) return `<div class="lock">${PS.owl(false, 96)}
      <h1 class="h1 center">${esc(t('welcomeTitle'))}</h1>
      <p class="center muted" style="margin:0;max-width:320px">${esc(t('welcomeText'))}</p>
      <div class="seg" role="group" aria-label="Language"><button class="${s.lang === 'id' ? 'on' : ''}" data-act="obLang" data-v="id">Bahasa Indonesia</button><button class="${s.lang === 'en' ? 'on' : ''}" data-act="obLang" data-v="en">English</button></div>
      <div class="field" style="width:100%;max-width:320px"><label class="lbl" for="obName">${esc(t('yourName'))}</label><input id="obName" class="in" value="${esc(s.name)}" autocomplete="given-name"></div>
      <button class="btn" style="width:100%;max-width:320px" data-act="obNext">${esc(t('next'))}</button>
      <p class="foot">Created by CreanovativeCo</p></div>`;
    const title = ob.step === 1 ? t('pinCreate') : t('pinConfirm');
    return V.pinPad(title, ob.pin, 'obKey');
  };
  V.pinPad = function (title, val, act, extra = '') {
    const dots = [0, 1, 2, 3].map((i) => `<i class="${i < val.length ? 'f' : ''}"></i>`).join('');
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', '<'];
    return `<div class="lock">${PS.owl(false, 84)}<h1 class="h2" style="font-size:22px">${esc(title)}</h1>
      <div class="pin-dots" id="pinDots">${dots}</div>
      <div class="keypad">${keys.map((k) => k === 'x' ? '<span></span>' : `<button data-act="${act}" data-k="${k}" ${k === '<' ? `class="x" aria-label="${esc(t('delete'))}"` : ''}>${k === '<' ? '⌫' : k}</button>`).join('')}</div>${extra}</div>`;
  };
  A.obLang = (el) => { S().lang = el.dataset.v; const n = document.getElementById('obName'); if (n) S().name = n.value || S().name; PS.save({ noSync: true }); PS.render(); };
  A.obNext = () => { const n = document.getElementById('obName').value.trim(); S().name = n || 'Putri'; S().profile.short = S().name; ob.step = 1; ob.pin = ''; PS.render(); };
  A.obKey = async (el) => {
    const k = el.dataset.k;
    if (k === '<') ob.pin = ob.pin.slice(0, -1); else if (ob.pin.length < 4) ob.pin += k;
    if (ob.pin.length === 4) {
      if (ob.step === 1) { ob.pin1 = ob.pin; ob.step = 2; ob.pin = ''; }
      else if (ob.pin === ob.pin1) {
        S().pinHash = await PS.hash(ob.pin); S().onboarded = true; PS.unlock(); PS.save({ noSync: true });
        ob = { step: 0, pin: '', pin1: '' }; location.hash = 'home'; PS.render(); PS.toast(t('pinSaved')); return;
      } else { ob.step = 1; ob.pin = ''; PS.render(); PS.toast(t('pinMismatch')); document.getElementById('pinDots').classList.add('shake'); return; }
    }
    PS.render();
  };

  /* ================= Lock ================= */
  let lockVal = '', fails = 0;
  V.lock = () => V.pinPad(t('hello', { name: S().name }), lockVal, 'lockKey', `<button class="btn soft sm" data-act="forgotPin">${esc(t('forgotPin'))}</button>`);
  A.lockKey = async (el) => {
    const k = el.dataset.k;
    if (k === '<') lockVal = lockVal.slice(0, -1); else if (lockVal.length < 4) lockVal += k;
    if (lockVal.length === 4) {
      const ok = (await PS.hash(lockVal)) === S().pinHash; lockVal = '';
      if (ok) { fails = 0; PS.unlock(); PS.render(); return; }
      fails++; PS.render(); document.getElementById('pinDots').classList.add('shake');
      if (fails >= 5) PS.toast(t('pinManyFails'), 4000);
      return;
    }
    PS.render();
  };
  A.forgotPin = () => {
    PS.sheet(`<h2 class="h2">${esc(t('forgotPin'))}</h2><p class="muted" style="margin:0">${esc(t('forgotPinText'))}</p>
      <div class="field"><label class="lbl" for="fpTok">${esc(t('appToken'))}</label><input id="fpTok" class="in" type="password"></div>
      <button class="btn" data-act="forgotPinGo">${esc(t('resetPin'))}</button>`);
  };
  A.forgotPinGo = async () => {
    const tok = document.getElementById('fpTok').value.trim(); const saved0 = PS.conn().token;
    if (!PS.conn().url) { PS.toast(t('noBackend')); return; }
    try {
      const saved = PS.conn().token; PS.setConn({ token: tok });
      await PS.call({ action: 'ping' });
      S().pinHash = null; PS.save({ noSync: true }); PS.unlock(); ob = { step: 1, pin: '', pin1: '' }; S().onboarded = false; PS.save({ noSync: true });
      if (!saved) PS.setConn({ token: tok });
      PS.sheet(null); PS.render();
    } catch (e) { PS.setConn({ token: saved0 }); PS.toast(e.message); }
  };

  /* ================= Home ================= */
  const todayTargets = () => {
    const a = S().activity[dayKey()] || {};
    const due = PS.dueMistakes ? PS.dueMistakes().length : 0;
    return [
      { key: 'tgtGrammar', done: !!(a.check || a.journal || a.review) || false, sub: due ? t('tgtGrammarDue', { n: due }) : t('tgtGrammarSub'), href: due ? '#review' : '#check' },
      { key: 'tgtIelts', done: !!(a.ieltsW || a.ieltsS || a.ieltsR || a.ieltsL), sub: t('tgtIeltsSub'), href: '#english' },
      { key: 'tgtRead', done: !!(a.hr || a.story), sub: t('tgtReadSub'), href: S().lastCard ? '#hr/card/' + S().lastCard : '#hr' }
    ];
  };
  V.home = function () {
    const s = S(), tg = todayTargets(), done = tg.filter((x) => x.done).length, next = tg.find((x) => !x.done);
    const now = new Date();
    const dateStr = now.toLocaleDateString(s.lang === 'en' ? 'en-GB' : 'id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    const dl = s.deadlines.filter((d) => daysUntil(d.date) >= 0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
    const cpe = s.cpe, cpePct = Math.min(100, Math.round((cpe.done / cpe.need) * 100));
    return `<div class="page">
      <div class="top">${PS.owl(done === 3)}
        <div class="grow"><div class="eyebrow">${esc(dateStr)}</div><h1 class="h1">${esc(t('hello', { name: s.name }))}</h1></div>
        <a class="iconbtn" href="#more" aria-label="${esc(t('navMore'))}" style="background:#FFF4D6;border:none">${icon('bell')}</a></div>

      <section class="hero">
        <div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800;opacity:.9">${esc(t('todayLearning'))}</span>
          <span class="big">${esc(t('targetsDone', { n: done }))}</span>
          <span style="font-size:13px">${esc(next ? t('nextUp') + ': ' + t(next.key) : t('allDone'))}</span></div>
        <div class="stack" style="align-items:center;gap:0;background:rgba(255,255,255,.18);border-radius:16px;padding:8px 12px">${icon('flame', 30)}<b style="font-size:18px">${PS.streak()}</b><span style="font-size:10px;font-weight:700">${esc(t('dayStreak'))}</span></div>
      </section>

      <section class="stack" style="gap:8px">${tg.map((x) => `<a class="tile h" href="${x.href}" style="min-height:58px">
        <span class="ic sm" style="background:${x.done ? '#DDF4EA' : '#F3F0FF'}">${x.done ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#5BBF97"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#C9C0F2" stroke-width="2.4"/></svg>'}</span>
        <span class="stack grow" style="gap:0"><span class="t" style="${x.done ? 'text-decoration:line-through;color:#6B6585' : ''}">${esc(t(x.key))}</span><span class="s">${esc(x.sub)}</span></span></a>`).join('')}</section>

      <section class="card">
        <div class="between"><h2 class="h2">${icon('calendar', 26)}${esc(t('deadlines'))}</h2><a class="pill" style="background:#EEEAFE;color:#4B3DB0;text-decoration:none" href="#deadlines">${esc(t('edit'))}</a></div>
        ${dl.length ? `<div class="grid2">${dl.map((d) => { const c = COLORS[d.color] || COLORS.lav, n = daysUntil(d.date); return `<div style="background:${c[0]};border-radius:18px;padding:12px 14px;display:flex;flex-direction:column;gap:4px">${icon(c[2], 32)}<span style="font-size:22px;font-weight:800;color:${c[1]}">${n === 0 ? esc(t('today')) : esc(t('daysLeft', { n }))}</span><span style="font-size:12px;font-weight:700;color:${c[1]}">${esc(d.title)} · ${esc(PS.fmtDate(d.date))}</span></div>`; }).join('')}</div>` : `<div class="empty">${esc(t('noDeadlines'))}</div>`}
        <div style="background:#FFF4D6;border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:6px">
          <div class="row">${icon('medal', 28)}<span style="font-size:13px;font-weight:800;color:#6B4E00;flex:1">CPE CFE ${cpe.year}</span><span style="font-size:12px;font-weight:800;color:#6B4E00">${cpe.done} / ${cpe.need} ${esc(t('credits'))}</span></div>
          <div class="bar" style="background:#fff"><i style="width:${cpePct}%;background:#E8B94A"></i></div>
          <span style="font-size:12px;font-weight:700;color:#6B4E00">${cpe.done >= cpe.need ? esc(t('cpeDone')) : esc(t('cpeNeed', { n: cpe.need - cpe.done }))}</span></div>
      </section>

      <a class="tile h" href="https://niesyaputri.github.io/agendaku/" target="_blank" rel="noopener">${ic('link', '#E0EEFF')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('openAgendaKu'))}</span><span class="s">${esc(t('openAgendaKuSub'))}</span></span></a>
      <p class="foot">Putri Space v${PS.VERSION} · Created by CreanovativeCo</p>
    </div>`;
  };

  /* ================= Deadlines & CPE ================= */
  V.deadlines = function () {
    const s = S();
    const list = s.deadlines.slice().sort((a, b) => a.date.localeCompare(b.date));
    return `<div class="page">${PS.back('#home', esc(t('deadlines')))}
      <section class="card"><h2 class="h2">${icon('medal', 24)}CPE CFE</h2>
        <div class="grid3"><div class="field"><label class="lbl" for="cpeY">${esc(t('year'))}</label><input id="cpeY" class="in" inputmode="numeric" value="${s.cpe.year}"></div>
        <div class="field"><label class="lbl" for="cpeD">${esc(t('done'))}</label><input id="cpeD" class="in" inputmode="decimal" value="${s.cpe.done}"></div>
        <div class="field"><label class="lbl" for="cpeN">${esc(t('needed'))}</label><input id="cpeN" class="in" inputmode="decimal" value="${s.cpe.need}"></div></div>
        <button class="btn soft sm" data-act="saveCpe">${esc(t('save'))}</button></section>
      <section class="stack">${list.map((d) => `<div class="tile h">${ic((COLORS[d.color] || COLORS.lav)[2], (COLORS[d.color] || COLORS.lav)[0], 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(d.title)}</span><span class="s">${esc(PS.fmtDate(d.date))} · ${daysUntil(d.date) >= 0 ? esc(t('daysLeft', { n: daysUntil(d.date) })) : esc(t('passed'))}</span></span>
        <button class="btn sm soft" data-act="editDeadline" data-id="${d.id}">${esc(t('edit'))}</button></div>`).join('')}</section>
      <button class="btn" data-act="editDeadline" data-id="">${esc(t('addDeadline'))}</button></div>`;
  };
  A.saveCpe = () => { const s = S(); s.cpe = { year: +document.getElementById('cpeY').value || s.cpe.year, done: +document.getElementById('cpeD').value || 0, need: +document.getElementById('cpeN').value || 20 }; PS.save(); PS.toast(t('saved')); };
  A.editDeadline = (el) => {
    const d = S().deadlines.find((x) => x.id === el.dataset.id) || { id: '', title: '', date: dayKey(), color: 'lav' };
    PS.sheet(`<h2 class="h2">${esc(d.id ? t('edit') : t('addDeadline'))}</h2>
      <div class="field"><label class="lbl" for="dlT">${esc(t('title'))}</label><input id="dlT" class="in" value="${esc(d.title)}"></div>
      <div class="field"><label class="lbl" for="dlD">${esc(t('date'))}</label><input id="dlD" class="in" type="date" value="${esc(d.date)}"></div>
      <div class="field"><span class="lbl">${esc(t('color'))}</span><div class="row wrap">${Object.keys(COLORS).map((k) => `<button class="chip ${d.color === k ? 'on' : ''}" data-act="pickColor" data-v="${k}" style="background:${COLORS[k][0]};color:${COLORS[k][1]};border-color:${d.color === k ? COLORS[k][1] : 'transparent'}">${icon(COLORS[k][2], 18)}</button>`).join('')}</div></div>
      <input type="hidden" id="dlC" value="${esc(d.color)}">
      <div class="row"><button class="btn" style="flex:1" data-act="saveDeadline" data-id="${esc(d.id)}">${esc(t('save'))}</button>${d.id ? `<button class="btn rose" data-act="delDeadline" data-id="${esc(d.id)}">${esc(t('delete'))}</button>` : ''}</div>`);
  };
  A.pickColor = (el) => { document.getElementById('dlC').value = el.dataset.v; el.parentElement.querySelectorAll('.chip').forEach((c) => { c.style.borderColor = 'transparent'; }); el.style.borderColor = COLORS[el.dataset.v][1]; };
  A.saveDeadline = (el) => {
    const title = document.getElementById('dlT').value.trim(), date = document.getElementById('dlD').value, color = document.getElementById('dlC').value;
    if (!title || !date) { PS.toast(t('fillAll')); return; }
    const s = S(); const id = el.dataset.id;
    if (id) Object.assign(s.deadlines.find((x) => x.id === id), { title, date, color }); else s.deadlines.push({ id: PS.uid(), title, date, color });
    PS.save(); PS.render();
  };
  A.delDeadline = (el) => { if (!confirm(t('confirmDelete'))) return; const s = S(); s.deadlines = s.deadlines.filter((x) => x.id !== el.dataset.id); PS.save(); PS.render(); };

  /* ================= Profile ================= */
  const certPill = (st) => st === 'active' ? `<span class="pill" style="background:#DDF4EA;color:#1F6E55">${esc(t('active'))}</span>` : st === 'renew' ? `<span class="pill" style="background:#FFF4D6;color:#6B4E00">${esc(t('renewSoon'))}</span>` : `<span class="pill" style="background:#EFEDF5;color:#5E5878">${esc(t('expired'))}</span>`;
  const secHead = (iconName, title, act) => `<div class="between"><h2 class="h2">${icon(iconName, 26)}${esc(title)}</h2><button class="pill" style="background:#EEEAFE;color:#4B3DB0;border:none;cursor:pointer;min-height:32px" data-act="${act}">${esc(t('edit'))}</button></div>`;
  V.profile = function () {
    const p = S().profile;
    const initials = p.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    return `<div class="page" style="padding-top:0">
      <header style="background:#EEEAFE;margin:0 -18px;padding:26px 20px 20px;border-radius:0 0 28px 28px;display:flex;flex-direction:column;align-items:center;gap:8px;position:relative">
        <span style="position:absolute;top:22px;left:30px">${icon('star', 18)}</span><span style="position:absolute;top:64px;right:40px">${icon('spark', 14)}</span>
        <div style="width:84px;height:84px;border-radius:99px;background:#C9C0F2;border:4px solid #fff;display:flex;align-items:center;justify-content:center;font-family:Fredoka,Nunito,sans-serif;font-size:32px;font-weight:600;color:#4B3DB0">${esc(initials)}</div>
        <h1 class="h1 center" style="font-size:22px">${esc(p.name)}</h1>
        <p class="center" style="margin:0;font-size:13px;font-weight:700;color:#4F4A68">${esc(p.role)}</p>
        <div class="row wrap" style="justify-content:center"><span class="pill" style="background:#FFE6D9;color:#9A4A22">${esc(t('target'))}: ${esc(p.goal)}</span><button class="pill" style="background:#fff;color:#4B3DB0;border:none;cursor:pointer" data-act="editHead">${esc(t('edit'))}</button></div>
      </header>
      <section class="card">${secHead('bag', t('career'), 'editCareer')}
        ${p.career.map((c, i) => `<div class="row" style="align-items:flex-start"><span style="width:10px;height:10px;margin-top:5px;border-radius:99px;background:${i ? '#B3A8EC' : '#6A5ACD'};flex-shrink:0"></span><div style="font-size:13.5px"><b>${esc(c.years)}</b> · ${esc(c.text)}</div></div>`).join('')}</section>
      <section class="card">${secHead('medal', t('certs'), 'editCerts')}
        ${p.certs.map((c) => `<div class="between"><span style="font-size:13.5px;font-weight:700">${esc(c.name)}<br><span class="small">${esc(c.note || '')}</span></span>${certPill(c.status)}</div>`).join('')}</section>
      <section class="card">${secHead('star', t('stories'), 'addStory')}
        ${p.stories.map((st, i) => { const filled = ['s', 't', 'a', 'r'].filter((k) => st[k]).length; return `<button class="tile" style="background:${i % 2 ? '#E0EEFF' : '#FFF4D6'};border:none" data-act="editStory" data-i="${i}"><span class="t">${esc(st.title)}</span><span class="s">${esc((st.s || '').slice(0, 110))}</span><span class="pill" style="align-self:flex-start;background:#fff;color:#4F4A68">S·T·A·R ${filled}/4</span></button>`; }).join('')}
        <span class="small">${esc(t('storiesHint'))}</span></section>
      <section class="card">${secHead('cap', t('eduPubs'), 'editEdu')}
        ${p.education.map((e) => `<span style="font-size:13.5px">${esc(e)}</span>`).join('')}
        ${p.pubs.map((e) => `<span style="font-size:13.5px"><b>${esc(t('journal'))}</b> · ${esc(e)}</span>`).join('')}</section>
      <a class="btn" href="#cv">${icon('import', 22)}${esc(t('exportCV'))}</a></div>`;
  };
  A.editHead = () => { const p = S().profile; PS.sheet(`<h2 class="h2">${esc(t('profile'))}</h2>
    <div class="field"><label class="lbl" for="pN">${esc(t('fullName'))}</label><input id="pN" class="in" value="${esc(p.name)}"></div>
    <div class="field"><label class="lbl" for="pR">${esc(t('position'))}</label><input id="pR" class="in" value="${esc(p.role)}"></div>
    <div class="field"><label class="lbl" for="pG">${esc(t('target'))}</label><input id="pG" class="in" value="${esc(p.goal)}"></div>
    <button class="btn" data-act="saveHead">${esc(t('save'))}</button>`); };
  A.saveHead = () => { const p = S().profile; p.name = document.getElementById('pN').value.trim() || p.name; p.role = document.getElementById('pR').value.trim(); p.goal = document.getElementById('pG').value.trim(); PS.save(); PS.render(); };
  const linesSheet = (title, hint, value, act) => PS.sheet(`<h2 class="h2">${esc(title)}</h2><p class="small" style="margin:0">${esc(hint)}</p><textarea id="lines" class="in" rows="9">${esc(value)}</textarea><button class="btn" data-act="${act}">${esc(t('save'))}</button>`);
  A.editCareer = () => linesSheet(t('career'), t('careerHint'), S().profile.career.map((c) => c.years + ' | ' + c.text).join('\n'), 'saveCareer');
  A.saveCareer = () => { S().profile.career = document.getElementById('lines').value.split('\n').map((l) => l.split('|')).filter((x) => x[0].trim()).map((x) => ({ years: x[0].trim(), text: (x.slice(1).join('|') || '').trim() })); PS.save(); PS.render(); };
  A.editCerts = () => linesSheet(t('certs'), t('certsHint'), S().profile.certs.map((c) => [c.name, c.status, c.note || ''].join(' | ')).join('\n'), 'saveCerts');
  A.saveCerts = () => { S().profile.certs = document.getElementById('lines').value.split('\n').map((l) => l.split('|').map((x) => x.trim())).filter((x) => x[0]).map((x) => ({ name: x[0], status: /^(active|aktif)$/i.test(x[1] || '') ? 'active' : /^(renew|perpanjang)$/i.test(x[1] || '') ? 'renew' : 'expired', note: x[2] || '' })); PS.save(); PS.render(); };
  A.editEdu = () => linesSheet(t('eduPubs'), t('eduHint'), S().profile.education.join('\n') + '\n---\n' + S().profile.pubs.join('\n'), 'saveEdu');
  A.saveEdu = () => { const [e, p] = document.getElementById('lines').value.split(/\n?---\n?/); S().profile.education = (e || '').split('\n').map((x) => x.trim()).filter(Boolean); S().profile.pubs = (p || '').split('\n').map((x) => x.trim()).filter(Boolean); PS.save(); PS.render(); };
  A.addStory = () => { S().profile.stories.push({ title: t('newStarStory'), s: '', t: '', a: '', r: '' }); PS.save({ noSync: true }); A.editStory({ dataset: { i: S().profile.stories.length - 1 } }); };
  A.editStory = (el) => { const i = +el.dataset.i, st = S().profile.stories[i];
    const f = (k, label) => `<div class="field"><label class="lbl" for="st${k}">${label}</label><textarea id="st${k}" class="in" rows="3">${esc(st[k] || '')}</textarea></div>`;
    PS.sheet(`<h2 class="h2">${icon('star', 24)}${esc(t('stories'))}</h2><div class="field"><label class="lbl" for="stTitle">${esc(t('title'))}</label><input id="stTitle" class="in" value="${esc(st.title)}"></div>
      ${f('s', 'S · Situation')}${f('t', 'T · Task')}${f('a', 'A · Action')}${f('r', 'R · Result')}
      <div class="row"><button class="btn" style="flex:1" data-act="saveStory" data-i="${i}">${esc(t('save'))}</button><button class="btn rose" data-act="delStory" data-i="${i}">${esc(t('delete'))}</button></div>`); };
  A.saveStory = (el) => { const st = S().profile.stories[+el.dataset.i]; st.title = document.getElementById('stTitle').value.trim() || st.title; ['s', 't', 'a', 'r'].forEach((k) => { st[k] = document.getElementById('st' + k).value.trim(); }); PS.save(); PS.render(); };
  A.delStory = (el) => { if (!confirm(t('confirmDelete'))) return; S().profile.stories.splice(+el.dataset.i, 1); PS.save(); PS.render(); };

  V.cv = function () {
    const p = S().profile;
    return `<div class="page" style="background:#fff;max-width:760px;font-size:14px;line-height:1.5">
      <div class="row noprint"><a class="btn soft sm" href="#profile">${esc(t('back'))}</a><button class="btn sm" data-act="printCV">${esc(t('printPdf'))}</button></div>
      <h1 class="h1">${esc(p.name)}</h1><div style="font-weight:700;color:#4F4A68">${esc(p.role)}</div>
      <h2 class="h2" style="margin-top:8px">${esc(t('career'))}</h2>${p.career.map((c) => `<div><b>${esc(c.years)}</b> — ${esc(c.text)}</div>`).join('')}
      <h2 class="h2" style="margin-top:8px">${esc(t('eduPubs'))}</h2>${p.education.map((e) => `<div>${esc(e)}</div>`).join('')}${p.pubs.map((e) => `<div>${esc(e)}</div>`).join('')}
      <h2 class="h2" style="margin-top:8px">${esc(t('certs'))}</h2>${p.certs.map((c) => `<div>${esc(c.name)}${c.note ? ' — ' + esc(c.note) : ''}</div>`).join('')}
      <h2 class="h2" style="margin-top:8px">${esc(t('keyAchievements'))}</h2>${p.stories.map((s) => `<div><b>${esc(s.title)}</b>${s.s ? ': ' + esc(s.s) : ''}${s.r ? ' ' + esc(s.r) : ''}</div>`).join('')}</div>`;
  };
  A.printCV = () => window.print();

  /* ================= More / Settings ================= */
  V.more = function () {
    const s = S(), c = PS.conn();
    const soon = [['grad', '#FFE6D9', 'scholarTracker'], ['cloud', '#E0EEFF', 'docsVault'], ['mic', '#FCE4EA', 'interviewAI'], ['journal', '#DDF4EA', 'reflection'], ['calendar', '#EEEAFE', 'weeklyReport']];
    const usd = s.usage.month === dayKey().slice(0, 7) ? s.usage.usd : 0;
    return `<div class="page">
      <div><div class="eyebrow">${esc(t('navMore'))}</div><h1 class="h1">${esc(t('moreTitle'))}</h1></div>
      <section class="card">
        <div class="row">${ic('spark', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:0"><b style="font-size:14px">${esc(t('aiUsage'))}</b><span class="small">Claude Haiku 5.5 · ${esc(t('limit'))} $2</span></span><b style="color:#4B3DB0">$${usd.toFixed(3)}</b></div>
        <div class="bar"><i style="width:${Math.min(100, (usd / 2) * 100)}%"></i></div>
        <span class="small">${esc(t('aiCalls', { n: s.usage.month === dayKey().slice(0, 7) ? s.usage.calls : 0 }))}</span></section>

      <section class="card">
        <h2 class="h2">${icon('globe', 26)}${esc(t('language'))}</h2>
        <div class="seg" style="align-self:flex-start"><button class="${s.lang === 'id' ? 'on' : ''}" data-act="setLang" data-v="id">Bahasa Indonesia</button><button class="${s.lang === 'en' ? 'on' : ''}" data-act="setLang" data-v="en">English</button></div>
        <h2 class="h2" style="margin-top:6px">${icon('speaker', 26)}${esc(t('voiceAccent'))}</h2>
        <div class="seg" style="align-self:flex-start">${['en-US', 'en-GB', 'en-AU'].map((a) => `<button class="${s.voice.accent === a ? 'on' : ''}" data-act="setAccent" data-v="${a}">${a.slice(3)}</button>`).join('')}</div>
      </section>

      <section class="card">
        <h2 class="h2">${icon('link', 26)}${esc(t('connection'))}</h2>
        <p class="small" style="margin:0">${esc(t('connectionHint'))}</p>
        <div class="field"><label class="lbl" for="cUrl">${esc(t('backendUrl'))}</label><input id="cUrl" class="in" placeholder="https://script.google.com/macros/s/…/exec" value="${esc(c.url || '')}"></div>
        <div class="field"><label class="lbl" for="cTok">${esc(t('appToken'))}</label><input id="cTok" class="in" type="password" value="${esc(c.token || '')}"></div>
        <div class="row"><button class="btn" style="flex:1" data-act="saveConn">${esc(t('saveAndTest'))}</button></div>
        <div class="small" id="connStatus">${c.lastSync ? esc(t('lastSync', { t: new Date(c.lastSync).toLocaleString(s.lang === 'en' ? 'en-GB' : 'id-ID') })) : ''}</div>
        <div class="row"><button class="btn soft sm" style="flex:1" data-act="syncPush">${icon('cloud', 18)}${esc(t('syncPush'))}</button><button class="btn soft sm" style="flex:1" data-act="syncPull">${esc(t('syncPull'))}</button></div>
      </section>

      <section class="card" style="padding:6px 16px">
        ${[['lock', 'changePin', 'changePin'], ['lock', 'lockNow', 'lockNow'], ['cloud', 'backupExport', 'backupExport'], ['import', 'backupImport', 'backupImport']].map(([i, k, act]) => `<button class="row" style="min-height:54px;border:none;background:none;border-bottom:1px solid #F1EEFA;cursor:pointer;text-align:left;width:100%" data-act="${act}">${icon(i, 26)}<span style="font-size:14px;font-weight:700;flex:1">${esc(t(k))}</span></button>`).join('')}
        <input type="file" id="backupFile" accept=".json,application/json" hidden data-change="backupFileChosen">
      </section>

      <section class="card"><h2 class="h2">${icon('spark', 24)}${esc(t('comingSoon'))}</h2>
        <div class="grid3">${soon.map(([i, bg, k]) => `<div class="stack" style="align-items:center;gap:6px;text-align:center">${ic(i, bg)}<span style="font-size:12px;font-weight:800">${esc(t(k))}</span></div>`).join('')}</div></section>
      <button class="btn rose sm" data-act="wipe">${esc(t('wipeLocal'))}</button>
      <p class="foot">Putri Space v${PS.VERSION} · Created by CreanovativeCo</p></div>`;
  };
  A.setLang = (el) => { S().lang = el.dataset.v; PS.save(); PS.render(); };
  A.setAccent = (el) => { S().voice.accent = el.dataset.v; PS.save(); PS.render(); PS.speak('Hello Putri, this is my voice.'); };
  A.saveConn = async () => {
    const url = document.getElementById('cUrl').value.trim(), token = document.getElementById('cTok').value.trim();
    PS.setConn({ url, token });
    const st = document.getElementById('connStatus'); st.innerHTML = PS.loading(t('testing'));
    try { const r = await PS.call({ action: 'ping' }); st.textContent = r.ai ? t('connOkAi') : t('connOkNoAi'); PS.toast(t('connected')); }
    catch (e) { st.textContent = '⚠ ' + e.message; }
  };
  A.syncPush = () => PS.push(false);
  A.syncPull = async () => {
    try {
      const remote = await PS.pull();
      if (!remote) { PS.toast(t('noRemote')); return; }
      const when = new Date(remote.updated || 0).toLocaleString(S().lang === 'en' ? 'en-GB' : 'id-ID');
      if (!confirm(t('confirmPull', { t: when }))) return;
      const keepPin = S().pinHash; PS.replaceState(remote); PS.S().pinHash = keepPin || remote.pinHash; PS.save({ noSync: true }); PS.render(); PS.toast(t('syncPulled'));
    } catch (e) { PS.toast(e.message); }
  };
  A.changePin = () => { S().onboarded = false; PS.save({ noSync: true }); ob = { step: 1, pin: '', pin1: '' }; PS.render(); };
  A.lockNow = () => PS.lockNow();
  A.backupExport = () => PS.download('putrispace-backup-' + dayKey() + '.json', JSON.stringify(S(), null, 1));
  A.backupImport = () => document.getElementById('backupFile').click();
  A.backupFileChosen = (el) => {
    const f = el.files[0]; if (!f) return;
    f.text().then((txt) => {
      try {
        const obj = JSON.parse(txt);
        if (obj.type === 'putrispace-hr-cards') { PS.importCards(obj); return; }
        if (!obj.profile) throw new Error('bad');
        if (!confirm(t('confirmRestore'))) return;
        const keepPin = S().pinHash; PS.replaceState(obj); PS.S().pinHash = keepPin; PS.save(); PS.render(); PS.toast(t('restored'));
      } catch (e) { PS.toast(t('badFile')); }
    });
  };
  A.wipe = () => { if (!confirm(t('confirmWipe'))) return; localStorage.removeItem('putrispace.v1'); location.reload(); };
})();
