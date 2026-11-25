'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  Users,
  Video,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Terminal,
  Brain,
  ChevronRight,
  Plus,
  Minus,
  ArrowDown
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CheckoutModal from '@/components/CheckoutModal';

export default function HomePage() {
  const [webinars, setWebinars] = useState([]);
  const [featuredWebinar, setFeaturedWebinar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWebinar, setModalWebinar] = useState(null);
  const [isMonthlyPassSelected, setIsMonthlyPassSelected] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const res = await fetch('/api/webinars');
      const data = await res.json();
      if (data.success && data.webinars?.length > 0) {
        setWebinars(data.webinars);
        const featured = data.webinars.find((w) => w.isFeatured && w.isActive) || data.webinars[0];
        setFeaturedWebinar(featured);
      }
    } catch (e) {
      console.error('Error fetching webinars:', e);
    } finally {
      setLoading(false);
    }
  };

  const openWebinarCheckout = (webinar) => {
    setModalWebinar(webinar);
    setIsMonthlyPassSelected(false);
    setIsModalOpen(true);
  };

  const openMonthlyPassCheckout = () => {
    setModalWebinar(featuredWebinar);
    setIsMonthlyPassSelected(true);
    setIsModalOpen(true);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const faqItems = [
    {
      q: 'How does the ₹800 All-Access Monthly Pass work?',
      a: 'The Monthly Pass gives you guaranteed live entry into all 4 weekly webinars scheduled for the month (working out to just ₹200 per session). You also receive lifetime access to high-definition recordings, downloadable coding templates, private cohort WhatsApp community access, and priority 1-on-1 resume & mock interview reviews.'
    },
    {
      q: 'Can I attend just one single webinar instead of the full month?',
      a: 'Yes, absolutely! Every weekly webinar can be booked individually at its fixed price (e.g. ₹199 or ₹249). You still receive the live interactive session access, meeting recording, and code files for that specific workshop.'
    },
    {
      q: 'How and when do I receive the Google Meet / Zoom link on WhatsApp?',
      a: 'As soon as your payment is processed on Razorpay, our backend automatically generates your registration ticket and dispatches a personalized WhatsApp confirmation directly to the phone number you provided. It contains your live meeting link, date, time, and session prep tips. We also send an automatic reminder 1 hour before the live session begins.'
    },
    {
      q: 'I am a beginner in coding and feel nervous speaking. Will I benefit?',
      a: 'This cohort was built specifically for you. Bootcamps teach syntax, but nobody trains students how to talk during an interview. Every session breaks down coding logic into simple everyday English first before writing code, and our communication exercises give you safe, step-by-step practice to overcome interview anxiety.'
    },
    {
      q: 'What if I miss a live Saturday session? Do I get recordings?',
      a: 'Yes! Every session is recorded in 1080p. The full video recording, code walkthroughs, and cheat sheets are posted in the attendee WhatsApp community within 2 hours after the live session wraps up.'
    },
    {
      q: 'What is the schedule and timing for the live webinars?',
      a: 'All our weekly live cohorts take place every Saturday at 07:00 PM IST for 90 minutes. You can participate from anywhere using your laptop or phone via Google Meet / Zoom.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* 1. FULL-BLEED HERO */}
      <section className="relative min-h-[840px] overflow-hidden bg-gray-950 lg:min-h-[860px]">
        {/* Full image clearly visible with a subtle dark tone */}
        <img
          src="https://images.pexels.com/photos/5926395/pexels-photo-5926395.jpeg"
          alt="Cresthour live cohort learning together"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* "Thoda sa dark" - Subtle dark tone letting the entire image show through */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        <div className="container-custom relative z-10 flex min-h-[840px] items-center pt-24 pb-16 lg:min-h-[860px] lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[620px]"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-14 bg-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.42em] text-gold">
                Weekly live cohorts
              </span>
            </div>

            <h1 className="text-[3.6rem] leading-[0.94] tracking-[-0.04em] text-white sm:text-7xl lg:text-[5.6rem]">
              Speak code.<br />
              <span className="italic text-gold">Think clearly.</span>
            </h1>

            <p className="mt-7 max-w-[530px] text-base leading-7 text-white/90 sm:text-lg">
              Learn practical coding, communicate your thinking with confidence, and become ready for real technical interviews.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#schedule"
                className="group flex items-center justify-center gap-3 bg-deepGreen px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-lg transition-all hover:bg-deepGreen-dark"
              >
                View schedule
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
              </a>
              <button
                onClick={openMonthlyPassCheckout}
                className="flex items-center justify-center gap-2 border border-white/30 bg-white/10 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-gray-950"
              >
                <Sparkles size={13} className="text-gold" /> Monthly pass · ₹800
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-gold" /> Every Saturday</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> 7:00 PM IST</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="flex items-center gap-2"><Video size={14} className="text-gold" /> Live online</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-7 right-5 z-20 hidden w-[300px] border border-white/25 bg-deepGreen/90 p-5 text-white shadow-2xl backdrop-blur-md md:block lg:right-12 lg:w-[340px]"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.24em] text-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Next live session
            </span>
            <Video size={16} className="text-white/70" />
          </div>
          <h2 className="text-xl leading-tight text-white lg:text-2xl">
            {loading ? 'Preparing your session...' : featuredWebinar?.title || 'Interview-ready communication'}
          </h2>
          <div className="mt-4 border-t border-white/20 pt-3 text-xs text-white/80">
            Saturday · 7:00 PM IST
          </div>
        </motion.div>
      </section>

      {/* 2. UPCOMING WEBINARS FOR THIS MONTH (THE SCHEDULE) */}
      <section id="schedule" className="py-16 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16">
            <div className="space-y-3">
              <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Monthly Calendar</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-gray-950">
                All 4 Live Sessions This Month
              </h2>
              <p className="text-sm text-gray-600 font-light max-w-xl">
                Attend any session individually (₹199 - ₹299) or get all 4 sessions with our Monthly Pass (₹800).
              </p>
            </div>
            <Link
              href="/webinars"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-deepGreen hover:text-deepGreen-dark"
            >
              Explore Full Catalog <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {webinars.map((webinar, index) => (
              <div
                key={webinar.id}
                className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 border border-gray-200 mb-4">
                    <img
                      src={webinar.posterUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'}
                      alt={webinar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {webinar.weekLabel || `Week ${index + 1}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                    <Calendar size={13} className="text-deepGreen" />
                    <span className="font-semibold text-gray-800">{webinar.date}</span>
                    <span>•</span>
                    <Clock size={13} className="text-deepGreen" />
                    <span>{webinar.time}</span>
                  </div>

                  <h3 className="font-serif font-bold text-gray-950 text-base leading-snug line-clamp-2 mb-2 group-hover:text-deepGreen transition-colors">
                    {webinar.title}
                  </h3>

                  <p className="text-xs text-gray-500 font-light line-clamp-2 mb-4">
                    {webinar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Single Fee</span>
                    <span className="text-lg font-serif font-bold text-deepGreen">₹{webinar.price}</span>
                  </div>
                  <button
                    onClick={() => openWebinarCheckout(webinar)}
                    className="px-4 py-2 bg-gray-100 hover:bg-deepGreen hover:text-white text-gray-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Book Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MONTHLY PASS BANNER (₹800 ALL-ACCESS) */}
      <section className="py-14 sm:py-20 bg-deepGreen text-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-black uppercase tracking-[0.2em]">
                <Sparkles size={14} /> Best Value For Serious Learners
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium leading-tight">
                The All-Access Monthly Pass: <br />
                <span className="text-gold">4 Live Sessions for ₹800</span> (Save ~₹400)
              </h2>
              <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
                Get guaranteed entry into every single weekly webinar this month. Includes high-definition session recordings, downloadable problem-solving templates, private WhatsApp attendee group, and priority 1-on-1 resume reviews.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>Access to all 4 live webinars this month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>Session recordings + DSA code cheat sheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>Private Cohort WhatsApp Community</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>1 Mock Interview & Resume feedback</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Monthly Subscription</span>
              <div className="text-5xl font-serif font-bold text-white mb-1">₹800</div>
              <span className="text-xs text-white/60 line-through mb-4">Original Value ₹1,999</span>
              <button
                onClick={openMonthlyPassCheckout}
                className="w-full py-4 bg-gold hover:bg-gold-hover text-white text-xs font-black uppercase tracking-[0.25em] shadow-xl transition-all transform hover:scale-105 mb-3"
              >
                Claim Monthly Pass • ₹800
              </button>
              <p className="text-[11px] text-white/60">One-time payment for the full month. 100% money-back guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUAL SYNERGY FRAMEWORK */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-16">
            <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">The Dual Synergy</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-gray-950">
              Why Coding + Soft Skills Must Be Learned Together
            </h2>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Coding gives you the solution. Soft skills give you the job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pillar 1 */}
            <div className="border border-gray-200 rounded-3xl p-5 sm:p-8 bg-gray-50/50 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-deepGreen/10 text-deepGreen">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-950">Pillar 1: Basic Coding Mastery</h4>
                  <p className="text-xs text-gray-500 font-medium">Core technical problem solving</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-deepGreen flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Problem Decomposition:</strong>
                    How to break down confusing questions into step-by-step algorithms and pseudocode before touching code.
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-deepGreen flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Key DSA Patterns:</strong>
                    Arrays, Strings, HashMaps, and Two-Pointer approaches that cover 80% of entry-level coding interviews.
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-deepGreen flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Clean Syntax & Edge Cases:</strong>
                    Writing readable, modular code with optimal time and space complexity analysis.
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-gray-200 rounded-3xl p-5 sm:p-8 bg-gray-50/50 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gold/10 text-gold">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-950">Pillar 2: Soft Skills & Articulation</h4>
                  <p className="text-xs text-gray-500 font-medium">The interpersonal skills that seal the hire</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">The Think-Aloud Technique:</strong>
                    How to speak your thoughts continuously so the interviewer understands your problem-solving reasoning.
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">The STAR Storytelling Framework:</strong>
                    Structure your college projects and obstacles into compelling answers for HR and managerial rounds.
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Confidence & Composure:</strong>
                    Managing anxiety, asking high-value clarifying questions, and handling mistakes gracefully when stuck.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ACCORDION FAQ SECTION */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container-custom max-w-4xl">
          <div className="text-center space-y-3 mb-16">
            <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Help & Clarifications</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium text-gray-950">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 font-light">
              Everything you need to know about attendance, payments, links, and recordings.
            </p>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-6 transition-colors">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left flex items-center justify-between gap-4 group"
                  >
                    <span className="font-serif font-bold text-gray-950 text-lg sm:text-xl group-hover:text-deepGreen transition-colors">
                      {item.q}
                    </span>
                    <span className="p-2 rounded-full bg-gray-50 group-hover:bg-deepGreen/10 group-hover:text-deepGreen text-gray-500 transition-colors flex-shrink-0">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-0 text-sm text-gray-600 font-light leading-relaxed animate-fade-in sm:pr-12">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* WhatsApp Support Callout */}
          <div className="mt-12 p-5 sm:p-8 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-serif font-bold text-gray-950 text-xl mb-1">Still have a question?</h4>
              <p className="text-xs text-gray-500 font-light">
                Chat directly with our founder & mentors on WhatsApp for quick answers.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi%20Cresthour%20Team%2C%20I%20have%20a%20question%20about%20the%20weekly%20webinars"
              target="_blank"
              rel="noreferrer"
              className="px-5 sm:px-6 py-3.5 bg-deepGreen hover:bg-deepGreen-dark text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare size={15} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialWebinar={modalWebinar}
        isMonthlyPassDefault={isMonthlyPassSelected}
      />
    </div>
  );
}
