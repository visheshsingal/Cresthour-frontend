'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' or 'Razorpay'
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
            alert('Please login to proceed with your order.');
            router.push('/login');
        } else {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [router]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRazorpayPayment = async (orderData) => {
        try {
            // 1. Create Order on Server
            const { data: rzpOrder } = await axios.post(`${API_BASE_URL}/payment/razorpay-order`, {
                amount: cartTotal
            });

            const options = {
                key: 'rzp_test_SCMLwhLsBt5gwO',
                amount: rzpOrder.amount,
                currency: 'INR',
                name: 'Cresthour Watches',
                description: 'Luxury Timepiece Purchase',
                order_id: rzpOrder.id,
                handler: async (response) => {
                    try {
                        // 2. Verify Payment on Server
                        const verifyRes = await axios.post(`${API_BASE_URL}/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderData: orderData
                        });

                        if (verifyRes.data.orderId) {
                            alert('Payment successful! Order placed.');
                            clearCart();
                            router.push('/my-orders');
                        }
                    } catch (err) {
                        console.error('Verification failed', err);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: '#C5A059'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Razorpay initialization failed', err);
            alert('Failed to start payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert('Your cart is empty');

        setLoading(true);

        const orderData = {
            items: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.images ? item.images[0] : item.image
            })),
            totalAmount: cartTotal,
            customerInfo: formData,
            paymentMethod: paymentMethod
        };

        if (paymentMethod === 'Razorpay') {
            await handleRazorpayPayment(orderData);
        } else {
            // Handle COD
            try {
                await axios.post(`${API_BASE_URL}/orders`, orderData);
                alert('Order placed successfully (COD)! We will contact you soon.');
                clearCart();
                router.push('/my-orders');
            } catch (err) {
                console.error('Error placing order', err);
                alert('Failed to place order. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 text-center">
                <h2 className="text-3xl font-serif mb-6 text-black">Your bag is empty</h2>
                <button onClick={() => router.push('/watches')} className="btn-gold">Go to Shop</button>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
            <div className="container-custom">
                <h1 className="text-4xl font-serif mb-12 text-black text-center">Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Order Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 md:p-12 shadow-sm order-2 lg:order-1"
                    >
                        <h2 className="text-2xl font-serif mb-8 text-black border-b pb-4">Delivery Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text" name="name" placeholder="Full Name"
                                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors text-black"
                                    value={formData.name} onChange={handleInputChange} required
                                />
                                <input
                                    type="email" name="email" placeholder="Email Address"
                                    className="w-full border-b border-gray-200 py-3 bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                                    value={formData.email} readOnly required
                                />
                            </div>
                            <input
                                type="text" name="phone" placeholder="Phone Number"
                                className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors text-black"
                                onChange={handleInputChange} required
                            />
                            <input
                                type="text" name="address" placeholder="Shipping Address"
                                className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors text-black"
                                onChange={handleInputChange} required
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text" name="city" placeholder="City"
                                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors text-black"
                                    onChange={handleInputChange} required
                                />
                                <input
                                    type="text" name="pincode" placeholder="Pincode"
                                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors text-black"
                                    onChange={handleInputChange} required
                                />
                            </div>

                            <div className="pt-10">
                                <h3 className="text-xl font-serif mb-6 text-black border-b pb-4">Payment Method</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-4 p-4 border rounded cursor-pointer transition-all hover:bg-gray-50">
                                        <input
                                            type="radio" name="payment" value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={() => setPaymentMethod('COD')}
                                            className="w-4 h-4 accent-gold"
                                        />
                                        <div>
                                            <p className="font-medium text-black">Cash on Delivery (COD)</p>
                                            <p className="text-xs text-gray-500">Pay when you receive the watch.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center space-x-4 p-4 border rounded cursor-pointer transition-all hover:bg-gray-50">
                                        <input
                                            type="radio" name="payment" value="Razorpay"
                                            checked={paymentMethod === 'Razorpay'}
                                            onChange={() => setPaymentMethod('Razorpay')}
                                            className="w-4 h-4 accent-gold"
                                        />
                                        <div>
                                            <p className="font-medium text-black">Online Payment (Razorpay)</p>
                                            <p className="text-xs text-gray-500">Pay securely via Cards, UPI, or Net Banking.</p>
                                        </div>
                                    </label>
                                </div>
                                <button type="submit" disabled={loading} className="w-full btn-gold py-4 text-base mt-10">
                                    {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order' : 'Proceed to Pay'}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white p-8 shadow-sm lg:sticky lg:top-32 h-fit">
                            <h2 className="text-2xl font-serif mb-8 text-black border-b pb-4">Order Summary</h2>
                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex space-x-4 border-b border-gray-50 pb-4">
                                        <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                        <div className="flex-1">
                                            <h3 className="font-serif text-black">{item.name}</h3>
                                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                            <p className="text-gold font-medium">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 pt-6 space-y-3">
                                <div className="flex justify-between text-gray-500 font-light">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-light">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-serif text-black pt-3">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
