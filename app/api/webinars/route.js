import { NextResponse } from 'next/server';
import { getWebinars, createWebinar } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    if (all) {
      if (!verifyAdminSession()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const webinars = await getWebinars();
      return NextResponse.json({ success: true, webinars });
    }

    const webinars = await getWebinars();
    // Default: return only active webinars or sorted by date
    const active = webinars.filter((w) => w.isActive);
    return NextResponse.json({
      success: true,
      webinars: active.length ? active : webinars
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.date) {
      return NextResponse.json({ error: 'Title and Date are required' }, { status: 400 });
    }

    const webinar = await createWebinar(body);
    return NextResponse.json({ success: true, webinar });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
