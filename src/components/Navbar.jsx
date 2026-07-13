'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navKey, setNavKey] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setNavKey(pathname);
        setMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/curriculum', label: 'Curriculum' },
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path));
    const navbarClasses = isScrolled ? 'pt-1' : 'pt-0';

    return (
        <motion.nav
            key={navKey}
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed w-full z-50 top-6 pointer-events-auto ${navbarClasses}`}
        >
            <div className="flex justify-center">
                <div className="w-full max-w-[1100px] px-3">
                    <div className="rounded-full bg-black/80 text-white backdrop-blur-sm shadow-2xl border border-white/5 px-4 py-2 flex items-center justify-between gap-4">
                        {/* Left - brand */}
                        <Link href="/" className="flex items-center gap-3">
                            <span className="text-lg font-black uppercase tracking-[0.25em] text-white sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                                CRESTHOUR<span className="ml-1 text-gold">.</span>
                            </span>
                        </Link>

                        {/* Center - links (desktop) */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    href={link.to}
                                    className={`text-sm font-medium uppercase tracking-[0.25em] transition-colors ${isActive(link.to) ? 'text-gold' : 'text-white/80 hover:text-white'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right - CTA and mobile menu */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block">
                                <Link href="/curriculum" className="rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-black shadow-sm hover:bg-gold hover:text-white transition-colors">
                                    Start learning
                                </Link>
                            </div>

                            <button
                                type="button"
                                aria-label="Toggle navigation"
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/90 hover:text-black"
                            >
                                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile dropdown - appears below the pill */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="mt-3 md:hidden"
                            >
                                <div className="rounded-xl bg-white shadow-md border border-black/5 p-3">
                                    <div className="flex flex-col gap-2">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.to}
                                                href={link.to}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive(link.to) ? 'bg-black/5 text-gold' : 'text-black/70 hover:bg-black/5'}`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                        <Link href="/curriculum" className="mt-1 px-3 py-2 rounded-lg bg-black text-white text-center font-semibold">Start learning</Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
