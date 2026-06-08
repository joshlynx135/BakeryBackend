'use client';
import { useState } from 'react';

export default function AccountSettingsForm({ accountId, initialBusinessInfo }) {
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  
  const [name, setName] = useState(initialBusinessInfo?.name || '');
  const [tagline, setTagline] = useState(initialBusinessInfo?.tagline || '');
  const [address, setAddress] = useState(initialBusinessInfo?.address || '');
  const [infoMsg, setInfoMsg] = useState('');

  const handlePinReset = async (e) => {
    e.preventDefault();
    setPinMsg('Updating...');
    try {
      const res = await fetch(`/api/admin/accounts/${accountId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'RESET_PIN', pin })
      });
      const data = await res.json();
      setPinMsg(data.message);
      if (res.ok) setPin('');
    } catch {
      setPinMsg('Network Error');
    }
  };

  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    setInfoMsg('Updating...');
    try {
      const res = await fetch(`/api/admin/accounts/${accountId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE_INFO', businessInfo: { name, tagline, address } })
      });
      const data = await res.json();
      setInfoMsg(data.message);
    } catch {
      setInfoMsg('Network Error');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-red-400">Security: Reset PIN</h3>
        <form onSubmit={handlePinReset} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">New PIN Code</label>
            <input 
              type="text" 
              value={pin}
              onChange={e => setPin(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-red-500 outline-none" 
              required
            />
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-medium transition-colors w-full">
            Force Reset PIN
          </button>
        </form>
        {pinMsg && <p className="mt-3 text-sm text-red-300">{pinMsg}</p>}
      </div>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-indigo-400">Branding: Business Info</h3>
        <form onSubmit={handleInfoUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Bakery Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tagline</label>
            <input 
              type="text" 
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium transition-colors w-full">
            Save & Sync to App
          </button>
        </form>
        {infoMsg && <p className="mt-3 text-sm text-indigo-300">{infoMsg}</p>}
      </div>
    </div>
  );
}
