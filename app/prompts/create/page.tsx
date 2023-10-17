'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChatModel } from '@/data/prompts';

export default function PromptDetail() {
  const [saving, setSaving] = useState(false);
  const [systemValue, setSystemValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const [assistantValue, setAssistantValue] = useState('');

  const router = useRouter();

  return (
    <div className='container py-6 grid h-full items-stretch gap-6'>
      <div className='grid gap-6 px-2'>
        <div className='grid gap-3'>
          <Label htmlFor='system'>System</Label>
          <Textarea
            className='h-fit whitespace-pre-wrap min-h-[240px]'
            value={systemValue}
            onChange={(e) => {
              setSystemValue(e.target.value);
            }}
          />
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='user'>User</Label>
          <Textarea
            className='h-fit whitespace-pre-wrap'
            value={userValue}
            onChange={(e) => {
              setUserValue(e.target.value);
            }}
          />
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='assistant'>Assistant</Label>
          <Textarea
            className='h-fit whitespace-pre-wrap'
            value={assistantValue}
            onChange={(e) => {
              setAssistantValue(e.target.value);
            }}
          />
        </div>
        <div className='flex w-full space-x-2'>
          <Button
            className='ml-auto'
            onClick={async () => await savePrompt('')}
          >
            Save
          </Button>
          <Button variant='outline' onClick={router.back}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Get the prompt array from redis
 * If id is not provided, return empty array
 * Otherwise return the prompt with the id.
 * @param id
 * @returns
 */
async function getPrompt(id?: string) {
  if (!id) {
    return [];
  }
  let messages: ChatModel[] = [];
  const prompts = await fetch('/api/prompts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  prompts.data.forEach((prompt: { id: string; messages: ChatModel[] }) => {
    if (prompt.id === id) {
      messages = prompt.messages;
    }
  });
  return messages;
}

const savePrompt = async (prompt: string) => {
  return await fetch('/api/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
