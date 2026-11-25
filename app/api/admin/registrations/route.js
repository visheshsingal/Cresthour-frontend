import { NextResponse } from 'next/server';
import { getRegistrations, updateRegistration, getWebinarById } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { sendWebinarWhatsAppMessage } from '@/lib/whatsapp';

export async function GET() {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await getRegistrations();
    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Resend WhatsApp to an attendee
export async function POST(request) {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { registrationId } = await request.json();
    const registrations = await getRegistrations();
    const reg = registrations.find((r) => r.id === registrationId);

    if (!reg) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    const webinar = await getWebinarById(reg.webinarId) || {
      title: reg.webinarTitle,
      date: 'Upcoming',
      time: 'Live',
      duration: '90 mins',
      meetingLink: '',
      whatsappGroupLink: ''
    };

    const whatsappResult = await sendWebinarWhatsAppMessage({
      phone: reg.userPhone,
      userName: reg.userName,
      webinarTitle: webinar.title,
      date: webinar.date,
      time: webinar.time,
      duration: webinar.duration,
      meetingLink: webinar.meetingLink,
      whatsappGroupLink: webinar.whatsappGroupLink,
      orderId: reg.id
    });

    await updateRegistration(reg.id, {
      whatsappStatus: whatsappResult.success ? 'delivered' : whatsappResult.simulated ? 'pending' : 'failed',
      lastResentAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: whatsappResult.success,
      message: whatsappResult.success
        ? 'WhatsApp message sent successfully!'
        : 'WhatsApp was not sent. Use the draft in the admin attendees list and send it manually.',
      whatsappResult
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
