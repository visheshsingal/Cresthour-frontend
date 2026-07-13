'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MoveDown } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative h-screen w-full bg-white overflow-hidden flex items-center text-black">
            <div className="container-custom relative z-10 w-full h-full flex flex-col justify-center">
                <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
                    <div className="lg:col-span-12 xl:col-span-7 pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-px bg-gold/50"></div>
                                <span className="text-gold text-[10px] sm:text-xs font-black uppercase tracking-[0.5em]">
                                    Future-ready learning
                                </span>
                            </div>

                            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-serif font-medium leading-[0.9] mb-10 tracking-tight">
                                Learn tech with<br />
                                <span className="text-gray-400">clarity and momentum.</span>
                            </h1>

                            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
                                <Link
                                    href="/about"
                                    className="group relative px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-gold flex items-center gap-3"
                                >
                                    Explore Programs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* <Link
                                    to="/contact"
                                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors border-b border-gray-100 hover:border-black pb-2"
                                >
                                    Join the community
                                </Link> */}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden xl:flex xl:col-span-5 relative"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            className="relative z-10 w-full"
                        >
                            <img
                                src="https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg"
                                alt="Learning dashboard"
                                className="w-full h-auto object-contain rounded-[2rem] shadow-[0_45px_60px_rgba(0,0,0,0.15)]"
                            />
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] border border-gray-100 rounded-full -z-10"></div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute left-10 bottom-10 hidden xl:flex flex-col items-center gap-6">
                <span className="vertical-text text-[9px] font-black text-gray-300 uppercase tracking-[0.5em] rotate-180">
                    Cresthour • Edtech
                </span>
                <div className="w-px h-24 bg-gradient-to-b from-gray-100 to-transparent"></div>
            </div>

            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer text-gray-300 hover:text-gold transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[9px] font-black uppercase tracking-[0.3em] font-sans">Scroll</span>
                <MoveDown size={14} />
            </motion.div>
        </section>
    );
};

export default Hero;
