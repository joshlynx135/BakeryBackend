"use client";
import { Download } from 'lucide-react';
import { useState } from 'react';

export default function ExportData() {
  const [loading, setLoading] = useState(false);

  const handleExport = async (type) => {
    setLoading(true);
    // In a real app we'd fetch CSV from API. Here we just mock a download.
    setTimeout(() => {
      alert(`Exported ${type} successfully! (Mocked)`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Data Export Engine</h2>
      <p className="text-gray-400 mb-8">Export global platform data as CSV for auditing or backup.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg">
          <Download className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Global Ledger Export</h3>
          <p className="text-gray-400 text-sm mb-6">Export all sales and expenses across all connected bakery accounts.</p>
          <button onClick={() => handleExport('Ledger')} disabled={loading} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium disabled:opacity-50 transition-colors">
            {loading ? 'Generating CSV...' : 'Download Global Ledger (CSV)'}
          </button>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg">
          <Download className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Global Production Export</h3>
          <p className="text-gray-400 text-sm mb-6">Export all pastry production and waste logs across all accounts.</p>
          <button onClick={() => handleExport('Production')} disabled={loading} className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded font-medium disabled:opacity-50 transition-colors">
            {loading ? 'Generating CSV...' : 'Download Production Data (CSV)'}
          </button>
        </div>
      </div>
    </div>
  );
}
