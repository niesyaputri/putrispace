/* Putri Space · English tahap 1: Kesiapan, Rencana harian, Mock Tracker, pola error, kategori Bahan PDF · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, dayKey, addDays } = PS;
  const t = (k, v) => PS.t(k, v), S = () => PS.S();

  /* ---------- translations ---------- */
  const I = {
    id: {
      e2ReadyT: 'Kesiapan tes', e2ReadyNone: 'Skor saat ini (belum ada mock)', e2Last: 'Mock terakhir · {d}', e2NotReady: 'Belum siap booking', e2Ready: 'Siap booking tes',
      e2OpenMock: 'Buka Mock Tracker', e2LogFirst: 'Catat mock pertama', e2Today: 'Hari ini', e2Week: 'Minggu {n}/16', e2Done: '{a} / {b} selesai', e2Open: 'Buka',
      e2PlanT: 'Rencana belajar 16 minggu', e2PlanSub: 'Jadwal harian singkat: grammar, skill hari ini, dan ulasan Error Log. Centang yang sudah selesai.', e2PlanStart: 'Mulai rencana', e2PlanDate: 'Tanggal mulai',
      e2PlanSoon: 'Rencana mulai {d} ({n} hari lagi)', e2PlanEnded: 'Rencana 16 minggu selesai. Tentukan tanggal tes dari hasil mock terakhir.', e2PlanChange: 'Ubah tanggal mulai', e2PlanStop: 'Hentikan rencana', e2Hours: '±{h} jam/minggu',
      e2Ph1: 'Fondasi (ringan)', e2Ph2: 'Bangun', e2Ph3: 'Jaga ritme', e2Ph4: 'Simulasi',
      e2tGram: 'Grammar + kosakata · 20 mnt', e2tLis: 'Listening · dictation dan latihan · 40 mnt', e2tRead: 'Reading · timed per passage · 40 mnt', e2tWrite: 'Writing · rencana, tulis, rewrite · 40 mnt', e2tSpeak: 'Speaking · rekam 3 jawaban · 40 mnt', e2tMix: 'Campuran + koreksi · 40 mnt', e2tMock: 'Section timed atau mock penuh · 90 mnt', e2tDeep: 'Koreksi mendalam + Error Log · 60 mnt', e2tEssay: 'Esai penuh + rewrite · 60 mnt', e2tTutor: 'Sesi tutor (Speaking/Writing) · 30 mnt', e2tReview: 'Ulas Error Log · 15 mnt',
      e2mockTile: 'Mock Tracker', e2mockTileSub: 'Catat skor mock, grafik, dan kesiapan tes', e2mockT: 'Mock Tracker', e2mockAdd: 'Tambah hasil mock', e2mockEdit: 'Ubah hasil mock', e2date: 'Tanggal',
      e2lRaw: 'Listening (benar / 40)', e2rRaw: 'Reading (benar / 40)', e2wBand: 'Writing (band, dari tutor)', e2sBand: 'Speaking (band, dari tutor)', e2calc: 'Hitung dan simpan', e2save: 'Simpan perubahan', e2updScores: 'Jadikan skor saat ini di Road to Band', e2prevNone: 'Isi keempat skor untuk melihat pratinjau.',
      e2chartT: 'Overall tiap mock', e2target: 'target {n}', e2readyQ: 'Siap booking tes?', e2rule1: '2 mock berturut-turut ≥ {n} overall', e2rule2: 'Tiap skill ≥ {n}', e2rule2b: 'Skill di bawah: {s}', e2rule3: 'Writing dan Speaking sebaiknya dinilai tutor, bukan hanya AI.',
      e2round: 'Overall = rata-rata empat skill dibulatkan ke 0.5 terdekat. Rata-rata yang berakhir .25 naik ke 0.5 berikutnya (7.25 menjadi 7.5).', e2rawNote: 'Konversi skor mentah ke band bersifat perkiraan; tiap tes sedikit berbeda.',
      e2history: 'Riwayat', e2noMocks: 'Belum ada mock. Catat hasil pertamamu di atas.', e2saved: 'Mock tersimpan ✓', e2invalid: 'Isi semua skor: Listening dan Reading 0–40, Writing dan Speaking 0–9 (kelipatan 0.5).', e2deleted: 'Mock dihapus',
      e2patT: 'Pola error 30 hari', e2patNone: 'Belum ada kesalahan tercatat dalam 30 hari terakhir.', e2patHint: 'Fokus grammar minggu ini: ikuti dua pola teratas.',
      e2pdfTile: 'Bahan PDF', e2pdfTileSub: 'Tambah PDF, baca dengan mode belajar', e2pdfEyebrow: 'Bahan PDF · English', e2pdfHero: 'Rak PDF belajar IELTS', e2pdfHeroSub: 'Tambahkan buku, soal, atau materi. Sorot, catat, dan tanya AI di tiap halaman.',
      e2pdfHow3: '📝 Catatan per halaman · ✨ Tanya AI (jelaskan, terjemahkan, ringkas, buat contoh kalimat).', e2pdfCatQ: 'PDF ini untuk skill apa?', e2pdfCatSub: 'Kategori membantu menyaring rak. Bisa diubah nanti lewat menu ⋯.', e2pdfSkip: 'Lewati', e2pdfCat: 'Kategori',
      e2timerSub: 'Timer belajar', e2timerSet: 'Atur', e2timerPick: 'Pilih durasi', e2timerDone: 'Waktu habis!', e2min: '{n} menit',
      e2c_listening: 'Listening', e2c_reading: 'Reading', e2c_writing: 'Writing', e2c_speaking: 'Speaking', e2c_grammar: 'Grammar', e2c_vocab: 'Vocab', e2c_other: 'Lainnya'
    },
    en: {
      e2ReadyT: 'Test readiness', e2ReadyNone: 'Current scores (no mock yet)', e2Last: 'Latest mock · {d}', e2NotReady: 'Not ready to book', e2Ready: 'Ready to book',
      e2OpenMock: 'Open Mock Tracker', e2LogFirst: 'Log first mock', e2Today: 'Today', e2Week: 'Week {n}/16', e2Done: '{a} / {b} done', e2Open: 'Open',
      e2PlanT: '16-week study plan', e2PlanSub: 'A short daily schedule: grammar, the skill of the day, and Error Log review. Tick what you finish.', e2PlanStart: 'Start plan', e2PlanDate: 'Start date',
      e2PlanSoon: 'Plan starts {d} (in {n} days)', e2PlanEnded: 'The 16-week plan is complete. Pick a test date from your latest mock.', e2PlanChange: 'Change start date', e2PlanStop: 'Stop plan', e2Hours: '±{h} hrs/week',
      e2Ph1: 'Foundation (light)', e2Ph2: 'Build', e2Ph3: 'Keep rhythm', e2Ph4: 'Simulation',
      e2tGram: 'Grammar + vocabulary · 20 min', e2tLis: 'Listening · dictation and practice · 40 min', e2tRead: 'Reading · timed per passage · 40 min', e2tWrite: 'Writing · plan, write, rewrite · 40 min', e2tSpeak: 'Speaking · record 3 answers · 40 min', e2tMix: 'Mixed + corrections · 40 min', e2tMock: 'Timed section or full mock · 90 min', e2tDeep: 'Deep correction + Error Log · 60 min', e2tEssay: 'Full essay + rewrite · 60 min', e2tTutor: 'Tutor session (Speaking/Writing) · 30 min', e2tReview: 'Review Error Log · 15 min',
      e2mockTile: 'Mock Tracker', e2mockTileSub: 'Log mock scores, chart and test readiness', e2mockT: 'Mock Tracker', e2mockAdd: 'Add mock result', e2mockEdit: 'Edit mock result', e2date: 'Date',
      e2lRaw: 'Listening (correct / 40)', e2rRaw: 'Reading (correct / 40)', e2wBand: 'Writing (band, from tutor)', e2sBand: 'Speaking (band, from tutor)', e2calc: 'Calculate and save', e2save: 'Save changes', e2updScores: 'Also set as my current scores in Road to Band', e2prevNone: 'Fill in all four scores to see a preview.',
      e2chartT: 'Overall per mock', e2target: 'target {n}', e2readyQ: 'Ready to book the test?', e2rule1: '2 mocks in a row ≥ {n} overall', e2rule2: 'Every skill ≥ {n}', e2rule2b: 'Below: {s}', e2rule3: 'Writing and Speaking should be marked by a tutor, not only by AI.',
      e2round: 'Overall = the average of the four skills rounded to the nearest half band. An average ending in .25 rounds up to the next half band (7.25 becomes 7.5).', e2rawNote: 'Raw-score-to-band conversion is approximate; each test differs slightly.',
      e2history: 'History', e2noMocks: 'No mocks yet. Log your first result above.', e2saved: 'Mock saved ✓', e2invalid: 'Fill in every score: Listening and Reading 0–40, Writing and Speaking 0–9 (in steps of 0.5).', e2deleted: 'Mock deleted',
      e2patT: 'Error patterns · 30 days', e2patNone: 'No mistakes logged in the last 30 days.', e2patHint: 'Grammar focus this week: follow the top two patterns.',
      e2pdfTile: 'PDF materials', e2pdfTileSub: 'Add PDFs, read in study mode', e2pdfEyebrow: 'PDF materials · English', e2pdfHero: 'Your IELTS PDF shelf', e2pdfHeroSub: 'Add books, tests or materials. Highlight, take notes and ask AI on any page.',
      e2pdfHow3: '📝 Notes per page · ✨ Ask AI (explain, translate, summarise, give example sentences).', e2pdfCatQ: 'Which skill is this PDF for?', e2pdfCatSub: 'The category helps you filter the shelf. You can change it later from the ⋯ menu.', e2pdfSkip: 'Skip', e2pdfCat: 'Category',
      e2timerSub: 'Study timer', e2timerSet: 'Set', e2timerPick: 'Choose a duration', e2timerDone: 'Time is up!', e2min: '{n} minutes',
      e2c_listening: 'Listening', e2c_reading: 'Reading', e2c_writing: 'Writing', e2c_speaking: 'Speaking', e2c_grammar: 'Grammar', e2c_vocab: 'Vocab', e2c_other: 'Other'
    }
  };
  Object.keys(I).forEach((l) => { window.PS_I18N[l] = Object.assign(window.PS_I18N[l] || {}, I[l]); });

  const SKC = { L: ['Listening', '#6FA4EE', '#E0EEFF', '#2B5C99'], R: ['Reading', '#5BBF97', '#DDF4EA', '#1F6E55'], W: ['Writing', '#E8875A', '#FFE6D9', '#9A4A22'], S: ['Speaking', '#E0708F', '#FCE4EA', '#8E3049'] };
  const KEYS = ['L', 'R', 'W', 'S'];
  PS.ENG_CATS = ['listening', 'reading', 'writing', 'speaking', 'grammar', 'vocab', 'other'];
  const catName = (c) => t('e2c_' + (c || 'other'));

  /* ---------- raw score → band (Academic, approximate) ---------- */
  const LIS = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [7, 3.5], [5, 3], [3, 2.5], [1, 2]];
  const REA = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [1, 2]];
  const toBand = (tbl, raw) => { for (const [m, b] of tbl) if (raw >= m) return b; return 0; };
  const goodRaw = (v) => v !== '' && Number.isInteger(+v) && +v >= 0 && +v <= 40;
  const goodBand = (v) => v !== '' && +v >= 0 && +v <= 9 && Math.abs(+v * 2 - Math.round(+v * 2)) < 1e-9;
  const calc = (f) => {
    if (!goodRaw(f.lraw) || !goodRaw(f.rraw) || !goodBand(f.w) || !goodBand(f.s)) return null;
    const m = { L: toBand(LIS, +f.lraw), R: toBand(REA, +f.rraw), W: +f.w, S: +f.s };
    m.overall = PS.ieltsRound((m.L + m.R + m.W + m.S) / 4);
    return m;
  };
  const mocks = () => (S().mocks || []).slice().sort((a, b) => (a.date === b.date ? (a.id < b.id ? -1 : 1) : a.date < b.date ? -1 : 1));
  const cfg = () => ({ overall: Math.max(...KEYS.map((k) => S().ielts[k].target)), minSkill: 7, need: 2 });
  const meets = (m) => m.overall >= cfg().overall && KEYS.every((k) => m[k] >= cfg().minSkill);
  const streak = () => { let n = 0; const l = mocks().reverse(); for (const m of l) { if (meets(m)) n++; else break; } return n; };
  const fix1 = (n) => (+n).toFixed(1);
  const keep = () => { const y = window.scrollY; PS.render(); window.scrollTo(0, y); };

  /* ---------- Kesiapan (hub card) ---------- */
  function readiness() {
    const l = mocks().slice(-1)[0], s = S(), c = cfg(), src = l || { L: s.ielts.L.score, R: s.ielts.R.score, W: s.ielts.W.score, S: s.ielts.S.score, overall: PS.overall() };
    const ok = l && streak() >= c.need;
    const bars = KEYS.map((k) => `<div class="row" style="gap:10px"><span style="width:76px;font-size:13px;font-weight:800">${SKC[k][0]}</span><div class="bar" style="flex:1;height:10px;background:#fff"><i style="width:${Math.min(100, (src[k] / 9) * 100)}%;background:${SKC[k][1]}"></i></div><b style="width:30px;text-align:right;font-size:13px">${fix1(src[k])}</b></div>`).join('');
    return `<section class="card" style="background:#EEEAFE;border:none;gap:12px">
      <div class="between" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="small" style="font-weight:800;color:#4B3DB0">${esc(t('e2ReadyT'))}</span>
        <span style="font-family:Fredoka,Nunito,sans-serif;font-size:34px;line-height:1.1">${fix1(src.overall)} <span style="font-size:16px;color:var(--muted2)">/ ${fix1(c.overall)}</span></span>
        <span class="small">${l ? esc(t('e2Last', { d: PS.fmtDate(l.date) })) : esc(t('e2ReadyNone'))}</span></div>
        <span class="pill" style="background:${ok ? '#DDF4EA' : '#FFE6D9'};color:${ok ? '#1F6E55' : '#9A4A22'}">${esc(t(ok ? 'e2Ready' : 'e2NotReady'))}</span></div>
      <div class="stack" style="gap:9px">${bars}</div>
      <a class="btn" href="#mock">${esc(t(l ? 'e2OpenMock' : 'e2LogFirst'))}</a></section>`;
  }

  /* ---------- Rencana harian ---------- */
  const PH = [[1, 4, 'e2Ph1', '5–6'], [5, 9, 'e2Ph2', '10–12'], [10, 13, 'e2Ph3', '6–8'], [14, 16, 'e2Ph4', '10–12']];
  const dayTasks = (dow) => {
    const g = { id: 'gram', k: 'e2tGram', r: '#grammar' }, rv = { id: 'rev', k: 'e2tReview', r: PS.dueMistakes().length ? '#review' : '#mistakes' };
    const mid = { 1: { id: 'lis', k: 'e2tLis', r: '#listen' }, 2: { id: 'read', k: 'e2tRead', r: '#read' }, 3: { id: 'write', k: 'e2tWrite', r: '#ielts/W' }, 4: { id: 'speak', k: 'e2tSpeak', r: '#ielts/S' }, 5: { id: 'mix', k: 'e2tMix', r: '#mistakes' } }[dow];
    if (mid) return [g, mid, rv];
    if (dow === 6) return [{ id: 'mock', k: 'e2tMock', r: '#mock' }, { id: 'deep', k: 'e2tDeep', r: '#mistakes' }];
    return [{ id: 'essay', k: 'e2tEssay', r: '#ielts/W' }, { id: 'tutor', k: 'e2tTutor', r: '#sbank' }];
  };
  const plan = () => { const s = S(); if (!s.plan) s.plan = { on: false, start: '', done: {} }; return s.plan; };
  function planCard() {
    const p = plan();
    if (!p.on || !p.start) return `<section class="card" style="gap:8px"><b style="font-size:16px">${esc(t('e2PlanT'))}</b><span class="small">${esc(t('e2PlanSub'))}</span><button class="btn soft" data-act="planStartSheet">${esc(t('e2PlanStart'))}</button></section>`;
    const days = PS.daysUntil(p.start);
    if (days > 0) return `<section class="card" style="gap:8px"><b style="font-size:16px">${esc(t('e2PlanT'))}</b><span class="small">${esc(t('e2PlanSoon', { d: PS.fmtDate(p.start), n: days }))}</span><button class="btn ghost sm" data-act="planStartSheet">${esc(t('e2PlanChange'))}</button></section>`;
    const week = Math.floor(-days / 7) + 1;
    if (week > 16) return `<section class="card" style="gap:8px"><b style="font-size:16px">${esc(t('e2PlanT'))}</b><span class="small">${esc(t('e2PlanEnded'))}</span><a class="btn soft" href="#mock">${esc(t('e2OpenMock'))}</a><button class="btn ghost sm" data-act="planStop">${esc(t('e2PlanStop'))}</button></section>`;
    const ph = PH.find((x) => week >= x[0] && week <= x[1]) || PH[3];
    const today = dayKey(), done = p.done[today] || [], list = dayTasks(new Date().getDay());
    const nDone = list.filter((x) => done.includes(x.id)).length;
    const dayName = new Date().toLocaleDateString(S().lang === 'en' ? 'en-GB' : 'id-ID', { weekday: 'long' });
    const rows = list.map((x) => { const on = done.includes(x.id); return `<div class="row" style="gap:10px;min-height:44px"><button data-act="planTog" data-id="${x.id}" aria-pressed="${on}" aria-label="${esc(t(x.k))}" style="width:30px;height:30px;border-radius:10px;border:${on ? 'none' : '2px solid #B9B2D6'};background:${on ? '#5BBF97' : '#fff'};color:#fff;font-weight:800;flex-shrink:0;cursor:pointer">${on ? '✓' : ''}</button><span class="grow" style="font-size:14px;font-weight:700;${on ? 'text-decoration:line-through;color:var(--muted2)' : ''}">${esc(t(x.k))}</span><a href="${x.r}" class="small" style="font-weight:800;color:#4B3DB0;padding:10px 4px">${esc(t('e2Open'))} ›</a></div>`; }).join('');
    return `<section class="card" style="gap:6px"><div class="between"><b style="font-size:16px">${esc(t('e2Today'))} · ${esc(dayName)}</b><span class="pill" style="background:#DDF4EA;color:#1F6E55">${esc(t('e2Done', { a: nDone, b: list.length }))}</span></div>
      <span class="small">${esc(t('e2Week', { n: week }))} · ${esc(t(ph[2]))} · ${esc(t('e2Hours', { h: ph[3] }))}</span>${rows}
      <div class="row wrap" style="gap:6px"><button class="btn ghost sm" data-act="planStartSheet">${esc(t('e2PlanChange'))}</button><button class="btn ghost sm" data-act="planStop">${esc(t('e2PlanStop'))}</button></div></section>`;
  }
  A.planTog = (el) => {
    const p = plan(), k = dayKey(); p.done[k] = p.done[k] || [];
    const i = p.done[k].indexOf(el.dataset.id); if (i >= 0) p.done[k].splice(i, 1); else { p.done[k].push(el.dataset.id); PS.mark('plan'); }
    PS.save(); keep();
  };
  A.planStartSheet = () => {
    const p = plan();
    PS.sheet(`<h2 class="h2">${esc(t('e2PlanT'))}</h2><div class="field"><label class="lbl" for="planDate">${esc(t('e2PlanDate'))}</label><input id="planDate" class="in" type="date" value="${esc(p.start || dayKey())}"></div><button class="btn" data-act="planStart">${esc(t('e2PlanStart'))}</button>`);
  };
  A.planStart = () => { const v = document.getElementById('planDate').value; if (!v) return; const p = plan(); p.on = true; p.start = v; PS.save(); PS.sheet(null); PS.render(); };
  A.planStop = () => { if (!confirm(t('confirmDelete'))) return; const p = plan(); p.on = false; PS.save(); PS.render(); };

  /* ---------- hub ---------- */
  function tiles() {
    return `<section class="grid2"><a class="tile" href="#epdf" style="background:#E0EEFF;border:none"><span style="font-size:26px" aria-hidden="true">📚</span><span class="t">${esc(t('e2pdfTile'))}</span><span class="s" style="color:#2B5C99">${esc(t('e2pdfTileSub'))}</span></a><a class="tile" href="#mock" style="background:#FFF4D6;border:none"><span style="font-size:26px" aria-hidden="true">📈</span><span class="t">${esc(t('e2mockTile'))}</span><span class="s" style="color:#6B4E00">${esc(t('e2mockTileSub'))}</span></a></section>`;
  }
  const top = () => readiness() + planCard() + tiles();

  /* ---------- Mock Tracker ---------- */
  const fields = (p, m) => {
    m = m || {};
    const inp = (id, lbl, val, mode, ph) => `<div class="field"><label class="lbl" for="${p}${id}">${esc(t(lbl))}</label><input id="${p}${id}" class="in" inputmode="${mode}" placeholder="${ph}" value="${esc(val == null ? '' : val)}" data-in="mockPrev" data-p="${p}" autocomplete="off"></div>`;
    return `<div class="field"><label class="lbl" for="${p}D">${esc(t('e2date'))}</label><input id="${p}D" class="in" type="date" value="${esc(m.date || dayKey())}"></div>
      <div class="grid2">${inp('L', 'e2lRaw', m.lraw, 'numeric', '31')}${inp('R', 'e2rRaw', m.rraw, 'numeric', '33')}${inp('W', 'e2wBand', m.W, 'decimal', '6.5')}${inp('S', 'e2sBand', m.S, 'decimal', '6.5')}</div>
      <div id="${p}Prev" class="row wrap" style="gap:6px;min-height:30px"></div>`;
  };
  const readFields = (p) => { const g = (id) => (document.getElementById(p + id) || {}).value || ''; return { date: g('D'), lraw: g('L').trim(), rraw: g('R').trim(), w: g('W').trim().replace(',', '.'), s: g('S').trim().replace(',', '.') }; };
  IN.mockPrev = (el) => {
    const p = el.dataset.p || 'mk', box = document.getElementById(p + 'Prev'); if (!box) return;
    const f = readFields(p), m = calc(f);
    if (!m) { const l = goodRaw(f.lraw) ? toBand(LIS, +f.lraw) : null, r = goodRaw(f.rraw) ? toBand(REA, +f.rraw) : null; box.innerHTML = [l != null ? chip('L', l) : '', r != null ? chip('R', r) : ''].join('') || `<span class="small">${esc(t('e2prevNone'))}</span>`; return; }
    box.innerHTML = chip('L', m.L) + chip('R', m.R) + `<span class="pill" style="background:#EEEAFE;color:#4B3DB0">Overall ${fix1(m.overall)}</span>`;
  };
  const chip = (k, b) => `<span class="pill" style="background:${SKC[k][2]};color:${SKC[k][3]}">${SKC[k][0].slice(0, 1)} → ${fix1(b)}</span>`;
  V.mock_after = () => { const e = document.getElementById('mkL'); if (e) IN.mockPrev(e); };

  V.mock = function () {
    const all = mocks(), c = cfg(), s = streak(), last = all.slice(-1)[0], chartList = all.slice(-8);
    const lowSk = last ? KEYS.filter((k) => last[k] < c.minSkill).map((k) => `${SKC[k][0]} ${fix1(last[k])}`) : [];
    const lo = 4, hi = 9, H = 120, pct = (b) => Math.max(4, ((b - lo) / (hi - lo)) * 100);
    const chart = chartList.length ? `<div style="position:relative;height:${H + 24}px;display:flex;align-items:flex-end;justify-content:space-around;gap:4px;border-bottom:2px solid var(--line);padding-top:24px">
        <div style="position:absolute;left:0;right:0;bottom:${(pct(c.overall) / 100) * H}px;border-top:2px dashed #E8875A" aria-hidden="true"></div>
        ${chartList.map((m) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:3px;flex:1;max-width:44px"><span style="font-size:12px;font-weight:800">${fix1(m.overall)}</span><div style="width:70%;height:${(pct(m.overall) / 100) * H}px;border-radius:8px 8px 0 0;background:${meets(m) ? '#5BBF97' : '#8C7BE8'}"></div></div>`).join('')}</div>
      <div style="display:flex;justify-content:space-around;font-size:10.5px;font-weight:700;color:var(--muted2)">${chartList.map((m) => `<span style="flex:1;max-width:44px;text-align:center">${esc(m.date.slice(5).replace('-', '/'))}</span>`).join('')}</div>` : `<span class="small">${esc(t('e2noMocks'))}</span>`;
    const rule = (ok, txt) => `<div class="row" style="gap:10px;min-height:40px"><span style="width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;background:${ok ? '#DDF4EA' : '#FFE6D9'};color:${ok ? '#1F6E55' : '#9A4A22'}">${ok ? '✓' : '!'}</span><span class="grow" style="font-size:14px;font-weight:700">${txt}</span></div>`;
    return `<div class="page">${PS.back('#english', esc(t('e2mockT')))}
      <section class="card" style="gap:12px"><h2 class="h2">${esc(t('e2mockAdd'))}</h2>${fields('mk')}
        <label class="row" style="gap:8px;font-size:13px;font-weight:700"><input type="checkbox" id="mkU" style="width:20px;height:20px"> ${esc(t('e2updScores'))}</label>
        <button class="btn" data-act="mockSave" data-p="mk">${esc(t('e2calc'))}</button><span class="small">${esc(t('e2rawNote'))}</span></section>
      <section class="card" style="gap:10px"><div class="between"><h2 class="h2">${esc(t('e2chartT'))}</h2><span class="pill" style="background:#FFE6D9;color:#9A4A22">${esc(t('e2target', { n: fix1(c.overall) }))}</span></div>${chart}</section>
      <section class="card" style="gap:6px"><h2 class="h2">${esc(t('e2readyQ'))}</h2>
        ${rule(s >= c.need, `${esc(t('e2rule1', { n: fix1(c.overall) }))} <span class="small">(${s} / ${c.need})</span>`)}
        ${rule(last && !lowSk.length, `${esc(t('e2rule2', { n: fix1(c.minSkill) }))}${lowSk.length ? ` <span class="small">${esc(t('e2rule2b', { s: lowSk.join(', ') }))}</span>` : ''}`)}
        <span class="small">${esc(t('e2rule3'))}</span>
        <div style="background:#EEEAFE;border-radius:14px;padding:10px 12px;font-size:12.5px;font-weight:600;color:#4B3DB0;line-height:1.4">${esc(t('e2round'))}</div></section>
      <section class="card" style="gap:6px"><h2 class="h2">${esc(t('e2history'))}</h2>${all.length ? all.slice().reverse().map((m) => `<button data-act="mockEdit" data-id="${m.id}" style="all:unset;box-sizing:border-box;display:flex;align-items:center;gap:10px;min-height:46px;border-bottom:1px solid #F1ECFA;cursor:pointer;width:100%"><span style="width:62px;font-size:12px;font-weight:700;color:var(--muted2)">${esc(PS.fmtDate(m.date).replace(/ \d{4}$/, ''))}</span><span class="grow" style="font-size:13px;font-weight:700">L ${fix1(m.L)} · R ${fix1(m.R)} · W ${fix1(m.W)} · S ${fix1(m.S)}</span><b style="font-size:15px;color:#4B3DB0">${fix1(m.overall)}</b></button>`).join('') : `<span class="small">${esc(t('e2noMocks'))}</span>`}</section></div>`;
  };
  A.mockSave = (el) => {
    const p = el.dataset.p, f = readFields(p), m = calc(f);
    if (!f.date || !m) { PS.toast(t('e2invalid'), 4000); return; }
    const s = S(); s.mocks = s.mocks || [];
    const rec = Object.assign({ date: f.date, lraw: +f.lraw, rraw: +f.rraw }, m);
    if (el.dataset.id) { const x = s.mocks.find((q) => q.id === el.dataset.id); if (x) Object.assign(x, rec); }
    else {
      s.mocks.push(Object.assign({ id: PS.uid() }, rec));
      const u = document.getElementById('mkU');
      if (u && u.checked) KEYS.forEach((k) => { s.ielts[k].score = m[k]; });
      PS.mark('mock');
    }
    PS.save(); PS.sheet(null); PS.toast(t('e2saved')); PS.render();
  };
  A.mockEdit = (el) => {
    const m = (S().mocks || []).find((x) => x.id === el.dataset.id); if (!m) return;
    PS.sheet(`<h2 class="h2">${esc(t('e2mockEdit'))}</h2>${fields('me', { date: m.date, lraw: m.lraw, rraw: m.rraw, W: m.W, S: m.S })}<button class="btn" data-act="mockSave" data-p="me" data-id="${m.id}">${esc(t('e2save'))}</button><button class="btn ghost" style="color:#8E3049" data-act="mockDel" data-id="${m.id}">${esc(t('delete'))}</button>`);
    const e = document.getElementById('meL'); if (e) IN.mockPrev(e);
  };
  A.mockDel = (el) => { if (!confirm(t('confirmDelete'))) return; const s = S(); s.mocks = (s.mocks || []).filter((x) => x.id !== el.dataset.id); PS.save(); PS.sheet(null); PS.toast(t('e2deleted')); PS.render(); };

  /* ---------- pola error (Error Log) ---------- */
  function patterns() {
    const since = addDays(dayKey(), -30), by = {};
    S().mistakes.filter((m) => m.date >= since).forEach((m) => { const k = m.category || 'Other'; by[k] = (by[k] || 0) + 1; });
    const list = Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 5), mx = list.length ? list[0][1] : 1;
    return `<section class="card" style="gap:9px"><h2 class="h2">${esc(t('e2patT'))}</h2>${list.length ? list.map(([k, n], i) => `<div class="row" style="gap:10px"><span style="width:96px;font-size:13px;font-weight:700">${esc(k)}</span><div class="bar" style="flex:1;height:10px"><i style="width:${(n / mx) * 100}%;background:${i < 2 ? '#E8875A' : '#8C7BE8'}"></i></div><b style="width:26px;text-align:right;font-size:13px">${n}</b></div>`).join('') + `<span class="small">${esc(t('e2patHint'))}</span>` : `<span class="small">${esc(t('e2patNone'))}</span>`}</section>`;
  }

  PS.eng2 = { top, patterns, catName };
})();
