import dbConnect from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export default async function SupportTickets() {
  await dbConnect();
  const tickets = await Ticket.find().sort({ createdAt: -1 }).populate('accountId');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Support Tickets</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Account</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {tickets.map(ticket => (
              <tr key={ticket._id.toString()} className="hover:bg-gray-800/50">
                <td className="p-4 text-sm text-gray-300">{ticket.createdAt.toLocaleDateString()}</td>
                <td className="p-4 text-sm font-semibold text-indigo-300">{ticket.accountId?.phone || 'Unknown'}</td>
                <td className="p-4 text-sm text-gray-200">{ticket.subject}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'RESOLVED' ? 'bg-green-900/50 text-green-400' : 'bg-amber-900/50 text-amber-400'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <button className="text-indigo-400 hover:text-indigo-300 font-medium">View Message</button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No support tickets found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
