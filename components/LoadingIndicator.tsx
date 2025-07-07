export default function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span>Thinking...</span>
        </div>
      </div>
    </div>
  )
}