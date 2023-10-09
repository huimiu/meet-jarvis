'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PromptLoading } from '@/components/prompt-loading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChatModel } from '@/data/prompts';

export default function PromptDetail() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [systemValue, setSystemValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const [assistantValue, setAssistantValue] = useState('');

  useEffect(() => {
    setLoading(true);
    getPrompt(params.id as string)
      .then((res) => {
        setSystemValue(res[0].content);
        setUserValue(res[1].content);
        setAssistantValue(res[2].content);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='container py-6 grid h-full items-stretch gap-6'>
      <div>
        <Button variant='outline' onClick={router.back}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
      </div>
      {loading ? (
        <PromptLoading />
      ) : (
        <div className='grid gap-6 px-2 md:px-20'>
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
            <Button variant='outline'>Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter the prompt by id
async function getPrompt(id: string) {
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