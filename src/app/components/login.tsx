import React, { useState } from 'react';
import logo from '../../0833fc58-8a0e-47be-bab1-7b8f4361811f.png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-sm shadow-md w-full max-w-md border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <div className="-mb-10">
            <img src={logo} alt="Al Aiza Enterprises Logo" className="w-80 h-auto object-contain" />
          </div>
          <h1 className="text-2xl text-primary font-bold tracking-tight">Al Aiza Enterprises</h1>
          <p className="text-sm text-slate-600 mt-2">Sales Tax Invoice Integration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm text-slate-700 mb-1.5">
              Username / Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-8">
          Authorized Access Only • FBR Compliant System
        </p>
      </div>
    </div>
  );
}
