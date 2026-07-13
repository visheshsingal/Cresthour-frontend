import { BookOpen, Sparkles, Laptop, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const OurPolicies = () => {
    const policies = [
        {
            icon: BookOpen,
            title: 'Practical Lessons',
            description: 'Learn through hands-on modules that build real-world confidence.',
            color: 'text-gold'
        },
        {
            icon: Laptop,
            title: 'Live Project Learning',
            description: 'Work on guided projects that mirror industry workflows.',
            color: 'text-blue-600'
        },
        {
            icon: Users,
            title: 'Mentor Support',
            description: 'Get feedback from instructors and peers whenever you need it.',
            color: 'text-green-600'
        },
        {
            icon: Sparkles,
            title: 'Career Growth',
            description: 'Sharpen skills that help you stand out in the tech world.',
            color: 'text-purple-600'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-[0.3em] text-xs font-black mb-3 block">Why learners choose us</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-black">A learning experience built for progress</h2>
                    <div className="w-24 h-0.5 bg-gold mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 h-full flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${policy.color}`}>
                                    <policy.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-serif mb-3 text-black group-hover:text-gold transition-colors">
                                    {policy.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {policy.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold/5 to-gold/10 rounded-full border border-gold/20">
                        <Sparkles className="text-gold" size={20} />
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Trusted by learners across India
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPolicies;
