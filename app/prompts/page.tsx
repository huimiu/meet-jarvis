'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PromptCard } from '@/components/prompt-card';
import { PromptCardLoading } from '@/components/prompt-card-loading';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Prompt } from '@/data/prompts';

export default function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getPrompts()
      .then((res) => {
        setPrompts(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className='container grid gap-6 py-6'>
          <div className='flex w-full'>
            <Skeleton className='ml-auto h-10 w-16' />
          </div>
          <PromptCardLoading />
          <PromptCardLoading />
        </div>
      ) : (
        <div className='container grid gap-4 py-6'>
          <div className='flex w-full'>
            <Button
              className='ml-auto'
              onClick={(e) => router.push(`/prompts/create`)}
            >
              Add
            </Button>
          </div>
          {prompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </>
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
