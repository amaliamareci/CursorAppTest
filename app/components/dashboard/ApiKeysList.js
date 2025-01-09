import { useState } from 'react';

export function ApiKeysList({ apiKeys, loading, onEdit, onDelete }) {
  const [showKey, setShowKey] = useState({});
  const [copySuccess, setCopySuccess] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');

  const toggleKeyVisibility = (keyId) => {
    setShowKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = async (text, keyId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ [keyId]: true });
      setTimeout(() => {
        setCopySuccess({ [keyId]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-[2fr,1fr,3fr,1fr] gap-4 p-4 border-b border-gray-200 text-sm font-bold text-black">
        <div>NAME</div>
        <div>USAGE</div>
        <div>KEY</div>
        <div>OPTIONS</div>
      </div>

      {apiKeys.map((key) => (
        <div key={key.id} className="grid grid-cols-[2fr,1fr,3fr,1fr] gap-4 p-4 border-b border-gray-200 items-center text-gray-900">
          {editingKey === key.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="p-1 border rounded text-gray-900"
              onBlur={() => {
                onEdit(key.id, editName);
                setEditingKey(null);
              }}
              autoFocus
            />
          ) : (
            <div className="font-medium">{key.name}</div>
          )}
          <div>{key.usage || 0}</div>
          <div className="font-mono text-sm flex items-center gap-2">
            <code className="flex-1 font-mono bg-gray-50 px-2 py-1 rounded">
              {showKey[key.id] ? key.value : '••••••••••••••••••••••••••••••••'}
            </code>
            <button
              onClick={() => toggleKeyVisibility(key.id)}
              className="p-1 text-gray-600 hover:text-gray-800"
              title={showKey[key.id] ? 'Hide API Key' : 'Show API Key'}
            >
              {showKey[key.id] ? '🔒' : '👁️'}
            </button>
            <button
              onClick={() => copyToClipboard(key.value, key.id)}
              className="p-1 text-gray-600 hover:text-gray-800"
              title="Copy to clipboard"
            >
              📋
            </button>
            {copySuccess[key.id] && (
              <span className="text-sm text-green-600">Copied!</span>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setEditingKey(key.id);
                setEditName(key.name);
              }}
              className="p-1 text-gray-600 hover:text-gray-800"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(key.id)}
              className="p-1 text-gray-600 hover:text-gray-800"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 