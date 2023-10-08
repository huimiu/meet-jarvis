'use client';

import { useEffect, useState } from 'react';

import { PromptCard } from '@/components/prompt-card';
import { Prompt } from '@/data/prompts';

export default function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    getPrompts().then((res) => {
      setPrompts(res.data);
    });
  }, []);

  return (
    <div className='container grid gap-4 py-6'>
      {prompts.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}

// Get the prompt array from redis
async function getPrompts(): Promise<any> {
  return fetch('/api/prompts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
