'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Native HTML tags used instead of components

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app we'd probably want to do an API call, 
    // but here we just set the cookie and redirect to trigger middleware check.
    // Setting cookie via document.cookie is the easiest way.
    document.cookie = `admin_token=${password}; path=/`;
    
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          {error && <p className="text-destructive text-sm">{error}</p>}
          
          <button 
            type="submit" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
