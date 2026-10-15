import React, { useState } from 'react';
import { 
  Building2, Mail, User, MapPin, Briefcase, MessageSquare, 
  CheckCircle2, ArrowRight, ShieldCheck, RotateCcw, Copy
} from 'lucide-react';
import type { PartnershipFormData } from '../types';

export const PartnershipSection: React.FC = () => {
  // Engagement type switcher
  const [activeTab, setActiveTab] = useState<'discuss' | 'pilot'>('pilot');
  const [copied, setCopied] = useState(false);


  const [formData, setFormData] = useState<PartnershipFormData>({
    fullName: '',
    designation: '',
    institution: '',
    email: '',
    city: '',
    interestType: 'Exploring a potential pilot',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    data: PartnershipFormData;
    referenceId: string;
    submittedAt: string;
  } | null>(null);

  // Email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Please select or specify your designation.';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Please enter your school or institution name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Official email address is required.';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Please provide a valid official email address.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city/location.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Your consent is required to receive a response.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Development mode submission simulation
    setTimeout(() => {
      const referenceId = `EDU-VAL-${Math.floor(1000 + Math.random() * 9000)}`;
      const submissionRecord = {
        data: { ...formData },
        referenceId,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Store in browser localStorage for local review in dev mode
      try {
        const existing = JSON.parse(localStorage.getItem('ventured_pilot_inquiries') || '[]');
        existing.push(submissionRecord);
        localStorage.setItem('ventured_pilot_inquiries', JSON.stringify(existing));
      } catch (err) {
        console.warn('Storage disabled or unavailable:', err);
      }

      setSubmittedData(submissionRecord);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      designation: '',
      institution: '',
      email: '',
      city: '',
      interestType: activeTab === 'pilot' ? 'Exploring a potential pilot' : 'Providing feedback',
      message: '',
      consent: false,
    });
    setErrors({});
  };

  return (
    <section id="partnership" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
          <Building2 className="w-3.5 h-3.5" />
          Institutional Collaboration
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Help Shape the Future of Entrepreneurship Education.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          We are exploring an interactive entrepreneurship simulation for school students and would value your perspective.
        </p>
        <p className="mt-2 text-slate-400 text-sm max-w-2xl mx-auto">
          We would like to understand how your school approaches entrepreneurship education, which challenges students face, and whether a simulated business journey could complement your existing activities.
        </p>
      </div>

      {/* Two Engagement Paths Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
        <button
          type="button"
          onClick={() => {
            setActiveTab('discuss');
            setFormData(prev => ({ ...prev, interestType: 'Providing feedback' }));
          }}
          className={`p-5 rounded-2xl text-left transition-all border ${
            activeTab === 'discuss'
              ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
              OPTION A
            </span>
            {activeTab === 'discuss' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </div>
          <h3 className="text-base font-bold text-white mb-1">Discuss the Concept</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For educators, principals, and counsellors who want to share their perspectives, offer curricular advice, or ask questions.
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('pilot');
            setFormData(prev => ({ ...prev, interestType: 'Exploring a potential pilot' }));
          }}
          className={`p-5 rounded-2xl text-left transition-all border ${
            activeTab === 'pilot'
              ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
              OPTION B • RECOMMENDED
            </span>
            {activeTab === 'pilot' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </div>
          <h3 className="text-base font-bold text-white mb-1">Explore a Potential School Pilot</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For progressive schools interested in evaluating an early prototype cohort during upcoming academic terms.
          </p>
        </button>
      </div>

      {/* Main Form Container or Confirmation Card */}
      <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative">
        {submittedData ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Inquiry Logged • Reference ID: {submittedData.referenceId}
              </span>
              <h3 className="text-2xl font-bold text-white">Thank You for Connecting</h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                We have received your request regarding{' '}
                <strong className="text-cyan-300">{submittedData.data.institution}</strong>.
              </p>
            </div>

            {/* Submitted summary card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Lead Contact:</span>
                <span className="font-semibold text-slate-200">
                  {submittedData.data.fullName} ({submittedData.data.designation})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Official Email:</span>
                <span className="font-mono text-cyan-400">{submittedData.data.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Institution & Location:</span>
                <span className="font-semibold text-slate-200">
                  {submittedData.data.institution}, {submittedData.data.city}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Engagement Scope:</span>
                <span className="font-semibold text-violet-300">{submittedData.data.interestType}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed text-left">
              📌 <strong>Next Step:</strong> As part of our exploratory validation phase, our product design lead will reach out to schedule a brief 20-minute exploratory video call to understand your school&rsquo;s specific requirements.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(submittedData.referenceId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/60 text-xs font-semibold transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied to Clipboard!' : 'Copy Reference ID'}
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Transparent Development Mode Notification */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">Presentation Validation Mode:</strong>
                <span>
                  This form is fully functional for client demonstration. Submissions are validated and stored locally in this browser session. In production, this directly hooks to your institutional CRM or database endpoint.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-400">{errors.fullName}</p>}
              </div>

              {/* Designation */}
              <div className="space-y-1.5">
                <label htmlFor="designation" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Designation / Role <span className="text-rose-400">*</span>
                </label>
                <select
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-slate-100 focus:outline-none transition-all ${
                    errors.designation ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                >
                  <option value="">Select your role...</option>
                  <option value="School Principal">School Principal / Head of School</option>
                  <option value="Vice Principal / Academic Dean">Vice Principal / Academic Dean</option>
                  <option value="School Counsellor">School / Career Counsellor</option>
                  <option value="Entrepreneurship / Commerce Educator">Entrepreneurship / Commerce Educator</option>
                  <option value="Innovation / ATL Coordinator">Innovation / ATL Coordinator</option>
                  <option value="School Management / Trustee">School Trustee / Management Board</option>
                  <option value="Other Institutional Leader">Other Institutional Leader</option>
                </select>
                {errors.designation && <p className="text-[11px] text-rose-400">{errors.designation}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Institution Name */}
              <div className="space-y-1.5">
                <label htmlFor="institution" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  School or Institution <span className="text-rose-400">*</span>
                </label>
                <input
                  id="institution"
                  type="text"
                  placeholder="e.g. Heritage Valley Public School"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all ${
                    errors.institution ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.institution && <p className="text-[11px] text-rose-400">{errors.institution}</p>}
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  City / Location <span className="text-rose-400">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. New Delhi / Bengaluru / Pune"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all ${
                    errors.city ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-rose-400">{errors.city}</p>}
              </div>
            </div>

            {/* Official Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Official Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="principal@schoolname.edu.in"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all ${
                  errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
            </div>

            {/* Interested In: 3 options */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Primary Area of Interest <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['Learning more', 'Providing feedback', 'Exploring a potential pilot'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, interestType: type }))}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      formData.interestType === type
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-sm'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                Optional Note / Curricular Priorities
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Share any specific requirements, current entrepreneurship initiatives, or questions for our team..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span className="text-xs text-slate-400 leading-snug">
                  I agree to receive a response regarding this educational enquiry and confirm that this inquiry is on behalf of a school or educational institution.
                </span>
              </label>
              {errors.consent && <p className="text-[11px] text-rose-400 pl-6">{errors.consent}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-950/50 hover:shadow-cyan-900/70 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Validating & Logging Inquiry...</span>
              ) : (
                <>
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
