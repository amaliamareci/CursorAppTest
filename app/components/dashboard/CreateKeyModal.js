import React, { useState } from 'react';

export function CreateKeyModal({ isOpen, onClose, onSubmit }) {
  const [newKeyName, setNewKeyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newKeyName);
    setNewKeyName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Create a new API key
          </h2>
          <p className="text-gray-700 text-sm mb-6">
            Enter a name for the new API key.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Key Name <span className="text-gray-500">— A unique name to identify this key</span>
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                placeholder="Key Name"
                required
              />
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setNewKeyName('');
                }}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 