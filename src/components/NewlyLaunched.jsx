import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

const NewlyLaunched = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchNewLaunch = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products`);
                const newArrivals = res.data.filter(p => p.isNewArrival);
                if (newArrivals.length > 0) {
                    setProduct(newArrivals[newArrivals.length - 1]); // Get the latest one
                }
            } catch (err) {
                console.error('Error fetching new launch', err);
            }
        };
        fetchNewLaunch();
    }, []);

    if (!product) return null;

    return (
        <section className="relative min-h-[80vh] flex items-center bg-white overflow-hidden py-24 md:py-32">
            {/* Background Text Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                <h2 className="text-[15vw] font-serif font-black text-gray-50 leading-none whitespace-nowrap">
                    NEW EDITION
                </h2>
            </div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square max-w-[500px] mx-auto group">
                            {/* Sophisticated Shadow/Glow */}
                            <div className="absolute inset-x-10 bottom-[-10%] h-[20px] bg-black/10 blur-2xl rounded-[100%] transition-transform duration-700 group-hover:scale-110"></div>

                            <Link href={`/product/${product._id}`} className="block h-full">
                                <img
                                    src={product.images ? product.images[0] : product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain relative z-10 transition-transform duration-1000 group-hover:scale-105"
                                />
                            </Link>

                            {/* Floating Edition Label */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 vertical-text hidden md:flex items-center gap-4">
                                <div className="w-px h-12 bg-gray-200"></div>
                                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold whitespace-nowrap rotate-180">
                                    Limited Heritage Series
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="inline-block text-gold text-xs font-black uppercase tracking-[0.4em] mb-6">
                                The Latest Masterpiece
                            </span>

                            <h2 className="text-5xl md:text-7xl font-serif text-black mb-8 leading-[1.1]">
                                {product.name}
                            </h2>

                            <p className="text-gray-500 text-lg font-light leading-relaxed mb-12 max-w-lg mx-auto lg:mx-0">
                                {product.description.length > 180 ?
                                    `${product.description.substring(0, 180)}...` :
                                    product.description
                                }
                            </p>

                            <div className="flex flex-col items-center lg:items-start gap-8">
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Exclusivity Price</span>
                                    <span className="text-4xl font-serif text-black">₹{product.price.toLocaleString()}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                                    <Link
                                        href={`/product/${product._id}`}
                                        className="group relative px-12 py-5 bg-black text-white text-xs font-black uppercase tracking-widest overflow-hidden transition-all hover:bg-gold"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            Acquire Now <ArrowRight size={16} />
                                        </span>
                                    </Link>

                                    <Link
                                        href="/watches"
                                        className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors flex items-center gap-2 border-b border-transparent hover:border-black pb-1"
                                    >
                                        The Full Collection <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator or decorative line */}
            <div className="absolute right-[5%] bottom-[10%] hidden xl:block">
                <div className="flex flex-col items-center gap-6">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-gray-300 font-bold rotate-90 origin-left">
                        EST. 2024
                    </span>
                    <div className="w-px h-24 bg-gray-100"></div>
                </div>
            </div>
        </section>
    );
};

export default NewlyLaunched;
