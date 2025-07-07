'use client';

import { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { Send, Bot, User, Sparkles, Settings, X, Check, Trash2, Stars, Zap, Shield, Globe, Wand2, Menu, Save, Edit3, Heart, Coffee, } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export default function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [universalPrompt, setUniversalPrompt] = useState('');
  const [tempPrompt, setTempPrompt] = useState('');
  const [promptSaved, setPromptSaved] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load universal prompt from localStorage on component mount
  useEffect(() => {
    const savedPrompt = localStorage.getItem('universalPrompt');
    if (savedPrompt) {
      setUniversalPrompt(savedPrompt);
      setTempPrompt(savedPrompt);
    }
  }, []);

  // Save universal prompt to localStorage when it changes
  useEffect(() => {
    if (universalPrompt) {
      localStorage.setItem('universalPrompt', universalPrompt);
    } else {
      localStorage.removeItem('universalPrompt');
    }
  }, [universalPrompt]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, response]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const adjustPromptTextareaHeight = () => {
    if (promptTextareaRef.current) {
      promptTextareaRef.current.style.height = 'auto';
      promptTextareaRef.current.style.height = `${Math.min(promptTextareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [userInput]);

  useEffect(() => {
    adjustPromptTextareaHeight();
  }, [tempPrompt]);

  const constructPromptedMessage = (userMessage: string): string => {
    if (!universalPrompt.trim()) {
      return userMessage;
    }
    return `${universalPrompt.trim()}\n\nUser: ${userMessage}`;
  };

  const sendMessage = async () => {
  if (!userInput.trim()) return;

  const currentInput = userInput;
  setUserInput('');
  
  // Add user message to history (original message without prompt)
  setChatHistory(prev => [...prev, { role: 'user', content: currentInput }]);
  
  setIsLoading(true);
  setResponse('');

  try {
    // Construct the message with universal prompt
    const promptedMessage = constructPromptedMessage(currentInput);
    
    const apiResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: promptedMessage,
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const data: OpenRouterResponse = await apiResponse.json();
    const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
    
    // Convert markdown to HTML (make sure marked.parse returns a string, not a Promise)
    const htmlContent = await marked.parse(markdownText);
    setResponse(htmlContent);
    
    // Add assistant response to history
    setChatHistory(prev => [...prev, { role: 'assistant', content: htmlContent }]);
  } catch (error) {
    const errorMessage = `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`;
    setResponse(errorMessage);
    setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setResponse('');
  };

  const savePrompt = () => {
    setUniversalPrompt(tempPrompt);
    setPromptSaved(true);
    setTimeout(() => setPromptSaved(false), 2000);
  };

  const clearPrompt = () => {
    setUniversalPrompt('');
    setTempPrompt('');
    setPromptSaved(true);
    setTimeout(() => setPromptSaved(false), 2000);
  };

  const openSettings = () => {
    setShowSettings(true);
    setTempPrompt(universalPrompt);
  };

  const closeSettings = () => {
    setShowSettings(false);
    setTempPrompt(universalPrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 lg:p-6 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-2xl shadow-2xl">
                  <Bot className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Divine Chatbot
                  </h1>
                  <Stars className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <Zap className="w-3 h-3" />
                    <span className="text-xs lg:text-sm">AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs lg:text-sm">Secure</span>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-400">
                    <Globe className="w-3 h-3" />
                    <span className="text-xs lg:text-sm">Global</span>
                  </div>
                  {universalPrompt && (
                    <div className="flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                      <Wand2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Prompt Active</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={openSettings}
                className="group p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                title="Prompt Settings"
              >
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <button
                onClick={clearChat}
                className="group flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear Chat</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    openSettings();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Settings className="w-5 h-5" />
                  <span>Prompt Settings</span>
                </button>
                <button
                  onClick={() => {
                    clearChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Clear Chat</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Modal */}
         {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                      <Wand2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Universal Prompt Settings</h2>
                      <p className="text-white/70 text-sm">Customize your AI assistant&apos;s behavior</p>
                    </div>
                  </div>
                  <button
                    onClick={closeSettings}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-purple-400" />
                    <label className="text-sm font-medium text-white">
                      Universal Prompt
                    </label>
                  </div>
                  <textarea
                    ref={promptTextareaRef}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none placeholder-white/50 text-white backdrop-blur-sm scrollbar-none"
                    placeholder="Enter your universal prompt here... (e.g., 'You are a helpful assistant who always responds in a friendly manner.')"
                    value={tempPrompt}
                    onChange={(e) => setTempPrompt(e.target.value)}
                    rows={6}
                    style={{ minHeight: '120px' }}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-3">
                    {promptSaved && (
                      <div className="flex items-center space-x-2 text-emerald-400 animate-fade-in">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Saved successfully!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={clearPrompt}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Clear</span>
                    </button>
                    <button
                      onClick={savePrompt}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Prompt</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.length === 0 && !response && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Welcome to AI ChatBot
              </h3>
              <p className="text-white max-w-md mx-auto mb-4">
                Start a conversation by typing your message below. I&apos;m here to help with questions, creative tasks, and more!
              </p>
              {universalPrompt && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    Universal Prompt is Active
                  </p>
                  <p className="text-xs text-blue-600">
                    All your messages will be enhanced with your custom prompt.
                  </p>
                </div>
              )}
            </div>
          )}

          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
            >
              <div className={`flex items-start space-x-3 lg:space-x-4 max-w-[85%] lg:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`relative p-3 rounded-2xl shadow-lg ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}>
                  {message.role === 'user' ? 
                    <User className="w-5 h-5 text-white" /> : 
                    <Bot className="w-5 h-5 text-white" />
                  }
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                </div>
                <div className={`px-4 lg:px-6 py-3 lg:py-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white' 
                    : 'bg-white/10 border border-white/20 text-white'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.role === 'user' ? (
                      <span className="text-xs font-medium opacity-80">You</span>
                    ) : (
                    <div 
                      className="prose prose-sm max-w-none
                        [&>h3]:text-gray-700 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-0
                        [&>strong]:text-emerald-600
                        [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:my-2
                        [&>li]:mb-1
                        [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:my-2
                        [&>p]:mb-2 [&>p]:last:mb-0
                        [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                        [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                        [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-3
                        [&>pre>code]:bg-transparent [&>pre>code]:p-0"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  )}
                </div>
              </div>
             </div>
            </div>
          ))}

          {/* Current response (if loading or just sent) */}
          {(isLoading || response) && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  ) : (
                    <div 
                      className="prose prose-sm max-w-none
                        [&>h3]:text-gray-700 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-0
                        [&>strong]:text-emerald-600
                        [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:my-2
                        [&>li]:mb-1
                        [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:my-2
                        [&>p]:mb-2 [&>p]:last:mb-0
                        [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                        [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                        [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-3
                        [&>pre>code]:bg-transparent [&>pre>code]:p-0"
                      dangerouslySetInnerHTML={{ __html: response }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-4 lg:p-6">
          <div className="flex items-end space-x-3 lg:space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-12 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none placeholder-white/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                placeholder="Type your message here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                rows={1}
                style={{ minHeight: '56px' }}
              />
              <div className="absolute bottom-2 right-2 flex items-center space-x-2 text-white/40">
                <Coffee className="w-3 h-3" />
                <span className="text-xs">Press Enter to send</span>
              </div>
            </div>
            <button
              className="group relative p-3 lg:p-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              onClick={sendMessage}
              disabled={isLoading || !userInput.trim()}
            >
              <div className="relative">
                {isLoading ? (
                  <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-4 text-white/40 text-xs">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Fast</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>Made by me, Divine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}