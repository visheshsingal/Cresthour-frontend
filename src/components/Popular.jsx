import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, ArrowUpRight } from 'lucide-react';

const Popular = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products`);
                const popularItems = res.data.filter(p => p.isPopular);
                setProducts(popularItems);
            } catch (err) {
                console.error('Error fetching popular products', err);
            }
        };
        fetchPopular();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="relative py-16 bg-deepGreen overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container-custom relative z-10">
                {/* Header: Clean & Sharp (Reduced Margin) */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="text-gold text-[10px] uppercase font-black tracking-[0.5em] mb-3 block">
                            The Elite Selection
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-none">
                            Trending Masterpieces
                        </h2>
                    </div>
                    <Link href="/watches" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-all duration-300">
                        View Full Archive <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* The Product Cards: Integrated Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            {/* Card Media: The Studio Stage with Integrated Info */}
                            <div className="relative aspect-[4/5] bg-[#0a2e2a] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-gold/30">

                                <Link href={`/product/${product._id}`} className="block h-full w-full p-8 pb-32">
                                    <img
                                        src={product.images ? product.images[0] : product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain transform transition-all duration-1000 ease-out group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                                    />
                                </Link>

                                {/* Integrated Info: Positioned at the bottom of the card */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[8px] text-gold uppercase font-black tracking-[0.3em] opacity-80">
                                            {product.category}
                                        </span>
                                        <h3 className="text-lg font-serif text-white tracking-wide truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-xl font-serif text-white group-hover:text-gold transition-colors">
                                            ₹{product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Overlay: Appears on Hover */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 bg-white">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                alert('Added to cart!');
                                            }}
                                            className="flex-1 h-10 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gold transition-all"
                                        >
                                            <ShoppingBag size={14} /> Add to Cart
                                        </button>
                                        <Link
                                            href={`/product/${product._id}`}
                                            className="w-10 h-10 bg-gray-100 text-black flex items-center justify-center hover:bg-gold hover:text-white transition-all"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Popular;
