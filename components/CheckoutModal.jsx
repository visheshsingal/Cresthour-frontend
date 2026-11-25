'use client';

import { useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Video,
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  initialWebinar = null,
  isMonthlyPassDefault = false
}) {
  const [isMonthlyPass, setIsMonthlyPass] = useState(isMonthlyPassDefault);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'College Student'
  });
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentPrice = isMonthlyPass ? 800 : (initialWebinar?.price ?? 199);
  const originalPrice = isMonthlyPass ? 1999 : (initialWebinar?.originalPrice ?? 999);
  const displayTitle = isMonthlyPass
    ? 'All-Access Monthly Pass (4 Live Webinars)'
    : (initialWebinar?.title || 'Weekly Live Webinar');

  const handleStartCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in your name, email, and WhatsApp number');
      return;
    }

    setErrorMessage('');
    setPaymentStep('processing');

    try {
      // 1. Create order
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webinarId: initialWebinar?.id,
          isMonthlyPass,
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone
        })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment');
      }

      // If simulated / test mode
      if (orderData.isSimulated || orderData.isFree) {
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            webinarId: initialWebinar?.id,
            isMonthlyPass,
            userName: formData.name,
            userEmail: formData.email,
            userPhone: formData.phone,
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            isSimulated: true
          })
        });
        const verifyData = await verifyRes.json();
        setSuccessData(verifyData);
        setPaymentStep('success');
        return;
      }

      // 2. Open Real Razorpay Checkout
      if (typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'Cresthour Webinars',
          description: displayTitle,
          image: initialWebinar?.posterUrl || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
          order_id: orderData.orderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#10443e'
          },
          handler: async function (response) {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                webinarId: initialWebinar?.id,
                isMonthlyPass,
                userName: formData.name,
                userEmail: formData.email,
                userPhone: formData.phone,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            setSuccessData(verifyData);
            setPaymentStep('success');
          },
          modal: {
            ondismiss: function () {
              setPaymentStep('form');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay SDK failed to load. Please refresh and try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Payment initiation failed');
      setPaymentStep('form');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-black transition-colors"
        >
          <X size={18} />
        </button>

        {paymentStep === 'form' && (
          <div>
            {/* Header */}
            <div className="mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                Secure Registration
              </span>
              <h3 className="pr-8 text-xl sm:text-2xl font-serif font-bold text-gray-950 mt-2 break-words">
                {displayTitle}
              </h3>
              {!isMonthlyPass && initialWebinar && (
                <p className="text-xs text-gray-500 mt-1">
                  {initialWebinar.date} • {initialWebinar.time} ({initialWebinar.duration || '90 Mins'})
                </p>
              )}
            </div>

            {/* Toggle Pass / Single Webinar Option */}
            <div className="mb-5 bg-gray-50 p-1.5 rounded-2xl border border-gray-200 grid grid-cols-2 gap-1 text-[9px] sm:text-xs">
              <button
                type="button"
                onClick={() => setIsMonthlyPass(false)}
                className={`py-2 px-1.5 sm:px-3 rounded-xl font-bold uppercase tracking-wide sm:tracking-wider transition-all ${
                  !isMonthlyPass
                    ? 'bg-white text-deepGreen shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Single Ticket • ₹{initialWebinar?.price ?? 199}
              </button>
              <button
                type="button"
                onClick={() => setIsMonthlyPass(true)}
                className={`py-2 px-1.5 sm:px-3 rounded-xl font-bold uppercase tracking-wide sm:tracking-wider transition-all flex items-center justify-center gap-1 ${
                  isMonthlyPass
                    ? 'bg-deepGreen text-white shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <Sparkles size={12} className="text-gold" /> Monthly Pass • ₹800
              </button>
            </div>

            {isMonthlyPass && (
              <div className="mb-4 p-3 bg-deepGreen/10 border border-deepGreen/20 rounded-xl text-xs text-deepGreen space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Monthly Pass Includes All 4 Webinars (₹200/session)
                </div>
                <div className="text-[11px] text-gray-600">
                  Full recordings, code cheat sheets, priority mock interview review, and private WhatsApp community!
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleStartCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  WhatsApp Phone Number * (for session updates)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-gray-500 text-sm font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-deepGreen text-sm font-mono"
                  />
                </div>
                <p className="text-[11px] text-deepGreen mt-1.5 flex items-center gap-1 font-medium">
                  <MessageSquare size={13} className="flex-shrink-0" />
                  Use a WhatsApp-enabled number so our team can share session updates with you.
                </p>
              </div>

              {/* Price summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 font-medium">Total Amount Payable:</span>
                  <div className="text-gray-400 text-[11px] line-through">₹{originalPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-deepGreen">₹{currentPrice}</div>
                  <div className="text-gold text-[10px] font-bold uppercase">
                    {isMonthlyPass ? 'Best Value • 4 Sessions' : 'Single Session Pass'}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-deepGreen hover:bg-deepGreen-dark text-white font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-deepGreen/20 text-sm"
              >
                Proceed to Pay • ₹{currentPrice}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-deepGreen/20 border-t-deepGreen rounded-full animate-spin mx-auto" />
            <h4 className="text-xl font-serif font-bold text-gray-900">Connecting with Razorpay...</h4>
            <p className="text-xs text-gray-500">Please complete the payment in the Razorpay window.</p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-deepGreen/10 border border-deepGreen/20 text-deepGreen flex items-center justify-center mx-auto text-2xl shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-950">
                {isMonthlyPass ? 'Monthly Pass Confirmed!' : 'Seat Confirmed!'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Booking ID: <span className="font-mono text-deepGreen font-bold">{successData?.registrationId || 'CREST-LIVE'}</span>
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-deepGreen font-bold text-xs">
                <MessageSquare size={16} />
                {successData?.whatsappResult?.success ? 'WhatsApp Confirmation Sent!' : 'Registration Confirmed!'}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {successData?.whatsappResult?.success
                  ? `Your ${isMonthlyPass ? 'All-Access Monthly Pass details' : 'webinar details'} have been sent to your WhatsApp.`
                  : 'Thank you for registering! Our team will share your Google Meet link on WhatsApp soon.'}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {successData?.webinar?.meetingLink && (
                <a
                  href={successData.webinar.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-deepGreen hover:bg-deepGreen-dark text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Video size={16} /> Open Meeting Link Directly
                </a>
              )}

              {successData?.webinar?.whatsappGroupLink && (
                <a
                  href={successData.webinar.whatsappGroupLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-gray-300"
                >
                  <Users size={16} className="text-deepGreen" /> Join Attendee WhatsApp Community
                </a>
              )}

              {successData?.whatsappResult?.previewUrl && (
                <a
                  href={successData.whatsappResult.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-deepGreen text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-gray-200"
                >
                  <ExternalLink size={14} /> View Formatted WhatsApp Message in Browser
                </a>
              )}

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-gray-500 hover:text-black transition-colors"
              >
                Done & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
