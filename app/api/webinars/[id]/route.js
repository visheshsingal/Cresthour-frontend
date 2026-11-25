import { NextResponse } from 'next/server';
import { getWebinarById, updateWebinar, deleteWebinar } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const webinar = await getWebinarById(params.id);
    if (!webinar) {
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, webinar });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await updateWebinar(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, webinar: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = await deleteWebinar(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Webinar deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
