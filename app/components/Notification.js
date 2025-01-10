export function Notification({ message, type, onClose }) {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' 
          ? 'bg-green-100 border border-green-400 text-green-700' 
          : 'bg-red-100 border border-red-400 text-red-700'
      }`}
    >
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm hover:text-gray-900"
        >
          ×
        </button>
      )}
    </div>
  );
} 