'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Sparkles, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import CheckoutModal from '@/components/CheckoutModal';

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [filteredWebinars, setFilteredWebinars] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWebinar, setModalWebinar] = useState(null);
  const [isMonthlyPass, setIsMonthlyPass] = useState(false);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const res = await fetch('/api/webinars?all=true');
      const data = await res.json();
      if (data.success && data.webinars) {
        setWebinars(data.webinars);
        setFilteredWebinars(data.webinars);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = webinars;
    if (activeCategory !== 'All') {
      result = result.filter((w) => w.category?.toLowerCase().includes(activeCategory.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title?.toLowerCase().includes(q) ||
          w.description?.toLowerCase().includes(q) ||
          w.topics?.some((t) => t.toLowerCase().includes(q))
      );
    }
    setFilteredWebinars(result);
  }, [activeCategory, searchQuery, webinars]);

  const openCheckout = (webinar) => {
    setModalWebinar(webinar);
    setIsMonthlyPass(false);
    setIsModalOpen(true);
  };

  const openPassModal = () => {
    setModalWebinar(webinars[0]);
    setIsMonthlyPass(true);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black py-12">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Live Sessions Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-gray-950">
            Monthly Webinar Schedule
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Every Saturday at 7:00 PM IST, we dive deep into 1 coding concept + 1 communication framework. Attend individually or get the All-Access Monthly Pass for ₹800.
          </p>

          {/* Monthly Pass Callout */}
          <div className="pt-2">
            <button
              onClick={openPassModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deepGreen text-white text-xs font-black uppercase tracking-[0.2em] shadow-md hover:bg-deepGreen-dark transition-all transform hover:scale-105"
            >
              <Sparkles size={14} className="text-gold" />
              Get All-Access Monthly Pass (4 Webinars for ₹800)
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['All', 'Soft Skills', 'Basic Coding', 'Interview'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-deepGreen text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen"
            />
          </div>
        </div>

        {/* Webinars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWebinars.map((w, index) => (
            <div
              key={w.id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 border border-gray-200 mb-5">
                  <img
                    src={w.posterUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {w.weekLabel || `Week ${index + 1}`}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-deepGreen text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
                    {w.category || 'Dual Focus'}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Calendar size={14} className="text-deepGreen" />
                  <span className="font-semibold text-gray-800">{w.date}</span>
                  <span>•</span>
                  <Clock size={14} className="text-deepGreen" />
                  <span>{w.time} ({w.duration || '90 Mins'})</span>
                </div>

                <h3 className="font-serif font-bold text-gray-950 text-xl leading-snug mb-2 group-hover:text-deepGreen transition-colors">
                  {w.title}
                </h3>

                <p className="text-xs text-gray-500 font-light leading-relaxed mb-4 line-clamp-3">
                  {w.description}
                </p>

                {w.topics?.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-gray-100 mb-4">
                    {w.topics.slice(0, 2).map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={14} className="text-deepGreen flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Single Fee</span>
                  <span className="text-2xl font-serif font-bold text-deepGreen">₹{w.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5">₹{w.originalPrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/webinars/${w.id}`}
                    className="px-3 py-2 text-xs font-semibold text-gray-700 hover:text-black hover:underline"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => openCheckout(w)}
                    className="px-5 py-2.5 bg-deepGreen hover:bg-deepGreen-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Book Seat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialWebinar={modalWebinar}
        isMonthlyPassDefault={isMonthlyPass}
      />
    </div>
  );
}
