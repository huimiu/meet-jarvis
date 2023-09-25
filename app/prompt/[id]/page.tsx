'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatModel, prompts } from '@/data/prompts';

export default function PromptDetail() {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <Button variant='ghost' onClick={router.back}>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      <Textarea
        placeholder='Tell us a little bit about yourself'
        className='resize-none'
        value={JSON.stringify(getPrompt(params.id as string))}
      />
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
