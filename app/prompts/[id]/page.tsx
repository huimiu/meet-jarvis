'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChatModel, prompts } from '@/data/prompts';

export default function PromptDetail() {
  const params = useParams();
  const router = useRouter();
  const [systemValue, setSystemValue] = useState<string>(
    getPrompt(params.id as string)[0].content
  );
  const [userValue, setUserValue] = useState<string>(
    getPrompt(params.id as string)[1].content
  );
  const [assistantValue, setAssistantValue] = useState<string>(
    getPrompt(params.id as string)[2].content
  );

  return (
    <div className='container py-6 grid h-full items-stretch gap-6'>
      <div>
        <Button variant='outline' onClick={router.back}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
      </div>
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
          <Button className='ml-auto'>Save</Button>
          <Button variant='outline'>Delete</Button>
        </div>
      </div>
    </div>
  );
}

// Get the prop value of messages from the prompts array
function getPrompt(id: string) {
  let messages: ChatModel[] = [];
  prompts.forEach((prompt) => {
    if (prompt.id === id) {
      messages = prompt.messages;
    }
  });
  return messages;
}
