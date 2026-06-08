import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import SyncLog from '@/models/SyncLog';

export async function POST(request) {
  try {
    await dbConnect();
    const { token } = await request.json();
    
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const account = await Account.findById(token);
    if (!account) return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });

    await SyncLog.create({
      accountId: account._id,
      action: 'PULL',
      status: 'SUCCESS',
      recordsSynced: 0
    });

    return NextResponse.json({ success: true, data: account.syncData });
  } catch (error) {
    if (token) {
       await SyncLog.create({ accountId: token, action: 'PULL', status: 'ERROR', errorMessage: error.message }).catch(()=>{});
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
