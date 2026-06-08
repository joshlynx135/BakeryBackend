import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import SyncLog from '@/models/SyncLog';
import Link from 'next/link';
import AccountSettingsForm from './AccountSettingsForm';

export const dynamic = 'force-dynamic';

export default async function AccountDetail({ params }) {
  await dbConnect();
  const resolvedParams = await params;
  const account = await Account.findById(resolvedParams.id);
  
  if (!account) return <div>Account not found</div>;

  const totalSales = account.syncData?.ledger?.filter(i => i.type === 'Sale').length || 0;
  const totalExpenses = account.syncData?.ledger?.filter(i => i.type === 'Expense').length || 0;
  const syncLogs = await SyncLog.find({ accountId: account._id }).sort({ createdAt: -1 }).limit(10);

  return (
    <div>
      <Link href="/admin/accounts" className="text-indigo-400 hover:text-indigo-300 mb-6 inline-block">&larr; Back to Accounts</Link>
      <h2 className="text-2xl font-bold mb-2">{account.businessInfo?.name || 'Bakery'}: {account.phone}</h2>
      <p className="text-gray-400 mb-6">Account ID: {account._id.toString()}</p>
      
      <AccountSettingsForm accountId={account._id.toString()} initialBusinessInfo={account.businessInfo} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-indigo-400">Ledger Overview</h3>
          <p className="text-gray-300">Total Sales Recorded: <strong className="text-white">{totalSales}</strong></p>
          <p className="text-gray-300">Total Expenses Recorded: <strong className="text-white">{totalExpenses}</strong></p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-indigo-400">Inventory Status</h3>
          <p className="text-gray-300">Items Tracked: <strong className="text-white">{account.syncData?.inventory?.length || 0}</strong></p>
          <p className="text-gray-300">Products Baked: <strong className="text-white">{account.syncData?.production?.length || 0}</strong></p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Recent Sync Activity</h3>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-auto max-h-96 shadow-lg mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Action</th>
              <th className="p-3">Status</th>
              <th className="p-3">Records Synced</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-300">
            {syncLogs.length === 0 && <tr><td colSpan="4" className="p-3 text-center">No sync logs found.</td></tr>}
            {syncLogs.map(log => (
              <tr key={log._id.toString()}>
                <td className="p-3">{log.createdAt.toLocaleString()}</td>
                <td className="p-3 font-semibold">{log.action}</td>
                <td className={`p-3 font-bold ${log.status === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}`}>
                  {log.status} {log.errorMessage && <span className="block text-xs font-normal text-red-300">{log.errorMessage}</span>}
                </td>
                <td className="p-3">{log.recordsSynced || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Raw Cloud Data (Recent Ledger)</h3>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-auto max-h-96 text-sm text-gray-300 shadow-lg">
        <pre>{JSON.stringify(account.syncData?.ledger?.slice(-10) || [], null, 2)}</pre>
      </div>
    </div>
  );
}
