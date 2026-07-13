'use client';

import { ArrowRight, CalendarDays, Clock3, IndianRupee } from 'lucide-react';
import Link from 'next/link';

const CoursePromo = () => {
    return (
        <section className="py-20 bg-deepGreen text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                    <div className="max-w-2xl">
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-black mb-4 block">Limited batch</span>
                        <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                            New Web Development Live Course
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Join our 3-month live program starting from 1 August and build real-world websites with expert guidance, live practice, and mentor support.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/10">
                                <CalendarDays size={16} className="text-gold" />
                                <span className="text-sm font-medium">Starts from 1 Aug</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/10">
                                <Clock3 size={16} className="text-gold" />
                                <span className="text-sm font-medium">3-month live training</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/10">
                                <IndianRupee size={16} className="text-gold" />
                                <span className="text-sm font-medium">Only ₹1299</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://rzp.io/rzp/Igar24r"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.25em] text-deepGreen hover:bg-gold hover:text-white transition-colors"
                            >
                                Enroll now <ArrowRight size={14} />
                            </a>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                            >
                                Know more
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-serif">Course Highlights</h3>
                            <div className="text-4xl font-black text-gold">₹1299</div>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-200">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold"></span>
                                Live classes with practical project work
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold"></span>
                                Beginner-friendly curriculum with real examples
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold"></span>
                                Mentorship and doubt support throughout the batch
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursePromo;
