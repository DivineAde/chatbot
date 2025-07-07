'use client';
import { useEffect, useRef, useState, FormEvent } from 'react';

export interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function useChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [universalPrompt, setUniversalPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Only run in browser after hydration
  useEffect(() => {
    const saved = localStorage.getItem('uniprompt');
    if (saved) setUniversalPrompt(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('uniprompt', universalPrompt);
    }
  }, [universalPrompt]);

  async function send(e: FormEvent<HTMLFormElement>, text: string) {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg: Msg = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((m) => [...m, newMsg]);
    setLoading(true);

    abortRef.current = new AbortController();
    const res = await fetch('/api/chat', {
      method: 'POST',
      signal: abortRef.current.signal,
      body: JSON.stringify({ messages: [...messages, newMsg], universalPrompt }),
    });

    const reader = res.body!.getReader();
    let aiText = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      aiText += new TextDecoder().decode(value);
      setMessages((m) =>
        [...m.filter((msg) => msg.id !== 'ai-typing'), { id: 'ai-typing', role: 'assistant', content: aiText }]
      );
    }
    setMessages((m) =>
      m.map((msg) => (msg.id === 'ai-typing' ? { ...msg, id: crypto.randomUUID() } : msg))
    );
    setLoading(false);
  }

  return {
    messages,
    send,
    loading,
    universalPrompt,
    setUniversalPrompt,
    clearPrompt: () => setUniversalPrompt(''),
  };
}
