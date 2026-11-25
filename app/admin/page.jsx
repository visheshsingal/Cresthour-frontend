'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  Upload,
  Users,
  Video,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Sparkles,
  Lock,
  Layers,
  Settings,
  RefreshCw,
  PlusCircle,
  Eye,
  Star
} from 'lucide-react';
import Link from 'next/link';

function getWhatsAppDraftUrl(registration) {
  let phone = (registration.userPhone || '').replace(/\D/g, '');
  if (phone.length === 10) phone = `91${phone}`;

  const message = `Hi ${registration.userName}, thank you for registering for ${registration.webinarTitle}. We will share your Google Meet link soon. - Team Cresthour`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard Data
  const [activeTab, setActiveTab] = useState('webinars');
  const [webinars, setWebinars] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Webinar Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    weekLabel: 'Week 1 Live Session',
    category: 'Soft Skills & Basic Coding',
    date: '',
    time: '07:00 PM IST',
    duration: '90 Minutes',
    price: 199,
    originalPrice: 999,
    seatsLeft: 50,
    isActive: true,
    isFeatured: false,
    posterUrl: '',
    meetingLink: '',
    whatsappGroupLink: '',
    speaker: 'Lead Instructor',
    speakerRole: 'Software Engineer & Mentor',
    description: '',
    topics: ''
  });

  // Cloudinary upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccessNote, setUploadSuccessNote] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
      if (data.authenticated) {
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuthChecked(true);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [wRes, rRes] = await Promise.all([
        fetch('/api/webinars?all=true'),
        fetch('/api/admin/registrations')
      ]);
      const wData = await wRes.json();
      const rData = await rRes.json();

      if (wData.success) setWebinars(wData.webinars || []);
      if (rData.success) setRegistrations(rData.registrations || []);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Login request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  // Image upload handler to Cloudinary
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadSuccessNote('');
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();

      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, posterUrl: result.url }));
        setUploadSuccessNote(result.note || 'Poster uploaded to Cloudinary successfully!');
      } else {
        alert(result.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Webinar
  const handleSubmitWebinar = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('Please fill at least Webinar Title and Date');
      return;
    }

    setLoading(true);
    try {
      const url = editingId ? `/api/webinars/${editingId}` : '/api/webinars';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        topics: typeof formData.topics === 'string'
          ? formData.topics.split('\n').filter(Boolean)
          : formData.topics
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        showToast(editingId ? 'Webinar updated successfully!' : 'New Webinar published!');
        resetForm();
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to save webinar');
      }
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditWebinar = (w) => {
    setEditingId(w.id);
    setFormData({
      title: w.title || '',
      weekLabel: w.weekLabel || 'Week 1 Live Session',
      category: w.category || 'Soft Skills & Basic Coding',
      date: w.date || '',
      time: w.time || '07:00 PM IST',
      duration: w.duration || '90 Minutes',
      price: w.price ?? 199,
      originalPrice: w.originalPrice ?? 999,
      seatsLeft: w.seatsLeft ?? 50,
      isActive: w.isActive ?? true,
      isFeatured: w.isFeatured ?? false,
      posterUrl: w.posterUrl || '',
      meetingLink: w.meetingLink || '',
      whatsappGroupLink: w.whatsappGroupLink || '',
      speaker: w.speaker || '',
      speakerRole: w.speakerRole || '',
      description: w.description || '',
      topics: Array.isArray(w.topics) ? w.topics.join('\n') : (w.topics || '')
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteWebinar = async (id) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;
    try {
      const res = await fetch(`/api/webinars/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Webinar deleted');
        fetchDashboardData();
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleToggleFeatured = async (w) => {
    try {
      await fetch(`/api/webinars/${w.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !w.isFeatured })
      });
      fetchDashboardData();
      showToast(`Webinar ${!w.isFeatured ? 'set as Home Featured' : 'unfeatured'}`);
    } catch (err) {
      alert('Update failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setUploadSuccessNote('');
    setFormData({
      title: '',
      weekLabel: 'Week 1 Live Session',
      category: 'Soft Skills & Basic Coding',
      date: '',
      time: '07:00 PM IST',
      duration: '90 Minutes',
      price: 199,
      originalPrice: 999,
      seatsLeft: 50,
      isActive: true,
      isFeatured: false,
      posterUrl: '',
      meetingLink: '',
      whatsappGroupLink: '',
      speaker: 'Lead Mentor',
      speakerRole: 'Software Engineer & Career Coach',
      description: '',
      topics: ''
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin text-deepGreen" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-deepGreen/10 text-deepGreen mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-950">CRESTHOUR<span className="text-gold">.</span></h1>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Admin Control Center</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-deepGreen hover:bg-deepGreen-dark text-white font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md text-sm disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-500 text-center space-y-1">
            <p>Configured in <code className="text-deepGreen bg-gray-100 px-1 py-0.5 rounded font-mono">.env.local</code></p>
            <p>(Default: <span className="font-semibold text-gray-700">admin</span> / <span className="font-semibold text-gray-700">admin123</span>)</p>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = registrations.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const featured = webinars.find((w) => w.isFeatured && w.isActive) || webinars[0];
  const monthlyPassCount = registrations.filter((r) => r.type === 'monthly_pass').length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-deepGreen text-white px-5 py-3 rounded-xl shadow-2xl font-medium flex items-center gap-2 animate-bounce text-sm">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-serif font-black tracking-tight text-gray-950">
              CRESTHOUR<span className="text-gold">.</span>
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-deepGreen/10 text-deepGreen font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-black px-3 py-2 rounded-lg border border-gray-200 bg-white transition-colors font-medium"
            >
              <Eye size={14} /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 px-3 py-2 rounded-lg border border-red-200 bg-red-50 transition-colors font-semibold"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Home Featured</span>
              <Star className="w-4 h-4 text-gold fill-gold" />
            </div>
            <div className="text-base font-serif font-bold text-gray-950 truncate" title={featured?.title || 'None'}>
              {featured?.title || 'No active session'}
            </div>
            <div className="text-xs text-deepGreen mt-1 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" /> {featured?.date ? `${featured.date} • ${featured.time}` : 'Schedule next'}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Registrations</span>
              <Users className="w-4 h-4 text-deepGreen" />
            </div>
            <div className="text-3xl font-serif font-bold text-gray-950">{registrations.length}</div>
            <div className="text-xs text-gray-500 mt-1">
              <strong className="text-deepGreen">{monthlyPassCount}</strong> Monthly Passes (₹800)
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-serif font-bold text-deepGreen">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-500 mt-1">Via Razorpay integration</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Status</span>
              <MessageSquare className="w-4 h-4 text-deepGreen" />
            </div>
            <div className="text-2xl font-serif font-bold text-deepGreen">Manual</div>
            <div className="text-xs text-gray-500 mt-1">Prepare a WhatsApp draft for each attendee</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('webinars')}
            className={`py-3 px-2 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'webinars'
                ? 'border-deepGreen text-deepGreen'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Layers className="w-4 h-4" /> Manage Month's Webinars ({webinars.length})
          </button>
          <button
            onClick={() => setActiveTab('attendees')}
            className={`py-3 px-2 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'attendees'
                ? 'border-deepGreen text-deepGreen'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Users className="w-4 h-4" /> Registered Attendees & WhatsApp ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`py-3 px-2 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'env'
                ? 'border-deepGreen text-deepGreen'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Settings className="w-4 h-4" /> Cloudinary & Razorpay Setup
          </button>
        </div>

        {/* TAB 1: WEBINAR MANAGEMENT */}
        {activeTab === 'webinars' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-950 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-deepGreen" />
                    {editingId ? 'Edit Webinar Details' : 'Add / Schedule Webinar for the Month'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload poster pic to Cloudinary, fix custom date and price, and choose whether to feature on Home.
                  </p>
                </div>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmitWebinar} className="space-y-6">
                {/* 1. CLOUDINARY POSTER UPLOAD */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-deepGreen" />
                    Webinar Picture / Poster (Cloudinary Upload)
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="relative w-full sm:w-48 h-32 bg-white border border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                      {formData.posterUrl ? (
                        <img
                          src={formData.posterUrl}
                          alt="Poster preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-gray-400 text-xs">
                          <Upload className="w-6 h-6 mx-auto mb-1 opacity-50 text-deepGreen" />
                          No poster selected
                        </div>
                      )}
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <RefreshCw className="w-6 h-6 animate-spin text-deepGreen" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deepGreen text-white text-xs font-bold uppercase tracking-wider hover:bg-deepGreen-dark transition-all shadow-sm">
                          <Upload className="w-4 h-4" /> Choose Pic to Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                        {formData.posterUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, posterUrl: '' }))}
                            className="text-xs text-red-600 hover:underline font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {uploadSuccessNote && (
                        <p className="text-xs text-deepGreen flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          {uploadSuccessNote}
                        </p>
                      )}

                      <div className="text-xs text-gray-500">
                        Or enter direct image URL:
                        <input
                          type="url"
                          value={formData.posterUrl}
                          onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 text-xs placeholder-gray-400 focus:outline-none focus:border-deepGreen"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CORE DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Webinar Name / Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Mastering Arrays DSA & Problem Solving Articulation"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Week Label
                    </label>
                    <input
                      type="text"
                      value={formData.weekLabel}
                      onChange={(e) => setFormData({ ...formData, weekLabel: e.target.value })}
                      placeholder="e.g. Week 1 Live Session"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:border-deepGreen text-sm"
                    >
                      <option value="Soft Skills & Basic Coding">Soft Skills & Basic Coding (Dual)</option>
                      <option value="Soft Skills Focus">Soft Skills & Communication</option>
                      <option value="Basic Coding">Basic Coding & Problem Solving</option>
                      <option value="Interview Mastery">Tech & HR Interview Mastery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Date (YYYY-MM-DD) *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g. 07:00 PM IST"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 90 Minutes"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Price in INR (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="199"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm font-bold text-deepGreen"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Featured On Home?
                    </label>
                    <div className="flex items-center gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                        <input
                          type="checkbox"
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                          className="w-4 h-4 text-deepGreen rounded border-gray-300 focus:ring-deepGreen"
                        />
                        <span>Highlight in Homepage Hero Spotlight</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3. MEETING LINK & WHATSAPP DELIVERY */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-deepGreen text-sm font-bold">
                    <MessageSquare className="w-4 h-4" />
                    Meeting Details for Manual WhatsApp Follow-up
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Meeting Link (Google Meet / Zoom) *
                      </label>
                      <input
                        type="url"
                        value={formData.meetingLink}
                        onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                        placeholder="https://meet.google.com/xyz-abcd-efg"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">Open the attendee's WhatsApp draft from the registrations list and send the link manually.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        WhatsApp Community Invite Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.whatsappGroupLink}
                        onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })}
                        placeholder="https://chat.whatsapp.com/..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">Allows attendees to join the weekly cohort group.</p>
                    </div>
                  </div>
                </div>

                {/* 4. DESCRIPTION & TOPICS */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief overview of what makes this weekly webinar special..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Key Takeaways / Topics (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.topics}
                      onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                      placeholder="Deconstructing tricky array interview questions into clean pseudocode&#10;Two-pointer & sliding window patterns with live interactive code&#10;The Think-Aloud technique: How to speak continuously while coding&#10;Live Mock Breakdown & Q&A session"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-xs font-mono"
                    />
                  </div>
                </div>

                {/* 5. SPEAKER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Speaker Name
                    </label>
                    <input
                      type="text"
                      value={formData.speaker}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      placeholder="Vishesh & Lead Mentors"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Speaker Role
                    </label>
                    <input
                      type="text"
                      value={formData.speakerRole}
                      onChange={(e) => setFormData({ ...formData, speakerRole: e.target.value })}
                      placeholder="Software Engineer & Career Coach"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-xl bg-deepGreen hover:bg-deepGreen-dark text-white font-bold tracking-wide flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-gold" />}
                    {editingId ? 'Save Changes' : 'Publish Webinar to Schedule'}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-950 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-deepGreen" />
                Scheduled Webinars for the Month ({webinars.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {webinars.map((w) => (
                  <div
                    key={w.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      w.isFeatured
                        ? 'bg-white border-gold shadow-md ring-2 ring-gold/30'
                        : w.isActive
                        ? 'bg-white border-deepGreen/30 shadow-sm'
                        : 'bg-white border-gray-200 opacity-70'
                    }`}
                  >
                    <div className="flex gap-4">
                      {w.posterUrl ? (
                        <img
                          src={w.posterUrl}
                          alt={w.title}
                          className="w-24 h-24 rounded-xl object-cover flex-shrink-0 border border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 text-xs">
                          No Pic
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          {w.isFeatured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-gold text-white flex items-center gap-1">
                              <Star size={10} fill="white" /> Featured on Home
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-deepGreen/10 text-deepGreen">
                            {w.weekLabel || 'Session'}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-gray-950 text-base line-clamp-1">{w.title}</h4>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span>{w.date}</span>
                          <span>•</span>
                          <span>{w.time}</span>
                        </div>

                        <div className="text-sm font-serif font-bold text-deepGreen mt-2">
                          ₹{w.price} <span className="text-gray-400 line-through text-xs font-normal">₹{w.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 mt-4 pt-3 text-xs">
                      <button
                        onClick={() => handleToggleFeatured(w)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                          w.isFeatured
                            ? 'bg-gold text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Star size={12} fill={w.isFeatured ? 'white' : 'none'} />
                        {w.isFeatured ? 'Featured' : 'Set as Home Featured'}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditWebinar(w)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteWebinar(w.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTERED ATTENDEES */}
        {activeTab === 'attendees' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-950 flex items-center gap-2">
                    <Users className="w-5 h-5 text-deepGreen" />
                    Paid Attendees & WhatsApp Follow-up
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Open a pre-filled message in WhatsApp, then review and send it manually.
                  </p>
                </div>
                <button
                  onClick={fetchDashboardData}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors self-start font-semibold"
                >
                  <RefreshCw size={14} /> Refresh List
                </button>
              </div>

              {registrations.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-30 text-deepGreen" />
                  No registrations recorded yet. Once users complete payment on the home page or webinars page, they appear here instantly!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200 font-bold">
                      <tr>
                        <th className="py-3 px-4">Attendee</th>
                        <th className="py-3 px-4">WhatsApp Phone</th>
                        <th className="py-3 px-4">Type / Webinar</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">WhatsApp Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-950">{reg.userName}</div>
                            <div className="text-[11px] text-gray-500">{reg.userEmail}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-medium text-deepGreen">
                            {reg.userPhone}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {reg.type === 'monthly_pass' ? (
                                <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold font-bold uppercase text-[10px]">
                                  Monthly Pass
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold text-[10px]">
                                  Single Session
                                </span>
                              )}
                            </div>
                            <div className="font-medium text-gray-900 mt-0.5 line-clamp-1">{reg.webinarTitle}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-gray-950">
                            ₹{reg.amount}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                reg.whatsappStatus === 'delivered'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : reg.whatsappStatus === 'failed'
                                  ? 'bg-red-50 text-red-600 border border-red-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {reg.whatsappStatus === 'delivered' && <CheckCircle2 size={12} />}
                              {reg.whatsappStatus || 'pending'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <a
                              href={getWhatsAppDraftUrl(reg)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-deepGreen/10 hover:bg-deepGreen/20 text-deepGreen text-xs font-semibold transition-colors"
                              title="Open pre-filled WhatsApp message"
                            >
                              <ExternalLink size={12} /> WhatsApp Draft
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: API & CLOUDINARY SETUP */}
        {activeTab === 'env' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-950 flex items-center gap-2">
                <Settings className="w-5 h-5 text-deepGreen" />
                API & Environment Configuration
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your credentials are kept safely in <code className="text-deepGreen bg-gray-100 px-1 py-0.5 rounded font-mono">.env.local</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cloudinary */}
              <div className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-gray-50/50">
                <div className="font-bold text-sm text-gray-950 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-deepGreen" /> 1. Cloudinary Setup
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Webinar poster photos will upload directly to Cloudinary. Add your keys in <code className="font-mono">.env.local</code>:
                </p>
                <div className="bg-white border border-gray-200 rounded-xl p-3 font-mono text-[11px] text-gray-800 space-y-1">
                  <div>CLOUDINARY_CLOUD_NAME=...</div>
                  <div>CLOUDINARY_API_KEY=...</div>
                  <div>CLOUDINARY_API_SECRET=...</div>
                </div>
              </div>

              {/* Razorpay */}
              <div className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-gray-50/50">
                <div className="font-bold text-sm text-gray-950 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gold" /> 2. Razorpay Setup
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  For collecting registration fees via UPI, Cards, Netbanking:
                </p>
                <div className="bg-white border border-gray-200 rounded-xl p-3 font-mono text-[11px] text-gray-800 space-y-1">
                  <div>NEXT_PUBLIC_RAZORPAY_KEY_ID=...</div>
                  <div>RAZORPAY_KEY_ID=...</div>
                  <div>RAZORPAY_KEY_SECRET=...</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-gray-50/50">
                <div className="font-bold text-sm text-gray-950 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-deepGreen" /> 3. WhatsApp Automation
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  WhatsApp API credentials enable automatic delivery. Without them, use the pre-filled WhatsApp draft in the attendees list and send it manually:
                </p>
                <div className="bg-white border border-gray-200 rounded-xl p-3 font-mono text-[11px] text-gray-800 space-y-1">
                  <div>WHATSAPP_TOKEN=...</div>
                  <div>WHATSAPP_PHONE_NUMBER_ID=...</div>
                  <div># Or Webhook:</div>
                  <div>WHATSAPP_WEBHOOK_URL=...</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
