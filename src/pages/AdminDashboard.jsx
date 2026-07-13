import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import {
    Calendar, Filter, ChevronLeft, ChevronRight, TrendingUp, Clock,
    Truck, CheckCircle, XCircle, Package, BarChart3,
    DollarSign, Briefcase, MessageSquare, AlertTriangle
} from 'lucide-react';

const formatExternalLink = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('add'); // 'add', 'edit', 'orders', 'sales'
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Filters & Pagination State
    const [dateFilter, setDateFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Classic',
        isPopular: false,
        isNewArrival: false,
        stock: 10
    });
    const [images, setImages] = useState([null, null, null, null]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/admin';
        }
        fetchProducts();
        fetchOrders();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [orders, dateFilter, startDate, endDate]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/products`);
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products', err);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/orders`);
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders', err);
        }
    };

    const applyFilters = () => {
        let tempOrders = [...orders];
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const yesterday = today - 86400000;

        if (dateFilter === 'today') {
            tempOrders = tempOrders.filter(o => new Date(o.orderDate).getTime() >= today);
        } else if (dateFilter === 'yesterday') {
            tempOrders = tempOrders.filter(o => {
                const time = new Date(o.orderDate).getTime();
                return time >= yesterday && time < today;
            });
        } else if (dateFilter === 'custom' && startDate && endDate) {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime() + 86400000;
            tempOrders = tempOrders.filter(o => {
                const time = new Date(o.orderDate).getTime();
                return time >= start && time <= end;
            });
        }

        setFilteredOrders(tempOrders);
        setCurrentPage(1);
    };

    // Analytics Calculations
    const stats = {
        total: filteredOrders.length,
        pending: filteredOrders.filter(o => o.status === 'Pending').length,
        processing: filteredOrders.filter(o => o.status === 'Processing').length,
        shipped: filteredOrders.filter(o => o.status === 'Shipped').length,
        delivered: filteredOrders.filter(o => o.status === 'Delivered').length,
        cancelled: filteredOrders.filter(o => o.status === 'Cancelled').length,
        refunded: filteredOrders.filter(o => o.status === 'Refunded').length,
        cancelRequests: filteredOrders.filter(o => o.cancelRequest?.isRequested && o.cancelRequest.status === 'Pending').length,

        // Revenue Stats
        totalRevenue: filteredOrders.reduce((acc, o) => acc + o.totalAmount, 0),
        earnedRevenue: filteredOrders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.totalAmount, 0),
        pendingRevenue: filteredOrders.filter(o => ['Pending', 'Processing', 'Shipped'].includes(o.status)).reduce((acc, o) => acc + o.totalAmount, 0),
        cancelledRevenue: filteredOrders.filter(o => o.status === 'Cancelled').reduce((acc, o) => acc + o.totalAmount, 0),
        refundedRevenue: filteredOrders.filter(o => o.status === 'Refunded').reduce((acc, o) => acc + o.totalAmount, 0)
    };

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:4000/api/admin/orders/${orderId}`, { status: newStatus });
            alert('Order status updated');
            fetchOrders();
        } catch (err) {
            console.error('Error updating order status', err);
        }
    };

    const handleTrackingUpdate = async (orderId, trackingLink) => {
        try {
            await axios.put(`http://localhost:4000/api/admin/orders/${orderId}/tracking`, { trackingLink });
            alert('Tracking link updated');
            fetchOrders();
        } catch (err) {
            console.error('Error updating tracking link', err);
        }
    };

    const handleCancelAction = async (orderId, action) => {
        try {
            await axios.put(`${API_BASE_URL}/admin/orders/${orderId}/cancel-handle`, { action });
            alert(`Cancellation request ${action.toLowerCase()}`);
            fetchOrders();
        } catch (err) {
            console.error('Error handling cancel request', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        images.forEach(img => {
            if (img) data.append('images', img);
        });

        try {
            if (editingId) {
                await axios.put(`${API_BASE_URL}/products/${editingId}`, data);
                alert('Product updated successfully');
            } else {
                await axios.post(`${API_BASE_URL}/products`, data);
                alert('Product added successfully');
            }
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'Classic',
                isPopular: false,
                isNewArrival: false,
                stock: 10
            });
            setImages([null, null, null, null]);
            setEditingId(null);
            fetchProducts();
            setActiveTab('edit');
        } catch (err) {
            console.error('Error saving product', err);
            alert('Error saving product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_BASE_URL}/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product', err);
            }
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            isPopular: product.isPopular,
            isNewArrival: product.isNewArrival,
            stock: product.stock || 10
        });
        // We can't easily populate file inputs with existing URLs, 
        // but we can clear them or handle them separately. 
        // For simplicity, let's keep it clear for new uploads.
        setImages([null, null, null, null]);
        setEditingId(product._id);
        setActiveTab('add');
    };

    return (
        <div className="pt-24 min-h-screen bg-[#f8f9fa] pb-20 text-black">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif">Admin Control</h1>
                        <p className="text-gray-500 text-sm">Cresthour Global Hub — Full Store Analytics</p>
                    </div>
                </div>

                <div className="flex space-x-2 mb-8 bg-white p-1 rounded-xl shadow-sm w-fit overflow-x-auto max-w-full">
                    <button
                        onClick={() => { setActiveTab('add'); setEditingId(null); }}
                        className={`px-6 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'add' ? 'bg-gold text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {editingId ? 'Edit Product' : 'Add Product'}
                    </button>
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-6 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'edit' ? 'bg-gold text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Manage Store
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'orders' ? 'bg-gold text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Customer Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('sales')}
                        className={`px-6 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'sales' ? 'bg-gold text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Sales Report
                    </button>
                </div>

                {/* SHARED FILTERS (FOR ORDERS AND SALES) */}
                {(activeTab === 'orders' || activeTab === 'sales') && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${dateFilter === 'all' ? 'border-gold bg-gold/5 text-gold' : 'border-gray-100 text-gray-500'}`} onClick={() => setDateFilter('all')}>
                                <span className="text-xs font-bold uppercase tracking-wider">All Time</span>
                            </button>
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${dateFilter === 'today' ? 'border-gold bg-gold/5 text-gold' : 'border-gray-100 text-gray-500'}`} onClick={() => setDateFilter('today')}>
                                <span className="text-xs font-bold uppercase tracking-wider">Today</span>
                            </button>
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${dateFilter === 'yesterday' ? 'border-gold bg-gold/5 text-gold' : 'border-gray-100 text-gray-500'}`} onClick={() => setDateFilter('yesterday')}>
                                <span className="text-xs font-bold uppercase tracking-wider">Yesterday</span>
                            </button>
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${dateFilter === 'custom' ? 'border-gold bg-gold/5 text-gold' : 'border-gray-100 text-gray-500'}`} onClick={() => setDateFilter('custom')}>
                                <Calendar size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">Custom Range</span>
                            </button>
                        </div>

                        {dateFilter === 'custom' && (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="text-xs border border-gray-200 p-2 rounded focus:border-gold outline-none" />
                                <span className="text-gray-300">to</span>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="text-xs border border-gray-200 p-2 rounded focus:border-gold outline-none" />
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Filter size={14} />
                            <span>Showing {filteredOrders.length} records</span>
                        </div>
                    </div>
                )}

                {activeTab === 'add' && (
                    <div className="bg-white p-8 shadow-sm rounded-xl max-w-3xl mx-auto border border-gray-100">
                        <h2 className="text-xl font-serif mb-6">{editingId ? 'Modify Product' : 'Catalog New Timepiece'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Timepiece Title</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border-b border-gray-200 p-2 focus:border-gold focus:outline-none bg-transparent" required />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Artisan Narrative (Description)</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border p-3 rounded-lg focus:border-gold focus:outline-none" rows="4" required />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Valuation (₹)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border-b border-gray-200 p-2 focus:border-gold focus:outline-none bg-transparent" required />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Inventory Units</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full border-b border-gray-200 p-2 focus:border-gold focus:outline-none bg-transparent" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Collection Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border-b border-gray-200 p-2 focus:border-gold focus:outline-none bg-transparent cursor-pointer">
                                    <option value="Classic">Classic Collection</option>
                                    <option value="Sport">Sport Series</option>
                                    <option value="Gold">Precious Metals (Gold)</option>
                                    <option value="Elite">Elite Series</option>
                                    <option value="Vintage">Vintage Archive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold mb-4 text-gray-400">Gallery Upload (4 Individual Slots)</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="relative aspect-square border-2 border-dashed border-gray-100 rounded-xl overflow-hidden group hover:border-gold transition-all duration-300">
                                            {images[index] ? (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        src={URL.createObjectURL(images[index])}
                                                        alt={`Preview ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleImageChange(index, e)}
                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                        accept="image/*"
                                                    />
                                                    <p className="text-[10px] text-gray-400 group-hover:text-gold uppercase tracking-widest font-bold">
                                                        {index === 0 ? 'Primary' : `Slot ${index + 1}`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-[10px] text-gray-400 italic">Suggestion: Upload PNG with white/transparent background for best look.</p>
                            </div>
                            <div className="flex space-x-12 py-2">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleInputChange} className="w-4 h-4 accent-gold" />
                                    <span className="text-sm font-medium group-hover:text-gold transition-colors">Mark as Trending</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleInputChange} className="w-4 h-4 accent-gold" />
                                    <span className="text-sm font-medium group-hover:text-gold transition-colors">Seasonal Registry (New)</span>
                                </label>
                            </div>
                            <button type="submit" disabled={loading} className="btn-gold w-full mt-4 py-4 disabled:opacity-50 text-white font-bold tracking-widest uppercase text-xs">
                                {loading ? 'Transmitting...' : editingId ? 'Finalize Changes' : 'Publish Product'}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'edit' && (
                    <div className="grid gap-4">
                        {products.map(product => (
                            <div key={product._id} className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between border border-gray-50 hover:border-gold/30 transition-all">
                                <div className="flex items-center space-x-5">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                                        <img src={product.images ? product.images[0] : (product.image || '')} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg text-black">{product.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                            <span className="uppercase tracking-widest">{product.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="font-bold text-gray-900">₹{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(product)} className="px-4 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/5 rounded-lg transition-colors border border-gold/20">Edit</button>
                                    <button onClick={() => handleDelete(product._id)} className="px-4 py-2 text-xs font-bold uppercase text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* 5 BOXES FOR ANALYTICS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <Clock size={20} className="text-blue-500 mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Pending</span>
                                <p className="text-xl font-serif text-black">{stats.pending}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <TrendingUp size={20} className="text-gold mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Processing</span>
                                <p className="text-xl font-serif text-black">{stats.processing}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <Truck size={20} className="text-amber-500 mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Shipped</span>
                                <p className="text-xl font-serif text-black">{stats.shipped}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <CheckCircle size={20} className="text-green-500 mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Delivered</span>
                                <p className="text-xl font-serif text-black">{stats.delivered}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <XCircle size={20} className="text-red-500 mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Cancelled</span>
                                <p className="text-xl font-serif text-black">{stats.cancelled}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <DollarSign size={20} className="text-purple-500 mb-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Refunded</span>
                                <p className="text-xl font-serif text-black">{stats.refunded}</p>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="space-y-6">
                            {currentOrders.map(order => (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
                                    <div className="bg-gray-50/50 p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gold border border-gold/10 font-bold text-[10px]">
                                                #{order._id.slice(-4).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-black uppercase tracking-tighter">Order Detail</h3>
                                                <p className="text-[10px] text-gray-400 font-bold">{new Date(order.orderDate).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                                    order.status === 'Refunded' ? 'bg-purple-100 text-purple-600' : 'bg-gold/10 text-gold'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="text-[10px] border border-gray-200 rounded p-1.5 outline-none font-bold text-black bg-white"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Refunded">Refunded</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-8 grid lg:grid-cols-3 gap-12">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] uppercase tracking-widest font-black text-gold">Customer Info</h4>
                                            <div className="text-sm">
                                                <p className="font-bold text-black">{order.customerInfo.name}</p>
                                                <p className="text-gray-500">{order.customerInfo.email}</p>
                                                <p className="text-gray-500">{order.customerInfo.phone}</p>
                                                <p className="text-gray-400 mt-2 italic truncate">{order.customerInfo.address}, {order.customerInfo.city}</p>
                                            </div>

                                            {/* CANCELLATION REQUEST ALERT */}
                                            {order.cancelRequest?.isRequested && order.cancelRequest.status === 'Pending' && (
                                                <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100">
                                                    <div className="flex items-center gap-2 text-red-600 mb-2">
                                                        <AlertTriangle size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Cancel Request</span>
                                                    </div>
                                                    <p className="text-xs text-red-500 italic mb-4">"{order.cancelRequest.reason}"</p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleCancelAction(order._id, 'Accepted')}
                                                            className="flex-1 bg-red-500 text-white text-[9px] font-black uppercase py-2 rounded-lg hover:bg-red-600"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelAction(order._id, 'Rejected')}
                                                            className="flex-1 bg-white border border-red-200 text-red-500 text-[9px] font-black uppercase py-2 rounded-lg hover:bg-red-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4 border-l border-gray-50 pl-8 lowercase">
                                            <h4 className="text-[10px] uppercase tracking-widest font-black text-gold">Product Summary</h4>
                                            <div className="space-y-3">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-xs">
                                                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                                        <span className="font-bold text-black">₹{item.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                                <div className="pt-3 border-t flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Valuation</span>
                                                    <span className="font-serif text-lg text-gold">₹{order.totalAmount.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 border-l border-gray-50 pl-8 lowercase">
                                            <h4 className="text-[10px] uppercase tracking-widest font-black text-gold">Concierge / Requests</h4>
                                            {order.specialRequest ? (
                                                <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10">
                                                    <div className="flex items-center gap-2 text-gold mb-2">
                                                        <MessageSquare size={14} />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">Special Request</span>
                                                    </div>
                                                    <p className="text-xs text-gray-700 italic">"{order.specialRequest}"</p>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] text-gray-400 italic">No special instructions provided.</p>
                                            )}

                                            {/* TRACKING LINK SECTION */}
                                            <div className="mt-6">
                                                <h4 className="text-[10px] uppercase tracking-widest font-black text-gold mb-3">Shipment Tracking</h4>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Paste tracking link..."
                                                        defaultValue={order.trackingLink}
                                                        id={`tracking-${order._id}`}
                                                        className="flex-1 text-[10px] border border-gray-200 rounded p-2 focus:border-gold outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleTrackingUpdate(order._id, document.getElementById(`tracking-${order._id}`).value)}
                                                        className="bg-black text-white text-[9px] font-black uppercase px-4 py-2 rounded-lg"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                                {order.trackingLink && (
                                                    <a href={formatExternalLink(order.trackingLink)} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 mt-1 inline-block underline">View Link</a>
                                                )}
                                            </div>

                                            {order.cancelRequest?.status !== 'None' && (
                                                <div className={`mt-4 text-[9px] font-black uppercase tracking-widest ${order.cancelRequest.status === 'Accepted' ? 'text-green-500' :
                                                    order.cancelRequest.status === 'Rejected' ? 'text-red-400' : 'text-amber-500'
                                                    }`}>
                                                    Cancellation Status: {order.cancelRequest.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 pb-10">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-gold text-white shadow-lg' : 'bg-white text-gray-400'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'sales' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                        {/* SALES REVENUE CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp size={28} />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2">Total Gross Revenue</h4>
                                <p className="text-3xl font-serif text-black">₹{stats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                    <CheckCircle size={28} />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2">Earned Revenue (Paid)</h4>
                                <p className="text-3xl font-serif text-black">₹{stats.earnedRevenue.toLocaleString()}</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Clock size={28} />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2">Expected (Pending)</h4>
                                <p className="text-3xl font-serif text-black">₹{stats.pendingRevenue.toLocaleString()}</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                                    <XCircle size={28} />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2">Canceled Lost</h4>
                                <p className="text-3xl font-serif text-black text-red-400">₹{stats.cancelledRevenue.toLocaleString()}</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                    <DollarSign size={28} />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2">Refunded Amount</h4>
                                <p className="text-3xl font-serif text-black text-purple-400">₹{stats.refundedRevenue.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* REVENUE BAR CHART (CUSTOM REPRESENTATION) */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-50">
                            <h3 className="text-2xl font-serif mb-10 flex items-center gap-3">
                                <BarChart3 className="text-gold" />
                                Revenue Visualization
                            </h3>
                            <div className="relative h-64 w-full flex items-end justify-around gap-1 md:gap-8 px-4 border-b border-gray-100 pb-2">
                                {/* BAR 1: Earned */}
                                <div className="flex-1 flex flex-col items-center group">
                                    <div
                                        className="w-full max-w-[100px] bg-green-500 rounded-t-xl transition-all duration-1000 group-hover:bg-green-600 shadow-lg shadow-green-100"
                                        style={{ height: `${(stats.earnedRevenue / stats.totalRevenue) * 100 || 0}%`, minHeight: '8px' }}
                                    ></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Earned</span>
                                </div>
                                {/* BAR 2: Pending */}
                                <div className="flex-1 flex flex-col items-center group">
                                    <div
                                        className="w-full max-w-[100px] bg-gold rounded-t-xl transition-all duration-1000 group-hover:bg-amber-600 shadow-lg shadow-amber-100"
                                        style={{ height: `${(stats.pendingRevenue / stats.totalRevenue) * 100 || 0}%`, minHeight: '8px' }}
                                    ></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Projected</span>
                                </div>
                                {/* BAR 3: Cancelled */}
                                <div className="flex-1 flex flex-col items-center group">
                                    <div
                                        className="w-full max-w-[100px] bg-red-400 rounded-t-xl transition-all duration-1000 group-hover:bg-red-500 shadow-lg shadow-red-100"
                                        style={{ height: `${(stats.cancelledRevenue / stats.totalRevenue) * 100 || 0}%`, minHeight: '8px' }}
                                    ></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Lost</span>
                                </div>
                                {/* BAR 4: Refunded */}
                                <div className="flex-1 flex flex-col items-center group">
                                    <div
                                        className="w-full max-w-[100px] bg-purple-400 rounded-t-xl transition-all duration-1000 group-hover:bg-purple-500 shadow-lg shadow-purple-100"
                                        style={{ height: `${(stats.refundedRevenue / stats.totalRevenue) * 100 || 0}%`, minHeight: '8px' }}
                                    ></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Refunded</span>
                                </div>
                            </div>
                            <div className="mt-12 grid grid-cols-3 gap-8 text-center border-t border-gray-50 pt-8">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Success Rate</p>
                                    <p className="text-2xl font-serif text-black">{stats.total > 0 ? ((stats.delivered / stats.total) * 100).toFixed(1) : 0}%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Loss Ratio</p>
                                    <p className="text-2xl font-serif text-black">{stats.total > 0 ? ((stats.cancelled / stats.total) * 100).toFixed(1) : 0}%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Orders Count</p>
                                    <p className="text-2xl font-serif text-black">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
