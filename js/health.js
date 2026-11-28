/* Putri Space · PIN pribadi (Dear Me + Kesehatanku) dan Kesehatanku · Created by CreanovativeCo
   Data kesehatan dan PIN pribadi disimpan HANYA di HP ini (localStorage 'putrispace.health' / 'putrispace.priv'),
   tidak masuk state utama, jadi tidak ikut Save to Sheet. */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, dayKey, addDays, uid } = PS;
  const t = PS.t;
  const S = () => PS.S();
  const T = (k, v) => t('hl' + k, v);

  /* ---------- translations ---------- */
  const L = {
    id: {
      Title: 'Kesehatanku', Sub: 'Kondisi, vitamin, dan siklus', Locked: 'Terkunci', Lock: 'Kunci', LockedNote: 'Isi disembunyikan sampai PIN dimasukkan',
      OnlyPhone: 'Data hanya di HP ini, tidak ikut Save to Sheet',
      TabCheck: 'Check-in', TabCal: 'Kalender', TabSum: 'Ringkasan', TabLog: 'Riwayat', TabSet: 'Atur',
      Today: 'Hari ini', ToToday: 'Kembali ke hari ini', FillFor: 'Mengisi untuk {d}', PickDate: 'Tanggal',
      Cond: 'Kondisi badan', Ok: 'Sehat', Meh: 'Biasa', Sick: 'Kurang fit', Sym: 'Gejala (kalau ada)',
      s_pilek: 'Pilek', s_pusing: 'Pusing', s_demam: 'Demam', s_batuk: 'Batuk', s_perut: 'Sakit perut', s_lelah: 'Lelah', s_nyeri: 'Nyeri haid', s_mual: 'Mual',
      Vit: 'Vitamin dan suplemen', VitEdit: 'Ubah daftar: ganti nama, tambah, atau sembunyikan', VitNone: 'Semua item disembunyikan. Aktifkan lagi di Atur.',
      Cycle: 'Siklus', StartP: 'Mulai haid', EndP: 'Selesai haid', Flow: 'Banyaknya', F_lt: 'Sedikit', F_md: 'Sedang', F_hv: 'Banyak',
      CycleDay: 'Hari ke-{n} siklus', CycleNow: 'Haid sedang berlangsung sejak {d}', CycleNone: 'Belum ada catatan haid', CycleOn: 'Haid di tanggal ini',
      NoOpen: 'Belum ada haid yang dimulai sebelum tanggal ini', AlreadyIn: 'Tanggal ini sudah masuk catatan haid', StartSaved: 'Awal haid dicatat', EndSaved: 'Akhir haid dicatat',
      Note: 'Catatan', NotePh: 'Tulis apa saja yang ingin kamu ingat…', SeeLog: 'Lihat catatan sebelumnya (bisa diedit)',
      Save: 'Simpan check-in', Saved: 'Tersimpan. Kamu bisa mengeditnya kapan saja.', Empty: 'Isi minimal satu hal dulu', Del: 'Hapus check-in ini', Deleted: 'Check-in dihapus',
      DelAsk: 'Hapus check-in tanggal {d}?', Cancel: 'Batal',
      CalHead: 'Kalender kesehatan', Legend_ok: 'Sehat', Legend_p: 'Haid', Legend_sick: 'Kurang fit', Legend_meh: 'Biasa', Legend_v: 'Ada vitamin', TapDay: 'Ketuk tanggal untuk membaca atau mengedit',
      NextP: 'Perkiraan haid berikutnya', NextPNote: 'sekitar {d} · dari rata-rata {n} hari', NextPNone: 'Catat awal haid untuk mulai memperkirakan.', NextPDef: 'sekitar {d} · perkiraan awal 28 hari',
      SumHead: 'Ringkasan', PerM: 'Bulan ini', Per3: '3 bulan', PerY: 'Tahun ini', Logged: 'hari tercatat', DOk: 'hari sehat', DSick: 'hari kurang fit', AvgCycle: 'hari rata-rata siklus', AvgNone: 'belum cukup data',
      VitCons: 'Konsistensi vitamin', VitConsNote: 'Persentase hari saat diminum, dari semua hari di periode ini', CycleHist: 'Panjang siklus terakhir', CycleHistNote: 'Tinggi batang = panjang siklus (hari)', CycleHistNone: 'Butuh minimal dua catatan awal haid.',
      PdfHead: 'Unduh ringkasan PDF', PdfNote: 'Satu bulan penuh: statistik, vitamin, kalender, dan catatan. PDF berisi data kesehatan, simpan di tempat aman.', PdfGo: 'Unduh PDF', PdfMade: 'PDF dibuat',
      PdfTitle: 'Ringkasan Kesehatan', PdfFoot: 'Catatan pribadi dari Putri Space, bukan diagnosis medis', PdfNotes: 'Catatan harian', PdfNoNotes: 'Tidak ada catatan di bulan ini.', PdfVitTaken: 'Vitamin',
      LogHead: 'Riwayat check-in', LogEmpty: 'Belum ada check-in. Mulai dari hari ini.', VitCount: '{n} vitamin',
      SetHead: 'Pengaturan Kesehatanku', Items: 'Daftar vitamin dan suplemen', ItemShow: 'Tampil', ItemNew: 'Nama vitamin baru', ItemAdd: 'Tambah', ItemDelAsk: 'Hapus item ini? Riwayat lamanya ikut hilang dari ringkasan.', ItemNeedName: 'Isi nama dulu',
      Cycles: 'Riwayat haid', CycleStart: 'Mulai', CycleEnd: 'Selesai', CyclesNone: 'Belum ada catatan haid.', CycleDel: 'Hapus',
      Backup: 'Salinan data Kesehatanku', BackupNote: 'Data ini hanya ada di HP ini. Simpan salinan .json di tempat aman; file ini tidak terenkripsi.', BackupGo: 'Simpan salinan (.json)', RestoreGo: 'Pulihkan dari salinan',
      RestoreAsk: 'Ganti data Kesehatanku di HP ini dengan isi file ini?', RestoreOk: 'Data dipulihkan', RestoreBad: 'File ini bukan salinan Kesehatanku',
      Wipe: 'Hapus semua data Kesehatanku', WipeAsk: 'Ketik HAPUS untuk menghapus semua check-in, siklus, dan daftar vitamin dari HP ini.', WipeDone: 'Data Kesehatanku dihapus',
      PinHead: 'PIN pribadi', PinNew: 'Masukkan PIN baru', PinAgain: 'Ulangi PIN', PinSub: '6 angka. Kamu akan mengulanginya sekali untuk memastikan tidak salah ketik.',
      PinEnter: 'Masukkan PIN', PinWhy_dm: 'Dear Me berisi ceritamu, jadi disimpan di balik PIN.', PinWhy_hl: 'Kesehatanku berisi data pribadi, jadi disimpan di balik PIN.', PinWhy_pin: 'Masukkan PIN lama untuk membuka pengaturan.',
      PinMismatch: 'PIN tidak sama, ulangi dari awal', PinSaved: 'PIN pribadi aktif', Wrong: 'PIN salah, coba lagi', ManyFails: 'Terlalu banyak salah. Tunggu 1 menit.', Wait: 'Tunggu sebentar, kunci sedang dijeda',
      WhichLock: 'Kunci apa saja?', LockDm: 'Dear Me', LockHl: 'Kesehatanku', AutoNote: 'Terbuka sekali, lalu otomatis terkunci lagi setelah 5 menit tidak dipakai atau app ditinggal lebih dari 1 menit.',
      Status_on: 'Aktif · mengunci {x}', Status_off: 'Belum dibuat', Both: 'Dear Me dan Kesehatanku', OnlyDm: 'Dear Me', OnlyHl: 'Kesehatanku', None: 'tidak ada',
      PinChange: 'Ubah PIN', PinOff: 'Matikan PIN', PinOffAsk: 'Matikan PIN pribadi? Dear Me dan Kesehatanku bisa dibuka tanpa PIN.', PinOffDone: 'PIN pribadi dimatikan', LockNow: 'Kunci sekarang', Forgot: 'Lupa PIN?',
      ForgotText: 'Masukkan PIN 4 angka untuk membuka app (PIN aplikasi). Isi Dear Me dan Kesehatanku tidak dihapus; hanya PIN pribadi yang direset, lalu kamu membuat yang baru.', AppPin: 'PIN aplikasi (4 angka)', ResetPin: 'Reset PIN pribadi', ForgotBad: 'PIN aplikasi salah', ForgotDone: 'PIN pribadi direset. Buat yang baru.',
      CardOpen: 'Buka', CardStart: 'Mulai: buat PIN dulu', PinCardSub: 'Buat, ubah, atau matikan kunci',
      TodayCond: 'hari ini', VitToday: 'vitamin', CycleCard: 'siklus'
    },
    en: {
      Title: 'My Health', Sub: 'Condition, vitamins and cycle', Locked: 'Locked', Lock: 'Lock', LockedNote: 'Hidden until you enter your PIN',
      OnlyPhone: 'Data stays on this phone and is not saved to the Sheet',
      TabCheck: 'Check-in', TabCal: 'Calendar', TabSum: 'Summary', TabLog: 'History', TabSet: 'Settings',
      Today: 'Today', ToToday: 'Back to today', FillFor: 'Filling in for {d}', PickDate: 'Date',
      Cond: 'How is your body', Ok: 'Well', Meh: 'So-so', Sick: 'Unwell', Sym: 'Symptoms (if any)',
      s_pilek: 'Runny nose', s_pusing: 'Dizzy', s_demam: 'Fever', s_batuk: 'Cough', s_perut: 'Stomach ache', s_lelah: 'Tired', s_nyeri: 'Period pain', s_mual: 'Nausea',
      Vit: 'Vitamins and supplements', VitEdit: 'Edit the list: rename, add or hide', VitNone: 'All items are hidden. Turn them on in Settings.',
      Cycle: 'Cycle', StartP: 'Period started', EndP: 'Period ended', Flow: 'Flow', F_lt: 'Light', F_md: 'Medium', F_hv: 'Heavy',
      CycleDay: 'Cycle day {n}', CycleNow: 'Period ongoing since {d}', CycleNone: 'No period logged yet', CycleOn: 'Period on this date',
      NoOpen: 'No period started before this date', AlreadyIn: 'This date is already inside a logged period', StartSaved: 'Period start logged', EndSaved: 'Period end logged',
      Note: 'Notes', NotePh: 'Write anything you want to remember…', SeeLog: 'See earlier notes (editable)',
      Save: 'Save check-in', Saved: 'Saved. You can edit it anytime.', Empty: 'Fill in at least one thing first', Del: 'Delete this check-in', Deleted: 'Check-in deleted',
      DelAsk: 'Delete the check-in for {d}?', Cancel: 'Cancel',
      CalHead: 'Health calendar', Legend_ok: 'Well', Legend_p: 'Period', Legend_sick: 'Unwell', Legend_meh: 'So-so', Legend_v: 'Vitamins taken', TapDay: 'Tap a date to read or edit it',
      NextP: 'Next period (estimate)', NextPNote: 'around {d} · from your {n}-day average', NextPNone: 'Log a period start to begin estimating.', NextPDef: 'around {d} · starting estimate of 28 days',
      SumHead: 'Summary', PerM: 'This month', Per3: '3 months', PerY: 'This year', Logged: 'days logged', DOk: 'well days', DSick: 'unwell days', AvgCycle: 'day average cycle', AvgNone: 'not enough data',
      VitCons: 'Vitamin consistency', VitConsNote: 'Share of days taken, out of every day in this period', CycleHist: 'Recent cycle lengths', CycleHistNote: 'Bar height = cycle length (days)', CycleHistNone: 'Needs at least two period starts.',
      PdfHead: 'Download PDF summary', PdfNote: 'One full month: stats, vitamins, calendar and notes. The PDF holds health data, so keep it safe.', PdfGo: 'Download PDF', PdfMade: 'PDF created',
      PdfTitle: 'Health Summary', PdfFoot: 'Personal notes from Putri Space, not a medical diagnosis', PdfNotes: 'Daily notes', PdfNoNotes: 'No notes this month.', PdfVitTaken: 'Vitamins',
      LogHead: 'Check-in history', LogEmpty: 'No check-ins yet. Start with today.', VitCount: '{n} vitamins',
      SetHead: 'Health settings', Items: 'Vitamin and supplement list', ItemShow: 'Show', ItemNew: 'New vitamin name', ItemAdd: 'Add', ItemDelAsk: 'Delete this item? Its past history disappears from the summary.', ItemNeedName: 'Enter a name first',
      Cycles: 'Period history', CycleStart: 'Start', CycleEnd: 'End', CyclesNone: 'No periods logged yet.', CycleDel: 'Delete',
      Backup: 'Health data copy', BackupNote: 'This data lives on this phone only. Keep a .json copy somewhere safe; the file is not encrypted.', BackupGo: 'Save a copy (.json)', RestoreGo: 'Restore from a copy',
      RestoreAsk: 'Replace the health data on this phone with this file?', RestoreOk: 'Data restored', RestoreBad: 'This file is not a health data copy',
      Wipe: 'Delete all health data', WipeAsk: 'Type HAPUS to delete all check-ins, cycles and the vitamin list from this phone.', WipeDone: 'Health data deleted',
      PinHead: 'Private PIN', PinNew: 'Enter a new PIN', PinAgain: 'Repeat the PIN', PinSub: '6 digits. You will repeat it once to be sure there is no typo.',
      PinEnter: 'Enter PIN', PinWhy_dm: 'Dear Me holds your stories, so it sits behind a PIN.', PinWhy_hl: 'My Health holds personal data, so it sits behind a PIN.', PinWhy_pin: 'Enter the old PIN to open the settings.',
      PinMismatch: 'PINs do not match, start again', PinSaved: 'Private PIN is on', Wrong: 'Wrong PIN, try again', ManyFails: 'Too many wrong tries. Wait 1 minute.', Wait: 'Please wait, the lock is paused',
      WhichLock: 'Lock what?', LockDm: 'Dear Me', LockHl: 'My Health', AutoNote: 'Open once, then it locks again after 5 idle minutes or when the app is left for over 1 minute.',
      Status_on: 'On · locks {x}', Status_off: 'Not set', Both: 'Dear Me and My Health', OnlyDm: 'Dear Me', OnlyHl: 'My Health', None: 'nothing',
      PinChange: 'Change PIN', PinOff: 'Turn PIN off', PinOffAsk: 'Turn off the private PIN? Dear Me and My Health open without a PIN.', PinOffDone: 'Private PIN turned off', LockNow: 'Lock now', Forgot: 'Forgot PIN?',
      ForgotText: 'Enter the 4-digit PIN that opens the app (app PIN). Dear Me and My Health are not erased; only the private PIN resets, then you create a new one.', AppPin: 'App PIN (4 digits)', ResetPin: 'Reset private PIN', ForgotBad: 'Wrong app PIN', ForgotDone: 'Private PIN reset. Create a new one.',
      CardOpen: 'Open', CardStart: 'Start: create a PIN first', PinCardSub: 'Create, change or turn off the lock',
      TodayCond: 'today', VitToday: 'vitamins', CycleCard: 'cycle'
    }
  };
  ['id', 'en'].forEach((lg) => Object.keys(L[lg]).forEach((k) => { window.PS_I18N[lg]['hl' + k] = L[lg][k]; }));

  /* ---------- storage (this phone only) ---------- */
  const HK = 'putrispace.health', PK = 'putrispace.priv';
  const readJ = (k, d) => { try { return Object.assign(d, JSON.parse(localStorage.getItem(k) || '{}')); } catch (e) { return d; } };
  const defItems = () => [['astaxanthin', 'Astaxanthin'], ['d3k2', 'Vitamin D3 + K2'], ['vitc', 'Vitamin C'], ['mag', 'Magnesium'], ['supp', 'Suplemen'], ['other', 'Other']].map(([id, name]) => ({ id, name, on: true, base: true }));
  let PRIV = readJ(PK, { hash: null, dm: true, hl: true });
  let H = readJ(HK, { items: defItems(), days: {}, cycles: [] });
  const fixH = () => {
    if (!Array.isArray(H.items) || !H.items.length) H.items = defItems();
    if (!H.days || typeof H.days !== 'object') H.days = {};
    if (!Array.isArray(H.cycles)) H.cycles = [];
    H.cycles.forEach((c) => { if (!c.id) c.id = uid(); });
  };
  fixH();
  const saveP = () => { try { localStorage.setItem(PK, JSON.stringify(PRIV)); } catch (e) { PS.toast(t('storageFull')); } };
  const saveH = () => { try { localStorage.setItem(HK, JSON.stringify(H)); } catch (e) { PS.toast(t('storageFull')); } };
  PS.privWipeKeys = () => { localStorage.removeItem(HK); localStorage.removeItem(PK); };

  /* ---------- private PIN + auto lock ---------- */
  const ph = async (pin) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('putrispace-private:' + pin));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  };
  const IDLE = 5 * 60 * 1000, AWAY = 60 * 1000;
  let lastAct = 0, hiddenAt = 0, fails = 0, blockedUntil = 0, retTo = '';
  const hasPin = () => !!PRIV.hash;
  const isOpen = () => hasPin() && Date.now() - lastAct < IDLE;
  const GATE = { dwork: 'dm', dwrite: 'dm', ddiary: 'dm', dread: 'dm', dtulis: 'dm', health: 'hl', hcal: 'hl', hsum: 'hl', hlog: 'hl', hset: 'hl', hpin: 'pin' };
  const needsPin = (kind) => {
    if (!hasPin()) return kind === 'hl' ? 'create' : false;
    if (kind === 'dm' && !PRIV.dm) return false;
    if (kind === 'hl' && !PRIV.hl) return false;
    return isOpen() ? false : 'unlock';
  };
  const gatedNow = () => { const g = GATE[PS.route()[0]]; return g ? needsPin(g) : false; };
  const touch = () => { if (isOpen()) lastAct = Date.now(); };
  ['click', 'keydown', 'input', 'touchstart'].forEach((ev) => document.addEventListener(ev, touch, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { hiddenAt = Date.now(); return; }
    if (hasPin() && hiddenAt && Date.now() - hiddenAt > AWAY) { lastAct = 0; if (gatedNow() || /^profile$/.test(PS.route()[0])) PS.render(); }
  });
  setInterval(() => {
    if (!hasPin() || !lastAct) return;
    const ae = document.activeElement;
    if (ae && /^(TEXTAREA|INPUT)$/.test(ae.tagName) && document.getElementById('app') && document.getElementById('app').contains(ae)) return;
    if (Date.now() - lastAct >= IDLE) { lastAct = 0; if (GATE[PS.route()[0]] || PS.route()[0] === 'profile') PS.render(); }
  }, 15000);
  PS.privLock = () => { lastAct = 0; PS.render(); };
  PS.privIsLocked = (k) => !!needsPin(k);

  const dotsHtml = (n) => `<div class="pin-dots" id="pinDots">${[0, 1, 2, 3, 4, 5].map((i) => `<i class="${i < n ? 'f' : ''}"></i>`).join('')}</div>`;
  const keysHtml = (act) => ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', '<'].map((k) => k === 'x' ? '<span></span>' : `<button data-act="${act}" data-k="${k}" ${k === '<' ? `class="x" aria-label="${esc(t('delete'))}"` : ''}>${k === '<' ? '⌫' : k}</button>`).join('');
  const padHtml = (emoji, title, sub, buf, act, extra = '') => `<div class="hl-pad"><span class="hl-lockic">${emoji}</span><h2 class="h2" style="font-size:20px">${esc(title)}</h2><p class="small center" style="margin:0;max-width:290px">${esc(sub)}</p>${dotsHtml(buf.length)}<div class="keypad">${keysHtml(act)}</div>${extra}</div>`;
  const headOf = (kind) => kind === 'dm' ? ['📔', '📔 Dear Me', '#profile'] : kind === 'hl' ? ['🌿', '🌿 ' + T('Title'), '#profile'] : ['🔐', '🔐 ' + T('PinHead'), '#profile'];

  let pv = { buf: '' };
  const unlockView = (kind) => {
    const [em, title, back] = headOf(kind);
    return `<div class="page">${PS.back(back, esc(title.replace(/^\S+\s/, '')))}${padHtml(em, T('PinEnter'), T('PinWhy_' + kind), pv.buf, 'hlKey', `<button class="btn soft sm" data-act="hlForgot">${esc(T('Forgot'))}</button><p class="small center" style="margin:0;max-width:300px">${esc(T('AutoNote'))}</p>`)}</div>`;
  };
  A.hlKey = async (el) => {
    if (Date.now() < blockedUntil) { PS.toast(T('Wait')); return; }
    const k = el.dataset.k;
    if (k === '<') pv.buf = pv.buf.slice(0, -1); else if (pv.buf.length < 6) pv.buf += k;
    if (pv.buf.length === 6) {
      const ok = (await ph(pv.buf)) === PRIV.hash; pv.buf = '';
      if (ok) { fails = 0; lastAct = Date.now(); pmode = ''; PS.render(); return; }
      fails++;
      if (fails >= 5) { blockedUntil = Date.now() + 60000; fails = 0; PS.toast(T('ManyFails'), 4000); } else PS.toast(T('Wrong'));
      PS.render(); const d = document.getElementById('pinDots'); if (d) d.classList.add('shake');
      return;
    }
    PS.render();
  };
  A.hlForgot = () => PS.sheet(`<h2 class="h2">${esc(T('Forgot'))}</h2><p class="muted" style="margin:0">${esc(T('ForgotText'))}</p>
    <div class="field"><label class="lbl" for="hlAppPin">${esc(T('AppPin'))}</label><input id="hlAppPin" class="in" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></div>
    <button class="btn" data-act="hlForgotGo">${esc(T('ResetPin'))}</button>`);
  A.hlForgotGo = async () => {
    const v = (document.getElementById('hlAppPin') || {}).value || '';
    if (S().pinHash && (await PS.hash(v)) !== S().pinHash) { PS.toast(T('ForgotBad')); return; }
    PRIV.hash = null; saveP(); pv.buf = ''; PS.sheet(null); PS.toast(T('ForgotDone'), 3500); PS.render();
  };

  /* ---------- PIN setup / manage (#hpin) ---------- */
  let pmode = '', pfirst = '', pnew = { dm: true, hl: true };
  const lockLabel = () => PRIV.dm && PRIV.hl ? T('Both') : PRIV.dm ? T('OnlyDm') : PRIV.hl ? T('OnlyHl') : T('None');
  const tog = (id, label, on) => `<button class="hl-tog ${on ? 'on' : ''}" data-act="hlLockTog" data-v="${id}"><span class="hl-box">${on ? '✓' : ''}</span><span style="flex:1;text-align:left;font-size:14px;font-weight:700">${label}</span></button>`;
  const lockToggles = (src) => `<section class="card"><b style="font-size:14px">${esc(T('WhichLock'))}</b>${tog('dm', '📔 ' + esc(T('LockDm')), src.dm)}${tog('hl', '🌿 ' + esc(T('LockHl')), src.hl)}<span class="small">${esc(T('AutoNote'))}</span></section>`;
  V.hpin = function () {
    if (!hasPin() && (!pmode || pmode === 'menu')) pmode = 'c1';
    if (hasPin() && !pmode) pmode = 'menu';
    if (pmode === 'c1' || pmode === 'c2') {
      return `<div class="page">${PS.back(retTo || '#profile', esc(T('PinHead')))}${padHtml('🔐', pmode === 'c1' ? T('PinNew') : T('PinAgain'), T('PinSub'), pv.buf, 'hlCKey')}${lockToggles(hasPin() ? PRIV : pnew)}</div>`;
    }
    return `<div class="page">${PS.back('#profile', esc(T('PinHead')))}
      <section class="card"><div class="row"><span class="hl-lockic" style="width:48px;height:48px;font-size:24px">🔐</span><div class="stack grow" style="gap:1px"><b style="font-size:16px">${esc(T('PinHead'))}</b><span class="small">${esc(T('Status_on', { x: lockLabel() }))}</span></div></div></section>
      ${lockToggles(PRIV)}
      <button class="btn" data-act="hlChange">${esc(T('PinChange'))}</button>
      <button class="btn soft" data-act="hlLockNow">🔒 ${esc(T('LockNow'))}</button>
      <button class="btn rose" data-act="hlOff">${esc(T('PinOff'))}</button></div>`;
  };
  A.hlCKey = async (el) => {
    const k = el.dataset.k;
    if (k === '<') pv.buf = pv.buf.slice(0, -1); else if (pv.buf.length < 6) pv.buf += k;
    if (pv.buf.length === 6) {
      if (pmode === 'c1') { pfirst = pv.buf; pv.buf = ''; pmode = 'c2'; PS.render(); return; }
      if (pv.buf === pfirst) {
        const first = !hasPin();
        PRIV.hash = await ph(pv.buf);
        if (first) { PRIV.dm = pnew.dm; PRIV.hl = pnew.hl; }
        saveP(); lastAct = Date.now(); pv.buf = ''; pfirst = ''; pmode = 'menu'; PS.toast(T('PinSaved'));
        if (retTo) { const r = retTo; retTo = ''; if (location.hash === r) PS.render(); else location.hash = r.replace(/^#/, ''); } else PS.render();
        return;
      }
      pv.buf = ''; pfirst = ''; pmode = 'c1'; PS.toast(T('PinMismatch')); PS.render(); const d = document.getElementById('pinDots'); if (d) d.classList.add('shake');
      return;
    }
    PS.render();
  };
  A.hlLockTog = (el) => {
    const src = hasPin() ? PRIV : pnew, id = el.dataset.v;
    src[id] = !src[id]; if (hasPin()) saveP();
    el.classList.toggle('on', !!src[id]); el.querySelector('.hl-box').textContent = src[id] ? '✓' : '';
  };
  A.hlChange = () => { pv.buf = ''; pfirst = ''; pmode = 'c1'; PS.render(); };
  A.hlLockNow = () => PS.privLock();
  A.hlOff = () => PS.sheet(`<h2 class="h2">${esc(T('PinOff'))}</h2><p class="muted" style="margin:0">${esc(T('PinOffAsk'))}</p>
    <button class="btn rose" data-act="hlOffGo">${esc(T('PinOff'))}</button><button class="btn ghost sm" data-act="closeSheet">${esc(T('Cancel'))}</button>`);
  A.hlOffGo = () => { PRIV.hash = null; saveP(); pmode = ''; PS.sheet(null); PS.toast(T('PinOffDone')); PS.render(); };

  /* ---------- cycle helpers ---------- */
  const between = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 864e5);
  const sortedCycles = () => H.cycles.slice().sort((a, b) => a.start.localeCompare(b.start));
  const endOf = (c, last) => c.end || (last && between(c.start, dayKey()) <= 9 ? dayKey() : addDays(c.start, 5));
  const cycleAt = (k) => { const cs = sortedCycles(); return cs.find((c, i) => k >= c.start && k <= endOf(c, i === cs.length - 1)); };
  const cycleStats = () => {
    const cs = sortedCycles(), starts = cs.map((c) => c.start), diffs = [];
    for (let i = 1; i < starts.length; i++) { const d = between(starts[i - 1], starts[i]); if (d >= 15 && d <= 60) diffs.push({ d, at: starts[i - 1] }); }
    const recent = diffs.slice(-6), avg = recent.length ? Math.round(recent.reduce((s, x) => s + x.d, 0) / recent.length) : null;
    const last = starts[starts.length - 1] || null;
    return { cs, diffs: recent, avg, last, next: last ? addDays(last, avg || 28) : null, day: last && between(last, dayKey()) <= 60 ? between(last, dayKey()) + 1 : null };
  };
  const locale = () => (S().lang === 'en' ? 'en-GB' : 'id-ID');
  const dShort = (k) => new Date(k + 'T00:00:00').toLocaleDateString(locale(), { day: 'numeric', month: 'short' });
  const dLong = (k) => new Date(k + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const activeItems = () => H.items.filter((i) => i.on);
  const COND = [
    { id: 'ok', em: '😊', k: 'Ok', bg: '#DDF3E6', fg: '#2F7A55' },
    { id: 'meh', em: '😐', k: 'Meh', bg: '#EEEAFB', fg: '#4A3FB0' },
    { id: 'sick', em: '🤒', k: 'Sick', bg: '#FFF3CC', fg: '#6B4E00' }
  ];
  const condOf = (id) => COND.find((c) => c.id === id);
  const SYMS = ['pilek', 'pusing', 'demam', 'batuk', 'perut', 'lelah', 'nyeri', 'mual'];
  const FLOWS = [['lt', 'F_lt'], ['md', 'F_md'], ['hv', 'F_hv']];
  const nl = (s) => esc(s).replace(/\n/g, '<br>');

  /* ---------- shared bits ---------- */
  const tabs = (cur) => `<nav class="hl-tabs" aria-label="${esc(T('Title'))}">${[['health', 'TabCheck', '📝'], ['hcal', 'TabCal', '🗓️'], ['hsum', 'TabSum', '📊'], ['hlog', 'TabLog', '📖'], ['hset', 'TabSet', '⚙️']].map(([r, k, e]) => `<a href="#${r}" class="${r === cur ? 'on' : ''}"${r === cur ? ' aria-current="page"' : ''}><span>${e}</span>${esc(T(k))}</a>`).join('')}</nav>`;
  const lockBtn = () => hasPin() && PRIV.hl ? `<button class="pill" style="background:#EEEAFB;color:#4A3FB0;border:none;cursor:pointer;min-height:32px" data-act="hlLockNow">🔒 ${esc(T('Lock'))}</button>` : '';
  const top = (cur) => `${PS.back('#profile', '🌿 ' + esc(T('Title')), lockBtn())}${tabs(cur)}`;

  /* ======================= Check-in (also for any past date) ======================= */
  let hd = null;
  V.health = function (a) {
    let date = a[0] && /^\d{4}-\d{2}-\d{2}$/.test(a[0]) ? a[0] : dayKey();
    if (date > dayKey()) date = dayKey();
    const old = H.days[date];
    hd = { date, cond: (old && old.cond) || '', sym: ((old && old.sym) || []).slice(), vit: ((old && old.vit) || []).slice(), note: (old && old.note) || '', flow: (old && old.flow) || '', existed: !!old };
    const items = activeItems(), st = cycleStats(), cyc = cycleAt(date);
    const isToday = date === dayKey();
    const stText = cyc ? T('CycleOn') : (st.cs.length && date === dayKey() && st.day ? T('CycleDay', { n: st.day }) : T('CycleNone'));
    const chip = (c) => `<button class="hl-opt ${hd.cond === c.id ? 'on' : ''}" style="--bg:${c.bg};--fg:${c.fg}" data-act="hlCond" data-v="${c.id}"><span style="font-size:26px;line-height:1">${c.em}</span><span>${esc(T(c.k))}</span></button>`;
    return `<div class="page">${top('health')}
      <section class="card"><div class="between"><div class="stack" style="gap:1px"><b style="font-size:15px">${esc(dLong(date))}</b>${isToday ? '' : `<span class="small">${esc(T('FillFor', { d: dShort(date) }))}</span>`}</div>${isToday ? '' : `<a class="pill" style="background:#EEEAFB;color:#4A3FB0" href="#health">${esc(T('ToToday'))}</a>`}</div>
        <div class="field"><label class="lbl" for="hlDate">${esc(T('PickDate'))}</label><input id="hlDate" class="in" type="date" max="${dayKey()}" value="${date}" data-change="hlDate"></div></section>
      <section class="card"><b style="font-size:15px">${esc(T('Cond'))}</b><div class="hl-opts">${COND.map(chip).join('')}</div>
        <span class="small" style="font-weight:700">${esc(T('Sym'))}</span>
        <div class="dm-chips">${SYMS.map((s) => `<button class="dm-chip ${hd.sym.includes(s) ? 'on' : ''}" data-act="hlSym" data-v="${s}">${esc(T('s_' + s))}</button>`).join('')}</div></section>
      <section class="card"><div class="between"><b style="font-size:15px">💊 ${esc(T('Vit'))}</b><span class="pill" id="hlVitCount" style="background:#DDF3E6;color:#2F7A55">${hd.vit.filter((id) => items.some((i) => i.id === id)).length} / ${items.length}</span></div>
        ${items.length ? items.map((i) => `<button class="hl-tog ${hd.vit.includes(i.id) ? 'on' : ''}" data-act="hlVit" data-v="${esc(i.id)}"><span class="hl-box">${hd.vit.includes(i.id) ? '✓' : ''}</span><span style="flex:1;text-align:left;font-size:14px;font-weight:700">${esc(i.name)}</span></button>`).join('') : `<span class="small">${esc(T('VitNone'))}</span>`}
        <a href="#hset" style="font-size:12px;font-weight:800;color:#5B4FC4;min-height:36px;display:flex;align-items:center">✏️ ${esc(T('VitEdit'))}</a></section>
      <section class="card"><div class="between"><b style="font-size:15px">🌸 ${esc(T('Cycle'))}</b><span class="small" style="font-weight:700" id="hlCycTxt">${esc(stText)}</span></div>
        <div class="grid2"><button class="btn sm" style="background:#FDE3EC;color:#8A2B55" data-act="hlStartP">${esc(T('StartP'))}</button><button class="btn soft sm" data-act="hlEndP">${esc(T('EndP'))}</button></div>
        ${cyc ? `<span class="small" style="font-weight:700">${esc(T('Flow'))}</span><div class="dm-chips">${FLOWS.map(([id, k]) => `<button class="dm-chip ${hd.flow === id ? 'on' : ''}" data-act="hlFlow" data-v="${id}">${esc(T(k))}</button>`).join('')}</div>` : ''}</section>
      <section class="card"><b style="font-size:15px">📝 ${esc(T('Note'))}</b><textarea class="in" rows="4" placeholder="${esc(T('NotePh'))}" data-in="hlNote">${esc(hd.note)}</textarea>
        <a href="#hlog" style="font-size:12px;font-weight:800;color:#5B4FC4;min-height:36px;display:flex;align-items:center">📖 ${esc(T('SeeLog'))}</a></section>
      <button class="btn" data-act="hlSave">${esc(T('Save'))}</button>
      ${hd.existed ? `<button class="btn rose" data-act="hlDel">${esc(T('Del'))}</button>` : ''}
      <span class="small center">${esc(T('OnlyPhone'))}</span></div>`;
  };
  A.hlDate = (el) => { const v = el.value; if (/^\d{4}-\d{2}-\d{2}$/.test(v) && v <= dayKey()) { const h = 'health/' + v; if (location.hash === '#' + h) PS.render(); else location.hash = h; } };
  A.hlCond = (el) => { hd.cond = hd.cond === el.dataset.v ? '' : el.dataset.v; el.parentElement.querySelectorAll('.hl-opt').forEach((b) => b.classList.toggle('on', b.dataset.v === hd.cond)); };
  A.hlSym = (el) => { const s = el.dataset.v, i = hd.sym.indexOf(s); if (i < 0) hd.sym.push(s); else hd.sym.splice(i, 1); el.classList.toggle('on', i < 0); };
  A.hlVit = (el) => {
    const s = el.dataset.v, i = hd.vit.indexOf(s); if (i < 0) hd.vit.push(s); else hd.vit.splice(i, 1);
    el.classList.toggle('on', i < 0); el.querySelector('.hl-box').textContent = i < 0 ? '✓' : '';
    const items = activeItems(), c = document.getElementById('hlVitCount'); if (c) c.textContent = hd.vit.filter((id) => items.some((x) => x.id === id)).length + ' / ' + items.length;
  };
  A.hlFlow = (el) => { hd.flow = hd.flow === el.dataset.v ? '' : el.dataset.v; el.parentElement.querySelectorAll('.dm-chip').forEach((b) => b.classList.toggle('on', b.dataset.v === hd.flow)); };
  IN.hlNote = (el) => { if (hd) hd.note = el.value; };
  A.hlStartP = () => {
    const d = hd.date;
    if (H.cycles.some((c) => c.start === d) || cycleAt(d)) { PS.toast(T('AlreadyIn')); return; }
    H.cycles.push({ id: uid(), start: d, end: null }); saveH(); PS.toast(T('StartSaved')); saveDraftKeep();
  };
  A.hlEndP = () => {
    const d = hd.date, open = sortedCycles().filter((c) => c.start <= d && !c.end).pop();
    if (!open) { PS.toast(T('NoOpen')); return; }
    open.end = d; saveH(); PS.toast(T('EndSaved')); saveDraftKeep();
  };
  // after a cycle change, re-render but keep what was typed
  const saveDraftKeep = () => { const keep = hd; PS.render(); if (keep && hd) { hd.cond = keep.cond; hd.sym = keep.sym; hd.vit = keep.vit; hd.note = keep.note; hd.flow = keep.flow; restoreDraftDom(); } };
  const restoreDraftDom = () => {
    document.querySelectorAll('.hl-opt').forEach((b) => b.classList.toggle('on', b.dataset.v === hd.cond));
    document.querySelectorAll('[data-act=hlSym]').forEach((b) => b.classList.toggle('on', hd.sym.includes(b.dataset.v)));
    document.querySelectorAll('[data-act=hlVit]').forEach((b) => { const on = hd.vit.includes(b.dataset.v); b.classList.toggle('on', on); b.querySelector('.hl-box').textContent = on ? '✓' : ''; });
    document.querySelectorAll('[data-act=hlFlow]').forEach((b) => b.classList.toggle('on', b.dataset.v === hd.flow));
    const n = document.querySelector('[data-in=hlNote]'); if (n) n.value = hd.note;
    const items = activeItems(), c = document.getElementById('hlVitCount'); if (c) c.textContent = hd.vit.filter((id) => items.some((x) => x.id === id)).length + ' / ' + items.length;
  };
  A.hlSave = () => {
    const empty = !hd.cond && !hd.sym.length && !hd.vit.length && !hd.note.trim() && !hd.flow;
    if (empty) { PS.toast(T('Empty')); return; }
    const old = H.days[hd.date], now = Date.now();
    H.days[hd.date] = { cond: hd.cond, sym: hd.sym.slice(), vit: hd.vit.slice(), note: hd.note.trim(), flow: hd.flow, created: (old && old.created) || now, updated: now };
    saveH(); PS.toast(T('Saved')); PS.render();
  };
  A.hlDel = () => PS.sheet(`<h2 class="h2">${esc(T('Del'))}</h2><p class="muted" style="margin:0">${esc(T('DelAsk', { d: dShort(hd.date) }))}</p>
    <button class="btn rose" data-act="hlDelGo">${esc(T('Del'))}</button><button class="btn ghost sm" data-act="closeSheet">${esc(T('Cancel'))}</button>`);
  A.hlDelGo = () => { delete H.days[hd.date]; saveH(); PS.sheet(null); PS.toast(T('Deleted')); PS.render(); };

  /* ======================= Calendar ======================= */
  V.hcal = function (a) {
    const ym = a[0] && /^\d{4}-\d{2}$/.test(a[0]) ? a[0] : dayKey().slice(0, 7);
    const y = +ym.slice(0, 4), m = +ym.slice(5, 7), first = new Date(y, m - 1, 1), dim = new Date(y, m, 0).getDate(), lead = (first.getDay() + 6) % 7;
    const prev = new Date(y, m - 2, 1), next = new Date(y, m, 1), ymOf = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    const wd = S().lang === 'en' ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] : ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<span></span>';
    for (let d = 1; d <= dim; d++) {
      const k = ym + '-' + String(d).padStart(2, '0'), day = H.days[k], cyc = cycleAt(k), c = day && condOf(day.cond), fut = k > dayKey();
      const bg = cyc ? '#FDE3EC' : c ? c.bg : '#F3F0FA';
      const dot = day && day.vit && day.vit.length ? '<i class="hl-dot"></i>' : '<i class="hl-dot off"></i>';
      const em = day && day.cond === 'sick' ? '<small>🤒</small>' : '';
      const inner = `<b>${d}</b>${em || dot}`;
      cells += fut ? `<span class="hl-cell fut" style="background:#F3F0FA">${inner}</span>` : `<a class="hl-cell ${k === dayKey() ? 'today' : ''}" style="background:${bg}" href="#health/${k}" aria-label="${esc(dShort(k))}">${inner}</a>`;
    }
    const st = cycleStats();
    const predTxt = st.next ? T(st.avg ? 'NextPNote' : 'NextPDef', { d: dShort(st.next), n: st.avg }) : T('NextPNone');
    const leg = (bg, txt) => `<span class="row" style="gap:6px;font-size:12px;font-weight:700"><i style="width:14px;height:14px;border-radius:5px;background:${bg};display:inline-block"></i>${esc(txt)}</span>`;
    return `<div class="page">${top('hcal')}
      <div class="between"><a class="iconbtn" href="#hcal/${ymOf(prev)}" aria-label="‹">‹</a><b style="font-size:18px">${esc(first.toLocaleDateString(locale(), { month: 'long', year: 'numeric' }))}</b><a class="iconbtn" href="#hcal/${ymOf(next)}" aria-label="›">›</a></div>
      <section class="card"><div class="hl-cal">${wd.map((x) => `<span class="hl-wd">${x}</span>`).join('')}${cells}</div></section>
      <div class="row wrap" style="gap:12px">${leg('#DDF3E6', T('Legend_ok'))}${leg('#EEEAFB', T('Legend_meh'))}${leg('#FFF3CC', T('Legend_sick'))}${leg('#FDE3EC', T('Legend_p'))}<span class="row" style="gap:6px;font-size:12px;font-weight:700"><i class="hl-dot"></i>${esc(T('Legend_v'))}</span></div>
      <section class="card" style="background:#FDE3EC;border:none"><div class="row"><span style="font-size:26px">🌸</span><div class="stack grow" style="gap:1px"><b style="font-size:14px">${esc(T('NextP'))}</b><span style="font-size:12.5px;font-weight:700;color:#7A3350">${esc(predTxt)}</span></div></div></section>
      <span class="small center">${esc(T('TapDay'))}</span></div>`;
  };

  /* ======================= Summary ======================= */
  const periodStart = (p) => { const n = new Date(); return dayKey(p === 'y' ? new Date(n.getFullYear(), 0, 1) : p === '3' ? new Date(n.getFullYear(), n.getMonth() - 2, 1) : new Date(n.getFullYear(), n.getMonth(), 1)); };
  const statsFor = (from, to) => {
    const r = { logged: 0, ok: 0, meh: 0, sick: 0, vit: {}, elapsed: Math.max(1, between(from, to) + 1) };
    for (let k = from; k <= to; k = addDays(k, 1)) {
      const d = H.days[k]; if (!d) continue;
      r.logged++; if (d.cond && r[d.cond] != null) r[d.cond]++;
      (d.vit || []).forEach((id) => { r.vit[id] = (r.vit[id] || 0) + 1; });
    }
    return r;
  };
  const COLS = ['#E5906A', '#7C6FD8', '#F0B84A', '#5FB38A', '#D879A5', '#6BA6D6', '#A58AD9', '#8DB36B'];
  V.hsum = function (a) {
    const p = ['m', '3', 'y'].includes(a[0]) ? a[0] : 'm', from = periodStart(p), to = dayKey(), r = statsFor(from, to), st = cycleStats();
    const stat = (e, v, l, bg) => `<div class="stat" style="background:${bg};border:none;gap:3px"><span style="font-size:26px;line-height:1">${e}</span><b>${v}</b><span>${esc(l)}</span></div>`;
    const bars = activeItems().map((i, ix) => { const pct = Math.min(100, Math.round(((r.vit[i.id] || 0) / r.elapsed) * 100)); return `<div class="row" style="gap:10px"><span style="width:104px;font-size:13px;font-weight:700;line-height:1.2">${esc(i.name)}</span><div style="flex:1;height:10px;border-radius:99px;background:#F3F0FA"><div style="width:${pct}%;height:10px;border-radius:99px;background:${COLS[ix % COLS.length]}"></div></div><span style="width:40px;text-align:right;font-size:13px;font-weight:800">${pct}%</span></div>`; }).join('');
    const mx = Math.max(...st.diffs.map((x) => x.d), 1);
    const cbars = st.diffs.length ? `<div style="display:flex;align-items:flex-end;gap:10px;height:120px;padding-top:6px">${st.diffs.map((x) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;justify-content:flex-end"><b style="font-size:11px">${x.d}</b><div style="width:100%;height:${Math.round((x.d / mx) * 80)}px;background:#F4B8CE;border-radius:8px 8px 4px 4px"></div><span style="font-size:11px;font-weight:700">${esc(dShort(x.at))}</span></div>`).join('')}</div><span class="small">${esc(T('CycleHistNote'))}</span>` : `<span class="small">${esc(T('CycleHistNone'))}</span>`;
    const pill = (id, k) => `<a class="hl-per ${p === id ? 'on' : ''}" href="#hsum/${id}">${esc(T(k))}</a>`;
    return `<div class="page">${top('hsum')}
      <div class="row" style="gap:8px">${pill('m', 'PerM')}${pill('3', 'Per3')}${pill('y', 'PerY')}</div>
      <div class="grid3">${stat('📒', r.logged, T('Logged'), '#EEEAFB')}${stat('😊', r.ok, T('DOk'), '#DDF3E6')}${stat('🤒', r.sick, T('DSick'), '#FFF3CC')}</div>
      <section class="card" style="background:#FDE3EC;border:none"><div class="row"><span style="font-size:26px">🌸</span><div class="stack grow" style="gap:1px"><b style="font-size:20px">${st.avg ? st.avg : '–'}</b><span class="small" style="color:#7A3350;font-weight:700">${esc(st.avg ? T('AvgCycle') : T('AvgNone'))}</span></div></div></section>
      <section class="card"><b style="font-size:15px">💊 ${esc(T('VitCons'))}</b>${bars || `<span class="small">${esc(T('VitNone'))}</span>`}<span class="small">${esc(T('VitConsNote'))}</span></section>
      <section class="card"><b style="font-size:15px">🌸 ${esc(T('CycleHist'))}</b>${cbars}</section>
      <section class="card"><b style="font-size:15px">📄 ${esc(T('PdfHead'))}</b><span class="small">${esc(T('PdfNote'))}</span>
        <input id="hlPdfM" class="in" type="month" max="${dayKey().slice(0, 7)}" value="${dayKey().slice(0, 7)}"><button class="btn" data-act="hlPdf">${esc(T('PdfGo'))}</button></section></div>`;
  };

  /* ======================= History ======================= */
  V.hlog = function () {
    const keys = Object.keys(H.days).sort().reverse();
    let cur = '', out = '';
    keys.forEach((k) => {
      const d = H.days[k], mk = k.slice(0, 7);
      if (mk !== cur) { cur = mk; out += `<b style="font-size:14px;margin-top:6px">${esc(new Date(k + 'T00:00:00').toLocaleDateString(locale(), { month: 'long', year: 'numeric' }))}</b>`; }
      const c = condOf(d.cond), syms = (d.sym || []).map((s) => T('s_' + s)).join(', ');
      const vn = (d.vit || []).filter((id) => H.items.some((i) => i.id === id)).length;
      out += `<a class="card hl-log" href="#health/${k}"><div class="between"><b style="font-size:14px">${esc(dShort(k))}</b><span class="row" style="gap:6px">${cycleAt(k) ? '<span class="pill" style="background:#FDE3EC;color:#8A2B55">🌸</span>' : ''}${vn ? `<span class="pill" style="background:#EEEAFB;color:#4A3FB0">💊 ${vn}</span>` : ''}<span style="font-size:22px">${c ? c.em : '·'}</span></span></div>${syms ? `<span class="small">${esc(syms)}</span>` : ''}${d.note ? `<span style="font-size:13.5px;line-height:1.5">${nl(d.note.length > 140 ? d.note.slice(0, 140) + '…' : d.note)}</span>` : ''}</a>`;
    });
    return `<div class="page">${top('hlog')}${out || `<section class="card"><span class="small">${esc(T('LogEmpty'))}</span></section>`}</div>`;
  };

  /* ======================= Settings ======================= */
  V.hset = function () {
    const items = H.items.map((i) => `<div class="row hl-item" style="gap:8px"><input class="in grow" value="${esc(i.name)}" aria-label="${esc(T('Items'))}" data-in="hlItemName" data-id="${esc(i.id)}"><button class="hl-tog ${i.on ? 'on' : ''}" style="flex:none;width:auto;padding:0 10px" data-act="hlItemTog" data-id="${esc(i.id)}" aria-label="${esc(T('ItemShow'))}"><span class="hl-box">${i.on ? '✓' : ''}</span><span style="font-size:12px;font-weight:700">${esc(T('ItemShow'))}</span></button>${i.base ? '' : `<button class="iconbtn" data-act="hlItemDel" data-id="${esc(i.id)}" aria-label="${esc(T('CycleDel'))}">🗑️</button>`}</div>`).join('');
    const cs = sortedCycles().reverse().map((c) => `<div class="hl-item stack" style="gap:6px"><div class="row" style="gap:8px"><label class="small" style="width:56px">${esc(T('CycleStart'))}</label><input class="in grow" type="date" value="${c.start}" max="${dayKey()}" data-change="hlCycS" data-id="${esc(c.id)}"><button class="iconbtn" data-act="hlCycDel" data-id="${esc(c.id)}" aria-label="${esc(T('CycleDel'))}">🗑️</button></div><div class="row" style="gap:8px"><label class="small" style="width:56px">${esc(T('CycleEnd'))}</label><input class="in grow" type="date" value="${c.end || ''}" max="${dayKey()}" data-change="hlCycE" data-id="${esc(c.id)}"></div></div>`).join('');
    return `<div class="page">${top('hset')}
      <section class="card"><b style="font-size:15px">💊 ${esc(T('Items'))}</b>${items}<div class="row" style="gap:8px"><input id="hlNewItem" class="in grow" placeholder="${esc(T('ItemNew'))}" autocomplete="off"><button class="btn sm" style="flex:none" data-act="hlItemAdd">${esc(T('ItemAdd'))}</button></div></section>
      <section class="card"><b style="font-size:15px">🌸 ${esc(T('Cycles'))}</b>${cs || `<span class="small">${esc(T('CyclesNone'))}</span>`}</section>
      <a class="tile h" href="#hpin"><span style="font-size:24px">🔐</span><span class="stack grow" style="gap:0"><span class="t">${esc(T('PinHead'))}</span><span class="s">${esc(hasPin() ? T('Status_on', { x: lockLabel() }) : T('Status_off'))}</span></span><span style="font-weight:800;color:#5B4FC4">›</span></a>
      <section class="card"><b style="font-size:15px">💾 ${esc(T('Backup'))}</b><span class="small">${esc(T('BackupNote'))}</span>
        <button class="btn soft" data-act="hlBackup">${esc(T('BackupGo'))}</button><button class="btn soft" data-act="hlRestore">${esc(T('RestoreGo'))}</button><input type="file" id="hlRestoreFile" accept=".json,application/json" hidden data-change="hlRestoreChosen"></section>
      <button class="btn rose" data-act="hlWipe">${esc(T('Wipe'))}</button>
      <span class="small center">${esc(T('OnlyPhone'))}</span></div>`;
  };
  IN.hlItemName = (el) => { const i = H.items.find((x) => x.id === el.dataset.id); if (i) { i.name = el.value; saveH(); } };
  A.hlItemTog = (el) => { const i = H.items.find((x) => x.id === el.dataset.id); if (!i) return; i.on = !i.on; saveH(); el.classList.toggle('on', i.on); el.querySelector('.hl-box').textContent = i.on ? '✓' : ''; };
  A.hlItemAdd = () => {
    const el = document.getElementById('hlNewItem'), name = el ? el.value.trim() : ''; if (!name) { PS.toast(T('ItemNeedName')); return; }
    H.items.push({ id: 'c' + uid(), name, on: true, base: false }); saveH(); PS.render();
  };
  A.hlItemDel = (el) => PS.sheet(`<h2 class="h2">${esc(T('CycleDel'))}</h2><p class="muted" style="margin:0">${esc(T('ItemDelAsk'))}</p>
    <button class="btn rose" data-act="hlItemDelGo" data-id="${esc(el.dataset.id)}">${esc(T('CycleDel'))}</button><button class="btn ghost sm" data-act="closeSheet">${esc(T('Cancel'))}</button>`);
  A.hlItemDelGo = (el) => {
    const id = el.dataset.id; H.items = H.items.filter((i) => i.id !== id);
    Object.keys(H.days).forEach((k) => { const d = H.days[k]; if (d.vit) d.vit = d.vit.filter((x) => x !== id); });
    saveH(); PS.sheet(null); PS.render();
  };
  const cycById = (id) => H.cycles.find((c) => c.id === id);
  A.hlCycS = (el) => { const c = cycById(el.dataset.id); if (c && el.value) { c.start = el.value; if (c.end && c.end < c.start) c.end = null; saveH(); PS.render(); } };
  A.hlCycE = (el) => { const c = cycById(el.dataset.id); if (c) { c.end = el.value && el.value >= c.start ? el.value : null; saveH(); PS.render(); } };
  A.hlCycDel = (el) => { H.cycles = H.cycles.filter((c) => c.id !== el.dataset.id); saveH(); PS.render(); };
  A.hlBackup = () => PS.download('kesehatanku-backup-' + dayKey() + '.json', JSON.stringify(H, null, 1));
  A.hlRestore = () => document.getElementById('hlRestoreFile').click();
  let pending = null;
  A.hlRestoreChosen = (el) => {
    const f = el.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { const o = JSON.parse(r.result); if (!o || typeof o.days !== 'object' || !Array.isArray(o.items)) throw new Error('bad'); pending = o; }
      catch (e) { PS.toast(T('RestoreBad'), 3500); el.value = ''; return; }
      PS.sheet(`<h2 class="h2">${esc(T('RestoreGo'))}</h2><p class="muted" style="margin:0">${esc(T('RestoreAsk'))}</p><button class="btn" data-act="hlRestoreGo">${esc(T('RestoreGo'))}</button><button class="btn ghost sm" data-act="closeSheet">${esc(T('Cancel'))}</button>`);
    };
    r.readAsText(f);
  };
  A.hlRestoreGo = () => { if (!pending) return; H = Object.assign({ items: defItems(), days: {}, cycles: [] }, pending); fixH(); saveH(); pending = null; PS.sheet(null); PS.toast(T('RestoreOk')); PS.render(); };
  A.hlWipe = () => PS.sheet(`<h2 class="h2">${esc(T('Wipe'))}</h2><p class="muted" style="margin:0">${esc(T('WipeAsk'))}</p>
    <input id="hlWipeWord" class="in" autocomplete="off" autocapitalize="characters" placeholder="HAPUS" data-in="hlWipeIn" data-nofocus="1">
    <button class="btn rose" id="hlWipeGo" data-act="hlWipeGo" disabled style="opacity:.5">${esc(T('Wipe'))}</button><button class="btn ghost sm" data-act="closeSheet">${esc(T('Cancel'))}</button>`);
  IN.hlWipeIn = (el) => { const g = document.getElementById('hlWipeGo'), ok = el.value.trim() === 'HAPUS'; if (g) { g.disabled = !ok; g.style.opacity = ok ? '1' : '.5'; } };
  A.hlWipeGo = () => { const w = document.getElementById('hlWipeWord'); if (!w || w.value.trim() !== 'HAPUS') return; H = { items: defItems(), days: {}, cycles: [] }; saveH(); PS.sheet(null); PS.toast(T('WipeDone')); PS.render(); };

  /* ======================= PDF (hand-built, no library) ======================= */
  const clean = (s) => String(s == null ? '' : s).replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '');
  function PdfDoc() {
    const pages = []; let cur = null;
    const add = () => { cur = []; pages.push(cur); };
    add();
    const f = (n) => String(Math.round(n * 100) / 100);
    const col = (hex) => [1, 3, 5].map((i) => f(parseInt(hex.substr(i, 2), 16) / 255)).join(' ');
    const pe = (s) => clean(s).replace(/[\\()]/g, '\\$&').replace(/[\u00A0-\u00FF]/g, (c) => '\\' + c.charCodeAt(0).toString(8));
    return {
      newPage: add,
      text(x, y, s, size = 10, bold = false, color = '#2B2740') { cur.push(`BT /F${bold ? 2 : 1} ${size} Tf ${col(color)} rg ${f(x)} ${f(842 - y)} Td (${pe(s)}) Tj ET`); },
      rect(x, y, w, h, fill) { cur.push(`${col(fill)} rg ${f(x)} ${f(842 - y - h)} ${f(w)} ${f(h)} re f`); },
      line(x1, y1, x2, y2, color = '#DDD8EE') { cur.push(`${col(color)} RG 0.6 w ${f(x1)} ${f(842 - y1)} m ${f(x2)} ${f(842 - y2)} l S`); },
      build(footer) {
        pages.forEach((p, i) => p.push(`BT /F1 8 Tf 0.45 0.43 0.55 rg 40 24 Td (${pe(footer + '  -  ' + (i + 1) + '/' + pages.length)}) Tj ET`));
        const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'];
        const kids = [];
        pages.forEach((p, i) => {
          const pageNo = 5 + i * 2, contentNo = pageNo + 1, body = p.join('\n');
          kids.push(pageNo + ' 0 R');
          objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentNo} 0 R >>`);
          objs.push(`<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
        });
        objs[1] = `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pages.length} >>`;
        let out = '%PDF-1.4\n'; const offs = [];
        objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
        const xr = out.length;
        out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('');
        out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`;
        return out;
      }
    };
  }
  const wrap = (s, n) => { const out = []; let line = ''; clean(s).split(' ').forEach((w) => { if ((line + ' ' + w).trim().length > n) { if (line) out.push(line); line = w; } else line = (line + ' ' + w).trim(); }); if (line) out.push(line); return out; };
  A.hlPdf = () => {
    const m = (document.getElementById('hlPdfM') || {}).value || dayKey().slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(m)) return;
    const y = +m.slice(0, 4), mo = +m.slice(5, 7), dim = new Date(y, mo, 0).getDate(), from = m + '-01', endM = m + '-' + String(dim).padStart(2, '0'), to = endM > dayKey() ? dayKey() : endM;
    if (to < from) { PS.toast(T('Empty')); return; }
    const r = statsFor(from, to), st = cycleStats(), doc = PdfDoc(), items = H.items.filter((i) => i.on || r.vit[i.id]);
    const monthLabel = new Date(y, mo - 1, 1).toLocaleDateString(locale(), { month: 'long', year: 'numeric' });
    let yy = 56;
    const need = (h) => { if (yy + h > 800) { doc.newPage(); yy = 50; } };
    doc.text(40, yy, T('PdfTitle'), 22, true, '#4A3FB0'); yy += 24;
    doc.text(40, yy, monthLabel, 13, true); yy += 15;
    doc.text(40, yy, (S().name || 'Putri') + '  -  ' + T('PdfFoot'), 8, false, '#6B6682'); yy += 22;
    const boxes = [[r.logged, T('Logged'), '#EEEAFB'], [r.ok, T('DOk'), '#DDF3E6'], [r.meh, T('Meh'), '#EEEAFB'], [r.sick, T('DSick'), '#FFF3CC'], [st.avg || '-', T('AvgCycle'), '#FDE3EC']];
    boxes.forEach((b, i) => { const x = 40 + i * 104; doc.rect(x, yy, 96, 52, b[2]); doc.text(x + 10, yy + 24, String(b[0]), 18, true); doc.text(x + 10, yy + 42, b[1], 8, false, '#4B4663'); });
    yy += 72;
    doc.text(40, yy, T('VitCons'), 12, true); yy += 18;
    items.forEach((i, ix) => {
      need(20); const pct = Math.min(100, Math.round(((r.vit[i.id] || 0) / r.elapsed) * 100));
      doc.text(40, yy + 8, i.name, 10); doc.rect(170, yy, 260, 8, '#F3F0FA'); if (pct) doc.rect(170, yy, 260 * pct / 100, 8, COLS[ix % COLS.length]); doc.text(442, yy + 8, pct + '%  (' + (r.vit[i.id] || 0) + '/' + r.elapsed + ')', 9, true); yy += 20;
    });
    yy += 10; need(190);
    doc.text(40, yy, T('CalHead'), 12, true); yy += 16;
    const wd = S().lang === 'en' ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] : ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    wd.forEach((x, i) => doc.text(40 + i * 40 + 6, yy + 8, x, 8, true, '#6B6682')); yy += 14;
    const lead = (new Date(y, mo - 1, 1).getDay() + 6) % 7;
    for (let d = 1; d <= dim; d++) {
      const idx = lead + d - 1, cx = 40 + (idx % 7) * 40, cy = yy + Math.floor(idx / 7) * 30, k = m + '-' + String(d).padStart(2, '0'), day = H.days[k], c = day && condOf(day.cond);
      doc.rect(cx, cy, 36, 26, cycleAt(k) ? '#FDE3EC' : c ? c.bg : '#F7F5FC'); doc.text(cx + 4, cy + 11, String(d), 9, true);
      if (day && day.vit && day.vit.length) doc.rect(cx + 28, cy + 18, 5, 5, '#7C6FD8');
    }
    yy += Math.ceil((lead + dim) / 7) * 30 + 8;
    need(30);
    [['#DDF3E6', T('Legend_ok')], ['#EEEAFB', T('Legend_meh')], ['#FFF3CC', T('Legend_sick')], ['#FDE3EC', T('Legend_p')], ['#7C6FD8', T('Legend_v')]].forEach((l, i) => { const x = 40 + i * 104; doc.rect(x, yy, 9, 9, l[0]); doc.text(x + 14, yy + 8, l[1], 8, false, '#4B4663'); });
    yy += 26;
    need(30); doc.text(40, yy, T('PdfNotes'), 12, true); yy += 16;
    let any = false;
    for (let k = from; k <= to; k = addDays(k, 1)) {
      const d = H.days[k]; if (!d) continue; any = true;
      const c = condOf(d.cond), vn = (d.vit || []).map((id) => (H.items.find((i) => i.id === id) || {}).name).filter(Boolean);
      const head = dShort(k) + (c ? '  -  ' + T(c.k) : '') + (cycleAt(k) ? '  -  ' + T('Legend_p') : '');
      const lines = [];
      if (vn.length) lines.push(T('PdfVitTaken') + ': ' + vn.join(', '));
      if (d.sym && d.sym.length) lines.push(d.sym.map((s) => T('s_' + s)).join(', '));
      if (d.note) wrap(d.note, 100).forEach((ln) => lines.push(ln));
      need(14 + lines.length * 11 + 6);
      doc.text(40, yy, head, 9, true); yy += 12;
      lines.forEach((ln) => { doc.text(52, yy, ln, 9, false, '#3A3552'); yy += 11; });
      yy += 6;
    }
    if (!any) doc.text(40, yy, T('PdfNoNotes'), 9, false, '#6B6682');
    PS.download('kesehatanku-' + m + '.pdf', doc.build(T('PdfFoot')), 'application/pdf');
    PS.toast(T('PdfMade') + '. ' + T('PdfNote').split('. ').pop(), 4500);
  };

  /* ======================= MySpace cards ======================= */
  const skeleton = '<div style="display:flex;flex-direction:column;gap:5px"><div style="height:9px;width:90%;border-radius:99px;background:#E9E4F5"></div><div style="height:9px;width:68%;border-radius:99px;background:#E9E4F5"></div></div>';
  const lockPill = `<span class="pill" style="background:#fff;color:#4A3FB0">🔒 ${esc(T('Locked'))}</span>`;
  const dmLocked = () => `<section class="card" style="border:2px solid var(--pri-m)">
    <div class="row"><span class="ic" style="background:var(--pri-l)">${PS.icon('profile')}</span><div class="stack grow" style="gap:0"><h2 class="h2">${esc(t('dmTitle'))}</h2><span class="small">${esc(t('dmSub'))}</span></div>${lockPill}</div>
    <div class="grid2">
      <a class="tile" href="#dwork" style="background:var(--sky);border:none;align-items:center;text-align:center"><span style="font-size:34px;line-height:1">💼</span><span class="t">${esc(t('dmWork'))}</span></a>
      <a class="tile" href="#ddiary" style="background:var(--rose);border:none;align-items:center;text-align:center"><span style="font-size:34px;line-height:1">🌷</span><span class="t">${esc(t('dmDiary'))}</span></a>
    </div>${skeleton}<span class="small">${esc(T('LockedNote'))}</span></section>`;
  const healthCard = () => {
    const g = needsPin('hl');
    const head = (right) => `<div class="row"><span class="ic" style="background:#DDF3E6;font-size:22px">🌿</span><div class="stack grow" style="gap:0"><h2 class="h2">${esc(T('Title'))}</h2><span class="small">${esc(T('Sub'))}</span></div>${right}</div>`;
    if (g === 'create') return `<a class="card" href="#health" style="text-decoration:none;color:inherit;background:#DDF3E6;border:none">${head('<span style="font-weight:800;color:#2F7A55">›</span>')}<span class="small" style="font-weight:700">${esc(T('CardStart'))}</span></a>`;
    if (g === 'unlock') return `<a class="card" href="#health" style="text-decoration:none;color:inherit;background:#DDF3E6;border:none">${head(lockPill)}${skeleton}<span class="small" style="color:#2D6A4A">${esc(T('LockedNote'))}</span></a>`;
    const day = H.days[dayKey()], c = day && condOf(day.cond), items = activeItems(), taken = day ? (day.vit || []).filter((id) => items.some((i) => i.id === id)).length : 0, st = cycleStats();
    const cell = (e, v, l) => `<a class="tile" href="#health" style="background:#fff;border:none;align-items:center;text-align:center;gap:2px"><span style="font-size:24px;line-height:1">${e}</span><span class="t" style="font-size:13px">${esc(v)}</span><span class="s">${esc(l)}</span></a>`;
    return `<section class="card" style="background:#DDF3E6;border:none">${head(hasPin() && PRIV.hl ? `<button class="pill" style="background:#fff;color:#4A3FB0;border:none;cursor:pointer;min-height:28px" data-act="hlLockNow">🔒 ${esc(T('Lock'))}</button>` : '')}
      <div class="grid3">${cell(c ? c.em : '➕', c ? T(c.k) : T('TabCheck'), T('TodayCond'))}${cell('💊', taken + ' / ' + items.length, T('VitToday'))}${cell('🌸', st.day && st.cs.length ? T('CycleDay', { n: st.day }).replace(/ siklus$| cycle$/i, '') : '–', T('CycleCard'))}</div>
      <span class="small" style="color:#2D6A4A;font-weight:700">${esc(T('OnlyPhone'))}</span></section>`;
  };
  const pinRow = () => `<a class="tile h" href="#hpin" style="background:#fff"><span class="ic" style="background:#EEEAFB;font-size:22px">🔐</span><span class="stack grow" style="gap:0"><span class="t">${esc(T('PinHead'))}</span><span class="s">${esc(hasPin() ? T('Status_on', { x: lockLabel() }) : T('PinCardSub'))}</span></span><span style="font-weight:800;color:#5B4FC4">›</span></a>`;
  const origCard = PS.dearmeCard;
  PS.dearmeCard = function () {
    const lockedDm = hasPin() && PRIV.dm && !isOpen();
    return (lockedDm ? dmLocked() : (origCard ? origCard() : '')) + healthCard() + pinRow();
  };

  /* ---------- gate the views ---------- */
  Object.keys(GATE).forEach((k) => {
    const f = V[k]; if (!f) return;
    const kind = GATE[k], af = V[k + '_after'];
    V[k] = function (a) {
      const g = needsPin(kind);
      if (g === 'unlock') return unlockView(kind);
      if (g === 'create') { retTo = location.hash || '#' + k; if (pmode !== 'c1' && pmode !== 'c2') { pmode = 'c1'; pv.buf = ''; pfirst = ''; } return V.hpinRaw(); }
      return f(a);
    };
    if (af) V[k + '_after'] = (a) => { if (needsPin(kind)) return; af(a); };
  });
  V.hpinRaw = function () { const f = V.hpin; return f.raw ? f.raw() : ''; };
  // hpin was wrapped above; keep an un-gated copy for the "create" case
  (function () {
    const wrapped = V.hpin;
    const raw = function () {
      if (pmode === 'c1' || pmode === 'c2') {
        return `<div class="page">${PS.back(retTo || '#profile', esc(T('PinHead')))}${padHtml('🔐', pmode === 'c1' ? T('PinNew') : T('PinAgain'), T('PinSub'), pv.buf, 'hlCKey')}${lockToggles(hasPin() ? PRIV : pnew)}</div>`;
      }
      return wrapped();
    };
    wrapped.raw = raw;
  })();

  /* ---------- styles ---------- */
  const css = document.createElement('style');
  css.textContent = `
.hl-pad{display:flex;flex-direction:column;align-items:center;gap:14px;padding:8px 0 4px}
.hl-lockic{width:64px;height:64px;border-radius:20px;background:#EEEAFB;display:flex;align-items:center;justify-content:center;font-size:32px}
.hl-tabs{display:flex;gap:6px;overflow-x:auto;padding:2px 0 4px;margin:0 -2px}
.hl-tabs a{flex:1;min-width:64px;min-height:48px;border-radius:14px;background:#fff;border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:11px;font-weight:800;color:var(--muted2);text-decoration:none}
.hl-tabs a span{font-size:17px;line-height:1}
.hl-tabs a.on{background:#EEEAFB;color:#4A3FB0;border-color:#CFC7F2}
.hl-opts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.hl-opt{min-height:68px;border-radius:16px;border:2px solid transparent;background:var(--bg);color:var(--fg);font-weight:800;font-size:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer}
.hl-opt.on{border-color:#4A3FB0}
.hl-tog{width:100%;min-height:46px;border:none;background:none;display:flex;align-items:center;gap:12px;cursor:pointer;padding:0;color:inherit}
.hl-box{width:26px;height:26px;border-radius:9px;border:2px solid #B9B2D6;background:#fff;color:#fff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex:none}
.hl-tog.on .hl-box{background:#5FB38A;border-color:#5FB38A}
.hl-cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px}
.hl-wd{text-align:center;font-size:11px;font-weight:800;color:var(--muted2)}
.hl-cell{min-height:46px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-decoration:none;color:var(--ink);font-size:13px}
.hl-cell.fut{opacity:.45}.hl-cell.today{outline:2px solid #4A3FB0}
.hl-cell small{font-size:11px;line-height:1}
.hl-dot{width:6px;height:6px;border-radius:99px;background:#7C6FD8;display:inline-block}.hl-dot.off{background:transparent}
.hl-per{padding:8px 14px;border-radius:99px;background:#F3F0FA;font-size:13px;font-weight:800;color:var(--ink);text-decoration:none}.hl-per.on{background:#4A3FB0;color:#fff}
.hl-log{display:flex;flex-direction:column;gap:4px;text-decoration:none;color:inherit}
.hl-item{padding:2px 0}
`;
  document.head.appendChild(css);
})();
