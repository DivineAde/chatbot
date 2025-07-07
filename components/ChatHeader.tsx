interface ChatHeaderProps {
  hasUniversalPrompt: boolean;
  onSettingsClick: () => void;
}

export default function ChatHeader({ hasUniversalPrompt, onSettingsClick }: ChatHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">AI Chatbot</h1>
        
        {/* Universal Prompt Indicator */}
        {hasUniversalPrompt && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Universal Prompt Active</span>
          </div>
        )}
        
        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Settings
        </button>
      </div>
    </header>
  )
}

