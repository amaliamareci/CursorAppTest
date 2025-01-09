export function CurrentPlan() {
  return (
    <div className="mb-8 bg-gradient-to-r from-purple-600 via-purple-400 to-blue-400 rounded-lg p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm mb-2">CURRENT PLAN</div>
          <h1 className="text-3xl font-bold">Researcher</h1>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
          Manage Plan
        </button>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span>API Limit</span>
          <span>24 / 1,000 Requests</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-[2.4%]"></div>
        </div>
      </div>
    </div>
  );
} 