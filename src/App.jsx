import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { Database, MessageSquareText, Settings, Moon, Sun } from 'lucide-react';
import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/600.css';
import React from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches && 
     !localStorage.getItem('theme'))
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300' },
    React.createElement(
      'header',
      { className: 'p-4 bg-white dark:bg-gray-800 shadow-sm' },
      React.createElement(
        'div',
        { className: 'max-w-6xl mx-auto flex justify-between items-center' },
        React.createElement(
          'div',
          { className: 'flex items-center space-x-2' },
          React.createElement(Database, { className: 'h-6 w-6 text-blue-600 dark:text-blue-400' }),
          React.createElement(
            'h1',
            { className: 'text-2xl font-bold text-gray-800 dark:text-white' },
            'CDP Support Agent'
          )
        ),
        React.createElement(
          'div',
          { className: 'flex items-center space-x-4' },
          React.createElement(
            'button',
            {
              onClick: () => setDarkMode(!darkMode),
              className: 'p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
              'aria-label': 'Toggle dark mode'
            },
            darkMode
              ? React.createElement(Sun, { className: 'w-5 h-5 text-yellow-400' })
              : React.createElement(Moon, { className: 'w-5 h-5 text-gray-800' })
          )
        )
      )
    ),
    React.createElement(
      'main',
      { className: 'max-w-6xl mx-auto p-4' },
      React.createElement(ChatWindow)
    ),
    React.createElement(
      'footer',
      { className: 'p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700' },
      React.createElement(
        'div',
        { className: 'max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400' },
        React.createElement(
          'p',
          null,
          'CDP Support Agent - Answers "how-to" questions for Segment, mParticle, Lytics, and Zeotap'
        )
      )
    )
  );
}

export default App;
