import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-16 sm:pt-20 pb-16 sm:pb-20 bg-white">
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16 lg:mb-20 bg-deepGreen">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container-custom relative z-10 text-center text-white py-16 sm:py-20">
                    <div>
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 sm:mb-6 block">Let’s connect</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-4 sm:mb-6 leading-tight">Contact Cresthour</h1>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg font-light text-gray-200 leading-relaxed px-2 sm:px-0">
                            Whether you want to join a cohort, partner with us, or ask about our programs, we would love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-custom">
                <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="bg-deepGreen text-white p-8 sm:p-10 md:p-14 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                            <h3 className="text-2xl font-serif mb-8 sm:mb-10 relative z-10">Get in touch</h3>

                            <div className="space-y-6 sm:space-y-8 relative z-10">
                                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-none">
                                        <MapPin className="text-gold" size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Location</span>
                                        <p className="text-base sm:text-lg font-light leading-relaxed">
                                           Gurugram, India<br />
                                            
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-none">
                                        <Phone className="text-gold" size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</span>
                                        <p className="text-base sm:text-lg font-light">
                                            +91 9024939664
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-none">
                                        <Mail className="text-gold" size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Email</span>
                                        <p className="text-base sm:text-lg font-light break-all">
                                            cresthour.support@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-none">
                                        <Clock className="text-gold" size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Support hours</span>
                                        <p className="text-base sm:text-lg font-light">
                                            Mon - Fri: 10:00 AM - 7:00 PM<br />
                                            Sat: 11:00 AM - 5:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex flex-col justify-center w-full"
                    >
                        <form className="space-y-5 sm:space-y-6">
                            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">First Name</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors" placeholder="Aarav" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Last Name</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors" placeholder="Sharma" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email Address</label>
                                <input type="email" className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors" placeholder="you@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Subject</label>
                                <select className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors bg-white">
                                    <option>Program inquiry</option>
                                    <option>Mentorship support</option>
                                    <option>Partnerships</option>
                                    <option>General question</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Message</label>
                                <textarea rows="4" className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors resize-none" placeholder="Tell us what you are looking for."></textarea>
                            </div>

                            <button type="submit" className="btn-gold w-full sm:w-auto mt-4">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
