{/*'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { Message } from './types/chat'
import { useLocalStorage } from './hooks/useLocalStorage'
import ChatHeader from '../components/ChatHeader'
import SettingsPanel from '../components/SettingsPanel'
import ChatMessage from '../components/ChatMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import ChatInput from '../components/ChatInput'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [universalPrompt, setUniversalPrompt] = useLocalStorage('universalPrompt', '')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [promptText, setPromptText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize prompt text from localStorage
  useEffect(() => {
    setPromptText(universalPrompt)
  }, [universalPrompt])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle prompt changes with auto-save
  const handlePromptChange = (newPrompt: string) => {
    setPromptText(newPrompt)
    setUniversalPrompt(newPrompt)
  }

  // Clear the universal prompt
  const clearPrompt = () => {
    setPromptText('')
    setUniversalPrompt('')
  }

  // Send message to OpenAI API
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepare the message with universal prompt if it exists
      const messageToSend = universalPrompt 
        ? `${universalPrompt}\n\nUser: ${input}`
        : input

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.message }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ChatHeader 
        hasUniversalPrompt={!!universalPrompt}
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      
      {showSettings && (
        <SettingsPanel
          promptText={promptText}
          onPromptChange={handlePromptChange}
          onClearPrompt={clearPrompt}
          onClose={() => setShowSettings(false)}
        />
      )}

      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
       
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>Welcome to the AI Chatbot!</p>
              <p className="text-sm mt-2">
                {universalPrompt ? 'Universal prompt is active.' : 'Start a conversation below.'}
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          
          {isLoading && <LoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
  */}
  import ChatBot from '../components/Flip';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ChatBot />
    </main>
  );
}