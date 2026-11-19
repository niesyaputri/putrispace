/* Putri Space · Reading Library content (IELTS Academic) · from "IELTS Academic · The Band 7.5 Study Book", Section C · Created by CreanovativeCo */
/* Question: tf {q, tf:'T'|'Y', a:'TRUE'…} · pick {q, pick:['i','ii'…], a:'ii'} · choice {q, o:[…], a:'B'} · text {q, a:[accepted…]} */
window.PS_READ = {
  groups: [
    { id: 'Q', name: { id: 'Tipe soal & strategi', en: 'Question types & strategy' }, ink: '#1F6E55', bg: '#DDF4EA' },
    { id: 'S', name: { id: 'Kecepatan, parafrase & waktu', en: 'Speed, paraphrase & timing' }, ink: '#6B4E00', bg: '#FFF4D6' }
  ],
  reasons: [
    { id: 'ng', id_: 'Logika Not Given', en: 'Not Given logic' },
    { id: 'para', id_: 'Tidak kenal parafrase', en: 'Missed the paraphrase' },
    { id: 'qual', id_: 'Kata kualifikasi (all/some/may)', en: 'Qualifier (all/some/may)' },
    { id: 'limit', id_: 'Batas kata / bentuk kata', en: 'Word limit / word form' },
    { id: 'time', id_: 'Waktu / kehilangan posisi', en: 'Time / lost my place' }
  ],
  lessons: [
    /* ================= C1 ================= */
    {
      id: 'c1', code: 'C1', group: 'Q', page: 31, title: 'True / False / Not Given', sub: 'Facts in the passage — not your own knowledge',
      idea: { en: 'TRUE agrees with the text, FALSE contradicts it, NOT GIVEN means the text simply does not say.', id: 'TRUE = sesuai teks, FALSE = bertentangan dengan teks, NOT GIVEN = teks memang tidak membahasnya.' },
      steps: ['Underline the topic (what the statement is about) and the claim (what it says about it).', 'Scan for the topic using names, numbers or capital letters; answers follow passage order.', 'Read carefully around it — usually 1–3 sentences.', 'Compare the claim, word by word, especially qualifiers: all/some, always/often, first, only, increase/decrease.', 'Decide: same meaning = T; clear opposite = F; information missing or only partly there = NG.'],
      tips: ['FALSE needs a contradiction in the text; if you cannot point to one, it is probably NOT GIVEN.', 'Watch small words: most vs all, the first vs one of the first, may vs will.', 'Never use world knowledge — even if a statement is true in real life, the text decides.', 'Comparisons are traps: "X is more popular than Y" — does the text compare them at all?', 'Answers come in passage order, so if you are stuck between Q3 and Q5, Q4 is in between.', 'Spend no more than 90 seconds per statement; mark it and return later.'],
      ex: {
        q: 'Questions 1–3 · Do the statements agree with the information in the passage?',
        passage: 'Urban rooftops. In 2015 the city council began offering grants to building owners who installed green roofs. Within five years, around 300 roofs had been converted, most of them on office buildings rather than homes. Studies on several of these buildings found that indoor temperatures in summer fell by up to 3°C. The council now plans to make green roofs compulsory for all new commercial buildings, although residential developers have objected to the cost.',
        walk: [['1 · Topic: converted roofs → "most of them on office buildings rather than homes".', 'The text gives the opposite claim, so the answer is FALSE, not NG.'], ['2 · Topic: summer temperatures → "fell by up to 3°C" in "several of these buildings".', 'Reduced = fell; some = several → TRUE.'], ['3 · Topic: residential developers → they "objected to the cost". Funding for them? Not mentioned.', 'Ask "Where is the contradiction?" — there is none → NOT GIVEN.']],
        answer: '1 FALSE · 2 TRUE · 3 NOT GIVEN'
      },
      mistakes: [['"False, because it isn\'t in the text"', 'Not in the text = NOT GIVEN'], ['Using general knowledge ("green roofs are popular, so TRUE")', 'Using only the passage'], ['Writing "T/F/NG" letters when words are required (or vice versa)', 'Following the instruction format exactly'], ['Ignoring most, all, only', 'Comparing qualifiers word by word']],
      band: { label: 'reasoning for Q3', b6: '"Developers objected to the cost, so the council will probably help them → TRUE." (guessing beyond the text)', b7: '"The text mentions developers and cost, but says nothing about extra funding. There is no agreement and no contradiction → NOT GIVEN."', why: ['Band 7 readers decide only from evidence they can point to.', 'The "where is the contradiction?" test separates FALSE from NOT GIVEN.'] },
      practice: {
        instr: 'Questions 1–5 · TRUE, FALSE or NOT GIVEN?', mins: 6,
        title: 'The return of the bicycle courier',
        passage: 'Delivery companies in several European cities have replaced some vans with cargo bikes. In one Paris trial, bikes completed deliveries 60% faster than vans in the city centre, mainly because they avoided traffic queues. However, the bikes could carry only small parcels, so vans were still used for furniture and appliances. Riders reported fewer injuries than expected, although the company did not publish exact figures. The trial has since been extended to two further districts.',
        qs: [
          { q: 'Cargo bikes have replaced all delivery vans in Paris.', tf: 'T', a: 'FALSE', hint: 'all vs some', key: 'FALSE ("some vans", "several cities")' },
          { q: 'In the city centre, bikes delivered faster than vans.', tf: 'T', a: 'TRUE', hint: 'paraphrase', key: 'TRUE ("60% faster… in the city centre")' },
          { q: 'Bikes were used to deliver large household appliances.', tf: 'T', a: 'FALSE', hint: 'contradiction?', key: 'FALSE (vans were still used for furniture and appliances)' },
          { q: 'The number of rider injuries was published by the company.', tf: 'T', a: 'FALSE', hint: 'read the whole sentence', key: 'FALSE ("did not publish exact figures")' },
          { q: 'The trial was more successful than similar trials in Berlin.', tf: 'T', a: 'NOT GIVEN', hint: 'comparison trap', key: 'NOT GIVEN (Berlin is not mentioned)' }
        ]
      },
      vocab: [['contradict', 'say the opposite'], ['qualifier', 'a word that limits meaning (most, some, only)'], ['converted', 'changed into'], ['compulsory / mandatory', 'required by law'], ['object to', 'oppose, complain about'], ['extend', 'make longer or bigger']],
      quick: ['Underline topic + claim in every statement.', 'Point to the evidence before writing T or F.', 'No evidence either way → NG.'],
      killers: ['Answering from general knowledge', 'Spending 4 minutes on one NG decision', 'Writing Yes/No for a T/F/NG task']
    },
    /* ================= C2 ================= */
    {
      id: 'c2', code: 'C2', group: 'Q', page: 33, title: 'Yes / No / Not Given', sub: "The writer's opinions, not facts",
      idea: { en: "The same logic as T/F/NG — but you are checking the writer's views and claims, so look for opinion language.", id: 'Logikanya sama dengan T/F/NG, tapi yang dicek adalah PENDAPAT penulis — cari bahasa opini.' },
      steps: ['Notice the task: Y/N/NG appears in argument passages (often Passage 3).', "Underline the writer's attitude words in each statement: should, a mistake, better, overestimated.", 'Find the writer\'s own voice in the text — not quoted experts or "some people believe".', 'Compare the stance: same view = YES; opposite view = NO; the writer does not express a view = NOT GIVEN.'],
      tips: ['"Some critics argue…" is not the writer\'s view unless the writer agrees.', 'Evaluation words reveal the writer: sadly, rightly, misguided, encouraging, unconvincing.', 'Hedged statements matter: if the writer says something "may help", a statement that it "will solve" the problem is NO.', "The writer's view often comes after but, however, yet, in fact.", 'Not Given is common when a statement goes further than the writer (adds a cause, a comparison or a prediction).', "Read the conclusion of the passage early — it often states the writer's overall position."],
      ex: {
        q: 'Questions 1–3 · Do the statements agree with the views of the writer?',
        passage: 'Is homework worth it? Many parents believe that more homework produces better results. The evidence, however, is far from clear. For primary pupils, studies show little benefit, and long assignments may simply create stress at home. For older students, moderate homework does appear to help — but only when it is carefully designed and checked by teachers. Schools that abolish homework entirely, as some have, are in my view overreacting; the problem is poor homework, not homework itself.',
        walk: [['1 · "Many parents believe" → that is the parents\' view; the writer says "the evidence is far from clear".', "Separate other people's views from the writer's → NO."], ['2 · "moderate homework does appear to help — but only when it is carefully designed".', 'Matching stance + condition → YES.'], ['3 · The writer says homework should be "checked by teachers", but never says they spend too much time.', 'The statement adds a new claim → NOT GIVEN.']],
        answer: '1 NO · 2 YES · 3 NOT GIVEN'
      },
      mistakes: [["Treating a quoted view as the writer's", 'Finding the writer\'s own evaluation ("in my view")'], ['Choosing YES when the writer is more cautious', 'Matching the strength of the claim (may ≠ will)'], ['Writing TRUE/FALSE on a Y/N/NG task', 'Writing YES/NO/NOT GIVEN exactly'], ['NO when the topic is missing', 'NOT GIVEN when the writer gives no view']],
      band: { label: 'reasoning for Q1', b6: '"The passage talks about more homework and better results → YES." (topic match)', b7: '"Those words belong to \'many parents\'. The writer disagrees: \'the evidence is far from clear\' → NO."', why: ['The question tests whose view it is, not whether the words appear.', 'Band 7 readers track voices: writer vs others.'] },
      practice: {
        instr: 'Questions 1–4 · YES, NO or NOT GIVEN?', mins: 5, title: 'Four-day weeks',
        passage: 'Supporters claim that a four-day week will boost productivity in every industry. That is an exaggeration. In office work, several trials have shown that staff achieve the same output in fewer hours, and absence falls. In hospitals or shops, however, fewer days may simply mean more staff are needed. I believe governments should encourage trials rather than impose a single rule. Whether employees would accept lower pay for shorter weeks is a question few studies have addressed.',
        qs: [
          { q: 'A four-day week will increase productivity in all industries.', tf: 'Y', a: 'NO', hint: 'whose claim?', key: 'NO ("That is an exaggeration")' },
          { q: 'Office trials suggest output can stay the same with fewer hours.', tf: 'Y', a: 'YES', hint: 'paraphrase' },
          { q: 'Governments should make the four-day week compulsory.', tf: 'Y', a: 'NO', hint: "writer's recommendation", key: 'NO (encourage trials "rather than impose a single rule")' },
          { q: 'Most employees would accept lower pay for a shorter week.', tf: 'Y', a: 'NOT GIVEN', hint: 'does the writer say?', key: 'NOT GIVEN ("a question few studies have addressed" — no view given)' }
        ]
      },
      vocab: [['the writer contends / maintains', 'the writer argues'], ['overestimate / exaggerate', 'say something is bigger than it is'], ['misguided', 'based on wrong ideas'], ['impose', 'force a rule on people'], ['in my view / I would argue', "writer's opinion markers"]],
      quick: ['Highlight I, in my view, arguably, mistakenly in the passage.', 'Ask "Is this the writer speaking?" before deciding.', 'Match the strength of the claim.'],
      killers: ["Mixing up others' views with the writer's", 'Ignoring hedging (may, appear, suggest)', 'Answering NO when the writer is simply silent']
    },
    /* ================= C3 ================= */
    {
      id: 'c3', code: 'C3', group: 'Q', page: 35, title: 'Matching Headings', sub: 'Find the main idea of each paragraph, not a detail',
      idea: { en: 'A heading sums up the whole paragraph; details and repeated words are usually distractors.', id: 'Heading merangkum SELURUH paragraf; detail dan kata yang diulang biasanya jebakan.' },
      steps: ['Do this task first for the passage — it gives you a map for other questions.', 'Read the list of headings and underline the key idea in each (causes, solutions, a misunderstanding, early history).', 'For each paragraph, read the first two sentences and the last sentence, then skim the middle.', 'Write a 3–5 word summary in the margin before looking at the headings.', 'Match summaries to headings; start with the easiest paragraphs and use elimination.'],
      tips: ["There are always extra headings — don't try to use them all.", "A heading that matches a single example is a trap; the paragraph's purpose matters.", 'Watch the function words: reasons for, effects of, a solution to, an unexpected result — the type of idea must match.', 'If a heading is used in the example, cross it out.', 'Shared words between a heading and a paragraph are often there to trick you.', 'If two headings fit, choose the one that covers the whole paragraph.'],
      ex: {
        q: 'Questions 1–2 · Choose the correct heading for paragraphs B and C. (i Why early attempts to grow coffee in Europe failed · ii The economic impact of a new crop · iii How a plant spread across continents · iv Problems caused by the weather)',
        passage: 'B Coffee was first grown in Yemen, but by the 1600s Dutch traders had smuggled seedlings to Java. A century later, a single plant presented to the French king produced the coffee that would reach the Caribbean and eventually Brazil.\n\nC In Brazil, coffee transformed the economy. By 1850 it supplied about half the world\'s coffee, and the profits paid for railways and ports. Frost in some years destroyed harvests, but the industry kept growing.',
        walk: [['B · My summary: "coffee moves Yemen → Java → Caribbean → Brazil".', 'Write your own summary before reading the headings — it stops word matching.'], ['B matches iii (spread across continents). Heading i mentions Europe, but the paragraph is about movement, not failure.', 'Check the idea type: how something spread ✓.'], ['C · Summary: "coffee made Brazil rich".', "The frost is one detail; the paragraph's purpose is economic growth."], ['C matches ii; iv (weather) is a detail trap.', 'Choose the heading that covers the whole paragraph.']],
        answer: 'B iii · C ii'
      },
      mistakes: [['Matching "weather" because frost is mentioned', 'Asking "what is the whole paragraph about?"'], ['Reading every word of every paragraph', 'First + last sentences, then skim'], ['Using a heading twice', 'Each heading is used only once'], ['Leaving this task to the end', 'Doing headings first to understand the passage']],
      band: { label: 'approach', b6: 'Reads paragraph C, sees "frost destroyed harvests", chooses iv "Problems caused by the weather".', b7: 'Summarises C as "coffee made Brazil rich" (one sentence of frost is a contrast inside it), and chooses ii.', why: ['Headings test main-idea reading — the skill examiners want at Band 7+.', 'A 4-word summary is fast and protects you from repeated-word traps.'] },
      practice: {
        instr: 'Questions 1–3 · Choose the correct heading for each paragraph from i–v.', mins: 4, title: 'Sleep',
        box: ['i Workplace responses to tiredness', 'ii A belief that has changed', 'iii Why teenagers sleep late', 'iv Serious consequences of poor sleep', 'v The history of sleep research'],
        passage: 'A Sleep researchers once assumed that adults need eight hours a night. Recent studies show the real figure varies widely, from about six to nine hours, depending on genetics and age.\n\nB Lack of sleep affects more than mood. Drivers who sleep under five hours are several times more likely to crash, and long-term sleep loss is linked to heart disease.\n\nC Some companies now offer "nap rooms" and flexible start times. Early results suggest staff make fewer errors and take fewer sick days.',
        qs: [
          { q: 'Paragraph A', pick: ['i', 'ii', 'iii', 'iv', 'v'], a: 'ii', hint: 'a "once assumed" idea', key: 'ii (the eight-hour belief has changed)' },
          { q: 'Paragraph B', pick: ['i', 'ii', 'iii', 'iv', 'v'], a: 'iv', hint: 'effects' },
          { q: 'Paragraph C', pick: ['i', 'ii', 'iii', 'iv', 'v'], a: 'i', hint: 'who acts?' }
        ]
      },
      vocab: [['main idea / gist', 'the central point'], ['supporting detail', 'an example or fact for the main idea'], ['purpose', 'why the paragraph exists (to explain, compare, warn)'], ['distractor', 'a wrong option designed to look right'], ['topic sentence', 'usually the first sentence']],
      quick: ['Summarise first, match second.', 'Cross out headings as you use them.', 'Easy paragraphs first, hard ones last.'],
      killers: ['Matching a repeated word', 'Reading every paragraph in full', 'Forcing the extra headings into the answer']
    },
    /* ================= C4 ================= */
    {
      id: 'c4', code: 'C4', group: 'Q', page: 37, title: 'Matching Information', sub: 'Which paragraph contains…?',
      idea: { en: 'You are looking for a specific detail (an example, a reason, a date) — and the answers are NOT in passage order.', id: 'Kamu mencari DETAIL tertentu (contoh, alasan, tanggal) — dan jawabannya TIDAK urut sesuai paragraf.' },
      steps: ['Do this task last for the passage — by then you know what each paragraph is about.', 'Underline the detail type in each statement: example, reason, description, prediction, comparison.', 'Use your paragraph summaries (from headings or skimming) to guess likely paragraphs.', 'Scan those paragraphs for paraphrases of the statement.', 'Note that a paragraph can be used more than once if the instruction says so.'],
      tips: ['These statements describe a small part of a paragraph, not its main idea.', 'The words in the statement are almost always paraphrased.', 'Numbers and names are useful anchors — scan for them first.', 'Mark each statement with 1–2 possible paragraphs, then confirm.', 'If time is short, guess using the paragraph that discusses the same general topic.', 'Long passages often have 6–8 paragraphs; the answers are spread across them.'],
      ex: {
        q: 'Questions 1–3 · Which paragraph (A–C) contains the following information? (1 a reason why a project was delayed · 2 an example of a material used in construction · 3 a prediction about future demand)',
        passage: 'A The new bridge was due to open in 2022, but unexpected soil conditions meant engineers had to redesign the foundations, pushing the opening back by eighteen months.\n\nB Unlike older bridges, the deck uses recycled steel and a lightweight concrete that contains volcanic ash, which reduces both weight and carbon emissions.\n\nC Traffic planners expect the number of daily crossings to double by 2040 as new housing is built on the eastern side of the river.',
        walk: [['1 · Reason + delay → look for because, meant, pushing back.', '"Soil conditions MEANT … pushing the opening back" → A.'], ['2 · Example of a material → look for specific materials.', '"recycled steel… concrete that contains volcanic ash" → B.'], ['3 · Prediction → future language: expect, will, by 2040.', '"planners EXPECT … to double by 2040" → C.']],
        answer: '1 A · 2 B · 3 C'
      },
      mistakes: [['Searching in passage order', 'Using your map of the whole passage'], ["Matching a paragraph's main topic instead of the detail", 'Looking for the specific detail type'], ['Looking for exact words', 'Looking for paraphrases (delay = pushing back)'], ['Starting the passage with this task', 'Doing it after other question types']],
      band: { label: 'approach', b6: 'Reads the passage again from the top for each statement — 6 minutes for 5 questions.', b7: 'Uses earlier notes ("A = delay, B = materials, C = traffic future") and checks only 1–2 paragraphs per statement — 3 minutes.', why: ['Time saved here is time for Passage 3.', 'Detail-type words (reason, example, prediction) tell you exactly what language to scan for.'] },
      practice: {
        instr: 'Questions 1–4 · Which paragraph, A–D, contains the following?', mins: 4, title: 'Honeybees',
        passage: 'A Honeybees communicate through a "waggle dance", which tells other bees the direction and distance of food.\n\nB Since 2006, beekeepers in North America have reported unusually high losses of colonies each winter.\n\nC Scientists point to several causes, including parasites, poor nutrition and certain pesticides.\n\nD Some farmers now plant wildflower strips beside their crops, and early data from the Netherlands suggest bee numbers recover within three years.',
        qs: [
          { q: 'a list of possible causes of a problem', pick: ['A', 'B', 'C', 'D'], a: 'C', hint: 'causes' },
          { q: 'a description of how information is shared', pick: ['A', 'B', 'C', 'D'], a: 'A', hint: 'how' },
          { q: 'a reference to a specific year', pick: ['A', 'B', 'C', 'D'], a: 'B', hint: 'scan number', key: 'B (2006)' },
          { q: 'an example of a practical solution', pick: ['A', 'B', 'C', 'D'], a: 'D', hint: 'solution' }
        ]
      },
      vocab: [['a reference to', 'a mention of'], ['an account of', 'a description of events'], ['a prediction / forecast', 'what will happen'], ['a contrast between', 'differences'], ['anchor word', 'easy-to-find name, date or number']],
      quick: ['Do this task after headings and T/F/NG.', 'Use detail-type words to choose scanning targets.', 'Note candidate paragraphs beside each statement.'],
      killers: ['Re-reading the whole passage for every question', 'Assuming one answer per paragraph', 'Looking for identical words']
    },
    /* ================= C5 ================= */
    {
      id: 'c5', code: 'C5', group: 'Q', page: 39, title: 'Matching Features', sub: 'Who said what? Which researcher found which result?',
      idea: { en: 'Find each name in the passage first, then read what is said about that person or thing — and match the paraphrase.', id: 'Temukan dulu setiap nama di passage, baca apa yang dikatakan tentang nama itu, lalu cocokkan parafrasenya.' },
      steps: ['Scan for all the names/features (researchers, places, dates) and circle them in the passage.', "Note each one's idea in 3–4 words in the margin.", 'Read the statements — they are not in passage order.', 'Match each statement to the person whose idea it paraphrases.', 'Check the instruction: you may use any letter more than once.'],
      tips: ['One name can appear in several places — read every mention.', 'Watch for reported verbs that change meaning: claimed, disproved, questioned, confirmed.', 'Some names may not be used at all.', 'If a person "questioned" an idea, a statement saying they "supported" it is a trap.', 'The first and last names may be used separately (Dr Ahmed / Ahmed) — scan for both.', 'Statements usually generalise; the passage gives details.'],
      ex: {
        q: 'Questions 1–3 · Match each finding with the correct researcher, A–C. (A Kamau · B Lindqvist · C Ortega) 1 Background music can reduce concentration on complex tasks. 2 The effect depends on whether people like the music. 3 Earlier findings were based on too few participants.',
        passage: "Early work by Ortega suggested that music improves memory, though his sample included only twenty students. Kamau later found that participants solving difficult maths problems performed worse when songs with lyrics were played. Lindqvist argued that personal preference is key: listeners who enjoyed a piece showed no drop in performance. Kamau also criticised Ortega's study for its small size.",
        walk: [['Circle names: Ortega ×2, Kamau ×2, Lindqvist ×1.', "Read EVERY mention — Kamau's second mention gives a different idea."], ['1 · reduce concentration on complex tasks = "difficult maths… performed worse".', 'Paraphrase match → A KAMAU.'], ['2 · depends on whether people like it = "personal preference is key".', '→ B LINDQVIST.'], ['3 · too few participants = "small size" — who criticised it? Kamau.', "Ortega had the small sample, but the criticism is Kamau's → A."]],
        answer: '1 A · 2 B · 3 A (letters can be reused)'
      },
      mistakes: [["Answering C for Q3 because Ortega's sample is mentioned", 'Asking who made this claim'], ['Reading only the first mention of a name', 'Reading every mention'], ['Assuming each letter is used once', 'Checking "you may use any letter more than once"'], ['Ignoring reporting verbs', 'Noting argued, criticised, disproved']],
      band: { label: 'approach', b6: 'Matches Q3 to Ortega because "twenty students" sits next to his name.', b7: 'Notices the statement is a criticism and finds the critic: "Kamau also criticised Ortega\'s study" → A.', why: ['The task tests who holds an idea — reading for relationships, not proximity.', 'Margin notes for each name make matching fast and accurate.'] },
      practice: {
        instr: 'Questions 1–4 · Match each statement with the correct city, A–C. (A Copenhagen · B Singapore · C Curitiba)', mins: 4, title: 'Green cities',
        passage: 'Copenhagen set a target to become carbon neutral, but in 2022 admitted it would miss the deadline. Singapore has focused on water, recycling treated waste water into drinking water for part of its supply. Curitiba in Brazil introduced fast bus lanes in the 1970s, a model later copied by dozens of cities. Singapore has also invested heavily in district cooling systems — an idea Copenhagen adopted years earlier.',
        box: ['A Copenhagen', 'B Singapore', 'C Curitiba'],
        qs: [
          { q: 'Its transport idea was adopted elsewhere.', pick: ['A', 'B', 'C'], a: 'C', hint: 'paraphrase: copied' },
          { q: 'It will not achieve a goal on time.', pick: ['A', 'B', 'C'], a: 'A', hint: 'admitted… miss' },
          { q: 'It reuses waste water.', pick: ['A', 'B', 'C'], a: 'B', hint: 'recycling' },
          { q: 'It was earlier than another city in using district cooling.', pick: ['A', 'B', 'C'], a: 'A', hint: 'who came first?', key: 'A (Copenhagen "adopted years earlier")' }
        ]
      },
      vocab: [['claim / assert', 'say something is true'], ['refute / disprove', 'show it is false'], ['question / challenge', 'doubt'], ['confirm / support', 'agree with evidence'], ['pioneer', 'the first to do something']],
      quick: ['Circle every name before reading statements.', 'Watch reporting verbs.', 'Letters may repeat.'],
      killers: ['Matching by distance from the name', 'Missing a second mention', 'Forgetting some names are unused']
    },
    /* ================= C6 ================= */
    {
      id: 'c6', code: 'C6', group: 'Q', page: 41, title: 'Summary Completion', sub: 'A shorter version of part of the passage',
      idea: { en: 'Locate the part of the passage the summary covers, then fill each gap with the word that fits grammar and meaning.', id: 'Temukan bagian passage yang diringkas, lalu isi tiap celah dengan kata yang cocok secara grammar DAN makna.' },
      steps: ['Check the type: words from the passage (word limit!) or words from a box (often paraphrases).', 'Read the whole summary first to understand its topic.', 'Predict the part of speech for every gap.', 'Locate the section of the passage — summaries usually cover one or two paragraphs, in order.', 'Fill and re-read to check grammar and logic.'],
      tips: ['Box options are often synonyms of the passage words, not copies.', "Box tasks have extra words of the same part of speech — grammar alone won't decide; meaning must.", 'With "from the passage", copy the spelling exactly.', 'The first gap often comes a few lines after the start of the relevant paragraph.', 'A plural verb after the gap = plural noun.', 'If one gap is very hard, fill the others first — the context may help.'],
      ex: {
        q: 'Questions 1–3 · Complete the summary using words from the box. (decline · cost · popularity · safety · design · rise) Paper straws gained (1) after campaigns against plastic waste. However, some customers complained about their (2), as they become soft in drinks. A further issue is their higher (3).',
        passage: 'Following high-profile campaigns about plastic in the oceans, many cafés switched to paper straws, and sales soared. Yet the switch has not been smooth. Customers often criticise the way the straws go soggy within minutes, and they are around three times more expensive to produce than plastic ones.',
        walk: [['Gap 1 · noun after gained. "Sales soared" → more people used them.', 'Paraphrase: soared = rose quickly → POPULARITY (not "rise": you gain popularity).'], ['Gap 2 · noun after their: what became soft?', '"go soggy" is a problem with how they are made/behave → DESIGN (box synonyms for "the way").'], ['Gap 3 · noun after higher: "three times more expensive".', 'expensive → COST.']],
        answer: '1 popularity · 2 design · 3 cost'
      },
      mistakes: [['Choosing "rise" for gap 1 because "soared" means rise', 'Checking collocation: gain popularity'], ['Copying a passage word not in the box', 'Using box words only'], ['Breaking the word limit on "from the passage" summaries', 'Counting words'], ['Ignoring the summary title', 'Using it to find the right paragraph']],
      band: { label: 'approach', b6: 'Fills gaps by meaning only; writes "gained rise" and moves on.', b7: 'Checks meaning and grammar/collocation, reads the finished sentence: "gained popularity" ✓.', why: ['Summary gaps are designed so two options fit the meaning but only one fits the sentence.', 'Re-reading the completed summary catches these errors in seconds.'] },
      practice: {
        instr: 'Questions 1–4 · Complete the summary. Use NO MORE THAN TWO WORDS from the passage.', mins: 4, title: 'Mangrove forests',
        passage: "Mangrove forests grow along tropical coastlines where salt water would kill most trees. Their roots trap sediment, which protects the shore from erosion, and during storms the dense trees can reduce wave height by more than half. Mangroves also store large amounts of carbon in their soil. Despite this, about a third of the world's mangroves have been cleared since 1980, mainly for shrimp farms.",
        qs: [
          { q: 'Mangroves survive in ___ that would kill other trees.', a: ['salt water', 'saltwater'], hint: 'two words max' },
          { q: 'Their roots collect ___, protecting coasts from erosion.', a: ['sediment'], hint: 'noun' },
          { q: 'In storms they can cut ___ by over 50%.', a: ['wave height'], hint: 'two words' },
          { q: 'Much clearing has been for ___.', a: ['shrimp farms'], hint: 'two words' }
        ]
      },
      vocab: [['soar / surge', 'rise quickly'], ['gain popularity', 'become popular'], ['drawback', 'a disadvantage'], ['erosion', 'wearing away of land'], ['clear (land)', 'remove trees']],
      quick: ["Predict every gap's word type first.", 'Check collocation, not just meaning.', 'Read the completed summary once.'],
      killers: ['Using words from outside the box', 'Changing the form of passage words', 'Over the word limit']
    },
    /* ================= C7 ================= */
    {
      id: 'c7', code: 'C7', group: 'Q', page: 43, title: 'Sentence Completion and Sentence Endings', sub: 'Complete the meaning with exact words or the right ending',
      idea: { en: 'The sentence is a paraphrase of one sentence in the passage — find it, then copy words (or choose the ending) that make the meaning true.', id: 'Kalimat soal adalah parafrase satu kalimat di passage — temukan, lalu salin kata (atau pilih ending) yang membuat maknanya benar.' },
      steps: ['Underline content words in the sentence start (names, numbers, technical words).', 'Scan in order — completion questions follow passage order.', 'Read the passage sentence closely; the answer is usually 1–2 words near the paraphrase.', 'For "sentence endings" (choose A–G), check grammar and meaning: the ending must complete this idea.', 'Copy exactly — do not change word forms.'],
      tips: ['Grammar narrows options: if the start ends with the, the ending begins with a noun.', 'In endings tasks, all options are grammatically possible more often than you expect — logic decides.', 'Avoid adding articles you don\'t need; "the" counts as a word.', 'Numbers in figures count as one word.', 'Answers are often technical terms in the passage — scan for italics or capitals.', 'If your answer makes the sentence false according to the passage, it is wrong even if the words are there.'],
      ex: {
        q: 'Questions 1–2 · Complete the sentences. ONE WORD ONLY. Question 3 · Choose the correct ending.',
        passage: 'The first known maps of the valley were scratched onto clay tablets. For centuries, distances were estimated by walking, until the arrival of the theodolite, an instrument that measures angles, which made surveys far more precise. In the 1970s satellite photography arrived, but persistent cloud cover over the mountains meant many images were unusable.',
        walk: [['1 · earliest maps = "first known maps" → "scratched onto clay tablets".', 'The sentence asks what they were made from, and the limit is ONE word → CLAY.'], ['2 · introduction of the ___ = "arrival of the theodolite".', 'Copy exactly → THEODOLITE.'], ['3 · "persistent cloud cover… unusable".', 'Paraphrase: clouds often blocked the view → B.']],
        answer: '1 clay · 2 theodolite · 3 B'
      },
      mistakes: [['"clay tablets" when ONE WORD ONLY', 'The one word the sentence needs: "clay"'], ['Changing "theodolite" to "theodolites"', 'Copying the exact form'], ['Choosing the ending that repeats words', 'Choosing the ending that matches meaning'], ['Searching the whole passage for each question', 'Scanning in order from the previous answer']],
      band: { label: 'answers', b6: '1 clay tablets (over limit) · 2 instrument · 3 A', b7: '1 clay · 2 theodolite · 3 B — each answer checked against the word limit and the meaning of the full sentence.', why: ['The word limit is part of the question; breaking it makes a right idea wrong.', '"Instrument" is a general word; the sentence needs the specific term the passage names.'] },
      practice: {
        instr: 'Questions 1–4 · Complete the sentences. NO MORE THAN TWO WORDS.', mins: 4, title: 'Bamboo',
        passage: 'Bamboo is technically a grass, not a tree. Some species grow almost a metre in a single day, making bamboo one of the fastest-growing plants on Earth. Because it regrows from its roots after cutting, it does not need replanting. Builders in parts of Asia have used it for scaffolding for centuries, and engineers are now testing laminated bamboo as an alternative to timber in low-rise buildings.',
        qs: [
          { q: 'Scientifically, bamboo is classified as a ___.', a: ['grass'], hint: 'one word fits' },
          { q: 'After harvesting, bamboo grows again from its ___.', a: ['roots'], hint: 'plural noun' },
          { q: 'In Asia it has long been used for ___.', a: ['scaffolding'], hint: 'noun' },
          { q: 'Engineers are testing ___ as a replacement for timber.', a: ['laminated bamboo'], hint: 'two words' }
        ]
      },
      vocab: [['regrow / regenerate', 'grow again'], ['laminated', 'made of layers glued together'], ['precise / accurate', 'exact'], ['persistent', 'continuing for a long time'], ['unusable', 'cannot be used']],
      quick: ['Scan in order.', 'Copy the exact form.', 'Read the completed sentence.'],
      killers: ['Adding unnecessary articles', 'Paraphrasing the answer in your own words', 'Picking an ending only for its grammar']
    },
    /* ================= C8 ================= */
    {
      id: 'c8', code: 'C8', group: 'Q', page: 45, title: 'Multiple Choice (Reading)', sub: 'Prove three options wrong, one right',
      idea: { en: 'Each wrong option has a reason to be wrong — find the evidence for the right one and the flaw in the others.', id: 'Setiap pilihan salah punya alasan salah — temukan bukti untuk yang benar dan cacat di pilihan lain.' },
      steps: ['Read the stem only and underline its key words; locate the paragraph (questions follow passage order).', 'Read the relevant part of the text carefully before reading the options.', 'Answer in your own words first, then compare with the options.', 'Eliminate: mark each wrong option with its flaw (irrelevant / too strong / half right / not mentioned).', 'For "the writer\'s purpose" or "main idea" questions, think about the whole paragraph or passage.'],
      tips: ['Options that copy words from the text are often traps; the correct option is usually a paraphrase.', 'Beware of extreme words in options: only, never, completely, all.', '"Which is NOT mentioned?" questions: tick the three that are mentioned.', 'For the last question in Passage 3 ("best title"), choose the option that covers the whole text.', 'If two options look correct, one is usually half right — check every part.', "Don't spend more than 2 minutes on one MCQ; mark and move."],
      ex: {
        q: 'Question 1 · According to the passage, why did the museum change its ticket policy? A to raise more money for new exhibitions · B to attract visitors who had not come before · C because the government cut its funding completely · D because visitor numbers had fallen every year since 2000',
        passage: 'In 2019 the museum dropped its £15 entry fee on weekday evenings. The director explained that surveys showed cost was the main reason local families and students had never visited. Government funding had been reduced, but the trustees decided that reaching new audiences mattered more than ticket income. Visitor numbers, which had been stable for a decade, rose by 40% in the first year.',
        walk: [['Own answer: "to bring in people who never visited, because cost stopped them".', 'Answering first protects you from attractive wording.'], ['A · The fee was dropped — that reduces income. Opposite → wrong.', 'Check direction: raising money ≠ dropping fees.'], ['C · Funding was "reduced", not cut "completely". Too strong → wrong.', 'Extreme words need extreme evidence.'], ['D · Numbers had been "stable", not falling. Contradicted → wrong. B = "families and students had never visited" → B.', 'The paraphrase (not come before = never visited) confirms it.']],
        answer: 'B'
      },
      mistakes: [['Choosing C because "government funding" appears', 'Checking "completely" against "reduced"'], ['Reading options first and getting confused', 'Reading the text first, then options'], ['Picking the option that sounds generally true', 'Picking the option the text proves'], ['Ignoring the word NOT in the stem', 'Circling NOT/EXCEPT']],
      band: { label: 'thinking', b6: '"Funding was mentioned and it\'s about money, so C."', b7: '"C says completely — the text says reduced. A is the opposite of dropping a fee. D is contradicted by stable. B paraphrases never visited → B."', why: ['Elimination with a reason is reliable; "it sounds right" is not.', 'Band 7+ readers notice small qualifier differences.'] },
      practice: {
        instr: 'Questions 1–2 · Choose the correct letter, A, B, C or D.', mins: 3, title: 'Octopuses',
        passage: 'Many people believe that octopuses are solitary and unintelligent outside the lab. Field studies in Australia, however, have found sites where dozens of octopuses live close together, sometimes competing for dens and even signalling to each other by changing colour. Researchers caution that these sites may be unusual, created by a shortage of safe shelters on an open seabed, rather than evidence that octopuses are naturally social.',
        qs: [
          { q: 'What did field studies in Australia show?', o: ['Octopuses always live in large groups', 'Some octopuses live close together', 'Octopuses avoid each other completely', 'Octopuses are more intelligent in the wild too'], a: 'B', hint: 'too strong?', key: 'B ("dozens… live close together" at some sites; A is too strong)' },
          { q: 'What do the researchers suggest?', o: ['The sites prove octopuses are social', 'More sites will be found soon', 'The behaviour may be caused by the environment', 'Colour changes are accidental'], a: 'C', hint: 'caution = hedge', key: 'C ("created by a shortage of safe shelters")' }
        ]
      },
      vocab: [["the writer's purpose is to…", 'explain / criticise / compare / describe'], ['according to the passage', 'based only on the text'], ['imply / suggest', 'say indirectly'], ['caution that', 'warn that'], ['attribute X to Y', 'say Y causes X']],
      quick: ['Text first, options second.', 'Label each wrong option with its flaw.', 'Prefer paraphrase over copied words.'],
      killers: ['Choosing options with extreme words without evidence', 'Answering from opinion', 'Spending 4+ minutes on one MCQ']
    },
    /* ================= C9 ================= */
    {
      id: 'c9', code: 'C9', group: 'Q', page: 47, title: 'Short-Answer Questions', sub: 'Wh- questions answered with words from the text',
      idea: { en: 'Find the sentence that answers the question, then copy the shortest exact words that answer it within the limit.', id: 'Temukan kalimat jawabannya, lalu salin kata PERSIS yang paling pendek, sesuai batas kata.' },
      steps: ['Underline the question word: What (thing), Which (choice), When (time), Where (place), How many (number), Who (person).', 'Underline scanning words — names, numbers, technical nouns.', 'Scan in order; questions follow the text.', 'Copy the exact words that answer the question, within the word limit.', 'Read your answer back as a reply: "When? — 1820" ✓.'],
      tips: ['The question word predicts the answer type; a "When" question never has a place as the answer.', 'You do not need a full sentence — just the answer words.', 'Leave out words already in the question.', 'Numbers can be written as figures.', 'If the limit is THREE WORDS, an answer of one or two words is fine.', 'Answers come in passage order, usually close together.'],
      ex: {
        q: 'Questions 1–3 · Answer the questions. NO MORE THAN THREE WORDS AND/OR A NUMBER. 1 What did the first lighthouses burn to produce light? 2 In which year was the first electric lighthouse lamp used? 3 What now allows most lighthouses to operate without staff?',
        passage: 'Ancient lighthouses were simply towers with wood fires burning at the top. Later, candles and then oil lamps were used, and in 1858 an electric arc lamp was installed at a lighthouse in southern England. Today, most lighthouses are fully automated, run by computer systems that are monitored from a distant control centre, so keepers are no longer needed.',
        walk: [['1 · What… burn → a material. "wood fires".', 'Answer the wh- word: WOOD (1 word is enough).'], ['2 · In which year → a number. "in 1858 an electric arc lamp".', 'Scan for numbers → 1858.'], ['3 · What allows… without staff → a system. "run by computer systems".', 'Copy exact words within three: COMPUTER SYSTEMS.']],
        answer: '1 wood · 2 1858 · 3 computer systems'
      },
      mistakes: [['Writing a full sentence', 'Writing only the answer words'], ['"an electric arc lamp" for a "when" question', 'Matching the wh- word: a year'], ['"fully automated computer systems that are monitored"', 'Staying within the word limit'], ['Rewording the answer', 'Copying the passage words']],
      band: { label: 'answers', b6: '1 wood fires burning at the top · 2 electric arc lamp · 3 they are automated now', b7: '1 wood · 2 1858 · 3 computer systems', why: ['The Band 7 answers obey the limit and answer the wh- question exactly.', 'Extra words do not show understanding — they lose marks.'] },
      practice: {
        instr: 'Questions 1–4 · NO MORE THAN TWO WORDS AND/OR A NUMBER.', mins: 3, title: 'The Great Green Wall',
        passage: 'The Great Green Wall project began in 2007 with the aim of planting a belt of trees across Africa, from Senegal to Djibouti. Progress was slow at first because many young trees died during long dry seasons. Since 2015, the project has focused more on helping farmers protect trees that grow naturally, a method called "farmer-managed natural regeneration".',
        qs: [
          { q: 'When did the project start?', a: ['2007'], hint: 'number' },
          { q: 'In which country does the belt begin in the west?', a: ['Senegal'], hint: 'place' },
          { q: 'What killed many young trees?', a: ['dry seasons', 'long dry seasons'], hint: 'two words', key: 'dry seasons' },
          { q: 'Who is the project now helping?', a: ['farmers'], hint: 'person noun' }
        ]
      },
      vocab: [['wh- words', 'what, which, when, where, who, how many'], ['automated', 'run by machines'], ['monitored', 'watched and checked'], ['regeneration', 'natural regrowth'], ['belt', 'a long, narrow area']],
      quick: ['Underline the wh- word.', "Copy, don't paraphrase.", 'Check the limit.'],
      killers: ['Full-sentence answers', 'Answering a different wh- question', 'Misspelling copied words']
    },
    /* ================= C10 ================= */
    {
      id: 'c10', code: 'C10', group: 'Q', page: 49, title: 'Diagram Labelling', sub: 'Match labels to parts of a machine, building or process',
      idea: { en: 'Read the description in the passage as instructions for the picture — position and function words lead you to each label.', id: 'Baca deskripsi di passage seperti petunjuk gambar — kata posisi dan fungsi menuntunmu ke tiap label.' },
      steps: ['Study the diagram and read any labels already given — they are anchors.', 'Find the descriptive paragraph (diagram questions usually cover one part of the passage).', 'Follow position and function language: at the base, attached to, flows through, rotates.', 'Copy the exact noun for each gap within the word limit.', 'Check order: labels often follow the order of the description.'],
      tips: ['Technical nouns are the usual answers — scan for them.', 'Function verbs help: if the label points to the part that spins, find "rotates/turns".', 'Diagrams can be cross-sections; inner/outer matter.', "Don't let unfamiliar topics scare you; you only need to match words.", 'Plural or singular must match the picture (one valve vs valves).', "Check each label's arrow carefully — it points to one exact part."],
      ex: {
        q: 'Questions 1–3 · Label the diagram of a simple water filter. ONE WORD ONLY.',
        passage: 'A basic filter can be made in a plastic bottle. Water is poured onto a top layer of gravel, which stops leaves and large debris. Beneath it, fine sand catches smaller particles. A layer of charcoal then absorbs unpleasant odours. Finally, the water drips through a cloth at the neck of the bottle and is collected in a container.',
        walk: [['Anchor: "fine sand" is already labelled — the text order is top → bottom.', 'Use given labels to locate yourself.'], ['1 · top layer → "a top layer of gravel".', 'Position word top → GRAVEL.'], ['2 · charcoal removes ___ → "absorbs unpleasant odours".', 'Function verb absorbs ≈ removes; ONE word → ODOURS.'], ['3 · exits through a ___ → "drips through a cloth at the neck".', 'Singular article a → CLOTH.']],
        answer: '1 gravel · 2 odours · 3 cloth'
      },
      mistakes: [['"gravels"', '"gravel" (uncountable)'], ['"plastic bottle" for gap 3', 'The part water exits through: "cloth"'], ['Ignoring existing labels', 'Using them as anchors'], ['Writing a description ("small stones")', 'The exact noun from the text']],
      band: { label: 'approach', b6: 'Starts reading the passage from the top hoping to see the diagram words.', b7: 'Uses "fine sand" (given) to locate the description, then follows top → bottom order and copies exact nouns.', why: ['Anchors cut search time to seconds.', 'Position words make labels logical, not guesses.'] },
      practice: {
        instr: 'Questions 1–3 · Label the parts of a solar water heater. ONE WORD ONLY.', mins: 3, title: 'Solar water heater',
        passage: 'On the roof, a flat collector panel absorbs sunlight. Cold water enters the panel from the bottom and, as it warms, rises through thin copper pipes. The hot water then flows into a storage tank, which is insulated with foam to keep the heat in. A valve at the base of the tank controls the flow to the house.',
        qs: [
          { q: 'Panel on the roof: the ___ panel', a: ['collector'], hint: 'noun before panel' },
          { q: 'The pipes are made of ___', a: ['copper'], hint: 'material' },
          { q: 'The tank is wrapped in ___', a: ['foam'], hint: 'insulation' }
        ]
      },
      vocab: [['cross-section', 'a view of the inside'], ['attached to / connected to', 'joined to'], ['at the base / at the top', 'position'], ['absorb', 'take in'], ['insulated', 'protected from heat loss']],
      quick: ['Find anchors first.', 'Follow position words.', 'Copy nouns exactly.'],
      killers: ['Guessing from general knowledge of machines', 'Writing more than the limit', 'Mixing up arrows']
    },
    /* ================= C11 ================= */
    {
      id: 'c11', code: 'C11', group: 'S', page: 51, title: 'Skimming, Scanning, Paraphrase and the 60 Minutes', sub: 'The three reading speeds — and a clock plan for 40 questions',
      idea: { en: 'Skim for the map, scan for the target, read slowly only where the answer is — and keep moving with a time plan.', id: 'Skim untuk peta, scan untuk target, baca pelan hanya di tempat jawaban — dan terus bergerak dengan rencana waktu 17 · 20 · 23 menit.' },
      steps: ['Skim (2 minutes): title, first sentence of each paragraph, any headings. Write a 2–3 word note per paragraph.', 'Scan: move your eyes quickly for a target — a name, a number, a capitalised word, a technical term.', 'Read intensively only the 2–3 sentences around the target.', 'Spot paraphrase: expect synonyms (decline = fall), word-form changes (economic → economy) and structure changes (active → passive).', 'Follow the clock: 17 · 20 · 23 minutes. When time is up, guess and move on.'],
      tips: ['Scanning targets in order of ease: numbers → names → capitals → technical nouns → ordinary words.', 'The question type order matters: do headings first, "which paragraph" last.', 'Paraphrase patterns repeat: the majority of = most; a fraction = a small part; prior to = before.', 'On computer, use the highlight tool for the paragraph notes and the answer evidence.', 'Never leave a blank — there is no penalty for wrong answers.', 'Read widely for 20 minutes a day (science, business, social topics) to build speed — The Conversation, BBC Future, and university news pages are good sources.'],
      ex: {
        q: 'Paraphrase spotting · Match each question phrase to the passage phrase. 1 the number of applicants fell · 2 before the reform · 3 most participants · 4 was not affordable for many families',
        passage: '(a) prior to the changes · (b) the majority of those taking part · (c) priced beyond the reach of many households · (d) there was a decline in the number of people applying',
        walk: [['1 → (d): fell = decline; applicants = people applying (word form).', 'Noun ↔ verb changes are the most common paraphrase.'], ['2 → (a): before = prior to; reform = changes.', 'Learn formal equivalents of everyday words.'], ['3 → (b): most = the majority of; participants = those taking part.', 'Quantity words: most, the majority, a large proportion.'], ['4 → (c): not affordable = priced beyond the reach of.', 'Negative ideas are often expressed without "not".']],
        answer: '1 d · 2 a · 3 b · 4 c'
      },
      mistakes: [['Reading every word from the first line', 'Skimming for structure first'], ['Finishing Passage 1 perfectly and rushing Passage 3', '17 · 20 · 23 minutes'], ['Looking for identical words', 'Looking for synonyms and word forms'], ['Translating each sentence into Indonesian', 'Reading in English for meaning']],
      band: { label: 'time use', b6: 'Passage 1: 25 minutes · Passage 2: 22 minutes · Passage 3: 13 minutes, 6 blanks.', b7: 'Passage 1: 16 · Passage 2: 20 · Passage 3: 24, no blanks, 1 minute to check that all answers are entered.', why: ['Passage 3 has the same 13–14 marks as the others — it needs the most time, not the least.', 'No blanks: random guesses still win about one mark in four on MCQs.'] },
      practice: {
        instr: 'Paraphrase drill · Copy the words from the passage that mean the same as each phrase.', mins: 4, title: 'Electricity',
        passage: "Prior to 2010, the vast majority of the region's electricity came from coal. Since then, the share produced by wind turbines has risen sharply, while consumption per household has remained broadly unchanged. Critics claim the transition has been costly, yet the average electricity bill is now lower than a decade ago.",
        qs: [
          { q: 'before 2010', a: ['prior to 2010', 'prior to'], hint: 'formal', key: 'prior to 2010' },
          { q: 'most', a: ['the vast majority', 'vast majority', 'the vast majority of'], hint: 'quantity' },
          { q: 'increased quickly', a: ['risen sharply', 'has risen sharply'], hint: 'verb + adverb' },
          { q: 'stayed about the same', a: ['remained broadly unchanged', 'has remained broadly unchanged'], hint: 'remained…' },
          { q: 'expensive', a: ['costly'], hint: 'word form' }
        ]
      },
      vocab: [['prior to', 'before'], ['the vast majority', 'almost all'], ['a fraction of', 'a small part of'], ['broadly / roughly', 'approximately'], ['sharply / significantly', 'by a large amount'], ['beyond the reach of', 'too expensive for']],
      quick: ['Write a 2-word note per paragraph while skimming.', 'Use a watch: 17 · 20 · 23.', 'Fill every answer before time ends.'],
      killers: ['Starting with the hardest question type', 'Leaving blanks', 'Translating word by word']
    }
  ],
  top30: [
    { name: 'Strategy and time', ink: '#1F6E55', bg: '#DDF4EA', tips: ['Skim each passage for 2 minutes: title, first sentences, a note per paragraph.', 'Time plan: 17 · 20 · 23 minutes for Passages 1, 2, 3.', 'Do headings first; do "which paragraph contains" last.', 'Most question types follow passage order — use the previous answer to find the next.', 'Never leave a blank; there is no penalty for wrong answers.', 'On computer, highlight evidence and paragraph notes.', 'Passage 3 is the hardest — give it the most time.', 'Check all answers are entered in the last minute.'] },
    { name: 'True/False/Not Given and Yes/No/Not Given', ink: '#8E3049', bg: '#FCE4EA', tips: ['FALSE needs a contradiction you can point to.', 'No information either way = NOT GIVEN.', 'Compare qualifiers: all/most/some, always/often, may/will.', 'Y/N/NG is about the writer\'s view, not quoted opinions.', 'Never use your general knowledge.', 'Write the exact form required (TRUE vs YES).'] },
    { name: 'Completion and short answer', ink: '#2B5C99', bg: '#E0EEFF', tips: ['Respect the word limit; hyphenated words and numbers count as one.', 'Copy words exactly — same form, same spelling.', 'Predict the part of speech before you read.', 'Use grammar: an + vowel sound; plural verb → plural noun.', 'In box summaries, check collocation as well as meaning.', 'Answer the wh- word exactly in short-answer questions.', 'Use given labels as anchors in diagram questions.'] },
    { name: 'Matching and multiple choice', ink: '#9A4A22', bg: '#FFE6D9', tips: ['Summarise a paragraph in 4 words before reading headings.', 'The heading must cover the whole paragraph, not one detail.', 'Read every mention of a name in matching features.', 'Watch reporting verbs: claimed, disproved, questioned.', 'In MCQs, read the text first, then eliminate options with a reason.', 'Beware options with extreme words: only, all, completely.', 'Correct options are usually paraphrased; copied words are often traps.', 'Use the paragraph map from skimming to answer faster.', 'Letters may be reused unless the instruction says otherwise.'] }
  ],
  top30Note: 'Reading 7.5 = about 33 of 40. Most extra marks come from NOT GIVEN logic, word limits and finishing Passage 3.',
  sources: [
    { name: 'The Conversation', url: 'https://theconversation.com/', sub: 'Academic writers, short articles — science, business, society' },
    { name: 'BBC Future', url: 'https://www.bbc.com/future', sub: 'Science & society features, IELTS-like topics' },
    { name: 'British Council — Free practice tests', url: 'https://takeielts.britishcouncil.org/', sub: 'Prepare → Free practice tests (Academic Reading)' },
    { name: 'IDP Indonesia — Free practice tests', url: 'https://ielts.idp.com/indonesia', sub: 'Prepare → Free IELTS practice tests' }
  ]
};
