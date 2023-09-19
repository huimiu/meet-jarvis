'use client';

import { useState } from 'react';

import { Prompt, prompts } from '@/data/prompts';

import { PresetActions } from './preset-actions';
import { PromptSelector } from './prompt-selector';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export function ChatPanel() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>();
  const handlePromptChange = (prompt: Prompt | undefined) => {
    setSelectedPrompt(prompt);
    setAnswer('');
  };
  return (
    <div className='grid gap-2'>
      <div className='flex flex-col'>
        <Textarea
          id='instructions'
          placeholder='Input prompt...'
          className='h-[200px]'
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className='ml-auto flex w-full space-x-2 sm:justify-between'>
        <div className='space-x-2'>
          <PromptSelector
            prompts={prompts}
            selectedPrompt={selectedPrompt}
            handlePromptChange={handlePromptChange}
          />
          <Button
            variant='outline'
            onClick={async () => {
              const res = await aiCompletion(question);
              setAnswer(res.data);
            }}
          >
            Submit
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setQuestion('');
              setAnswer('');
            }}
          >
            Clear
          </Button>
        </div>
        <PresetActions />
      </div>
      <div className='flex flex-col'>
        <Textarea
          id='instructions'
          placeholder='Response...'
          className='h-[300px]'
          value={answer}
          readOnly
        />
      </div>
    </div>
  );
}

const aiCompletion = async (question: string) => {
  return await fetch('/api/completion', {
    method: 'POST',
    body: JSON.stringify({
      content: question,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
