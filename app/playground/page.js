'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Notification } from '@/app/components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const validateApiKey = async (key) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('id')
        .eq('value', key)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return false;
        }
        throw new Error('Database error while validating key');
      }

      return data !== null;
    } catch (error) {
      console.error('Error validating API key:', error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        router.push('/protected');
        showNotification('Valid key, protected can be accessed', 'success');
      } else {
        showNotification('Invalid API key', 'error');
      }
    } catch (error) {
      showNotification('Error validating API key: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">API Playground</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-white mb-1">
            Enter your API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
              bg-gray-800 text-white border-gray-700 placeholder-gray-400"
            placeholder="tvly-xxxxxxxxxxxxxxxx"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium
            ${loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {loading ? 'Validating...' : 'Validate Key'}
        </button>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 