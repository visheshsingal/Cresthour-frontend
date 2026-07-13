'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push('/my-orders');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 shadow-sm w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif mb-2 text-black">Welcome Back</h1>
                    <p className="text-gray-500 text-sm font-light">Login to your account to manage orders</p>
                </div>

                {error && <p className="text-red-500 text-sm mb-6 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors text-black"
                            placeholder="example@cresthour.com"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors text-black"
                            placeholder="••••••••"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-gold py-4 mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Don't have an account? <Link href="/signup" className="text-gold font-bold hover:underline">Create One</Link></p>
                    <div className="mt-4 pt-4 border-t border-gray-50">
                        <Link href="/admin" className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-gold transition-colors">Admin Access</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
