import { Msg } from './useChat';
export default function ChatBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs whitespace-pre-wrap rounded-2xl p-3 shadow
          ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
      >
        {msg.content}
      </div>
    </div>
  );
}
