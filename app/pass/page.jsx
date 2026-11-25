'use client';

import { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Users,
  ShieldCheck,
  MessageSquare,
  Award,
  ArrowRight
} from 'lucide-react';
import CheckoutModal from '@/components/CheckoutModal';

export default function MonthlyPassPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black py-10 sm:py-16">
      <div className="container-custom max-w-5xl space-y-10 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-black uppercase tracking-[0.25em]">
            <Sparkles size={14} /> Full Month Access
          </div>
          <h1 className="text-3xl sm:text-6xl font-serif font-medium text-gray-950 leading-tight">
            The Cresthour <br className="hidden sm:block" />
            <span className="text-deepGreen italic">All-Access Monthly Pass</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Attend all 4 weekly live workshops for a flat ₹800 (instead of ₹1,000+ individually). Complete with lifetime recordings, code cheat sheets, and private cohort community access.
          </p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 sm:px-8 py-4 bg-deepGreen hover:bg-deepGreen-dark text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] sm:tracking-[0.25em] shadow-xl shadow-deepGreen/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Monthly Pass Now • ₹800 <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Value Comparison Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm">
          <h3 className="font-serif font-bold text-gray-950 text-xl sm:text-2xl text-center mb-6 sm:mb-8">
            Single Webinar vs All-Access Monthly Pass
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <span className="text-xs uppercase font-bold text-gray-400">Individual Tickets</span>
              <div className="text-2xl font-serif font-bold text-gray-900">₹199 - ₹299 <span className="text-xs font-normal text-gray-500">/ session</span></div>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-400" /> Access to 1 live session only</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-400" /> Only 1 recording included</li>
                <li className="flex items-center gap-2 text-gray-400">✕ No community networking group</li>
                <li className="flex items-center gap-2 text-gray-400">✕ No 1-on-1 resume feedback</li>
                <li className="flex items-center gap-2 font-semibold text-gray-900 pt-2 border-t border-gray-100">
                  Total for 4 sessions: ~₹1,000+
                </li>
              </ul>
            </div>

            <div className="bg-deepGreen text-white rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-gold text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">
                Save 50%
              </div>
              <span className="text-xs uppercase font-bold text-gold">All-Access Monthly Pass</span>
              <div className="text-3xl font-serif font-bold text-white">₹800 <span className="text-xs font-normal text-white/70">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> Access to ALL 4 live webinars this month</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> All 4 High-Definition recordings + code files</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> Private Cohort WhatsApp community group</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> Priority 1-on-1 resume review & interview critique</li>
                <li className="flex items-center gap-2 font-bold text-gold pt-2 border-t border-white/10">
                  Flat ₹200 per session — Complete Mentorship!
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Sessions Included */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-gray-950 text-center">
            All 4 Live Sessions Included in the Pass
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-deepGreen bg-deepGreen/10 px-2 py-0.5 rounded">
                Week 1
              </span>
              <h4 className="font-serif font-bold text-gray-950 text-base">Arrays DSA & Thinking Out Loud</h4>
              <p className="text-xs text-gray-500 font-light">
                Master 2-pointer patterns and overcome blanking out in technical interviews.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-deepGreen bg-deepGreen/10 px-2 py-0.5 rounded">
                Week 2
              </span>
              <h4 className="font-serif font-bold text-gray-950 text-base">Strings DSA & The STAR HR Model</h4>
              <p className="text-xs text-gray-500 font-light">
                String algorithm intuition paired with compelling behavioral storytelling for HR rounds.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-deepGreen bg-deepGreen/10 px-2 py-0.5 rounded">
                Week 3
              </span>
              <h4 className="font-serif font-bold text-gray-950 text-base">Recursion Intuition & Tackling Tough Questions</h4>
              <p className="text-xs text-gray-500 font-light">
                Visualizing call stacks, Git commands, and asking high-signal clarifying questions.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-deepGreen bg-deepGreen/10 px-2 py-0.5 rounded">
                Week 4
              </span>
              <h4 className="font-serif font-bold text-gray-950 text-base">Web Dev Basics, Portfolio Pitch & Salary</h4>
              <p className="text-xs text-gray-500 font-light">
                Connecting frontend & backend, pitching your GitHub projects, and salary negotiation for freshers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-10 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
            Ready to upgrade your tech & communication skills this month?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
            Join hundreds of motivated learners. Google Meet links are sent automatically to your WhatsApp upon payment.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 sm:px-8 py-4 bg-deepGreen hover:bg-deepGreen-dark text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] shadow-xl transition-all"
          >
            Claim Your Monthly Pass For ₹800
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMonthlyPassDefault={true}
      />
    </div>
  );
}
