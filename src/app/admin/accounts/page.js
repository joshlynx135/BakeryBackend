import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import Link from 'next/link';

export default async function Accounts() {
  await dbConnect();
  const accounts = await Account.find().sort({ createdAt: -1 });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Connected Bakery Accounts</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Last Sync</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {accounts.map(acc => (
              <tr key={acc._id.toString()} className="hover:bg-gray-800/50 transition-colors">
                <td className="p-4 font-semibold text-indigo-300">{acc.phone}</td>
                <td className="p-4 text-sm text-gray-300">{acc.createdAt.toLocaleDateString()}</td>
                <td className="p-4 text-sm text-gray-300">
                  {acc.lastSyncAt ? acc.lastSyncAt.toLocaleString() : 'Never'}
                </td>
                <td className="p-4 text-sm">
                  {acc.isSuspended ? (
                    <span className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs font-bold">SUSPENDED</span>
                  ) : (
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">ACTIVE</span>
                  )}
                </td>
                <td className="p-4 text-sm">
                  <Link href={`/admin/accounts/${acc._id.toString()}`} className="text-indigo-400 hover:text-indigo-300 font-medium">
                    View Data
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
