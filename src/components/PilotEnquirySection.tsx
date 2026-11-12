import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  BookOpen, 
  Monitor, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface PilotEnquiryFormData {
  schoolName: string;
  contactName: string;
  email: string;
  professionalRole: string;
  classesOfInterest: string[];
  currentActivities: string;
  availableDevices: string[];
  implementationPreference: string;
  questionsOrConcerns: string;
  pilotInterestLevel: string;
}

const STORAGE_KEY_ENQUIRIES = 'venturelab_pilot_enquiries_log';

export const PilotEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState<PilotEnquiryFormData>({
    schoolName: '',
    contactName: '',
    email: '',
    professionalRole: 'Academic Coordinator',
    classesOfInterest: ['Class 11', 'Class 12'],
    currentActivities: 'CBSE Entrepreneurship Subject',
    availableDevices: ['Computer Lab Desktops', 'Laptops'],
    implementationPreference: 'Integrated into weekly timetable (1-2 periods/week)',
    questionsOrConcerns: '',
    pilotInterestLevel: 'Schedule a 30-minute online walkthrough for our faculty',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedLog, setSubmittedLog] = useState<PilotEnquiryFormData | null>(null);

  const roles = [
    'School Principal / Head of Institution',
    'Academic Coordinator / Dean of Academics',
    'PGT Commerce / Economics Educator',
    'Atal Tinkering Lab (ATL) In-charge',
    'Career Counselor / Student Advisor',
    'School Trustee / Management Representative',
  ];

  const classOptions = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'ATL / Innovation Club'];
  const deviceOptions = ['Computer Lab Desktops', 'Laptops (School or BYOD)', 'Chromebooks', 'Tablets / iPads'];

  const currentActivityOptions = [
    'Formal CBSE / State Board Entrepreneurship Subject',
    'Economics / Commerce Class Projects',
    'Atal Tinkering Lab (ATL) Hands-on Projects',
    'Annual School Business Fest / Exhibition',
    'No dedicated entrepreneurship curriculum yet',
  ];

  const implementationOptions = [
    'Integrated into weekly timetable (1-2 periods/week)',
    'Atal Tinkering Lab / Innovation Club (After-school)',
    'Intensive 2-day Entrepreneurship Boot-camp',
    'Pre-College Summer Immersion (Vacation module)',
  ];

  const pilotLevels = [
    'Schedule a 30-minute online walkthrough for our faculty',
    'Express interest in a single-class classroom pilot demonstration',
    'Request curriculum documentation and syllabus mapping',
    'General exploratory inquiry for next academic year',
  ];

  const handleToggleClass = (cls: string) => {
    setFormData((prev) => {
      const exists = prev.classesOfInterest.includes(cls);
      return {
        ...prev,
        classesOfInterest: exists
          ? prev.classesOfInterest.filter((c) => c !== cls)
          : [...prev.classesOfInterest, cls],
      };
    });
  };

  const handleToggleDevice = (dev: string) => {
    setFormData((prev) => {
      const exists = prev.availableDevices.includes(dev);
      return {
        ...prev,
        availableDevices: exists
          ? prev.availableDevices.filter((d) => d !== dev)
          : [...prev.availableDevices, dev],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const existing = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
      const list = existing ? JSON.parse(existing) : [];
      list.push({ ...formData, submittedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(list));
    } catch {
      // storage fallback
    }

    setSubmittedLog(formData);
    setSubmitted(true);
  };

  return (
    <section id="pilot-enquiry" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#D9D5C9] bg-[#F6F3EA] text-left">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SCHOOL COLLABORATION &amp; PILOT ENQUIRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#22251F] tracking-tight">
            Explore a Pilot Demonstration for Your School
          </h2>
          <p className="text-sm text-[#575952] leading-relaxed">
            VENTURELAB is currently in academic evaluation. We invite school principals, coordinators, and entrepreneurship teachers to review the platform and discuss classroom suitability.
          </p>
        </div>

        {/* Form Container */}
        <div className="card-clean p-6 sm:p-10 bg-[#FFFFFF] border border-[#D9D5C9]">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-[#22251F]">Pilot Demonstration Request Recorded</h3>
                <p className="text-xs text-[#575952] leading-relaxed">
                  Thank you, <strong>{submittedLog?.contactName}</strong>. Your enquiry for <strong>{submittedLog?.schoolName}</strong> ({submittedLog?.professionalRole}) has been logged in the prototype evaluation registry.
                </p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline text-xs py-2 px-4 mt-2"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9] text-xs text-[#575952] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#234B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#22251F]">Prototype Evaluation Notice: </strong>
                  This form allows educators to register interest and document infrastructure needs. Submissions are stored locally for prototype demonstration.
                </div>
              </div>

              {/* School & Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#22251F] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#234B3A]" />
                    <span>School / Institution Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder="e.g. The Heritage School / Ryan International"
                    className="w-full bg-[#F6F3EA] border border-[#D9D5C9] rounded-lg p-2.5 text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#22251F] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#234B3A]" />
                    <span>Your Name &amp; Email *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Contact Name"
                      className="w-full bg-[#F6F3EA] border border-[#D9D5C9] rounded-lg p-2.5 text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="School Email"
                      className="w-full bg-[#F6F3EA] border border-[#D9D5C9] rounded-lg p-2.5 text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Role */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#22251F]">
                  Your Professional Role *
                </label>
                <select
                  value={formData.professionalRole}
                  onChange={(e) => setFormData({ ...formData, professionalRole: e.target.value })}
                  className="w-full bg-[#F6F3EA] border border-[#D9D5C9] rounded-lg p-2.5 text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Classes of Interest */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#22251F] block">
                  Student Cohorts of Interest (Select all that apply) *
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {classOptions.map((cls) => {
                    const isSelected = formData.classesOfInterest.includes(cls);
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => handleToggleClass(cls)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#234B3A] text-[#F6F3EA]'
                            : 'bg-[#FAF8F5] text-[#575952] border border-[#D9D5C9] hover:bg-[#F0EDE4]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Activities */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#22251F] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#234B3A]" />
                  <span>Current Entrepreneurship Activities at School</span>
                </label>
                <select
                  value={formData.currentActivities}
                  onChange={(e) => setFormData({ ...formData, currentActivities: e.target.value })}
                  className="w-full bg-[#F6F3EA] border border-[#D9D5C9] rounded-lg p-2.5 text-xs text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                >
                  {currentActivityOptions.map((act) => (
                    <option key={act} value={act}>
                      {act}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-[#D9D5C9] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#7E8078]">
                  Stored locally for evaluation purposes
                </span>

                <button
                  type="submit"
                  className="btn-primary text-xs py-2.5 px-5 w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Pilot Enquiry</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
