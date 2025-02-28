import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';
import { cdpChatbot } from '../services/cdpChatbot.ts';
import { MessageSquareText } from 'lucide-react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: "👋 Hi there! I'm your CDP Support Agent. I can help answer your 'how-to' questions about Segment, mParticle, Lytics, and Zeotap.\n\nTry asking me something like:\n• How do I set up a new source in Segment?\n• How can I create a user profile in mParticle?\n• How do I build an audience segment in Lytics?\n• How can I integrate my data with Zeotap?",
      isBot: true,
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [selectedCDP, setSelectedCDP] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    const userMessageId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: userMessageId,
      text,
      isBot: false,
      timestamp: Date.now()
    }]);
    
    setIsLoading(true);
    
    try {
      const response = await cdpChatbot.getResponse(text);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response.text,
        isBot: true,
        timestamp: Date.now(),
        codeSnippets: response.codeSnippets
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        isBot: true,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex bg-gray-100 dark:bg-gray-700 p-2 overflow-x-auto">
        {['All CDPs', 'Segment', 'mParticle', 'Lytics', 'Zeotap'].map((cdp) => (
          <button
            key={cdp}
            onClick={() => setSelectedCDP(cdp === 'All CDPs' ? null : cdp)}
            className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap transition-colors ${
              (cdp === 'All CDPs' && selectedCDP === null) || selectedCDP === cdp
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {cdp}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
              codeSnippets={message.codeSnippets}
            />
          ))}
          {isLoading && (
            <ChatMessage
              text=""
              isBot={true}
              loading={true}
              timestamp={Date.now()}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <InputBox onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
