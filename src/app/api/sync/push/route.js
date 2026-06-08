import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';

export async function POST(request) {
  try {
    await dbConnect();
    const { token, data } = await request.json();
    
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const account = await Account.findById(token);
    if (!account) return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });

    if (data.ledger) account.syncData.ledger.push(...data.ledger);
    if (data.inventory) account.syncData.inventory.push(...data.inventory);
    if (data.production) account.syncData.production.push(...data.production);
    if (data.distributors) account.syncData.distributors.push(...data.distributors);
    if (data.products) account.syncData.products.push(...data.products);
    
    // Tell mongoose the mixed types changed
    account.markModified('syncData');
    await account.save();

    return NextResponse.json({ success: true, message: 'Synced successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
