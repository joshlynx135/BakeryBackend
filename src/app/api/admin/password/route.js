import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
  try {
    await dbConnect();
    const { newPassword } = await request.json();
    
    const adminId = request.cookies.get('admin_session')?.value;
    if (!adminId) return NextResponse.json({ success: false }, { status: 401 });

    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(adminId, { password: hashed });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
