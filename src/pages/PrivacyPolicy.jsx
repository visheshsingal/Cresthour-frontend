import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-black hover:text-gold transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-10 border-b border-gray-200 pb-8">
                    <div className="p-3 bg-black text-white rounded-xl">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-[Georgia,Times_New_Roman,serif]">Privacy Policy</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed text-[15px] sm:text-[16px] font-[Arial,Helvetica,sans-serif]">
                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">1. Information We Collect</h2>
                        <p>We may collect your name, email address, phone number, enquiry details, and any other information you voluntarily provide through forms or communication with us.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">2. How We Use Your Information</h2>
                        <p>Your details may be used to respond to enquiries, provide course or program information, send support updates, improve user experience, and maintain our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">3. Data Protection</h2>
                        <p>We use reasonable technical and organizational measures to protect your data from unauthorized access, misuse, alteration, or disclosure.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">4. Third-Party Services</h2>
                        <p>We may use trusted third-party services such as analytics, email tools, or CRM systems to support our operations. Your data is never sold to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">5. Payment Security</h2>
                        <p>If payments are involved, they are processed through secure third-party payment gateways. Cresthour does not store sensitive banking details on our servers.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">6. Policy Updates</h2>
                        <p>We may update this policy from time to time. Changes will be effective immediately when posted on the website.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">7. Contact Information</h2>
                        <p>For privacy-related questions, please contact us at cresthour.support@gmail.com or +91 9024939664.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
