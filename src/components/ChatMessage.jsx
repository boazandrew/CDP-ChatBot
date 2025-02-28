import { useEffect, useState } from 'react';
import CodeWindow from './CodeWindow';
import { User, Bot } from 'lucide-react';

export default function ChatMessage({ 
  text, 
  isBot, 
  loading, 
  timestamp, 
  codeSnippets = [] 
}) {
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} ${
      fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    } transition-all duration-200 ease-out`}>
      <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center">
        {isBot ? (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Bot className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
        )}
      </div>

      <div className={`max-w-3xl w-full p-4 rounded-2xl mx-2 ${
        isBot ? 
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700' : 
          'bg-blue-600 dark:bg-blue-700 text-white'
      } shadow-lg`}>
        {loading ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
          </div>
        ) : (
          <>
            {text && (
              <div className={`whitespace-pre-wrap break-words ${
                isBot ? 
                  'text-gray-800 dark:text-gray-100' : 
                  'text-white'
              } prose prose-sm dark:prose-invert max-w-none`}>
                {text}
              </div>
            )}
            
            {codeSnippets.length > 0 && codeSnippets.map((snippet, index) => (
              <div key={index} className="mt-4">
                <CodeWindow
                  code={snippet.code}
                  language={snippet.language}
                  className="border border-gray-200 dark:border-gray-700"
                />
              </div>
            ))}
            
            {timestamp && (
              <p className={`text-xs mt-2 ${
                isBot ? 
                  'text-gray-500 dark:text-gray-400' : 
                  'text-blue-100 dark:text-blue-200'
              }`}>
                {new Date(timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
