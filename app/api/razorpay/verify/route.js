import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getWebinarById, createRegistration, updateRegistration } from '@/lib/db';
import { sendWebinarWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      webinarId,
      isMonthlyPass,
      userName,
      userEmail,
      userPhone,
      isSimulated,
      isFree
    } = await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature if not simulated or free
    if (!isSimulated && !isFree && keySecret) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
      }
    }

    let webinar = null;
    let amount = 800;
    let webinarTitle = 'All-Access Monthly Pass (4 Live Webinars)';

    if (!isMonthlyPass) {
      webinar = await getWebinarById(webinarId);
      if (webinar) {
        amount = webinar.price;
        webinarTitle = webinar.title;
      }
    }

    // 1. Record registration in database
    const registration = await createRegistration({
      type: isMonthlyPass ? 'monthly_pass' : 'single_webinar',
      webinarId: webinar?.id || 'monthly_pass',
      webinarTitle,
      userName,
      userEmail,
      userPhone,
      amount,
      paymentId: razorpay_payment_id || `sim_${Date.now()}`,
      orderId: razorpay_order_id || `order_${Date.now()}`,
      status: 'confirmed',
      whatsappStatus: 'sending'
    });

    // 2. Automated WhatsApp message dispatch
    let whatsappResult = { success: false };
    try {
      whatsappResult = await sendWebinarWhatsAppMessage({
        phone: userPhone,
        userName,
        webinarTitle,
        isMonthlyPass: Boolean(isMonthlyPass),
        date: webinar?.date || 'Every Saturday This Month',
        time: webinar?.time || '07:00 PM IST',
        duration: webinar?.duration || '90 Minutes',
        meetingLink: webinar?.meetingLink || '',
        whatsappGroupLink: webinar?.whatsappGroupLink || 'https://chat.whatsapp.com/cresthour-community',
        orderId: registration.id
      });

      await updateRegistration(registration.id, {
        whatsappStatus: whatsappResult.success ? 'delivered' : whatsappResult.simulated ? 'pending' : 'failed',
        whatsappProvider: whatsappResult.provider || 'unknown'
      });
    } catch (waErr) {
      console.error('WhatsApp auto dispatch failed:', waErr);
      await updateRegistration(registration.id, {
        whatsappStatus: 'failed',
        whatsappError: waErr.message
      });
    }

    return NextResponse.json({
      success: true,
      message: isMonthlyPass
        ? 'Monthly Pass confirmed! All access links have been sent to your WhatsApp.'
        : 'Registration confirmed! Webinar link and details sent to your WhatsApp.',
      registrationId: registration.id,
      isMonthlyPass: Boolean(isMonthlyPass),
      webinar: webinar || {
        title: webinarTitle,
        date: 'Every Saturday',
        time: '07:00 PM IST',
        meetingLink: '',
        whatsappGroupLink: 'https://chat.whatsapp.com/cresthour-community'
      },
      whatsappResult
    });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
