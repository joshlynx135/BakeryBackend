import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';

export async function POST(request) {
  try {
    await dbConnect();
    const { phone, pin } = await request.json();

    if (!phone || !pin) {
      return NextResponse.json({ success: false, message: 'Phone and PIN required' }, { status: 400 });
    }

    const existing = await Account.findOne({ phone });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Phone number already registered' }, { status: 400 });
    }

    const account = await Account.create({ phone, pin });

    return NextResponse.json({ success: true, token: account._id.toString() });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
