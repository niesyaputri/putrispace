/* Putri Space · Listening Library content (IELTS Academic) · from "IELTS Academic · The Band 7.5 Study Book", Section B · Created by CreanovativeCo */
/* Script line: [speaker, text, spokenText?]  ·  voices: f / f2 = female voices, m / m2 = male voices
   Question: text {q, hint, a:[accepted…]} · choice {q, o:[…], a:'B'} · letter {q, letters:'ABCDE', a:'A'} · open {q, hint, open:true, sample} */
window.PS_LISTEN = {
  groups: [
    { id: 'Q', name: { id: 'Tipe soal & strategi', en: 'Question types & strategy' }, ink: '#2B5C99', bg: '#E0EEFF' },
    { id: 'P', name: { id: 'Bagian tes & prediksi', en: 'Test parts & prediction' }, ink: '#6B4E00', bg: '#FFF4D6' },
    { id: 'A', name: { id: 'Latihan audio (seperti tes)', en: 'Audio practice (test style)' }, ink: '#8E3049', bg: '#FCE4EA' }
  ],
  reasons: [
    { id: 'distractor', id_: 'Terkecoh distraktor', en: 'Distractor' },
    { id: 'synonym', id_: 'Tidak kenal sinonim/parafrase', en: 'Missed the synonym' },
    { id: 'spelling', id_: 'Ejaan / angka', en: 'Spelling / numbers' },
    { id: 'limit', id_: 'Batas kata / bentuk kata', en: 'Word limit / word form' },
    { id: 'lost', id_: 'Kehilangan posisi', en: 'Lost my place' }
  ],
  lessons: [
    /* ================= B1 ================= */
    {
      id: 'b1', code: 'B1', group: 'Q', page: 11, title: 'Form Completion', sub: "Part 1's favourite: names, numbers, dates and details",
      idea: { en: 'Read the gaps first, predict the kind of word, then wait for the final answer — not the first one you hear.', id: 'Baca isian dulu, tebak jenis katanya, lalu tunggu jawaban TERAKHIR — bukan yang pertama terdengar.' },
      steps: [
        'Read the instruction and circle the word limit (e.g. ONE WORD AND/OR A NUMBER).',
        'Predict each gap: a surname, a date, a price, a noun? Write a tiny note (£ / n. / date) next to it.',
        'Follow the form order — answers come in the same order as the questions.',
        'Listen for the final version: speakers change, correct and spell things.',
        'Check capitals, spelling and plurals in the 2 minutes at the end.'
      ],
      tips: [
        'Names are usually spelt letter by letter — practise the English alphabet, especially A/E/I, G/J and B/V.',
        '"Double L" means LL; "double-u" is W.',
        'Corrections are the No. 1 trap: "It\'s 14 — oh no, sorry, 40." Always wait for the end of the sentence.',
        'Words already on the form are not repeated in your answer (if the form says "£ ___", write only the number).',
        'Numbers: "oh" in phone numbers is 0; "double 3" is 33.',
        'If you miss one gap, move on immediately — the next answer will not wait for you.'
      ],
      ex: {
        q: 'Questions 1–4 · Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.',
        voices: { Clerk: 'f', Sarah: 'f2' },
        script: [
          ['Clerk', 'Can I take your surname?'],
          ['Sarah', "Yes, it's Whitfield — W-H-I-T-F-I-E-L-D.", "Yes, it's Whitfield. W, H, I, T, F, I, E, L, D."],
          ['Clerk', 'And your date of birth?'],
          ['Sarah', "The thirteenth of May… no, sorry, I always say that — it's the thirtieth. 30th May, 1991.", "The thirteenth of May… no, sorry, I always say that. It's the thirtieth. The thirtieth of May, nineteen ninety-one."],
          ['Clerk', 'We have standard, off-peak and family memberships.'],
          ['Sarah', "My friend has the family one, but I work days, so I'll take off-peak."],
          ['Clerk', 'Off-peak is £32 a month, rising to £35 in January.']
        ],
        walk: [
          ['Gap 1 needs a surname.', 'Predict "spelling coming" — write the letters as they are said, then check: W-H-I-T-F-I-E-L-D.'],
          ['Gap 2 needs a date. The first date is corrected.', '"No, sorry" signals a correction: cross out 13th and write 30th May.'],
          ['Gap 3 needs a type of membership. Two types are mentioned.', '"My friend has the family one" is a distractor — the speaker chooses OFF-PEAK for herself.'],
          ['Gap 4 needs a number only (the £ is printed).', 'Two prices: the fee now is 32; 35 is a future price → answer 32.']
        ],
        answer: '1 Whitfield · 2 30th May / 30 May · 3 off-peak · 4 32'
      },
      mistakes: [
        ['Writing "13 May" (the first number heard)', 'Waiting for the correction: "30 May"'],
        ['"Withfield" (sounds-like spelling)', 'Writing exactly the letters spelt'],
        ['"£32" when £ is printed', '"32"'],
        ['"family" because it was mentioned first', 'The option the speaker actually chooses: "off-peak"']
      ],
      band: {
        label: 'listener',
        b6: 'Writes the first answer heard, does not predict, and loses time trying to recover a missed gap. Typical score: 7/10 on Part 1.',
        b7: 'Predicts each gap, writes small notes (n./£/date), waits for the end of each turn, skips a missed gap quickly and checks spelling at the end. Typical score: 9–10/10.',
        why: ['Part 1 is the easiest place to collect 9–10 marks — losing 3 here costs a half band.', 'Prediction tells your brain what to listen for; waiting beats the correction trap.']
      },
      practice: {
        instr: 'Questions 1–5 · Complete the booking form. ONE WORD AND/OR A NUMBER.',
        voices: { Agent: 'f', Man: 'm' },
        script: [
          ['Agent', 'City Tours, how can I help?'],
          ['Man', "I'd like to book the harbour cruise for Saturday. The name's Dominic Okafor — O-K-A-F-O-R.", "I'd like to book the harbour cruise for Saturday. The name's Dominic Okafor. O, K, A, F, O, R."],
          ['Agent', 'How many people?'],
          ['Man', "Four adults… actually my sister can't come, so three."],
          ['Agent', 'The morning cruise leaves at 9.45, the afternoon one at 2.15.', 'The morning cruise leaves at nine forty-five, the afternoon one at two fifteen.'],
          ['Man', 'Afternoon, please. My children hate early starts.'],
          ['Agent', 'Tickets are £18 each. Your contact number?'],
          ['Man', "07791 438 226. And we'll park at the north gate, not the station.", "Oh seven seven nine one, four three eight, two two six. And we'll park at the north gate, not the station."]
        ],
        qs: [
          { q: 'Surname:', hint: 'spelling', a: ['Okafor'] },
          { q: 'Number of people:', hint: 'watch the correction', a: ['3', 'three'], key: '3 / three (the first number is corrected)' },
          { q: 'Departure time:', hint: 'two times', a: ['2.15', '2:15', '2.15 pm', '2:15 pm', '2.15pm', '2:15pm', '14.15', '14:15'], key: '2.15 / 2:15 (pm) — afternoon is chosen' },
          { q: 'Price per ticket: £', hint: '£ printed', a: ['18'] },
          { q: 'Meeting point: ___ gate', hint: 'distractor: station', a: ['north'] }
        ]
      },
      vocab: [['surname / family name', 'last name'], ['postcode', 'e.g. CB2 4LT (letters + numbers)'], ['off-peak', 'at quieter, cheaper times'], ['deposit', 'money paid first to reserve something'], ['reference number', 'code for a booking'], ['"No, sorry, I mean…"', 'correction signal']],
      quick: ['Say the alphabet aloud daily for one week.', 'Write numbers as digits (30, not thirty) to save time.', 'Use CAPITALS on paper if your handwriting is unclear.'],
      killers: ['Writing two answers ("13/30") — it is marked wrong', 'Missing capital letters is fine, but missing letters is not', 'Repeating printed words and going over the word limit']
    },
    /* ================= B2 ================= */
    {
      id: 'b2', code: 'B2', group: 'Q', page: 13, title: 'Multiple Choice', sub: 'Choose the meaning, not the matching word',
      idea: { en: 'All three options are usually mentioned — only one matches what the speaker actually means.', id: 'Biasanya ketiga pilihan disebut — hanya satu yang sesuai dengan MAKSUD pembicara.' },
      steps: [
        'Read the stem (the question) and underline its key idea, e.g. main reason, most worried about.',
        'Paraphrase the options in your head: "A = too expensive → cost, budget, can\'t afford".',
        'Expect all options to appear. Speakers often reject or change their mind about two of them.',
        'Listen for agreement words: exactly, that\'s the main thing, I\'d go with… and rejection words: not really, apart from, although.',
        'Choose and move on — mark a guess if unsure; never leave a blank.'
      ],
      tips: [
        'The option using the same word as the audio is often the trap; the correct one is usually a paraphrase.',
        'Watch who is speaking: the question may ask what the tutor thinks, not the student.',
        '"Which TWO…" questions: two answers, often in any order — but each must be a separate box on computer.',
        'Use the pause before each part to read all options — reading while listening is too slow for MCQs.',
        'Qualifiers decide answers: mainly, first, most, only, not.',
        'If two options seem right, check the stem again — one usually answers a different question.'
      ],
      ex: {
        q: 'Question 11 · What is the main reason the speaker changed the opening hours?',
        voices: { Manager: 'm' },
        script: [['Manager', "People assume we changed the hours because of noise complaints. We did have a few letters from neighbours, but honestly that wasn't a big issue. Energy prices did go up, of course, though our solar panels covered most of it. What really decided it was that after 7 pm the library was almost empty — on some nights fewer than five people came in."]],
        walk: [
          ['Underline main reason — not "a reason".', 'The stem asks for the deciding factor, so expect two minor reasons first.'],
          ['A is mentioned (neighbours\' letters) but rejected: "that wasn\'t a big issue".', 'Rejection words cancel an option even when its words match.'],
          ['B is mentioned but weakened: "solar panels covered most of it".', 'Though introduces a contrast — B is not the main reason.'],
          ['C is a paraphrase: "after 7 pm… almost empty… fewer than five people".', 'The correct answer uses different words: fall in evening visitors.']
        ],
        answer: 'C — "what really decided it" signals the main reason.'
      },
      mistakes: [
        ['Choosing A because "complaints" ≈ "letters"', 'Checking whether the speaker accepts or rejects it'],
        ['Answering what the student thinks when asked about the tutor', 'Underlining who in the stem'],
        ['Reading options only while the audio plays', 'Reading all options in the pause'],
        ['Leaving a blank when unsure', 'Always choosing the best guess']
      ],
      band: {
        label: 'thinking',
        b6: '"I heard complaints, and A says complaints → A." (word matching)',
        b7: '"Complaints were mentioned, then rejected (wasn\'t a big issue). The decision word really decided it points to the paraphrase of C." (meaning matching)',
        why: ['IELTS tests understanding of attitude and purpose, not word spotting.', 'Tracking accept/reject language turns 50/50 guesses into sure answers.']
      },
      practice: {
        instr: 'Questions 1–4 · Choose the correct letter, A, B or C.',
        voices: { Tutor: 'm', Mei: 'f' },
        script: [
          ['Tutor', 'So, Mei, which topic will you choose for your project?'],
          ['Mei', "I thought about urban gardens, but there's so much research on it already. Food waste in canteens is more original, and I can collect my own data here on campus."],
          ['Tutor', 'Good. What worries you most?'],
          ['Mei', "Not the time — I've planned that. I'm more nervous about getting enough people to answer the questionnaire."],
          ['Tutor', 'Offer a small incentive. And present your findings as a poster rather than a written report — the department prefers it this year.'],
          ['Mei', "A poster? I'd expected a presentation. OK, a poster it is."]
        ],
        qs: [
          { q: 'Mei chooses her topic because she can', o: ['find lots of research', 'gather original data', 'finish quickly'], a: 'B', hint: 'same word ≠ answer', key: 'B — "I can collect my own data"; lots of research is a reason against urban gardens.' },
          { q: 'Mei is mainly worried about', o: ['time', 'the questionnaire design', 'the number of participants'], a: 'C', hint: 'rejection word', key: 'C — "getting enough people to answer"; time is rejected.' },
          { q: 'The tutor suggests', o: ['an incentive', 'a smaller sample', 'a longer deadline'], a: 'A', hint: 'paraphrase', key: 'A — "offer a small incentive".' },
          { q: 'The findings will be presented as a', o: ['report', 'poster', 'talk'], a: 'B', hint: 'final decision', key: 'B — the final decision is a poster.' }
        ]
      },
      vocab: [['mainly / primarily', 'the most important'], ['rule out', 'reject an option'], ['"That wasn\'t really the issue"', 'rejection signal'], ['"What tipped the balance was…"', 'main reason signal'], ['incentive', 'a small reward to encourage people']],
      quick: ['Paraphrase options during the pause — 5 seconds each.', "Mark the stem's qualifier (main/first/not).", 'Listen to the end of the turn before deciding.'],
      killers: ['Word-matching without checking meaning', 'Changing an answer because a later word "sounds similar"', 'Getting stuck on one question and missing the next two']
    },
    /* ================= B3 ================= */
    {
      id: 'b3', code: 'B3', group: 'Q', page: 15, title: 'Map and Plan Labelling', sub: 'Follow the speaker like a GPS',
      idea: { en: "Find your starting point, then move with the speaker's directions — the labels come in route order.", id: 'Temukan titik awal, lalu ikuti arah pembicara — label muncul sesuai urutan rute.' },
      steps: [
        'Study the plan in the pause: find the entrance/"You are here" and the compass.',
        'Name what is already labelled so you can follow the speaker (lake, greenhouse, car park).',
        'Trace the route with your pen while listening; keep your finger where the speaker is.',
        'Match each place to a letter only when the position is confirmed.',
        'Use elimination — some letters are never used.'
      ],
      tips: [
        'Learn position phrases in pairs: in front of / behind, opposite / next to, to the left of / to the right of.',
        '"Opposite" means across a path or road — not next to it.',
        "Left and right are from the speaker's walking direction, not from the page — rotate the map in your mind.",
        'Distractors: "People think the café is by the car park, but actually…"',
        'If the speaker uses compass points, check the N arrow — north is not always at the top.',
        'Letters on a map task are usually more than the questions — expect 2 unused.'
      ],
      ex: {
        q: 'Questions 15–17 · Label the plan. Choose the correct letter, A–E. (15 Tool shed · 16 Herb garden · 17 Café)',
        voices: { Guide: 'f' },
        script: [['Guide', "Come in through the entrance at the bottom of the plan. Immediately on your left is the tool shed, so you can collect gloves on the way in. Walk up the central path and you'll see the lake on your left. The herb garden is squeezed in between the lake and the path. Now, lots of people expect the café to be beside the car park, but in fact it's on the right of the path, just below the greenhouse."]],
        walk: [
          ['Start at the entrance, facing up the map.', 'Your left = the left of the page here, because you walk "up" the plan.'],
          ['"Immediately on your left" from the entrance → the letter beside it.', 'Positions right next to the start point usually come first.'],
          ['"Between the lake and the path" → the narrow space at B.', 'Between = two landmarks, one on each side.'],
          ['Café: car park is a distractor; "just below the greenhouse" → C.', '"In fact" introduces the correct answer after a trap.']
        ],
        answer: '15 E · 16 B · 17 C (A and D are not used)'
      },
      mistakes: [
        ['Confusing opposite and next to', 'Opposite = facing, across something'],
        ['Using page left/right when the speaker walks down the map', "Turning the map to the speaker's direction"],
        ['Writing the place name instead of the letter', 'Writing only the letter (A–E)'],
        ['Choosing the first location mentioned', 'Waiting for "actually / in fact"']
      ],
      band: {
        label: 'map strategy',
        b6: 'Looks at the map for the first time when the audio starts and tries to find each place from scratch.',
        b7: 'Uses the pause to locate the entrance and compass, names all landmarks, then follows the route with a pen tip — the eyes are already where the speaker is going.',
        why: ['Map questions move fast; the listener who knows the landmarks only has to follow.', 'Route tracing means you never "lose your place".']
      },
      practice: {
        instr: 'Questions 1–4 · Label the plan. Choose the correct letter, A–E.',
        img: 'b3-practice', imgAlt: 'Westbrook Library · ground floor',
        voices: { Librarian: 'f' },
        script: [['Librarian', "Come in through the main doors and reception is straight ahead of you. The quiet study room is to the left of reception, in the bottom-left part of the building. Walk past reception to the corridor. Above the corridor there are two rooms between the stairs and the lifts — the computer room is the one nearer the stairs. Many people think the café is next to the lifts, but actually it's on the right-hand side, near the bottom. The printing room is directly below the lifts."]],
        qs: [
          { q: 'Quiet study room', letters: 'ABCDE', a: 'A', hint: 'left of reception' },
          { q: 'Computer room', letters: 'ABCDE', a: 'B', hint: 'nearer the stairs', key: 'B (C is the other room, nearer the lifts — unused)' },
          { q: 'Café', letters: 'ABCDE', a: 'D', hint: 'distractor: lifts' },
          { q: 'Printing room', letters: 'ABCDE', a: 'E', hint: 'directly below' }
        ]
      },
      vocab: [['adjacent to', 'next to'], ['opposite', 'facing, on the other side'], ['in the far corner', 'the corner furthest away'], ['diagonally across from', 'opposite but not straight'], ['carry on / continue past', 'keep walking beyond'], ['clockwise / anti-clockwise', 'direction of a circle']],
      quick: ["Draw an arrow on the map to show the speaker's direction.", 'Say "left/right" quietly with your hand on that side.', 'Cross out letters as you use them.'],
      killers: ['Ignoring the compass arrow', 'Trying to label every letter', 'Panicking after one missed label — keep following the route']
    },
    /* ================= B4 ================= */
    {
      id: 'b4', code: 'B4', group: 'Q', page: 17, title: 'Matching', sub: 'Link speakers, places or items to features in the box',
      idea: { en: 'The questions follow the audio order, the options do not — keep the option box in view and listen for paraphrase.', id: 'Nomor soal mengikuti urutan audio, kotak pilihan TIDAK — selalu lihat kotak pilihan dan dengarkan parafrasenya.' },
      steps: [
        'Read the instruction: can an option be used more than once? Circle the answer.',
        'Paraphrase the box (A–G) before the audio: "expensive → costs a lot, pricey, not cheap".',
        'Follow the numbered list (the people/places), which comes in audio order.',
        "Listen for the speaker's final judgement on each item, then pick the matching option.",
        'Cross out used options only if each is used once.'
      ],
      tips: [
        'There are usually more options than questions — some are never used.',
        'The audio rarely uses the exact words in the box; crowded may be "you can hardly move".',
        'Each item gets discussed; the answer often comes after a contrast word (but, however, actually).',
        'Keep the box short in your memory: write a 1-word note next to each option.',
        'If two options both fit, listen for which one the speaker emphasises or calls the main thing.',
        'On computer, drag-and-drop answers can be moved — check them at the end.'
      ],
      ex: {
        q: 'Questions 21–23 · What does the student say about each museum? Choose THREE answers from A–E. (A too crowded · B good for children · C hard to reach · D free entry · E recently renovated)',
        voices: { Student: 'f' },
        script: [['Student', "The Science Museum was packed — we could barely see the displays. The Maritime Museum is lovely, but you need two buses to get there, and nothing runs on Sundays. People say the Textile Museum is free, but actually there's a £6 charge now. Still, the whole building was redone last year and it looks fantastic."]],
        walk: [
          ['21: "packed… could barely see" = A too crowded.', 'Paraphrase: packed is a synonym of crowded.'],
          ['22: "two buses… nothing on Sundays" = C hard to reach.', '"Lovely" is praise, but no option says "lovely" — focus on the detail.'],
          ['23: "free" is mentioned, then corrected (£6).', '"People say… but actually" = trap → D is wrong.'],
          ['23: "redone last year" = E recently renovated.', 'Redone ≈ renovated; B (children) is never mentioned.']
        ],
        answer: '21 A · 22 C · 23 E'
      },
      mistakes: [
        ['Choosing D because "free" was heard', 'Hearing the correction "actually there\'s a £6 charge"'],
        ['Losing the place because the box is in a different order', 'Following the numbered list, not the box'],
        ['Using an option twice when the instruction forbids it', 'Reading "You may use any letter more than once" carefully'],
        ['Writing the option text instead of the letter', 'Writing A–E']
      ],
      band: {
        label: 'preparation',
        b6: 'Reads the option box once quickly and listens for the same words.',
        b7: 'Writes a quick paraphrase beside each option (crowded → packed, busy, full), so a synonym in the audio is recognised instantly.',
        why: ['Matching is 100% paraphrase; preparing synonyms is preparing answers.', 'Fast recognition leaves time for the next item.']
      },
      practice: {
        instr: 'Questions 1–4 · What does Rina say about each work placement? Choose from A–F.',
        box: ['A well paid', 'B unpaid', 'C long working hours', 'D good support from a manager', 'E variety of departments', 'F near home'],
        voices: { Rina: 'f' },
        script: [['Rina', 'At the bank, the hours were long — I often stayed until eight. The hospital placement was different: I worked with nurses, doctors and the IT team, so I learnt about lots of roles. The design agency paid nothing, unfortunately, although the people were friendly. And the council office? I expected it to be dull, but my supervisor gave me real projects and lots of feedback.']],
        qs: [
          { q: 'Bank', letters: 'ABCDEF', a: 'C', hint: 'paraphrase: stayed until eight', key: 'C (long hours)' },
          { q: 'Hospital', letters: 'ABCDEF', a: 'E', hint: 'nurses, doctors, IT', key: 'E (variety of departments)' },
          { q: 'Design agency', letters: 'ABCDEF', a: 'B', hint: 'ignore "friendly"', key: 'B (unpaid — "paid nothing")' },
          { q: 'Council office', letters: 'ABCDEF', a: 'D', hint: 'contrast: expected vs reality', key: 'D (good support from a manager)' }
        ]
      },
      vocab: [['packed / crowded / overcrowded', 'too many people'], ['inaccessible / hard to get to', 'difficult to reach'], ['complimentary', 'free'], ['refurbished / renovated / redone', 'repaired and improved'], ['supportive', 'helpful, encouraging'], ['varied', 'with many different parts']],
      quick: ['Write synonyms next to each option in the pause.', 'Track items in order; ignore the box order.', 'Expect one or two options to be unused.'],
      killers: ['Matching on a single shared word', 'Getting lost in the box while the speaker moves on', 'Forgetting to check whether options can be reused']
    },
    /* ================= B5 ================= */
    {
      id: 'b5', code: 'B5', group: 'Q', page: 19, title: 'Sentence Completion', sub: 'Grammar tells you the word before the audio does',
      idea: { en: 'The sentence must still be grammatical and true after you add your word — use grammar to predict it.', id: 'Kalimat harus tetap benar secara grammar dan isi setelah diisi — pakai grammar untuk menebak katanya.' },
      steps: [
        'Read the full sentence, not only the gap, and circle the word limit.',
        'Predict the part of speech: after a/an → singular noun; after more → adjective or noun; after to → verb.',
        'Expect a paraphrase: the sentence on the page is a rewrite of the audio.',
        'Write words you hear — do not change their form unless the grammar forces it.',
        'Read the completed sentence to check grammar and meaning.'
      ],
      tips: [
        '"an ___" means the answer starts with a vowel sound (an expert, an hour).',
        'A plural verb after the gap (___ are) means a plural noun — keep the -s you hear.',
        'Hyphenated words count as one word (part-time).',
        'Contractions do not help you — "don\'t" in the audio may appear as "not" in the sentence.',
        'Answers are usually key content words (nouns, numbers), rarely linking words.',
        'If two words fit, the word limit often decides: ONE WORD ONLY → "temperature", not "the temperature".'
      ],
      ex: {
        q: 'Questions 31–33 · Complete the sentences. Write NO MORE THAN TWO WORDS.',
        voices: { Lecturer: 'm' },
        script: [['Lecturer', 'For centuries, bees were kept in hollow logs — tree trunks, really — which meant the colony had to be destroyed to collect anything. The movable-frame hive changed that, because the honeycomb could be lifted out and returned. Today, pesticides are a concern, but the most serious threat is an invasive parasite, the varroa mite.']],
        walk: [
          ['31: after hollow we need a plural noun.', 'Grammar predicts the form: LOGS (not "log").'],
          ['32: remove ___ → a noun. The audio says "honeycomb could be lifted out".', 'lifted out = remove; the answer is the noun after it: HONEYCOMB.'],
          ['33: an ___ → a vowel sound; mainly = "most serious".', 'Pesticides are mentioned first but not as the main threat; "an invasive parasite" fits the article an (two words ✓).']
        ],
        answer: '31 logs · 32 honeycomb · 33 invasive parasite'
      },
      mistakes: [
        ['"log" when the sentence needs a plural', 'Keeping the plural you hear: "logs"'],
        ['"the varroa mite" (3 words) when the limit is two', 'Fitting the limit: "invasive parasite"'],
        ['Changing "lifted" to "lift" to sound correct', 'Writing words as heard unless grammar requires a change'],
        ['Writing a pesticide answer because it came first', 'Checking the qualifier mainly']
      ],
      band: {
        label: 'habit',
        b6: 'Listens for the words in the sentence and writes whatever comes next.',
        b7: 'Predicts "plural noun, vowel sound, two words max", hears the paraphrase, then reads the finished sentence to confirm grammar and meaning.',
        why: ['Grammar prediction filters out wrong candidates before you hear them.', 'Re-reading catches the plural and article errors that cost Band 7 candidates easy marks.']
      },
      practice: {
        instr: 'Questions 1–5 · Complete the sentences. NO MORE THAN TWO WORDS AND/OR A NUMBER.',
        voices: { Lecturer: 'f' },
        script: [['Lecturer', 'Desert plants survive with very little water. Cacti store water in their thick stems rather than in leaves, which have become spines. These spines also create a layer of still air that reduces water loss. Many desert plants open their pores only at night, when temperatures fall. Seeds of some species can stay dormant for up to 50 years, waiting for rain. Researchers are now studying these plants to develop crops for dry farmland.']],
        qs: [
          { q: 'Cacti store water in their ___.', hint: 'plural noun', a: ['stems', 'thick stems'], key: '(thick) stems' },
          { q: 'Spines trap a layer of ___ that limits water loss.', hint: 'two words', a: ['still air'] },
          { q: 'Pores open only at ___.', hint: 'one word', a: ['night'] },
          { q: 'Some seeds remain inactive for as long as ___ years.', hint: 'number', a: ['50', 'fifty'] },
          { q: 'Scientists hope to create ___ for dry farmland.', hint: 'paraphrase: develop', a: ['crops'] }
        ]
      },
      vocab: [['colony', 'a group of insects living together'], ['invasive', 'spreading where it is not native'], ['dormant / inactive', 'alive but not growing'], ['remove / extract / lift out', 'take out'], ['threat to', 'danger to']],
      quick: ['Underline the words just before and after the gap.', 'Expect synonyms for the verbs in the sentence.', 'Count words in your answer before moving on.'],
      killers: ['Breaking the word limit', 'Losing plural -s', 'Writing an answer that makes the sentence ungrammatical']
    },
    /* ================= B6 ================= */
    {
      id: 'b6', code: 'B6', group: 'Q', page: 21, title: 'Note, Table and Flow-chart Completion', sub: 'Use the layout as a map of the talk',
      idea: { en: 'Headings show you what is coming; the gaps follow the order of the talk, line by line.', id: 'Judul/heading menunjukkan apa yang akan datang; isian mengikuti urutan pembicaraan, baris demi baris.' },
      steps: [
        'Read the headings and labels to understand the structure (stages, columns, categories).',
        'Predict every gap: number, noun, adjective? Note it in the margin.',
        'For tables, read across then down — answers usually move left to right, row by row.',
        'For flow-charts, each box is a step; listen for sequence words (first, once, after that).',
        'Check that your word fits the style of the column (all nouns, all numbers).'
      ],
      tips: [
        'Notes are short: the audio is a full sentence, the notes keep only the key word.',
        'Table columns are consistent — if the other cells are prices, your answer is a price.',
        'Flow-charts often use verbs in a different form (audio: "it is heated" → chart: "heating").',
        'Watch for steps the speaker says are no longer used — they are distractors.',
        'Do not write a whole phrase when one word fits; the word limit is strict.',
        'Use headings to find your place again if you get lost.'
      ],
      ex: {
        q: 'Questions 34–37 · Complete the flow-chart. ONE WORD AND/OR A NUMBER.',
        voices: { Lecturer: 'm' },
        script: [['Lecturer', 'At high tide, sea water is channelled into shallow ponds lined with clay. In summer the sun does most of the work, and evaporation takes about twelve days — it used to be twenty before the ponds were made shallower. Workers then rake the crystals into piles, which are left to drain. Most of the salt is sold to restaurants, although a few local shops stock it too.']],
        walk: [
          ['34: a plural noun after shallow.', 'The audio says "shallow ponds" — copy the plural: PONDS.'],
          ['35: a number of days; two numbers are heard.', '"used to be twenty" is history → the current figure is 12.'],
          ['36: a plural noun after into.', 'rake the crystals into piles → PILES.'],
          ['37: a type of buyer; two are mentioned.', '"Most… although a few…" → the main buyer: RESTAURANTS.']
        ],
        answer: '34 ponds · 35 12 · 36 piles · 37 restaurants'
      },
      mistakes: [
        ['"20" because it was said clearly', 'Ignoring past figures ("used to be")'],
        ['"clay" (an extra detail)', 'The noun that fits the box: "ponds"'],
        ['Answering "shops" (mentioned last)', 'Choosing the main buyer'],
        ['Writing "pond" without -s', 'Keeping the plural that fits the grammar']
      ],
      band: {
        label: 'note-taker',
        b6: 'Waits for each gap, often hears the answer late, and then misses the next one.',
        b7: 'Predicts the type of every gap during the pause, uses the headings to stay oriented, and listens one gap ahead.',
        why: ["Knowing the next gap's type lets you hear its answer even in a fast sentence.", 'Headings act as checkpoints, so one missed gap does not cause three.']
      },
      practice: {
        instr: 'Questions 1–5 · Complete the notes. ONE WORD AND/OR A NUMBER.',
        voices: { Speaker: 'm' },
        script: [['Speaker', "Our city's bike-share scheme started in 2019 with 300 bikes; we now have 1,200. Most users are commuters, though students use it heavily at weekends. The biggest problem has been theft — vandalism has fallen since we added cameras. Next year we'll introduce electric bikes, and we are considering a monthly pass, priced at about £15.", "Our city's bike-share scheme started in twenty nineteen with three hundred bikes; we now have twelve hundred. Most users are commuters, though students use it heavily at weekends. The biggest problem has been theft. Vandalism has fallen since we added cameras. Next year we'll introduce electric bikes, and we are considering a monthly pass, priced at about fifteen pounds."]],
        qs: [
          { q: 'Started: 2019 · number of bikes now:', hint: 'two numbers', a: ['1200', '1,200', 'twelve hundred'], key: '1,200 / 1200' },
          { q: 'Main users:', hint: 'main vs weekend', a: ['commuters'] },
          { q: 'Main problem:', hint: 'biggest', a: ['theft'] },
          { q: 'Planned for next year: ___ bikes', hint: 'adjective', a: ['electric'] },
          { q: 'Possible monthly pass: £', hint: '£ printed', a: ['15', 'fifteen'] }
        ]
      },
      vocab: [['channelled into', 'directed into'], ['evaporation', 'water turning into vapour'], ['subsequently', 'after that'], ['the vast majority', 'most'], ['no longer / used to', 'past, not current'], ['stock (v.)', 'sell in a shop']],
      quick: ['Read headings first, gaps second.', 'Predict every gap in the pause.', 'Use sequence words to keep your place in flow-charts.'],
      killers: ['Writing old numbers ("used to be…")', 'Copying extra words beyond the limit', 'Losing the row in a table and writing answers in the wrong cells']
    },
    /* ================= B7 ================= */
    {
      id: 'b7', code: 'B7', group: 'Q', page: 23, title: 'Spelling, Numbers and Word-limit Traps', sub: 'Easy marks that Band 6 candidates throw away',
      idea: { en: 'A correct idea written wrongly is a wrong answer — accuracy in small details is worth a half band.', id: 'Jawaban yang benar tapi ditulis salah = salah. Ketelitian detail kecil bernilai setengah band.' },
      steps: [
        'Train your ear for teens vs tens: fif-TEEN (stress at the end) vs FIF-ty (stress at the start).',
        'Learn dates in two forms: 30 May / May 30 — both are accepted; 30/5 is risky.',
        'Know number words: "double 4" = 44, "oh" = 0, "a hundred and five" = 105, "one point five" = 1.5.',
        'Learn 50 high-frequency spellings (list below) — they appear again and again.',
        'Count words in every answer: hyphenated = 1, numbers = 1.'
      ],
      tips: [
        'Postcodes mix letters and numbers: "C B two, four L T" → CB2 4LT.',
        'Prices: "£12.50" can be said "twelve fifty" or "twelve pounds fifty".',
        'Times: "quarter to seven" = 6.45; "half past" = :30.',
        'British vs American spellings are both accepted (centre/center) — just be consistent.',
        'Plurals count as a different answer: if the answer is "tickets", "ticket" is wrong.',
        'Capital letters do not matter for scoring, but writing all answers in capitals avoids confusion on paper.'
      ],
      ex: {
        q: 'Questions 5–8 · Write ONE WORD AND/OR A NUMBER.',
        voices: { Receptionist: 'f' },
        script: [['Receptionist', "A single room is seventy pounds a night — oh, sorry, seventeen, it's a hostel, not a hotel! Our postcode is B-S-eight, three-J-W. Check-in is from a quarter to three. And please bring towels — we provide sheets, but not towels.", "A single room is seventy pounds a night. Oh, sorry, seventeen, it's a hostel, not a hotel! Our postcode is B, S, eight, three, J, W. Check-in is from a quarter to three. And please bring towels. We provide sheets, but not towels."]],
        walk: [
          ['5: two numbers, then a correction.', 'Stress: sevenTEEN — and the logic ("a hostel") confirms 17.'],
          ['6: write letters and digits as heard.', 'BS8 3JW — grouped exactly as spoken.'],
          ['7: "a quarter to three" = 2.45.', 'Convert time phrases carefully; do not write 3.15.'],
          ['8: one word, plural.', '"towels" — sheets are provided, so they are not the answer.']
        ],
        answer: '5 17 · 6 BS8 3JW · 7 2.45 (pm) / 14:45 · 8 towels'
      },
      mistakes: [
        ['"accomodation"', '"accommodation" (cc + mm)'],
        ['"Wenesday" / "Febuary"', '"Wednesday" / "February"'],
        ['"enviroment", "goverment"', '"environment", "government"'],
        ['"3.15" for "a quarter to three"', '"2.45"']
      ],
      band: {
        label: 'answer sheet',
        b6: '5 seventy · 6 BS 83JW · 7 3.15 · 8 towel',
        b7: '5 17 · 6 BS8 3JW · 7 2.45 · 8 towels',
        why: ['Four "almost right" answers are four lost marks — enough to drop from 7.5 to 7.0.', 'Band 7+ candidates check numbers, plurals and spelling in the final 2 minutes.']
      },
      practice: {
        instr: 'Dictation · Write what you hear (number, price, date, postcode…).',
        dictation: true,
        voices: { Voice: 'f' },
        script: [
          ['1', '"The fee is thirteen fifty."', 'The fee is thirteen fifty.'],
          ['2', '"My number is oh-seven-eight-double-one, four-six-oh, two-nine-nine."', 'My number is oh, seven, eight, double one. Four, six, oh. Two, nine, nine.'],
          ['3', '"It\'s on the thirty-first of August."', "It's on the thirty-first of August."],
          ['4', '"The postcode is N-W-one, six-X-Y."', 'The postcode is N, W, one. Six, X, Y.'],
          ['5', '"The talk lasts an hour and a half."', 'The talk lasts an hour and a half.'],
          ['6', '"We\'ll need about a hundred and fifteen chairs."', "We'll need about a hundred and fifteen chairs."]
        ],
        qs: [
          { q: 'Price', hint: '13.50 or 30.50?', a: ['13.50', '£13.50'], line: 0 },
          { q: 'Phone number', hint: 'double, oh', a: ['07811 460 299', '07811460299'], line: 1 },
          { q: 'Date', hint: 'two forms accepted', a: ['31 August', '31st August', 'August 31', 'August 31st', '31 Aug'], key: '31 August / 31st August / August 31', line: 2 },
          { q: 'Postcode', hint: 'group as heard', a: ['NW1 6XY'], line: 3 },
          { q: 'Length in minutes', hint: 'convert', a: ['90', '90 minutes', '90 mins'], key: '90 (minutes)', line: 4 },
          { q: 'Number of chairs', hint: 'and = plus', a: ['115'], line: 5 }
        ]
      },
      vocab: [['accommodation, February, Wednesday, environment, government', 'top 5 misspelt words'], ['library, necessary, separate, questionnaire, business', 'next 5'], ['"double"', 'two of the same letter/number'], ['"oh"', 'zero in phone numbers'], ['"a quarter past / to"', ':15 / :45']],
      quick: ['Do 5 minutes of number dictation daily for two weeks.', 'Keep a personal spelling list of your errors.', 'Check plurals by reading the full sentence.'],
      killers: ['Writing numbers as words when unsure of spelling', 'Adding £ or units that are already printed', 'Forgetting -s']
    },
    /* ================= B8 ================= */
    {
      id: 'b8', code: 'B8', group: 'P', page: 25, title: 'Sections 1–4 and Predicting Answers', sub: 'What each part sounds like — and how to listen ahead',
      idea: { en: 'Each part is a little harder; use every pause to read ahead and predict, so you listen for something.', id: 'Tiap part makin sulit; pakai setiap jeda untuk membaca soal berikutnya dan menebak, supaya kamu tahu apa yang dicari.' },
      steps: [
        'Part 1 (easiest): a transactional conversation (booking, enquiry). Expect names, numbers, dates. Aim 9–10/10.',
        'Part 2: one speaker giving information (tour guide, radio, induction). Expect maps, multiple choice, matching.',
        'Part 3: students and/or a tutor discussing an assignment. Listen for opinions, agreement and changes of mind.',
        'Part 4: a short lecture with no break in the middle — read all 10 questions before it starts.',
        'In every pause: read ahead, predict word types and paraphrases; never review the part you just finished.'
      ],
      tips: [
        'Parts 1–3 have a break in the middle; Part 4 runs straight through, so read ahead before it starts.',
        'Part 3 is the hardest part for many: track who agrees with what.',
        'Part 4 lectures follow a structure: introduction → points → examples → conclusion. Signposts (Turning to…) help you find your place.',
        'The topic sentence in the instructions ("You will hear a talk about…") is a free clue — use it.',
        'Predict synonyms: if the question says cheaper, expect "less expensive", "lower cost", "saves money".',
        'If you lose your place, look for the next heading or a question with an easy-to-hear word (a name, a number).'
      ],
      ex: {
        q: 'Prediction in practice · You have 30 seconds before Part 4. What do you predict? Topic: The history of tea in Britain.',
        walk: [
          ['31: among the ___ → a group of people (plural noun).', 'Guess possible words: "rich", "upper classes", "royal family".'],
          ['32: large-scale ___ → a noun linked to taxes.', 'Prediction: "smuggling" — high taxes often cause illegal trade.'],
          ['33: grown in ___ → a place (capital letter).', 'Prediction: a country or region — listen for "India", "Ceylon", "Assam".'],
          ['Then the lecture confirms: "upper classes", "smuggling", "India".', 'Predictions do not need to be right — they prepare your ear.']
        ],
        answer: 'Predict the type (people / noun / place) and a few likely words for every gap.'
      },
      mistakes: [
        ['Checking Part 1 answers during the break', "Reading Part 2's questions in the break"],
        ['Expecting a pause in the middle of Part 4', 'Reading all of Part 4 before it starts'],
        ['Following only one speaker in Part 3', "Labelling opinions with the speaker's initial"],
        ['Panicking after one difficult part', 'Starting fresh: each part is a new set of marks']
      ],
      band: {
        label: 'use of pauses',
        b6: 'Spends pauses re-checking the last answers, so starts each part "cold".',
        b7: 'Uses every pause to read ahead, underline key words and predict word types — begins each part already knowing what to listen for.',
        why: ['Prediction reduces the load on short-term memory; you only confirm.', 'Part 4 rewards the listener who read all ten questions first.']
      },
      practice: {
        instr: 'Predict before you listen — write the type and 2 possible words for each gap.',
        qs: [
          { q: 'Part 1: "Course starts on ___ (date)."', hint: 'date format', open: true, sample: 'date (e.g. 4 March / 15th September)' },
          { q: 'Part 2: "Visitors should leave bags in the ___."', hint: 'place noun', open: true, sample: 'place noun (e.g. lockers / cloakroom / reception)' },
          { q: 'Part 3: "The students agree the survey sample was too ___."', hint: 'adjective', open: true, sample: 'adjective (e.g. small / narrow / limited)' },
          { q: 'Part 4: "Coral reefs are damaged mainly by rising ___."', hint: 'noun after rising', open: true, sample: 'noun (e.g. temperatures / sea levels / acidity)' },
          { q: 'Part 4: "The researcher recommends reducing the use of ___."', hint: 'noun', open: true, sample: 'noun (e.g. fertilisers / plastics / fuel)' }
        ]
      },
      vocab: [['signpost', 'words that show structure: firstly, turning to, to sum up'], ['"Let\'s move on to…"', 'new section of a talk'], ['"I take your point, but…"', 'partial disagreement (Part 3)'], ['"That\'s a fair point"', 'agreement'], ['induction', 'a welcome talk for new staff/students']],
      quick: ['Treat each part as a fresh start.', 'Read ahead, never back.', 'Write predictions in the margin, very small.'],
      killers: ['Checking answers instead of reading ahead', 'Losing Part 4 because you read questions while it plays', 'Getting stuck on one missed answer']
    }
  ],
  /* ================= B9 · B10 audio practice ================= */
  tests: [
    {
      id: 't1', code: 'B9·1', page: 27, part: 'Part 1', title: 'Renting a bicycle', icon: 'b9-icon',
      instr: 'Questions 1–6 · ONE WORD AND/OR A NUMBER.',
      voices: { Assistant: 'm', Woman: 'f' },
      script: [
        ['Assistant', 'Good morning, Harbour Bikes.'],
        ['Woman', "Hi, I'd like to rent two bikes for the weekend. My name's Lauren Pryce — that's P-R-Y-C-E.", "Hi, I'd like to rent two bikes for the weekend. My name's Lauren Pryce. That's P, R, Y, C, E."],
        ['Assistant', 'Thanks. Standard bikes or electric?'],
        ['Woman', "My husband wanted electric, but they're £40 a day, aren't they? We'll take standard."],
        ['Assistant', 'Standard is £22 a day each. Will you collect on Friday evening?'],
        ['Woman', 'Saturday morning, actually — around half past eight.'],
        ['Assistant', "Fine. You'll need to leave a deposit of £50 per bike, and bring your driving licence or passport."],
        ['Woman', "Passport's fine. Do helmets cost extra?"],
        ['Assistant', "No, they're included, but locks are £3."],
        ['Woman', 'OK. Our phone number is 0412 776 590.', 'OK. Our phone number is oh four one two, double seven six, five nine oh.'],
        ['Assistant', 'Lovely. The shop is at 18 Quay Street, opposite the ferry terminal.']
      ],
      qs: [
        { q: 'Surname:', a: ['Pryce'] },
        { q: 'Type of bike:', a: ['standard'] },
        { q: 'Daily price per bike: £', a: ['22'] },
        { q: 'Collection time: ___ (Saturday)', a: ['8.30', '8:30', '8.30 am', '8:30 am', '8.30am', '8:30am', 'half past eight'], key: '8.30 / 8:30 (am)' },
        { q: 'Deposit per bike: £', a: ['50'] },
        { q: 'Extra cost for a ___: £3', a: ['lock'] }
      ]
    },
    {
      id: 't2', code: 'B9·2', page: 27, part: 'Part 3', title: 'Planning a presentation', icon: 'b9-icon',
      instr: 'Questions 7–10 · Choose A, B or C.',
      voices: { Tutor: 'f', Arif: 'm', Lena: 'f2' },
      script: [
        ['Tutor', "So, Arif and Lena, how's the presentation on remote work coming along?"],
        ['Arif', 'We were going to start with statistics, but Lena thinks a short story would grab attention better.'],
        ['Lena', "Yes — one employee's day, in about a minute. Then the data."],
        ['Tutor', 'Good. How will you divide the work?'],
        ['Arif', "I'll do the slides. Lena's better at speaking, so she'll present most of it, and we'll both answer questions."],
        ['Tutor', 'And sources?'],
        ['Lena', "Mainly government surveys. We found some company blogs, but they're too promotional."],
        ['Tutor', 'Agreed. My only concern is length — you have twelve minutes, not fifteen.']
      ],
      qs: [
        { q: 'They will begin with', o: ['statistics', 'a story', 'a question for the audience'], a: 'B' },
        { q: 'Who will present most of it?', o: ['Arif', 'Lena', 'both equally'], a: 'B' },
        { q: 'Their main sources are', o: ['company blogs', 'academic journals', 'government surveys'], a: 'C' },
        { q: 'The tutor is concerned about', o: ['timing', 'the slides', 'the data'], a: 'A' }
      ]
    },
    {
      id: 't3', code: 'B10', page: 28, part: 'Part 4', title: 'Lecture: Why we forget', icon: 'b10-icon',
      instr: 'Questions 11–16 · ONE WORD ONLY.',
      voices: { Lecturer: 'm' },
      script: [['Lecturer', 'Today I want to look at why we forget. In the 1880s, Hermann Ebbinghaus tested his own memory using nonsense syllables. He found that forgetting is fastest in the first hour after learning — a pattern we now call the forgetting curve. So what slows it down? The most effective method is spaced repetition: reviewing material at increasing intervals — after a day, then three days, then a week. Simply rereading notes feels productive, but it is far less useful than testing yourself, which forces the brain to retrieve information. Sleep also matters. During deep sleep, the brain appears to transfer new memories into long-term storage — which is why students who stay up all night before an exam often remember less, not more. Finally, emotion plays a role: we remember events that make us feel strongly, whether positive or negative. Teachers can use this by linking new ideas to stories rather than lists.', 'Today I want to look at why we forget. In the eighteen eighties, Hermann Ebbinghaus tested his own memory using nonsense syllables. He found that forgetting is fastest in the first hour after learning. A pattern we now call the forgetting curve. So what slows it down? The most effective method is spaced repetition: reviewing material at increasing intervals. After a day, then three days, then a week. Simply rereading notes feels productive, but it is far less useful than testing yourself, which forces the brain to retrieve information. Sleep also matters. During deep sleep, the brain appears to transfer new memories into long-term storage. Which is why students who stay up all night before an exam often remember less, not more. Finally, emotion plays a role: we remember events that make us feel strongly, whether positive or negative. Teachers can use this by linking new ideas to stories rather than lists.']],
      qs: [
        { q: 'Ebbinghaus studied his own memory using nonsense ___.', a: ['syllables'] },
        { q: 'Forgetting is quickest in the first ___ after learning.', a: ['hour'] },
        { q: 'Reviewing at increasing intervals is called spaced ___.', a: ['repetition'] },
        { q: 'Self-___ is more effective than rereading notes.', a: ['testing'] },
        { q: 'New memories are moved to long-term storage during deep ___.', a: ['sleep'] },
        { q: 'Teachers should connect new ideas to ___.', a: ['stories'] }
      ]
    }
  ],
  howTo: { id: 'Cara pakai: dengarkan SEKALI saja lalu jawab. Setelah dicek, buka transkrip dan cari di mana jawaban — dan jebakannya — "bersembunyi". Kata/angka yang salah dengar: tulis, lalu ucapkan 3 kali.', en: 'How to use: listen ONCE only and answer. After checking, open the transcript and find where each answer — and each trap — was "hidden". Words and numbers you misheard: write them, then say them aloud 3 times.' },
  /* ================= B11 · Top 30 ================= */
  top30: [
    { name: 'Before the audio', ink: '#2B5C99', bg: '#E0EEFF', tips: ['Read the instructions first and circle the word limit.', 'Use the topic line ("You will hear…") to imagine the situation.', 'Predict the type of every gap: number, name, noun, adjective, place.', 'Paraphrase multiple-choice options in your head during the pause.', 'On maps, find the entrance and the compass before anything else.', 'Write tiny notes (£, n., date, pl.) beside gaps.', 'Read Part 4 completely before it starts — it has no break.', 'In every pause, read ahead; never re-check the part you just finished.'] },
    { name: 'While listening', ink: '#1F6E55', bg: '#DDF4EA', tips: ['Answers follow the order of the questions.', "Wait for the end of the speaker's turn before writing.", 'Listen for the meaning, not the matching word.', 'Follow route language with your pen on maps.', 'Track speakers in Part 3 by writing their initials.', 'Use signposts (Turning to…, Finally…) to find your place in lectures.', 'If you miss an answer, let it go and catch the next one.', 'Keep your eyes one question ahead of the audio.'] },
    { name: 'Traps to expect', ink: '#8E3049', bg: '#FCE4EA', tips: ['Corrections: "No, sorry, I mean…" — the second version wins.', 'Distractors: an option is mentioned, then rejected.', '"Used to be / no longer" signals an old, wrong number.', '"People think… but actually" introduces the right answer.', 'Teens vs tens: fifTEEN vs FIFty.', 'Two options mentioned — listen for main, most, first.', 'Same word in an option is often the trap; paraphrase is often the answer.', "Opposite ≠ next to; left/right depend on the speaker's direction."] },
    { name: 'Accuracy and checking', ink: '#9A4A22', bg: '#FFE6D9', tips: ['Spelling counts — learn the top 50 IELTS spellings.', 'Keep the plural -s you hear.', 'Do not repeat words printed on the page (£, units).', 'Hyphenated words and numbers count as one word.', 'Never leave a blank — guess sensibly.', 'Use the final 2 minutes for spelling, plurals and word limits only.'] }
  ],
  top30Note: 'Listening 7.5 = about 32 of 40. That is only 5–6 more answers than today — and most of them come from the traps on this page.',
  /* ================= B10 · Official free tests ================= */
  official: [
    { name: 'British Council — Free practice tests', path: 'Prepare → Free practice tests (Academic Listening, Reading, Writing, Speaking)', url: 'https://takeielts.britishcouncil.org/' },
    { name: 'IDP Indonesia — Free practice tests', path: 'Prepare → Free IELTS practice tests', url: 'https://ielts.idp.com/indonesia' },
    { name: 'IELTS.org — Sample test questions', path: 'Official samples for every question type, including computer-delivered format', url: 'https://ielts.org/' },
    { name: 'IELTS by IDP app', path: 'Free practice questions and tips', url: '' },
    { name: 'British Council IELTS Ready', path: 'Extra free practice when you book with the British Council', url: '' }
  ],
  officialHow: ['Do it in one sitting, timed, with headphones — like the real day.', 'Mark it, convert with the band table, and log it on the tracker.', 'Re-listen with the transcript and label every error: distractor · synonym · spelling · word limit · lost place.', 'Shadow 2 minutes of the transcript: pause, repeat with the same rhythm.']
};
