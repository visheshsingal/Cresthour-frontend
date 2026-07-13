import { Instagram, Twitter, Radio } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white pt-24 pb-10 border-t border-gray-100 text-sm">
            <div className="container-custom grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-20">
                <div className="col-span-1">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tighter block mb-6">CRESTHOUR</Link>
                    <p className="text-gray-500 mb-8 leading-relaxed font-light">
                        Learning technology with practical guidance, expert mentors, and career-focused programs.
                    </p>
                    <div className="flex space-x-4 text-gray-400">
                        <a href="https://www.instagram.com/cresthour/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="https://x.com/cresthour" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="X"><Twitter size={20} /></a>
                        <a href="https://www.reddit.com/user/cresthour/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Reddit"><Radio size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-8 text-xs">Explore</h4>
                    <ul className="space-y-4 text-gray-500 font-light">
                        <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                        <li><Link href="/curriculum" className="hover:text-gold transition-colors">Curriculum</Link></li>
                        <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
                        <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
                        <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-8 text-xs">Policies</h4>
                    <ul className="space-y-4 text-gray-500 font-light">
                        <li><Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/cookie-policy" className="hover:text-gold transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-8 text-xs">Contact</h4>
                    <ul className="space-y-4 text-gray-500 font-light">
                        <li><a href="mailto:cresthour.support@gmail.com" className="hover:text-gold transition-colors">cresthour.support@gmail.com</a></li>
                        <li><a href="tel:+919024939664" className="hover:text-gold transition-colors">+91 9024939664</a></li>
                        <li><Link href="/contact" className="hover:text-gold transition-colors">Get in touch</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container-custom pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-light">
                <p>&copy; 2026 Cresthour. All rights reserved.</p>
                <div className="flex flex-wrap gap-4 md:gap-8 mt-4 md:mt-0">
                    <Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link>
                    <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
                    <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
