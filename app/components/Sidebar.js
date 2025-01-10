'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 z-10 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-100"
      >
        <svg
          className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          min-h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-0 overflow-hidden' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Tavily AI
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          <Link 
            href="/overview" 
            className="flex items-center px-4 py-2 text-sm text-gray-900 bg-purple-50 rounded-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Overview
          </Link>

          <Link 
            href="/research-assistant" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M15.5 11.5C15.5 14.2614 13.2614 16.5 10.5 16.5C7.73858 16.5 5.5 14.2614 5.5 11.5C5.5 8.73858 7.73858 6.5 10.5 6.5C13.2614 6.5 15.5 8.73858 15.5 11.5Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 19.5L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Research Assistant
          </Link>

          <Link 
            href="/research-reports" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Research Reports
          </Link>

          <Link 
            href="/playground" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M8 7H4C3.44772 7 3 7.44772 3 8V16C3 16.5523 3.44772 17 4 17H8M8 7V17M8 7L13 12L8 17M14 7H20C20.5523 7 21 7.44772 21 8V16C21 16.5523 20.5523 17 20 17H14M14 7V17M14 7L19 12L14 17" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            API Playground
          </Link>

          <Link 
            href="/invoices" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M9 17H15M9 13H15M9 9H10M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Invoices
          </Link>

          <Link 
            href="/documentation" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg group"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Documentation
          </Link>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
              {/* Add user avatar image here if available */}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Eden Marco</div>
              <div className="text-xs text-gray-500">Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}