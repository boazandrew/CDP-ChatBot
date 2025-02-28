import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeWindow({ code, language = 'javascript', className }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <span className="text-sm text-gray-300 font-mono">
          {language}
        </span>
      </div>

      {/* Code Content */}
      <div className="relative group">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1a1a1a',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 p-2 rounded-md transition-opacity ${
            isCopied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}
