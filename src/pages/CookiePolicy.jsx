import { ArrowLeft, Cookie } from 'lucide-react';
import Link from 'next/link';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-black hover:text-gold transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-10 border-b border-gray-200 pb-8">
                    <div className="p-3 bg-black text-white rounded-xl">
                        <Cookie size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-[Georgia,Times_New_Roman,serif]">Cookie Policy</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed text-[15px] sm:text-[16px] font-[Arial,Helvetica,sans-serif]">
                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">1. What Are Cookies?</h2>
                        <p>Cookies are small files stored on your device that help websites remember preferences, improve performance, and provide a smoother browsing experience.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">2. How We Use Cookies</h2>
                        <p>We use cookies to remember site preferences, understand how visitors use our pages, and improve the overall quality of the experience on Cresthour.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">3. Types of Cookies</h2>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Essential cookies for core site functionality.</li>
                            <li>Preference cookies to remember user settings.</li>
                            <li>Analytics cookies to understand browsing patterns.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">4. Managing Cookies</h2>
                        <p>You can manage cookie settings through your browser. Disabling cookies may affect the usability of some features on the website.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">5. Consent</h2>
                        <p>By continuing to use the site, you consent to the use of cookies as described in this policy, unless you choose to disable them in your browser settings.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-black mb-3 font-[Georgia,Times_New_Roman,serif]">6. Contact</h2>
                        <p>If you have questions about cookies or privacy, please contact us at cresthour.support@gmail.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
