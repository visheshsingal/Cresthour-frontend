'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Watches = () => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(10000);

    const categories = ['All', 'Classic', 'Sport', 'Gold', 'Elite', 'Vintage'];

    useEffect(() => {
        const categoryFromQuery = searchParams.get('category');
        if (categoryFromQuery) {
            setSelectedCategory(categoryFromQuery);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products`);
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory, priceRange, products]);

    const FilterSidebar = () => (
        <div className="space-y-10">
            {/* Search */}
            <div className="relative group">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-100 py-2 pl-7 outline-none focus:border-gold transition-colors font-light text-xs italic"
                />
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors" size={14} />
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    Categories <div className="w-8 h-px bg-gray-50"></div>
                </h3>
                <div className="flex flex-col gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-left text-[11px] font-medium tracking-[0.1em] uppercase py-0.5 transition-all flex items-center justify-between group ${selectedCategory === cat ? 'text-gold' : 'text-gray-400 hover:text-black'
                                }`}
                        >
                            <span>{cat}</span>
                            {selectedCategory === cat && <div className="w-1 h-1 rounded-full bg-gold"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Price Range
                    </h3>
                    <span className="text-[11px] font-bold text-black font-serif">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-0.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between mt-3 text-[9px] text-gray-300 font-bold uppercase tracking-widest">
                    <span>₹0</span>
                    <span>₹10K</span>
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange(10000);
                }}
                className="w-full py-3 border border-gray-100 text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all"
            >
                Reset Filters
            </button>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Minimal Compact Header instead of Bulky Banner */}
            <div className="pt-32 pb-12 bg-gray-50/50">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold text-[9px] font-black uppercase tracking-[0.4em] mb-2 block">Our Collection</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">All Timepieces</h1>
                        </motion.div>
                        <div className="hidden lg:block">
                            <p className="text-gray-400 text-xs font-light tracking-wide max-w-xs text-right">
                                Explore our curated selection of luxury watches, precision-engineered for the modern collector.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Compact Sidebar */}
                    <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-32 h-fit">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content: Denser Grid */}
                    <div className="flex-1">
                        {/* Compact Toolbar */}
                        <div className="mb-12 flex justify-between items-center pb-6 border-b border-gray-50">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                                Results: <span className="text-black">{filteredProducts.length} Pieces</span>
                            </p>

                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                                >
                                    <SlidersHorizontal size={14} /> Filter
                                </button>

                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold transition-colors">
                                    <span className="text-gray-400">Sort:</span>
                                    <span className="text-black">Newest</span>
                                    <ChevronDown size={12} className="text-gold" />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-[4/5] bg-gray-50"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-32 border border-dashed border-gray-100">
                                <Search className="mx-auto mb-4 text-gray-200" size={40} />
                                <h3 className="text-xl font-serif text-black mb-2">No matching watches</h3>
                                <p className="text-gray-400 text-xs font-light italic">Refine your search parameters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard key={product._id} product={product} index={index} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[80%] max-w-xs bg-white z-[101] shadow-2xl p-8 lg:hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                                <h2 className="text-xl font-serif">Filter</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="p-1">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <FilterSidebar />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Watches;
