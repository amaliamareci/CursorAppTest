import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data);
    } catch (error) {
      setError('Error fetching API keys');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (name) => {
    try {
      const newKey = {
        name,
        value: `tvly-${generateRandomString(32)}`,
        usage: 0,
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;
      setApiKeys([data, ...apiKeys]);
      return data;
    } catch (error) {
      setError('Error creating API key');
      console.error('Error:', error);
      throw error;
    }
  };

  const deleteApiKey = async (keyId) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId);

      if (error) throw error;
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    } catch (error) {
      setError('Error deleting API key');
      console.error('Error:', error);
      throw error;
    }
  };

  const updateApiKey = async (keyId, name) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ name })
        .eq('id', keyId);

      if (error) throw error;
      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? { ...key, name } : key
      ));
    } catch (error) {
      setError('Error updating API key');
      console.error('Error:', error);
      throw error;
    }
  };

  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return {
    apiKeys,
    error,
    loading,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey,
  };
} 