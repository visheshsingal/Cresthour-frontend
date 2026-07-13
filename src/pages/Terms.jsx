import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

const Terms = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-black hover:text-gold transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-10 border-b border-gray-200 pb-8">
                    <div className="p-3 bg-black text-white rounded-xl">
                        <FileText size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-[Georgia,Times_New_Roman,serif]">Terms & Conditions</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed text-[15px] sm:text-[16px] font-[Arial,Helvetica,sans-serif]">
                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">1. Agreement to Terms</h2>
                        <p>
                            By accessing and using Cresthour’s website and learning services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">2. Use of Services</h2>
                        <p>
                            Our platform is intended for browsing educational content, joining learning programs, contacting the team, and accessing learning resources related to technology and development.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">3. User Responsibilities</h2>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Provide accurate information while signing up or contacting us.</li>
                            <li>Protect your account details and keep them confidential.</li>
                            <li>Use our services only for lawful and educational purposes.</li>
                            <li>Respect intellectual property and shared course materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">4. Communication Consent</h2>
                        <p>
                            By providing your contact details, you consent to receive updates, support messages, program information, and promotional communication from Cresthour through email, phone, or other agreed channels.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">5. Course and Content Use</h2>
                        <p>
                            All learning content, lesson materials, images, and written resources are provided for educational purposes. We reserve the right to update or remove content at any time.
                        </p>
                    </section>

                    <section id="privacy-policy">
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">6. Privacy Policy</h2>
                        <p>
                            Cresthour collects basic personal information to provide support, deliver services, and improve the student experience. We do not sell your data and only use it for legitimate educational and communication purposes.
                        </p>
                    </section>

                    <section id="cookie-policy">
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">7. Cookie Policy</h2>
                        <p>
                            Our website may use cookies to improve functionality, remember preferences, and understand user interaction. You can disable cookies in your browser settings, although some features may be impacted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">8. Intellectual Property</h2>
                        <p>
                            The content, design, and structure of the website belong to Cresthour unless otherwise stated. You may not reproduce or distribute educational materials without written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">9. Limitation of Liability</h2>
                        <p>
                            Cresthour will not be liable for any loss or inconvenience arising from the use of the site unless caused by direct negligence or misconduct.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">10. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of India. Any dispute shall be handled under the jurisdiction of courts in India.
                        </p>
                    </section>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <p>For any questions, contact us at cresthour.support@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
