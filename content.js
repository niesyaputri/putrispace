/* Putri Space · built-in content · Created by CreanovativeCo */
(function () {
  const I = {}; // colorful icons (24x24 viewBox, inner markup)
  I.home = '<path d="M3 11.2 12 4l9 7.2V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 20z" fill="#fff"/><path d="M12 14.6c-.9-.9-2.6-.4-2.6 1 0 1.3 1.6 2.2 2.6 3 1-.8 2.6-1.7 2.6-3 0-1.4-1.7-1.9-2.6-1z" fill="#F7A9BC"/>';
  I.profile = '<circle cx="12" cy="12" r="11" fill="#FFE6D9"/><circle cx="12" cy="10" r="4.2" fill="#F2A27A"/><path d="M4.8 19.4c1.7-2.9 4.2-4.2 7.2-4.2s5.5 1.3 7.2 4.2a11 11 0 0 1-14.4 0z" fill="#F2A27A"/><circle cx="10.5" cy="9.6" r=".8" fill="#2E2A45"/><circle cx="13.5" cy="9.6" r=".8" fill="#2E2A45"/>';
  I.english = '<path d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H10l-5 4.5V17a3 3 0 0 1-3-3z" fill="#C9C0F2"/><text x="12" y="12.6" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="8.5" font-weight="700" fill="#4B3DB0">Aa</text><circle cx="19.5" cy="3.5" r="2.5" fill="#FFD9A8"/>';
  I.hr = '<rect x="3" y="2" width="17" height="20" rx="3" fill="#7FCFAE"/><rect x="6" y="2" width="14" height="20" rx="2.5" fill="#C8EEDD"/><path d="M9 8h8M9 11.5h6" stroke="#3E8C6E" stroke-width="1.8" stroke-linecap="round"/><path d="M15 2v7l2-1.5L19 9V2z" fill="#F7A9BC"/>';
  I.more = '<rect x="2.5" y="2.5" width="8.5" height="8.5" rx="2.5" fill="#C9C0F2"/><rect x="13" y="2.5" width="8.5" height="8.5" rx="2.5" fill="#FFD0B8"/><rect x="2.5" y="13" width="8.5" height="8.5" rx="2.5" fill="#A8E3CB"/><rect x="13" y="13" width="8.5" height="8.5" rx="4.25" fill="#B5D4FA"/>';
  I.listening = '<path d="M4 15v-3a8 8 0 0 1 16 0v3" fill="none" stroke="#2B5C99" stroke-width="2.2" stroke-linecap="round"/><rect x="2.5" y="13" width="5.5" height="8" rx="2.4" fill="#6FA4EE"/><rect x="16" y="13" width="5.5" height="8" rx="2.4" fill="#6FA4EE"/><path d="M10 15.5v3M12 14v6M14 15.5v3" stroke="#F28BA6" stroke-width="1.6" stroke-linecap="round"/>';
  I.reading = '<path d="M1.5 5.5C5 4.3 8.6 4.6 12 6.6v14c-3.4-2-7-2.3-10.5-1.1z" fill="#7FCFAE"/><path d="M22.5 5.5C19 4.3 15.4 4.6 12 6.6v14c3.4-2 7-2.3 10.5-1.1z" fill="#A8E3CB"/><path d="M4.5 9.5c1.8-.4 3.6-.2 5 .5M4.5 13c1.8-.4 3.6-.2 5 .5M14.5 10c1.4-.7 3.2-.9 5-.5" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><path d="M17 2l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" fill="#F5C451"/>';
  I.writing = '<rect x="3" y="2.5" width="13" height="18" rx="2.5" fill="#fff" stroke="#F6B98E" stroke-width="1.5"/><path d="M6 7h7M6 10.5h7M6 14h4" stroke="#F6B98E" stroke-width="1.5" stroke-linecap="round"/><path d="M11 20.5l.8-3.6 8-8 2.8 2.8-8 8z" fill="#E8875A"/><path d="M19.8 8.9l1-1a1.4 1.4 0 0 1 2 0l.8.8a1.4 1.4 0 0 1 0 2l-1 1z" fill="#F28BA6"/><path d="M11 20.5l.8-3.6 2.8 2.8z" fill="#FFE7C2"/>';
  I.speaking = '<rect x="8" y="2" width="8" height="13" rx="4" fill="#F28BA6"/><path d="M10 6h4M10 9h4" stroke="#FCE4EA" stroke-width="1.3" stroke-linecap="round"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="#A23B57" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3M8.5 21.5h7" stroke="#A23B57" stroke-width="2" stroke-linecap="round"/><path d="M20.5 3.5c1 1 1 2.6 0 3.6M3.5 3.5c-1 1-1 2.6 0 3.6" stroke="#C9C0F2" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
  I.check = '<path d="M3 21l11-11 2.2 2.2-11 11z" fill="#6A5ACD"/><path d="M14 10l2-2 2.2 2.2-2 2z" fill="#C9C0F2"/><path d="M17 1.5l1.2 2.8 2.8 1.2-2.8 1.2L17 9.5l-1.2-2.8L13 5.5l2.8-1.2z" fill="#F5C451"/><circle cx="21" cy="11" r="1.3" fill="#F28BA6"/><circle cx="10" cy="3.5" r="1" fill="#7FCFAE"/>';
  I.mistakes = '<rect x="3.5" y="3" width="17" height="19" rx="3" fill="#F7C6D0"/><rect x="8" y="1.5" width="8" height="4" rx="1.6" fill="#E0708F"/><path d="M7 10.5l2.5 2.5M9.5 10.5 7 13" stroke="#A23B57" stroke-width="1.8" stroke-linecap="round"/><path d="M7 17l1.4 1.4 2.6-2.8" stroke="#1F6E55" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M13 11.8h4.5M13 17h4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>';
  I.tenses = '<path d="M3 12h18" stroke="#E8B94A" stroke-width="2" stroke-linecap="round"/><circle cx="5" cy="12" r="3" fill="#B5D4FA"/><circle cx="12" cy="12" r="3.6" fill="#F5C451"/><circle cx="19" cy="12" r="3" fill="#F7A9BC"/><path d="M12 3v4M12 17v4" stroke="#E8B94A" stroke-width="1.6" stroke-linecap="round"/>';
  I.story = '<path d="M2 6.5c2.6-1 5.4-.8 8 .8v13c-2.6-1.6-5.4-1.8-8-.8z" fill="#6FA4EE"/><path d="M10 7.3c1.5-.9 3-1.4 4.5-1.5v13c-1.5.1-3 .6-4.5 1.5z" fill="#B5D4FA"/><path d="M17.5 9a4 4 0 0 1 0 6M20 7a7 7 0 0 1 0 10" stroke="#F28BA6" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
  I.vocab = '<rect x="6" y="2" width="15" height="18" rx="3" fill="#A8E3CB" transform="rotate(8 13 11)"/><rect x="3" y="4" width="15" height="18" rx="3" fill="#fff" stroke="#7FCFAE" stroke-width="1.6"/><text x="10.5" y="16" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="8" font-weight="700" fill="#1F6E55">Aa</text>';
  I.journal = '<path d="M4 3h12l4 4v14H4z" fill="#FFD0B8"/><path d="M16 3v4h4z" fill="#E8875A"/><path d="M7 10h9M7 13.5h9M7 17h5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>';
  I.clock = '<circle cx="12" cy="13.5" r="8.5" fill="#FFE7C2"/><circle cx="12" cy="13.5" r="6.4" fill="#fff"/><path d="M12 9.5v4l2.8 1.8" stroke="#E8875A" stroke-width="2" stroke-linecap="round" fill="none"/><rect x="9.5" y="1.5" width="5" height="2.6" rx="1.3" fill="#F28BA6"/>';
  I.grad = '<path d="M1.5 9.5 12 4l10.5 5.5L12 15z" fill="#E8875A"/><path d="M5.5 11.8v4.6c3.6 2.6 9.4 2.6 13 0v-4.6L12 15z" fill="#F6B98E"/><path d="M20.5 10.4v5.8" stroke="#E8875A" stroke-width="1.6" stroke-linecap="round"/><circle cx="20.5" cy="17" r="1.6" fill="#F5C451"/>';
  I.medal = '<circle cx="12" cy="9.5" r="7" fill="#F5C451"/><circle cx="12" cy="9.5" r="4.3" fill="#FFE7A3"/><path d="M8 15.5 6.5 22l5.5-2.6 5.5 2.6-1.5-6.5" fill="#F28BA6"/>';
  I.calendar = '<rect x="2.5" y="4" width="19" height="17.5" rx="4" fill="#B5D4FA"/><rect x="2.5" y="4" width="19" height="6" rx="3" fill="#6FA4EE"/><rect x="7" y="2" width="2.4" height="5" rx="1.2" fill="#2B5C99"/><rect x="14.6" y="2" width="2.4" height="5" rx="1.2" fill="#2B5C99"/><circle cx="8" cy="14.5" r="1.6" fill="#fff"/><circle cx="12" cy="14.5" r="1.6" fill="#F7A9BC"/><circle cx="16" cy="14.5" r="1.6" fill="#fff"/>';
  I.flame = '<path d="M12 2c1 4 6 5.5 6 11a6 6 0 0 1-12 0c0-2.6 1.2-4 2.4-5 0 2.2 1 3.4 2.2 3.4C10.6 7 10 4.8 12 2z" fill="#FFB27A"/><path d="M12 11c.6 2 3 2.8 3 5.2a3 3 0 0 1-6 0c0-1.4.8-2.2 1.4-2.6.2 1 .7 1.5 1.3 1.5-.3-1.6-.3-2.8.3-4.1z" fill="#FFE7C2"/>';
  I.bag = '<rect x="2" y="7" width="20" height="14" rx="3.5" fill="#C9C0F2"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" stroke="#6A5ACD" stroke-width="2" fill="none"/><rect x="2" y="11" width="20" height="3" fill="#9C90E3"/><rect x="10" y="10" width="4" height="5" rx="1" fill="#F5C451"/>';
  I.star = '<path d="M12 2.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.5l-5.4 2.9 1-6.1L3.2 9l6.1-.9z" fill="#F5C451"/><path d="M12 6.5l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6z" fill="#FFE7A3"/>';
  I.cap = '<path d="M1.5 9.5 12 4l10.5 5.5L12 15z" fill="#6FA4EE"/><path d="M5.5 11.8v4.6c3.6 2.6 9.4 2.6 13 0v-4.6L12 15z" fill="#B5D4FA"/><circle cx="20.5" cy="17" r="1.6" fill="#F28BA6"/>';
  I.bell = '<path d="M5.5 16.5c1.2-1.4 1.5-3 1.5-6.5a5 5 0 0 1 10 0c0 3.5.3 5.1 1.5 6.5z" fill="#F5C451"/><circle cx="12" cy="19" r="2.2" fill="#E89A6B"/><circle cx="12" cy="4" r="1.4" fill="#F5C451"/>';
  I.lock = '<rect x="4" y="10" width="16" height="12" rx="3" fill="#F6B98E"/><path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3" stroke="#E8875A" stroke-width="2.2" fill="none"/><circle cx="12" cy="16" r="2" fill="#fff"/>';
  I.cloud = '<path d="M6.5 19a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6 1.5A3.8 3.8 0 0 1 17.5 19z" fill="#A8E3CB"/><path d="M12 11v6M9.5 14.5 12 17l2.5-2.5" stroke="#1F6E55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  I.globe = '<circle cx="12" cy="12" r="10" fill="#FFD0B8"/><path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" stroke="#E8875A" stroke-width="1.6" fill="none"/>';
  I.spark = '<path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z" fill="#9C90E3"/><circle cx="12" cy="12" r="2.4" fill="#F5C451"/>';
  I.link = '<rect x="2.5" y="4" width="19" height="17.5" rx="4" fill="#B5D4FA"/><rect x="2.5" y="4" width="19" height="6" rx="3" fill="#6FA4EE"/><path d="M8 15.5h8M14 13l2.5 2.5L14 18" stroke="#2B5C99" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  I.speaker = '<path d="M3 9.5v5h4l5 4.5v-14L7 9.5z" fill="#6FA4EE"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="#F28BA6" stroke-width="2" stroke-linecap="round" fill="none"/>';
  I.mic = '<rect x="8" y="2" width="8" height="13" rx="4" fill="#F28BA6"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="#A23B57" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3" stroke="#A23B57" stroke-width="2" stroke-linecap="round"/>';
  I.quiz = '<circle cx="12" cy="12" r="10" fill="#A8E3CB"/><text x="12" y="16.5" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="13" font-weight="700" fill="#1F6E55">?</text>';
  I.importW = '<rect x="4" y="18" width="16" height="3.5" rx="1.75" fill="#FFD9A8"/><path d="M12 3v11M7 9.5l5 5 5-5" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  I.import = '<rect x="4" y="18" width="16" height="3.5" rx="1.75" fill="#FFD9A8"/><path d="M12 3v11M7 9.5l5 5 5-5" stroke="#6A5ACD" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  // HR topic icons
  I.t1 = '<path d="M12 2 4 6v12l8 4 8-4V6z" fill="#C9C0F2"/><path d="M12 2v20l8-4V6z" fill="#9C90E3"/><circle cx="12" cy="12" r="3.2" fill="#F5C451"/>';
  I.t2 = '<circle cx="8" cy="8" r="4" fill="#F6B98E"/><circle cx="16" cy="9" r="3.4" fill="#B5D4FA"/><path d="M2 20c.6-4 3-6 6-6s5.4 2 6 6z" fill="#F6B98E"/><path d="M11 20c.5-3.4 2.4-5.2 5-5.2s4.5 1.8 5 5.2z" fill="#B5D4FA"/>';
  I.t3 = '<path d="M2 9 12 3l10 6z" fill="#9C90E3"/><rect x="4" y="10" width="2.6" height="8" fill="#C9C0F2"/><rect x="10.7" y="10" width="2.6" height="8" fill="#C9C0F2"/><rect x="17.4" y="10" width="2.6" height="8" fill="#C9C0F2"/><rect x="2" y="19" width="20" height="2.5" rx="1" fill="#9C90E3"/><circle cx="12" cy="6.6" r="1.4" fill="#F5C451"/>';
  I.t4 = '<circle cx="10" cy="10" r="7" fill="#B5D4FA"/><circle cx="10" cy="9" r="2.6" fill="#2B5C99"/><path d="M5.7 15c1-2 2.5-2.8 4.3-2.8s3.3.8 4.3 2.8" fill="#2B5C99"/><path d="M15 15l6 6" stroke="#F28BA6" stroke-width="3" stroke-linecap="round"/>';
  I.t5 = '<rect x="3" y="13" width="4.2" height="8" rx="1.4" fill="#FFD0B8"/><rect x="9.9" y="9" width="4.2" height="12" rx="1.4" fill="#F6B98E"/><rect x="16.8" y="5" width="4.2" height="16" rx="1.4" fill="#E8875A"/><path d="M3 9l6-4 4 3 7-6" stroke="#5BBF97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  I.t6 = '<path d="M12 21V11" stroke="#5BBF97" stroke-width="2.4" stroke-linecap="round"/><path d="M12 13c-4 0-7-2.5-7-7 4 0 7 2.5 7 7z" fill="#A8E3CB"/><path d="M12 11c0-4 2.6-7 7-7 0 4-2.6 7-7 7z" fill="#7FCFAE"/><rect x="7" y="19" width="10" height="3" rx="1.5" fill="#F6B98E"/>';
  I.t7 = '<circle cx="12" cy="12" r="9.5" fill="#F5C451"/><circle cx="12" cy="12" r="7" fill="#FFE7A3"/><text x="12" y="16" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="10" font-weight="700" fill="#9A6B00">Rp</text>';
  I.t8 = '<path d="M12 20.5C6 16.6 2.5 13.4 2.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 9.5 2.6c0 4.2-3.5 7.4-9.5 11.3z" fill="#F7A9BC"/><path d="M6.5 9a2.3 2.3 0 0 1 2.3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
  I.t9 = '<path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z" fill="#F28BA6"/><path d="M12 4.3l6 2.3v4.6c0 3.8-2.5 7-6 8.6z" fill="#F7C6D0"/><path d="M8.5 12l2.4 2.4 4.6-4.8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  I.t10 = '<rect x="2.5" y="3" width="19" height="14" rx="3" fill="#B5D4FA"/><path d="M6 13l3.5-3.5 3 2.5L18 7" stroke="#2B5C99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="9" y="18" width="6" height="3.5" rx="1" fill="#6FA4EE"/><circle cx="18" cy="7" r="1.8" fill="#F28BA6"/>';
  I.t11 = '<circle cx="12" cy="12" r="9.5" fill="#C9C0F2"/><path d="M12 2.5v19" stroke="#fff" stroke-width="1.6"/><path d="M5 9h5M14 9h5" stroke="#6A5ACD" stroke-width="2" stroke-linecap="round"/><path d="M6.5 9l-2 4.5h4zM17.5 9l-2 4.5h4z" fill="#F5C451"/>';
  I.t12 = '<path d="M3 20l3-11 6 5 6-5 3 11z" fill="#F6B98E"/><circle cx="6" cy="7.5" r="2" fill="#F5C451"/><circle cx="12" cy="4.5" r="2" fill="#F5C451"/><circle cx="18" cy="7.5" r="2" fill="#F5C451"/><rect x="3" y="18" width="18" height="3" rx="1.2" fill="#E8875A"/>';

  const OWL = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 24 L17 8 L27 18 Z" fill="#B3A8EC"/><path d="M51 24 L47 8 L37 18 Z" fill="#B3A8EC"/><ellipse cx="32" cy="37" rx="22" ry="22" fill="#C9C0F2"/><ellipse cx="32" cy="45" rx="12" ry="11" fill="#EDE8FF"/><circle cx="24" cy="32" r="8" fill="#fff"/><circle cx="40" cy="32" r="8" fill="#fff"/><circle cx="25" cy="33" r="3.6" fill="#2E2A45"/><circle cx="41" cy="33" r="3.6" fill="#2E2A45"/><circle cx="26.3" cy="31.6" r="1.2" fill="#fff"/><circle cx="42.3" cy="31.6" r="1.2" fill="#fff"/><path d="M29 40 L32 44 L35 40 Z" fill="#F6B98E"/><ellipse cx="16" cy="42" rx="4" ry="2.5" fill="#F7C6D0"/><ellipse cx="48" cy="42" rx="4" ry="2.5" fill="#F7C6D0"/></svg>';
  const OWL_HAPPY = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 24 L17 8 L27 18 Z" fill="#B3A8EC"/><path d="M51 24 L47 8 L37 18 Z" fill="#B3A8EC"/><ellipse cx="32" cy="37" rx="22" ry="22" fill="#C9C0F2"/><ellipse cx="32" cy="45" rx="12" ry="11" fill="#EDE8FF"/><circle cx="24" cy="32" r="8" fill="#fff"/><circle cx="40" cy="32" r="8" fill="#fff"/><path d="M20 33 Q24 29 28 33" stroke="#2E2A45" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M36 33 Q40 29 44 33" stroke="#2E2A45" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M29 40 L32 44 L35 40 Z" fill="#F6B98E"/><ellipse cx="16" cy="42" rx="4" ry="2.5" fill="#F7C6D0"/><ellipse cx="48" cy="42" rx="4" ry="2.5" fill="#F7C6D0"/></svg>';

  const HR_GROUPS = [
    { id: 'A', ink: '#6A5ACD', bg: '#EEEAFE', bar: '#6A5ACD', name: { id: 'Fondasi HR', en: 'HR Foundations' }, topics: [1, 2, 3] },
    { id: 'B', ink: '#2B5C99', bg: '#E0EEFF', bar: '#6FA4EE', name: { id: 'Fungsi Inti HR', en: 'Core HR Functions' }, topics: [4, 5, 6, 7, 8] },
    { id: 'C', ink: '#A23B57', bg: '#FCE4EA', bar: '#E0708F', name: { id: 'Spesialisasi Riset', en: 'Research Specialism' }, topics: [9, 10, 11], star: true },
    { id: 'D', ink: '#9A4A22', bg: '#FFE6D9', bar: '#E8875A', name: { id: 'Kepemimpinan & Perubahan', en: 'Leadership & Change' }, topics: [12] }
  ];
  const HR_TOPICS = {
    1: { en: 'Strategic HRM', id: 'Strategic HRM', prio: true },
    2: { en: 'Organizational Behaviour', id: 'Organizational Behaviour' },
    3: { en: 'HR in the Public Sector', id: 'HR di Sektor Publik' },
    4: { en: 'Talent Acquisition & Selection', id: 'Talent Acquisition & Selection' },
    5: { en: 'Performance Management', id: 'Performance Management' },
    6: { en: 'Learning & Development', id: 'Learning & Development' },
    7: { en: 'Reward & Compensation', id: 'Reward & Compensation' },
    8: { en: 'Employee Relations & Well-being', id: 'Employee Relations & Well-being' },
    9: { en: 'HR Ethics & Fraud Prevention', id: 'HR Ethics & Fraud Prevention', prio: true },
    10: { en: 'People Analytics', id: 'People Analytics', prio: true },
    11: { en: 'Behavioural Integrity', id: 'Behavioural Integrity' },
    12: { en: 'Leadership & Change', id: 'Leadership & Change' }
  };

  const PROFILE = {
    name: 'Annisa Putri Lestari Merdekawati',
    short: 'Putri',
    role: 'Kepala Bagian Layanan Manajemen Strategis 4 · OJK',
    goal: 'Direktur SDM',
    career: [
      { years: '2026 – kini', text: 'Kepala Bagian Layanan Manajemen Strategis 4, Departemen Organisasi, SDM dan Budaya' },
      { years: '2025 – 2026', text: 'Kepala Bagian Layanan Manajemen Strategis, Dept. Penegakan Integritas & Audit Khusus' },
      { years: '2023 – 2025', text: 'Kepala Subbagian (Administrasi, lalu Layanan Manajemen Strategis), Dept. Penegakan Integritas & Audit Khusus' },
      { years: '2019 – 2023', text: 'Analis, Anti-Fraud Handling Group' },
      { years: '2013 – 2019', text: 'Junior Auditor, Audit Internal OJK' },
      { years: '2008 – 2013', text: 'Staf Kepatuhan Internal, Bapepam-LK' }
    ],
    certs: [
      { name: 'Certified Fraud Examiner (CFE) · ACFE · 2021', status: 'active', note: 'CPE 2026: 2/20' },
      { name: 'PECB ISO 37001 Lead Implementer · 2021', status: 'expired', note: 'Habis 2024' },
      { name: 'PECB ISO 37001 Lead Auditor · 2021', status: 'expired', note: 'Habis 2024' },
      { name: 'BNSP Certified Integrity Officer · 2023', status: 'expired', note: 'Habis Feb 2026' }
    ],
    stories: [
      { title: 'OJK Integrity Awards 2021', s: 'Project leader; melibatkan seluruh satuan kerja OJK dalam pencegahan fraud.', t: '', a: '', r: '' },
      { title: 'OJK Anti-Fraud Strategy 2025', s: 'Project leader; upaya setahun meningkatkan maturitas strategi anti-fraud (assess, prevent, detect, respond).', t: '', a: '', r: '' }
    ],
    education: [
      'S1 Manajemen (Ekstensi) · Universitas Indonesia · 2017',
      'D3 Akuntansi · STEI · 2012',
      'D1 Administrasi Perpajakan · PKN STAN · 2008'
    ],
    pubs: ['Political Behaviours of Internal Auditors in the Indonesian Public Organisation · IJHCM 5(1), 2021 (penulis kedua)']
  };

  const DEADLINES = [
    { id: 'd1', title: 'Dokumen kampus Swedia', date: '2027-02-01', color: 'peach' },
    { id: 'd2', title: 'Portal SI Scholarship dibuka', date: '2027-02-08', color: 'sky' },
    { id: 'd3', title: 'Portal SI ditutup (14:59 CET)', date: '2027-02-24', color: 'rose' },
    { id: 'd4', title: 'Batas CPE CFE 2026', date: '2026-12-31', color: 'butter' }
  ];

  const IELTS = {
    L: { score: 6.5, target: 7.5 }, R: { score: 6.5, target: 7.5 },
    W: { score: 6.0, target: 7.0 }, S: { score: 6.0, target: 7.0 }
  };

  const TENSES = [
    { id: 'ps', en: 'Present Simple', f: 'S + V1(s/es)', use: { id: 'Kebiasaan, fakta umum, jadwal tetap', en: 'Habits, general facts, fixed schedules' }, ex: 'Our team reviews the risk register every month.' },
    { id: 'pc', en: 'Present Continuous', f: 'S + am/is/are + V-ing', use: { id: 'Sedang terjadi sekarang / rencana dekat', en: 'Happening now / arranged near future' }, ex: 'I am preparing my scholarship documents this week.' },
    { id: 'pp', en: 'Present Perfect', f: 'S + have/has + V3', use: { id: 'Pengalaman, hasil yang masih terasa sekarang', en: 'Experience, past action with present result' }, ex: 'I have worked at OJK since 2013.' },
    { id: 'ppc', en: 'Present Perfect Continuous', f: 'S + have/has been + V-ing', use: { id: 'Aktivitas dari dulu sampai sekarang (menekankan durasi)', en: 'Ongoing activity up to now (focus on duration)' }, ex: 'I have been working at this company for 18 years.' },
    { id: 'pas', en: 'Past Simple', f: 'S + V2', use: { id: 'Kejadian selesai di waktu lampau tertentu', en: 'Finished action at a specific past time' }, ex: 'I led the Integrity Awards project in 2021.' },
    { id: 'pac', en: 'Past Continuous', f: 'S + was/were + V-ing', use: { id: 'Sedang terjadi di suatu titik masa lalu', en: 'In progress at a past moment' }, ex: 'I was drafting the report when my director called.' },
    { id: 'pap', en: 'Past Perfect', f: 'S + had + V3', use: { id: 'Terjadi lebih dulu sebelum kejadian lampau lain', en: 'Earlier past, before another past event' }, ex: 'When I arrived, the meeting had already started.' },
    { id: 'papc', en: 'Past Perfect Continuous', f: 'S + had been + V-ing', use: { id: 'Durasi sebelum kejadian lampau lain', en: 'Duration before another past event' }, ex: 'She had been waiting for an hour before the bus came.' },
    { id: 'fs', en: 'Future Simple', f: 'S + will + V1', use: { id: 'Keputusan spontan, prediksi, janji', en: 'Spontaneous decisions, predictions, promises' }, ex: 'I will send the file after lunch.' },
    { id: 'fc', en: 'Future Continuous', f: 'S + will be + V-ing', use: { id: 'Sedang berlangsung di waktu tertentu nanti', en: 'In progress at a future time' }, ex: 'This time next year, I will be studying in Sweden.' },
    { id: 'fp', en: 'Future Perfect', f: 'S + will have + V3', use: { id: 'Sudah selesai sebelum waktu tertentu nanti', en: 'Completed before a future time' }, ex: 'By February, I will have submitted all my documents.' },
    { id: 'fpc', en: 'Future Perfect Continuous', f: 'S + will have been + V-ing', use: { id: 'Durasi sampai waktu tertentu nanti', en: 'Duration up to a future time' }, ex: 'By 2027, I will have been working in public service for 19 years.' },
    { id: 'pfs', en: 'Past Future Simple', f: 'S + would + V1', use: { id: 'Masa depan dilihat dari masa lalu', en: 'Future seen from the past' }, ex: 'I knew I would apply for a master’s degree one day.' },
    { id: 'pfc', en: 'Past Future Continuous', f: 'S + would be + V-ing', use: { id: 'Sedang berlangsung di masa depan-dari-masa-lalu', en: 'In progress in a future-in-the-past' }, ex: 'She said she would be travelling on Monday.' },
    { id: 'pfp', en: 'Past Future Perfect', f: 'S + would have + V3', use: { id: 'Pengandaian yang tidak terjadi (conditional 3)', en: 'Unreal past result (third conditional)' }, ex: 'If I had had permission, I would have gone to Sussex in 2024.' },
    { id: 'pfpc', en: 'Past Future Perfect Continuous', f: 'S + would have been + V-ing', use: { id: 'Durasi dalam pengandaian masa lalu', en: 'Duration in an unreal past' }, ex: 'By now, I would have been studying for a year.' }
  ];

  const SPEAKING = {
    p1: [
      'Do you work or are you a student?', 'What do you like most about your job?', 'How do you usually spend your weekends?',
      'Do you prefer reading on paper or on a screen? Why?', 'How often do you use public transport?', 'What kind of music do you enjoy?',
      'Do you like cooking? Why or why not?', 'Is there a skill you would like to learn in the future?', 'How do you usually celebrate holidays in your family?',
      'Do you think it is important to plan your day?'
    ],
    p2: [
      { topic: 'Describe a project you led that you are proud of.', points: ['what the project was', 'who was involved', 'what challenges you faced', 'and explain why you are proud of it'] },
      { topic: 'Describe a person who has influenced your career.', points: ['who this person is', 'how you know them', 'what they taught you', 'and explain why they were important to you'] },
      { topic: 'Describe a time when you had to learn something new quickly.', points: ['what you had to learn', 'why you had to learn it quickly', 'how you learned it', 'and explain how you felt about it'] },
      { topic: 'Describe a book or article that changed the way you think.', points: ['what it was', 'when you read it', 'what it was about', 'and explain how it changed your thinking'] },
      { topic: 'Describe a place in your city where you like to relax.', points: ['where it is', 'how often you go there', 'what you do there', 'and explain why it is relaxing for you'] },
      { topic: 'Describe a goal you want to achieve in the next five years.', points: ['what the goal is', 'why you chose it', 'what you are doing to reach it', 'and explain how your life will change'] },
      { topic: 'Describe a time when you helped someone at work.', points: ['who you helped', 'what the problem was', 'how you helped', 'and explain how you felt afterwards'] },
      { topic: 'Describe a rule at your workplace that you think is useful.', points: ['what the rule is', 'when it was introduced', 'how people follow it', 'and explain why you think it is useful'] }
    ],
    p3: [
      'Why do some employees act dishonestly even when they earn a good salary?', 'How can organisations encourage people to report wrongdoing?',
      'Should governments invest more in adult education? Why?', 'How has technology changed the way people work in offices?',
      'What qualities make a good leader in the public sector?', 'Do you think working from home will become more common in the future?'
    ]
  };

  const WRITING = {
    t2: [
      'Some people believe that organisations should focus on preventing employee fraud through strict controls, while others think a strong ethical culture is more effective. Discuss both views and give your own opinion.',
      'Many employees now stay in the same organisation for most of their careers. What are the advantages and disadvantages of this?',
      'Some people think that older adults should not go back to university because it is too late. To what extent do you agree or disagree?',
      'Governments should pay public-sector workers the same salaries as similar jobs in the private sector. To what extent do you agree or disagree?',
      'In many countries, people are working longer hours than in the past. What are the causes of this, and what can be done to solve the problem?',
      'Some say that studying abroad is the best way to develop both professionally and personally. Do the advantages outweigh the disadvantages?',
      'Technology allows employers to monitor their staff more closely than ever. Is this a positive or negative development?',
      'Some people think that leaders are born, while others believe leadership can be learned. Discuss both views and give your opinion.'
    ],
    t1: [
      { prompt: 'The table below shows the percentage of employees who took part in training programmes in four departments of an organisation in 2015, 2020 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        table: { head: ['Department', '2015', '2020', '2025'], rows: [['Finance', '32%', '45%', '61%'], ['HR', '48%', '52%', '74%'], ['IT', '55%', '70%', '68%'], ['Legal', '20%', '28%', '35%']] } },
      { prompt: 'The table below shows the average number of hours per week spent on different work activities by managers in 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        table: { head: ['Activity', '2010', '2025'], rows: [['Meetings', '9', '14'], ['Emails & messages', '7', '11'], ['Planning', '8', '5'], ['Coaching staff', '6', '4'], ['Reports', '10', '6']] } },
      { prompt: 'The table below shows the reasons employees gave for leaving their jobs in one company in 2024, by age group. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        table: { head: ['Reason', 'Under 30', '30–45', 'Over 45'], rows: [['Better pay elsewhere', '41%', '33%', '18%'], ['Career growth', '29%', '27%', '12%'], ['Work–life balance', '17%', '25%', '30%'], ['Retirement / health', '1%', '3%', '31%'], ['Other', '12%', '12%', '9%']] } }
    ]
  };

  const STORIES = [
    { id: 's1', title: 'Eighteen Years and Counting', focus: 'Present Perfect', level: 'B2', text: 'Maya has worked at the same organisation since 2008. She has seen many changes, and she has learned to work with every new colleague. Over the years, she has moved from audit to fraud prevention and then to strategy. This year, she has started preparing for a master’s degree abroad. Her friends ask, "Have you ever felt too old to study?" Maya smiles. "Never. I have only just begun." She has already written two motivation letters, and she has booked time every evening to practise English. She has not finished yet, but she has never felt more ready.' },
    { id: 's2', title: 'The Missing Receipt', focus: 'Past Simple & Past Continuous', level: 'B1', text: 'Last Tuesday, Dimas was checking the travel claims when he noticed something strange. One receipt looked different from the others. While he was comparing the dates, his manager walked in. "Is everything fine?" she asked. Dimas showed her the receipt. The hotel name was correct, but the stamp was missing. They called the hotel together. The receptionist was very helpful. She explained that the guest had stayed only one night, not three. Dimas wrote a short report and sent it before lunch. Later that week, the team changed the claim form so that every receipt needed a stamp.' },
    { id: 's3', title: 'A Letter to Next Year', focus: 'Future Forms', level: 'B2', text: 'Dear me, by the time you read this letter, you will have finished your applications. You will probably be waiting for the results, and you will be checking your email too often. Do not worry. Whatever happens, you will have learned a lot. Next year, you might be sitting in a classroom in Sweden, or you might be leading a new project at home. Either way, you will be using the English you are practising today. Tonight, I am going to write one more paragraph, and tomorrow I will review my mistakes. Small steps are going to take you far.' }
  ];

  window.PS_CONTENT = { I, OWL, OWL_HAPPY, HR_GROUPS, HR_TOPICS, PROFILE, DEADLINES, IELTS, TENSES, SPEAKING, WRITING, STORIES };
})();
