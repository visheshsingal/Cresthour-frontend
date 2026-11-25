import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getWebinarById } from '@/lib/db';

export async function POST(request) {
  try {
    const { webinarId, isMonthlyPass, userName, userEmail, userPhone } = await request.json();

    let amountInPaise = 0;
    let title = '';

    if (isMonthlyPass) {
      amountInPaise = 800 * 100; // ₹800
      title = 'Cresthour All-Access Monthly Pass (4 Webinars)';
    } else {
      if (!webinarId) {
        return NextResponse.json({ error: 'Webinar ID is required' }, { status: 400 });
      }
      const webinar = await getWebinarById(webinarId);
      if (!webinar) {
        return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
      }
      amountInPaise = Math.round((Number(webinar.price) || 0) * 100);
      title = webinar.title;
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn('[Razorpay] Simulated payment order created (No credentials provided in .env.local).');
      return NextResponse.json({
        success: true,
        isSimulated: true,
        orderId: `order_sim_${Date.now()}`,
        amount: amountInPaise,
        currency: 'INR',
        keyId: 'rzp_test_simulated',
        title,
        isMonthlyPass: Boolean(isMonthlyPass)
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        type: isMonthlyPass ? 'monthly_pass' : 'single_webinar',
        webinarId: webinarId || 'monthly_pass',
        title,
        userName: userName || '',
        userPhone: userPhone || ''
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
      title,
      isMonthlyPass: Boolean(isMonthlyPass)
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
