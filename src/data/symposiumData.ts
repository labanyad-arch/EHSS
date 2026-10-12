export interface SubTheme {
  id: string;
  number: string;
  title: string;
  description: string;
  keywords: string[];
  trackCode: string;
  iconName: 'archive' | 'lightbulb' | 'network' | 'leaf';
}

export interface KeynoteSpeaker {
  id: string;
  plenaryLabel: string;
  date: string;
  time: string;
  venue: string;
  name: string;
  credentials: string;
  lectureTitle: string;
  abstractSummary: string;
  fullBio: string;
  portraitUrl: string;
  trackAlignment: string;
}

export interface AcceptedPaper {
  id: string;
  refCode: string;
  panelId: 'panel-02' | 'panel-14-15';
  panelLabel: string;
  title: string;
  abstract: string;
  extendedSummary: string;
  methodology: string;
  author: string;
  affiliation: string;
  categoryTag: string;
  isFeaturedFullWidth?: boolean;
  badgeLabel?: string;
  statusText?: string;
  presentationSlot: string;
  keywords: string[];
  apaCitation: string;
}

export interface PanelInfo {
  id: 'panel-02' | 'panel-14-15';
  badge: string;
  title: string;
  scheduleText: string;
  paperCountLabel: string;
  trackLeadBadge: string;
  sessionChair: string;
}

export interface SymposiumTrackOverview {
  id: string;
  code: string;
  title: string;
  leadFaculty: string;
  summary: string;
  papersAccepted: number;
  panelsCount: number;
  isCurrent?: boolean;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  department: string;
  institution: string;
  researchArea: string;
}

export const HERO_LAB_IMAGE = '/src/assets/images/hero_digital_archive_lab_1791813304363.jpg';
export const AVISHEK_PORTRAIT = '/src/assets/images/portrait_avishek_parui_1791813316208.jpg';
export const GIRISH_PORTRAIT = '/src/assets/images/portrait_girish_jha_1791813329609.jpg';

export const SUB_THEMES: SubTheme[] = [
  {
    id: 'thematic-01',
    number: 'THEMATIC AREA 01',
    title: 'Epistemic Archiving & Indic Corpora',
    description:
      'Digital preservation of vernacular cultural memories, computational lexicography for Sanskrit and Prakrit, and reclaiming subaltern counter-archives against colonial cataloging schema.',
    keywords: ['Indic Knowledge Systems', 'Ramayana Memory', 'Digital Vernaculars'],
    trackCode: 'Track 02',
    iconName: 'archive',
  },
  {
    id: 'thematic-02',
    number: 'THEMATIC AREA 02',
    title: 'Algorithmic Society, Media & Affect',
    description:
      'Critical interrogations of algorithmic bias, digital capitalism, platformed surveillance, pink-tax semiotics, gaming psychology, and posthuman subjective alienation in post-industrial India.',
    keywords: ['Platform Capitalism', 'Derived Dystopias', 'Karukku Counter-Publics'],
    trackCode: 'Track 02',
    iconName: 'lightbulb',
  },
  {
    id: 'thematic-03',
    number: 'THEMATIC AREA 03',
    title: 'Inclusive Pedagogy & Litscape Observatories',
    description:
      'AI-assisted learning ecosystems, neuro-inclusive digital English language pedagogy, and empowering rural social workers through human-centric computational intervention.',
    keywords: ['Litscape India', 'Social Work Praxes', 'Inclusive Education'],
    trackCode: 'Track 03',
    iconName: 'network',
  },
  {
    id: 'thematic-04',
    number: 'THEMATIC AREA 04',
    title: 'Digital Carbon Footprints & Ecological Costs',
    description:
      'Ecocritical examinations into server infrastructure, cloud energy expenditure, campus carbon accountability, and revitalizing Vedic conceptions of cosmic order (Rta) in digital modernity.',
    keywords: ['Digital Carbon Metrics', 'E-Waste Ecology', 'Vedic Rta Equilibrium'],
    trackCode: 'Track 03',
    iconName: 'leaf',
  },
];

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'keynote-parui',
    plenaryLabel: 'Plenary Lecture I • Day 1',
    date: '9th Oct 2026',
    time: '10:00 – 11:15 IST',
    venue: 'Main Auditorium, Dept. of HSS, IIT Roorkee',
    name: 'Dr. Avishek Parui',
    credentials:
      'Associate Professor, Department of HSS, IIT Madras • Associate Fellow, Higher Education Academy (UK)',
    lectureTitle:
      '“Memory Studies, Medical Humanities & Critical Theory: Prosthetic Recall in Algorithmic Times”',
    abstractSummary:
      'Engaging biocultural embodiment, digital memorialization, and the affective mechanics of prosthetic remembering in post-humanist literary landscapes.',
    fullBio:
      'Dr. Avishek Parui researches at the intersections of memory studies, medical humanities, cognitive literary theory, and digital culture at IIT Madras. He is a Principal Investigator at the Centre for Memory Studies and serves on editorial boards of international humanities journals.',
    portraitUrl: AVISHEK_PORTRAIT,
    trackAlignment: 'Track 02 Ontological Anchor',
  },
  {
    id: 'keynote-jha',
    plenaryLabel: 'Plenary Lecture II • Day 2',
    date: '10th Oct 2026',
    time: '09:30 – 10:45 IST',
    venue: 'Conference Complex II, IIT Roorkee',
    name: 'Prof. Girish Nath Jha',
    credentials:
      'Professor of Computational Linguistics, School of Sanskrit & Indic Studies, JNU New Delhi • Chairman, CSTT',
    lectureTitle:
      '“Computational Lexicography, Indic Corpora & Multilingual Sovereign AI Architectures”',
    abstractSummary:
      'Charting structural ontologies for Sanskrit and regional Indian languages to bridge heritage manuscripts with ethical open-access neural infrastructures.',
    fullBio:
      'Prof. Girish Nath Jha leads pioneering national initiatives in Sanskrit computational linguistics, digital corpora annotation, and scientific terminology standardization across Indian universities.',
    portraitUrl: GIRISH_PORTRAIT,
    trackAlignment: 'Track 02 & 03 Joint Plenary',
  },
];

export const PANELS: PanelInfo[] = [
  {
    id: 'panel-02',
    badge: 'Panel 02',
    title: 'Digitalization, Education and Sustainable Social Practice',
    scheduleText: 'Day 1: Friday, 9th October 2026 • 14:30 – 16:30 IST • Seminar Hall A (HSS)',
    paperCountLabel: '5 Peer-Reviewed Papers',
    trackLeadBadge: 'Track 03 Lead',
    sessionChair: 'Prof. Smita Jha & Dr. Anita Yadav',
  },
  {
    id: 'panel-14-15',
    badge: 'Panel 14 & 15',
    title: 'Digital Humanities: New Forms of Narrative & Algorithmic Computation',
    scheduleText: 'Day 2: Saturday, 10th October 2026 • 11:30 – 13:30 IST • Conference Complex II',
    paperCountLabel: '5 Peer-Reviewed Papers',
    trackLeadBadge: 'Track 02 Lead',
    sessionChair: 'Dr. Avishek Parui & Prof. Girish Nath Jha',
  },
];

export const ACCEPTED_PAPERS: AcceptedPaper[] = [
  {
    id: 'ehss-p02-01',
    refCode: 'EHSS-P02-01',
    panelId: 'panel-02',
    panelLabel: 'Panel 02 (Education & Society)',
    title: 'From Digitisation to Digitalisation: The Future of Social Work as a Human-Centric Practice in India',
    abstract:
      'A critical assessment of human-centered social work praxes transitioning to digital platforms, assessing data privacy, frontline dignity, and rural accessibility in North Indian districts.',
    extendedSummary:
      'While state welfare delivery has rapidly digitized through biometric and portal-driven architectures, frontline social work risks losing its empathetic, relational core. Drawing on 14 months of ethnographic fieldwork across six developmental blocks in North India, this study proposes a human-centric digitalisation framework that preserves agency and informed consent for marginalized beneficiaries.',
    methodology: 'Multi-sited Ethnography & Participatory Action Research (n = 184 field workers)',
    author: 'Ved Vriti',
    affiliation: 'Department of Social Work, University of Delhi',
    categoryTag: 'Social Work Praxes',
    presentationSlot: 'Day 1 • 14:35 – 14:55 IST',
    keywords: ['Social Work Praxes', 'Digital Welfare', 'Frontline Ethics', 'Rural Accessibility'],
    apaCitation:
      'Vriti, V. (2026). From digitisation to digitalisation: The future of social work as a human-centric practice in India. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 42–58). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p02-02',
    refCode: 'EHSS-P02-02',
    panelId: 'panel-02',
    panelLabel: 'Panel 02 (Education & Society)',
    title: 'Remembering the Forgotten: Literary Memory and Digital Visibility in Tiffany D. Jackson’s Monday’s Not Coming',
    abstract:
      'Interrogating digital publics, archival erasure, and marginalized visibility metrics in contemporary young-adult narrative structures.',
    extendedSummary:
      'This paper examines how algorithmic attention economies amplify certain traumas while rendering neurodivergent and racialized adolescents invisible. Through a close reading of Tiffany D. Jackson’s Monday’s Not Coming alongside hashtag counter-publics, the research demonstrates how literary memory serves as an ethical corrective to digital amnesia.',
    methodology: 'Critical Discourse Analysis & Digital Paratextual Archiving',
    author: 'Vanniar Evelyn',
    affiliation: 'Pandit Deendayal Energy University (PDEU), Gandhinagar',
    categoryTag: 'Digital Visibility',
    presentationSlot: 'Day 1 • 14:55 – 15:15 IST',
    keywords: ['Digital Visibility', 'Literary Memory', 'Archival Erasure', 'Counter-Publics'],
    apaCitation:
      'Evelyn, V. (2026). Remembering the forgotten: Literary memory and digital visibility in Tiffany D. Jackson’s Monday’s Not Coming. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 59–73). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p02-03',
    refCode: 'EHSS-P02-03',
    panelId: 'panel-02',
    panelLabel: 'Panel 02 (Education & Society)',
    title: 'Litscape India: Reconceptualising HSS Curricula through an AI-Enabled Digital Ecosystem',
    abstract:
      'Proposing an ontological paradigm for integrating large language modeling and digital literary cartographies into Indian higher education curricula.',
    extendedSummary:
      'Litscape India introduces a bilingual digital observatory designed for undergraduate and postgraduate humanities classrooms. By combining spatial literary mapping of regional Indian texts with guided semantic annotation, the platform enables students to critically audit AI outputs while building vernacular digital literacy.',
    methodology: 'Design-Based Implementation Research & Curriculum Prototyping',
    author: 'Dr. Shweta Tiwari',
    affiliation: 'Faculty of Humanities, SGT University, Gurugram',
    categoryTag: 'AI Curricula',
    presentationSlot: 'Day 1 • 15:15 – 15:35 IST',
    keywords: ['Litscape India', 'AI Curricula', 'Literary Cartography', 'Higher Education'],
    apaCitation:
      'Tiwari, S. (2026). Litscape India: Reconceptualising HSS curricula through an AI-enabled digital ecosystem. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 74–91). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p02-04',
    refCode: 'EHSS-P02-04',
    panelId: 'panel-02',
    panelLabel: 'Panel 02 (Education & Society)',
    title: 'Towards a Sustainable World through a Sustainable Campus: An Ecocritical Enquiry into Digital Carbon Footprints',
    abstract:
      'Empirical carbon audit of university campus high-performance cloud clusters, e-learning data centers, and digital curriculum infrastructures.',
    extendedSummary:
      'Challenging the myth of the weightless cloud, this paper conducts a comprehensive lifecycle carbon assessment of university digital infrastructures. Integrating empirical server telemetry with Vedic ecocritical frameworks of Rta (cosmic ecological balance), the study outlines actionable institutional procurement and archival retention policies.',
    methodology: 'Empirical Digital Carbon Telemetry & Ecocritical Hermeneutics',
    author: 'Astha Gupta',
    affiliation: 'Chhatrapati Shahu Ji Maharaj University, Kanpur',
    categoryTag: 'Digital Ecology',
    presentationSlot: 'Day 1 • 15:35 – 15:55 IST',
    keywords: ['Digital Carbon Metrics', 'Sustainable Campus', 'E-Waste Ecology', 'Vedic Rta'],
    apaCitation:
      'Gupta, A. (2026). Towards a sustainable world through a sustainable campus: An ecocritical enquiry into digital carbon footprints. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 92–108). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p02-05',
    refCode: 'EHSS-P02-05',
    panelId: 'panel-02',
    panelLabel: 'Panel 02 (Education & Society)',
    title: 'Enhancing Social Transformation Through Inclusive Education, Digital Innovation, and Community Participation',
    abstract:
      'Field report evaluating village-level educational commons across Uttarakhand using blended mobile hubs and hyper-local curriculum adaptation.',
    extendedSummary:
      'Conducted across 22 Himalayan village panchayats in Uttarakhand, this empirical policy research evaluates how solar-powered offline-first digital libraries and Garhwali/Kumaoni audio-visual modules foster neuro-inclusive and gender-equitable community learning.',
    methodology: 'Mixed-Methods Longitudinal Field Evaluation across 22 Panchayats',
    author: 'Dr. Anita Yadav',
    affiliation: 'School of Liberal Arts, Uttaranchal University',
    categoryTag: 'Inclusive Education',
    isFeaturedFullWidth: true,
    badgeLabel: 'Empirical Policy',
    statusText: 'Status: Camera-Ready Confirmed',
    presentationSlot: 'Day 1 • 15:55 – 16:25 IST',
    keywords: ['Inclusive Education', 'Uttarakhand Commons', 'Digital Innovation', 'Empirical Policy'],
    apaCitation:
      'Yadav, A. (2026). Enhancing social transformation through inclusive education, digital innovation, and community participation. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 109–128). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p14-01',
    refCode: 'EHSS-P14-01',
    panelId: 'panel-14-15',
    panelLabel: 'Panel 14/15 (Digital Humanities)',
    title: 'Circulating the Counter-Discourse: (Re)framing Karukku in Digital Publics',
    abstract:
      'Exploring how Bama’s landmark Dalit autobiography is curated, excerpted, and mobilized across contemporary algorithmic micro-blogging and vernacular audio platforms.',
    extendedSummary:
      'Bama’s Karukku inaugurated a radical Tamil Dalit feminist aesthetics upon its print publication. This paper traces the second life of Karukku within contemporary digital counter-publics—analyzing how podcast collectives, Instagram visual essays, and vernacular Wiki projects re-contextualize subaltern testimony against casteist platform moderation.',
    methodology: 'Digital Ethnography & Vernacular Platform Network Analysis',
    author: 'Akshay Kumar',
    affiliation: 'Department of HSS, IIT Roorkee',
    categoryTag: 'Subaltern Publics',
    presentationSlot: 'Day 2 • 11:35 – 11:55 IST',
    keywords: ['Karukku Counter-Publics', 'Subaltern Publics', 'Dalit Digital Archive', 'Vernacular Audio'],
    apaCitation:
      'Kumar, A. (2026). Circulating the counter-discourse: (Re)framing Karukku in digital publics. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 210–225). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p14-02',
    refCode: 'EHSS-P14-02',
    panelId: 'panel-14-15',
    panelLabel: 'Panel 14/15 (Digital Humanities)',
    title: 'Preserving the Civilisational Memory of the Ramayana through Computational Ontologies',
    abstract:
      'Developing semantic web graph models and linguistic entity extractors for spatial and genealogical preservation of epic Ramayana narrative variants.',
    extendedSummary:
      'Drawing upon classical Sanskrit recensions and regional folk retellings, this paper presents an OWL/RDF computational ontology that maps character genealogies, botanical references, and geographical toponyms across 4,200 shlokas, enabling cross-recensional semantic querying.',
    methodology: 'OWL/RDF Knowledge Graph Engineering & Sanskrit Named Entity Recognition',
    author: 'Shashank Tiwari & Prof. Girish Nath Jha',
    affiliation: 'School of Sanskrit & Indic Studies, JNU New Delhi',
    categoryTag: 'Indic Computation',
    presentationSlot: 'Day 2 • 11:55 – 12:15 IST',
    keywords: ['Indic Computation', 'Ramayana Memory', 'Semantic Web Ontology', 'Sanskrit Corpora'],
    apaCitation:
      'Tiwari, S., & Jha, G. N. (2026). Preserving the civilisational memory of the Ramayana through computational ontologies. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 226–244). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p14-03',
    refCode: 'EHSS-P14-03',
    panelId: 'panel-14-15',
    panelLabel: 'Panel 14/15 (Digital Humanities)',
    title: 'Derived Dystopia: Cultural Replacement in Dave Eggers’ The Circle',
    abstract:
      'Analyzing corporatized surveillance monopolies, affective panopticism, and the simulated dissolution of organic democratic subjectivities.',
    extendedSummary:
      'Examining Dave Eggers’ The Circle alongside contemporary biometric and social-credit platform ecosystems, this paper theorizes “derived dystopia”—a condition wherein participatory transparency voluntary supplants civic privacy and historical memory.',
    methodology: 'Posthuman Critical Theory & Algorithmic Surveillance Critique',
    author: 'Shivansh Mishra',
    affiliation: 'Central University of Rajasthan (CURAJ)',
    categoryTag: 'Surveillance Critique',
    presentationSlot: 'Day 2 • 12:15 – 12:35 IST',
    keywords: ['Derived Dystopias', 'Surveillance Critique', 'Platform Capitalism', 'Affective Panopticism'],
    apaCitation:
      'Mishra, S. (2026). Derived dystopia: Cultural replacement in Dave Eggers’ The Circle. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 245–260). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p14-04',
    refCode: 'EHSS-P14-04',
    panelId: 'panel-14-15',
    panelLabel: 'Panel 14/15 (Digital Humanities)',
    title: 'Beyond the Page: Tolkien’s Lord of the Rings & Digital Narrative Transformation',
    abstract:
      'Comparative analysis of transmedia adaptation, ludic roleplay worldbuilding, and algorithmic reader responses in digital fan-fiction spaces.',
    extendedSummary:
      'Investigating how high-fantasy secondary worlds transition from philological print codices into interactive ludic environments and collaborative archive repositories, this study measures narrative branching fidelity and community canon formation.',
    methodology: 'Comparative Transmedia Narratology & Corpus Stylistics',
    author: 'Sherin Immaculate A & Vetha S',
    affiliation: 'Bharathiar University, Coimbatore',
    categoryTag: 'Transmedia Studies',
    presentationSlot: 'Day 2 • 12:35 – 12:55 IST',
    keywords: ['Transmedia Studies', 'Digital Narrative', 'Ludic Worldbuilding', 'Corpus Stylistics'],
    apaCitation:
      'Immaculate, S. A., & Vetha, S. (2026). Beyond the page: Tolkien’s Lord of the Rings & digital narrative transformation. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 261–278). IIT Roorkee Press.',
  },
  {
    id: 'ehss-p15-05',
    refCode: 'EHSS-P15-05',
    panelId: 'panel-14-15',
    panelLabel: 'Panel 14/15 (Digital Humanities)',
    title: 'Vernacular Lexicography & Postcolonial Counter-Cataloging in North Indian Archival Repositories',
    abstract:
      'Reconstructing Brajbhasha and Maithili manuscript metadata schemas through community-annotated TEI-XML standards to rectify colonial classification biases.',
    extendedSummary:
      'Colonial district gazetteers and early twentieth-century library catalogs systematically misclassified fluid vernacular literary traditions. By deploying customized Text Encoding Initiative (TEI-XML) schemas co-designed with local archivists, this project restores indigenous genre taxonomies and paratextual provenance.',
    methodology: 'TEI-XML Archival Engineering & Postcolonial Textual Scholarship',
    author: 'Dr. Raghavendra Pratap & Meenakshi Sundaram',
    affiliation: 'Banaras Hindu University (BHU), Varanasi',
    categoryTag: 'Epistemic Archiving',
    presentationSlot: 'Day 2 • 12:55 – 13:20 IST',
    keywords: ['Epistemic Archiving', 'TEI-XML Standards', 'Digital Vernaculars', 'Counter-Cataloging'],
    apaCitation:
      'Pratap, R., & Sundaram, M. (2026). Vernacular lexicography & postcolonial counter-cataloging in North Indian archival repositories. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences (pp. 279–296). IIT Roorkee Press.',
  },
];

export const ALL_CONFERENCE_TRACKS: SymposiumTrackOverview[] = [
  {
    id: 'track-01',
    code: 'Track 01 • Panel 01 & 09',
    title: 'Decolonizing Methodology, Indigenous Epistemologies & Indian Knowledge Systems',
    leadFaculty: 'Prof. Smita Jha & Dr. R. K. Sharma',
    summary:
      'Interrogating Eurocentric social science paradigms through classical Nyaya, Mimamsa, and lived subaltern historiographies.',
    papersAccepted: 9,
    panelsCount: 2,
  },
  {
    id: 'track-02-03',
    code: 'Track 02 & 03 • Panel 02, 14 & 15',
    title: 'Digitalization of Humanities & Enhancing Social Transformation',
    leadFaculty: 'Prof. Girish Nath Jha & Dr. Avishek Parui',
    summary:
      'Interrogating algorithmic culture, archival politics, inclusive digital pedagogies, and technological equity in postcolonial nation-building.',
    papersAccepted: 10,
    panelsCount: 2,
    isCurrent: true,
  },
  {
    id: 'track-04',
    code: 'Track 04 • Panel 05 & 08',
    title: 'Ecological Humanities, Climate Justice & Himalayan Sustainability Commons',
    leadFaculty: 'Dr. Nagendra Kumar & Dr. Pooja Gupta',
    summary:
      'Environmental ethics, riverine cultural memory, and community resilience across fragile mountain ecosystems.',
    papersAccepted: 8,
    panelsCount: 2,
  },
  {
    id: 'track-05',
    code: 'Track 05 • Panel 11 & 12',
    title: 'Posthumanism, Medical Humanities & Biocultural Embodiment',
    leadFaculty: 'Prof. Smita Jha & Dr. Avishek Parui',
    summary:
      'Phenomenologies of illness, prosthetic memory, mental health narratives, and bio-ethics in contemporary South Asia.',
    papersAccepted: 7,
    panelsCount: 2,
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'comm-1',
    name: 'Prof. Smita Jha',
    role: 'Head of Department & Conference Convener',
    department: 'Department of Humanities and Social Sciences',
    institution: 'Indian Institute of Technology Roorkee',
    researchArea: 'Contemporary Literary Theory, Medical Humanities & Performance Studies',
  },
  {
    id: 'comm-2',
    name: 'Prof. Girish Nath Jha',
    role: 'Track 02 Scientific Chair & Plenary Speaker',
    department: 'School of Sanskrit & Indic Studies',
    institution: 'Jawaharlal Nehru University, New Delhi',
    researchArea: 'Computational Linguistics, Sanskrit Corpora & Digital Ontologies',
  },
  {
    id: 'comm-3',
    name: 'Dr. Avishek Parui',
    role: 'Track 02 Co-Chair & Plenary Speaker',
    department: 'Department of Humanities and Social Sciences',
    institution: 'Indian Institute of Technology Madras',
    researchArea: 'Memory Studies, Cognitive Literary Theory & Digital Humanities',
  },
  {
    id: 'comm-4',
    name: 'Dr. Anita Yadav',
    role: 'Track 03 Editorial Coordinator',
    department: 'School of Liberal Arts',
    institution: 'Uttaranchal University, Dehradun',
    researchArea: 'Inclusive Pedagogy, Empirical Policy & Rural Educational Commons',
  },
];
