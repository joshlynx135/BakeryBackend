import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Analytics() {
  await dbConnect();
  const accounts = await Account.find();
  
  let totalRevenue = 0;
  let totalExpenses = 0;
  let totalBaked = 0;

  accounts.forEach(acc => {
    acc.syncData?.ledger?.forEach(item => {
      if (item.type === 'Sale') totalRevenue += (item.amount || 0);
      else totalExpenses += (item.amount || 0);
    });
    acc.syncData?.production?.forEach(item => {
      totalBaked += (item.quantity_baked || 0);
    });
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Global Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4">
             <p className="text-gray-400 text-sm">Total Platform Revenue</p>
             <TrendingUp className="text-green-500 w-5 h-5" />
          </div>
          <h3 className="text-3xl font-bold text-green-400">${totalRevenue.toFixed(2)}</h3>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4">
             <p className="text-gray-400 text-sm">Total Platform Expenses</p>
             <TrendingDown className="text-red-500 w-5 h-5" />
          </div>
          <h3 className="text-3xl font-bold text-red-400">${totalExpenses.toFixed(2)}</h3>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4">
             <p className="text-gray-400 text-sm">Pastries Baked Globally</p>
             <PieChart className="text-amber-500 w-5 h-5" />
          </div>
          <h3 className="text-3xl font-bold text-amber-400">{totalBaked} items</h3>
        </div>
      </div>
    </div>
  );
}
