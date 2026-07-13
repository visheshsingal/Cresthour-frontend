'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Star, Truck, Shield, Clock, Heart, Share2, Send, MessageSquare } from 'lucide-react';

const ProductPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [loading, setLoading] = useState(true);

    // Review states
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products/${id}`);
                setProduct(res.data);

                // Initialize with some "real" local reviews if any saved, else empty
                const savedReviews = localStorage.getItem(`reviews_${id}`);
                setReviews(savedReviews ? JSON.parse(savedReviews) : []);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching product', err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            console.log('Product link copied to console: ' + url);
            alert('Link copied to clipboard!');
        });
    };

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return;

        setIsSubmittingReview(true);

        // Simulating API call
        setTimeout(() => {
            const review = {
                id: Date.now(),
                user: JSON.parse(localStorage.getItem('user'))?.name || 'Anonymous Guest',
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            };

            const updatedReviews = [review, ...reviews];
            setReviews(updatedReviews);
            localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
            setNewReview({ rating: 5, comment: '' });
            setIsSubmittingReview(false);
        }, 800);
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl font-serif italic text-gray-500">Discovering excellence...</p>
            </div>
        </div>
    );

    if (!product) return (
        <div className="h-screen flex items-center justify-center bg-white text-black">
            <p className="text-xl font-serif text-gray-500">Product not found.</p>
        </div>
    );

    const images = product.images || [product.image];

    return (
        <div className="pt-32 pb-20 bg-white text-black min-h-screen">
            <div className="container-custom">
                {/* Main Product Section */}
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start mb-24">

                    {/* Left: Image Gallery */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] bg-[#F9F9F7] overflow-hidden group relative border border-gray-100"
                        >
                            <img
                                src={images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Floating Share Button */}
                            <button
                                onClick={handleShare}
                                className="absolute right-6 top-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm z-10"
                                title="Share Timepiece"
                            >
                                <Share2 size={20} />
                            </button>
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square bg-[#F9F9F7] border transition-all ${activeImage === index ? 'border-gold' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Essential Info & Actions */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em] block">
                                    {product.category} COLLECTION
                                </span>
                                <h1 className="text-5xl md:text-6xl font-serif leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex text-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                                    ({reviews.length} Authentic Reviews)
                                </span>
                            </div>

                            <div className="text-4xl font-serif text-black py-4 border-y border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    ₹{product.price.toLocaleString()}
                                    {product.stock <= 0 && (
                                        <span className="text-[10px] bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full font-black tracking-widest uppercase">Out of Stock</span>
                                    )}
                                </div>
                                {product.isNewArrival && (
                                    <span className="text-[10px] bg-black text-white px-4 py-1.5 rounded-full font-black tracking-widest uppercase">New Arrival</span>
                                )}
                            </div>

                            <p className="text-gray-500 font-light leading-relaxed text-sm italic">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        if (product.stock > 0) {
                                            addToCart(product);
                                            alert('Added to cart!');
                                        }
                                    }}
                                    disabled={product.stock <= 0}
                                    className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${product.stock <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gold'}`}
                                >
                                    {product.stock <= 0 ? 'Waitlist Full' : 'Arguire Piece'}
                                </button>
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={`w-16 flex items-center justify-center border transition-all ${isFavorite(product._id) ? 'bg-red-50 border-red-100 text-red-500' : 'border-gray-200 hover:border-black'}`}
                                >
                                    <Heart size={20} fill={isFavorite(product._id) ? "currentColor" : "none"} />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    if (product.stock > 0) {
                                        addToCart(product);
                                        router.push('/checkout');
                                    }
                                }}
                                disabled={product.stock <= 0}
                                className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${product.stock <= 0 ? 'border border-gray-100 text-gray-300 cursor-not-allowed' : 'border border-black text-black hover:bg-black hover:text-white'}`}
                            >
                                {product.stock <= 0 ? 'Check Back Later' : 'Direct Checkout'}
                            </button>
                        </div>

                        {/* Core Features Grid */}
                        <div className="grid grid-cols-2 gap-y-8 gap-x-12 pt-10 border-t border-gray-50">
                            {[
                                { icon: Truck, text: 'Complimentary Global Shipping' },
                                { icon: Shield, text: '2 Year Masterpiece Warranty' },
                                { icon: Clock, text: 'Legendary Swiss Movement' },
                                { icon: Star, text: 'Hand-Finished Materials' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <item.icon size={18} className="text-gold flex-shrink-0" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 leading-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Sub-Section 2: Real Reviews & Engagement */}
                <div className="grid lg:grid-cols-3 gap-16 py-24 border-t border-gray-100">
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-serif mb-6">Owner Reflections</h2>
                        <div className="bg-gray-50 p-8 rounded-sm">
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-6">Submit Your Experience</h4>
                            <form onSubmit={handleAddReview} className="space-y-6">
                                <div className="flex gap-2 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={`${newReview.rating >= star ? 'text-gold' : 'text-gray-200'} transition-colors`}
                                        >
                                            <Star size={20} fill={newReview.rating >= star ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    placeholder="Describe your journey with this timepiece..."
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    className="w-full bg-white border border-gray-100 p-4 h-32 outline-none focus:border-gold transition-colors text-sm font-light italic"
                                    required
                                />
                                <button
                                    disabled={isSubmittingReview}
                                    className="w-full bg-black text-white py-4 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmittingReview ? 'Processing...' : <><Send size={14} /> Post Review</>}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {reviews.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50/50 rounded flex flex-col items-center">
                                <MessageSquare size={40} className="text-gray-200 mb-6" />
                                <p className="text-gray-400 font-serif italic text-lg">Be the first to share your acquisition story.</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {reviews.map(review => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={review.id}
                                        className="border-b border-gray-50 pb-10"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-sm font-bold tracking-widest uppercase mb-1">{review.user}</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{review.date}</p>
                                            </div>
                                            <div className="flex text-gold gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 font-light italic leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
