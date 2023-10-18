'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PromptLoading } from '@/components/prompt-loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Prompt } from '@/data/prompts';

export default function PromptDetail() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [systemValue, setSystemValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const [assistantValue, setAssistantValue] = useState('');

  useEffect(() => {
    setLoading(true);
    getPrompt(params.id as string)
      .then((res) => {
        setName(res.name);
        setSystemValue(res.messages[0].content);
        setUserValue(res.messages[1].content);
        setAssistantValue(res.messages[2].content);
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
  const prompt: Prompt = await fetch('/api/prompt/detail', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return prompt;
}

const savePrompt = async (prompt: string) => {
  return await fetch('/api/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
