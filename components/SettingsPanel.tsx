interface SettingsPanelProps {
  promptText: string;
  onPromptChange: (prompt: string) => void;
  onClearPrompt: () => void;
  onClose: () => void;
}

export default function SettingsPanel({
  promptText,
  onPromptChange,
  onClearPrompt,
  onClose
}: SettingsPanelProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Universal Prompt
            </label>
            <textarea
              value={promptText}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Enter a universal prompt that will be applied to all user inputs..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClearPrompt}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear Prompt
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}