"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="p-8 bg-gray-900 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-100">Super Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to manage bakery accounts</p>
        </div>
        
        {error && <div className="bg-red-900/50 border border-red-800 text-red-200 p-3 rounded mb-6 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
        </div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
              <label className="text-sm text-gray-400 mb-1 block">Username</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                value={username} onChange={e => setUsername(e.target.value)} required
              />
          </div>
          <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                value={password} onChange={e => setPassword(e.target.value)} required
              />
          </div>
          <button type="submit" className="mt-4 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-900/20">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}
