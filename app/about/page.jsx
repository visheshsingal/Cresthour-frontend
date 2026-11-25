import Link from 'next/link';
import { CheckCircle2, Terminal, Brain, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black py-16">
      <div className="container-custom max-w-4xl space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Our Mission</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-medium text-gray-950 leading-tight">
            Bridging the gap between <br />
            <span className="text-deepGreen italic">Code Logic</span> and <span className="text-gray-400">Interview Confidence.</span>
          </h1>
          <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Cresthour was built on a simple observation: universities and bootcamps teach how to write code, but rarely teach how to explain that code in a live technical interview.
          </p>
        </div>

        {/* The Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 items-center pt-6">
          <div className="space-y-4 text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            <h3 className="text-2xl font-serif font-bold text-gray-950">Why Most Candidates Struggle</h3>
            <p>
              In a technical interview, silence is your biggest enemy. When an interviewer asks you to solve an array or string problem, they don't just want the final code—they want to see <strong>how you break down ambiguity, how you test edge cases, and how you take hints</strong>.
            </p>
            <p>
              Candidates who practice coding on platforms like LeetCode in isolation often freeze when asked: <em>"Can you walk me through your thought process?"</em>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 space-y-4">
            <h4 className="font-serif font-bold text-gray-950 text-lg">The Cresthour Philosophy</h4>
            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-deepGreen flex-shrink-0 mt-0.5" />
                <span><strong>No Silos:</strong> Every coding concept is paired with an articulation technique.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-deepGreen flex-shrink-0 mt-0.5" />
                <span><strong>Live & Interactive:</strong> Learn by coding alongside mentors in real-time, not boring pre-recorded videos.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-deepGreen flex-shrink-0 mt-0.5" />
                <span><strong>Affordable Access:</strong> Individual sessions for ₹199 or a complete month for ₹800.</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 4-Week Cohort System */}
        <div className="border border-gray-200 rounded-3xl p-8 bg-white space-y-6">
          <h3 className="text-2xl font-serif font-bold text-gray-950 text-center">
            How Our Monthly Cohorts Work
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-2xl font-serif font-bold text-deepGreen mb-1">Week 1</div>
              <div className="text-xs font-bold text-gray-900 mb-1">Arrays & Speech</div>
              <div className="text-[11px] text-gray-500">Think-aloud framework</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-2xl font-serif font-bold text-deepGreen mb-1">Week 2</div>
              <div className="text-xs font-bold text-gray-900 mb-1">Strings & STAR</div>
              <div className="text-[11px] text-gray-500">HR storytelling model</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-2xl font-serif font-bold text-deepGreen mb-1">Week 3</div>
              <div className="text-xs font-bold text-gray-900 mb-1">Recursion & Git</div>
              <div className="text-[11px] text-gray-500">Unblocking yourself</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-2xl font-serif font-bold text-deepGreen mb-1">Week 4</div>
              <div className="text-xs font-bold text-gray-900 mb-1">Web Dev & Salary</div>
              <div className="text-[11px] text-gray-500">Negotiation & Pitch</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-6">
          <Link
            href="/webinars"
            className="inline-flex items-center gap-2 px-8 py-4 bg-deepGreen hover:bg-deepGreen-dark text-white text-xs font-black uppercase tracking-[0.25em] shadow-lg transition-all"
          >
            Explore Monthly Webinars <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
