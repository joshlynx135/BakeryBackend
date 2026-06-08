import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import SyncLog from '@/models/SyncLog';

export async function POST(request) {
  try {
    await dbConnect();
    const { token, data } = await request.json();
    
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const account = await Account.findById(token);
    if (!account) return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });

    if (account.isSuspended) {
       await SyncLog.create({ accountId: account._id, action: 'PUSH', status: 'ERROR', errorMessage: 'Account Suspended' });
       return NextResponse.json({ success: false, message: 'Account is suspended' }, { status: 403 });
    }

    let recordsSynced = 0;
    if (data.ledger) { account.syncData.ledger.push(...data.ledger); recordsSynced += data.ledger.length; }
    if (data.inventory) { account.syncData.inventory.push(...data.inventory); recordsSynced += data.inventory.length; }
    if (data.production) { account.syncData.production.push(...data.production); recordsSynced += data.production.length; }
    if (data.distributors) { account.syncData.distributors.push(...data.distributors); recordsSynced += data.distributors.length; }
    if (data.products) { account.syncData.products.push(...data.products); recordsSynced += data.products.length; }
    
    account.markModified('syncData');
    account.lastSyncAt = new Date();
    await account.save();

    await SyncLog.create({
      accountId: account._id,
      action: 'PUSH',
      status: 'SUCCESS',
      recordsSynced
    });

    return NextResponse.json({ success: true, message: 'Synced successfully' });
  } catch (error) {
    if (token) {
       await SyncLog.create({ accountId: token, action: 'PUSH', status: 'ERROR', errorMessage: error.message }).catch(()=>{});
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
