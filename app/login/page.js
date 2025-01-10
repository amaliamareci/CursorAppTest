'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/supabase';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setError('');
    
    try {
      console.log('Login attempt with:', { email, password });
      const user = await loginUser(email, password);
      console.log('Login successful:', user);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set cookie
      document.cookie = `user=${JSON.stringify(user)}; path=/`;
      
      // Navigate to dashboard
      setTimeout(() => {
        router.push('/dashboards');
      }, 100);
      
    } catch (error) {
      console.log('Login error:', error);
      setError(error.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={() => console.log('Button clicked')}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          No account? <Link href="/signup" className="text-blue-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
} 