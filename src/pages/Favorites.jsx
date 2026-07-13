import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            <div className="container-custom">
                <header className="mb-16 border-b border-gray-100 pb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
                    >
                        Your Personal Atelier
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-black leading-tight"
                    >
                        Wishlist
                    </motion.h1>
                </header>

                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 bg-gray-50 rounded-lg border border-dashed border-gray-200"
                    >
                        <Heart size={64} className="mx-auto mb-8 text-gray-200" />
                        <h2 className="text-3xl font-serif text-black mb-4">Your collection is empty</h2>
                        <p className="text-gray-400 font-light italic mb-10 max-w-sm mx-auto">
                            Add the timepieces that speak to you to curate your perfect collection.
                        </p>
                        <Link
                            href="/watches"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all"
                        >
                            Explore Watches <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        <AnimatePresence>
                            {favorites.map((product, index) => (
                                <ProductCard key={product._id} product={product} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
