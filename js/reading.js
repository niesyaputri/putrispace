/* Putri Space · Reading Library (IELTS Academic, built-in content, no AI needed) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, LIB = PS.LIB;
  const { esc, ic, icon } = PS;
  const t = PS.t;
  const D = () => window.PS_READ || { groups: [], lessons: [], top30: [], sources: [] };
  const cfg = LIB.reg.read = {
    ns: 'read', route: 'read', img: 'img/read/', ink: '#1F6E55', bg: '#DDF4EA', mark: 'ieltsR', top30Title: 'top30RT', after: 'top30', exPassageLabel: 'passageExtract',
    get reasons() { return D().reasons; }, find: (id) => D().lessons.find((x) => x.id === id), exImg: () => true
  };
  PS.readProgress = () => { const d = LIB.state('read').done; return { total: D().lessons.length, done: D().lessons.filter((x) => d[x.id]).length }; };

  V.read = function (p) {
    if (p[0] === 'top30') return LIB.top30(cfg, D().top30, D().top30Note, 'C12', 53);
    if (p[0] === 'time') return timeView();
    const x = p[0] && cfg.find(p[0]);
    if (x) {
      const tab = p[1] || 'learn';
      const body = tab === 'ex' ? LIB.example(cfg, x) : tab === 'pr' ? LIB.practice(cfg, x) : tab === 'words' ? LIB.words(cfg, x) : LIB.learn(cfg, x);
      return LIB.frame(cfg, x, tab, body, D().lessons);
    }
    const pr = PS.readProgress();
    const head = (g) => `<div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:${g.ink};color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">${g.id}</span><h2 class="h2" style="color:${g.ink};font-size:17px">${esc(PS.L(g.name))}</h2></div>`;
    return `<div class="page">${PS.back('#english', esc(t('libReading')), `<span class="pill" style="background:#DDF4EA;color:#1F6E55">${pr.done}/${pr.total}</span>`)}
      <section class="hero" style="background:#5BBF97"><div class="stack grow" style="gap:4px"><span style="font-size:12px;font-weight:800">IELTS Academic · 60 min · 40 Qs · 3 passages</span><span class="big" style="font-size:18px">${esc(t('readHero'))}</span><span style="font-size:12.5px;font-weight:700">${esc(t('readHeroSub'))}</span></div>${PS.owl(true, 56)}</section>
      ${LIB.errorCard(cfg)}
      ${D().groups.map((g) => head(g) + `<section class="stack" style="gap:8px">${D().lessons.filter((x) => x.group === g.id).map((x) => LIB.tile(cfg, x, g.bg, g.ink)).join('')}</section>`).join('')}
      <div class="row" style="margin-top:4px"><span style="width:26px;height:26px;border-radius:9px;background:#9A4A22;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">★</span><h2 class="h2" style="color:#9A4A22;font-size:17px">${esc(t('finalWeek'))}</h2></div>
      <section class="grid2"><a class="tile" href="#read/top30" style="background:#DDF4EA;border:none">${ic('star', '#fff', 'sm')}<span class="t">${esc(t('top30RT'))}</span><span class="s" style="color:#1F6E55">${esc(t('top30Sub'))}</span></a>
        <a class="tile" href="#read/time" style="background:#FFF4D6;border:none">${ic('clock', '#fff', 'sm')}<span class="t">${esc(t('readTimeT'))}</span><span class="s" style="color:#6B4E00">${esc(t('readTimeSub'))}</span></a></section>
      <a class="tile h" href="#ielts/R">${ic('spark', '#EEEAFE', 'sm')}<span class="stack grow" style="gap:0"><span class="t">${esc(t('aiListeningMore'))}</span><span class="s">${esc(t('aiReadingMoreSub'))}</span></span></a>
      <span class="small center">${esc(t('fromStudyBookR'))}</span></div>`;
  };

  function timeView() {
    const plan = [[17, 'Passage 1', t('p1Note')], [20, 'Passage 2', t('p2Note')], [23, 'Passage 3', t('p3Note')]];
    return `<div class="page">${PS.back('#read', `<span style="font-size:12px;color:#6B4E00;display:block;font-family:Nunito,sans-serif;font-weight:800">C11 · ${esc(t('bookPage', { n: 51 }))}</span>${esc(t('readTimeT'))}`)}
      <section class="card" style="background:#FFF4D6;border:none"><b style="color:#6B4E00">17 · 20 · 23</b><span style="font-size:14px;color:#5C4600">${esc(t('readTimeIntro'))}</span></section>
      ${plan.map(([m, n, note]) => `<section class="card"><div class="between"><span class="stack" style="gap:0"><b>${n}</b><span class="small">${esc(note)}</span></span><button class="btn soft sm" data-act="rdTimer" data-m="${m}">⏱ ${m}:00</button></div></section>`).join('')}
      <div id="rdClock" class="card" style="align-items:center;display:none"><b id="rdClockT" style="font-family:Fredoka,Nunito,sans-serif;font-size:40px;color:#1F6E55">0:00</b><button class="btn ghost sm" data-act="rdTimerStop">■ ${esc(t('stopAudio'))}</button></div>
      <section class="card"><h2 class="h2" style="font-size:16px">📰 ${esc(t('dailyReading'))}</h2><span class="small">${esc(t('dailyReadingSub'))}</span>
        ${D().sources.map((s) => `<a class="tile h" href="${esc(s.url)}" target="_blank" rel="noopener">${ic('reading', '#DDF4EA', 'sm')}<span class="stack grow" style="gap:0"><span class="t" style="font-size:14px">${esc(s.name)}</span><span class="s">${esc(s.sub)}</span></span><span style="font-size:18px;color:#6B6585">↗</span></a>`).join('')}</section></div>`;
  }
  let tm = null;
  PS.acts.rdTimer = (el) => {
    clearInterval(tm); const end = Date.now() + (+el.dataset.m) * 60000, box = document.getElementById('rdClock'); box.style.display = 'flex';
    const tick = () => { const o = document.getElementById('rdClockT'); if (!o) { clearInterval(tm); return; } const left = Math.max(0, end - Date.now()); o.textContent = Math.floor(left / 60000) + ':' + String(Math.floor(left / 1000) % 60).padStart(2, '0'); if (!left) { clearInterval(tm); PS.toast(t('timeUp'), 4000); if (navigator.vibrate) navigator.vibrate(400); } };
    tick(); tm = setInterval(tick, 1000);
  };
  PS.acts.rdTimerStop = () => { clearInterval(tm); const b = document.getElementById('rdClock'); if (b) b.style.display = 'none'; };
})();
