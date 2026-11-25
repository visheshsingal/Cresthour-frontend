'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/webinars', label: 'All Webinars' },
    { href: '/pass', label: 'Monthly Pass' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' : 'bg-white py-5 border-b border-gray-100'
    }`}>
      <div className="container-custom flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-gray-950 group-hover:text-deepGreen transition-colors">
            CRESTHOUR<span className="text-gold">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                isActive(link.href) ? 'text-deepGreen border-b-2 border-deepGreen pb-1' : 'text-gray-500 hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/pass"
            className="px-5 py-2.5 rounded-full bg-deepGreen hover:bg-deepGreen-dark text-white text-xs font-black uppercase tracking-[0.2em] shadow-sm transition-all transform hover:scale-105 flex items-center gap-1.5"
          >
            <Sparkles size={13} className="text-gold" /> Monthly Pass
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    isActive(link.href) ? 'bg-deepGreen/10 text-deepGreen' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/pass"
                  className="w-full py-3 rounded-xl bg-deepGreen text-white text-xs font-bold uppercase tracking-widest text-center shadow-sm"
                >
                  Get All-Access Monthly Pass
                </Link>
                <Link
                  href="/admin"
                  className="w-full py-2 rounded-xl text-gray-500 text-xs font-semibold uppercase tracking-wider text-center"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
