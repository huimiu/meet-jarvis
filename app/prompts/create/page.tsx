'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Prompt {
  name: string;
  messages: string;
  tags: string;
}

export default function PromptDetail() {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [systemValue, setSystemValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const [assistantValue, setAssistantValue] = useState('');

  const router = useRouter();

  return (
    <div className='container py-6 grid h-full items-stretch gap-6'>
      <div className='grid gap-6 px-2'>
        <div className='grid gap-3'>
          <Label htmlFor='system'>Name</Label>
          <Input
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            onClick={async () =>
              await createPrompt(
                name,
                combineMessages({
                  systemValue,
                  userValue,
                  assistantValue,
                }),
                'Spoken English'
              )
            }
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

const createPrompt = async (name: string, messages: string, tags: string) => {
  return await fetch('/api/prompt/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      messages,
      tags,
    }),
  });
};

const combineMessages = ({ systemValue, userValue, assistantValue }: any) => {
  return JSON.stringify([
    { role: 'System', content: systemValue },
    { role: 'user', content: userValue },
    { role: 'assistant', content: assistantValue },
  ]);
};
