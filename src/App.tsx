import React, { useState, useMemo } from 'react';
import {
  FileText,
  Calendar,
  BookOpen,
  Lightbulb,
  Network,
  Leaf,
  CheckCircle2,
  Scale,
  CreditCard,
  Send,
  Headphones,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Mail,
  Search,
  ChevronRight,
  Globe,
  ShieldCheck,
  Award,
} from 'lucide-react';
import {
  HERO_LAB_IMAGE,
  SUB_THEMES,
  KEYNOTE_SPEAKERS,
  PANELS,
  ACCEPTED_PAPERS,
  ALL_CONFERENCE_TRACKS,
  AcceptedPaper,
  KeynoteSpeaker,
} from './data/symposiumData';
import {
  PaperDetailModal,
  SubmitAbstractModal,
  RegistrationModal,
  TrackScopeModal,
  AllTracksModal,
  KeynoteDetailModal,
} from './components/SymposiumModals';

export function App() {
  const [papers, setPapers] = useState<AcceptedPaper[]>(ACCEPTED_PAPERS);
  const [selectedPanelFilter, setSelectedPanelFilter] = useState<'all' | 'panel-02' | 'panel-14-15'>('all');
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [activePaperModal, setActivePaperModal] = useState<AcceptedPaper | null>(null);
  const [activeKeynoteModal, setActiveKeynoteModal] = useState<KeynoteSpeaker | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerInitialTier, setRegisterInitialTier] = useState<'faculty' | 'scholar'>('faculty');
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [isAllTracksModalOpen, setIsAllTracksModalOpen] = useState(false);
  const [showInterdisciplinaryMatrix, setShowInterdisciplinaryMatrix] = useState(false);

  // Filter logic for panels and papers
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesPanel =
        selectedPanelFilter === 'all' || paper.panelId === selectedPanelFilter;
      const matchesKeyword =
        !selectedKeywordFilter ||
        paper.keywords.some((k) => k.toLowerCase().includes(selectedKeywordFilter.toLowerCase())) ||
        paper.categoryTag.toLowerCase().includes(selectedKeywordFilter.toLowerCase()) ||
        paper.title.toLowerCase().includes(selectedKeywordFilter.toLowerCase());
      const matchesSearch =
        !searchQuery.trim() ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPanel && matchesKeyword && matchesSearch;
    });
  }, [papers, selectedPanelFilter, selectedKeywordFilter, searchQuery]);

  const panel02Papers = useMemo(
    () => filteredPapers.filter((p) => p.panelId === 'panel-02'),
    [filteredPapers]
  );

  const panel1415Papers = useMemo(
    () => filteredPapers.filter((p) => p.panelId === 'panel-14-15'),
    [filteredPapers]
  );

  const handleAddSubmittedPaper = (newPaperData: {
    title: string;
    author: string;
    email: string;
    affiliation: string;
    panelId: 'panel-02' | 'panel-14-15';
    categoryTag: string;
    abstract: string;
    keywords: string;
  }) => {
    const nextCount = papers.length + 1;
    const refPrefix = newPaperData.panelId === 'panel-02' ? 'EHSS-P02' : 'EHSS-P15';
    const refCode = `${refPrefix}-0${nextCount}`;
    const newEntry: AcceptedPaper = {
      id: `custom-${Date.now()}`,
      refCode,
      panelId: newPaperData.panelId,
      panelLabel:
        newPaperData.panelId === 'panel-02'
          ? 'Panel 02 (Education & Society)'
          : 'Panel 14/15 (Digital Humanities)',
      title: newPaperData.title,
      abstract: newPaperData.abstract,
      extendedSummary:
        'Submitted via the EHSS 2026 Online Abstract Portal. Currently undergoing double-blind peer evaluation by the Track 02 & Track 03 Editorial Committee at IIT Roorkee.',
      methodology: 'Author-Submitted Extended Abstract (300–500 Words Protocol)',
      author: newPaperData.author,
      affiliation: newPaperData.affiliation,
      categoryTag: newPaperData.categoryTag,
      presentationSlot:
        newPaperData.panelId === 'panel-02'
          ? 'Day 1 • Provisional Slot IST'
          : 'Day 2 • Provisional Slot IST',
      keywords: newPaperData.keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      apaCitation: `${newPaperData.author} (2026). ${newPaperData.title}. In Proceedings of EHSS 2026: Empowering Humanities & Social Sciences. IIT Roorkee Press.`,
    };
    setPapers((prev) => [newEntry, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderThematicIcon = (iconName: 'archive' | 'lightbulb' | 'network' | 'leaf') => {
    switch (iconName) {
      case 'archive':
        return <BookOpen className="h-4 w-4 text-slate-800" />;
      case 'lightbulb':
        return <Lightbulb className="h-4 w-4 text-slate-800" />;
      case 'network':
        return <Network className="h-4 w-4 text-slate-800" />;
      case 'leaf':
        return <Leaf className="h-4 w-4 text-[#1B4332]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#191C1E] flex flex-col">
      {/* Sticky Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-base md:text-lg font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            IIT ROORKEE · EHSS 2026
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Primary Symposium Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('overview');
              }}
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#themes-objectives"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('themes-objectives');
              }}
              className="text-[#0F172A] font-semibold underline decoration-[#0F172A] decoration-2 underline-offset-[20px] whitespace-nowrap shrink-0"
            >
              Themes &amp; Objectives
            </a>
            <a
              href="#keynotes-committees"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('keynotes-committees');
              }}
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Committees
            </a>
            <a
              href="#cfp-registration"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('cfp-registration');
              }}
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              CFP &amp; Registration
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 rounded bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Submit Abstract</span>
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Breadcrumb & Institutional Context Ribbon */}
      <div className="border-b border-[#E2E8F0] bg-[#F2F4F6]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <button
              onClick={() => setIsAllTracksModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-slate-400">/</span>
            <button
              onClick={() => scrollToSection('themes-objectives')}
              className="hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
            >
              Themes &amp; Objectives
            </button>
            <span aria-hidden="true" className="text-slate-400">/</span>
            <span className="font-semibold text-[#0F172A] whitespace-nowrap">
              Track Deep-Dive: Digitalization &amp; Social Transformation
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-wider uppercase text-slate-600">
            <span className="text-[#1E3A8A]">
              IN ASSOCIATION WITH NPTEL, IIT MADRAS
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="font-mono text-slate-700">
              Ref: Track 02 &amp; 03 • EHSS 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="overview" className="mx-auto max-w-[1280px] px-6 lg:px-12 pt-10 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: 7 cols */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Unboxed scholarly metadata lead-in */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  <span className="bg-[#0F172A] text-white px-2.5 py-1 rounded-sm">
                    RESEARCH SYMPOSIA TRACK
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span>DEPT. OF HSS, IIT ROORKEE</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="font-mono text-slate-700">Panel Code: P-02 / P-14 / P-15</span>
                </div>

                {/* Display Headline */}
                <h1
                  className="mt-5 font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.18] tracking-tight text-[#0F172A]"
                  style={{ textWrap: 'balance' }}
                >
                  Digitalization of Humanities &amp; Enhancing Social Transformation
                </h1>

                {/* Narrative Lead */}
                <p className="mt-5 text-base sm:text-[17px] leading-[1.7] text-[#45464D] max-w-2xl">
                  Interrogating algorithmic culture, archival politics, inclusive digital
                  pedagogies, and technological equity in postcolonial nation-building and social
                  resilience. A collaborative symposium inquiry bridging computational humanism with
                  grassroots empirical praxes.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded bg-[#0F172A] px-5 py-3 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Extended Abstract</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('accepted-papers')}
                    className="inline-flex items-center gap-2 rounded border border-[#CBD5E1] bg-white px-5 py-3 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 text-slate-700" />
                    <span>View Accepted Papers &amp; Schedule</span>
                  </button>
                </div>
              </div>

              {/* Tertiary Document Link */}
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => setIsScopeModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#9A6B2F] transition-colors cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-[#9A6B2F]" />
                  <span className="underline decoration-slate-300 underline-offset-4">
                    Download Track Scope (PDF / Dossier)
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: 5 cols — Featured Methodological Focus Card */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-lg border border-[#E2E8F0] bg-white overflow-hidden flex flex-col justify-between shadow-xs">
                <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={HERO_LAB_IMAGE}
                    alt="Scholars and researchers examining archival Sanskrit manuscripts alongside computational corpus analysis terminals at IIT Roorkee"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      <span>METHODOLOGICAL FOCUS</span>
                      <Globe className="h-4 w-4 text-slate-500" />
                    </div>
                    <h2 className="mt-1.5 font-serif text-lg font-bold text-[#0F172A]">
                      Digital Archive &amp; Subaltern Publics
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      Confronting digital divides through indigenous knowledge systems,
                      computational linguistics, and neuro-inclusive pedagogy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Quantitative Symposium Summary Bar */}
          <div className="mt-10 rounded-lg border border-[#E2E8F0] bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
            <div className="p-5 md:p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                PARALLEL SESSIONS
              </div>
              <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A] tabular-nums">
                2 Dedicated Panels
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Panel 02 &amp; Joint Panel 14/15
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                PEER-REVIEWED SUBMISSIONS
              </div>
              <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A] tabular-nums">
                {papers.length} Accepted Papers
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Selected across 8 premier universities
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                KEYNOTE ORATIONS
              </div>
              <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A] tabular-nums">
                2 Distinguished Lectures
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Prof. G. N. Jha &amp; Dr. A. Parui
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                REVIEW PROTOCOLS
              </div>
              <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A]">
                Double-Blind
              </div>
              <div className="mt-1 text-xs text-slate-600 tabular-nums">
                300–500 Words Abstract in APA 7th
              </div>
            </div>
          </div>
        </section>

        {/* Hairline Section Divider */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <hr className="border-[#E2E8F0]" />
        </div>

        {/* SECTION 2: THEMATIC TAXONOMY — Curated Research Inquiries & Sub-Themes */}
        <section id="themes-objectives" className="mx-auto max-w-[1280px] px-6 lg:px-12 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
                THEMATIC TAXONOMY
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Curated Research Inquiries &amp; Sub-Themes
              </h2>
              <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#45464D] max-w-2xl">
                A dual framework exploring how digital mediation actively reshapes humanities
                research, while demanding rigorous critical interrogation of postcolonial access,
                surveillance, and socio-ecological sustainability.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setShowInterdisciplinaryMatrix((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#9A6B2F]" />
                <span>Interdisciplinary Matrix : Track 02 + Track 03</span>
              </button>
            </div>
          </div>

          {/* Expandable Interdisciplinary Matrix Callout */}
          {showInterdisciplinaryMatrix && (
            <div className="mt-6 rounded-lg border border-[#CBD5E1] bg-white p-5 text-xs text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-bold uppercase tracking-wider text-[#0F172A]">
                  Track 02: Digitalization of Humanities (Panels 14 &amp; 15)
                </div>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Focuses on computational ontologies, Sanskrit and vernacular digital corpora,
                  algorithmic surveillance critique, and subaltern counter-publics across digital
                  media.
                </p>
              </div>
              <div className="md:border-l md:border-slate-200 md:pl-4">
                <div className="font-bold uppercase tracking-wider text-[#1B4332]">
                  Track 03: Enhancing Social Transformation (Panel 02)
                </div>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Examines human-centric social work praxes, AI-enabled higher education curricula
                  (Litscape India), rural educational commons, and campus digital carbon footprints.
                </p>
              </div>
            </div>
          )}

          {/* 4-Column Thematic Cards Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUB_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="rounded-lg border border-[#E2E8F0] bg-white p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 bg-[#F7F9FB]">
                    {renderThematicIcon(theme.iconName)}
                  </div>

                  <div className="mt-5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    {theme.number}
                  </div>

                  <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-[#0F172A]">
                    {theme.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Epistemic Keywords:
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-slate-700">
                    {theme.keywords.map((kw, idx) => (
                      <React.Fragment key={kw}>
                        <button
                          onClick={() => {
                            setSelectedKeywordFilter(
                              selectedKeywordFilter === kw ? null : kw
                            );
                            scrollToSection('accepted-papers');
                          }}
                          className="hover:text-[#9A6B2F] hover:underline transition-colors text-left cursor-pointer"
                          title={`Filter accepted papers by "${kw}"`}
                        >
                          {kw}
                        </button>
                        {idx < theme.keywords.length - 1 && (
                          <span aria-hidden="true" className="text-slate-400">
                            ,
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hairline Section Divider */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <hr className="border-[#E2E8F0]" />
        </div>

        {/* SECTION 3: PLENARY DISCOURSE SYNERGIES — Track-Aligned Keynote Addresses */}
        <section id="keynotes-committees" className="mx-auto max-w-[1280px] px-6 lg:px-12 py-14">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
              PLENARY DISCOURSE SYNERGIES
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Track-Aligned Keynote Addresses
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#45464D] max-w-2xl">
              Two distinguished scholars whose foundational research directly grounds the
              ontological inquiries of Tracks 02 and 03 during EHSS 2026.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {KEYNOTE_SPEAKERS.map((speaker) => (
              <div
                key={speaker.id}
                className="rounded-lg border border-[#E2E8F0] bg-white p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={speaker.portraitUrl}
                      alt={speaker.name}
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-[#9A6B2F]/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-[#0F172A] bg-[#F2F4F6] px-2.5 py-0.5 rounded-sm">
                          {speaker.plenaryLabel}
                        </span>
                        <span className="font-mono text-xs text-slate-500 tabular-nums">
                          {speaker.date}
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-xl font-bold text-[#0F172A]">
                        {speaker.name}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {speaker.credentials}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded border border-slate-200/90 bg-[#F7F9FB] p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Keynote Address:
                    </div>
                    <p className="mt-1 font-serif text-sm sm:text-[15px] italic font-bold leading-snug text-[#0F172A]">
                      {speaker.lectureTitle}
                    </p>
                  </div>

                  <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                    {speaker.abstractSummary}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 tabular-nums">{speaker.time}</span>
                  <button
                    onClick={() => setActiveKeynoteModal(speaker)}
                    className="inline-flex items-center gap-1 font-semibold text-[#0F172A] hover:text-[#9A6B2F] transition-colors cursor-pointer"
                  >
                    <span>Read Plenary Abstract &amp; Bio</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hairline Section Divider */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <hr className="border-[#E2E8F0]" />
        </div>

        {/* SECTION 4: SYMPOSIUM PROCEEDINGS — Curated Parallel Panels & Accepted Papers */}
        <section id="accepted-papers" className="mx-auto max-w-[1280px] px-6 lg:px-12 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
                SYMPOSIUM PROCEEDINGS
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Curated Parallel Panels &amp; Accepted Papers
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#45464D] max-w-2xl">
                These peer-reviewed research papers will be presented offline across dedicated
                symposium halls at the Department of Humanities and Social Sciences, IIT Roorkee.
              </p>
            </div>

            {/* Interactive Segmented Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setSelectedPanelFilter('all')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedPanelFilter === 'all'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-white border border-[#CBD5E1] text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Panels ({papers.length})
              </button>
              <button
                onClick={() => setSelectedPanelFilter('panel-02')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedPanelFilter === 'panel-02'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-white border border-[#CBD5E1] text-slate-700 hover:bg-slate-50'
                }`}
              >
                Panel 2 (Education &amp; Society)
              </button>
              <button
                onClick={() => setSelectedPanelFilter('panel-14-15')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedPanelFilter === 'panel-14-15'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-white border border-[#CBD5E1] text-slate-700 hover:bg-slate-50'
                }`}
              >
                Panel 14/15 (Digital Humanities)
              </button>
            </div>
          </div>

          {/* Search & Active Keyword Filter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by paper ref, author, university, or keyword..."
                className="w-full rounded border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0F172A] focus:outline-none"
              />
            </div>

            {selectedKeywordFilter && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600">
                  Filtered by epistemic topic:{' '}
                  <strong className="text-[#0F172A]">{selectedKeywordFilter}</strong>
                </span>
                <button
                  onClick={() => setSelectedKeywordFilter(null)}
                  className="text-[#9A6B2F] font-semibold underline cursor-pointer"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* PANEL 02 BLOCK */}
          {(selectedPanelFilter === 'all' || selectedPanelFilter === 'panel-02') && (
            <div className="mt-8">
              {/* Panel 02 Header Strip */}
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F2F4F6] p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <span className="inline-flex items-center justify-center rounded-sm bg-[#0F172A] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap shrink-0 w-fit">
                    Panel 02
                  </span>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">
                      {PANELS[0].title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-600 tabular-nums">
                      {PANELS[0].scheduleText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
                  <span className="text-slate-700 tabular-nums">
                    {panel02Papers.length} Peer-Reviewed Papers
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-[#1E3A8A]">Track 03 Lead</span>
                </div>
              </div>

              {/* Panel 02 Papers Grid */}
              {panel02Papers.length === 0 ? (
                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
                  No papers in Panel 02 match your current search query.
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {panel02Papers.map((paper) => {
                    if (paper.isFeaturedFullWidth) {
                      return (
                        <article
                          key={paper.id}
                          onClick={() => setActivePaperModal(paper)}
                          className="md:col-span-2 rounded-lg border border-[#E2E8F0] bg-white p-6 hover:border-slate-300 transition-colors cursor-pointer"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                <span className="font-mono">PAPER REF: {paper.refCode}</span>
                                {paper.badgeLabel && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-[#9A6B2F]">{paper.badgeLabel}</span>
                                  </>
                                )}
                              </div>

                              <h4 className="mt-2 font-serif text-lg sm:text-xl font-bold leading-snug text-[#0F172A]">
                                {paper.title}
                              </h4>

                              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[#45464D] max-w-3xl">
                                {paper.abstract}
                              </p>
                            </div>

                            <div className="md:text-right shrink-0 flex flex-col justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-200/80">
                              <div>
                                <div className="text-sm font-bold text-[#0F172A]">
                                  {paper.author}
                                </div>
                                <div className="text-xs text-slate-600 mt-0.5">
                                  {paper.affiliation}
                                </div>
                              </div>
                              {paper.statusText && (
                                <div className="mt-3 text-[11px] font-semibold text-[#1B4332]">
                                  {paper.statusText}
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    }

                    return (
                      <article
                        key={paper.id}
                        onClick={() => setActivePaperModal(paper)}
                        className="rounded-lg border border-[#E2E8F0] bg-white p-6 flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            <span className="font-mono">PAPER REF: {paper.refCode}</span>
                            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                          </div>

                          <h4 className="mt-2.5 font-serif text-base sm:text-[17px] font-bold leading-snug text-[#0F172A]">
                            {paper.title}
                          </h4>

                          <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                            {paper.abstract}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-end justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-[#0F172A]">{paper.author}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {paper.affiliation}
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-600 shrink-0">
                            {paper.categoryTag}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* PANEL 14 & 15 BLOCK */}
          {(selectedPanelFilter === 'all' || selectedPanelFilter === 'panel-14-15') && (
            <div className="mt-10">
              {/* Panel 14 & 15 Header Strip */}
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F2F4F6] p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <span className="inline-flex items-center justify-center rounded-sm bg-[#0F172A] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap shrink-0 w-fit">
                    Panel 14 &amp; 15
                  </span>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">
                      {PANELS[1].title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-600 tabular-nums">
                      {PANELS[1].scheduleText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
                  <span className="text-slate-700 tabular-nums">
                    {panel1415Papers.length} Peer-Reviewed Papers
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-[#1E3A8A]">Track 02 Lead</span>
                </div>
              </div>

              {/* Panel 14 & 15 Papers Grid */}
              {panel1415Papers.length === 0 ? (
                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
                  No papers in Panel 14 &amp; 15 match your current search query.
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {panel1415Papers.map((paper, index) => {
                    const isLastOdd =
                      panel1415Papers.length % 2 === 1 && index === panel1415Papers.length - 1;

                    return (
                      <article
                        key={paper.id}
                        onClick={() => setActivePaperModal(paper)}
                        className={`rounded-lg border border-[#E2E8F0] bg-white p-6 flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer ${
                          isLastOdd ? 'md:col-span-2' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            <span className="font-mono">PAPER REF: {paper.refCode}</span>
                            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                          </div>

                          <h4 className="mt-2.5 font-serif text-base sm:text-[17px] font-bold leading-snug text-[#0F172A]">
                            {paper.title}
                          </h4>

                          <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                            {paper.abstract}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-end justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-[#0F172A]">{paper.author}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {paper.affiliation}
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-600 shrink-0">
                            {paper.categoryTag}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Hairline Section Divider */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <hr className="border-[#E2E8F0]" />
        </div>

        {/* SECTION 5: SCHOLARLY PROTOCOLS — Submission Protocol & Editorial Matrix */}
        <section id="cfp-registration" className="mx-auto max-w-[1280px] px-6 lg:px-12 py-14">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
              SCHOLARLY PROTOCOLS
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Submission Protocol &amp; Editorial Matrix
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#45464D] max-w-2xl">
              Authors submitting papers directly under Tracks 02 and 03 must strictly comply with
              international refereeing guidelines and APA 7th referencing formatting.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Abstract Structure, Double-Blind Review, Delegate Tariffs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Box 1: Abstract Structure & Composition */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#0F172A]" />
                  <h3 className="font-serif text-base font-bold text-[#0F172A]">
                    Abstract Structure &amp; Composition
                  </h3>
                </div>

                <ul className="mt-4 space-y-3 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0F172A] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0F172A]">Extended Abstract Length:</strong> 300 to
                      500 words encapsulating theoretical context, methodology, findings, and
                      nation-building relevance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0F172A] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0F172A]">Keywords:</strong> 4 to 6 indexed terms
                      reflecting computational or social science ontological paradigms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0F172A] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0F172A]">Author Bio-Note:</strong> Maximum 50 words
                      per author, specifying institutional affiliation, official email, and
                      designation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0F172A] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0F172A]">Style Sheet:</strong> Strict adherence to
                      American Psychological Association (APA 7th Edition) citation manual.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Double-Blind Peer Review & Proceedings Volume */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
                <div className="flex items-center gap-2.5">
                  <Scale className="h-4 w-4 text-[#0F172A]" />
                  <h3 className="font-serif text-base font-bold text-[#0F172A]">
                    Double-Blind Peer Review &amp; Proceedings Volume
                  </h3>
                </div>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-[#45464D]">
                  Every paper submitted under Tracks 02 and 03 will undergo double-blind evaluation
                  by an academic editorial panel consisting of faculty members from IIT Roorkee and
                  partnering IITs. Plagiarism threshold is strictly &lt; 10% (excluding canonical
                  references).
                </p>

                <div className="mt-4 rounded border border-slate-200 bg-[#F7F9FB] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Proceedings Publication:</span>
                  <span className="font-bold text-[#0F172A]">
                    Peer-Reviewed ISBN Volume with Reputed International Academic Press
                  </span>
                </div>
              </div>

              {/* Box 3: Delegate Registration Tariffs */}
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-[#0F172A]" />
                  <h3 className="font-serif text-base font-bold text-[#0F172A]">
                    Delegate Registration Tariffs
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => {
                      setRegisterInitialTier('faculty');
                      setIsRegisterModalOpen(true);
                    }}
                    className="rounded border border-slate-200 bg-[#F7F9FB] p-4 hover:border-slate-400 transition-colors cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      STANDARD DELEGATE / FACULTY
                    </div>
                    <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A] tabular-nums">
                      ₹ 3,000
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Includes kit, conference lunch, high-tea &amp; book of abstracts.
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setRegisterInitialTier('scholar');
                      setIsRegisterModalOpen(true);
                    }}
                    className="rounded border border-slate-200 bg-[#F7F9FB] p-4 hover:border-slate-400 transition-colors cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      RESEARCH SCHOLARS / STUDENTS
                    </div>
                    <div className="mt-1.5 font-serif text-2xl font-bold text-[#0F172A] tabular-nums">
                      ₹ 2,000
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Concessional registration for bona fide research scholars.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Critical Milestones & Dates + Editorial Secretariat */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F2F4F6] p-6">
                <div className="flex items-center justify-between border-b border-slate-300/80 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#0F172A]">
                    Critical Milestones &amp; Dates
                  </h3>
                  <Calendar className="h-4 w-4 text-slate-600" />
                </div>

                {/* Vertical Timeline List */}
                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#0F172A] font-mono text-[11px] font-bold text-white shrink-0 mt-0.5 tabular-nums">
                      01
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        SUBMISSION DEADLINE
                      </div>
                      <div className="font-serif text-sm font-bold text-[#0F172A] tabular-nums">
                        10th September 2026
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Final extended abstract submission portal closes at 23:59 IST.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-200 font-mono text-[11px] font-bold text-slate-800 shrink-0 mt-0.5 tabular-nums">
                      02
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        ACCEPTANCE NOTIFICATION
                      </div>
                      <div className="font-serif text-sm font-bold text-[#0F172A] tabular-nums">
                        20th September 2026
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Notification sent to corresponding authors with referee recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-200 font-mono text-[11px] font-bold text-slate-800 shrink-0 mt-0.5 tabular-nums">
                      03
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        REGISTRATION CUTOFF
                      </div>
                      <div className="font-serif text-sm font-bold text-[#0F172A] tabular-nums">
                        25th September 2026
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Fee remittance and presentation confirmation deadline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#0F172A] font-mono text-[11px] font-bold text-white shrink-0 mt-0.5 tabular-nums">
                      04
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        SYMPOSIUM CONVENING
                      </div>
                      <div className="font-serif text-sm font-bold text-[#0F172A] tabular-nums">
                        9th – 10th October 2026
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Two full days of offline scholarly deliberative sessions at IIT Roorkee.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-300/80">
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#0F172A] px-4 py-3 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit via Abstract Portal</span>
                  </button>
                </div>
              </div>

              {/* Track Editorial Secretariat Box */}
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F2F4F6] p-5 flex items-start gap-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white border border-slate-200 shrink-0">
                  <Headphones className="h-4 w-4 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    Track Editorial Secretariat
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    For questions regarding dataset eligibility, linguistic formats, or joint panel
                    co-authorship:{' '}
                    <a
                      href="mailto:hss@iitr.ac.in"
                      className="font-bold text-[#0F172A] underline decoration-slate-400 underline-offset-2"
                    >
                      hss@iitr.ac.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ACADEMIC NAVIGATION — Explore Other Symposium Tracks */}
        <section className="border-t border-[#E2E8F0] bg-[#ECEEF0]">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                ACADEMIC NAVIGATION
              </div>
              <h2 className="mt-1 font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
                Explore Other Symposium Tracks
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Navigate back to full list of conference themes: Sustainable Development,
                Decolonizing Methodology &amp; Literature.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsAllTracksModalOpen(true)}
                className="inline-flex items-center gap-2 rounded border border-[#CBD5E1] bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Conference Tracks</span>
              </button>

              <button
                onClick={() => {
                  setRegisterInitialTier('faculty');
                  setIsRegisterModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded bg-[#0F172A] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap cursor-pointer"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Register for EHSS 2026</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="border-t border-[#E2E8F0] bg-[#F7F9FB] text-slate-700">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Conference Host */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                CONFERENCE HOST
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#0F172A]">EHSS 2026</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Empowering Humanities and Social Sciences: A Discourse on Nation Building and
                Sustainability. A distinguished national academic symposium convened by IIT Roorkee.
              </p>
              <div className="mt-4 text-xs font-semibold text-[#0F172A]">
                Mode: Two-Day Offline Conference
              </div>
            </div>

            {/* Col 2: Symposium Secretariat */}
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Symposium Secretariat</div>
              <div className="mt-3 text-xs font-bold text-[#0F172A]">Prof. Smita Jha</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-600 space-y-0.5">
                <div>Head &amp; Conference Convener</div>
                <div>Dept. of Humanities and Social Sciences</div>
                <div>Indian Institute of Technology Roorkee</div>
                <div>Uttarakhand, India – 247667</div>
              </div>
              <a
                href="mailto:hss@iitr.ac.in"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:underline"
              >
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>hss@iitr.ac.in</span>
              </a>
            </div>

            {/* Col 3: Important Milestones */}
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Important Milestones</div>
              <div className="mt-3 space-y-3 text-xs tabular-nums">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    ABSTRACT SUBMISSION
                  </div>
                  <div className="font-bold text-[#0F172A]">10th September 2026</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    NOTIFICATION OF ACCEPTANCE
                  </div>
                  <div className="font-bold text-[#0F172A]">20th September 2026</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    SYMPOSIUM DATES
                  </div>
                  <div className="font-bold text-[#0F172A]">9th – 10th October 2026</div>
                </div>
              </div>
            </div>

            {/* Col 4: Participation Details */}
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Participation Details</div>
              <div className="mt-3 rounded-lg border border-[#E2E8F0] bg-white p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  STANDARD REGISTRATION FEE
                </div>
                <div className="mt-1 font-serif text-xl font-bold text-[#0F172A] tabular-nums">
                  ₹ 3,000
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Includes conference kit, proceedings, lunch, and high-tea for two days.
                </p>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded border border-[#CBD5E1] bg-[#F7F9FB] px-3 py-2 text-xs font-semibold text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Online Abstract Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Venue Line */}
          <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Department of Humanities &amp; Social Sciences, IIT Roorkee. All rights
              reserved.
            </div>
            <div className="flex items-center gap-2">
              <span>Venue: HSS Dept, IIT Roorkee Campus</span>
              <span aria-hidden="true">·</span>
              <span>Mode: Offline</span>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <PaperDetailModal
        paper={activePaperModal}
        onClose={() => setActivePaperModal(null)}
      />

      <KeynoteDetailModal
        speaker={activeKeynoteModal}
        onClose={() => setActiveKeynoteModal(null)}
      />

      <SubmitAbstractModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitPaper={handleAddSubmittedPaper}
      />

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        initialTier={registerInitialTier}
      />

      <TrackScopeModal
        isOpen={isScopeModalOpen}
        onClose={() => setIsScopeModalOpen(false)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      <AllTracksModal
        isOpen={isAllTracksModalOpen}
        onClose={() => setIsAllTracksModalOpen(false)}
        tracks={ALL_CONFERENCE_TRACKS}
      />
    </div>
  );
}

export default App;
