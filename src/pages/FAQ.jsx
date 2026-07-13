'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        question: 'What will I learn in the curriculum?',
        answer: 'The curriculum is designed around practical web development with a focus on the MERN stack, Git and GitHub workflows, version control habits, and foundational technical knowledge for working with servers, deployment basics, and modern development tools.'
    },
    {
        question: 'Is this course beginner-friendly?',
        answer: 'Yes. We start from the basics and build up step by step, so learners can understand the core concepts before moving into more advanced topics like APIs, database integration, and project deployment.'
    },
    {
        question: 'Do I need to know coding before joining?',
        answer: 'No prior coding experience is required. We guide learners through the essentials and make sure the journey is approachable, structured, and practical.'
    },
    {
        question: 'Will I work on real projects?',
        answer: 'Absolutely. The curriculum includes hands-on exercises and mini projects so you can apply what you learn and build confidence with real-world development workflows.'
    },
    {
        question: 'What kind of support is available?',
        answer: 'You will receive guidance on concepts, code review support, and a roadmap that keeps you moving forward with clear milestones and practical resources.'
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="pt-24 pb-20 bg-white">
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16 lg:mb-20 bg-deepGreen">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/5439454/pexels-photo-5439454.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container-custom relative z-10 text-center text-white py-20 sm:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Questions</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 leading-tight">Frequently Asked Questions</h1>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg font-light text-gray-200 leading-relaxed px-2 sm:px-0">
                            Everything you might want to know before starting your learning journey with Cresthour.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-custom py-16">
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((item, index) => {
                        const isOpen = index === openIndex;
                        return (
                            <div key={item.question} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="text-lg font-semibold text-black">{item.question}</span>
                                    <ChevronDown className={`text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link href="/curriculum" className="btn-gold inline-flex">View curriculum</Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
