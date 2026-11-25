'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Video,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import CheckoutModal from '@/components/CheckoutModal';

export default function WebinarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMonthlyPass, setIsMonthlyPass] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/webinars/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.webinar) {
            setWebinar(data.webinar);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Loading webinar details...
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Webinar Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The requested webinar does not exist or has ended.</p>
        <Link href="/webinars" className="px-6 py-2.5 bg-deepGreen text-white text-xs font-bold uppercase rounded-xl">
          Back to All Webinars
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-10">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Back Link */}
        <Link
          href="/webinars"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        {/* Top Details Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Poster & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-gray-100 border border-gray-200 shadow-lg">
              <img
                src={webinar.posterUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'}
                alt={webinar.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/85 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg backdrop-blur-sm">
                {webinar.weekLabel || 'Live Webinar'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1 font-semibold text-deepGreen bg-deepGreen/10 px-2.5 py-1 rounded-md">
                  <Calendar size={14} /> {webinar.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {webinar.time} ({webinar.duration || '90 Mins'})
                </span>
                <span>•</span>
                <span>{webinar.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 leading-tight">
                {webinar.title}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {webinar.description}
              </p>
            </div>

            {/* Curriculum breakdown */}
            <div className="border border-gray-200 rounded-3xl p-6 bg-gray-50/50 space-y-4">
              <h3 className="font-serif font-bold text-gray-950 text-lg">Detailed Session Breakdown</h3>
              <div className="space-y-3">
                {(webinar.topics || []).map((topic, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                    <CheckCircle2 size={16} className="text-deepGreen flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor info */}
            <div className="border border-gray-200 rounded-3xl p-6 flex items-center gap-4 bg-white">
              <div className="w-14 h-14 rounded-full bg-deepGreen/10 text-deepGreen font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                {webinar.speaker?.charAt(0) || 'M'}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest">Lead Instructor</span>
                <h4 className="font-serif font-bold text-gray-950 text-base">{webinar.speaker || 'Tech Lead & Career Mentor'}</h4>
                <p className="text-xs text-gray-500 font-light">{webinar.speakerRole || 'Software Engineer & Coach'}</p>
              </div>
            </div>
          </div>

          {/* Checkout Card (Sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-white border-2 border-deepGreen/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Registration Open
                </span>
                <div className="flex items-baseline gap-2 mt-3">
                  <div className="text-4xl font-serif font-bold text-deepGreen">₹{webinar.price}</div>
                  <div className="text-xs text-gray-400 line-through">₹{webinar.originalPrice}</div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Single ticket for this live 90-minute session.</p>
              </div>

              <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-deepGreen" />
                  <span>Google Meet / Zoom Live Interactive Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-deepGreen" />
                  <span>Automated WhatsApp Link & Calendar Invite</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-deepGreen" />
                  <span>Recording + Code Snippets Included</span>
                </div>
              </div>

              <button
                onClick={() => { setIsMonthlyPass(false); setIsModalOpen(true); }}
                className="w-full py-4 bg-deepGreen hover:bg-deepGreen-dark text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-deepGreen/20 transition-all flex items-center justify-center gap-2"
              >
                Book Single Seat • ₹{webinar.price} <ArrowRight size={14} />
              </button>

              {/* Monthly pass upgrade option */}
              <div className="pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-2xl text-center space-y-2">
                <div className="text-xs font-bold text-gray-900 flex items-center justify-center gap-1">
                  <Sparkles size={14} className="text-gold" /> Or Get All 4 Webinars For ₹800
                </div>
                <p className="text-[11px] text-gray-500">
                  Save ₹400+ by subscribing to the complete monthly live cohort pass!
                </p>
                <button
                  onClick={() => { setIsMonthlyPass(true); setIsModalOpen(true); }}
                  className="w-full py-2.5 bg-gold hover:bg-gold-hover text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  Upgrade to Monthly Pass (₹800)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialWebinar={webinar}
        isMonthlyPassDefault={isMonthlyPass}
      />
    </div>
  );
}
