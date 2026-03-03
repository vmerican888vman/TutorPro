export const diagnosticQuestions = [
  // ── Math (7 questions) ──────────────────────────────────────────
  {
    id: 'math_001',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 3x + 7 = 22, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '15' },
    ],
    correct: 'B',
    explanation: 'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.',
  },
  {
    id: 'math_002',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      "A phone plan charges $25 per month plus $0.10 per text message. If Jamie's bill was $43 last month, how many text messages did Jamie send?",
    options: [
      { letter: 'A', text: '18' },
      { letter: 'B', text: '43' },
      { letter: 'C', text: '180' },
      { letter: 'D', text: '430' },
    ],
    correct: 'C',
    explanation:
      '43 - 25 = 18 dollars on texts. 18 \u00f7 0.10 = 180 messages.',
  },
  {
    id: 'math_003',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'A circle has an area of 64\u03c0 square units. What is the circumference of the circle?',
    options: [
      { letter: 'A', text: '8\u03c0' },
      { letter: 'B', text: '16\u03c0' },
      { letter: 'C', text: '32\u03c0' },
      { letter: 'D', text: '64\u03c0' },
    ],
    correct: 'B',
    explanation:
      'Area = \u03c0r\u00b2 = 64\u03c0, so r\u00b2 = 64 and r = 8. Circumference = 2\u03c0r = 2\u03c0(8) = 16\u03c0.',
  },
  {
    id: 'math_004',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'easy',
    passage: null,
    question:
      'The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '14' },
      { letter: 'D', text: '16' },
    ],
    correct: 'B',
    explanation:
      'Sum of all five = 5 \u00d7 12 = 60. Sum of four = 8 + 10 + 14 + 16 = 48. Fifth number = 60 - 48 = 12.',
  },
  {
    id: 'math_005',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = 2x\u00b2 - 3x + 1, what is f(-2)?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '11' },
      { letter: 'D', text: '15' },
    ],
    correct: 'D',
    explanation:
      'f(-2) = 2(-2)\u00b2 - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15.',
  },
  {
    id: 'math_006',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question:
      'The system of equations 2x + y = 10 and x - y = 2 has a solution (x, y). What is the value of x + y?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '12' },
    ],
    correct: 'B',
    explanation:
      'Adding the equations gives 3x = 12, so x = 4. Substituting: 4 - y = 2, so y = 2. Therefore x + y = 6.',
  },
  {
    id: 'math_007',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'hard',
    passage: null,
    question:
      'In a right triangle, one leg measures 5 and the hypotenuse measures 13. What is the area of the triangle?',
    options: [
      { letter: 'A', text: '30' },
      { letter: 'B', text: '32.5' },
      { letter: 'C', text: '60' },
      { letter: 'D', text: '65' },
    ],
    correct: 'A',
    explanation:
      'Using the Pythagorean theorem: other leg = \u221a(13\u00b2 - 5\u00b2) = \u221a(169 - 25) = \u221a144 = 12. Area = \u00bd \u00d7 5 \u00d7 12 = 30.',
  },

  // ── Reading (7 questions) ───────────────────────────────────────
  {
    id: 'read_001',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'easy',
    passage:
      'The octopus is widely considered one of the most intelligent invertebrates. Studies have shown that octopuses can solve complex puzzles, navigate mazes, and even open jars from the inside. Their problem-solving abilities rival those of some mammals, despite having a fundamentally different nervous system, with roughly two-thirds of their neurons located in their arms rather than a central brain.',
    question:
      "According to the passage, what makes the octopus's intelligence particularly remarkable?",
    options: [
      { letter: 'A', text: 'They can live longer than most invertebrates' },
      {
        letter: 'B',
        text: 'They achieve complex cognition with a very different neural structure',
      },
      {
        letter: 'C',
        text: 'Their arms function independently from their brain',
      },
      { letter: 'D', text: 'They can outsmart most mammals' },
    ],
    correct: 'B',
    explanation:
      'The passage emphasizes that octopuses show intelligence "despite having a fundamentally different nervous system," making their cognitive abilities remarkable given their brain structure.',
  },
  {
    id: 'read_002',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'easy',
    passage:
      "After decades of decline, the small fishing village began to experience a modest revival. New restaurants opened along the waterfront, and young families were drawn to the area's affordable housing and tight-knit community.",
    question: 'As used in the passage, "revival" most nearly means:',
    options: [
      { letter: 'A', text: 'Religious awakening' },
      { letter: 'B', text: 'Return to prosperity' },
      { letter: 'C', text: 'Historical preservation' },
      { letter: 'D', text: 'Population explosion' },
    ],
    correct: 'B',
    explanation:
      'In context, "revival" refers to the town\'s economic and social recovery after a period of decline, indicated by new businesses and incoming residents.',
  },
  {
    id: 'read_003',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'medium',
    passage:
      "Coral reefs, often called the 'rainforests of the sea,' support approximately 25% of all marine species despite covering less than 1% of the ocean floor. However, rising ocean temperatures have triggered widespread coral bleaching events. When water temperatures exceed normal ranges, corals expel the symbiotic algae living in their tissues, turning white and becoming vulnerable to disease. Without intervention, scientists estimate that 90% of coral reefs could be severely degraded by 2050.",
    question:
      'Which claim about coral reefs is best supported by the passage?',
    options: [
      {
        letter: 'A',
        text: 'Coral reefs are the largest ecosystems in the ocean',
      },
      {
        letter: 'B',
        text: 'Coral bleaching is caused exclusively by pollution',
      },
      {
        letter: 'C',
        text: 'The loss of coral reefs would disproportionately affect marine biodiversity',
      },
      {
        letter: 'D',
        text: 'Scientists have found effective ways to reverse coral bleaching',
      },
    ],
    correct: 'C',
    explanation:
      'Since reefs support 25% of marine species while covering less than 1% of the ocean, their loss would have a disproportionately large impact on biodiversity.',
  },
  {
    id: 'read_004',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'medium',
    passage:
      'In 1928, Alexander Fleming returned from vacation to find mold growing on a petri dish of Staphylococcus bacteria. Rather than discarding the contaminated sample, he noticed something extraordinary: the bacteria surrounding the mold had been destroyed. This accidental observation led to the discovery of penicillin, which would go on to save an estimated 200 million lives. Fleming later remarked that his finding was a matter of chance, but as Louis Pasteur once noted, "Fortune favors the prepared mind."',
    question: 'The author includes the Pasteur quote primarily to:',
    options: [
      {
        letter: 'A',
        text: "Compare Fleming and Pasteur's scientific achievements",
      },
      {
        letter: 'B',
        text: 'Argue that luck plays no role in scientific discovery',
      },
      {
        letter: 'C',
        text: "Suggest that Fleming's expertise enabled him to recognize the significance of what he saw",
      },
      {
        letter: 'D',
        text: 'Demonstrate that all major discoveries happen by accident',
      },
    ],
    correct: 'C',
    explanation:
      'The Pasteur quote about "the prepared mind" suggests that while Fleming\'s discovery involved chance, his scientific training allowed him to understand its importance rather than dismissing it.',
  },
  {
    id: 'read_005',
    category: 'reading',
    subcategory: 'vocabulary',
    difficulty: 'medium',
    passage:
      "The senator's proposal was met with a measured response from her colleagues. While several expressed cautious support, others noted that the plan's ambitious scope could make implementation challenging without significant bipartisan cooperation.",
    question: 'As used in the passage, "measured" most nearly means:',
    options: [
      { letter: 'A', text: 'Quantified' },
      { letter: 'B', text: 'Restrained and deliberate' },
      { letter: 'C', text: 'Enthusiastic' },
      { letter: 'D', text: 'Hostile' },
    ],
    correct: 'B',
    explanation:
      '"Measured" here means careful and restrained, as indicated by the "cautious support" and qualified criticism that followed.',
  },
  {
    id: 'read_006',
    category: 'reading',
    subcategory: 'evidence-based',
    difficulty: 'hard',
    passage:
      "The concept of 'flow state' \u2014 a condition of deep immersion in an activity \u2014 was popularized by psychologist Mihaly Csikszentmihalyi. During flow, individuals report losing track of time, feeling a sense of effortless control, and experiencing deep satisfaction. Research suggests that flow occurs when the challenge of a task closely matches the individual's skill level. If the task is too easy, boredom results; too difficult, and anxiety takes over. This balance point, Csikszentmihalyi argued, is where peak human performance and happiness converge.",
    question:
      'Based on the passage, a student would most likely experience flow while:',
    options: [
      {
        letter: 'A',
        text: 'Reviewing material they already know perfectly',
      },
      {
        letter: 'B',
        text: 'Attempting a test far above their current skill level',
      },
      {
        letter: 'C',
        text: "Working on challenging problems that stretch but don't exceed their abilities",
      },
      { letter: 'D', text: 'Watching a lecture on a familiar topic' },
    ],
    correct: 'C',
    explanation:
      'The passage states flow occurs when "the challenge of a task closely matches the individual\'s skill level" \u2014 too easy causes boredom, too hard causes anxiety.',
  },
  {
    id: 'read_007',
    category: 'reading',
    subcategory: 'comprehension',
    difficulty: 'hard',
    passage:
      'In her landmark 1962 book Silent Spring, Rachel Carson documented the devastating environmental effects of widespread pesticide use, particularly DDT. The chemical industry attacked Carson personally, questioning her credentials and motives. Despite the fierce opposition, her work catalyzed the modern environmental movement and led directly to the creation of the Environmental Protection Agency. Carson, who died of cancer just two years after publication, did not live to see the full impact of her work \u2014 a fact that lends her story both its power and its tragedy.',
    question:
      "The author's tone toward Rachel Carson is best described as:",
    options: [
      { letter: 'A', text: 'Objective and detached' },
      { letter: 'B', text: 'Admiring but tinged with sadness' },
      { letter: 'C', text: 'Critical of her methods' },
      { letter: 'D', text: 'Indifferent to her legacy' },
    ],
    correct: 'B',
    explanation:
      'The author praises Carson\'s impact ("landmark," "catalyzed") while noting the tragic element that she died before seeing her work\'s full effects, creating an admiring but somber tone.',
  },

  // ── Writing (6 questions) ───────────────────────────────────────
  {
    id: 'writ_001',
    category: 'writing',
    subcategory: 'grammar',
    difficulty: 'easy',
    passage: null,
    question: 'Choose the sentence that is grammatically correct.',
    options: [
      { letter: 'A', text: 'Me and my friend went to the store.' },
      { letter: 'B', text: 'My friend and I went to the store.' },
      { letter: 'C', text: 'Myself and my friend went to the store.' },
      { letter: 'D', text: 'My friend and me went to the store.' },
    ],
    correct: 'B',
    explanation:
      'When the pronoun is the subject, use "I" not "me" or "myself." "My friend and I" is the correct subject form.',
  },
  {
    id: 'writ_002',
    category: 'writing',
    subcategory: 'sentence-structure',
    difficulty: 'easy',
    passage: null,
    question: 'Which version of the sentence uses a comma correctly?',
    options: [
      {
        letter: 'A',
        text: 'The students who studied for the exam, passed with high scores.',
      },
      {
        letter: 'B',
        text: 'The students, who studied for the exam passed with high scores.',
      },
      {
        letter: 'C',
        text: 'The students who studied for the exam passed with high scores.',
      },
      {
        letter: 'D',
        text: 'The students who studied, for the exam passed with high scores.',
      },
    ],
    correct: 'C',
    explanation:
      '"Who studied for the exam" is a restrictive clause (it identifies which students), so it should NOT be set off by commas.',
  },
  {
    id: 'writ_003',
    category: 'writing',
    subcategory: 'expression-of-ideas',
    difficulty: 'medium',
    passage: null,
    question:
      '"The city council voted to approve the new park. _______ residents had expressed overwhelming support at the public hearing." Which transition best fills the blank?',
    options: [
      { letter: 'A', text: 'However,' },
      { letter: 'B', text: 'Nevertheless,' },
      { letter: 'C', text: 'After all,' },
      { letter: 'D', text: 'In contrast,' },
    ],
    correct: 'C',
    explanation:
      '"After all" introduces a supporting reason for the council\'s decision. "However," "Nevertheless," and "In contrast" would indicate a contradiction, which doesn\'t fit the context.',
  },
  {
    id: 'writ_004',
    category: 'writing',
    subcategory: 'grammar',
    difficulty: 'medium',
    passage: null,
    question: 'Select the sentence with correct subject-verb agreement.',
    options: [
      {
        letter: 'A',
        text: 'The group of students are preparing their presentations.',
      },
      {
        letter: 'B',
        text: 'The group of students is preparing their presentations.',
      },
      {
        letter: 'C',
        text: 'The group of students is preparing its presentations.',
      },
      {
        letter: 'D',
        text: 'The group of students are preparing its presentations.',
      },
    ],
    correct: 'C',
    explanation:
      '"Group" is a singular collective noun, so it takes the singular verb "is" and the singular pronoun "its."',
  },
  {
    id: 'writ_005',
    category: 'writing',
    subcategory: 'sentence-structure',
    difficulty: 'hard',
    passage: null,
    question: 'Which sentence is punctuated correctly?',
    options: [
      {
        letter: 'A',
        text: 'The research paper, which was published last month was widely discussed.',
      },
      {
        letter: 'B',
        text: 'The research paper which was published last month, was widely discussed.',
      },
      {
        letter: 'C',
        text: 'The research paper, which was published last month, was widely discussed.',
      },
      {
        letter: 'D',
        text: 'The research paper which was published last month was widely discussed.',
      },
    ],
    correct: 'C',
    explanation:
      '"Which was published last month" is a nonrestrictive clause (it adds extra info, not essential to identifying the paper), so it must be set off by commas on both sides.',
  },
  {
    id: 'writ_006',
    category: 'writing',
    subcategory: 'expression-of-ideas',
    difficulty: 'hard',
    passage: null,
    question:
      'A student is writing about renewable energy adoption. Which sentence most effectively conveys the urgency of the topic while maintaining an academic tone?',
    options: [
      {
        letter: 'A',
        text: "Everyone needs to start using solar panels right now or we're all in trouble.",
      },
      {
        letter: 'B',
        text: 'The accelerating pace of climate change demands a correspondingly rapid transition to renewable energy infrastructure.',
      },
      {
        letter: 'C',
        text: 'Renewable energy is pretty important and we should probably use more of it soon.',
      },
      {
        letter: 'D',
        text: 'Scientists say renewable energy is good for the planet.',
      },
    ],
    correct: 'B',
    explanation:
      'Option B conveys urgency ("accelerating," "demands," "rapid") while maintaining formal academic language and specific vocabulary, striking the right balance for an academic essay.',
  },
]
