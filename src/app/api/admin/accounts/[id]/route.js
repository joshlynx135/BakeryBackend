import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { action, pin, businessInfo } = await request.json();

    const account = await Account.findById(id);
    if (!account) return NextResponse.json({ success: false, message: 'Account not found' }, { status: 404 });

    if (action === 'RESET_PIN') {
      if (!pin) return NextResponse.json({ success: false, message: 'PIN is required' }, { status: 400 });
      account.pin = pin;
      await account.save();
      return NextResponse.json({ success: true, message: 'PIN updated successfully' });
    }

    if (action === 'UPDATE_INFO') {
      if (!businessInfo) return NextResponse.json({ success: false, message: 'Info is required' }, { status: 400 });
      account.businessInfo = { ...account.businessInfo, ...businessInfo };
      await account.save();
      return NextResponse.json({ success: true, message: 'Business info updated successfully' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
