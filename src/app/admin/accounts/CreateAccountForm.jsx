'use client';
import { useState } from 'react';

export default function CreateAccountForm() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Creating...');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, pin })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Account created successfully! Refreshing...');
        setPhone('');
        setPin('');
        window.location.reload();
      } else {
        setMessage('Error: ' + (data.message || data.error || 'Registration failed'));
      }
    } catch (err) {
      setMessage('Network error.');
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Register New App Account</h3>
      <form onSubmit={handleRegister} className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Phone Number (10 digits)</label>
          <input 
            type="text" 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            className="bg-gray-800 border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            required
            pattern="\d{10}"
            placeholder="0979xxxxxx"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">PIN Code</label>
          <input 
            type="text" 
            value={pin} 
            onChange={e => setPin(e.target.value)} 
            className="bg-gray-800 border border-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none w-48"
            required
            placeholder="1234"
          />
        </div>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded font-medium transition-colors">
          Create Account
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-indigo-400">{message}</p>}
    </div>
  );
}
