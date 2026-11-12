import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, RotateCcw, 
  Send, Layers, 
  Wallet, AlertTriangle, Presentation
} from 'lucide-react';

interface SchoolFeedbackFormData {
  fullName: string;
  designation: string;
  schoolName: string;
  city: string;
  email: string;
  currentApproach: string;
  relevantUseCase: string;
  adoptionConcerns: string[];
  deviceConstraints: string;
  evaluationNeeds: string[];
  interestDemo: boolean;
  interestPilot: boolean;
  additionalNotes: string;
}

export const ForSchoolsSection: React.FC = () => {
  const [formData, setFormData] = useState<SchoolFeedbackFormData>({
    fullName: '',
    designation: '',
    schoolName: '',
    city: '',
    email: '',
    currentApproach: 'Textbook theory & lectures',
    relevantUseCase: 'Commerce / Economics Class Activity (Classes 9–12)',
    adoptionConcerns: [],
    deviceConstraints: 'Standard computer lab (Windows laptops / PCs with internet)',
    evaluationNeeds: ['A student demonstration', 'Evidence of learning value'],
    interestDemo: true,
    interestPilot: false,
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SchoolFeedbackFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<{
    data: SchoolFeedbackFormData;
    referenceId: string;
    timestamp: string;
  } | null>(null);

  const designationsList = [
    'Principal / Head of School',
    'Vice Principal / Academic Director',
    'High School Teacher (Commerce / Economics / Business Studies)',
    'Career Counsellor',
    'Atal Tinkering Lab / Innovation Coordinator',
    'Curriculum Lead / Administrator',
    'Other School Stakeholder',
  ];

  const currentApproachOptions = [
    'Textbook theory & lectures',
    'Invited guest lectures & entrepreneur talks',
    'Annual science / business fest exhibition',
    'Atal Tinkering Lab (ATL) projects',
    'No formal entrepreneurship offering currently',
  ];

  const useCaseOptions = [
    'Commerce / Economics Class Activity (Classes 9–12)',
    'Atal Tinkering Lab (ATL) Experiential Sandbox',
    'Weekend Innovation / Entrepreneurship Club',
    'Pre-College Summer Immersion Program',
    'Career Exploration & Practical Finance Module',
  ];

  const concernsList = [
    'Fitting within already tight 45-minute timetable periods',
    'Hardware / slow internet constraints in school computer labs',
    'Teacher preparation time & training requirements',
    'Clarity on curriculum alignment & learning rubrics',
    'Student data privacy and screen-time considerations',
    'Commercial pricing transparency for school budgets',
  ];

  const deviceConstraintsList = [
    'Standard computer lab (Windows laptops / PCs with internet)',
    'School Chromebook carts with web browser',
    'Students own devices (BYOD laptops / tablets)',
    'Single teacher projection screen in smart classroom',
  ];

  const evaluationNeedsList = [
    'A live student demonstration in our lab',
    'Documented curriculum mapping and assessment rubric',
    'Transparent hardware & data privacy documentation',
    'References from fellow school educators',
    'A structured teacher facilitation guide',
  ];

  const handleCheckboxToggle = (
    field: 'adoptionConcerns' | 'evaluationNeeds',
    value: string
  ) => {
    setFormData((prev) => {
      const list = prev[field];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof SchoolFeedbackFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.designation) errs.designation = 'Please select your role / designation';
    if (!formData.schoolName.trim()) errs.schoolName = 'School name is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid official school email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const referenceId = `EDU-VAL-${Math.floor(1000 + Math.random() * 9000)}`;
      const submission = {
        data: { ...formData },
        referenceId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('venturelab_school_submissions') || '[]');
        existing.push(submission);
        localStorage.setItem('venturelab_school_submissions', JSON.stringify(existing));
      } catch {
        // storage fallback
      }

      setIsSubmitting(false);
      setSubmittedRecord(submission);
    }, 500);
  };

  const resetForm = () => {
    setSubmittedRecord(null);
    setFormData({
      fullName: '',
      designation: '',
      schoolName: '',
      city: '',
      email: '',
      currentApproach: 'Textbook theory & lectures',
      relevantUseCase: 'Commerce / Economics Class Activity (Classes 9–12)',
      adoptionConcerns: [],
      deviceConstraints: 'Standard computer lab (Windows laptops / PCs with internet)',
      evaluationNeeds: ['A live student demonstration in our lab', 'Documented curriculum mapping and assessment rubric'],
      interestDemo: true,
      interestPilot: false,
      additionalNotes: '',
    });
    setErrors({});
  };

  return (
    <section id="for-schools" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Institutional Pilot &amp; Feedback</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Could Your Students Learn by Experiencing Business?
        </h2>

        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          VENTURELAB collaborates directly with high school principals, economics faculty, and Atal Tinkering Lab coordinators. Help us tailor simulation parameters to your curriculum.
        </p>
      </div>

      {/* Demonstration Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-[#22251F]">1. 2D Simulation Lab</div>
          <p className="text-xs text-[#575952] leading-relaxed">
            Clean, accessible virtual startup headquarters designed for focused pedagogical choices on school Chromebooks and laptops.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-[#22251F]">2. Financial Modeling</div>
          <p className="text-xs text-[#575952] leading-relaxed">
            ₹1,00,000 capital budgeting, unit contribution margins, burn rate, and runway calculation in beginner-friendly terms.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#F8EFEA] text-[#B9684D] flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-[#22251F]">3. Business Shocks</div>
          <p className="text-xs text-[#575952] leading-relaxed">
            Unplanned demand surges, supply chain cost jumps, and rival moves with clear, deterministic consequences.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
            <Presentation className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-[#22251F]">4. Capstone Pitch</div>
          <p className="text-xs text-[#575952] leading-relaxed">
            Structured 7-part pitch deck defending choices to investor personas, producing a printable reflection report.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9]">
        {submittedRecord ? (
          <div className="py-8 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#22251F]">
                Thank You for Your Guidance!
              </h3>
              <p className="text-xs text-[#575952] max-w-md mx-auto">
                Your feedback has been recorded locally with Reference ID{' '}
                <span className="font-mono font-bold text-[#234B3A] bg-[#E8F0EC] px-2 py-0.5 rounded border border-[#C4D9CD]">
                  {submittedRecord.referenceId}
                </span>.
              </p>
            </div>

            <button
              onClick={resetForm}
              className="btn-outline text-xs py-2 px-4 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Form</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#D9D5C9] pb-4">
              <h3 className="text-lg font-bold text-[#22251F]">
                Educator Evaluation &amp; Pilot Request
              </h3>
              <p className="text-xs text-[#575952] mt-0.5">
                Submitting this form does not imply any financial or curriculum adoption commitment. It informs our pedagogical design.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#22251F] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajeshwari Nair"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg bg-[#F6F3EA] border text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] ${
                    errors.fullName ? 'border-[#B9684D]' : 'border-[#D9D5C9]'
                  }`}
                />
                {errors.fullName && <p className="text-[#B9684D] text-[10px] mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#22251F] mb-1">
                  Designation / Role *
                </label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg bg-[#F6F3EA] border text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] ${
                    errors.designation ? 'border-[#B9684D]' : 'border-[#D9D5C9]'
                  }`}
                >
                  <option value="">Select your designation...</option>
                  {designationsList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.designation && <p className="text-[#B9684D] text-[10px] mt-0.5">{errors.designation}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#22251F] mb-1">
                  School / Institution Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Heritage School"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg bg-[#F6F3EA] border text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] ${
                    errors.schoolName ? 'border-[#B9684D]' : 'border-[#D9D5C9]'
                  }`}
                />
                {errors.schoolName && <p className="text-[#B9684D] text-[10px] mt-0.5">{errors.schoolName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#22251F] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi / Bengaluru / Pune"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg bg-[#F6F3EA] border text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] ${
                    errors.city ? 'border-[#B9684D]' : 'border-[#D9D5C9]'
                  }`}
                />
                {errors.city && <p className="text-[#B9684D] text-[10px] mt-0.5">{errors.city}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#22251F] mb-1">
                  Official School / Work Email *
                </label>
                <input
                  type="email"
                  placeholder="e.g. principal@heritageschool.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg bg-[#F6F3EA] border text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] ${
                    errors.email ? 'border-[#B9684D]' : 'border-[#D9D5C9]'
                  }`}
                />
                {errors.email && <p className="text-[#B9684D] text-[10px] mt-0.5">{errors.email}</p>}
              </div>
            </div>

            {/* Checkboxes: Evaluation Needs */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-[#22251F]">
                What would you need to see before considering this for your school?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {evaluationNeedsList.map((need) => {
                  const checked = formData.evaluationNeeds.includes(need);
                  return (
                    <label
                      key={need}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs cursor-pointer transition-all ${
                        checked
                          ? 'bg-[#E8F0EC]/40 border-[#234B3A] text-[#22251F] font-medium'
                          : 'bg-[#FAF8F5] border-[#D9D5C9] text-[#575952]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxToggle('evaluationNeeds', need)}
                        className="rounded accent-[#234B3A]"
                      />
                      <span>{need}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 border-t border-[#D9D5C9] flex items-center justify-between">
              <span className="text-[11px] text-[#7E8078]">
                Confidential &bull; No marketing spam
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-xs py-2 px-5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Recording...' : 'Submit Evaluation Feedback'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </section>
  );
};
