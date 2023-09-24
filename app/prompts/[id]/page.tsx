'use client';

import { useParams } from 'next/navigation';

import { Textarea } from '@/components/ui/textarea';
import { ChatModel, prompts } from '@/data/prompts';

export default function PromptDetail() {
  const params = useParams();

  return (
    <div>
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
