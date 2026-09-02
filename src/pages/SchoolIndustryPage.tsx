import React from 'react';
import { PageRoute } from '../types';
import { EducationDashboardMockup } from '../components/dashboards/EducationDashboardMockup';
import { CTASection } from '../components/CTASection';
import { 
  GraduationCap, 
  FileSpreadsheet, 
  UserX, 
  CreditCard, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  CalendarCheck, 
  ArrowRight 
} from 'lucide-react';

interface SchoolIndustryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const SchoolIndustryPage: React.FC<SchoolIndustryPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Industry: Schools & Education</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Digital systems for modern education administration.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              A complete, unified school management system to track student records, daily attendance, term tuition fees, exam results, and automated parent communication.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
              >
                <span>Book Education Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/solutions')}
                className="inline-flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-white text-[#0F172A] border border-[#CBD5E1] px-6 py-3.5 rounded-lg text-sm font-semibold transition-all"
              >
                <span>Explore All Solutions</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-2 sm:p-3 bg-[#F1F5F9] rounded-2xl border border-[#CBD5E1] shadow-md">
              <EducationDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-2">Administrative Bottlenecks</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              The Operational Challenges in School Management
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              Manual paperwork diverts teachers and administrators away from academic quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Student Records</h3>
              <p className="text-xs text-[#475569]">
                Scattered physical admission files and disjointed student profiles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <UserX className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Attendance Tracking</h3>
              <p className="text-xs text-[#475569]">
                Paper roll calls prone to discrepancies and delayed absence alerts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Fee Collection</h3>
              <p className="text-xs text-[#475569]">
                Uncollected tuition, missed installment dates, and manual paper receipts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Exam Results</h3>
              <p className="text-xs text-[#475569]">
                Weeks spent manually tabulating grades and compiling report cards.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">Parent Communication</h3>
              <p className="text-xs text-[#475569]">
                Circulars lost in backpacks and lack of direct notice delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution & 4. Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">The Solution</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            DeepliX Education System Modules
          </h2>
          <p className="text-[#475569] text-base mt-2">
            A centralized digital platform connecting the principal's office, teachers, bursar, and parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">1. Student Information & Admissions</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Complete student profiles including contact information, medical records, guardian contacts, previous school transcripts, and class enrollments.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Digital admissions and registration portal</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Transfer certificate generation</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">2. Attendance & Absence Tracking</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Teachers record class attendance in 30 seconds via tablet or desktop. Unexcused absences immediately trigger automated notifications to registered parents.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Period-by-period and daily roll call</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Automatic threshold alerts for low attendance</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">3. Fees Collection & Accounting Ledger</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Flexible fee structure setup (Tuition, Transport, Lab, Extracurricular). Generates itemized invoices, tracks partial payments, and issues instant digital receipts.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Automated fee reminder notices to parents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Real-time outstanding balance ledger</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">4. Exam Results & Report Cards</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Grade input sheets with automatic weighting, percentile calculation, GPA tabulation, and branded PDF report card generation for term-end distribution.
            </p>
            <ul className="text-xs text-[#334155] space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Custom grading scales and remarks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Academic performance trend analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onNavigate={onNavigate}
        title="Ready to modernize your school administration?"
        description="Book a consultation with our education systems team to evaluate your institution's requirements."
        buttonText="Book Education Consultation"
      />
    </div>
  );
};
