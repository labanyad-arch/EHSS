import React from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Calendar,
  MapPin,
  BookOpen,
  UserCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import {
  AcceptedPaper,
  KeynoteSpeaker,
  SymposiumTrackOverview,
  COMMITTEE_MEMBERS,
} from '../data/symposiumData';

interface PaperModalProps {
  paper: AcceptedPaper | null;
  onClose: () => void;
}

export const PaperDetailModal: React.FC<PaperModalProps> = ({ paper, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!paper) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(paper.apaCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paper-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border border-slate-200 border-t-4 border-t-[#9A6B2F] bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>PAPER REF: {paper.refCode}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{paper.panelLabel}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-[#9A6B2F]">{paper.categoryTag}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h3
          id="paper-modal-title"
          className="mt-5 font-serif text-xl md:text-2xl font-bold leading-snug text-slate-900"
        >
          {paper.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded bg-[#F7F9FB] px-4 py-3 border border-slate-200/80">
          <div>
            <div className="text-sm font-bold text-slate-900">{paper.author}</div>
            <div className="text-xs text-slate-600">{paper.affiliation}</div>
          </div>
          <div className="text-xs font-medium text-slate-600 tabular-nums">
            <span>{paper.presentationSlot}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-[#1B4332] font-semibold">Camera-Ready Verified</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Extended Abstract & Critical Inquiry
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {paper.abstract}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
              {paper.extendedSummary}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Methodological Framework
            </h4>
            <p className="mt-1.5 text-sm font-medium text-slate-800">
              {paper.methodology}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Indexed Epistemic Keywords
            </h4>
            <p className="mt-1.5 text-xs text-slate-600">
              {paper.keywords.join(' · ')}
            </p>
          </div>

          <div className="rounded border border-slate-200 bg-[#F4EFEA]/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                APA 7th Edition Citation
              </span>
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#1B4332]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-600" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-700">
              {paper.apaCitation}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

interface SubmitAbstractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPaper: (newPaper: {
    title: string;
    author: string;
    email: string;
    affiliation: string;
    panelId: 'panel-02' | 'panel-14-15';
    categoryTag: string;
    abstract: string;
    keywords: string;
  }) => void;
}

export const SubmitAbstractModal: React.FC<SubmitAbstractModalProps> = ({
  isOpen,
  onClose,
  onSubmitPaper,
}) => {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [panelId, setPanelId] = React.useState<'panel-02' | 'panel-14-15'>('panel-02');
  const [categoryTag, setCategoryTag] = React.useState('Digital Archive & Subaltern Publics');
  const [abstract, setAbstract] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const wordCount = abstract
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !abstract.trim()) return;
    onSubmitPaper({
      title,
      author,
      email,
      affiliation: affiliation || 'Department of HSS, Participating Institution',
      panelId,
      categoryTag,
      abstract,
      keywords: keywords || 'Digital Humanities, Social Transformation, Indic Corpora',
    });
    const randomNum = Math.floor(10 + Math.random() * 89);
    setSubmittedRef(panelId === 'panel-02' ? `EHSS-P02-${randomNum}` : `EHSS-P15-${randomNum}`);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setTitle('');
    setAuthor('');
    setEmail('');
    setAffiliation('');
    setAbstract('');
    setKeywords('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border border-slate-200 border-t-4 border-t-[#0F172A] bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9A6B2F]">
              EHSS 2026 • Double-Blind Peer Review Portal
            </div>
            <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
              Submit Extended Abstract (Track 02 & Track 03)
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedRef ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1B4332]/10 text-[#1B4332]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="mt-4 font-serif text-xl font-bold text-slate-900">
              Extended Abstract Logged for Double-Blind Review
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Your manuscript proposal has been assigned reference code{' '}
              <span className="font-mono font-bold text-slate-900">{submittedRef}</span> and added to the
              live Symposium Proceedings preview below.
            </p>
            <div className="mt-6 rounded border border-slate-200 bg-[#F7F9FB] p-4 text-left text-xs text-slate-700 max-w-md mx-auto space-y-1.5">
              <div>
                <span className="font-semibold text-slate-900">Corresponding Author:</span> {author}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Assigned Panel:</span>{' '}
                {panelId === 'panel-02'
                  ? 'Panel 02 — Digitalization, Education & Social Practice'
                  : 'Panel 14 & 15 — Digital Humanities & Computation'}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Editorial Protocol:</span> APA 7th Edition • Plagiarism Threshold &lt; 10%
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleResetAndClose}
                className="rounded bg-[#0F172A] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                View in Symposium Proceedings
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Corresponding Author Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Dr. Labanya Das"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Institutional Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@hs.iitr.ac.in"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  University / Institutional Affiliation *
                </label>
                <input
                  type="text"
                  required
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  placeholder="e.g., Dept. of HSS, IIT Roorkee"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Target Parallel Panel *
                </label>
                <select
                  value={panelId}
                  onChange={(e) => setPanelId(e.target.value as 'panel-02' | 'panel-14-15')}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                >
                  <option value="panel-02">Panel 02: Education & Sustainable Social Practice</option>
                  <option value="panel-14-15">Panel 14/15: Digital Humanities & Computation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Paper Title (APA 7th Title Case) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter full research paper title..."
                className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Thematic Sub-Discipline
                </label>
                <select
                  value={categoryTag}
                  onChange={(e) => setCategoryTag(e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                >
                  <option value="Epistemic Archiving">Epistemic Archiving & Indic Corpora</option>
                  <option value="Subaltern Publics">Subaltern Publics & Counter-Discourse</option>
                  <option value="Social Work Praxes">Social Work Praxes & Inclusive Pedagogy</option>
                  <option value="Digital Ecology">Digital Carbon Footprints & Ecology</option>
                  <option value="Surveillance Critique">Algorithmic Society & Surveillance Critique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  4–6 Indexed Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Indic Corpora, Digital Publics, Archive..."
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Extended Abstract (300–500 words protocol) *
                </label>
                <span className="text-xs font-mono text-slate-500 tabular-nums">
                  {wordCount} words
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="State theoretical context, research methodology, and contribution to postcolonial nation-building..."
                className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-xs text-slate-500">
                Secretariat: <strong className="text-slate-700">hss@iitr.ac.in</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#0F172A] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  Submit Abstract to Track 02/03
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: 'faculty' | 'scholar';
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTier = 'faculty',
}) => {
  const [tier, setTier] = React.useState<'faculty' | 'scholar'>(initialTier);
  const [fullName, setFullName] = React.useState('');
  const [institution, setInstitution] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [paperRef, setPaperRef] = React.useState('');
  const [accommodation, setAccommodation] = React.useState('guest-house');
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => {
    setTier(initialTier);
  }, [initialTier]);

  if (!isOpen) return null;

  const fee = tier === 'faculty' ? '₹ 3,000' : '₹ 2,000';

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setConfirmed(true);
  };

  const handleClose = () => {
    setConfirmed(false);
    setFullName('');
    setInstitution('');
    setEmail('');
    setPaperRef('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl rounded-lg border border-slate-200 border-t-4 border-t-[#9A6B2F] bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9A6B2F]">
              EHSS 2026 • Delegate Registration Desk
            </div>
            <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
              Symposium Delegate Registration (9–10 Oct 2026)
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close registration modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1B4332]/10 text-[#1B4332]">
              <UserCheck className="h-6 w-6" />
            </div>
            <h4 className="mt-4 font-serif text-xl font-bold text-slate-900">
              Provisional Delegate Pass Generated
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Welcome to EHSS 2026 at IIT Roorkee, <strong>{fullName}</strong>. Your registration
              for the two-day offline conference has been recorded.
            </p>
            <div className="mt-5 rounded border border-slate-200 bg-[#F7F9FB] p-4 text-left text-xs text-slate-700 max-w-md mx-auto space-y-1.5 tabular-nums">
              <div>
                <span className="font-semibold text-slate-900">Tariff Category:</span>{' '}
                {tier === 'faculty' ? 'Standard Delegate / Faculty (₹ 3,000)' : 'Research Scholar / Student (₹ 2,000)'}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Entitlements:</span> Conference kit, ISBN proceedings volume, lunch & high-tea (9–10 Oct 2026)
              </div>
              <div>
                <span className="font-semibold text-slate-900">Venue:</span> Department of Humanities & Social Sciences, IIT Roorkee
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleClose}
                className="rounded bg-[#0F172A] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTier('faculty')}
                className={`rounded border p-3.5 text-left transition-colors cursor-pointer ${
                  tier === 'faculty'
                    ? 'border-[#0F172A] bg-[#F7F9FB]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Standard Delegate / Faculty
                </div>
                <div className="mt-1 font-serif text-xl font-bold text-slate-900 tabular-nums">
                  ₹ 3,000
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Includes kit, lunch, high-tea & book of abstracts
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTier('scholar')}
                className={`rounded border p-3.5 text-left transition-colors cursor-pointer ${
                  tier === 'scholar'
                    ? 'border-[#0F172A] bg-[#F7F9FB]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Research Scholars / Students
                </div>
                <div className="mt-1 font-serif text-xl font-bold text-slate-900 tabular-nums">
                  ₹ 2,000
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Concessional rate for bona fide research scholars
                </div>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Delegate Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Prof. / Dr. / Scholar Name"
                className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="delegate@university.ac.in"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Institution / University *
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g., IIT Roorkee / JNU / DU"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Accepted Paper Ref (Optional)
                </label>
                <input
                  type="text"
                  value={paperRef}
                  onChange={(e) => setPaperRef(e.target.value)}
                  placeholder="e.g., EHSS-P02-01"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Campus Accommodation Preference
                </label>
                <select
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#0F172A] focus:outline-none"
                >
                  <option value="guest-house">IIT Roorkee Khosla International House</option>
                  <option value="faculty-home">visitors Hostel / Faculty Guest House</option>
                  <option value="self">Self-Arranged in Roorkee</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <div className="text-xs text-slate-600 tabular-nums">
                Payable Tariff: <strong className="text-sm font-bold text-slate-900">{fee}</strong>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#0F172A] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  Confirm Delegate Registration
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface TrackScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmit: () => void;
}

export const TrackScopeModal: React.FC<TrackScopeModalProps> = ({
  isOpen,
  onClose,
  onOpenSubmit,
}) => {
  if (!isOpen) return null;

  const handleDownloadTextBrochure = () => {
    const content = `EHSS 2026 — DEPARTMENT OF HUMANITIES & SOCIAL SCIENCES, IIT ROORKEE
In Association with NPTEL, IIT Madras
Dates: 9th – 10th October 2026 | Mode: Two-Day Offline Conference

TRACK 02 & TRACK 03 SCOPE DOSSIER:
Digitalization of Humanities & Enhancing Social Transformation
Panel Codes: P-02 / P-14 / P-15

1. CURATED RESEARCH INQUIRIES:
- Thematic Area 01: Epistemic Archiving & Indic Corpora
- Thematic Area 02: Algorithmic Society, Media & Affect
- Thematic Area 03: Inclusive Pedagogy & Litscape Observatories
- Thematic Area 04: Digital Carbon Footprints & Ecological Costs

2. PLENARY KEYNOTE ORATIONS:
- Dr. Avishek Parui (IIT Madras): Memory Studies, Medical Humanities & Critical Theory: Prosthetic Recall in Algorithmic Times
- Prof. Girish Nath Jha (JNU New Delhi): Computational Lexicography, Indic Corpora & Multilingual Sovereign AI Architectures

3. IMPORTANT MILESTONES:
- Submission Deadline: 10th September 2026
- Acceptance Notification: 20th September 2026
- Registration Cutoff: 25th September 2026
- Symposium Convening: 9th – 10th October 2026

Contact Secretariat: Prof. Smita Jha, Head & Conference Convener (hss@iitr.ac.in)
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EHSS_2026_Track_02_03_Scope_Dossier.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border border-slate-200 border-t-4 border-t-[#0F172A] bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              DOCUMENT REF: EHSS-2026-SCOPE-T02-T03
            </div>
            <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
              Track Scope Monograph & Editorial Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:text-slate-900">
            Digital mediation actively reshapes humanities scholarship across postcolonial South Asia. Track 02 (Digitalization of Humanities) and Track 03 (Enhancing Social Transformation) convene computational linguists, literary theorists, ecocritics, and field social workers across two dedicated parallel panels at IIT Roorkee.
          </p>

          <div className="rounded border border-slate-200 bg-[#F7F9FB] p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Symposium Committee & Scientific Chairs
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COMMITTEE_MEMBERS.map((member) => (
                <div key={member.id} className="border-b border-slate-200/70 pb-2 last:border-b-0">
                  <div className="text-xs font-bold text-slate-900">{member.name}</div>
                  <div className="text-[11px] font-medium text-[#9A6B2F]">{member.role}</div>
                  <div className="text-[11px] text-slate-500">{member.institution}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded border border-slate-200 p-3.5">
              <div className="font-bold text-slate-900">Panel 02 Venue & Schedule</div>
              <div className="mt-1 text-slate-600">
                Day 1: Friday, 9th October 2026 • 14:30 – 16:30 IST • Seminar Hall A, Dept. of HSS
              </div>
            </div>
            <div className="rounded border border-slate-200 p-3.5">
              <div className="font-bold text-slate-900">Panel 14 & 15 Venue & Schedule</div>
              <div className="mt-1 text-slate-600">
                Day 2: Saturday, 10th October 2026 • 11:30 – 13:30 IST • Conference Complex II
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <button
            onClick={handleDownloadTextBrochure}
            className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Plain-Text Dossier (.TXT)</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenSubmit();
              }}
              className="rounded bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              Submit Extended Abstract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AllTracksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: SymposiumTrackOverview[];
}

export const AllTracksModal: React.FC<AllTracksModalProps> = ({ isOpen, onClose, tracks }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl rounded-lg border border-slate-200 border-t-4 border-t-[#0F172A] bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9A6B2F]">
              EHSS 2026 • Master Symposium Architecture
            </div>
            <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
              All Conference Tracks & Interdisciplinary Matrix
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close tracks directory"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className={`rounded-lg border p-4 transition-colors ${
                track.isCurrent
                  ? 'border-[#0F172A] bg-[#F7F9FB]'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold uppercase text-slate-700">
                  {track.code}
                </span>
                <span className="tabular-nums">
                  {track.panelsCount} Parallel Panels · {track.papersAccepted} Accepted Papers
                  {track.isCurrent ? ' · Currently Viewing' : ''}
                </span>
              </div>
              <h4 className="mt-1.5 font-serif text-base font-bold text-slate-900">
                {track.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{track.summary}</p>
              <div className="mt-2.5 text-xs font-medium text-slate-700">
                Scientific Leads: <span className="text-slate-900">{track.leadFaculty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="rounded bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            Return to Track 02 & 03 Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};

interface KeynoteModalProps {
  speaker: KeynoteSpeaker | null;
  onClose: () => void;
}

export const KeynoteDetailModal: React.FC<KeynoteModalProps> = ({ speaker, onClose }) => {
  if (!speaker) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl rounded-lg border border-slate-200 border-t-4 border-t-[#9A6B2F] bg-white p-6 md:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>{speaker.plenaryLabel}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-[#9A6B2F]">{speaker.date}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close speaker profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <img
            src={speaker.portraitUrl}
            alt={speaker.name}
            referrerPolicy="no-referrer"
            className="h-20 w-20 rounded-full object-cover border-2 border-[#9A6B2F]/40 shrink-0"
          />
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">{speaker.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{speaker.credentials}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 tabular-nums">
              {speaker.time} · {speaker.venue}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded border border-slate-200 bg-[#F7F9FB] p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Plenary Keynote Oration
          </div>
          <p className="mt-1 font-serif text-sm italic font-bold text-slate-900">
            {speaker.lectureTitle}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-700">
            {speaker.abstractSummary}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Scholarly Biography
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{speaker.fullBio}</p>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="rounded bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
