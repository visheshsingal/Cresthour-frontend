import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowUpRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col"
        >
            {/* Image Container: More Compact Aspect Ratio */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f7f5] transition-colors duration-500 group-hover:bg-[#f0f0ed] rounded">
                <Link href={`/product/${product._id}`} className="block h-full w-full p-6 md:p-8">
                    <img
                        src={product.images ? product.images[0] : (product.image || '')}
                        alt={product.name}
                        className={`w-full h-full object-contain mix-blend-multiply transform transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-xl ${product.stock <= 0 ? 'grayscale opacity-60' : ''}`}
                    />
                </Link>

                {/* Badge: Minimalist */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNewArrival && (
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-gold bg-white px-2 py-1 rounded-full shadow-sm">
                            New
                        </span>
                    )}
                    {product.stock <= 0 && (
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white bg-red-500 px-2 py-1 rounded-full shadow-sm">
                            Sold Out
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="absolute right-4 bottom-4 flex flex-col gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${isFavorite(product._id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    >
                        <Heart size={16} fill={isFavorite(product._id) ? "currentColor" : "none"} />
                    </button>
                    {product.stock > 0 && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                alert('Added to cart!');
                            }}
                            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gold transition-all shadow-sm"
                        >
                            <Plus size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Info: Focused & Clean */}
            <div className="pt-4 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <span className="text-[8px] text-gray-400 uppercase font-black tracking-[0.2em] mb-1 block">
                            {product.category || 'Luxury'}
                        </span>
                        <Link href={`/product/${product._id}`}>
                            <h3 className="text-base md:text-lg font-serif text-black leading-snug group-hover:text-gold transition-colors duration-300 line-clamp-1">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-[10px] text-gray-400 font-light mt-1 line-clamp-1 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                    <p className="text-sm md:text-base font-serif text-black whitespace-nowrap">
                        ₹{product.price.toLocaleString()}
                    </p>
                </div>

                {/* Secondary Link: Appears on hover */}
                <div className="mt-2 h-4 overflow-hidden">
                    <Link
                        href={`/product/${product._id}`}
                        className="text-[8px] font-bold uppercase tracking-widest text-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                        View Details <ArrowUpRight size={10} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
