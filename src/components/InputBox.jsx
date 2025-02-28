import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function InputBox({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const [isComposing, setIsComposing] = useState(false); // For IME input handling

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && message.trim() && !isComposing) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full relative bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="Ask a how-to question about CDPs..."
        disabled={disabled}
        rows={1}
        className={`
          w-full p-4 pr-16 text-gray-800 dark:text-gray-100 
          bg-gray-50 dark:bg-gray-700 rounded-lg border 
          border-gray-200 dark:border-gray-600 focus:outline-none
          focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden
          transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />

      <div className="absolute right-2 bottom-2 flex items-center gap-2">
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={`
            p-2 rounded-lg transition-colors
            ${message.trim() 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
