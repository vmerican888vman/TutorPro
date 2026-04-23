import type { SATQuestion } from './types'

export const satTest1RW: SATQuestion[] = [
  // ============================================================
  // MODULE 1 (rw1): Questions 1–27
  // ============================================================

  // Q1 — Vocabulary in context (easy)
  {
    id: 'sat1_rw_001',
    section: 'rw1',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'easy',
    passage:
      'The architect\'s newest building was praised for its austere design. Rather than relying on ornamentation, the structure achieved elegance through clean lines and unadorned surfaces.',
    question:
      'As used in the passage, "austere" most nearly means',
    options: [
      { letter: 'A', text: 'strict and demanding' },
      { letter: 'B', text: 'plain and undecorated' },
      { letter: 'C', text: 'gloomy and forbidding' },
      { letter: 'D', text: 'old-fashioned and outdated' },
    ],
    correct: 'B',
    explanation:
      'The passage describes the building as relying on "clean lines and unadorned surfaces" rather than ornamentation, indicating that "austere" means plain and undecorated in this context.',
  },

  // Q2 — Comprehension (easy)
  {
    id: 'sat1_rw_002',
    section: 'rw1',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'easy',
    passage:
      'Unlike most migratory birds, Clark\'s nutcrackers remain in mountainous regions year-round. They survive harsh winters by retrieving seeds they buried during autumn — sometimes recalling the locations of thousands of individual caches.',
    question:
      'According to the passage, what enables Clark\'s nutcrackers to survive winter in mountainous regions?',
    options: [
      { letter: 'A', text: 'They migrate to lower elevations when temperatures drop.' },
      { letter: 'B', text: 'They rely on food stored earlier in the year.' },
      { letter: 'C', text: 'They enter a state of hibernation during the coldest months.' },
      { letter: 'D', text: 'They switch to a diet of insects found beneath tree bark.' },
    ],
    correct: 'B',
    explanation:
      'The passage states that the birds survive harsh winters by "retrieving seeds they buried during autumn," meaning they rely on food they stored earlier in the year.',
  },

  // Q3 — Transitions (easy)
  {
    id: 'sat1_rw_003',
    section: 'rw1',
    category: 'reading',
    subcategory: 'transitions',
    difficulty: 'easy',
    passage: null,
    question:
      'Marine biologists have long known that coral reefs support extraordinary biodiversity. _______, recent studies reveal that reefs also play a critical role in protecting coastlines from storm surges.',
    options: [
      { letter: 'A', text: 'Nevertheless' },
      { letter: 'B', text: 'For instance' },
      { letter: 'C', text: 'Moreover' },
      { letter: 'D', text: 'Instead' },
    ],
    correct: 'C',
    explanation:
      '"Moreover" correctly signals that the second sentence adds an additional benefit of coral reefs (coastline protection) to the one already mentioned (biodiversity support). The relationship is additive, not contrastive or illustrative.',
  },

  // Q4 — Grammar (easy)
  {
    id: 'sat1_rw_004',
    section: 'rw1',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'easy',
    passage: null,
    question:
      'The documentary filmmaker, along with her two assistants, _______ currently editing footage from the expedition to the Galápagos Islands.',
    options: [
      { letter: 'A', text: 'is' },
      { letter: 'B', text: 'are' },
      { letter: 'C', text: 'were' },
      { letter: 'D', text: 'have been' },
    ],
    correct: 'A',
    explanation:
      'The subject is "filmmaker" (singular), not "assistants." The phrase "along with her two assistants" is a parenthetical modifier set off by commas and does not change the number of the subject. The singular verb "is" agrees with "filmmaker," and the present tense matches "currently."',
  },

  // Q5 — Evidence-based (medium)
  {
    id: 'sat1_rw_005',
    section: 'rw1',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'medium',
    passage:
      'Some historians argue that the printing press alone did not cause the rapid spread of literacy in early modern Europe. They point out that in regions where printed books were widely available, literacy rates remained low for decades unless local institutions — churches, guilds, or municipal governments — actively promoted reading instruction.',
    question:
      'Which finding, if true, would most directly support the historians\' argument described in the passage?',
    options: [
      { letter: 'A', text: 'Cities that established publicly funded reading schools saw literacy rates rise faster than cities with more bookshops but no such schools.' },
      { letter: 'B', text: 'The cost of printed books declined steadily throughout the sixteenth century.' },
      { letter: 'C', text: 'Many early printed works were religious texts intended for use by clergy rather than laypeople.' },
      { letter: 'D', text: 'Regions with higher population density tended to have more printing presses per capita.' },
    ],
    correct: 'A',
    explanation:
      'The historians argue that institutional support for reading instruction, not merely the availability of printed materials, drove literacy. A finding that cities with reading schools outpaced cities with more bookshops (but no schools) directly supports this claim.',
  },

  // Q6 — Rhetoric/Purpose (medium)
  {
    id: 'sat1_rw_006',
    section: 'rw1',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'medium',
    passage:
      'When people picture the Sahara Desert, they often imagine an endless sea of sand dunes. In reality, sand dunes cover only about 25 percent of the Sahara; the rest consists of rocky plateaus, gravel plains, dry valleys, and even occasional mountain ranges reaching over 11,000 feet.',
    question:
      'What is the main purpose of the passage?',
    options: [
      { letter: 'A', text: 'To argue that the Sahara should be classified as more than one type of biome' },
      { letter: 'B', text: 'To correct a common misconception about the Sahara\'s landscape' },
      { letter: 'C', text: 'To explain why sand dunes form in certain parts of the Sahara but not others' },
      { letter: 'D', text: 'To compare the Sahara\'s terrain with that of other major deserts' },
    ],
    correct: 'B',
    explanation:
      'The passage opens by describing what people commonly imagine (endless sand dunes) and then contrasts that image with reality (diverse terrain). Its primary purpose is to correct this misconception.',
  },

  // Q7 — Punctuation (easy)
  {
    id: 'sat1_rw_007',
    section: 'rw1',
    category: 'reading',
    subcategory: 'punctuation',
    difficulty: 'easy',
    passage: null,
    question:
      'The cellist performed three _______ Bach, Dvořák, and Elgar — during the evening recital.',
    options: [
      { letter: 'A', text: 'composers works:' },
      { letter: 'B', text: 'composers\' works —' },
      { letter: 'C', text: 'composer\'s works:' },
      { letter: 'D', text: 'composers works —' },
    ],
    correct: 'B',
    explanation:
      'Because the works belong to multiple composers (Bach, Dvořák, and Elgar), the plural possessive "composers\'" is needed. A dash is required to open the parenthetical list that is closed by the dash after "Elgar."',
  },

  // Q8 — Sentence structure (medium)
  {
    id: 'sat1_rw_008',
    section: 'rw1',
    category: 'reading',
    subcategory: 'sentence-structure',
    difficulty: 'medium',
    passage: null,
    question:
      'Which choice most effectively combines the two sentences?\n\nThe museum\'s new wing was designed by the acclaimed architect Maya Lin. It features a glass atrium that floods the interior with natural light.',
    options: [
      { letter: 'A', text: 'The museum\'s new wing was designed by the acclaimed architect Maya Lin, it features a glass atrium that floods the interior with natural light.' },
      { letter: 'B', text: 'Designed by the acclaimed architect Maya Lin, the museum\'s new wing features a glass atrium that floods the interior with natural light.' },
      { letter: 'C', text: 'The museum\'s new wing was designed by the acclaimed architect Maya Lin, featuring a glass atrium that floods the interior with natural light and being designed by her.' },
      { letter: 'D', text: 'The museum\'s new wing was designed by the acclaimed architect Maya Lin and it features a glass atrium that floods the interior with natural light.' },
    ],
    correct: 'B',
    explanation:
      'Choice B uses a participial phrase to subordinate the designer information and smoothly combine both sentences without redundancy. Choice A is a comma splice, C is wordy and redundant, and D lacks a comma before the coordinating conjunction joining two independent clauses.',
  },

  // Q9 — Vocabulary (medium)
  {
    id: 'sat1_rw_009',
    section: 'rw1',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'medium',
    passage:
      'During the negotiations, the ambassador adopted a conciliatory tone, offering several compromises and expressing willingness to revisit her delegation\'s earlier demands.',
    question:
      'As used in the passage, "conciliatory" most nearly means',
    options: [
      { letter: 'A', text: 'apologetic and regretful' },
      { letter: 'B', text: 'intended to gain goodwill and reduce conflict' },
      { letter: 'C', text: 'secretive and evasive' },
      { letter: 'D', text: 'forceful and persuasive' },
    ],
    correct: 'B',
    explanation:
      'The context shows the ambassador offering compromises and willingness to revisit demands — actions aimed at reducing tension and gaining goodwill. This matches the meaning "intended to gain goodwill and reduce conflict."',
  },

  // Q10 — Comprehension (medium)
  {
    id: 'sat1_rw_010',
    section: 'rw1',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'medium',
    passage:
      'In a 2023 study, researchers found that urban trees remove roughly 711,000 metric tons of air pollution annually in the United States. The trees\' canopies intercept particulate matter, while their leaves absorb gaseous pollutants such as ozone and nitrogen dioxide. However, the researchers cautioned that these benefits vary widely depending on species, canopy density, and proximity to emission sources.',
    question:
      'Based on the passage, which statement best describes the researchers\' overall finding?',
    options: [
      { letter: 'A', text: 'Urban trees are more effective at removing pollution than industrial filtration systems.' },
      { letter: 'B', text: 'Urban trees provide measurable pollution-removal benefits, though the extent depends on several factors.' },
      { letter: 'C', text: 'Only certain rare species of urban trees are capable of absorbing gaseous pollutants.' },
      { letter: 'D', text: 'The pollution-removal benefits of urban trees have been greatly exaggerated by previous studies.' },
    ],
    correct: 'B',
    explanation:
      'The passage quantifies the pollution trees remove (711,000 metric tons) and then notes the researchers\' caution that benefits "vary widely depending on species, canopy density, and proximity to emission sources." This supports B — measurable benefits that depend on several factors.',
  },

  // Q11 — Expression of ideas (medium)
  {
    id: 'sat1_rw_011',
    section: 'rw1',
    category: 'reading',
    subcategory: 'expression-of-ideas',
    difficulty: 'medium',
    passage:
      'Historian Lydia Chen is writing a paper about the Silk Road. She wants to emphasize the diversity of goods that traveled along the trade routes.',
    question:
      'Which choice most effectively accomplishes the goal described above?',
    options: [
      { letter: 'A', text: 'The Silk Road was a network of trade routes that connected the East and the West for many centuries.' },
      { letter: 'B', text: 'Merchants along the Silk Road transported not only silk but also spices, glassware, precious metals, and paper — goods representing dozens of distinct cultures and industries.' },
      { letter: 'C', text: 'The Silk Road got its name from the Chinese silk that was one of the most important commodities traded along the route.' },
      { letter: 'D', text: 'Scholars continue to debate exactly when the Silk Road first became an organized system of trade.' },
    ],
    correct: 'B',
    explanation:
      'The goal is to emphasize the diversity of goods. Choice B lists multiple different types of goods (silk, spices, glassware, precious metals, paper) and describes them as representing "dozens of distinct cultures and industries," directly emphasizing diversity.',
  },

  // Q12 — Evidence-based (hard)
  {
    id: 'sat1_rw_012',
    section: 'rw1',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'hard',
    passage:
      'Psychologist Dr. Anil Gupta hypothesizes that bilingual individuals switch between languages not merely in response to conversational context but also as a subconscious strategy for emotional regulation. He proposes that speakers gravitate toward whichever language they associate with greater emotional distance when discussing distressing topics.',
    question:
      'Which finding, if true, would most directly undermine Dr. Gupta\'s hypothesis?',
    options: [
      { letter: 'A', text: 'Bilingual speakers tend to use their first language more frequently in professional settings.' },
      { letter: 'B', text: 'When discussing distressing topics, bilingual speakers show no measurable preference for either language regardless of which language they learned first.' },
      { letter: 'C', text: 'Trilingual speakers report feeling equally comfortable in all three of their languages.' },
      { letter: 'D', text: 'Some bilingual speakers report that they dream in both languages.' },
    ],
    correct: 'B',
    explanation:
      'Dr. Gupta\'s hypothesis predicts that bilingual speakers will gravitate toward the language with greater emotional distance when discussing distressing topics. If speakers show no preference at all during distressing discussions, this directly contradicts the predicted behavior.',
  },

  // Q13 — Grammar (medium)
  {
    id: 'sat1_rw_013',
    section: 'rw1',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'medium',
    passage: null,
    question:
      'Neither the professor nor her graduate students _______ able to replicate the results described in the original paper.',
    options: [
      { letter: 'A', text: 'was' },
      { letter: 'B', text: 'is' },
      { letter: 'C', text: 'were' },
      { letter: 'D', text: 'has been' },
    ],
    correct: 'C',
    explanation:
      'With "neither...nor," the verb agrees with the nearer subject. "Students" is plural and nearest to the verb, so the plural past-tense "were" is correct.',
  },

  // Q14 — Rhetoric/Purpose (hard)
  {
    id: 'sat1_rw_014',
    section: 'rw1',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'hard',
    passage:
      'In her 1962 book Silent Spring, Rachel Carson described how the pesticide DDT accumulated in the tissues of birds, thinning their eggshells and threatening entire populations. Carson\'s vivid depictions of decimated bird communities galvanized public concern and ultimately contributed to a nationwide ban on DDT.',
    question:
      'The author of the passage most likely mentions Carson\'s "vivid depictions of decimated bird communities" primarily to',
    options: [
      { letter: 'A', text: 'argue that Carson exaggerated the ecological dangers of DDT' },
      { letter: 'B', text: 'illustrate how Carson\'s rhetorical approach influenced public opinion and policy' },
      { letter: 'C', text: 'provide evidence that DDT was the sole cause of declining bird populations in the 1960s' },
      { letter: 'D', text: 'criticize policymakers for relying on emotional appeals rather than scientific data' },
    ],
    correct: 'B',
    explanation:
      'The passage connects Carson\'s "vivid depictions" directly to their effects: galvanizing public concern and contributing to a ban. The mention thus illustrates how her rhetorical approach influenced opinion and policy.',
  },

  // Q15 — Transitions (medium)
  {
    id: 'sat1_rw_015',
    section: 'rw1',
    category: 'reading',
    subcategory: 'transitions',
    difficulty: 'medium',
    passage: null,
    question:
      'Early astronomers believed that the Sun revolved around the Earth. _______, Copernicus proposed a heliocentric model in which the Earth and other planets orbit the Sun.',
    options: [
      { letter: 'A', text: 'Similarly' },
      { letter: 'B', text: 'In contrast' },
      { letter: 'C', text: 'Consequently' },
      { letter: 'D', text: 'In addition' },
    ],
    correct: 'B',
    explanation:
      'Copernicus\'s heliocentric model directly contradicts the earlier geocentric belief. "In contrast" correctly signals this opposition between the two ideas.',
  },

  // Q16 — Comprehension (easy)
  {
    id: 'sat1_rw_016',
    section: 'rw1',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'easy',
    passage:
      'Honeybees communicate the location of food sources through a behavior known as the waggle dance. A forager bee performs a figure-eight movement on the honeycomb, with the angle of the central "waggle" portion indicating the direction of the food relative to the Sun and the duration of the waggle conveying the distance.',
    question:
      'According to the passage, what information does the duration of the waggle convey?',
    options: [
      { letter: 'A', text: 'The quality of the food source' },
      { letter: 'B', text: 'The direction of the food relative to the hive' },
      { letter: 'C', text: 'The distance to the food source' },
      { letter: 'D', text: 'The number of foragers needed to collect the food' },
    ],
    correct: 'C',
    explanation:
      'The passage explicitly states that "the duration of the waggle conveying the distance." Therefore, the duration communicates how far away the food source is.',
  },

  // Q17 — Punctuation (medium)
  {
    id: 'sat1_rw_017',
    section: 'rw1',
    category: 'reading',
    subcategory: 'punctuation',
    difficulty: 'medium',
    passage: null,
    question:
      'Dr. Okafor, who has studied volcanic activity for over two _______ that the eruption was likely triggered by a shift in tectonic pressure beneath the caldera.',
    options: [
      { letter: 'A', text: 'decades, concluded' },
      { letter: 'B', text: 'decades concluded' },
      { letter: 'C', text: 'decades; concluded' },
      { letter: 'D', text: 'decades. Concluded' },
    ],
    correct: 'A',
    explanation:
      'The clause "who has studied volcanic activity for over two decades" is a nonrestrictive (nonessential) relative clause modifying "Dr. Okafor." It must be set off by commas on both sides. The opening comma appears after "Okafor," and the closing comma must appear after "decades."',
  },

  // Q18 — Vocabulary (hard)
  {
    id: 'sat1_rw_018',
    section: 'rw1',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'hard',
    passage:
      'The novelist\'s prose style is often described as pellucid: even when she addresses complex philosophical themes, her sentences remain transparent and accessible to a broad readership.',
    question:
      'As used in the passage, "pellucid" most nearly means',
    options: [
      { letter: 'A', text: 'poetic and lyrical' },
      { letter: 'B', text: 'exceptionally clear' },
      { letter: 'C', text: 'deliberately provocative' },
      { letter: 'D', text: 'meticulously researched' },
    ],
    correct: 'B',
    explanation:
      'The passage equates "pellucid" with sentences that are "transparent and accessible," directly indicating that the word means exceptionally clear.',
  },

  // Q19 — Sentence structure (hard)
  {
    id: 'sat1_rw_019',
    section: 'rw1',
    category: 'reading',
    subcategory: 'sentence-structure',
    difficulty: 'hard',
    passage: null,
    question:
      'Which choice completes the sentence so that it is grammatically correct?\n\nThe researchers published a study _______ that microplastics in ocean water can transfer harmful chemicals to marine organisms that ingest them.',
    options: [
      { letter: 'A', text: 'demonstrating' },
      { letter: 'B', text: 'having been demonstrated' },
      { letter: 'C', text: 'it demonstrated' },
      { letter: 'D', text: 'and having demonstrated' },
    ],
    correct: 'A',
    explanation:
      'The present participle "demonstrating" functions as a participial phrase modifying "study," creating a grammatically correct sentence. Choice B uses the passive and implies the study was demonstrated by something else. Choice C creates a comma splice / run-on. Choice D is awkward and creates a faulty parallel structure.',
  },

  // Q20 — Synthesis (hard)
  {
    id: 'sat1_rw_020',
    section: 'rw1',
    category: 'reading',
    subcategory: 'synthesis',
    difficulty: 'hard',
    passage:
      'A town council is deciding whether to convert an abandoned rail corridor into a public greenway. Supporters argue the greenway would increase property values along the route by an estimated 12 percent, attract tourism revenue, and provide residents with safe pedestrian and cycling paths. Opponents counter that the $4.2 million construction cost is prohibitive for a town with a $30 million annual budget, and they worry about ongoing maintenance expenses.',
    question:
      'Which statement, if added to the passage, would most effectively address the opponents\' concern while strengthening the supporters\' position?',
    options: [
      { letter: 'A', text: 'A neighboring town completed a similar greenway project that won a national design award.' },
      { letter: 'B', text: 'The state has offered a matching grant that would cover half the construction cost, and a local cycling organization has pledged to fund annual trail maintenance.' },
      { letter: 'C', text: 'Property owners along the route have expressed enthusiasm for the project at public meetings.' },
      { letter: 'D', text: 'The rail corridor has been abandoned for over twenty years and currently attracts illegal dumping.' },
    ],
    correct: 'B',
    explanation:
      'Opponents are concerned about construction cost and ongoing maintenance. Choice B directly addresses both concerns: a matching grant halves construction cost, and the cycling organization covers maintenance. This simultaneously resolves the opposition and strengthens the case for the greenway.',
  },

  // Q21 — Grammar (easy)
  {
    id: 'sat1_rw_021',
    section: 'rw1',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'easy',
    passage: null,
    question:
      'Each of the paintings in the gallery _______ a small brass plaque identifying the artist and year of completion.',
    options: [
      { letter: 'A', text: 'have' },
      { letter: 'B', text: 'has' },
      { letter: 'C', text: 'are having' },
      { letter: 'D', text: 'were having' },
    ],
    correct: 'B',
    explanation:
      'The subject is "Each," which is singular regardless of the prepositional phrase "of the paintings." The singular verb "has" correctly agrees with "Each."',
  },

  // Q22 — Evidence-based (medium)
  {
    id: 'sat1_rw_022',
    section: 'rw1',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'medium',
    passage:
      'Economists have proposed that raising the minimum wage leads to higher unemployment among low-skilled workers because businesses reduce hiring to offset increased labor costs. However, a study of restaurant employment in adjacent counties across state borders with different minimum wage levels found no significant difference in employment rates.',
    question:
      'How does the study described in the passage relate to the economists\' proposal?',
    options: [
      { letter: 'A', text: 'It provides direct evidence supporting the proposal.' },
      { letter: 'B', text: 'It offers a possible explanation for why the proposal might be correct in some industries but not others.' },
      { letter: 'C', text: 'It presents empirical findings that challenge the proposal.' },
      { letter: 'D', text: 'It confirms the proposal by showing that businesses adapt to wage increases.' },
    ],
    correct: 'C',
    explanation:
      'The economists\' proposal predicts that higher minimum wages cause higher unemployment. The study found "no significant difference in employment rates" between higher- and lower-minimum-wage areas, which challenges (contradicts) the proposal.',
  },

  // Q23 — Expression of ideas (medium)
  {
    id: 'sat1_rw_023',
    section: 'rw1',
    category: 'reading',
    subcategory: 'expression-of-ideas',
    difficulty: 'medium',
    passage:
      'A student is writing a research paper about renewable energy adoption. She wants to provide specific evidence that solar energy costs have decreased over time.',
    question:
      'Which choice most effectively accomplishes the goal described above?',
    options: [
      { letter: 'A', text: 'Solar energy has become increasingly popular in many countries around the world.' },
      { letter: 'B', text: 'Many experts believe that solar energy will play an important role in the future energy landscape.' },
      { letter: 'C', text: 'Between 2010 and 2023, the cost of utility-scale solar photovoltaic panels fell by approximately 89 percent, making solar one of the cheapest sources of new electricity generation.' },
      { letter: 'D', text: 'Solar panels convert sunlight into electricity through the photovoltaic effect, a process first discovered in 1839.' },
    ],
    correct: 'C',
    explanation:
      'The goal is to provide specific evidence of cost decreases. Choice C gives concrete data (89 percent decline from 2010 to 2023), directly fulfilling the requirement for specific evidence about declining costs.',
  },

  // Q24 — Comprehension (hard)
  {
    id: 'sat1_rw_024',
    section: 'rw1',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'hard',
    passage:
      'Art historian Mei-Ling Zhou argues that the traditional Western division between "fine art" and "craft" reflects not inherent differences in aesthetic value but rather historical biases rooted in class and gender. She notes that practices like textile weaving and ceramics — often dismissed as mere craft — demand the same creative vision and technical mastery as painting or sculpture, yet have been undervalued because they were historically associated with women and working-class artisans.',
    question:
      'Which statement best captures Zhou\'s central argument?',
    options: [
      { letter: 'A', text: 'Textile weaving requires more technical skill than painting.' },
      { letter: 'B', text: 'The distinction between fine art and craft is based on social prejudices rather than genuine differences in artistic merit.' },
      { letter: 'C', text: 'Western art history should focus exclusively on crafts that have been historically neglected.' },
      { letter: 'D', text: 'Working-class artisans have always produced work of higher quality than formally trained artists.' },
    ],
    correct: 'B',
    explanation:
      'Zhou\'s argument is that the fine-art/craft divide reflects "historical biases rooted in class and gender" rather than real differences in "aesthetic value." This is best captured by choice B.',
  },

  // Q25 — Transitions (hard)
  {
    id: 'sat1_rw_025',
    section: 'rw1',
    category: 'reading',
    subcategory: 'transitions',
    difficulty: 'hard',
    passage: null,
    question:
      'The city\'s new flood barriers were engineered to withstand a once-in-a-century storm surge. _______, the barriers were not designed to handle the compound threat of simultaneous river flooding and coastal storm surges — a scenario that climate models suggest is becoming increasingly likely.',
    options: [
      { letter: 'A', text: 'That is' },
      { letter: 'B', text: 'Likewise' },
      { letter: 'C', text: 'However' },
      { letter: 'D', text: 'Therefore' },
    ],
    correct: 'C',
    explanation:
      'The first sentence describes the barriers\' capability, and the second introduces a limitation. "However" correctly signals this contrast between what the barriers can withstand and what they cannot.',
  },

  // Q26 — Rhetoric/Purpose (medium)
  {
    id: 'sat1_rw_026',
    section: 'rw1',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'medium',
    passage:
      'In his Gettysburg Address, Abraham Lincoln did not merely commemorate the fallen soldiers; he redefined the purpose of the Civil War itself. By framing the conflict as a test of whether a nation "conceived in Liberty" could endure, Lincoln transformed a battlefield dedication into a statement of national ideals.',
    question:
      'The passage characterizes Lincoln\'s Gettysburg Address primarily as',
    options: [
      { letter: 'A', text: 'a military strategy disguised as a speech' },
      { letter: 'B', text: 'a eulogy that avoided discussing the war\'s causes' },
      { letter: 'C', text: 'a rhetorical act that elevated a commemoration into a declaration of principle' },
      { letter: 'D', text: 'an attempt to justify the Union\'s military tactics' },
    ],
    correct: 'C',
    explanation:
      'The passage states Lincoln "transformed a battlefield dedication into a statement of national ideals" and redefined the war\'s purpose. This describes the Address as a rhetorical act that elevated commemoration into a declaration of principle.',
  },

  // Q27 — Punctuation (hard)
  {
    id: 'sat1_rw_027',
    section: 'rw1',
    category: 'reading',
    subcategory: 'punctuation',
    difficulty: 'hard',
    passage: null,
    question:
      'The enzyme, which catalyzes the breakdown of cellulose into _______ is found only in certain species of fungi.',
    options: [
      { letter: 'A', text: 'glucose, was first identified in 1950 and' },
      { letter: 'B', text: 'glucose was first identified in 1950, and' },
      { letter: 'C', text: 'glucose, was first identified in 1950, and' },
      { letter: 'D', text: 'glucose — was first identified in 1950 and' },
    ],
    correct: 'C',
    explanation:
      'The nonrestrictive clause "which catalyzes the breakdown of cellulose into glucose" must be closed with a comma after "glucose." Then "was first identified in 1950" continues the main clause about the enzyme. A comma before "and" is needed because "and" joins two independent predicates of the main clause ("was first identified" and "is found"). Choice C provides both required commas.',
  },

  // ============================================================
  // MODULE 2 (rw2): Questions 28–54
  // ============================================================

  // Q28 — Vocabulary (easy)
  {
    id: 'sat1_rw_028',
    section: 'rw2',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'easy',
    passage:
      'After weeks of fruitless searching, the detective finally uncovered a crucial piece of evidence hidden in the suspect\'s financial records.',
    question:
      'As used in the passage, "fruitless" most nearly means',
    options: [
      { letter: 'A', text: 'unpleasant' },
      { letter: 'B', text: 'unproductive' },
      { letter: 'C', text: 'incomplete' },
      { letter: 'D', text: 'dishonest' },
    ],
    correct: 'B',
    explanation:
      'The word "fruitless" is contrasted with the detective "finally" uncovering evidence, suggesting the previous weeks yielded no results. "Unproductive" best captures this meaning.',
  },

  // Q29 — Comprehension (easy)
  {
    id: 'sat1_rw_029',
    section: 'rw2',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'easy',
    passage:
      'The axolotl, a salamander native to lakes near Mexico City, is remarkable for its ability to regenerate entire limbs, portions of its spinal cord, and even parts of its brain. Unlike most amphibians, the axolotl retains its larval features throughout adulthood, a phenomenon known as neoteny.',
    question:
      'Based on the passage, what is neoteny?',
    options: [
      { letter: 'A', text: 'The ability to regenerate damaged body parts' },
      { letter: 'B', text: 'A condition in which an organism keeps juvenile traits into adulthood' },
      { letter: 'C', text: 'A defense mechanism used by amphibians to avoid predators' },
      { letter: 'D', text: 'The process by which salamanders adapt to lake environments' },
    ],
    correct: 'B',
    explanation:
      'The passage defines neoteny as the phenomenon in which the axolotl "retains its larval features throughout adulthood." This corresponds to keeping juvenile traits into adulthood.',
  },

  // Q30 — Grammar (easy)
  {
    id: 'sat1_rw_030',
    section: 'rw2',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'easy',
    passage: null,
    question:
      'The committee finally reached _______ decision after deliberating for over six hours.',
    options: [
      { letter: 'A', text: 'it\'s' },
      { letter: 'B', text: 'its' },
      { letter: 'C', text: 'their' },
      { letter: 'D', text: 'they\'re' },
    ],
    correct: 'B',
    explanation:
      '"Committee" is a singular collective noun, so the singular possessive pronoun "its" is correct. "It\'s" is a contraction of "it is," "their" would require a plural antecedent, and "they\'re" means "they are."',
  },

  // Q31 — Evidence-based (medium)
  {
    id: 'sat1_rw_031',
    section: 'rw2',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'medium',
    passage:
      'Geologist Maria Torres proposes that a massive volcanic eruption in Indonesia approximately 74,000 years ago caused a "volcanic winter" that nearly drove early humans to extinction. She cites genetic evidence showing that the human population may have been reduced to as few as 10,000 individuals around that time.',
    question:
      'Which finding, if true, would most weaken Torres\'s proposal?',
    options: [
      { letter: 'A', text: 'Analysis of ice cores shows a significant drop in global temperatures around 74,000 years ago.' },
      { letter: 'B', text: 'Archaeological sites from the period show continuous human habitation with no signs of population disruption across multiple continents.' },
      { letter: 'C', text: 'Other large volcanic eruptions have occurred throughout human history.' },
      { letter: 'D', text: 'The Indonesian eruption produced more ash than any other eruption in the last 100,000 years.' },
    ],
    correct: 'B',
    explanation:
      'Torres claims the eruption nearly drove humans to extinction. If archaeological evidence shows continuous, undisrupted habitation across multiple continents during that period, it directly contradicts the claim of near-extinction.',
  },

  // Q32 — Transitions (easy)
  {
    id: 'sat1_rw_032',
    section: 'rw2',
    category: 'reading',
    subcategory: 'transitions',
    difficulty: 'easy',
    passage: null,
    question:
      'The restaurant is famous for its seafood dishes. _______, its lobster bisque has been featured in several national food magazines.',
    options: [
      { letter: 'A', text: 'On the other hand' },
      { letter: 'B', text: 'In particular' },
      { letter: 'C', text: 'Nevertheless' },
      { letter: 'D', text: 'As a result' },
    ],
    correct: 'B',
    explanation:
      'The second sentence provides a specific example (lobster bisque) of the general claim in the first sentence (famous for seafood). "In particular" correctly signals that a specific instance is being highlighted.',
  },

  // Q33 — Rhetoric/Purpose (medium)
  {
    id: 'sat1_rw_033',
    section: 'rw2',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'medium',
    passage:
      'Japanese potter Shoji Hamada deliberately avoided signing his works. He believed that pottery should be valued for its form and function rather than for the reputation of its maker. By refusing to mark his pieces, Hamada challenged the Western art market\'s emphasis on individual celebrity.',
    question:
      'The passage suggests that Hamada\'s refusal to sign his works was primarily motivated by',
    options: [
      { letter: 'A', text: 'a desire to prevent forgeries of his pottery' },
      { letter: 'B', text: 'a philosophical conviction about how pottery should be appreciated' },
      { letter: 'C', text: 'a marketing strategy to increase the mystery surrounding his work' },
      { letter: 'D', text: 'a tradition that Japanese potters are required to follow' },
    ],
    correct: 'B',
    explanation:
      'The passage states Hamada "believed that pottery should be valued for its form and function rather than for the reputation of its maker." His refusal to sign was rooted in this philosophical conviction.',
  },

  // Q34 — Sentence structure (medium)
  {
    id: 'sat1_rw_034',
    section: 'rw2',
    category: 'reading',
    subcategory: 'sentence-structure',
    difficulty: 'medium',
    passage: null,
    question:
      'Which choice creates a grammatically correct and logical sentence?\n\n_______ the new telescope\'s mirrors can detect infrared light from galaxies that formed shortly after the Big Bang.',
    options: [
      { letter: 'A', text: 'Orbiting far beyond Earth\'s atmosphere,' },
      { letter: 'B', text: 'Because it orbits far beyond Earth\'s atmosphere, so' },
      { letter: 'C', text: 'Having been orbiting far beyond Earth\'s atmosphere, and' },
      { letter: 'D', text: 'It orbits far beyond Earth\'s atmosphere,' },
    ],
    correct: 'A',
    explanation:
      'Choice A uses a participial phrase that correctly modifies "the new telescope\'s mirrors" (the telescope orbits beyond the atmosphere). Choices B and D create run-on or syntactically broken sentences, and choice C is grammatically awkward with the unnecessary "and."',
  },

  // Q35 — Vocabulary (medium)
  {
    id: 'sat1_rw_035',
    section: 'rw2',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'medium',
    passage:
      'The CEO\'s decision to divest the company\'s fossil fuel holdings was lauded by environmental groups but met with skepticism from shareholders who doubted it would improve long-term profitability.',
    question:
      'As used in the passage, "lauded" most nearly means',
    options: [
      { letter: 'A', text: 'questioned' },
      { letter: 'B', text: 'noticed' },
      { letter: 'C', text: 'praised' },
      { letter: 'D', text: 'funded' },
    ],
    correct: 'C',
    explanation:
      'The passage contrasts the environmental groups\' positive reaction ("lauded") with shareholders\' "skepticism." "Praised" correctly captures the positive response implied by this contrast.',
  },

  // Q36 — Expression of ideas (hard)
  {
    id: 'sat1_rw_036',
    section: 'rw2',
    category: 'reading',
    subcategory: 'expression-of-ideas',
    difficulty: 'hard',
    passage:
      'A science journalist is writing an article about CRISPR gene-editing technology. She wants to convey both the promise and the ethical complexity of the technology in a single sentence.',
    question:
      'Which choice most effectively accomplishes the goal described above?',
    options: [
      { letter: 'A', text: 'CRISPR allows scientists to edit genes with unprecedented precision, raising hopes for curing genetic diseases but also igniting debates about the morality of altering human embryos.' },
      { letter: 'B', text: 'CRISPR is a gene-editing technology that has generated significant interest in the scientific community.' },
      { letter: 'C', text: 'Scientists have used CRISPR to edit the genes of plants, animals, and even human cells in laboratory settings.' },
      { letter: 'D', text: 'Many people are concerned about the potential misuse of CRISPR technology by unregulated laboratories.' },
    ],
    correct: 'A',
    explanation:
      'Only choice A addresses both the promise ("raising hopes for curing genetic diseases") and the ethical complexity ("debates about the morality of altering human embryos") in a single sentence.',
  },

  // Q37 — Comprehension (medium)
  {
    id: 'sat1_rw_037',
    section: 'rw2',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'medium',
    passage:
      'When the renowned physicist Chien-Shiung Wu designed her 1956 experiment on beta decay, many of her male colleagues dismissed the possibility that the results would challenge the law of conservation of parity. Wu\'s experiment proved that parity is not conserved in weak nuclear interactions — a finding so groundbreaking that it earned a Nobel Prize, though the prize was awarded to two male theorists who had proposed the idea rather than to Wu, who had provided the definitive experimental proof.',
    question:
      'The passage implies which of the following about the Nobel Prize decision?',
    options: [
      { letter: 'A', text: 'The Nobel committee believed that theoretical work was more important than experimental work.' },
      { letter: 'B', text: 'Wu\'s experimental contribution was overlooked in the awarding of the prize.' },
      { letter: 'C', text: 'Wu declined the Nobel Prize for personal reasons.' },
      { letter: 'D', text: 'The two male theorists had also conducted the experiment independently.' },
    ],
    correct: 'B',
    explanation:
      'The passage emphasizes that Wu provided "the definitive experimental proof" but the prize went to the theorists rather than to her. The phrasing "though the prize was awarded to two male theorists... rather than to Wu" strongly implies her contribution was overlooked.',
  },

  // Q38 — Punctuation (easy)
  {
    id: 'sat1_rw_038',
    section: 'rw2',
    category: 'reading',
    subcategory: 'punctuation',
    difficulty: 'easy',
    passage: null,
    question:
      'The park ranger warned hikers to stay on the marked _______ straying off the path could damage fragile alpine vegetation.',
    options: [
      { letter: 'A', text: 'trails, because' },
      { letter: 'B', text: 'trails because,' },
      { letter: 'C', text: 'trails. Because' },
      { letter: 'D', text: 'trails: because,' },
    ],
    correct: 'A',
    explanation:
      'A comma before "because" is acceptable here to introduce the reason clause, and the sentence remains a single complete thought. Choice B misplaces the comma. Choice C creates a fragment starting with "Because." Choice D uses an unnecessary colon.',
  },

  // Q39 — Grammar (medium)
  {
    id: 'sat1_rw_039',
    section: 'rw2',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'medium',
    passage: null,
    question:
      'By the time the rescue team arrived at the summit, the stranded climbers _______ there for nearly eighteen hours.',
    options: [
      { letter: 'A', text: 'waited' },
      { letter: 'B', text: 'have waited' },
      { letter: 'C', text: 'had been waiting' },
      { letter: 'D', text: 'will have waited' },
    ],
    correct: 'C',
    explanation:
      'The past perfect progressive "had been waiting" is correct because the waiting began before the rescue team arrived (a past event) and continued up to that point. Simple past and present perfect do not capture this relationship, and future perfect is the wrong time frame.',
  },

  // Q40 — Evidence-based (hard)
  {
    id: 'sat1_rw_040',
    section: 'rw2',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'hard',
    passage:
      'Sociologist Dr. Priya Sharma has proposed that remote work does not reduce workplace collaboration, as many critics claim, but instead changes its nature. She argues that remote workers engage in more deliberate, asynchronous communication — such as detailed written updates and recorded video summaries — which can actually improve the quality of information sharing compared to spontaneous hallway conversations.',
    question:
      'Which study result would most directly support Dr. Sharma\'s argument?',
    options: [
      { letter: 'A', text: 'Remote workers report feeling more isolated than their in-office counterparts.' },
      { letter: 'B', text: 'Companies with remote workforces spend more on communication software than companies with in-office workforces.' },
      { letter: 'C', text: 'Teams that shifted to remote work produced written project documentation that was rated as more thorough and actionable than the verbal briefings they had relied on in the office.' },
      { letter: 'D', text: 'Managers of remote teams schedule more frequent one-on-one meetings than managers of in-office teams.' },
    ],
    correct: 'C',
    explanation:
      'Dr. Sharma argues that asynchronous written communication can actually improve information-sharing quality. A finding that remote teams\' written documentation was rated more thorough and actionable than previous verbal briefings directly supports this claim.',
  },

  // Q41 — Rhetoric/Purpose (easy)
  {
    id: 'sat1_rw_041',
    section: 'rw2',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'easy',
    passage:
      'The golden poison frog, found in the rainforests of Colombia, produces enough toxin to kill ten adult humans. Despite its lethal chemistry, the frog measures only about five centimeters in length.',
    question:
      'The author mentions the frog\'s size most likely in order to',
    options: [
      { letter: 'A', text: 'explain why the frog is difficult to find in the wild' },
      { letter: 'B', text: 'highlight the surprising contrast between the frog\'s small size and its extreme toxicity' },
      { letter: 'C', text: 'suggest that larger frogs are less toxic' },
      { letter: 'D', text: 'argue that the frog poses no real danger to humans' },
    ],
    correct: 'B',
    explanation:
      'The word "Despite" signals a contrast: the frog produces enough toxin to kill ten humans, yet it measures only five centimeters. The size detail emphasizes how surprising its lethality is given its small stature.',
  },

  // Q42 — Transitions (medium)
  {
    id: 'sat1_rw_042',
    section: 'rw2',
    category: 'reading',
    subcategory: 'transitions',
    difficulty: 'medium',
    passage: null,
    question:
      'The architect proposed using reclaimed wood for the building\'s exterior. _______, she suggested installing solar panels on the roof to further reduce the structure\'s environmental impact.',
    options: [
      { letter: 'A', text: 'Conversely' },
      { letter: 'B', text: 'Regardless' },
      { letter: 'C', text: 'Additionally' },
      { letter: 'D', text: 'Specifically' },
    ],
    correct: 'C',
    explanation:
      'Both sentences describe environmentally conscious design choices by the same architect. "Additionally" correctly signals that the second proposal (solar panels) is being added to the first (reclaimed wood).',
  },

  // Q43 — Comprehension (hard)
  {
    id: 'sat1_rw_043',
    section: 'rw2',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'hard',
    passage:
      'In a 2024 experiment, neuroscientists presented participants with a series of moral dilemmas and measured brain activity using functional MRI. They found that participants who chose utilitarian solutions — sacrificing one person to save many — showed heightened activity in the prefrontal cortex, a region associated with rational deliberation. Those who refused to sacrifice anyone, even for a greater good, displayed stronger activation in the amygdala, which processes emotional responses.',
    question:
      'Based on the passage, which conclusion is best supported by the experimental findings?',
    options: [
      { letter: 'A', text: 'Utilitarian moral judgments are superior to emotion-based moral judgments.' },
      { letter: 'B', text: 'The prefrontal cortex and the amygdala play distinct roles in different types of moral decision-making.' },
      { letter: 'C', text: 'People who make utilitarian choices lack the capacity for emotional response.' },
      { letter: 'D', text: 'Moral dilemmas can only be resolved through rational deliberation.' },
    ],
    correct: 'B',
    explanation:
      'The experiment found that utilitarian choices correlated with prefrontal cortex activity (rational deliberation) while non-utilitarian choices correlated with amygdala activity (emotional processing). This supports the conclusion that the two brain regions play distinct roles in different types of moral decisions. The passage does not claim one approach is "superior" or that utilitarian choosers lack emotion.',
  },

  // Q44 — Grammar (hard)
  {
    id: 'sat1_rw_044',
    section: 'rw2',
    category: 'reading',
    subcategory: 'grammar',
    difficulty: 'hard',
    passage: null,
    question:
      'The orchestra performed the symphony magnificently; _______ the conductor had rehearsed with the musicians for only three days.',
    options: [
      { letter: 'A', text: 'moreover' },
      { letter: 'B', text: 'yet' },
      { letter: 'C', text: 'consequently' },
      { letter: 'D', text: 'meanwhile' },
    ],
    correct: 'B',
    explanation:
      'The semicolon joins two independent clauses. The second clause presents a surprising fact (only three days of rehearsal) that contrasts with the first (magnificent performance). "Yet" correctly signals this contrast. "Moreover" adds information, "consequently" shows cause-effect, and "meanwhile" indicates simultaneity — none fit the logic here.',
  },

  // Q45 — Vocabulary (hard)
  {
    id: 'sat1_rw_045',
    section: 'rw2',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'hard',
    passage:
      'The senator\'s equivocal response to questions about the proposed bill left both supporters and opponents uncertain about her actual position. Journalists noted that she had carefully avoided committing to a definitive stance.',
    question:
      'As used in the passage, "equivocal" most nearly means',
    options: [
      { letter: 'A', text: 'passionate and deeply felt' },
      { letter: 'B', text: 'deliberately ambiguous' },
      { letter: 'C', text: 'openly hostile' },
      { letter: 'D', text: 'thoroughly researched' },
    ],
    correct: 'B',
    explanation:
      'The passage states the response left people "uncertain about her actual position" and that she "avoided committing to a definitive stance." This context clearly indicates "equivocal" means deliberately ambiguous.',
  },

  // Q46 — Expression of ideas (easy)
  {
    id: 'sat1_rw_046',
    section: 'rw2',
    category: 'reading',
    subcategory: 'expression-of-ideas',
    difficulty: 'easy',
    passage:
      'A student is writing a paragraph about the benefits of reading for young children. She wants to begin with a clear topic sentence.',
    question:
      'Which choice most effectively serves as a topic sentence for the paragraph described above?',
    options: [
      { letter: 'A', text: 'Many parents read to their children at bedtime.' },
      { letter: 'B', text: 'Reading regularly from an early age strengthens vocabulary development, improves attention span, and fosters empathy in young children.' },
      { letter: 'C', text: 'Libraries often host story time events for families.' },
      { letter: 'D', text: 'Some children prefer picture books, while others enjoy chapter books.' },
    ],
    correct: 'B',
    explanation:
      'A topic sentence should introduce the main idea of the paragraph. Choice B directly addresses the benefits of reading (vocabulary, attention span, empathy) for young children, which matches the paragraph\'s stated purpose.',
  },

  // Q47 — Sentence structure (easy)
  {
    id: 'sat1_rw_047',
    section: 'rw2',
    category: 'reading',
    subcategory: 'sentence-structure',
    difficulty: 'easy',
    passage: null,
    question:
      'Which choice correctly forms a complete sentence?',
    options: [
      { letter: 'A', text: 'Although the experiment yielded unexpected results and the researchers analyzed the data carefully.' },
      { letter: 'B', text: 'The experiment yielded unexpected results, and the researchers analyzed the data carefully.' },
      { letter: 'C', text: 'The experiment yielding unexpected results, and the researchers analyzing the data carefully.' },
      { letter: 'D', text: 'Because the experiment yielded unexpected results, so the researchers analyzed the data carefully.' },
    ],
    correct: 'B',
    explanation:
      'Choice B correctly joins two independent clauses with a comma and the coordinating conjunction "and." Choice A is a fragment (the subordinating conjunction "Although" leaves the sentence incomplete). Choice C has no main verb (only participles). Choice D incorrectly pairs "Because" with "so."',
  },

  // Q48 — Synthesis (medium)
  {
    id: 'sat1_rw_048',
    section: 'rw2',
    category: 'reading',
    subcategory: 'synthesis',
    difficulty: 'medium',
    passage:
      'A school board is considering replacing traditional textbooks with tablets for all students. A technology consultant\'s report notes that tablets offer interactive features, instant updates, and reduced long-term costs. However, a teachers\' survey reveals that 68 percent of instructors believe students are more distracted when using tablets in class, and a recent study found that students who read on screens scored 11 percent lower on comprehension tests than those who read on paper.',
    question:
      'Based on the information provided, which conclusion is best supported?',
    options: [
      { letter: 'A', text: 'The school board should delay the decision because the technology consultant\'s report is unreliable.' },
      { letter: 'B', text: 'Tablets are clearly superior to textbooks for educational purposes.' },
      { letter: 'C', text: 'The potential benefits of tablets must be weighed against evidence suggesting they may hinder student focus and comprehension.' },
      { letter: 'D', text: 'The teachers\' survey is more credible than the technology consultant\'s report.' },
    ],
    correct: 'C',
    explanation:
      'The passage presents both benefits (interactive features, updates, cost savings) and drawbacks (distraction, lower comprehension scores). The best-supported conclusion is that these competing considerations must be weighed against each other.',
  },

  // Q49 — Punctuation (medium)
  {
    id: 'sat1_rw_049',
    section: 'rw2',
    category: 'reading',
    subcategory: 'punctuation',
    difficulty: 'medium',
    passage: null,
    question:
      'The novelist drew inspiration from three primary _______ her childhood in rural Georgia, her travels through Southeast Asia, and her decades-long career as a civil rights attorney.',
    options: [
      { letter: 'A', text: 'sources, they were:' },
      { letter: 'B', text: 'sources:' },
      { letter: 'C', text: 'sources, which were;' },
      { letter: 'D', text: 'sources —' },
    ],
    correct: 'B',
    explanation:
      'A colon correctly introduces the list that follows the complete independent clause "The novelist drew inspiration from three primary sources." Choice A creates a comma splice with "they were." Choice C misuses a semicolon. Choice D could work stylistically, but the colon is the standard and most correct punctuation for introducing a list after a complete clause.',
  },

  // Q50 — Evidence-based (medium)
  {
    id: 'sat1_rw_050',
    section: 'rw2',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'medium',
    passage:
      'Nutritionist Dr. Elena Vasquez argues that the widespread belief that breakfast is "the most important meal of the day" lacks strong scientific support. She notes that many of the studies cited to support this claim were funded by cereal companies and did not adequately control for other variables, such as overall diet quality and exercise habits.',
    question:
      'Dr. Vasquez\'s argument is primarily based on',
    options: [
      { letter: 'A', text: 'new experimental data showing that skipping breakfast improves health outcomes' },
      { letter: 'B', text: 'concerns about the methodology and potential bias of existing studies' },
      { letter: 'C', text: 'a philosophical objection to the concept of ranking meals by importance' },
      { letter: 'D', text: 'evidence that cereal is nutritionally inferior to other breakfast foods' },
    ],
    correct: 'B',
    explanation:
      'Dr. Vasquez challenges the existing evidence by noting that studies were funded by cereal companies (potential bias) and didn\'t control for other variables (methodological weakness). Her argument is grounded in concerns about methodology and bias, not new data or philosophical objections.',
  },

  // Q51 — Rhetoric/Purpose (hard)
  {
    id: 'sat1_rw_051',
    section: 'rw2',
    category: 'reading',
    subcategory: 'rhetoric',
    difficulty: 'hard',
    passage:
      'When jazz musician Thelonious Monk performed, he sometimes stood up from the piano mid-song and danced in small circles beside the bench before sitting back down and resuming play. Critics initially dismissed this behavior as eccentric showmanship, but scholars of Monk\'s work now interpret these pauses as an integral part of his compositional approach — moments of silence that shaped the rhythm of the music as deliberately as the notes themselves.',
    question:
      'The passage\'s discussion of the critical reinterpretation of Monk\'s behavior primarily serves to',
    options: [
      { letter: 'A', text: 'argue that Monk was a more talented dancer than musician' },
      { letter: 'B', text: 'demonstrate how initial dismissals of an artistic practice can give way to deeper appreciation of its purpose' },
      { letter: 'C', text: 'prove that all unconventional behavior by musicians has artistic justification' },
      { letter: 'D', text: 'criticize modern scholars for overanalyzing Monk\'s performances' },
    ],
    correct: 'B',
    explanation:
      'The passage traces a shift from critics who "dismissed" Monk\'s behavior as showmanship to scholars who now see it as integral to his composition. This demonstrates how initial dismissals of an artistic practice can evolve into deeper appreciation.',
  },

  // Q52 — Comprehension (medium)
  {
    id: 'sat1_rw_052',
    section: 'rw2',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'medium',
    passage:
      'Researchers studying the deep ocean have discovered that bioluminescence — the production of light by living organisms — is far more common than previously thought. A recent survey using specialized cameras found that roughly 76 percent of marine creatures sampled below 200 meters produce their own light, using it for purposes ranging from attracting prey to communicating with potential mates.',
    question:
      'Which statement is best supported by the passage?',
    options: [
      { letter: 'A', text: 'Bioluminescence is exclusive to organisms living below 200 meters.' },
      { letter: 'B', text: 'Scientists had previously underestimated how widespread bioluminescence is in the deep ocean.' },
      { letter: 'C', text: 'Bioluminescent organisms use light primarily to avoid predators.' },
      { letter: 'D', text: 'Specialized cameras have been available to marine researchers for decades.' },
    ],
    correct: 'B',
    explanation:
      'The passage states bioluminescence is "far more common than previously thought," directly indicating that scientists had underestimated its prevalence. The passage does not claim it is exclusive to deep water, that it is primarily for predator avoidance, or comment on how long cameras have been available.',
  },

  // Q53 — Sentence structure (hard)
  {
    id: 'sat1_rw_053',
    section: 'rw2',
    category: 'reading',
    subcategory: 'sentence-structure',
    difficulty: 'hard',
    passage: null,
    question:
      'Which choice most effectively combines the three sentences into one?\n\nThe Great Barrier Reef stretches over 2,300 kilometers along Australia\'s northeastern coast. It is the world\'s largest coral reef system. It is visible from outer space.',
    options: [
      { letter: 'A', text: 'Stretching over 2,300 kilometers along Australia\'s northeastern coast, the Great Barrier Reef is the world\'s largest coral reef system and is visible from outer space.' },
      { letter: 'B', text: 'The Great Barrier Reef stretches over 2,300 kilometers along Australia\'s northeastern coast, and it is the world\'s largest coral reef system, and it is visible from outer space.' },
      { letter: 'C', text: 'The Great Barrier Reef, stretching over 2,300 kilometers along Australia\'s northeastern coast, being the world\'s largest coral reef system, is visible from outer space.' },
      { letter: 'D', text: 'The Great Barrier Reef stretches over 2,300 kilometers, it is the world\'s largest coral reef system along Australia\'s northeastern coast, visible from outer space.' },
    ],
    correct: 'A',
    explanation:
      'Choice A uses a participial phrase for the length detail and coordinates the remaining two facts with "and," creating a clear and concise single sentence. Choice B is choppy with repetitive "and it is" constructions. Choice C buries the main clause and creates an awkward participial chain. Choice D is a comma splice and misplaces "along Australia\'s northeastern coast."',
  },

  // Q54 — Synthesis (hard)
  {
    id: 'sat1_rw_054',
    section: 'rw2',
    category: 'reading',
    subcategory: 'synthesis',
    difficulty: 'hard',
    passage:
      'A city council is debating whether to implement congestion pricing — charging drivers a fee to enter the downtown core during peak hours. Transportation data shows that downtown traffic has increased by 34 percent over the past decade, and average commute times in the area have risen from 22 to 38 minutes. A pilot program in a comparable European city reduced peak-hour traffic by 20 percent within six months but was initially unpopular with residents, with approval rising from 31 percent to 67 percent only after the congestion improvements became apparent.',
    question:
      'Based on the passage, which statement best captures the central challenge facing the city council?',
    options: [
      { letter: 'A', text: 'Congestion pricing is unlikely to reduce traffic because it has not been tested in comparable cities.' },
      { letter: 'B', text: 'The primary obstacle is a lack of data about the severity of the city\'s traffic problem.' },
      { letter: 'C', text: 'While evidence suggests congestion pricing can be effective, the council must manage likely short-term public opposition until residents experience the benefits.' },
      { letter: 'D', text: 'The European pilot program demonstrates that congestion pricing is too unpopular to implement successfully.' },
    ],
    correct: 'C',
    explanation:
      'The passage presents data showing the traffic problem is severe and that a European pilot achieved results — but that pilot was initially unpopular, with approval rising only after benefits materialized. The central challenge is thus managing short-term opposition while waiting for benefits to become apparent, as described in choice C.',
  },
];
