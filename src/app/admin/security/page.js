"use client";
import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function Security() {
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword })
    });
    
    if (res.ok) {
      setStatus('Password changed successfully!');
      setNewPassword('');
    } else {
      setStatus('Failed to change password.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Security & Access Control</h2>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl max-w-lg shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-indigo-400" />
          <h3 className="text-xl font-bold">Change Admin Password</h3>
        </div>
        
        {status && <div className="mb-4 p-3 bg-gray-800 rounded text-indigo-300">{status}</div>}
        
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">New Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-gray-950 border border-gray-700 rounded focus:border-indigo-500 outline-none transition-all"
              value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={4}
            />
          </div>
          <button type="submit" className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold transition-colors shadow-lg shadow-indigo-900/20">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
