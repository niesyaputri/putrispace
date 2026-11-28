/* Putri Space · Dear Me (Cerita Kerja + Cerita Hari Ini) · Created by CreanovativeCo */
(function () {
  'use strict';
  const PS = window.PS, V = PS.views, A = PS.acts, IN = PS.inputs;
  const { esc, dayKey, addDays, uid } = PS;
  const t = PS.t;
  const S = () => PS.S();

  /* ---------- translations (merged into the app dictionary) ---------- */
  Object.assign(window.PS_I18N.id, {
    dmTitle: 'Dear Me', dmSub: 'Ruang ceritamu sendiri', dmWork: 'Cerita Kerja', dmWorkSub: 'Catatan kantor, per topik', dmDiary: 'Cerita Hari Ini', dmDiarySub: 'Diary harian dan syukur',
    dmRecent: 'Terakhir kamu tulis', dmNothing: 'Belum ada tulisan. Mulai dari satu cerita kecil.', dmKind: 'Kerja', dmKindDiary: 'Hari ini',
    dmFactFirst: 'Fakta dulu, tafsiran belakangan', dmAll: 'Semua', dmAddCat: '＋ Sub-kategori', dmPattern: 'Pola bulan ini',
    dmFeelPos: 'Positif', dmFeelNeu: 'Netral', dmFeelUnc: 'Kurang nyaman',
    dmPatternNote: 'Ada {n} catatan "kurang nyaman" di {cat} bulan ini. Kalau polanya terus ada, kamu punya bahan untuk bicara dengan tenang.',
    dmPatternNone: 'Belum ada pola yang menonjol. Terus catat fakta, polanya muncul sendiri.',
    dmNewNote: 'Catatan baru', dmEditNote: 'Edit catatan', dmJustNow: 'Baru terjadi', dmFromMemory: 'Dari ingatan', dmDate: 'Tanggal', dmMonthApprox: 'Perkiraan bulan', dmSubcat: 'Sub-kategori',
    dmWhat: 'Apa yang terjadi?', dmWhatPh: 'Tulis yang terlihat atau terdengar saja. Contoh: Rapat topik X diadakan jam 10, tim tidak diundang.',
    dmImpact: 'Dampak ke pekerjaan', dmOptional: '(kalau ada)', dmImpactPh: 'Contoh: Masukan tim baru disampaikan setelah rapat.',
    dmFeel: 'Rasanya seperti apa?', dmOther: 'Catatan lain', dmOtherHint: '(alasan lain yang mungkin)', dmOtherPh: 'Contoh: Mungkin rapat dadakan, perlu dicek.',
    dmTip: 'Tulis apa yang terjadi, bukan tebakan tentang maksud orangnya. Tafsirannya bisa kamu lihat nanti dari polanya.',
    dmSave: 'Simpan catatan', dmSaved: 'Tersimpan. Kamu bisa mengeditnya kapan saja.', dmDelete: 'Hapus catatan', dmNeedWhat: 'Tulis dulu apa yang terjadi', dmCancel: 'Batal',
    dmCatName: 'Nama sub-kategori', dmCatAdd: 'Tambah sub-kategori', dmCatMine: 'Sub-kategori buatanmu', dmCatDelNote: 'Catatan lama di sub-kategori yang dihapus dipindah ke Lainnya.', dmCatNeedName: 'Isi nama sub-kategori', dmManage: 'Kelola sub-kategori',
    dmApprox: 'Sekitar {m}', dmMemTag: 'Dari ingatan', dmEmptyWork: 'Belum ada catatan di sini.',
    dmMoodToday: 'Mood hari ini', dmMoodDay: 'Mood', dmStory: 'Ceritakan harimu', dmStoryPh: 'Hari ini aku senang karena…', dmGrat: 'Tiga hal kecil yang kusyukuri', dmGratPh: 'Tulis satu hal…',
    dmPhoto: 'Foto', dmChangePhoto: 'Ganti foto', dmRemovePhoto: 'Hapus foto', dmPhotoNote: 'Foto hanya tersimpan di HP ini, tidak ikut sinkron ke Sheet.',
    dmSaveDiary: 'Simpan cerita', dmDeleteDiary: 'Hapus cerita ini', dmWeek: 'Minggu ini', dmIdeas: 'Butuh ide untuk menulis?', dmIdea1: 'Makan apa hari ini?', dmIdea2: 'Siapa yang bikin aku senyum?', dmIdea3: 'Satu hal yang kubanggakan',
    dmPrev: 'Halaman sebelumnya', dmDiaryEmpty: 'Belum ada cerita sebelumnya.', dmNeedAny: 'Pilih mood atau tulis sesuatu dulu', dmNoMood: 'Belum pilih mood', dmNoText: '(tanpa tulisan)',
    dmWriteToday: 'Tulis cerita hari ini', dmEditToday: 'Edit cerita hari ini', dmWriteTitle: 'Tulis cerita', dmEditTitle: 'Edit cerita', dmDiaryHead: 'Catatan harianku', dmCount: '{n} cerita', dmScrollMore: 'Scroll terus untuk melihat catatan yang lebih lama ↓', dmReadTitle: 'Cerita {d}', dmMyStory: 'Ceritaku', dmMoodThen: 'Mood hari itu', dmGratRead: 'Yang kusyukuri', dmEditStory: 'Edit cerita ini', dmDelShort: 'Hapus', dmWritten: 'Dicatat {d}', dmEdited: 'diedit {d}', dmGratN: '{n} syukur', dmPhotoTag: 'foto', dmNotFound: 'Cerita tidak ditemukan', dmTodayTag: 'Hari ini',
    dmM_happy: 'Senang', dmM_good: 'Baik', dmM_excited: 'Semangat', dmM_okay: 'Biasa', dmM_tired: 'Lelah', dmM_sad: 'Sedih', dmM_upset: 'Kesal', dmM_unwell: 'Kurang fit',
    dmC_atasan: 'Atasan & dinamika', dmC_tim: 'Tim', dmC_rapat: 'Rapat & disposisi', dmC_capai: 'Pencapaian', dmC_lain: 'Lainnya'
  });
  Object.assign(window.PS_I18N.en, {
    dmTitle: 'Dear Me', dmSub: 'Your own story space', dmWork: 'Work Notes', dmWorkSub: 'Office notes, by topic', dmDiary: 'Today’s Story', dmDiarySub: 'Daily diary and gratitude',
    dmRecent: 'Latest entries', dmNothing: 'Nothing here yet. Start with one small story.', dmKind: 'Work', dmKindDiary: 'Today',
    dmFactFirst: 'Facts first, interpretation later', dmAll: 'All', dmAddCat: '＋ Subcategory', dmPattern: 'This month’s pattern',
    dmFeelPos: 'Positive', dmFeelNeu: 'Neutral', dmFeelUnc: 'Uncomfortable',
    dmPatternNote: '{n} "uncomfortable" notes in {cat} this month. If the pattern continues, you have material for a calm conversation.',
    dmPatternNone: 'No clear pattern yet. Keep noting facts and the pattern will show itself.',
    dmNewNote: 'New note', dmEditNote: 'Edit note', dmJustNow: 'Just happened', dmFromMemory: 'From memory', dmDate: 'Date', dmMonthApprox: 'Approximate month', dmSubcat: 'Subcategory',
    dmWhat: 'What happened?', dmWhatPh: 'Only what you saw or heard. Example: Meeting on topic X at 10, our team was not invited.',
    dmImpact: 'Impact on work', dmOptional: '(if any)', dmImpactPh: 'Example: Our input was only shared after the meeting.',
    dmFeel: 'How did it feel?', dmOther: 'Other notes', dmOtherHint: '(other possible reasons)', dmOtherPh: 'Example: Maybe it was a last-minute meeting, to be checked.',
    dmTip: 'Write what happened, not guesses about people’s intentions. You can read the meaning later from the pattern.',
    dmSave: 'Save note', dmSaved: 'Saved. You can edit it anytime.', dmDelete: 'Delete note', dmNeedWhat: 'Write what happened first', dmCancel: 'Cancel',
    dmCatName: 'Subcategory name', dmCatAdd: 'Add subcategory', dmCatMine: 'Your subcategories', dmCatDelNote: 'Old notes in a deleted subcategory move to Other.', dmCatNeedName: 'Enter a subcategory name', dmManage: 'Manage subcategories',
    dmApprox: 'Around {m}', dmMemTag: 'From memory', dmEmptyWork: 'No notes here yet.',
    dmMoodToday: 'Today’s mood', dmMoodDay: 'Mood', dmStory: 'Tell about your day', dmStoryPh: 'Today I’m happy because…', dmGrat: 'Three small things I’m grateful for', dmGratPh: 'Write one thing…',
    dmPhoto: 'Photo', dmChangePhoto: 'Change photo', dmRemovePhoto: 'Remove photo', dmPhotoNote: 'Photos stay on this phone only and are not synced to the Sheet.',
    dmSaveDiary: 'Save story', dmDeleteDiary: 'Delete this story', dmWeek: 'This week', dmIdeas: 'Need ideas to write?', dmIdea1: 'What did I eat today?', dmIdea2: 'Who made me smile?', dmIdea3: 'One thing I’m proud of',
    dmPrev: 'Earlier pages', dmDiaryEmpty: 'No earlier stories yet.', dmNeedAny: 'Pick a mood or write something first', dmNoMood: 'No mood picked', dmNoText: '(no text)',
    dmWriteToday: 'Write today’s story', dmEditToday: 'Edit today’s story', dmWriteTitle: 'Write a story', dmEditTitle: 'Edit story', dmDiaryHead: 'My daily notes', dmCount: '{n} stories', dmScrollMore: 'Keep scrolling for older notes ↓', dmReadTitle: 'Story {d}', dmMyStory: 'My story', dmMoodThen: 'Mood that day', dmGratRead: 'What I’m grateful for', dmEditStory: 'Edit this story', dmDelShort: 'Delete', dmWritten: 'Written {d}', dmEdited: 'edited {d}', dmGratN: '{n} gratitude', dmPhotoTag: 'photo', dmNotFound: 'Story not found', dmTodayTag: 'Today',
    dmM_happy: 'Happy', dmM_good: 'Good', dmM_excited: 'Excited', dmM_okay: 'Okay', dmM_tired: 'Tired', dmM_sad: 'Sad', dmM_upset: 'Upset', dmM_unwell: 'Unwell',
    dmC_atasan: 'Boss & dynamics', dmC_tim: 'Team', dmC_rapat: 'Meetings & dispositions', dmC_capai: 'Achievements', dmC_lain: 'Other'
  });

  /* ---------- data ---------- */
  const CATS = [
    { id: 'atasan', em: '🧑‍💼', k: 'dmC_atasan', bg: '#EEEAFE', fg: '#4B3DB0' },
    { id: 'tim', em: '👥', k: 'dmC_tim', bg: '#DDF4EA', fg: '#1F6E55' },
    { id: 'rapat', em: '📅', k: 'dmC_rapat', bg: '#E0EEFF', fg: '#2B5C99' },
    { id: 'capai', em: '🏆', k: 'dmC_capai', bg: '#FFF4D6', fg: '#6B4E00' },
    { id: 'lain', em: '📝', k: 'dmC_lain', bg: '#F3F0FF', fg: '#4F4A68' }
  ];
  const FEEL = [
    { id: 'pos', em: '😊', k: 'dmFeelPos', bg: '#DDF4EA', fg: '#1F6E55' },
    { id: 'neu', em: '😐', k: 'dmFeelNeu', bg: '#E0EEFF', fg: '#2B5C99' },
    { id: 'unc', em: '😟', k: 'dmFeelUnc', bg: '#FFE6D9', fg: '#9A4A22' }
  ];
  const MOODS = [
    { id: 'happy', em: '😄' }, { id: 'good', em: '🙂' }, { id: 'excited', em: '🤩' }, { id: 'okay', em: '😐' },
    { id: 'tired', em: '😴' }, { id: 'sad', em: '😢' }, { id: 'upset', em: '😠' }, { id: 'unwell', em: '🤒' }
  ];
  const CAT_EMOJI = ['🏷️', '📌', '💡', '🤝', '📊', '🎯', '🧩', '🔍'];
  const D = () => {
    const s = S();
    if (!s.dearme) s.dearme = { work: [], diary: [], cats: [] };
    ['work', 'diary', 'cats'].forEach((k) => { if (!Array.isArray(s.dearme[k])) s.dearme[k] = []; });
    return s.dearme;
  };
  const allCats = () => CATS.map((c) => ({ id: c.id, em: c.em, name: t(c.k), bg: c.bg, fg: c.fg })).concat(D().cats.map((c) => ({ id: c.id, em: c.em || '🏷️', name: c.name, bg: '#F3F0FF', fg: '#4F4A68', custom: true })));
  const catOf = (id) => allCats().find((c) => c.id === id) || allCats().find((c) => c.id === 'lain');
  const feelOf = (id) => FEEL.find((f) => f.id === id) || FEEL[1];
  const moodOf = (id) => MOODS.find((m) => m.id === id);
  const locale = () => (S().lang === 'en' ? 'en-GB' : 'id-ID');
  const monthName = (m) => new Date(2026, m, 1).toLocaleDateString(locale(), { month: 'long' });
  const fmtWork = (e) => e.memory ? t('dmApprox', { m: new Date(e.date + 'T00:00:00').toLocaleDateString(locale(), { month: 'long', year: 'numeric' }) }) : PS.fmtDate(e.date);
  const pill = (bg, fg, txt) => `<span class="pill" style="background:${bg};color:${fg}">${txt}</span>`;
  const nl = (s) => esc(s).replace(/\n/g, '<br>');

  /* ---------- Dear Me card on MySpace (below Export CV) ---------- */
  PS.dearmeCard = function () {
    const d = D();
    const items = d.work.map((e) => ({ kind: 'w', at: e.updated || e.created || 0, e })).concat(d.diary.map((e) => ({ kind: 'd', at: e.updated || e.created || 0, e })))
      .sort((a, b) => b.at - a.at).slice(0, 2);
    const rows = items.map((x) => x.kind === 'w'
      ? `<a class="tile h" href="#dwrite/${x.e.id}" style="background:#FAF7FF"><span style="font-size:24px;line-height:1">${catOf(x.e.cat).em}</span><span class="stack grow" style="gap:0"><span class="s">${esc(t('dmKind'))} · ${esc(catOf(x.e.cat).name)} · ${esc(fmtWork(x.e))}</span><span class="t" style="font-size:13.5px;font-weight:700">${esc((x.e.what || '').slice(0, 90))}</span></span></a>`
      : `<a class="tile h" href="#dread/${x.e.date}" style="background:#FAF7FF"><span style="font-size:24px;line-height:1">${(moodOf(x.e.mood) || { em: '🌷' }).em}</span><span class="stack grow" style="gap:0"><span class="s">${esc(t('dmKindDiary'))} · ${esc(PS.fmtDate(x.e.date))}</span><span class="t" style="font-size:13.5px;font-weight:700">${esc((x.e.text || t('dmNoText')).slice(0, 90))}</span></span></a>`).join('');
    return `<section class="card" style="border:2px solid var(--pri-m)">
      <div class="row"><span class="ic" style="background:var(--pri-l)">${PS.icon('profile')}</span><div class="stack grow" style="gap:0"><h2 class="h2">${esc(t('dmTitle'))}</h2><span class="small">${esc(t('dmSub'))}</span></div></div>
      <div class="grid2">
        <a class="tile" href="#dwork" style="background:var(--sky);border:none;align-items:center;text-align:center"><span style="font-size:34px;line-height:1">💼</span><span class="t">${esc(t('dmWork'))}</span><span class="s">${esc(t('dmWorkSub'))}</span></a>
        <a class="tile" href="#ddiary" style="background:var(--rose);border:none;align-items:center;text-align:center"><span style="font-size:34px;line-height:1">🌷</span><span class="t">${esc(t('dmDiary'))}</span><span class="s">${esc(t('dmDiarySub'))}</span></a>
      </div>
      <div class="between"><b style="font-size:14px">${esc(t('dmRecent'))}</b></div>
      ${rows || `<span class="small">${esc(t('dmNothing'))}</span>`}
    </section>`;
  };

  /* ======================= Cerita Kerja (list) ======================= */
  let wf = 'all';
  V.dwork = function () {
    const d = D();
    const list = d.work.slice().sort((a, b) => b.date.localeCompare(a.date) || (b.created || 0) - (a.created || 0));
    const shown = wf === 'all' ? list : list.filter((e) => e.cat === wf);
    const cats = allCats();
    const chips = `<button class="dm-chip ${wf === 'all' ? 'on' : ''}" data-act="dwFilter" data-v="all">${esc(t('dmAll'))}</button>`
      + cats.map((c) => `<button class="dm-chip ${wf === c.id ? 'on' : ''}" data-act="dwFilter" data-v="${esc(c.id)}"><span>${c.em}</span>${esc(c.name)}</button>`).join('')
      + `<button class="dm-chip add" data-act="dmCats">${esc(t('dmAddCat'))}</button>`;
    const mk = dayKey().slice(0, 7);
    const mon = list.filter((e) => e.date.slice(0, 7) === mk && !e.memory);
    const cnt = { pos: 0, neu: 0, unc: 0 }; mon.forEach((e) => { if (cnt[e.feel] != null) cnt[e.feel]++; });
    const byCat = {}; mon.filter((e) => e.feel === 'unc').forEach((e) => { byCat[e.cat] = (byCat[e.cat] || 0) + 1; });
    const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    const note = top && top[1] >= 3 ? t('dmPatternNote', { n: top[1], cat: catOf(top[0]).name }) : t('dmPatternNone');
    const entry = (e) => {
      const c = catOf(e.cat), f = feelOf(e.feel);
      return `<a class="card dm-entry" href="#dwrite/${e.id}">
        <div class="between"><b style="font-size:15px">${esc(fmtWork(e))}</b><span class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">${e.memory ? pill('#F3F0FF', '#4F4A68', '🕰️ ' + esc(t('dmMemTag'))) : ''}${pill(c.bg, c.fg, c.em + ' ' + esc(c.name))}${pill(f.bg, f.fg, f.em + ' ' + esc(t(f.k)))}</span></div>
        <div style="font-size:14px;line-height:1.5">📝 <b>${esc(t('dmWhat').replace('?', ''))}:</b> ${nl(e.what)}</div>
        ${e.impact ? `<div style="font-size:14px;line-height:1.5">📌 <b>${esc(t('dmImpact'))}:</b> ${nl(e.impact)}</div>` : ''}
        ${e.note ? `<div class="small" style="font-size:13px;line-height:1.5">💭 <b>${esc(t('dmOther'))}:</b> ${nl(e.note)}</div>` : ''}
      </a>`;
    };
    return `<div class="page">${PS.back('#profile', '💼 ' + esc(t('dmWork')))}
      <p class="small" style="margin:-6px 0 0 56px">${esc(t('dmFactFirst'))}</p>
      <div class="dm-chips">${chips}</div>
      <section class="card"><div class="between"><b style="font-size:16px">📊 ${esc(t('dmPattern'))}</b></div>
        <div class="grid3">${FEEL.map((f) => `<div class="stat" style="background:${f.bg};border:none;color:${f.fg}"><b>${cnt[f.id]}</b><span style="color:${f.fg}">${f.em} ${esc(t(f.k))}</span></div>`).join('')}</div>
        <span class="small" style="font-size:13px;line-height:1.5">${esc(note)}</span></section>
      ${shown.length ? shown.map(entry).join('') : `<div class="empty">${esc(t('dmEmptyWork'))}</div>`}
      <a class="fab" href="#dwrite/new" aria-label="${esc(t('dmNewNote'))}">+</a></div>`;
  };
  A.dwFilter = (el) => { wf = el.dataset.v; PS.render(); };

  /* sub-category manager */
  A.dmCats = () => {
    const mine = D().cats;
    PS.sheet(`<h2 class="h2">${esc(t('dmCatAdd'))}</h2>
      <div class="field"><label class="lbl" for="dmCatN">${esc(t('dmCatName'))}</label><input id="dmCatN" class="in" maxlength="40"></div>
      <div class="dm-chips" id="dmCatE">${CAT_EMOJI.map((e, i) => `<button class="dm-chip ${i ? '' : 'on'}" data-act="dmCatEm" data-v="${e}" aria-label="${e}">${e}</button>`).join('')}</div>
      <button class="btn" data-act="dmCatSave">${esc(t('save'))}</button>
      ${mine.length ? `<b style="font-size:14px">${esc(t('dmCatMine'))}</b>${mine.map((c) => `<div class="between"><span style="font-size:14px;font-weight:700">${c.em || '🏷️'} ${esc(c.name)}</span><button class="btn sm rose" data-act="dmCatDel" data-id="${esc(c.id)}">${esc(t('delete'))}</button></div>`).join('')}<span class="small">${esc(t('dmCatDelNote'))}</span>` : ''}`);
  };
  A.dmCatEm = (el) => { el.parentElement.querySelectorAll('.dm-chip').forEach((b) => b.classList.toggle('on', b === el)); };
  A.dmCatSave = () => {
    const name = document.getElementById('dmCatN').value.trim();
    if (!name) { PS.toast(t('dmCatNeedName')); return; }
    const em = (document.querySelector('#dmCatE .dm-chip.on') || {}).dataset ? document.querySelector('#dmCatE .dm-chip.on').dataset.v : '🏷️';
    D().cats.push({ id: 'c' + uid(), name, em });
    PS.save(); PS.sheet(null); PS.render();
  };
  A.dmCatDel = (el) => {
    if (!confirm(t('confirmDelete'))) return;
    const d = D(), id = el.dataset.id;
    d.cats = d.cats.filter((c) => c.id !== id);
    d.work.forEach((e) => { if (e.cat === id) e.cat = 'lain'; });
    if (wf === id) wf = 'all';
    PS.save(); PS.sheet(null); PS.render();
  };

  /* ======================= Catatan kerja (form: new + edit) ======================= */
  let dw = null;
  const blankW = () => ({ id: null, date: dayKey(), memory: false, cat: 'atasan', what: '', impact: '', feel: 'neu', note: '' });
  const dateField = () => {
    if (!dw.memory) return `<input id="dwDate" class="in" type="date" value="${esc(dw.date)}" max="${dayKey()}" data-in="dwDate">`;
    const y = +dw.date.slice(0, 4), m = +dw.date.slice(5, 7) - 1, ny = new Date().getFullYear();
    const years = [ny, ny - 1, ny - 2, ny - 3];
    if (!years.includes(y)) years.push(y);
    return `<div class="grid2"><select id="dwMon" class="in" data-change="dwMY" aria-label="${esc(t('dmMonthApprox'))}">${Array.from({ length: 12 }, (_, i) => `<option value="${i}" ${i === m ? 'selected' : ''}>${esc(monthName(i))}</option>`).join('')}</select>
      <select id="dwYear" class="in" data-change="dwMY" aria-label="${esc(t('dmMonthApprox'))}">${years.sort((a, b) => b - a).map((yy) => `<option ${yy === y ? 'selected' : ''}>${yy}</option>`).join('')}</select></div>`;
  };
  V.dwrite = function (a) {
    const id = a[0] || 'new';
    const found = id === 'new' ? null : D().work.find((e) => e.id === id);
    if (id !== 'new' && !found) { location.hash = 'dwork'; return ''; }
    if (!dw || dw._route !== id) { dw = Object.assign(blankW(), found ? JSON.parse(JSON.stringify(found)) : {}); dw._route = id; }
    const back = '#dwork';
    return `<div class="page">${PS.back(back, '✏️ ' + esc(t(found ? 'dmEditNote' : 'dmNewNote')))}
      <div class="seg" role="group"><button class="${dw.memory ? '' : 'on'}" data-act="dwMem" data-v="0">⚡ ${esc(t('dmJustNow'))}</button><button class="${dw.memory ? 'on' : ''}" data-act="dwMem" data-v="1">🕰️ ${esc(t('dmFromMemory'))}</button></div>
      <div class="field"><label class="lbl" for="dwDate">📅 ${esc(dw.memory ? t('dmMonthApprox') : t('dmDate'))}</label><div id="dwDateBox">${dateField()}</div></div>
      <div class="field"><span class="lbl">🗂️ ${esc(t('dmSubcat'))}</span><div class="dm-chips" id="dwCats">${allCats().map((c) => `<button class="dm-chip ${dw.cat === c.id ? 'on' : ''}" data-act="dwCat" data-v="${esc(c.id)}"><span>${c.em}</span>${esc(c.name)}</button>`).join('')}<button class="dm-chip add" data-act="dmCats">${esc(t('dmAddCat'))}</button></div></div>
      <div class="field"><label class="lbl" for="dwWhat">📝 ${esc(t('dmWhat'))}</label><textarea id="dwWhat" class="in" rows="3" data-in="dwWhat" placeholder="${esc(t('dmWhatPh'))}">${esc(dw.what)}</textarea></div>
      <div class="field"><label class="lbl" for="dwImpact">📌 ${esc(t('dmImpact'))} <span class="small">${esc(t('dmOptional'))}</span></label><textarea id="dwImpact" class="in" rows="2" data-in="dwImpact" placeholder="${esc(t('dmImpactPh'))}">${esc(dw.impact)}</textarea></div>
      <div class="field"><span class="lbl">💗 ${esc(t('dmFeel'))}</span><div class="grid3" id="dwFeels">${FEEL.map((f) => `<button class="dm-opt ${dw.feel === f.id ? 'on' : ''}" data-act="dwFeel" data-v="${f.id}"><span style="font-size:30px;line-height:1;display:block">${f.em}</span><span style="font-size:12px;font-weight:800;display:block;margin-top:4px">${esc(t(f.k))}</span></button>`).join('')}</div></div>
      <div class="field"><label class="lbl" for="dwNote">💭 ${esc(t('dmOther'))} <span class="small">${esc(t('dmOtherHint'))}</span></label><textarea id="dwNote" class="in" rows="2" data-in="dwNote" placeholder="${esc(t('dmOtherPh'))}">${esc(dw.note)}</textarea></div>
      <div class="card flat" style="background:var(--mint);color:var(--mint-d);flex-direction:row;gap:10px;align-items:flex-start"><span style="font-size:22px;line-height:1">💡</span><span style="font-size:13px;font-weight:700;line-height:1.5">${esc(t('dmTip'))}</span></div>
      <div class="row"><a class="btn soft" href="${back}" data-act="dwCancel" style="flex:1">${esc(t('dmCancel'))}</a><button class="btn" style="flex:2" data-act="dwSave">💾 ${esc(t('dmSave'))}</button></div>
      ${found ? `<button class="btn rose" data-act="dwDel">${esc(t('dmDelete'))}</button>` : ''}</div>`;
  };
  IN.dwDate = (el) => { if (el.value) dw.date = el.value; };
  IN.dwWhat = (el) => { dw.what = el.value; };
  IN.dwImpact = (el) => { dw.impact = el.value; };
  IN.dwNote = (el) => { dw.note = el.value; };
  A.dwMem = (el) => {
    dw.memory = el.dataset.v === '1';
    if (!dw.memory && !/^\d{4}-\d{2}-\d{2}$/.test(dw.date)) dw.date = dayKey();
    if (dw.memory) dw.date = dw.date.slice(0, 7) + '-01';
    el.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === el));
    document.getElementById('dwDateBox').innerHTML = dateField();
    const lb = document.querySelector('label[for="dwDate"]'); if (lb) lb.textContent = '📅 ' + (dw.memory ? t('dmMonthApprox') : t('dmDate'));
  };
  A.dwMY = () => {
    const m = +document.getElementById('dwMon').value, y = +document.getElementById('dwYear').value;
    dw.date = y + '-' + String(m + 1).padStart(2, '0') + '-01';
  };
  A.dwCat = (el) => { dw.cat = el.dataset.v; el.parentElement.querySelectorAll('.dm-chip').forEach((b) => b.classList.toggle('on', b === el)); };
  A.dwFeel = (el) => { dw.feel = el.dataset.v; el.parentElement.querySelectorAll('.dm-opt').forEach((b) => b.classList.toggle('on', b === el)); };
  A.dwSave = () => {
    if (!dw.what.trim()) { PS.toast(t('dmNeedWhat')); document.getElementById('dwWhat').focus(); return; }
    const d = D(), now = Date.now();
    const rec = { id: dw.id || uid(), date: dw.date || dayKey(), memory: !!dw.memory, cat: dw.cat, what: dw.what.trim(), impact: dw.impact.trim(), feel: dw.feel, note: dw.note.trim(), created: dw.created || now, updated: now };
    const i = d.work.findIndex((e) => e.id === rec.id);
    if (i >= 0) d.work[i] = rec; else d.work.push(rec);
    dw = null; PS.save(); PS.toast(t('dmSaved'), 2800); PS.go('dwork');
  };
  A.dwCancel = () => { dw = null; };
  A.dwDel = () => {
    if (!confirm(t('confirmDelete'))) return;
    const d = D(); d.work = d.work.filter((e) => e.id !== dw.id);
    dw = null; PS.save(); PS.go('dwork');
  };

  /* ======================= Cerita Hari Ini (diary, editable) ======================= */
  let dd = null;
  const blankD = (date) => ({ id: uid(), date, mood: '', text: '', gratitude: ['', '', ''], photo: false });
  const validDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
  const weekDays = () => { const today = dayKey(), dow = (new Date(today + 'T00:00:00').getDay() + 6) % 7, mon = addDays(today, -dow); return Array.from({ length: 7 }, (_, i) => addDays(mon, i)); };
  const photoBox = () => dd.photo
    ? `<div style="position:relative"><img id="dgImg" alt="" style="width:100%;max-height:260px;object-fit:cover;border-radius:16px;display:block;background:#F3F0FF"><div class="row" style="margin-top:8px"><button class="btn sm soft" data-act="dgPhoto">📷 ${esc(t('dmChangePhoto'))}</button><button class="btn sm rose" data-act="dgPhotoDel">${esc(t('dmRemovePhoto'))}</button></div></div><span class="small">${esc(t('dmPhotoNote'))}</span>`
    : `<button class="btn soft" data-act="dgPhoto" style="align-self:flex-start">📷 ${esc(t('dmPhoto'))}</button><span class="small">${esc(t('dmPhotoNote'))}</span>`;
  V.dtulis = function (a) {
    const today = dayKey();
    let date = validDate(a[0]) ? a[0] : today;
    if (date > today) date = today;
    const ex = D().diary.find((e) => e.date === date);
    if (!dd || dd._date !== date) {
      dd = ex ? JSON.parse(JSON.stringify(ex)) : blankD(date);
      dd.gratitude = [0, 1, 2].map((i) => (dd.gratitude && dd.gratitude[i]) || '');
      dd._date = date; dd._exists = !!ex;
    }
    const cm = moodOf(dd.mood);
    const dateLong = new Date(date + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return `<div class="page">${PS.back(dd._exists ? '#dread/' + date : '#ddiary', '✏️ ' + esc(t(dd._exists ? 'dmEditTitle' : 'dmWriteTitle')))}
      <p class="small" style="margin:-6px 0 0 56px">${esc(dateLong)}</p>
      <section class="card">
        <div class="between"><b style="font-size:17px">💭 ${esc(date === today ? t('dmMoodToday') : t('dmMoodDay'))}</b><span class="pill" id="dgPill" style="background:${cm ? '#FCE4EA;color:#8E3049' : '#F3F0FF;color:#4F4A68'}">${cm ? cm.em + ' ' + esc(t('dmM_' + cm.id)) : esc(t('dmNoMood'))}</span></div>
        <div class="mood-grid" id="dgMoods">${MOODS.map((m) => `<button class="mood ${dd.mood === m.id ? 'on' : ''}" data-act="dgMood" data-v="${m.id}"><span class="e">${m.em}</span>${esc(t('dmM_' + m.id))}</button>`).join('')}</div>
        <div class="field"><label class="lbl" for="dgText">📖 ${esc(t('dmStory'))}</label><textarea id="dgText" class="in" rows="4" data-in="dgText" placeholder="${esc(t('dmStoryPh'))}">${esc(dd.text)}</textarea></div>
        <div class="field"><span class="lbl">🙏 ${esc(t('dmGrat'))}</span>${[0, 1, 2].map((i) => `<input class="in" data-in="dgGrat" data-i="${i}" maxlength="120" value="${esc(dd.gratitude[i])}" placeholder="${esc((i + 1) + '. ' + t('dmGratPh'))}" aria-label="${esc(t('dmGrat') + ' ' + (i + 1))}">`).join('')}</div>
        <div class="field" id="dgPhotoBox">${photoBox()}</div>
        <input type="file" id="dgFile" accept="image/*" hidden data-change="dgPhotoChosen">
        <button class="btn" data-act="dgSave">💾 ${esc(t('dmSaveDiary'))}</button>
        ${dd._exists ? `<button class="btn rose" data-act="dgDel">${esc(t('dmDeleteDiary'))}</button>` : ''}
      </section>
      <section class="card flat" style="background:transparent;padding:0"><b style="font-size:14px">💡 ${esc(t('dmIdeas'))}</b><div class="dm-chips">${[['🍜', 'dmIdea1'], ['😊', 'dmIdea2'], ['🌟', 'dmIdea3']].map(([e, k]) => `<button class="dm-chip" data-act="dgIdea" data-k="${k}">${e} ${esc(t(k))}</button>`).join('')}</div></section>
    </div>`;
  };
  V.dtulis_after = () => { loadPhoto(); };
  /* list: all stories, newest first, grouped by month */
  V.ddiary = function () {
    dd = null;
    const today = dayKey(), d = D();
    const list = d.diary.slice().sort((a, b) => b.date.localeCompare(a.date));
    const hasToday = list.some((e) => e.date === today);
    const week = weekDays().map((k) => {
      const e = d.diary.find((x) => x.date === k), m = e && moodOf(e.mood);
      const wd = new Date(k + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'short' });
      const href = e ? '#dread/' + k : '#dtulis/' + k;
      return `<a href="${href}" class="${k === today ? 'today' : ''} ${k > today ? 'fut' : ''}"><span class="d">${m ? m.em : (e ? '🌷' : (k === today ? '＋' : ''))}</span><span>${esc(wd)}</span></a>`;
    }).join('');
    const groups = [];
    list.forEach((e) => { const k = e.date.slice(0, 7); let g = groups[groups.length - 1]; if (!g || g.k !== k) { g = { k, items: [] }; groups.push(g); } g.items.push(e); });
    const card = (e) => {
      const m = moodOf(e.mood), gn = (e.gratitude || []).filter(Boolean).length;
      const dl = new Date(e.date + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'short' }) + (e.date === today ? ' · ' + t('dmTodayTag') : '');
      const tags = (gn ? pill('#FFF4D6', '#6B4E00', '🙏 ' + esc(t('dmGratN', { n: gn }))) : '') + (e.photo ? pill('#E0EEFF', '#2B5C99', '📷 ' + esc(t('dmPhotoTag'))) : '');
      return `<a class="card dm-entry" href="#dread/${e.date}" style="flex-direction:row;align-items:center;gap:12px"><span style="font-size:34px;line-height:1;align-self:flex-start">${m ? m.em : '🌷'}</span><span class="stack grow" style="gap:2px;min-width:0"><span class="small" style="font-weight:800">${esc(dl)}</span><span style="font-size:14px;font-weight:700;line-height:1.45">${esc((e.text || (e.gratitude || []).filter(Boolean)[0] || t('dmNoText')).slice(0, 120))}</span>${tags ? `<span class="row" style="gap:6px;margin-top:4px;flex-wrap:wrap">${tags}</span>` : ''}</span><span style="color:var(--pri-m);font-size:22px;font-weight:900">›</span></a>`;
    };
    const monthLabel = (k) => new Date(k + '-01T00:00:00').toLocaleDateString(locale(), { month: 'long', year: 'numeric' });
    return `<div class="page">${PS.back('#profile', '🌷 ' + esc(t('dmDiary')))}
      <p class="small" style="margin:-6px 0 0 56px">${esc(t('dmDiaryHead'))}</p>
      <section class="card"><b style="font-size:15px">🗓️ ${esc(t('dmWeek'))}</b><div class="week">${week}</div></section>
      <a class="btn" href="#dtulis/${today}" style="min-height:56px;font-size:16px">${hasToday ? '✏️ ' + esc(t('dmEditToday')) : '✏️ ' + esc(t('dmWriteToday'))}</a>
      ${groups.length ? groups.map((g) => `<div class="between" style="margin-top:4px"><b style="font-size:15px;color:var(--pri-d)">${esc(monthLabel(g.k))}</b><span class="small">${esc(t('dmCount', { n: g.items.length }))}</span></div>${g.items.map(card).join('')}`).join('') + `<p class="small" style="text-align:center">${esc(t('dmScrollMore'))}</p>` : `<div class="empty">${esc(t('dmDiaryEmpty'))}</div>`}</div>`;
  };

  /* read one story (edit / delete from here) */
  V.dread = function (a) {
    const date = validDate(a[0]) ? a[0] : '';
    const e = D().diary.find((x) => x.date === date);
    if (!e) return `<div class="page">${PS.back('#ddiary', '🌷 ' + esc(t('dmDiary')))}<div class="empty">${esc(t('dmNotFound'))}</div></div>`;
    const m = moodOf(e.mood), gr = (e.gratitude || []).filter(Boolean);
    const sorted = D().diary.map((x) => x.date).sort(), i = sorted.indexOf(date);
    const prev = sorted[i - 1], next = sorted[i + 1];
    const short = (k) => new Date(k + 'T00:00:00').toLocaleDateString(locale(), { day: 'numeric', month: 'short' });
    const dateLong = new Date(date + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const stamp = (e.created ? t('dmWritten', { d: new Date(e.created).toLocaleDateString(locale(), { day: 'numeric', month: 'short' }) }) : '') + (e.updated && e.created && new Date(e.updated).toDateString() !== new Date(e.created).toDateString() ? ' · ' + t('dmEdited', { d: new Date(e.updated).toLocaleDateString(locale(), { day: 'numeric', month: 'short' }) }) : '');
    return `<div class="page">${PS.back('#ddiary', '🌷 ' + esc(t('dmReadTitle', { d: short(date) })))}
      <p class="small" style="margin:-6px 0 0 56px">${esc(dateLong)}</p>
      <section class="card" style="padding:18px;gap:14px">
        <div class="row"><span style="font-size:52px;line-height:1">${m ? m.em : '🌷'}</span><div class="stack" style="gap:0"><span class="small">${esc(t('dmMoodThen'))}</span><b style="font-size:18px">${m ? esc(t('dmM_' + m.id)) : esc(t('dmNoMood'))}</b></div></div>
        ${e.text ? `<div><b style="font-size:13px;color:var(--pri-d)">📖 ${esc(t('dmMyStory'))}</b><div style="font-size:15px;line-height:1.6;font-weight:600;margin-top:6px">${nl(e.text)}</div></div>` : ''}
        ${gr.length ? `<div style="background:var(--butter);border-radius:16px;padding:14px"><b style="font-size:13px;color:var(--butter-d)">🙏 ${esc(t('dmGratRead'))}</b><div style="font-size:14px;font-weight:700;line-height:1.7;margin-top:6px">${gr.map((g, k) => (k + 1) + '. ' + esc(g)).join('<br>')}</div></div>` : ''}
        ${e.photo ? `<img id="drImg" alt="" style="width:100%;max-height:320px;object-fit:cover;border-radius:16px;display:block;background:#F3F0FF">` : ''}
        ${stamp ? `<span class="small">${esc(stamp)}</span>` : ''}
      </section>
      <div class="row"><a class="btn" style="flex:2" href="#dtulis/${date}">✏️ ${esc(t('dmEditStory'))}</a><button class="btn rose" style="flex:1" data-act="drDel" data-d="${date}">🗑️ ${esc(t('dmDelShort'))}</button></div>
      <div class="row">${prev ? `<a class="btn ghost sm" style="flex:1" href="#dread/${prev}">‹ ${esc(short(prev))}</a>` : '<span style="flex:1"></span>'}${next ? `<a class="btn ghost sm" style="flex:1" href="#dread/${next}">${esc(short(next))} ›</a>` : '<span style="flex:1"></span>'}</div></div>`;
  };
  V.dread_after = async (a) => {
    const e = D().diary.find((x) => x.date === a[0]), im = document.getElementById('drImg');
    if (!e || !im) return;
    const src = await PS.img.get('dm-' + e.id); if (src) im.src = src;
  };
  A.drDel = async (el) => {
    if (!confirm(t('confirmDelete'))) return;
    const d = D(), e = d.diary.find((x) => x.date === el.dataset.d);
    if (e) { await PS.img.del('dm-' + e.id); d.diary = d.diary.filter((x) => x.date !== el.dataset.d); PS.save(); }
    PS.go('ddiary');
  };

  const loadPhoto = async () => {
    if (!dd || !dd.photo) return;
    const src = await PS.img.get('dm-' + dd.id), im = document.getElementById('dgImg');
    if (im && src) im.src = src;
  };
  IN.dgText = (el) => { dd.text = el.value; };
  IN.dgGrat = (el) => { dd.gratitude[+el.dataset.i] = el.value; };
  A.dgMood = (el) => {
    dd.mood = dd.mood === el.dataset.v ? '' : el.dataset.v;
    el.parentElement.querySelectorAll('.mood').forEach((b) => b.classList.toggle('on', b.dataset.v === dd.mood));
    const cm = moodOf(dd.mood), p = document.getElementById('dgPill');
    p.textContent = cm ? cm.em + ' ' + t('dmM_' + cm.id) : t('dmNoMood');
    p.style.background = cm ? '#FCE4EA' : '#F3F0FF'; p.style.color = cm ? '#8E3049' : '#4F4A68';
  };
  A.dgIdea = (el) => {
    const ta = document.getElementById('dgText'), txt = t(el.dataset.k);
    ta.value = (ta.value ? ta.value.replace(/\s*$/, '') + '\n' : '') + txt + ' ';
    dd.text = ta.value; ta.focus();
  };
  A.dgPhoto = () => document.getElementById('dgFile').click();
  A.dgPhotoChosen = (el) => {
    const f = el.files[0]; if (!f) return;
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = async () => {
      const max = 900, k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      try {
        await PS.img.put({ ['dm-' + dd.id]: c.toDataURL('image/jpeg', 0.82) });
        dd.photo = true; document.getElementById('dgPhotoBox').innerHTML = photoBox(); loadPhoto();
      } catch (e) { PS.toast(t('imagesFailed')); }
    };
    im.onerror = () => { URL.revokeObjectURL(url); PS.toast(t('badFile')); };
    im.src = url; el.value = '';
  };
  A.dgPhotoDel = async () => { await PS.img.del('dm-' + dd.id); dd.photo = false; document.getElementById('dgPhotoBox').innerHTML = photoBox(); };
  A.dgSave = () => {
    const grat = dd.gratitude.map((g) => g.trim());
    if (!dd.mood && !dd.text.trim() && !grat.some(Boolean) && !dd.photo) { PS.toast(t('dmNeedAny')); return; }
    const d = D(), now = Date.now(), old = d.diary.find((e) => e.date === dd._date);
    const rec = { id: dd.id, date: dd._date, mood: dd.mood, text: dd.text.trim(), gratitude: grat, photo: !!dd.photo, created: (old && old.created) || now, updated: now };
    const i = d.diary.findIndex((e) => e.date === rec.date);
    if (i >= 0) d.diary[i] = rec; else d.diary.push(rec);
    dd = null; PS.save(); PS.toast(t('dmSaved'), 2800); PS.go('ddiary');
  };
  A.dgDel = async () => {
    if (!confirm(t('confirmDelete'))) return;
    const d = D(); d.diary = d.diary.filter((e) => e.date !== dd._date);
    await PS.img.del('dm-' + dd.id);
    dd = null; PS.save(); PS.go('ddiary');
  };
})();
