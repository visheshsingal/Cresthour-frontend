'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MessageSquare, XCircle, AlertCircle } from 'lucide-react';

const formatExternalLink = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
};

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [specialReqInput, setSpecialReqInput] = useState({}); // orderId -> value
    const [cancelReasonInput, setCancelReasonInput] = useState({}); // orderId -> value
    const [activeAction, setActiveAction] = useState(null); // {id, type: 'special' | 'cancel'}
    const router = useRouter();

    const fetchOrders = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!token || !user) {
            router.push('/login');
            return;
        }

        try {
            const res = await axios.get(`${API_BASE_URL}/orders/my-orders/${user.email}`);
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [router]);

    const handleSpecialRequest = async (orderId) => {
        try {
            await axios.put(`${API_BASE_URL}/orders/${orderId}/special-request`, {
                specialRequest: specialReqInput[orderId]
            });
            alert('Special request submitted successfully.');
            setActiveAction(null);
            fetchOrders();
        } catch (err) {
            alert('Failed to submit request.');
        }
    };

    const handleCancelRequest = async (orderId) => {
        try {
            await axios.put(`${API_BASE_URL}/orders/${orderId}/cancel-request`, {
                reason: cancelReasonInput[orderId]
            });
            alert('Cancellation request sent to admin.');
            setActiveAction(null);
            fetchOrders();
        } catch (err) {
            alert('Failed to send cancellation request.');
        }
    };

    return (
        <div className="pt-28 pb-20 bg-[#fafafa] min-h-screen text-black font-sans">
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif mb-4">Your Heritage Journey</h1>
                        <p className="text-gray-400 text-sm uppercase tracking-[0.3em]">Purchase History & Concierge</p>
                    </header>

                    {loading ? (
                        <div className="text-center py-20 animate-pulse">
                            <p className="font-serif italic text-gray-400">Opening your archives...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <p className="text-gray-400 mb-8 font-serif">No acquisitions found in your collection.</p>
                            <button onClick={() => router.push('/watches')} className="btn-gold px-12 py-4">Explore Collection</button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {orders.map((order) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    {/* Header Info */}
                                    <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50/30">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-gold mb-1">REFERENCE</p>
                                            <p className="font-serif text-xl">#{order._id.slice(-8).toUpperCase()}</p>
                                            <p className="text-xs text-gray-400 tracking-wide">{new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-2">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                order.status === 'Cancelled' ? 'bg-red-50 text-red-500' :
                                                    order.status === 'Refunded' ? 'bg-purple-50 text-purple-600' : 'bg-gold/10 text-gold'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <p className="text-2xl font-serif text-black">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="p-8 lg:p-12">
                                        <div className="grid lg:grid-cols-12 gap-12">
                                            {/* Items List */}
                                            <div className="lg:col-span-7 space-y-8">
                                                <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-4">ORDERED ITEMS</h4>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-6 group">
                                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-serif text-lg mb-1">{item.name}</h4>
                                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Qty: {item.quantity} • ₹{item.price.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Concierge Actions */}
                                                <div className="pt-10 flex flex-wrap gap-4 border-t border-gray-100 mt-10">
                                                    <button
                                                        onClick={() => setActiveAction(activeAction?.id === order._id && activeAction?.type === 'special' ? null : { id: order._id, type: 'special' })}
                                                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${activeAction?.id === order._id && activeAction?.type === 'special' ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                                    >
                                                        <MessageSquare size={14} />
                                                        Special Request
                                                    </button>
                                                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && !order.cancelRequest?.isRequested && (
                                                        <button
                                                            onClick={() => setActiveAction(activeAction?.id === order._id && activeAction?.type === 'cancel' ? null : { id: order._id, type: 'cancel' })}
                                                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${activeAction?.id === order._id && activeAction?.type === 'cancel' ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-red-50 text-red-400 hover:bg-red-100'}`}
                                                        >
                                                            <XCircle size={14} />
                                                            Cancel Order
                                                        </button>
                                                    )}
                                                </div>

                                                <AnimatePresence>
                                                    {activeAction?.id === order._id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-6 overflow-hidden"
                                                        >
                                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-black mb-3">
                                                                    {activeAction.type === 'special' ? 'Tell us your preferences' : 'Reason for cancellation'}
                                                                </h5>
                                                                <textarea
                                                                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-gold min-h-[100px]"
                                                                    placeholder={activeAction.type === 'special' ? "Gift wrap requested? Custom engraving note?" : "Please tell us why you wish to cancel."}
                                                                    value={activeAction.type === 'special' ? (specialReqInput[order._id] || '') : (cancelReasonInput[order._id] || '')}
                                                                    onChange={(e) => activeAction.type === 'special'
                                                                        ? setSpecialReqInput({ ...specialReqInput, [order._id]: e.target.value })
                                                                        : setCancelReasonInput({ ...cancelReasonInput, [order._id]: e.target.value })
                                                                    }
                                                                />
                                                                <button
                                                                    onClick={() => activeAction.type === 'special' ? handleSpecialRequest(order._id) : handleCancelRequest(order._id)}
                                                                    className="mt-4 btn-gold px-8 py-3 text-[10px] uppercase font-black"
                                                                >
                                                                    Submit Request
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {order.cancelRequest?.isRequested && (
                                                    <div className="mt-8 flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700 text-xs font-medium">
                                                        <AlertCircle size={16} />
                                                        Cancellation {order.cancelRequest.status}
                                                    </div>
                                                )}

                                                {order.specialRequest && (
                                                    <div className="mt-8 p-6 bg-gold/5 rounded-2xl border border-gold/10">
                                                        <p className="text-[10px] uppercase font-black text-gold mb-2 tracking-widest">Special Note</p>
                                                        <p className="text-sm text-gray-700 italic">"{order.specialRequest}"</p>
                                                    </div>
                                                )}

                                                {order.trackingLink && (
                                                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[10px] uppercase font-black text-blue-600 mb-1 tracking-widest">Track Your Timepiece</p>
                                                            <p className="text-xs text-blue-500 font-medium">Your heritage item is in motion.</p>
                                                        </div>
                                                        <a
                                                            href={formatExternalLink(order.trackingLink)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="bg-blue-600 text-white text-[10px] font-black uppercase px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
                                                        >
                                                            Track Order
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Logistics Info */}
                                            <div className="lg:col-span-5 border-l border-gray-50 lg:pl-12 space-y-10">
                                                <div>
                                                    <h4 className="text-[10px] uppercase font-black tracking-widest text-gold mb-4">HERITAGE DESTINATION</h4>
                                                    <p className="font-bold text-black mb-1">{order.customerInfo.name}</p>
                                                    <p className="text-gray-500 text-sm leading-relaxed truncate">{order.customerInfo.address}</p>
                                                    <p className="text-gray-500 text-sm">{order.customerInfo.city}, {order.customerInfo.pincode}</p>
                                                    <p className="text-gray-500 text-sm mt-2">{order.customerInfo.phone}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] uppercase font-black tracking-widest text-gold mb-4">PAYMENT STRATEGY</h4>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                                            <AlertCircle size={16} className="text-gray-400" />
                                                        </div>
                                                        <p className="font-bold text-sm text-black">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Paid'}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-400">Status: {order.paymentStatus}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
