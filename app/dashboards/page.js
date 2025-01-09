'use client';
import { useState, useEffect } from 'react';
import { useApiKeys } from '@/lib/hooks/useApiKeys';
import { CurrentPlan } from '@/app/components/dashboard/CurrentPlan';
import { CreateKeyModal } from '@/app/components/dashboard/CreateKeyModal';
import { ApiKeysList } from '@/app/components/dashboard/ApiKeysList';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    apiKeys,
    error,
    loading,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey,
  } = useApiKeys();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async (name) => {
    await createApiKey(name);
    setIsModalOpen(false);
  };

  const handleDeleteKey = async (keyId) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }
    await deleteApiKey(keyId);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CurrentPlan />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">API Keys</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-gray-900 font-medium"
          >
            <span>+</span> New Key
          </button>
        </div>

        <ApiKeysList
          apiKeys={apiKeys}
          loading={loading}
          onEdit={updateApiKey}
          onDelete={handleDeleteKey}
        />
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateKey}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
