'use client';

import { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-black py-16">
      <div className="container-custom max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-gray-950">
            Contact & Attendee Support
          </h1>
          <p className="text-sm text-gray-600 font-light max-w-lg mx-auto">
            Have questions about upcoming webinars, Razorpay payments, or WhatsApp links? We are here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="border border-gray-200 rounded-3xl p-6 bg-gray-50 space-y-5">
              <h3 className="font-serif font-bold text-gray-950 text-xl">Quick Support Channels</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-deepGreen/10 text-deepGreen flex-shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">WhatsApp Automation</strong>
                    <p className="text-gray-500 font-light leading-relaxed">
                      All webinar links are dispatched automatically to your WhatsApp upon checkout.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-deepGreen/10 text-deepGreen flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">Direct Email</strong>
                    <p className="text-gray-500 font-light">support@cresthour.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Cresthour%20Team%2C%20I%20have%20a%20query%20about%20the%20weekly%20webinars"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-deepGreen hover:bg-deepGreen-dark text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare size={14} /> Chat On WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-deepGreen/10 text-deepGreen flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-950">Message Sent!</h4>
                <p className="text-xs text-gray-500 font-light">
                  Thank you for reaching out. Our support team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif font-bold text-gray-950 text-xl mb-4">Send an Inquiry</h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanshu Singh"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priyanshu@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-deepGreen hover:bg-deepGreen-dark text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
