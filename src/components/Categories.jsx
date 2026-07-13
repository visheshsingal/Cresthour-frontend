import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 'Classic',
        name: 'Classic Collection',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80',
        desc: 'Precision engineering meets timeless sophistication.'
    },
    {
        id: 'Sport',
        name: 'Sport Series',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
        desc: 'Robust performance for the relentless pursuer.'
    },
    {
        id: 'Gold',
        name: 'Gold Edition',
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80',
        desc: 'Handcrafted luxury in pure 18k solid gold.'
    }
];

const Categories = () => {
    return (
        <section className="py-32 bg-deepGreen overflow-hidden">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-gold text-[10px] uppercase font-black tracking-[0.5em] mb-4 block"
                        >
                            The Heritage Range
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-serif text-white leading-tight"
                        >
                            Our Collections
                        </motion.h2>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {categories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href="/watches"
                                state={{ category: item.id }}
                                className="group relative block aspect-[4/5] overflow-hidden"
                            >
                                {/* Image with darker overlay initial state */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                                />

                                {/* Floating Content */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
                                    <div className="overflow-hidden">
                                        <motion.p
                                            className="text-gold text-[10px] uppercase font-black tracking-[0.4em] mb-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                        >
                                            Explore Series
                                        </motion.p>
                                    </div>
                                    <h3 className="text-4xl font-serif text-white mb-4 leading-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-300 text-sm font-light leading-relaxed mb-8 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        {item.desc}
                                    </p>

                                    <div className="flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-widest group/link">
                                        <span className="border-b border-white/20 group-hover/link:border-gold transition-colors pb-1">
                                            View Collection
                                        </span>
                                        <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                                    </div>
                                </div>

                                {/* Abstract Accent */}
                                <div className="absolute top-8 right-8 w-12 h-px bg-white/20 transform origin-right group-hover:scale-x-150 transition-transform duration-700" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
