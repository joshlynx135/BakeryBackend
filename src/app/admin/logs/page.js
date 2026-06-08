import dbConnect from '@/lib/mongodb';
import SyncLog from '@/models/SyncLog';

export default async function SyncLogs() {
  await dbConnect();
  const logs = await SyncLog.find().sort({ createdAt: -1 }).limit(100).populate('accountId');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">System Sync Logs</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Account (Phone)</th>
              <th className="p-4">Action</th>
              <th className="p-4">Status</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {logs.map(log => (
              <tr key={log._id.toString()} className="hover:bg-gray-800/50">
                <td className="p-4 text-sm text-gray-300">{log.createdAt.toLocaleString()}</td>
                <td className="p-4 font-semibold text-indigo-300">{log.accountId?.phone || 'Unknown'}</td>
                <td className="p-4 text-sm text-gray-300"><span className="bg-gray-800 px-2 py-1 rounded text-xs font-mono">{log.action}</span></td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${log.status === 'SUCCESS' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {log.status === 'SUCCESS' ? `${log.recordsSynced} records synced` : log.errorMessage}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No logs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
