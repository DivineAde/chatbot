'use client';
import { useState } from 'react';
import useChat from './useChat';
import { X } from 'lucide-react';

export default function PromptSettings() {
  const { universalPrompt, setUniversalPrompt, clearPrompt } = useChat();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 text-sm">Settings</button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex">
          <div className="m-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Universal Prompt</h2>
              <button onClick={() => setOpen(false)}><X/></button>
            </div>

            <textarea
              rows={6}
              className="w-full rounded border p-2"
              value={universalPrompt}
              onChange={(e) => setUniversalPrompt(e.target.value)}
              placeholder="e.g. You are a Shakespearean poet..."
            />

            <div className="mt-4 flex gap-2">
              <button
                onClick={clearPrompt}
                className="rounded bg-red-500 px-3 py-1 text-white text-sm"
              >
                Clear Prompt
              </button>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto rounded bg-blue-600 px-3 py-1 text-white text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
