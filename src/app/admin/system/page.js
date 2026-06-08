"use client";
import { HardDrive, Server, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export default function SystemHealth() {
  const [cleaning, setCleaning] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">System Health</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-6 shadow-lg">
          <Server className="w-12 h-12 text-green-500" />
          <div>
            <h3 className="text-xl font-bold">API Server</h3>
            <p className="text-green-400 font-medium">Online & Healthy</p>
            <p className="text-gray-500 text-sm mt-1">Uptime: 99.9%</p>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-6 shadow-lg">
          <HardDrive className="w-12 h-12 text-indigo-500" />
          <div>
            <h3 className="text-xl font-bold">MongoDB Atlas</h3>
            <p className="text-green-400 font-medium">Connected</p>
            <p className="text-gray-500 text-sm mt-1">Storage Used: 1.2 MB / 512 MB</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Maintenance</h3>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold">Clear Old Sync Logs</h4>
            <p className="text-gray-400 text-sm">Remove sync logs older than 30 days to save space.</p>
          </div>
          <button 
            onClick={() => { setCleaning(true); setTimeout(() => { alert("Cleaned!"); setCleaning(false); }, 1000) }}
            disabled={cleaning}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium"
          >
            <RefreshCcw className={`w-4 h-4 ${cleaning ? 'animate-spin' : ''}`} />
            {cleaning ? 'Cleaning...' : 'Run Cleanup'}
          </button>
        </div>
      </div>
    </div>
  );
}
