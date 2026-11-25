import Link from 'next/link';
import { MessageSquare, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deepGreen text-white pt-20 pb-12 border-t border-deepGreen-dark text-sm">
      <div className="container-custom grid gap-10 md:grid-cols-4 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-serif font-black tracking-tight block mb-4 text-white hover:text-gold transition-colors">
            CRESTHOUR<span className="text-gold">.</span>
          </Link>
          <p className="text-white/75 font-light leading-relaxed text-xs mb-5">
            Weekly live cohort workshops focused on building intuitive basic coding logic and articulate interview communication skills.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-gold font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} className="text-gold" /> 100% Practical & Live
          </div>
        </div>

        {/* Programs Column */}
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-4 text-xs text-gold">Programs</h4>
          <ul className="space-y-2.5 text-xs text-white/75 font-light">
            <li>
              <Link href="/webinars" className="hover:text-gold transition-colors">
                Upcoming Live Webinars
              </Link>
            </li>
            <li>
              <Link href="/pass" className="hover:text-gold transition-colors font-medium text-white flex items-center gap-1.5">
                <Sparkles size={12} className="text-gold" /> All-Access Pass (₹800)
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold transition-colors">
                Dual-Skill Methodology
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Attend as College Group
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-4 text-xs text-gold">Navigation</h4>
          <ul className="space-y-2.5 text-xs text-white/75 font-light">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <Link href="/webinars" className="hover:text-gold transition-colors">
                Schedule for Month
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold transition-colors">
                About Our Mentors
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold transition-colors">
                Admin Control Panel
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-4 text-xs text-gold">Attendee WhatsApp Support</h4>
          <p className="text-xs text-white/75 font-light leading-relaxed mb-4">
            Webinar Google Meet / Zoom links and calendar invites are automatically dispatched to your WhatsApp upon payment.
          </p>
          <div className="space-y-2.5 text-xs">
            <a
              href="mailto:support@cresthour.com"
              className="flex items-center gap-2 text-white/85 hover:text-gold transition-colors"
            >
              <Mail size={14} className="text-gold" />
              <span>support@cresthour.com</span>
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20Cresthour%20Team%2C%20I%20have%20a%20question%20about%20the%20weekly%20webinars"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/85 hover:text-gold transition-colors"
            >
              <MessageSquare size={14} className="text-gold" />
              <span>Instant WhatsApp Confirmation</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container-custom pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-light">
        <div>© {new Date().getFullYear()} Cresthour. Built with Next.js, Cloudinary & Razorpay.</div>
        <div className="mt-3 sm:mt-0 space-x-6">
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/webinars" className="hover:text-gold transition-colors">Webinars</Link>
          <Link href="/pass" className="hover:text-gold transition-colors">Monthly Pass</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          <Link href="/admin" className="hover:text-gold transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
