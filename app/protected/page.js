'use client';

export default function Protected() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Protected Page</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700">
          This is a protected page that can only be accessed with a valid API key.
        </p>
      </div>
    </div>
  );
} 