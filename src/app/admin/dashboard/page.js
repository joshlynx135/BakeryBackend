import dbConnect from '@/lib/mongodb';
import Account from '@/models/Account';
import SyncLog from '@/models/SyncLog';
import { Activity, Users, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  await dbConnect();
  
  const totalAccounts = await Account.countDocuments();
  const totalSyncs = await SyncLog.countDocuments({ status: 'SUCCESS' });
  const recentLogs = await SyncLog.find().sort({ createdAt: -1 }).limit(5).populate('accountId');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/50 rounded-lg text-indigo-400"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-gray-400 text-sm">Total Connected Bakeries</p>
              <h3 className="text-2xl font-bold">{totalAccounts}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-900/50 rounded-lg text-green-400"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-gray-400 text-sm">Successful Syncs</p>
              <h3 className="text-2xl font-bold">{totalSyncs}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-900/50 rounded-lg text-purple-400"><Database className="w-6 h-6" /></div>
            <div>
              <p className="text-gray-400 text-sm">Server Status</p>
              <h3 className="text-2xl font-bold text-green-500">Healthy</h3>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Recent Sync Activity</h3>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Time</th>
              <th className="p-4">Account (Phone)</th>
              <th className="p-4">Action</th>
              <th className="p-4">Status</th>
              <th className="p-4">Records Synced</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {recentLogs.map(log => (
              <tr key={log._id.toString()}>
                <td className="p-4 text-sm">{log.createdAt.toLocaleString()}</td>
                <td className="p-4 text-sm">{log.accountId?.phone || 'Unknown'}</td>
                <td className="p-4 text-sm"><span className="px-2 py-1 bg-gray-800 rounded text-xs">{log.action}</span></td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${log.status === 'SUCCESS' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-4 text-sm">{log.recordsSynced}</td>
              </tr>
            ))}
            {recentLogs.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No sync activity yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
