'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Settings, 
  X, 
  Check, 
 
  Zap,
  Brain,
  Stars,
  Trash2,
  Save,
  Edit3,
  
  Menu,
  Wand2,
  Rocket,
  Shield,
  Globe,
  Heart,
  Coffee
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
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
      
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = `Thank you for your message: "${currentInput}". This is a premium AI chatbot interface designed to showcase modern web development skills including React, TypeScript, Tailwind CSS, and responsive design principles. The interface features glassmorphism effects, smooth animations`;
      
      setResponse(mockResponse);
      
      // Add assistant response to history
      setChatHistory(prev => [...prev, { role: 'assistant', content: mockResponse }]);
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl h-screen flex flex-col">
        {/* Enhanced Header */}
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

        {/* Enhanced Settings Modal */}
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

        {/* Enhanced Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {chatHistory.length === 0 && !response && (
            <div className="text-center py-12 lg:py-20">
              <div className="relative inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full animate-spin-slow"></div>
                <div className="relative bg-slate-900 rounded-full p-4 lg:p-5">
                  <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Welcome to NeuralChat Pro
              </h3>
              <p className="text-white/70 max-w-md mx-auto mb-8 text-lg">
                Experience the future of AI conversation with our premium interface
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <Rocket className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">Lightning Fast</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">Secure & Private</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">AI-Powered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">User-Friendly</p>
                </div>
              </div>

              {universalPrompt && (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-6 max-w-lg mx-auto backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Wand2 className="w-5 h-5 text-emerald-400" />
                    <p className="text-emerald-300 font-medium">Universal Prompt Active</p>
                  </div>
                  <p className="text-emerald-200 text-sm">
                    All your messages will be enhanced with your custom prompt for personalized responses.
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
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-medium opacity-80">NeuralChat</span>
                        <Stars className="w-3 h-3 opacity-60" />
                      </div>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Current response */}
          {(isLoading || response) && (
            <div className="flex justify-start mb-6">
              <div className="flex items-start space-x-3 lg:space-x-4 max-w-[85%] lg:max-w-[75%]">
                <div className="relative p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                </div>
                <div className="px-4 lg:px-6 py-3 lg:py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-white/80">NeuralChat</span>
                    <Stars className="w-3 h-3 text-white/60" />
                  </div>
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <div className="flex items-center space-x-1 text-white/60">
                        <Brain className="w-4 h-4 animate-pulse" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white leading-relaxed">{response}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-4 lg:p-6">
          <div className="flex items-end space-x-3 lg:space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-12 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none placeholder-white/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                placeholder="Type your message here... (Shift+Enter for new line)"
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
              <span>Made with love</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}