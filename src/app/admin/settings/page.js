export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl max-w-2xl shadow-lg">
        <h3 className="font-bold text-lg mb-4">Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-gray-400 text-sm">The dashboard is currently locked to dark mode.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-gray-400 text-sm">Receive emails when a new bakery registers.</p>
            </div>
            <div className="w-12 h-6 bg-gray-700 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
