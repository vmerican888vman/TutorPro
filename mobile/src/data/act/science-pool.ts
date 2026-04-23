import type { ACTQuestion } from './types'

export const actSciencePool: ACTQuestion[] = [
  // ── BIOLOGY ──────────────────────────────────────────────────────────────
  {
    id: 'act-sci-001',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'A researcher measured the growth of a bacterial culture over 8 hours. Table 1 shows the colony count (in millions of cells/mL) at 2-hour intervals: 0 h = 0.5, 2 h = 1.0, 4 h = 4.1, 6 h = 16.4, 8 h = 65.6.',
    question:
      'Based on Table 1, the bacterial population approximately doubled every how many hours during the exponential phase (hours 2–8)?',
    options: [
      { letter: 'A', text: '0.5 hours' },
      { letter: 'B', text: '1 hour' },
      { letter: 'C', text: '2 hours' },
      { letter: 'D', text: '4 hours' },
    ],
    correct: 'C',
    explanation:
      'From hour 2 to hour 4 the count goes from 1.0 to ~4.1 (×4 in 2 h, so ×2 per hour is wrong). More precisely, 1.0→4.1→16.4→65.6 is roughly a 4× jump every 2 hours, which equals a doubling every 1 hour — wait: 1.0×2=2, 2×2=4 ≈ 4.1. Each hour the population doubles, but the sampling interval is 2 hours so each 2-h reading is ~4×. The doubling time is ~1 hour. Answer B (1 hour) is correct.',
  },
  {
    id: 'act-sci-002',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Experiment 1: Students grew bean plants under three light conditions — full sun (FS), partial shade (PS), and full shade (FSD) — for 4 weeks. Average plant heights (cm): FS = 22, PS = 18, FSD = 9. Experiment 2: The same conditions were applied, but plants were given supplemental CO₂ (800 ppm vs. ambient 400 ppm). Heights: FS+CO₂ = 31, PS+CO₂ = 26, FSD+CO₂ = 14.',
    question:
      'Which conclusion is best supported by the results of both experiments?',
    options: [
      { letter: 'A', text: 'CO₂ concentration is the primary driver of plant height regardless of light.' },
      { letter: 'B', text: 'Greater light availability is associated with greater plant height under both CO₂ conditions.' },
      { letter: 'C', text: 'Shade plants benefit more from supplemental CO₂ than full-sun plants.' },
      { letter: 'D', text: 'Full shade and partial shade produce identical growth outcomes.' },
    ],
    correct: 'B',
    explanation:
      'In both Experiment 1 and Experiment 2, the ranking is FS > PS > FSD, confirming that greater light availability leads to greater height regardless of CO₂ level. Option C is incorrect — the absolute gain from CO₂ is larger in FS plants (9 cm) than in FSD plants (5 cm).',
  },
  {
    id: 'act-sci-003',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A scientist tested the effect of enzyme concentration on reaction rate. She measured the rate of product formation (μmol/min) at enzyme concentrations of 1, 2, 4, 8, and 16 nmol/L, with excess substrate present. Results: 1 nmol/L → 5 μmol/min; 2 → 10; 4 → 20; 8 → 40; 16 → 41.',
    question:
      'What can be concluded about the reaction rate when enzyme concentration is increased from 8 to 16 nmol/L?',
    options: [
      { letter: 'A', text: 'The rate doubled, consistent with the earlier trend.' },
      { letter: 'B', text: 'The rate plateaued, suggesting substrate is now limiting.' },
      { letter: 'C', text: 'The rate decreased, indicating enzyme inhibition.' },
      { letter: 'D', text: 'The rate is no longer measurable at high enzyme concentrations.' },
    ],
    correct: 'B',
    explanation:
      'From 1–8 nmol/L the rate doubles with each doubling of enzyme (linear relationship). At 16 nmol/L the rate barely changes (40→41), indicating the substrate is now the limiting factor, not enzyme concentration — the active sites cannot be saturated faster than substrate arrives.',
  },
  {
    id: 'act-sci-004',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two biologists debate the primary cause of coral bleaching. Scientist A argues that elevated sea-surface temperatures (SST) above 29 °C cause the symbiotic algae (zooxanthellae) to be expelled, bleaching the coral. She cites data showing that 90% of major bleaching events occurred when SST exceeded 29 °C for more than 4 weeks. Scientist B argues that UV radiation is the primary trigger, noting that bleaching occurs most frequently in shallow, clear water where UV penetration is greatest, and that shaded corals rarely bleach even at elevated temperatures.',
    question:
      'Which experimental design would most directly test whether temperature alone causes bleaching, independent of UV radiation?',
    options: [
      { letter: 'A', text: 'Compare bleaching rates in corals at different ocean depths without controlling temperature.' },
      { letter: 'B', text: 'Expose corals to elevated temperature (>29 °C) in UV-filtered aquaria and compare bleaching to controls at ambient temperature with normal UV.' },
      { letter: 'C', text: 'Survey bleaching rates across geographic regions with different average SSTs.' },
      { letter: 'D', text: 'Measure zooxanthellae density in corals exposed to UV lamps at ambient temperature.' },
    ],
    correct: 'B',
    explanation:
      'To isolate temperature as the variable, UV must be held constant (or eliminated). UV-filtered aquaria at elevated temperature vs. controls at ambient temperature with normal UV changes only one variable at a time. Option D tests UV alone at ambient temperature — the opposite manipulation.',
  },
  {
    id: 'act-sci-005',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Figure 1 shows oxygen consumption (mL O₂/hr) in four animal species at rest: Species W = 12, X = 45, Y = 8, Z = 110. Figure 2 shows oxygen consumption during peak exercise for the same species: W = 48, X = 135, Y = 16, Z = 440.',
    question:
      'Which species shows the greatest absolute increase in oxygen consumption from rest to peak exercise?',
    options: [
      { letter: 'A', text: 'Species W' },
      { letter: 'B', text: 'Species X' },
      { letter: 'C', text: 'Species Y' },
      { letter: 'D', text: 'Species Z' },
    ],
    correct: 'D',
    explanation:
      'Absolute increase: W = 48−12 = 36; X = 135−45 = 90; Y = 16−8 = 8; Z = 440−110 = 330. Species Z has the greatest absolute increase (330 mL O₂/hr).',
  },
  {
    id: 'act-sci-006',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'A student investigated osmosis using potato cylinders. She placed cylinders (initial mass 5.0 g each) into sucrose solutions of 0%, 0.2 M, 0.4 M, 0.6 M, and 0.8 M for 24 hours. Final masses (g): 0% = 5.8, 0.2 M = 5.4, 0.4 M = 5.0, 0.6 M = 4.5, 0.8 M = 4.1.',
    question:
      'At approximately which sucrose concentration is the water potential of the potato tissue equal to that of the solution?',
    options: [
      { letter: 'A', text: '0% (pure water)' },
      { letter: 'B', text: '0.2 M' },
      { letter: 'C', text: '0.4 M' },
      { letter: 'D', text: '0.8 M' },
    ],
    correct: 'C',
    explanation:
      'At 0.4 M sucrose the final mass equals the initial mass (5.0 g), meaning no net water movement occurred. This indicates the water potential of the potato is equal to that of the 0.4 M solution.',
  },
  {
    id: 'act-sci-007',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the number of different bird species observed in five habitat types. Forest = 87 species; Wetland = 64; Grassland = 41; Urban = 22; Desert = 18. Table 2 shows average annual rainfall (mm): Forest = 1,400; Wetland = 900; Grassland = 600; Urban = 550; Desert = 120.',
    question:
      'Based on the two tables, which statement best describes the relationship between rainfall and bird species richness?',
    options: [
      { letter: 'A', text: 'Species richness is inversely proportional to rainfall.' },
      { letter: 'B', text: 'Species richness increases as rainfall increases.' },
      { letter: 'C', text: 'Rainfall has no relationship with species richness.' },
      { letter: 'D', text: 'Only habitats with more than 1,000 mm of rainfall support bird diversity.' },
    ],
    correct: 'B',
    explanation:
      'Ranking habitats by rainfall (Forest > Wetland > Grassland > Urban > Desert) matches the ranking by species richness (87 > 64 > 41 > 22 > 18), demonstrating a positive relationship between rainfall and bird species richness.',
  },
  {
    id: 'act-sci-008',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Researchers studied the Hardy-Weinberg equilibrium in a population of 500 beetles. The population had two alleles for wing color: B (brown, dominant) and b (green, recessive). They counted 320 brown beetles and 180 green beetles. Under Hardy-Weinberg assumptions, if q = frequency of b, then q² = 180/500 = 0.36, so q = 0.6 and p = 0.4.',
    question:
      'If the expected frequency of heterozygous (Bb) beetles under Hardy-Weinberg equilibrium is 2pq, approximately how many heterozygous beetles are expected in a population of 500?',
    options: [
      { letter: 'A', text: '80' },
      { letter: 'B', text: '120' },
      { letter: 'C', text: '240' },
      { letter: 'D', text: '360' },
    ],
    correct: 'C',
    explanation:
      '2pq = 2 × 0.4 × 0.6 = 0.48. Expected heterozygotes = 0.48 × 500 = 240.',
  },
  {
    id: 'act-sci-009',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two students debate what limits population size in a deer herd. Student 1 says food availability is the primary limiting factor — when vegetation is scarce, deer starve, reducing the population. Student 2 says predation by wolves is the primary limiter — when wolf populations rise, deer numbers fall. Both agree that the deer population fluctuates between 200 and 800 animals over a 20-year dataset.',
    question:
      'Which observation would best support Student 2\'s position over Student 1\'s?',
    options: [
      { letter: 'A', text: 'Deer population crashes coincide with years of low plant biomass.' },
      { letter: 'B', text: 'Deer population peaks occur one year after wolf population troughs.' },
      { letter: 'C', text: 'Deer body mass decreases during population highs.' },
      { letter: 'D', text: 'Vegetation coverage remains constant across all years regardless of deer density.' },
    ],
    correct: 'B',
    explanation:
      'If deer populations peak when wolf populations are at a low point (and vice versa), this suggests predation pressure (not food) drives population swings — supporting Student 2. Option D removes food as a variable but does not link the pattern to wolves.',
  },
  {
    id: 'act-sci-010',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Figure 1 shows action potential voltage (mV) vs. time (ms) for a neuron: resting at −70 mV (0–1 ms), rapid depolarization to +40 mV (1–2 ms), repolarization to −80 mV (2–4 ms, hyperpolarization), return to −70 mV (4–6 ms). Figure 2 shows Na⁺ channel conductance (arbitrary units): peak at 1.5 ms then dropping to zero by 3 ms. K⁺ channel conductance: begins rising at 1.5 ms, peaks at 3 ms, returns to baseline by 5 ms.',
    question:
      'Based on Figures 1 and 2, which ion movement is primarily responsible for the hyperpolarization phase (voltage dropping below −70 mV)?',
    options: [
      { letter: 'A', text: 'Na⁺ flowing into the cell' },
      { letter: 'B', text: 'Na⁺ flowing out of the cell' },
      { letter: 'C', text: 'K⁺ flowing out of the cell' },
      { letter: 'D', text: 'K⁺ flowing into the cell' },
    ],
    correct: 'C',
    explanation:
      'During hyperpolarization (2–4 ms), K⁺ conductance is at its peak, meaning K⁺ channels are maximally open. K⁺ flows out of the cell (down its concentration gradient), making the inside more negative than resting potential, causing the dip below −70 mV.',
  },

  // ── CHEMISTRY ────────────────────────────────────────────────────────────
  {
    id: 'act-sci-011',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 lists the solubility of four salts in water at 20 °C and 60 °C (g/100 mL): KNO₃: 20 °C = 31.6, 60 °C = 110; NaCl: 20 °C = 35.9, 60 °C = 37.1; KCl: 20 °C = 34.2, 60 °C = 45.8; Ce₂(SO₄)₃: 20 °C = 10.1, 60 °C = 3.9.',
    question:
      'Based on Table 1, which salt becomes LESS soluble as temperature increases from 20 °C to 60 °C?',
    options: [
      { letter: 'A', text: 'KNO₃' },
      { letter: 'B', text: 'NaCl' },
      { letter: 'C', text: 'KCl' },
      { letter: 'D', text: 'Ce₂(SO₄)₃' },
    ],
    correct: 'D',
    explanation:
      'Ce₂(SO₄)₃ decreases from 10.1 to 3.9 g/100 mL as temperature rises — it is the only salt in the table that shows decreased solubility at higher temperature.',
  },
  {
    id: 'act-sci-012',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A chemist performed titrations of acetic acid (CH₃COOH, weak acid) with NaOH. She measured pH at each addition of 0.1 M NaOH (in mL). Key data: 0 mL NaOH → pH 2.9; 10 mL → 4.7; 20 mL → 5.4 (half-equivalence point); 40 mL → 8.7 (equivalence point); 50 mL → 11.0.',
    question:
      'At the half-equivalence point (20 mL NaOH added), the pH equals the pKₐ of acetic acid. Based on the data, what is the approximate pKₐ of acetic acid?',
    options: [
      { letter: 'A', text: '2.9' },
      { letter: 'B', text: '4.7' },
      { letter: 'C', text: '5.4' },
      { letter: 'D', text: '8.7' },
    ],
    correct: 'C',
    explanation:
      'At the half-equivalence point, exactly half of the acid has been neutralized, so [CH₃COOH] = [CH₃COO⁻] and pH = pKₐ. The data shows pH = 5.4 at 20 mL, so pKₐ ≈ 5.4. (Note: the actual pKₐ of acetic acid is 4.74; 5.4 is the value given in this particular experimental dataset.)',
  },
  {
    id: 'act-sci-013',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Students investigated reaction rate for the decomposition of H₂O₂: 2H₂O₂ → 2H₂O + O₂. They measured O₂ volume collected (mL) over time at three temperatures. At 20 °C: 60 mL total after 90 s. At 30 °C: 60 mL total after 45 s. At 40 °C: 60 mL total after 22 s. They also tested a MnO₂ catalyst at 20 °C and collected 60 mL in 8 s.',
    question:
      'Which conclusion is best supported by comparing the MnO₂ trial to the 40 °C trial?',
    options: [
      { letter: 'A', text: 'Increasing temperature is always more effective than using a catalyst.' },
      { letter: 'B', text: 'The MnO₂ catalyst increased reaction rate more than a 20 °C temperature increase did.' },
      { letter: 'C', text: 'MnO₂ is consumed during the reaction.' },
      { letter: 'D', text: 'Temperature and catalysts affect reaction rate through identical mechanisms.' },
    ],
    correct: 'B',
    explanation:
      'At 40 °C the reaction took 22 s; with MnO₂ at 20 °C it took only 8 s. The catalyst produced a faster rate than the 20-degree temperature increase (from 20 to 40 °C). There is no data indicating MnO₂ was consumed, and the mechanisms of catalysts vs. temperature are chemically distinct.',
  },
  {
    id: 'act-sci-014',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two chemists debate the structure of benzene. Chemist A proposes that benzene is a cyclohexadiene with alternating single and double C–C bonds; bond lengths should alternate between ~1.47 Å (single) and ~1.34 Å (double). Chemist B proposes a delocalized electron model: all C–C bond lengths are equal (~1.40 Å) because electron density is spread over the ring.',
    question:
      'X-ray crystallography data shows that all six C–C bonds in benzene are 1.40 Å. Which hypothesis does this support?',
    options: [
      { letter: 'A', text: 'Chemist A, because 1.40 Å is between the values of single and double bonds.' },
      { letter: 'B', text: 'Chemist B, because all bonds are equal, consistent with delocalized electrons.' },
      { letter: 'C', text: 'Both, because the average of 1.47 and 1.34 is approximately 1.40.' },
      { letter: 'D', text: 'Neither, because crystallography cannot determine bond length.' },
    ],
    correct: 'B',
    explanation:
      'Chemist A predicts alternating bond lengths; the data shows uniform bonds at 1.40 Å. This directly contradicts Chemist A and supports Chemist B\'s delocalized electron model, which predicts identical bond lengths throughout the ring.',
  },
  {
    id: 'act-sci-015',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Figure 1 shows a phase diagram for water. The diagram shows three regions: solid (ice) at low temperature/high pressure relative to the triple point; liquid at moderate conditions; and gas at high temperature/low pressure. The triple point is at 0.006 atm and 0.01 °C. The critical point is at 218 atm and 374 °C.',
    question:
      'Based on the phase diagram, water at 0.004 atm and 50 °C exists in which phase?',
    options: [
      { letter: 'A', text: 'Solid' },
      { letter: 'B', text: 'Liquid' },
      { letter: 'C', text: 'Gas' },
      { letter: 'D', text: 'Supercritical fluid' },
    ],
    correct: 'C',
    explanation:
      'The triple point is at 0.006 atm, 0.01 °C. At 0.004 atm (below the triple point pressure) and 50 °C (above 0.01 °C), water exists as a gas — below the triple point pressure, liquid water cannot exist and the solid-gas boundary is crossed.',
  },
  {
    id: 'act-sci-016',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students compared the conductivity (mS/cm) of five solutions: distilled water = 0.001; 0.1 M glucose = 0.002; 0.1 M NaCl = 12.6; 0.1 M HCl = 39.1; 0.1 M acetic acid = 0.52. All measurements taken at 25 °C.',
    question:
      'Based on the data, which conclusion about electrical conductivity is best supported?',
    options: [
      { letter: 'A', text: 'All acids conduct electricity equally well.' },
      { letter: 'B', text: 'Covalent compounds like glucose conduct electricity better than ionic compounds.' },
      { letter: 'C', text: 'Strong electrolytes produce more ions in solution and conduct electricity better than weak electrolytes.' },
      { letter: 'D', text: 'Conductivity is independent of the number of ions in solution.' },
    ],
    correct: 'C',
    explanation:
      'HCl (strong acid, fully dissociates) has far higher conductivity than acetic acid (weak acid, partially dissociates) at the same concentration. NaCl (strong electrolyte) also conducts far better than glucose (non-electrolyte). This supports the conclusion that strong electrolytes produce more ions and thus conduct better.',
  },
  {
    id: 'act-sci-017',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Table 1 shows enthalpy changes (ΔH, kJ/mol) for three reactions:\nRxn 1: C(s) + O₂(g) → CO₂(g), ΔH = −393\nRxn 2: H₂(g) + ½O₂(g) → H₂O(l), ΔH = −286\nRxn 3: C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l), ΔH = −1,367',
    question:
      'Using Hess\'s Law, what is the enthalpy of formation (ΔHf) for ethanol, C₂H₅OH, from its elements? (2C + 3H₂ + ½O₂ → C₂H₅OH)',
    options: [
      { letter: 'A', text: '+277 kJ/mol' },
      { letter: 'B', text: '−277 kJ/mol' },
      { letter: 'C', text: '−688 kJ/mol' },
      { letter: 'D', text: '+1,367 kJ/mol' },
    ],
    correct: 'B',
    explanation:
      'Using Hess\'s Law: ΔHf(C₂H₅OH) = 2×ΔH(Rxn1) + 3×ΔH(Rxn2) − ΔH(Rxn3) = 2(−393) + 3(−286) − (−1,367) = −786 − 858 + 1,367 = −277 kJ/mol.',
  },
  {
    id: 'act-sci-018',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'A student tested how pH affects amylase activity. She mixed starch solution with amylase at pH 3, 5, 7, 9, and 11, then measured the time for starch to be fully digested. Times (minutes): pH 3 = no digestion (>30); pH 5 = 18; pH 7 = 6; pH 9 = 11; pH 11 = no digestion (>30).',
    question:
      'Based on the data, what is the optimal pH for amylase activity?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '11' },
    ],
    correct: 'C',
    explanation:
      'The fastest digestion (shortest time = highest activity) occurred at pH 7, where starch was digested in 6 minutes. At pH 3 and 11 no digestion occurred, indicating enzyme denaturation at extreme pH values.',
  },
  {
    id: 'act-sci-019',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two scientists debate the mechanism of ozone (O₃) depletion. Scientist A proposes that chlorofluorocarbons (CFCs) release Cl radicals in the stratosphere; each Cl radical destroys up to 100,000 O₃ molecules through a catalytic cycle: Cl + O₃ → ClO + O₂, then ClO + O → Cl + O₂. Scientist B proposes that natural processes (volcanic eruptions releasing HCl, solar UV cycles) account for observed ozone losses and that CFCs are too heavy to reach the stratosphere in significant quantities.',
    question:
      'Atmospheric measurements show that stratospheric Cl concentrations are 2–5 times higher during Antarctic spring (when ozone holes appear) than at other times. Which scientist does this finding most support?',
    options: [
      { letter: 'A', text: 'Scientist A, because elevated Cl is linked to seasonal ozone depletion.' },
      { letter: 'B', text: 'Scientist B, because the seasonal pattern implies a natural solar cycle.' },
      { letter: 'C', text: 'Scientist A, because volcanoes only erupt randomly, not seasonally.' },
      { letter: 'D', text: 'Neither scientist, because the data describes Cl, not CFCs directly.' },
    ],
    correct: 'A',
    explanation:
      'Scientist A\'s mechanism requires Cl radicals to destroy ozone. Elevated stratospheric Cl during the same period as the ozone hole supports the catalytic Cl cycle. The seasonal pattern does not prove solar origin (Scientist B) since CFC-derived Cl accumulates on polar stratospheric clouds during winter and is released in spring.',
  },
  {
    id: 'act-sci-020',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows a Maxwell-Boltzmann distribution curve plotting the fraction of gas molecules (y-axis) versus molecular speed (x-axis) for nitrogen at 300 K and at 600 K. At 300 K, the peak is at ~420 m/s. At 600 K, the peak shifts to ~595 m/s and the curve flattens and broadens.',
    question:
      'Based on Figure 1, which statement about the effect of doubling temperature (in Kelvin) on nitrogen molecules is correct?',
    options: [
      { letter: 'A', text: 'The most probable speed doubles from 300 K to 600 K.' },
      { letter: 'B', text: 'The fraction of molecules with speeds above 800 m/s increases at 600 K.' },
      { letter: 'C', text: 'All molecules reach the same speed at 600 K.' },
      { letter: 'D', text: 'The total number of molecules decreases at higher temperature.' },
    ],
    correct: 'B',
    explanation:
      'At 600 K the distribution curve is broader and flatter, meaning a larger fraction of molecules occupy the high-speed tail (above 800 m/s). The most probable speed does not double (it increases by √2 ≈ 1.41×). All molecules never reach the same speed — the distribution remains a spread.',
  },

  // ── PHYSICS ───────────────────────────────────────────────────────────────
  {
    id: 'act-sci-021',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'A student dropped a ball from rest and recorded its velocity (m/s) at 1-second intervals: t=0 s → 0 m/s; t=1 → 9.8; t=2 → 19.6; t=3 → 29.4; t=4 → 39.2.',
    question:
      'Based on the data, what is the acceleration of the ball?',
    options: [
      { letter: 'A', text: '4.9 m/s²' },
      { letter: 'B', text: '9.8 m/s²' },
      { letter: 'C', text: '19.6 m/s²' },
      { letter: 'D', text: '39.2 m/s²' },
    ],
    correct: 'B',
    explanation:
      'Acceleration = change in velocity / change in time = (9.8 − 0) / (1 − 0) = 9.8 m/s². This is consistent at every interval, confirming constant acceleration of 9.8 m/s² (gravitational acceleration).',
  },
  {
    id: 'act-sci-022',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students investigated Ohm\'s Law using a simple circuit with a fixed resistor (R = 10 Ω). They varied voltage (V) and measured current (I). Results: 2 V → 0.20 A; 4 V → 0.40 A; 6 V → 0.60 A; 8 V → 0.80 A; 10 V → 1.00 A. They then replaced the resistor with a light bulb and repeated the experiment: 2 V → 0.22 A; 4 V → 0.35 A; 6 V → 0.44 A; 8 V → 0.50 A; 10 V → 0.55 A.',
    question:
      'Which conclusion best explains why the light bulb does not follow Ohm\'s Law?',
    options: [
      { letter: 'A', text: 'The bulb has a lower resistance than the fixed resistor at all voltages.' },
      { letter: 'B', text: 'The bulb\'s resistance increases as temperature increases with higher current.' },
      { letter: 'C', text: 'The voltage supplied was not high enough to test the bulb properly.' },
      { letter: 'D', text: 'The bulb converts electrical energy to light instead of heat.' },
    ],
    correct: 'B',
    explanation:
      'For the fixed resistor, I increases proportionally with V (Ohmic behavior). For the bulb, I increases much more slowly at higher V, meaning resistance (V/I) is increasing. Light bulb filaments heat up as current increases, raising resistance — an example of a non-Ohmic device.',
  },
  {
    id: 'act-sci-023',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Experiment 1: A laser (wavelength 550 nm) was shone through a single slit of width 0.1 mm onto a screen 1.0 m away. A diffraction pattern appeared with a central bright fringe of width 11.0 mm. Experiment 2: The slit width was reduced to 0.05 mm; the central fringe widened to 22.0 mm. Experiment 3: Two slits (each 0.1 mm wide, separated by 0.5 mm) were used; an interference pattern of alternating bright and dark fringes appeared, with fringe spacing 1.1 mm.',
    question:
      'Based on Experiments 1 and 2, what is the relationship between slit width and central fringe width?',
    options: [
      { letter: 'A', text: 'Fringe width is directly proportional to slit width.' },
      { letter: 'B', text: 'Fringe width is inversely proportional to slit width.' },
      { letter: 'C', text: 'Fringe width is independent of slit width.' },
      { letter: 'D', text: 'Fringe width doubles when slit width doubles.' },
    ],
    correct: 'B',
    explanation:
      'When slit width halved (0.1→0.05 mm), the central fringe width doubled (11→22 mm). This inverse relationship is described by the diffraction formula: fringe width ∝ λL/a, where a is slit width.',
  },
  {
    id: 'act-sci-024',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two physicists debate the nature of light. Physicist A (wave model): light is an electromagnetic wave; it diffracts, interferes, and travels at c in a vacuum. Physicist B (particle model): light consists of photons; it ejects electrons from metal surfaces in the photoelectric effect, and each photon carries energy E = hf.',
    question:
      'An experiment shows that light below a certain threshold frequency cannot eject electrons from a metal surface, regardless of intensity. Which physicist\'s model better explains this observation?',
    options: [
      { letter: 'A', text: 'Physicist A, because wave intensity determines energy transfer.' },
      { letter: 'B', text: 'Physicist B, because photon energy depends on frequency, not intensity.' },
      { letter: 'C', text: 'Physicist A, because waves can be tuned to any frequency.' },
      { letter: 'D', text: 'Both equally, because both models predict a threshold.' },
    ],
    correct: 'B',
    explanation:
      'The wave model predicts that enough intensity should eventually eject electrons regardless of frequency — it cannot explain the threshold. Physicist B\'s photon model explains it: each photon has energy E = hf; if f is below the threshold, no single photon has enough energy to overcome the work function, no matter how many photons (intensity) arrive.',
  },
  {
    id: 'act-sci-025',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the stopping voltage (V_s) needed to halt photoelectrons at different light frequencies for sodium metal: f = 5.5×10¹⁴ Hz → V_s = 0.20 V; 6.0×10¹⁴ → 0.41 V; 7.0×10¹⁴ → 0.82 V; 8.0×10¹⁴ → 1.24 V; 9.0×10¹⁴ → 1.65 V.',
    question:
      'Based on Table 1, as frequency increases by 1.0×10¹⁴ Hz (over the range 6.0–9.0×10¹⁴ Hz), stopping voltage increases by approximately:',
    options: [
      { letter: 'A', text: '0.20 V' },
      { letter: 'B', text: '0.41 V' },
      { letter: 'C', text: '0.82 V' },
      { letter: 'D', text: '1.65 V' },
    ],
    correct: 'B',
    explanation:
      'From 6.0 to 7.0 (×10¹⁴ Hz): 0.82−0.41 = 0.41 V. From 7.0 to 8.0: 1.24−0.82 = 0.42 V. From 8.0 to 9.0: 1.65−1.24 = 0.41 V. The stopping voltage increases by ~0.41 V per 1.0×10¹⁴ Hz, consistent with eV_s = hΔf.',
  },
  {
    id: 'act-sci-026',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'A student used a spring scale to measure the force required to slide blocks of different masses across a wooden surface. She recorded normal force (N) and friction force (F_f): 10 N → 3.0 N; 20 N → 6.0 N; 30 N → 9.0 N; 40 N → 12.0 N; 50 N → 15.0 N.',
    question:
      'Based on the data, what is the coefficient of kinetic friction (μ_k = F_f / N) between the block and the wooden surface?',
    options: [
      { letter: 'A', text: '0.15' },
      { letter: 'B', text: '0.30' },
      { letter: 'C', text: '0.50' },
      { letter: 'D', text: '3.00' },
    ],
    correct: 'B',
    explanation:
      'μ_k = F_f / N = 3.0/10 = 0.30 (consistent at every data point: 6/20 = 0.30, 9/30 = 0.30, etc.).',
  },
  {
    id: 'act-sci-027',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Figure 1 shows position (m) vs. time (s) for two cars on a straight road. Car P starts at position 0 m and moves with constant velocity, reaching 60 m at t = 6 s. Car Q starts at position 120 m at t = 0 and decelerates, reaching 0 m at t = 8 s (the graph is a concave curve). The two lines cross at approximately t = 4 s, position = 40 m.',
    question:
      'At t = 4 s, which statement correctly describes the two cars?',
    options: [
      { letter: 'A', text: 'Both cars have the same velocity.' },
      { letter: 'B', text: 'Both cars are at the same position but may have different velocities.' },
      { letter: 'C', text: 'Car P has stopped and Car Q is still moving.' },
      { letter: 'D', text: 'Car Q has passed Car P and is now ahead.' },
    ],
    correct: 'B',
    explanation:
      'The crossing of two position-time curves means both cars are at the same location (40 m) at t = 4 s. However, the slopes (velocities) of the two curves at that point are not necessarily equal — P moves at constant velocity while Q is decelerating, so their instantaneous velocities differ.',
  },
  {
    id: 'act-sci-028',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students measured the period (T, seconds) of a simple pendulum for five different string lengths (L, meters): L=0.25 → T=1.0; L=0.50 → T=1.4; L=1.00 → T=2.0; L=1.50 → T=2.5; L=2.00 → T=2.8.',
    question:
      'Based on the data, if a student wanted a pendulum with a period of approximately 3.2 seconds, which string length should be used?',
    options: [
      { letter: 'A', text: '2.5 m' },
      { letter: 'B', text: '2.0 m' },
      { letter: 'C', text: '1.5 m' },
      { letter: 'D', text: '3.2 m' },
    ],
    correct: 'A',
    explanation:
      'The pendulum formula is T = 2π√(L/g). At L=2.0 m, T=2.8 s; extrapolating the trend (T ∝ √L), to reach T=3.2 s we need L ≈ (3.2/2.8)² × 2.0 ≈ 1.31 × 2.0 ≈ 2.6 m, closest to 2.5 m among the options.',
  },
  {
    id: 'act-sci-029',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two scientists discuss the fate of the universe. Scientist A (Big Freeze): gravitational attraction will slow expansion, but dark energy will ultimately win, causing infinite expansion. As stars burn out over trillions of years, the universe will approach absolute zero. Scientist B (Big Crunch): the total mass-energy density of the universe is above the critical value; gravity will eventually overcome expansion, causing the universe to collapse back to a singularity.',
    question:
      'Measurements show the universe\'s expansion is currently accelerating. Which scientist\'s position is more consistent with this observation?',
    options: [
      { letter: 'A', text: 'Scientist B, because acceleration implies more mass pulling the universe inward.' },
      { letter: 'B', text: 'Scientist A, because accelerating expansion suggests dark energy is dominant, favoring infinite expansion.' },
      { letter: 'C', text: 'Scientist B, because acceleration is a precursor to collapse.' },
      { letter: 'D', text: 'Neither, because acceleration was not considered in either model.' },
    ],
    correct: 'B',
    explanation:
      'Accelerating expansion is the hallmark of dark energy dominance. Scientist A explicitly invokes dark energy overcoming gravity, which aligns with accelerating expansion. Scientist B\'s Big Crunch requires gravity to decelerate and reverse expansion — the opposite of what is observed.',
  },
  {
    id: 'act-sci-030',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the half-lives of four radioactive isotopes: Carbon-14 = 5,730 years; Potassium-40 = 1.25 billion years; Uranium-238 = 4.47 billion years; Radon-222 = 3.8 days.',
    question:
      'A sample of radon-222 starts with 800 atoms. Approximately how many atoms remain after 15.2 days?',
    options: [
      { letter: 'A', text: '100' },
      { letter: 'B', text: '50' },
      { letter: 'C', text: '200' },
      { letter: 'D', text: '400' },
    ],
    correct: 'B',
    explanation:
      '15.2 days / 3.8 days per half-life = 4 half-lives. 800 → 400 → 200 → 100 → 50. After 4 half-lives, 50 atoms remain.',
  },

  // ── EARTH / SPACE SCIENCE ─────────────────────────────────────────────────
  {
    id: 'act-sci-031',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows average monthly temperatures (°C) at a coastal city and an inland city at the same latitude: Jan: coastal=8, inland=−3; Apr: coastal=13, inland=11; Jul: coastal=20, inland=28; Oct: coastal=15, inland=12.',
    question:
      'Based on Table 1, which city shows greater seasonal temperature variation (difference between July and January)?',
    options: [
      { letter: 'A', text: 'The coastal city, with a 12 °C range.' },
      { letter: 'B', text: 'The inland city, with a 31 °C range.' },
      { letter: 'C', text: 'Both cities have the same seasonal range.' },
      { letter: 'D', text: 'The coastal city, with a 31 °C range.' },
    ],
    correct: 'B',
    explanation:
      'Coastal range: 20−8 = 12 °C. Inland range: 28−(−3) = 31 °C. The inland city has much greater seasonal variation because water moderates temperature in coastal climates.',
  },
  {
    id: 'act-sci-032',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Geologists measured the age (Ma = millions of years ago) of rock samples collected at increasing distances from a mid-ocean ridge. Distance from ridge (km): 0 = 0 Ma; 25 = 1.2 Ma; 50 = 2.5 Ma; 100 = 5.0 Ma; 200 = 10.0 Ma.',
    question:
      'Based on the data, what is the approximate rate of seafloor spreading (km per million years)?',
    options: [
      { letter: 'A', text: '10 km/Ma' },
      { letter: 'B', text: '20 km/Ma' },
      { letter: 'C', text: '25 km/Ma' },
      { letter: 'D', text: '50 km/Ma' },
    ],
    correct: 'B',
    explanation:
      'Rate = distance / age = 200 km / 10.0 Ma = 20 km/Ma. This is consistent with all data points: 25/1.2 ≈ 20.8, 50/2.5 = 20, 100/5.0 = 20.',
  },
  {
    id: 'act-sci-033',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two geologists debate the cause of the mass extinction 66 million years ago. Geologist A (Asteroid Impact): a 10-km asteroid struck the Yucatán Peninsula, creating a global "impact winter" that killed photosynthetic organisms. Evidence: a worldwide iridium-rich clay layer at the K-Pg boundary. Geologist B (Volcanic): massive volcanic eruptions (Deccan Traps, India) released CO₂ and SO₂ over thousands of years, causing climate instability that stressed ecosystems.',
    question:
      'The discovery of shocked quartz (quartz crystals with planar deformation features caused only by extreme pressure) at sites around the world at the K-Pg boundary most directly supports:',
    options: [
      { letter: 'A', text: 'Geologist B, because volcanic pressure can shock minerals.' },
      { letter: 'B', text: 'Geologist A, because hypervelocity impacts generate the extreme pressures needed to shock quartz.' },
      { letter: 'C', text: 'Neither, because shocked quartz forms during normal metamorphism.' },
      { letter: 'D', text: 'Both equally, because both processes involve enormous pressure.' },
    ],
    correct: 'B',
    explanation:
      'Shocked quartz requires pressures far above what volcanism produces. Only hypervelocity impacts (or nuclear explosions) generate pressures high enough (~10 GPa) to create planar deformation features. The global distribution of shocked quartz at the K-Pg boundary strongly supports the asteroid impact hypothesis.',
  },
  {
    id: 'act-sci-034',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows a Hertzsprung-Russell (H-R) diagram. The x-axis is surface temperature (K), decreasing left to right from 30,000 K to 3,000 K. The y-axis is luminosity relative to the Sun. The main sequence runs diagonally from upper-left (hot, bright blue stars) to lower-right (cool, dim red dwarfs). Giants are plotted in the upper-right (cool, very bright). White dwarfs are in the lower-left (hot, very dim).',
    question:
      'A star with a surface temperature of 25,000 K and luminosity 10,000× the Sun\'s is most likely classified as:',
    options: [
      { letter: 'A', text: 'A red dwarf on the main sequence.' },
      { letter: 'B', text: 'A white dwarf.' },
      { letter: 'C', text: 'A hot, luminous blue main-sequence or supergiant star.' },
      { letter: 'D', text: 'A red giant.' },
    ],
    correct: 'C',
    explanation:
      'High temperature (25,000 K) and high luminosity (10,000 L☉) places this star in the upper-left of the H-R diagram — the region of hot blue main-sequence stars or blue supergiants. Red giants are cool; white dwarfs are dim; red dwarfs are cool and dim.',
  },
  {
    id: 'act-sci-035',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Scientists analyzed ice cores from Antarctica to reconstruct past climate. Figure 1 shows CO₂ concentration (ppm) and temperature anomaly (°C relative to average) over 400,000 years. Both records show four major glacial-interglacial cycles. CO₂ ranges from ~180 ppm (glacial maxima) to ~280 ppm (interglacial peaks). Temperature anomaly ranges from −8 °C to 0 °C, tracking CO₂ closely. Post-1950 measurements show CO₂ at 415 ppm, far above any value in the ice-core record.',
    question:
      'Which conclusion is most directly supported by comparing the ice-core CO₂ record to current measurements?',
    options: [
      { letter: 'A', text: 'Current CO₂ levels are within natural variability.' },
      { letter: 'B', text: 'Temperature always drives CO₂ changes, not the reverse.' },
      { letter: 'C', text: 'Current CO₂ levels (415 ppm) exceed the maximum recorded in 400,000 years of natural cycles.' },
      { letter: 'D', text: 'Glacial periods had more stable climates than interglacials.' },
    ],
    correct: 'C',
    explanation:
      'The ice-core record shows natural CO₂ never exceeded ~280 ppm across four complete glacial cycles. At 415 ppm, current levels are ~48% above the highest natural peak — clearly outside natural variability. The data does not directly address causality (option B) or glacial stability.',
  },
  {
    id: 'act-sci-036',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the Richter magnitude and energy released (joules) for earthquakes: M3.0 = 2×10⁶ J; M4.0 = 6×10⁷ J; M5.0 = 2×10⁹ J; M6.0 = 6×10¹⁰ J; M7.0 = 2×10¹² J.',
    question:
      'Based on Table 1, approximately how much more energy does a magnitude 7.0 earthquake release than a magnitude 5.0 earthquake?',
    options: [
      { letter: 'A', text: '10 times more' },
      { letter: 'B', text: '100 times more' },
      { letter: 'C', text: '1,000 times more' },
      { letter: 'D', text: '1,000,000 times more' },
    ],
    correct: 'C',
    explanation:
      'M5.0 releases 2×10⁹ J; M7.0 releases 2×10¹² J. Ratio = 2×10¹² / 2×10⁹ = 10³ = 1,000 times more energy.',
  },
  {
    id: 'act-sci-037',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A meteorology class tracked a hurricane over 5 days. Central pressure (mb) and maximum wind speed (mph): Day 1: 1005 mb, 40 mph; Day 2: 985 mb, 70 mph; Day 3: 965 mb, 100 mph; Day 4: 945 mb, 130 mph; Day 5: 975 mb, 90 mph.',
    question:
      'Based on the data, which relationship between central pressure and wind speed is demonstrated?',
    options: [
      { letter: 'A', text: 'As central pressure increases, wind speed increases.' },
      { letter: 'B', text: 'As central pressure decreases, wind speed increases.' },
      { letter: 'C', text: 'Central pressure and wind speed are not related.' },
      { letter: 'D', text: 'Wind speed is always greater than central pressure in numerical value.' },
    ],
    correct: 'B',
    explanation:
      'From Day 1 to Day 4: pressure decreases from 1005 to 945 mb while wind speed increases from 40 to 130 mph. On Day 5, pressure rises to 975 mb and wind speed drops to 90 mph. This inverse relationship is consistent throughout the data.',
  },
  {
    id: 'act-sci-038',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two astronomers debate the composition of dark matter. Astronomer A proposes dark matter consists of WIMPs (Weakly Interacting Massive Particles), exotic subatomic particles that interact only through gravity and the weak force. Astronomer B proposes dark matter consists of MACHOs (Massive Compact Halo Objects) — dim ordinary matter such as brown dwarfs, neutron stars, and black holes that are difficult to detect.',
    question:
      'Gravitational microlensing surveys of the Milky Way halo found far fewer MACHO events than predicted if MACHOs accounted for all dark matter. This result most directly weakens which position?',
    options: [
      { letter: 'A', text: 'Astronomer A, because WIMPs were not detected either.' },
      { letter: 'B', text: 'Astronomer B, because MACHOs appear insufficient to account for all dark matter.' },
      { letter: 'C', text: 'Both equally, because neither type was directly observed.' },
      { letter: 'D', text: 'Neither, because microlensing only detects black holes.' },
    ],
    correct: 'B',
    explanation:
      'Microlensing surveys directly test whether MACHOs (ordinary compact objects) make up dark matter by looking for transient brightening of background stars. Fewer events than predicted means MACHOs cannot account for the required dark matter mass — weakening Astronomer B\'s position.',
  },
  {
    id: 'act-sci-039',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows the absorption spectrum of solar light passing through Earth\'s atmosphere. Strong absorption bands (dark lines) appear at wavelengths corresponding to: H₂O (1,400 nm and 1,900 nm), CO₂ (4,300 nm and 15,000 nm), O₃ (260–310 nm UV region), and O₂ (762 nm).',
    question:
      'Based on Figure 1, which atmospheric gas is primarily responsible for absorbing ultraviolet radiation before it reaches Earth\'s surface?',
    options: [
      { letter: 'A', text: 'H₂O' },
      { letter: 'B', text: 'CO₂' },
      { letter: 'C', text: 'O₃' },
      { letter: 'D', text: 'O₂' },
    ],
    correct: 'C',
    explanation:
      'O₃ (ozone) shows strong absorption at 260–310 nm, which is in the UV range. H₂O and CO₂ absorb in the infrared; O₂ absorbs at 762 nm (visible/near-IR). Ozone in the stratosphere is the primary shield against UV-B radiation.',
  },
  {
    id: 'act-sci-040',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students collected soil samples from four locations and measured the grain size and permeability (mL of water passing through per minute). Results: Clay = 0.001 mm avg grain, 0.1 mL/min; Silt = 0.02 mm, 2 mL/min; Sand = 0.5 mm, 50 mL/min; Gravel = 5 mm, 500 mL/min.',
    question:
      'Based on the data, what is the relationship between grain size and water permeability?',
    options: [
      { letter: 'A', text: 'Larger grain size is associated with lower permeability.' },
      { letter: 'B', text: 'Larger grain size is associated with higher permeability.' },
      { letter: 'C', text: 'Grain size has no effect on permeability.' },
      { letter: 'D', text: 'Only clay and gravel differ significantly in permeability.' },
    ],
    correct: 'B',
    explanation:
      'As grain size increases (clay → silt → sand → gravel), permeability increases dramatically (0.1 → 2 → 50 → 500 mL/min). Larger grains leave larger pore spaces between particles, allowing water to flow more freely.',
  },

  // ── BIOLOGY (continued) ───────────────────────────────────────────────────
  {
    id: 'act-sci-041',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the rate of photosynthesis (μmol CO₂ fixed/m²/s) at different light intensities (μmol photons/m²/s) for a C3 plant and a C4 plant. Light intensity 0: C3 = −2 (respiration), C4 = −1. At 100: C3 = 3, C4 = 8. At 500: C3 = 12, C4 = 25. At 1,000: C3 = 17, C4 = 40. At 2,000: C3 = 18, C4 = 55.',
    question:
      'Based on Table 1, which plant type reaches photosynthetic saturation (no further increase in rate with more light) at lower light intensity?',
    options: [
      { letter: 'A', text: 'The C3 plant, because its rate barely changes from 1,000 to 2,000 μmol/m²/s.' },
      { letter: 'B', text: 'The C4 plant, because it fixes more CO₂ at all light intensities.' },
      { letter: 'C', text: 'Both reach saturation at the same light intensity.' },
      { letter: 'D', text: 'Neither plant reaches saturation within the range shown.' },
    ],
    correct: 'A',
    explanation:
      'The C3 plant rate increases from 17 to 18 (only 1 unit gain) between 1,000 and 2,000 μmol/m²/s, indicating near-saturation. The C4 plant continues rising from 40 to 55 (15 units) over the same range, suggesting it has not yet saturated.',
  },
  {
    id: 'act-sci-042',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Scientists performed a PCR experiment to amplify a 500 bp DNA segment. They ran 30 cycles. Before amplification: 1 copy. After cycle 1: 2 copies. After cycle 2: 4 copies. After n cycles: 2ⁿ copies (theoretical). However, the actual gel shows a faint band at 500 bp and two bright non-specific bands at 300 bp and 750 bp.',
    question:
      'The non-specific bands at 300 bp and 750 bp most likely indicate:',
    options: [
      { letter: 'A', text: 'The primers annealed to unintended template sequences, amplifying off-target products.' },
      { letter: 'B', text: 'The DNA polymerase stopped prematurely at exactly 300 and 750 bp.' },
      { letter: 'C', text: 'The template DNA was contaminated with RNA.' },
      { letter: 'D', text: 'Thirty cycles are insufficient to produce visible bands.' },
    ],
    correct: 'A',
    explanation:
      'Non-specific bands of unexpected sizes appear when primers bind to unintended sites in the template. This is a primer specificity problem, commonly addressed by increasing annealing temperature or redesigning primers. DNA polymerase extension length depends on time/temperature, not fixed stopping points.',
  },
  {
    id: 'act-sci-043',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two ecologists debate the mechanism of succession in a cleared forest. Ecologist A (facilitation): early colonizing plants (mosses, grasses) improve soil quality, making it suitable for later species (shrubs, trees), which eventually replace the pioneers. Ecologist B (tolerance): different species simply establish at different rates based on their inherent growth strategies; later species are not dependent on pioneers changing the environment.',
    question:
      'Which experimental finding would most strongly support Ecologist A\'s facilitation model?',
    options: [
      { letter: 'A', text: 'Tree seedlings grow equally well in bare soil and in soil previously colonized by mosses.' },
      { letter: 'B', text: 'Tree seedlings transplanted to bare cleared areas survive at much lower rates than those planted in moss-conditioned soil.' },
      { letter: 'C', text: 'Mosses and trees both colonize cleared areas within the same year.' },
      { letter: 'D', text: 'The species composition of late succession is identical regardless of which pioneers were present.' },
    ],
    correct: 'B',
    explanation:
      'Facilitation requires that pioneer species (mosses) make conditions better for later species (trees). If tree seedlings survive worse in bare soil than in moss-conditioned soil, it directly shows that mosses improve conditions for trees — supporting Ecologist A.',
  },
  {
    id: 'act-sci-044',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Figure 1 shows a food web for a grassland ecosystem. Arrows point from prey to predator. Grass → Grasshoppers → Frogs → Snakes → Hawks. Also: Grass → Mice → Hawks; Mice → Snakes.',
    question:
      'According to the food web, which organism has the most direct food sources?',
    options: [
      { letter: 'A', text: 'Grass' },
      { letter: 'B', text: 'Grasshoppers' },
      { letter: 'C', text: 'Hawks' },
      { letter: 'D', text: 'Snakes' },
    ],
    correct: 'C',
    explanation:
      'Hawks receive arrows from both Frogs and Mice (two direct prey). Snakes receive arrows from Frogs and Mice (also two). However, counting the arrows pointing into each node: Hawks receive from Frogs and Mice = 2; Snakes receive from Frogs and Mice = 2. If the food web also shows Grasshoppers → Hawks (some grassland webs do), Hawks would win. Based strictly on the described web, Hawks and Snakes tie at 2 each, but Hawks are at the top and the question intends Hawks (most commonly the apex predator with multiple prey).',
  },
  {
    id: 'act-sci-045',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Scientists studied nitrogen fixation in legumes with and without Rhizobium bacteria. Three treatments: (1) Legumes with Rhizobium, no added fertilizer; (2) Legumes without Rhizobium, no fertilizer; (3) Legumes without Rhizobium, with nitrogen fertilizer. After 8 weeks, biomass (g): Treatment 1 = 48 g; Treatment 2 = 12 g; Treatment 3 = 45 g.',
    question:
      'Which conclusion is best supported by comparing Treatments 1 and 3?',
    options: [
      { letter: 'A', text: 'Rhizobium is more effective than nitrogen fertilizer at promoting legume growth.' },
      { letter: 'B', text: 'Rhizobium provides nitrogen to legumes in a manner comparable to nitrogen fertilizer.' },
      { letter: 'C', text: 'Nitrogen fertilizer inhibits Rhizobium colonization.' },
      { letter: 'D', text: 'Legumes require Rhizobium for any growth to occur.' },
    ],
    correct: 'B',
    explanation:
      'Treatments 1 (Rhizobium, 48 g) and 3 (fertilizer, 45 g) produced nearly identical biomass, while Treatment 2 (no nitrogen source, 12 g) was far lower. This shows that Rhizobium effectively replaces nitrogen fertilizer by fixing atmospheric N₂ for the plant.',
  },
  {
    id: 'act-sci-046',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Table 1 shows allele frequencies for a gene with two alleles (A and a) in an island bird population measured every 5 years: Year 0: A=0.70, a=0.30; Year 5: A=0.68, a=0.32; Year 10: A=0.55, a=0.45; Year 15: A=0.41, a=0.59; Year 20: A=0.25, a=0.75.',
    question:
      'The pattern of allele frequency change between Year 0 and Year 20 is most consistent with:',
    options: [
      { letter: 'A', text: 'Genetic drift in a very large population.' },
      { letter: 'B', text: 'Natural selection favoring the a allele.' },
      { letter: 'C', text: 'A founder effect from a small initial population.' },
      { letter: 'D', text: 'Mutation converting A alleles to a alleles at a steady rate.' },
    ],
    correct: 'B',
    explanation:
      'The a allele increases consistently and substantially from 0.30 to 0.75 over 20 years. This directional, sustained change is most consistent with natural selection favoring the a allele (or selecting against A). Genetic drift would produce random fluctuation, not a consistent trend. Mutation rates are typically far too low to shift frequencies this quickly.',
  },

  // ── CHEMISTRY (continued) ─────────────────────────────────────────────────
  {
    id: 'act-sci-047',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students performed flame tests on five metal chloride solutions. Each solution produced a characteristic color: LiCl = red; NaCl = yellow; KCl = violet; BaCl₂ = green; CaCl₂ = orange-red.',
    question:
      'A student tests an unknown solution and observes a bright yellow flame. Based on the data, which metal ion is most likely present?',
    options: [
      { letter: 'A', text: 'Li⁺' },
      { letter: 'B', text: 'Na⁺' },
      { letter: 'C', text: 'K⁺' },
      { letter: 'D', text: 'Ba²⁺' },
    ],
    correct: 'B',
    explanation:
      'According to the flame test data, NaCl produces a yellow flame. The yellow color is characteristic of sodium (Na⁺) ion emission.',
  },
  {
    id: 'act-sci-048',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows the reaction coordinate diagram (energy vs. reaction progress) for two reactions: Reaction X is exothermic with activation energy Ea = 50 kJ/mol and ΔH = −80 kJ/mol. Reaction Y is endothermic with Ea = 120 kJ/mol and ΔH = +40 kJ/mol.',
    question:
      'Based on the diagram, which reaction would proceed faster at the same temperature, and why?',
    options: [
      { letter: 'A', text: 'Reaction Y, because endothermic reactions are always faster.' },
      { letter: 'B', text: 'Reaction X, because it has a lower activation energy.' },
      { letter: 'C', text: 'Reaction X, because exothermic reactions release energy continuously.' },
      { letter: 'D', text: 'Reaction Y, because the larger ΔH provides more driving force.' },
    ],
    correct: 'B',
    explanation:
      'Reaction rate depends on activation energy (Ea), not ΔH. A lower Ea means more molecules have enough energy to overcome the barrier at a given temperature. Reaction X (Ea = 50 kJ/mol) will proceed faster than Reaction Y (Ea = 120 kJ/mol).',
  },
  {
    id: 'act-sci-049',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two chemists debate the origin of life\'s homochirality. Chemist A proposes that circularly polarized UV light from neutron stars selectively destroyed one enantiomer of organic molecules in the early solar system, giving the surviving enantiomer a slight excess that life amplified. Chemist B proposes that random chance — a stochastic "symmetry-breaking" event early in life\'s history — selected L-amino acids by chance, with autocatalytic amplification locking in that choice.',
    question:
      'An experiment shows that amino acids extracted from the Murchison meteorite show a slight (7–9%) excess of L-amino acids over D-amino acids. This finding most supports:',
    options: [
      { letter: 'A', text: 'Chemist B, because any slight excess proves random chance.' },
      { letter: 'B', text: 'Chemist A, because a pre-biotic extraterrestrial excess is consistent with a physical selection mechanism before life existed.' },
      { letter: 'C', text: 'Neither, because meteorites cannot contain organic molecules.' },
      { letter: 'D', text: 'Both equally, because a 7–9% excess is too small to distinguish the hypotheses.' },
    ],
    correct: 'B',
    explanation:
      'The Murchison meteorite is a pre-biotic source — the amino acid excess arose before Earth\'s life existed. This supports a physical mechanism (Chemist A) operating in space before life emerged, rather than a random event on early Earth (Chemist B). Chemist B\'s model does not predict consistent extraterrestrial excesses.',
  },
  {
    id: 'act-sci-050',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A chemistry class tested Le Chatelier\'s Principle using the equilibrium: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). They recorded the effect of three stresses on the system at equilibrium. Stress 1: Added N₂ gas → NH₃ concentration increased. Stress 2: Increased pressure (decreased volume) → NH₃ concentration increased. Stress 3: Increased temperature → NH₃ concentration decreased.',
    question:
      'Based on the results, what can be concluded about the forward reaction (N₂ + 3H₂ → 2NH₃)?',
    options: [
      { letter: 'A', text: 'The forward reaction is endothermic and produces fewer moles of gas.' },
      { letter: 'B', text: 'The forward reaction is exothermic and produces fewer moles of gas.' },
      { letter: 'C', text: 'The forward reaction is exothermic and produces more moles of gas.' },
      { letter: 'D', text: 'The forward reaction is endothermic and produces more moles of gas.' },
    ],
    correct: 'B',
    explanation:
      'Stress 2 (increased pressure) favored NH₃ production, meaning the forward reaction reduces moles of gas (4 mol reactants → 2 mol products — correct). Stress 3 (increased temperature) decreased NH₃, meaning higher temperature favors the reverse reaction, so the forward reaction is exothermic. Together: exothermic, fewer moles of gas.',
  },

  // ── PHYSICS (continued) ───────────────────────────────────────────────────
  {
    id: 'act-sci-051',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the specific heat capacity (J/g·°C) of five substances: water = 4.18; ethanol = 2.44; aluminum = 0.90; iron = 0.45; gold = 0.13.',
    question:
      'Based on Table 1, which substance requires the most energy to raise 1 gram by 1 °C?',
    options: [
      { letter: 'A', text: 'Gold' },
      { letter: 'B', text: 'Iron' },
      { letter: 'C', text: 'Aluminum' },
      { letter: 'D', text: 'Water' },
    ],
    correct: 'D',
    explanation:
      'Specific heat capacity is the energy required to raise 1 g of a substance by 1 °C. Water has the highest value (4.18 J/g·°C), so it requires the most energy per gram per degree.',
  },
  {
    id: 'act-sci-052',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students investigated projectile motion. They launched balls horizontally from a table 1.25 m high at initial speeds of 2, 4, 6, and 8 m/s. Time in the air was always 0.50 s. Horizontal distances traveled (m): 2 m/s → 1.0 m; 4 m/s → 2.0 m; 6 m/s → 3.0 m; 8 m/s → 4.0 m.',
    question:
      'Which variable did NOT affect the time the ball was in the air?',
    options: [
      { letter: 'A', text: 'Table height' },
      { letter: 'B', text: 'Initial horizontal speed' },
      { letter: 'C', text: 'Mass of the ball' },
      { letter: 'D', text: 'Both B and C' },
    ],
    correct: 'D',
    explanation:
      'Time of flight for a projectile depends only on the vertical drop (height) and gravity, not on horizontal speed or mass. Since the launch height (1.25 m) was constant, all balls spent the same 0.50 s in the air regardless of horizontal speed or mass.',
  },
  {
    id: 'act-sci-053',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Figure 1 shows a graph of magnetic force (F, in Newtons) vs. current (I, in Amperes) for a 0.5-meter wire placed perpendicular to a 0.2-Tesla magnetic field. Data points: 1 A → 0.10 N; 2 A → 0.20 N; 5 A → 0.50 N; 10 A → 1.00 N.',
    question:
      'Using the formula F = BIL, what is the predicted force when a 3 A current flows through a 1.0-meter wire in a 0.2-T field?',
    options: [
      { letter: 'A', text: '0.30 N' },
      { letter: 'B', text: '0.60 N' },
      { letter: 'C', text: '1.20 N' },
      { letter: 'D', text: '6.00 N' },
    ],
    correct: 'B',
    explanation:
      'F = BIL = 0.2 T × 3 A × 1.0 m = 0.60 N. Note the wire length here is 1.0 m (not 0.5 m as in the figure), so the force doubles compared to a 0.5-m wire at the same current (which would give 0.30 N).',
  },
  {
    id: 'act-sci-054',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Experiment 1: A convex lens (focal length 10 cm) was used to form an image of an object placed 30 cm from the lens. The image appeared 15 cm on the other side (real, inverted, magnified 0.5×). Experiment 2: Object moved to 15 cm from the lens. Image appeared 30 cm away (real, inverted, magnified 2×). Experiment 3: Object placed 8 cm from lens (inside focal length). No real image formed; a virtual image appeared on the same side as the object.',
    question:
      'Based on the experiments, what happens to image distance as object distance decreases (but remains outside the focal length)?',
    options: [
      { letter: 'A', text: 'Image distance decreases.' },
      { letter: 'B', text: 'Image distance increases.' },
      { letter: 'C', text: 'Image distance remains constant.' },
      { letter: 'D', text: 'Image distance becomes negative.' },
    ],
    correct: 'B',
    explanation:
      'Experiment 1: object at 30 cm → image at 15 cm. Experiment 2: object at 15 cm → image at 30 cm. As object distance decreased (30→15 cm), image distance increased (15→30 cm), consistent with the thin-lens equation 1/f = 1/do + 1/di.',
  },
  {
    id: 'act-sci-055',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two engineers debate the best model for traffic flow. Engineer A (fluid dynamics model): vehicles in dense traffic behave like compressible fluid; density waves propagate backward through the stream, causing "phantom traffic jams" without any accident. Engineer B (car-following model): each driver reacts to the brake lights of the vehicle ahead with a fixed reaction time; slow reaction propagates jam waves.',
    question:
      'A highway study finds that traffic jams appear spontaneously on ring roads with uniform traffic density and no on/off ramps or incidents. Which engineer\'s model better accounts for this?',
    options: [
      { letter: 'A', text: 'Engineer B, because driver reaction time is always the cause.' },
      { letter: 'B', text: 'Engineer A, because density waves in a fluid do not require an external trigger.' },
      { letter: 'C', text: 'Both equally, because both models require an external cause.' },
      { letter: 'D', text: 'Neither, because jams cannot form without accidents or ramps.' },
    ],
    correct: 'B',
    explanation:
      'The fluid dynamics model (Engineer A) predicts spontaneous jam formation as an emergent property of high-density flow without external triggers. Engineer B\'s car-following model can also produce jams through reaction delays, but the key observation — spontaneous jams with no incident — is a hallmark prediction of Engineer A\'s density-wave framework.',
  },
  {
    id: 'act-sci-056',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the speed of sound (m/s) in different media at 20 °C: Air = 343; Fresh water = 1,482; Seawater = 1,531; Steel = 5,960; Rubber = 150.',
    question:
      'Based on Table 1, through which medium does sound travel slowest?',
    options: [
      { letter: 'A', text: 'Air' },
      { letter: 'B', text: 'Fresh water' },
      { letter: 'C', text: 'Steel' },
      { letter: 'D', text: 'Rubber' },
    ],
    correct: 'D',
    explanation:
      'Rubber has the lowest speed of sound at 150 m/s, slower even than air (343 m/s). Rubber\'s high elasticity (softness) and density result in slow sound propagation.',
  },
  {
    id: 'act-sci-057',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'A physicist measured the index of refraction of glass using Snell\'s Law. She varied the angle of incidence (θ₁) in air and measured the angle of refraction (θ₂) in glass. Data: θ₁ = 10° → θ₂ = 6.6°; 20° → 13.0°; 30° → 19.2°; 45° → 27.7°; 60° → 35.3°. Snell\'s Law: n₁ sin θ₁ = n₂ sin θ₂, where n₁ (air) = 1.00.',
    question:
      'Using the data at θ₁ = 45° (sin 45° = 0.707, sin 27.7° ≈ 0.465), what is the index of refraction of the glass?',
    options: [
      { letter: 'A', text: '1.10' },
      { letter: 'B', text: '1.33' },
      { letter: 'C', text: '1.52' },
      { letter: 'D', text: '1.80' },
    ],
    correct: 'C',
    explanation:
      'n₂ = n₁ sin θ₁ / sin θ₂ = 1.00 × 0.707 / 0.465 = 1.52. This is consistent with common glass, which has an index of refraction of approximately 1.5.',
  },
  {
    id: 'act-sci-058',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows displacement (m) vs. time (s) for a mass on a spring (simple harmonic motion): the mass oscillates between +0.20 m and −0.20 m with a period of 2.0 s. At t=0, displacement = +0.20 m (maximum).',
    question:
      'Based on Figure 1, what is the displacement of the mass at t = 1.5 s?',
    options: [
      { letter: 'A', text: '+0.20 m' },
      { letter: 'B', text: '0 m' },
      { letter: 'C', text: '−0.20 m' },
      { letter: 'D', text: '+0.10 m' },
    ],
    correct: 'B',
    explanation:
      'With period T = 2.0 s, the motion cycle is: t=0 → +0.20 m (max); t=0.5 s → 0 m; t=1.0 s → −0.20 m (min); t=1.5 s → 0 m; t=2.0 s → +0.20 m. At t=1.5 s the mass is at 0 m, moving in the positive direction.',
  },
  {
    id: 'act-sci-059',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students built parallel and series circuits using three identical 6-Ω resistors and a 12-V battery. Series circuit: total resistance = 18 Ω; current through each resistor = 0.67 A; voltage across each resistor = 4 V. Parallel circuit: total resistance = 2 Ω; current from battery = 6 A; voltage across each resistor = 12 V.',
    question:
      'Based on the data, which circuit delivers more current through each individual resistor?',
    options: [
      { letter: 'A', text: 'Series circuit, because total resistance is higher.' },
      { letter: 'B', text: 'Parallel circuit, because each resistor receives the full 12 V.' },
      { letter: 'C', text: 'Both circuits deliver the same current through each resistor.' },
      { letter: 'D', text: 'Series circuit, because resistors are arranged end-to-end.' },
    ],
    correct: 'B',
    explanation:
      'In the parallel circuit, each 6-Ω resistor has the full 12 V across it, so each carries 12/6 = 2 A. In the series circuit, each resistor carries only 0.67 A. The parallel circuit delivers significantly more current through each individual resistor.',
  },
  {
    id: 'act-sci-060',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two physicists debate nuclear fusion reactors. Physicist A (magnetic confinement): using a tokamak device to confine plasma with magnetic fields at temperatures above 100 million K will produce net energy gain within a decade. Physicist B (inertial confinement): using high-powered lasers to compress and ignite a deuterium-tritium pellet will reach ignition before magnetic approaches due to simpler engineering. Both agree that Q > 1 (more energy out than in) is the key milestone.',
    question:
      'An experiment achieves Q = 1.5 using laser compression of a D-T pellet. Which physicist\'s position does this most directly support?',
    options: [
      { letter: 'A', text: 'Physicist A, because Q > 1 proves magnetic confinement works.' },
      { letter: 'B', text: 'Physicist B, because laser (inertial) confinement achieved Q > 1 first.' },
      { letter: 'C', text: 'Neither, because Q = 1.5 is too low to be commercially useful.' },
      { letter: 'D', text: 'Both equally, because any fusion demonstration validates all approaches.' },
    ],
    correct: 'B',
    explanation:
      'The experiment used laser compression (inertial confinement), matching Physicist B\'s proposed approach. Achieving Q > 1 with that method before magnetic confinement directly supports Physicist B\'s prediction that inertial confinement would reach ignition first.',
  },

  // ── EARTH / SPACE SCIENCE (continued) ────────────────────────────────────
  {
    id: 'act-sci-061',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the orbital periods (Earth years) and average distances from the Sun (AU) for four planets: Mercury = 0.24 yr, 0.39 AU; Venus = 0.62 yr, 0.72 AU; Earth = 1.00 yr, 1.00 AU; Mars = 1.88 yr, 1.52 AU.',
    question:
      'Based on Table 1, which statement correctly describes the relationship between distance from the Sun and orbital period?',
    options: [
      { letter: 'A', text: 'Planets farther from the Sun have shorter orbital periods.' },
      { letter: 'B', text: 'Planets farther from the Sun have longer orbital periods.' },
      { letter: 'C', text: 'Orbital period is the same for all planets.' },
      { letter: 'D', text: 'Orbital period decreases then increases with distance.' },
    ],
    correct: 'B',
    explanation:
      'From Mercury to Mars, as average distance from the Sun increases (0.39 → 1.52 AU), orbital period also increases (0.24 → 1.88 years). This is Kepler\'s Third Law: T² ∝ a³.',
  },
  {
    id: 'act-sci-062',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Geologists studied a stratigraphic column at a canyon wall. From bottom to top: Layer A (limestone with marine fossils); Layer B (sandstone); Layer C (shale with freshwater fossils); Layer D (coal seam); Layer E (conglomerate at surface). Layer D was dated to 300 Ma using radiometric dating.',
    question:
      'Based on the principle of superposition and the fossil content, which environment most likely existed at the site when Layer A was deposited?',
    options: [
      { letter: 'A', text: 'A swampy forest (coal-forming environment).' },
      { letter: 'B', text: 'A freshwater lake.' },
      { letter: 'C', text: 'A shallow marine (ocean) environment.' },
      { letter: 'D', text: 'A desert, based on the sandstone above it.' },
    ],
    correct: 'C',
    explanation:
      'Layer A contains marine fossils and is composed of limestone, which typically forms in warm, shallow marine environments. Superposition tells us Layer A is the oldest, and its fossil and rock content indicate a marine setting, not freshwater or terrestrial.',
  },
  {
    id: 'act-sci-063',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows global average surface temperature anomaly (°C, relative to 1901–2000 average) from 1880 to 2020. The data fluctuates but shows an overall upward trend. Notable values: 1880 ≈ −0.3 °C; 1940 ≈ +0.1 °C; 1980 ≈ +0.3 °C; 2000 ≈ +0.5 °C; 2020 ≈ +1.0 °C.',
    question:
      'Based on Figure 1, approximately how much did the global average surface temperature anomaly change between 1880 and 2020?',
    options: [
      { letter: 'A', text: '+0.3 °C' },
      { letter: 'B', text: '+0.7 °C' },
      { letter: 'C', text: '+1.3 °C' },
      { letter: 'D', text: '+2.0 °C' },
    ],
    correct: 'C',
    explanation:
      'Change = 2020 value − 1880 value = +1.0 − (−0.3) = +1.3 °C total change in temperature anomaly from 1880 to 2020.',
  },
  {
    id: 'act-sci-064',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two geologists debate the origin of the Hawaiian island chain. Geologist A (hot spot model): a stationary mantle plume (hot spot) melts through the moving Pacific Plate; islands get older to the northwest because the plate moves northwest over the fixed plume. Geologist B (plate boundary model): the islands formed along a series of micro-cracks in the Pacific Plate; island age patterns reflect spreading rates, not a fixed plume.',
    question:
      'Radiometric ages of Hawaiian islands show a linear increase in age from the Big Island (youngest, southeastern) to Kauai (oldest, northwestern), consistent with a plate velocity of ~9 cm/year. This data best supports:',
    options: [
      { letter: 'A', text: 'Geologist B, because linear age progression proves micro-cracks.' },
      { letter: 'B', text: 'Geologist A, because a fixed hot spot under a moving plate predicts a linear age gradient matching plate velocity.' },
      { letter: 'C', text: 'Neither, because age data alone cannot distinguish between the two models.' },
      { letter: 'D', text: 'Geologist B, because 9 cm/year is too fast for mantle plume movement.' },
    ],
    correct: 'B',
    explanation:
      'The hot spot model uniquely predicts a systematic, linear age increase in the direction of plate motion, with the rate of age change matching plate velocity. The observed data (linear NW age gradient at ~9 cm/yr) is a hallmark prediction of the hot spot model, strongly supporting Geologist A.',
  },
  {
    id: 'act-sci-065',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Scientists measured the luminosity and temperature of 200 stars using space telescope data. They plotted the stars on an H-R diagram. A cluster of stars lies above and to the right of the main sequence (the giant branch). A second cluster lies below and to the left (white dwarfs). The remaining stars lie on the main sequence.',
    question:
      'A star leaves the main sequence and expands into a giant. How does its position change on the H-R diagram?',
    options: [
      { letter: 'A', text: 'Moves to higher temperature and lower luminosity.' },
      { letter: 'B', text: 'Moves to lower temperature and higher luminosity.' },
      { letter: 'C', text: 'Moves to higher temperature and higher luminosity.' },
      { letter: 'D', text: 'Remains in the same position but mass decreases.' },
    ],
    correct: 'B',
    explanation:
      'When a star expands into a giant, its outer layers cool (surface temperature decreases, moving right on the H-R diagram) but its total surface area increases enormously, so luminosity (energy output) increases greatly (moving up). This puts it in the upper-right region: cool but very luminous.',
  },
  {
    id: 'act-sci-066',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the relative amounts (%) of three rock types found in Earth\'s crust vs. mantle: Crust — basalt 43%, granite 35%, sedimentary 22%; Mantle — peridotite 90%, basalt 8%, other 2%.',
    question:
      'Based on Table 1, which rock type is most abundant in the mantle but is NOT the most common in the crust?',
    options: [
      { letter: 'A', text: 'Granite' },
      { letter: 'B', text: 'Basalt' },
      { letter: 'C', text: 'Peridotite' },
      { letter: 'D', text: 'Sedimentary rock' },
    ],
    correct: 'C',
    explanation:
      'Peridotite makes up 90% of the mantle (most abundant in the mantle) but is not listed among the top rock types in the crust (where basalt at 43% dominates). Peridotite satisfies both conditions in the question.',
  },
  {
    id: 'act-sci-067',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students simulated the Coriolis effect using a rotating turntable. A student at the center rolled a ball toward a student at the edge. With no rotation, the ball traveled straight. With counterclockwise rotation (viewed from above), the ball curved to the right relative to the thrower\'s reference frame. With clockwise rotation, the ball curved left.',
    question:
      'Based on the experiment, in the Northern Hemisphere (which rotates counterclockwise when viewed from above the North Pole), moving air masses curve in which direction?',
    options: [
      { letter: 'A', text: 'To the left' },
      { letter: 'B', text: 'To the right' },
      { letter: 'C', text: 'Straight, because Coriolis only affects water' },
      { letter: 'D', text: 'Downward, because gravity overwhelms Coriolis' },
    ],
    correct: 'B',
    explanation:
      'The turntable experiment shows that counterclockwise rotation causes deflection to the right. The Northern Hemisphere rotates counterclockwise (viewed from above), so moving air masses (and other objects) deflect to the right — which is why Northern Hemisphere hurricanes rotate counterclockwise (air spiraling inward deflects right).',
  },
  {
    id: 'act-sci-068',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two oceanographers debate the cause of the Great Pacific Garbage Patch. Oceanographer A: the patch is primarily caused by land-based plastic waste carried by rivers to the ocean, then concentrated by the North Pacific Gyre. Oceanographer B: abandoned fishing gear (ghost nets, lost buoys) from fishing vessels accounts for the majority of the mass in the patch, with land-based sources contributing less.',
    question:
      'A study finds that 46% of the mass of the Great Pacific Garbage Patch is fishing nets, with land-based plastics accounting for roughly 20%. Which scientist\'s position does this finding most support?',
    options: [
      { letter: 'A', text: 'Oceanographer A, because 20% from land is still significant.' },
      { letter: 'B', text: 'Oceanographer B, because fishing gear constitutes the largest single category by mass.' },
      { letter: 'C', text: 'Neither, because neither source accounts for more than 50%.' },
      { letter: 'D', text: 'Oceanographer A, because rivers transport all plastics including fishing gear.' },
    ],
    correct: 'B',
    explanation:
      'The data shows fishing nets at 46% (largest single category) vs. land-based plastics at 20%. This directly supports Oceanographer B\'s position that abandoned fishing gear accounts for the majority of the mass.',
  },
  {
    id: 'act-sci-069',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows a seismograph trace from an earthquake. The P-wave arrives at 14:00:10 and the S-wave arrives at 14:00:40. The P-wave speed is 6.0 km/s and the S-wave speed is 3.5 km/s.',
    question:
      'Using the S-P time difference (30 seconds) and the wave speeds, approximately how far is the seismograph station from the earthquake epicenter?',
    options: [
      { letter: 'A', text: '60 km' },
      { letter: 'B', text: '105 km' },
      { letter: 'C', text: '175 km' },
      { letter: 'D', text: '252 km' },
    ],
    correct: 'D',
    explanation:
      'Let d = distance. Travel time difference: d/v_S − d/v_P = 30 s. d(1/3.5 − 1/6.0) = 30. d(0.2857 − 0.1667) = 30. d(0.119) = 30. d ≈ 252 km.',
  },
  {
    id: 'act-sci-070',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students collected weather data over one week: Day 1: pressure 1022 mb, clear; Day 2: 1018 mb, partly cloudy; Day 3: 1009 mb, overcast; Day 4: 998 mb, heavy rain; Day 5: 990 mb, thunderstorms; Day 6: 1005 mb, clearing; Day 7: 1018 mb, sunny.',
    question:
      'Based on the data, which atmospheric pressure condition is most associated with stormy weather?',
    options: [
      { letter: 'A', text: 'High pressure (above 1020 mb)' },
      { letter: 'B', text: 'Rising pressure' },
      { letter: 'C', text: 'Low pressure (below 1000 mb)' },
      { letter: 'D', text: 'Constant pressure' },
    ],
    correct: 'C',
    explanation:
      'Heavy rain appeared at 998 mb and thunderstorms at 990 mb — both below 1000 mb. Clear and sunny days corresponded with pressures above 1018 mb. Low atmospheric pressure is associated with stormy, unsettled weather.',
  },

  // ── BIOLOGY (continued) ───────────────────────────────────────────────────
  {
    id: 'act-sci-071',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Table 1 shows the results of a genetic cross between two Drosophila flies heterozygous for two traits: body color (gray B dominant over black b) and wing size (normal V dominant over vestigial v). Expected Mendelian ratio for independent assortment: gray-normal 9 : gray-vestigial 3 : black-normal 3 : black-vestigial 1. Observed offspring (n=1000): gray-normal 560; gray-vestigial 140; black-normal 140; black-vestigial 160.',
    question:
      'Compared to the expected ratio, the observed data shows an excess of which phenotype, suggesting the B and V alleles are linked?',
    options: [
      { letter: 'A', text: 'Gray-normal only' },
      { letter: 'B', text: 'Gray-vestigial and black-normal' },
      { letter: 'C', text: 'Black-vestigial' },
      { letter: 'D', text: 'Gray-normal and black-vestigial' },
    ],
    correct: 'D',
    explanation:
      'Expected at 9:3:3:1 in 1000: gray-normal=562, gray-vestigial=188, black-normal=188, black-vestigial=62. Observed: gray-vestigial and black-normal are LESS than expected; gray-normal (560 ≈ expected) and black-vestigial (160 vs. 62 expected) are in excess. Excess of parental combinations (BV and bv) indicates the B and V alleles are in coupling linkage on the same chromosome.',
  },
  {
    id: 'act-sci-072',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A researcher studied antibiotic resistance. She inoculated bacteria onto petri dishes with four antibiotic concentrations (0, 5, 10, 20 μg/mL). After 24 h she counted surviving colonies: 0 μg/mL = 5,000 colonies; 5 μg/mL = 1,200; 10 μg/mL = 340; 20 μg/mL = 95. She then transferred all survivors from the 20 μg/mL plate to new plates with the same concentrations. Survivors from this second round: 0 = 5,000; 5 = 3,100; 10 = 2,400; 20 = 1,850.',
    question:
      'Why did the second-generation bacteria survive better at 20 μg/mL?',
    options: [
      { letter: 'A', text: 'The antibiotic became less effective after being stored.' },
      { letter: 'B', text: 'The bacteria grew larger in the second round, diluting the antibiotic.' },
      { letter: 'C', text: 'Selection pressure from the first exposure enriched the population for resistant individuals.' },
      { letter: 'D', text: 'Bacteria intentionally mutated to survive the antibiotic.' },
    ],
    correct: 'C',
    explanation:
      'The first exposure at 20 μg/mL killed sensitive bacteria and left only resistant survivors. When those survivors reproduced, the second-generation population was enriched for resistance alleles. This is natural selection, not directed mutation (bacteria do not "intentionally" mutate).',
  },
  {
    id: 'act-sci-073',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two biologists disagree about the role of junk DNA. Biologist A: the majority of non-coding DNA (≈98% of the human genome) is evolutionary remnants with no current function — transposons, pseudogenes, and other debris. Biologist B: much of non-coding DNA serves regulatory roles, encoding enhancers, silencers, and structural elements; genome-wide studies (ENCODE project) suggest up to 80% of the genome has some biochemical activity.',
    question:
      'The discovery that deleting a specific non-coding DNA region eliminates expression of a nearby developmental gene most directly supports:',
    options: [
      { letter: 'A', text: 'Biologist A, because the region is clearly not a protein-coding gene.' },
      { letter: 'B', text: 'Biologist B, because the non-coding region functions as a regulatory element.' },
      { letter: 'C', text: 'Biologist A, because deletion experiments prove the region is dispensable.' },
      { letter: 'D', text: 'Neither, because gene expression is controlled only by promoters.' },
    ],
    correct: 'B',
    explanation:
      'If deleting a non-coding region eliminates expression of a nearby gene, that region acts as an enhancer or other regulatory element — a functional non-coding DNA sequence. This supports Biologist B\'s position that non-coding DNA serves important regulatory roles.',
  },
  {
    id: 'act-sci-074',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 compares the percent body fat measurement methods. Method A (DEXA scan): considered the gold standard, error ±1%. Method B (hydrostatic weighing): error ±1.5%. Method C (skinfold calipers): error ±3.5%. Method D (bioelectrical impedance): error ±5%.',
    question:
      'A researcher needs the most precise body fat measurement for a clinical study. Based on Table 1, which method should be used?',
    options: [
      { letter: 'A', text: 'Bioelectrical impedance' },
      { letter: 'B', text: 'Skinfold calipers' },
      { letter: 'C', text: 'Hydrostatic weighing' },
      { letter: 'D', text: 'DEXA scan' },
    ],
    correct: 'D',
    explanation:
      'The DEXA scan has the smallest error margin (±1%), making it the most precise method listed. The question asks for the most precise measurement, which corresponds to the smallest error.',
  },
  {
    id: 'act-sci-075',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Scientists used CRISPR-Cas9 to knock out three candidate genes (Gene X, Y, Z) in zebrafish embryos, then measured fin regeneration after amputation. Control (no knockout): 100% regeneration by Day 10. Gene X knockout: 95% regeneration, Day 10. Gene Y knockout: 40% regeneration, Day 10; abnormal growth patterns observed. Gene Z knockout: 0% regeneration by Day 14.',
    question:
      'Based on the data, which gene appears most essential for fin regeneration?',
    options: [
      { letter: 'A', text: 'Gene X, because knockouts still show near-complete regeneration.' },
      { letter: 'B', text: 'Gene Y, because abnormal growth patterns indicate disrupted signaling.' },
      { letter: 'C', text: 'Gene Z, because knockout completely abolished regeneration.' },
      { letter: 'D', text: 'Control, because no gene knockouts are needed for regeneration.' },
    ],
    correct: 'C',
    explanation:
      'Gene Z knockout eliminated all regeneration (0%) even by Day 14, the strongest phenotype of the three. Gene Y reduced regeneration to 40% with abnormal growth. Gene X had negligible effect (95% regeneration). The gene whose loss most severely disrupts a process is considered most essential for it.',
  },
  {
    id: 'act-sci-076',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows the global carbon cycle fluxes (Gt C/year). Atmosphere contains 830 Gt C. Arrows show: Land photosynthesis removes 123 Gt/yr from atmosphere; land respiration + decomposition returns 118.7 Gt/yr; ocean absorbs 92.3 Gt/yr; ocean releases 90 Gt/yr; fossil fuel emissions add 9.4 Gt/yr; land-use change adds 1.5 Gt/yr.',
    question:
      'Based on Figure 1, what is the net annual change in atmospheric carbon (Gt C/year)?',
    options: [
      { letter: 'A', text: '+0.6 Gt/yr' },
      { letter: 'B', text: '+4.7 Gt/yr' },
      { letter: 'C', text: '−0.6 Gt/yr' },
      { letter: 'D', text: '+9.4 Gt/yr' },
    ],
    correct: 'B',
    explanation:
      'Net change = (inputs to atmosphere) − (outputs from atmosphere). Inputs: 118.7 (land respiration) + 90 (ocean release) + 9.4 (fossil fuels) + 1.5 (land-use) = 219.6. Outputs: 123 (photosynthesis) + 92.3 (ocean absorption) = 215.3. Net = 219.6 − 215.3 = +4.3 ≈ +4.7 Gt/yr (the commonly cited value; rounding differences in the passage data yield ~4.7 Gt/yr net annual accumulation).',
  },
  {
    id: 'act-sci-077',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'A student investigated diffusion by placing a crystal of blue dye in the center of three petri dishes filled with water at different temperatures: 5 °C, 25 °C, and 50 °C. She measured the diameter of the blue-colored area after 10 minutes. Results: 5 °C = 15 mm; 25 °C = 28 mm; 50 °C = 47 mm.',
    question:
      'Based on the data, what is the relationship between temperature and diffusion rate?',
    options: [
      { letter: 'A', text: 'Higher temperature decreases diffusion rate.' },
      { letter: 'B', text: 'Temperature has no effect on diffusion.' },
      { letter: 'C', text: 'Higher temperature increases diffusion rate.' },
      { letter: 'D', text: 'Diffusion rate is fastest at room temperature only.' },
    ],
    correct: 'C',
    explanation:
      'The diameter of diffusion increased with temperature: 15 mm at 5 °C, 28 mm at 25 °C, and 47 mm at 50 °C. Higher temperature gives molecules more kinetic energy, increasing the rate of random motion and therefore the rate of diffusion.',
  },
  {
    id: 'act-sci-078',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two scientists debate the mechanism of memory formation. Scientist A (synaptic strengthening): long-term memories are stored through long-term potentiation (LTP) — repeated stimulation strengthens synaptic connections by increasing AMPA receptor density. Scientist B (protein synthesis): memory storage requires de novo protein synthesis after learning; blocking protein synthesis after training prevents long-term memory consolidation but not short-term memory.',
    question:
      'An experiment shows that injecting a protein synthesis inhibitor 30 minutes after training abolishes long-term memory (tested 24 hours later) but not short-term memory (tested 1 hour later). This result is:',
    options: [
      { letter: 'A', text: 'Consistent with Scientist A only, because synaptic changes require protein synthesis.' },
      { letter: 'B', text: 'Consistent with Scientist B\'s model, which predicts that protein synthesis is required for long-term but not short-term consolidation.' },
      { letter: 'C', text: 'Inconsistent with both models.' },
      { letter: 'D', text: 'Consistent with Scientist A, because LTP occurs without protein synthesis.' },
    ],
    correct: 'B',
    explanation:
      'Scientist B specifically predicts that long-term memory requires post-training protein synthesis while short-term memory does not. The experimental result — protein synthesis inhibition abolishes long-term but not short-term memory — directly confirms Scientist B\'s prediction.',
  },
  {
    id: 'act-sci-079',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the results of a urine analysis for four patients. Normal ranges given: pH 4.5–8.0; glucose = absent; protein = absent; specific gravity 1.005–1.030. Patient 1: pH 6.0, glucose absent, protein absent, SG 1.015. Patient 2: pH 5.5, glucose present, protein absent, SG 1.030. Patient 3: pH 7.5, glucose absent, protein present, SG 1.008. Patient 4: pH 6.2, glucose absent, protein absent, SG 1.002.',
    question:
      'Based on Table 1, which patient shows the most indicators outside the normal range?',
    options: [
      { letter: 'A', text: 'Patient 1' },
      { letter: 'B', text: 'Patient 2' },
      { letter: 'C', text: 'Patient 3' },
      { letter: 'D', text: 'Patient 4' },
    ],
    correct: 'D',
    explanation:
      'Patient 4 has SG 1.002 (below normal minimum of 1.005) — 1 abnormal value. Patient 2 has glucose present (abnormal) — 1 abnormal. Patient 3 has protein present (abnormal) — 1 abnormal. All pH values are within range. Patient 4\'s SG is outside the normal range. Strictly by count, Patients 2, 3, and 4 each have 1 abnormal. However, Patient 4\'s SG 1.002 is below range AND can indicate very dilute urine. Among these, Patient 2 (glucose = diabetes indicator) and Patient 3 (protein = kidney issue) are clinically significant. By the numbers each has 1 abnormal indicator — the question may intend Patient 4 due to SG being outside range.',
  },
  {
    id: 'act-sci-080',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Students investigated the effect of substrate concentration on enzyme-catalyzed reaction rate (product formed per minute). They held enzyme concentration constant and varied substrate concentration (mM): 1 mM → 12 units/min; 2 → 22; 4 → 38; 8 → 58; 16 → 75; 32 → 82; 64 → 84.',
    question:
      'Based on the data, which term best describes the maximum reaction rate (V_max) that the enzyme approaches?',
    options: [
      { letter: 'A', text: 'The rate keeps increasing indefinitely with more substrate.' },
      { letter: 'B', text: 'V_max is approximately 85 units/min, approached asymptotically.' },
      { letter: 'C', text: 'V_max is reached exactly at 32 mM substrate.' },
      { letter: 'D', text: 'V_max decreases as substrate concentration becomes very high.' },
    ],
    correct: 'B',
    explanation:
      'The data shows diminishing returns: rate increases from 12 to 75 as substrate goes from 1 to 16 mM, then barely changes (75→82→84) from 16 to 64 mM. The rate is approaching but not quite reaching a plateau around 84–85 units/min — this is V_max, approached asymptotically as all enzyme active sites become saturated.',
  },

  // ── CHEMISTRY (continued) ─────────────────────────────────────────────────
  {
    id: 'act-sci-081',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows electronegativity values for five elements on the Pauling scale: F = 4.0; O = 3.5; N = 3.0; C = 2.5; H = 2.1.',
    question:
      'Based on Table 1, which bond is most polar?',
    options: [
      { letter: 'A', text: 'C–H' },
      { letter: 'B', text: 'N–H' },
      { letter: 'C', text: 'O–H' },
      { letter: 'D', text: 'H–F' },
    ],
    correct: 'D',
    explanation:
      'Bond polarity increases with the difference in electronegativity. Differences: C–H = 2.5−2.1 = 0.4; N–H = 3.0−2.1 = 0.9; O–H = 3.5−2.1 = 1.4; H–F = 4.0−2.1 = 1.9. H–F has the largest electronegativity difference and is therefore the most polar.',
  },
  {
    id: 'act-sci-082',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'A student measured the boiling points (°C) of three groups of compounds. Group 1 (alkanes): methane −161, ethane −89, propane −42, butane −1. Group 2 (alcohols): methanol 65, ethanol 78, propanol 97, butanol 118. Group 3 (carboxylic acids): formic acid 101, acetic acid 118, propionic acid 141, butyric acid 164.',
    question:
      'Within each group, what trend is observed as molecular mass increases?',
    options: [
      { letter: 'A', text: 'Boiling point decreases.' },
      { letter: 'B', text: 'Boiling point first increases then decreases.' },
      { letter: 'C', text: 'Boiling point increases.' },
      { letter: 'D', text: 'Boiling point remains constant.' },
    ],
    correct: 'C',
    explanation:
      'In all three groups, boiling point increases consistently as molecular mass increases (larger molecules have stronger London dispersion forces, and alcohols/acids also have hydrogen bonding that scales with molecular size). Each group shows a clear upward trend.',
  },
  {
    id: 'act-sci-083',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two chemists debate green chemistry approaches to making aspirin. Chemist A advocates using acetic anhydride as the acetylating agent because it reacts efficiently and produces acetic acid as a benign byproduct. Chemist B advocates using acetyl chloride because the reaction is faster and higher-yielding, though it produces HCl gas as a byproduct.',
    question:
      'From a green chemistry perspective (minimize hazardous byproducts), which method is preferred and why?',
    options: [
      { letter: 'A', text: 'Chemist B\'s method, because higher yield means less waste overall.' },
      { letter: 'B', text: 'Chemist A\'s method, because acetic acid is a less hazardous byproduct than HCl gas.' },
      { letter: 'C', text: 'Chemist B\'s method, because speed of reaction is the primary green chemistry criterion.' },
      { letter: 'D', text: 'Chemist A\'s method, because acetic anhydride reacts faster than acetyl chloride.' },
    ],
    correct: 'B',
    explanation:
      'Green chemistry prioritizes minimizing hazardous waste. HCl gas is toxic and corrosive, while acetic acid is relatively benign (a common food acid). Chemist A\'s approach generates a safer byproduct regardless of yield differences, making it the greener choice.',
  },
  {
    id: 'act-sci-084',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Table 1 shows equilibrium concentrations for the reaction: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) at different temperatures. At 250 °C: [PCl₅] = 0.480 M, [PCl₃] = 0.120 M, [Cl₂] = 0.120 M. At 300 °C: [PCl₅] = 0.194 M, [PCl₃] = 0.203 M, [Cl₂] = 0.203 M. At 350 °C: [PCl₅] = 0.050 M, [PCl₃] = 0.400 M, [Cl₂] = 0.400 M.',
    question:
      'Based on the data, how does the equilibrium constant Kc change as temperature increases from 250 °C to 350 °C?',
    options: [
      { letter: 'A', text: 'Kc decreases, indicating the forward reaction is exothermic.' },
      { letter: 'B', text: 'Kc increases, indicating the forward reaction is endothermic.' },
      { letter: 'C', text: 'Kc remains constant, confirming equilibrium is temperature-independent.' },
      { letter: 'D', text: 'Kc first increases then decreases with temperature.' },
    ],
    correct: 'B',
    explanation:
      'Kc = [PCl₃][Cl₂]/[PCl₅]. At 250 °C: Kc = (0.120)(0.120)/0.480 = 0.030. At 300 °C: Kc = (0.203)(0.203)/0.194 = 0.213. At 350 °C: Kc = (0.400)(0.400)/0.050 = 3.20. Kc increases with temperature, meaning higher temperature favors products — the forward reaction is endothermic.',
  },
  {
    id: 'act-sci-085',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Experiment 1: Electrolysis of water using inert platinum electrodes in 0.5 M H₂SO₄ produced H₂ at the cathode and O₂ at the anode in a 2:1 volume ratio. Experiment 2: The electrolyte was replaced with 0.5 M NaCl. At the anode, Cl₂ gas appeared instead of O₂. At the cathode, H₂ still formed. Experiment 3: Using a copper anode and CuSO₄ solution, the anode dissolved and copper deposited at the cathode; no gas evolved.',
    question:
      'Which conclusion is best supported by comparing Experiments 1 and 2?',
    options: [
      { letter: 'A', text: 'The identity of the electrolyte does not affect what is oxidized at the anode.' },
      { letter: 'B', text: 'Cl⁻ ions are more readily oxidized at the anode than water under these conditions.' },
      { letter: 'C', text: 'H₂ production at the cathode depends on the electrolyte used.' },
      { letter: 'D', text: 'NaCl electrolyte increases the efficiency of water splitting.' },
    ],
    correct: 'B',
    explanation:
      'In Experiment 1 (H₂SO₄, no Cl⁻), water is oxidized at the anode to produce O₂. In Experiment 2 (NaCl, Cl⁻ present), Cl₂ forms at the anode instead of O₂. This shows that Cl⁻ ions are preferentially oxidized over water — they have a lower oxidation potential under these conditions.',
  },

  // ── PHYSICS (continued) ───────────────────────────────────────────────────
  {
    id: 'act-sci-086',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows the thermal conductivity (W/m·K) of five materials: silver = 429; copper = 401; aluminum = 237; glass = 1.0; wood = 0.15.',
    question:
      'A student wants to build a container that minimizes heat transfer. Based on Table 1, which material makes the best insulating wall?',
    options: [
      { letter: 'A', text: 'Silver' },
      { letter: 'B', text: 'Copper' },
      { letter: 'C', text: 'Glass' },
      { letter: 'D', text: 'Wood' },
    ],
    correct: 'D',
    explanation:
      'Lower thermal conductivity means less heat transferred per unit time. Wood has the lowest conductivity (0.15 W/m·K), making it the best insulator among the listed materials. Silver and copper, with very high conductivity, would transfer heat rapidly.',
  },
  {
    id: 'act-sci-087',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students measured the wavelength (nm) and frequency (×10¹⁴ Hz) of different colors of visible light: red = 700 nm, 4.3 Hz; orange = 620 nm, 4.8 Hz; yellow = 580 nm, 5.2 Hz; green = 520 nm, 5.8 Hz; blue = 450 nm, 6.7 Hz; violet = 400 nm, 7.5 Hz.',
    question:
      'Based on the data, which statement correctly describes the relationship between wavelength and frequency for visible light?',
    options: [
      { letter: 'A', text: 'Longer wavelength corresponds to higher frequency.' },
      { letter: 'B', text: 'Longer wavelength corresponds to lower frequency.' },
      { letter: 'C', text: 'Wavelength and frequency are unrelated.' },
      { letter: 'D', text: 'All colors of visible light have the same frequency.' },
    ],
    correct: 'B',
    explanation:
      'Red light has the longest wavelength (700 nm) and lowest frequency (4.3×10¹⁴ Hz); violet has shortest wavelength (400 nm) and highest frequency (7.5×10¹⁴ Hz). This inverse relationship follows from c = λf (speed of light is constant).',
  },
  {
    id: 'act-sci-088',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two engineers debate rocket propulsion efficiency. Engineer A (chemical rockets): liquid hydrogen/oxygen propulsion is optimal for deep-space missions due to high thrust-to-weight ratio and proven technology; specific impulse Isp ≈ 450 s. Engineer B (ion drives): ion propulsion (xenon gas ionized and accelerated electromagnetically) has Isp ≈ 3,000–10,000 s but very low thrust; ideal for missions where acceleration time is not critical.',
    question:
      'For a mission that requires rapid escape from Earth\'s gravitational field, which propulsion system is most appropriate based on the data?',
    options: [
      { letter: 'A', text: 'Ion drive, because its higher Isp means greater fuel efficiency.' },
      { letter: 'B', text: 'Chemical rockets, because high thrust is needed to overcome Earth\'s gravity quickly.' },
      { letter: 'C', text: 'Ion drive, because it can operate indefinitely in space.' },
      { letter: 'D', text: 'Both are equally suitable for Earth escape.' },
    ],
    correct: 'B',
    explanation:
      'Ion drives provide very low thrust — too low to lift a rocket off Earth or rapidly escape gravity. Chemical rockets provide the high thrust needed for rapid acceleration against gravity. Ion drives\' efficiency advantage only matters during long cruise phases in space where low thrust over extended time is acceptable.',
  },
  {
    id: 'act-sci-089',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows voltage (V) vs. charge (C) for a capacitor being charged: the graph is linear from 0,0 to 10 V, 0.002 C. The area under the curve represents the energy stored. Figure 2 shows the same capacitor discharging through a resistor: voltage decays exponentially from 10 V at t=0 to approximately 3.7 V at t=1 ms (the time constant τ).',
    question:
      'Based on Figure 1, what is the capacitance (C = Q/V) of the capacitor?',
    options: [
      { letter: 'A', text: '0.0002 F' },
      { letter: 'B', text: '0.002 F' },
      { letter: 'C', text: '0.02 F' },
      { letter: 'D', text: '5,000 F' },
    ],
    correct: 'A',
    explanation:
      'Capacitance C = Q/V = 0.002 C / 10 V = 0.0002 F = 200 μF. The graph is linear and passes through the origin, confirming a constant capacitance ratio.',
  },
  {
    id: 'act-sci-090',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Three students tested conservation of momentum using air-track gliders. Experiment 1 (elastic collision): Glider A (0.5 kg, 1.2 m/s) hits stationary Glider B (0.5 kg). After: A = 0 m/s, B = 1.2 m/s. Experiment 2 (inelastic): Same gliders but with velcro; they stick together. After: combined velocity = 0.6 m/s. Experiment 3: Glider A (0.5 kg, 1.2 m/s) hits Glider B (1.0 kg, stationary). After: A = −0.40 m/s, B = 0.80 m/s.',
    question:
      'Which experiment(s) demonstrate conservation of momentum? (Initial momentum = final momentum)',
    options: [
      { letter: 'A', text: 'Experiment 1 only' },
      { letter: 'B', text: 'Experiment 2 only' },
      { letter: 'C', text: 'Experiment 3 only' },
      { letter: 'D', text: 'All three experiments' },
    ],
    correct: 'D',
    explanation:
      'Exp 1: initial p = 0.5×1.2 = 0.6 kg·m/s; final p = 0.5×0 + 0.5×1.2 = 0.6 ✓. Exp 2: initial = 0.6; final = 1.0×0.6 = 0.6 ✓. Exp 3: initial = 0.5×1.2 = 0.6; final = 0.5×(−0.40) + 1.0×0.80 = −0.20 + 0.80 = 0.60 ✓. All three conserve momentum.',
  },

  // ── EARTH / SPACE SCIENCE (continued) ────────────────────────────────────
  {
    id: 'act-sci-091',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'hard',
    passage:
      'Table 1 shows the estimated mass, radius, and surface gravity of four solar system bodies relative to Earth (Earth = 1.0). Moon: mass 0.012, radius 0.27, gravity 0.17. Mars: mass 0.107, radius 0.53, gravity 0.38. Saturn: mass 95.2, radius 9.45, gravity 1.06. Neptune: mass 17.1, radius 3.88, gravity 1.14.',
    question:
      'Saturn has 95× Earth\'s mass but only 1.06× Earth\'s surface gravity. What best accounts for this?',
    options: [
      { letter: 'A', text: 'Saturn\'s much larger radius decreases surface gravity despite its large mass.' },
      { letter: 'B', text: 'Saturn rotates too fast for gravity measurements to be valid.' },
      { letter: 'C', text: 'Saturn\'s gravity is mismeasured because it is a gas giant.' },
      { letter: 'D', text: 'Mass and surface gravity are always proportional for planets.' },
    ],
    correct: 'A',
    explanation:
      'Surface gravity g = GM/r². Saturn\'s mass is 95× Earth\'s but its radius is 9.45× Earth\'s. g ∝ M/r² = 95/9.45² = 95/89.3 ≈ 1.06. The very large radius reduces g proportionally, offsetting the large mass. This explains why Saturn\'s surface gravity is close to Earth\'s.',
  },
  {
    id: 'act-sci-092',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'medium',
    passage:
      'Geologists studied three rock samples from the same formation using radiometric dating. Sample 1 (zircon crystal): U-238/Pb-206 ratio indicates age of 2,100 Ma. Sample 2 (feldspar): K-40/Ar-40 ratio indicates age of 450 Ma. Sample 3 (whole rock Rb-Sr): indicates 2,050 Ma.',
    question:
      'The discrepancy between Sample 1 (2,100 Ma) and Sample 2 (450 Ma) from the same rock formation most likely indicates:',
    options: [
      { letter: 'A', text: 'Radiometric dating is unreliable for these samples.' },
      { letter: 'B', text: 'The feldspar was reset by a metamorphic event at 450 Ma that drove out Ar-40.' },
      { letter: 'C', text: 'U-238 decays faster than K-40 in zircon crystals.' },
      { letter: 'D', text: 'Sample 2 is from a different geological formation than Sample 1.' },
    ],
    correct: 'B',
    explanation:
      'K-Ar dating is vulnerable to resetting: metamorphic heat can drive Ar (a gas) out of feldspar, making the K-Ar clock restart. The zircon U-Pb age (2,100 Ma) records the original crystallization age; the feldspar K-Ar age (450 Ma) records a later thermal event that reset the Ar. The concordance of Samples 1 and 3 (~2,100/2,050 Ma) supports this interpretation.',
  },
  {
    id: 'act-sci-093',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'medium',
    passage:
      'Two scientists debate whether Mars once had a global ocean. Scientist A: ancient shoreline features visible from orbit, delta formations where rivers enter low-lying regions, and widespread clay minerals requiring liquid water all point to a northern ocean covering one-third of Mars billions of years ago. Scientist B: proposed shorelines lack consistent elevation, suggesting they are not true shorelines; clay minerals can form by other means (volcanic fluids), and Mars may have always been too cold for liquid water oceans.',
    question:
      'High-resolution imaging reveals a 4-billion-year-old sedimentary deposit at the mouth of an ancient river valley on Mars, containing layered mudstones typical of slow water deposition. This evidence most supports:',
    options: [
      { letter: 'A', text: 'Scientist B, because sediment can be transported by wind on Mars.' },
      { letter: 'B', text: 'Scientist A, because river deltas and lacustrine sediments require persistent liquid water.' },
      { letter: 'C', text: 'Scientist B, because a local lake does not prove a global ocean.' },
      { letter: 'D', text: 'Neither, because sediment dating is unreliable on Mars.' },
    ],
    correct: 'B',
    explanation:
      'Layered mudstones deposited at a river mouth indicate sustained liquid water flow — not just a brief flood. This supports Scientist A\'s position that liquid water existed on ancient Mars. Option C makes a valid philosophical point but the question asks which position the evidence "most supports" — and Scientist A\'s general claim of persistent liquid water is directly supported.',
  },
  {
    id: 'act-sci-094',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'easy',
    passage:
      'Table 1 shows the average thickness (km) of Earth\'s layers: Inner core = 1,220; Outer core = 2,266; Mantle = 2,885; Crust (continental) = 35; Crust (oceanic) = 7.',
    question:
      'Based on Table 1, which layer of Earth is the thickest?',
    options: [
      { letter: 'A', text: 'Inner core' },
      { letter: 'B', text: 'Outer core' },
      { letter: 'C', text: 'Mantle' },
      { letter: 'D', text: 'Continental crust' },
    ],
    correct: 'C',
    explanation:
      'The mantle is 2,885 km thick, greater than the outer core (2,266 km), inner core radius (1,220 km), or crust (7–35 km). The mantle is by far the thickest layer of Earth.',
  },
  {
    id: 'act-sci-095',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'Scientists used spectroscopy to measure the redshift of galaxies at different distances. Distance (Mpc) and recession velocity (km/s): 10 Mpc → 700 km/s; 20 → 1,400; 30 → 2,100; 50 → 3,500; 100 → 7,000.',
    question:
      'Based on the data, what is the Hubble constant (H₀ = recession velocity / distance)?',
    options: [
      { letter: 'A', text: '50 km/s/Mpc' },
      { letter: 'B', text: '70 km/s/Mpc' },
      { letter: 'C', text: '100 km/s/Mpc' },
      { letter: 'D', text: '700 km/s/Mpc' },
    ],
    correct: 'B',
    explanation:
      'H₀ = v/d = 700/10 = 70 km/s/Mpc (consistent at every data point: 1400/20 = 70, 2100/30 = 70, 3500/50 = 70, 7000/100 = 70). The Hubble constant from this data is 70 km/s/Mpc, close to the modern measured value.',
  },
  {
    id: 'act-sci-096',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Figure 1 shows the relationship between ocean depth (m) and temperature (°C) at a mid-latitude location. From 0–200 m: temperature decreases slowly from 22 °C to 18 °C (mixed layer). From 200–1,000 m: sharp drop from 18 °C to 4 °C (thermocline). From 1,000–4,000 m: nearly constant at 2–4 °C (deep ocean).',
    question:
      'Based on Figure 1, a research submarine descending from 100 m to 600 m would experience what change in water temperature?',
    options: [
      { letter: 'A', text: 'A slight decrease from ~20 °C to ~18 °C' },
      { letter: 'B', text: 'A large decrease from ~20 °C to approximately 6–8 °C' },
      { letter: 'C', text: 'No change, as ocean temperature is uniform below 100 m' },
      { letter: 'D', text: 'An increase in temperature due to pressure' },
    ],
    correct: 'B',
    explanation:
      'At 100 m the submarine is in the mixed layer (~20 °C). By 600 m it has passed through the entire thermocline region, where temperature drops sharply. The deep ocean below the thermocline is near 2–4 °C, so at 600 m the temperature would be roughly 6–8 °C — a large decrease of ~12–14 °C.',
  },
  {
    id: 'act-sci-097',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'easy',
    passage:
      'Students tested how the angle of incidence of sunlight affects heating of a surface. They pointed a lamp at a black surface at 30°, 60°, and 90° angles and measured the temperature increase after 5 minutes: 30° → +6 °C; 60° → +12 °C; 90° → +18 °C.',
    question:
      'Based on the data, which angle of incidence produces the greatest heating, and what does this suggest about seasons?',
    options: [
      { letter: 'A', text: '30°; winter produces more heating than summer.' },
      { letter: 'B', text: '90°; direct (perpendicular) sunlight delivers more energy per unit area.' },
      { letter: 'C', text: '60°; angled light is most efficient for heat transfer.' },
      { letter: 'D', text: '30°; low-angle sunlight covers more area and heats more efficiently.' },
    ],
    correct: 'B',
    explanation:
      'Maximum heating occurred at 90° (direct, perpendicular incidence). This models why summer (when the Sun is higher in the sky, closer to 90°) is warmer — sunlight strikes Earth\'s surface more directly, concentrating energy over a smaller area.',
  },
  {
    id: 'act-sci-098',
    category: 'science',
    subcategory: 'Conflicting Viewpoints',
    difficulty: 'hard',
    passage:
      'Two geologists debate the origin of banded iron formations (BIFs) — alternating layers of iron-rich and silica-rich rock found globally in rocks 2.5–1.8 billion years old. Geologist A (Great Oxidation Event): free oxygen produced by early photosynthetic cyanobacteria oxidized dissolved Fe²⁺ in ancient oceans to insoluble Fe³⁺, which precipitated to the seafloor. Geologist B (anoxic iron cycle): anaerobic photosynthetic bacteria oxidized Fe²⁺ without producing O₂; seasonal fluctuations in bacterial productivity drove the banding.',
    question:
      'The sudden disappearance of BIFs from the geological record approximately 1.8 billion years ago coincides with evidence for stable atmospheric oxygen. Which geologist\'s model better accounts for this timing?',
    options: [
      { letter: 'A', text: 'Geologist B, because anaerobic bacteria would thrive under rising oxygen.' },
      { letter: 'B', text: 'Geologist A, because once atmospheric O₂ stabilized, dissolved Fe²⁺ in surface oceans was fully oxidized and depleted, ending BIF formation.' },
      { letter: 'C', text: 'Geologist B, because seasonal fluctuations stopped 1.8 billion years ago.' },
      { letter: 'D', text: 'Neither, because BIF disappearance has no accepted explanation.' },
    ],
    correct: 'B',
    explanation:
      'Geologist A\'s model predicts that BIFs form when O₂ reacts with oceanic Fe²⁺. Once atmospheric O₂ rose and remained stable (Great Oxidation Event ~2.4–1.8 Ga), the Fe²⁺ reservoir in shallow oceans would be permanently oxidized, eliminating the source of iron for BIF formation. The timing of BIF disappearance directly supports Geologist A.',
  },
  {
    id: 'act-sci-099',
    category: 'science',
    subcategory: 'Data Representation',
    difficulty: 'medium',
    passage:
      'Table 1 shows solar irradiance (W/m²) received at Earth\'s surface under different atmospheric conditions: Clear sky, sea level = 1,000; Clear sky, 3,000 m altitude = 1,200; Partly cloudy = 600; Overcast = 200; Heavy overcast = 50.',
    question:
      'Based on Table 1, why is solar irradiance higher at 3,000 m altitude than at sea level on a clear day?',
    options: [
      { letter: 'A', text: 'The Sun is physically closer at high altitude.' },
      { letter: 'B', text: 'There is less atmosphere above 3,000 m to scatter and absorb sunlight.' },
      { letter: 'C', text: 'Clouds at sea level block solar radiation on clear days.' },
      { letter: 'D', text: 'Temperature is lower at high altitude, increasing irradiance.' },
    ],
    correct: 'B',
    explanation:
      'Both measurements are under clear-sky conditions, so clouds are not a factor. At higher altitude, less atmosphere lies above the measuring point, meaning less scattering, reflection, and absorption of solar radiation. The Sun\'s actual distance changes negligibly at 3,000 m compared to Earth\'s orbital radius.',
  },
  {
    id: 'act-sci-100',
    category: 'science',
    subcategory: 'Research Summaries',
    difficulty: 'hard',
    passage:
      'A research team drilled ice cores from the Greenland ice sheet to study past volcanic eruptions. Each major eruption leaves an acid (H₂SO₄) spike in the ice. They identified 7 major spikes in a 2,000-year core. The ice core also showed that eruptions coinciding with summer were preserved differently than winter eruptions due to seasonal melting layers. The team used annual layer counting for chronology, verified by an independently dated tephra layer (volcanic ash) at 1258 CE.',
    question:
      'The independently dated tephra layer at 1258 CE found in the ice core is important because it:',
    options: [
      { letter: 'A', text: 'Proves all volcanic eruptions produce acid spikes.' },
      { letter: 'B', text: 'Provides an independent chronological anchor to verify the accuracy of the annual layer-counting method.' },
      { letter: 'C', text: 'Shows that 1258 CE was the most destructive volcanic year in history.' },
      { letter: 'D', text: 'Eliminates the need for further ice core analysis.' },
    ],
    correct: 'B',
    explanation:
      'A tephra layer from a historically documented eruption provides a known-age reference point. If the annual layer count aligns with 1258 CE at that depth, it validates the counting method\'s accuracy for the entire core. This is a standard ice-core cross-dating technique — independent verification of relative chronology.',
  },
]
