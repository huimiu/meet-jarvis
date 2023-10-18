'use client';

import { useEffect, useState } from 'react';

import { Prompt } from '@/data/prompts';

import { ApiKey } from './api-key';
import { CopyButton } from './copy-button';
import { PromptSelector } from './prompt-selector';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export function ChatPanel() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>();
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (prompt: Prompt | undefined) => {
    setSelectedPrompt(prompt);
    setAnswer('');
  };

  const copyResponse = () => {
    if (answer) navigator.clipboard.writeText(answer);
  };

  useEffect(() => {
    getPrompts().then((res) => {
      setPrompts(res.data);
    });
  }, []);

  return (
    <div className='grid gap-2'>
      <div className='ml-auto flex w-full space-x-2 sm:justify-between'>
        <div className='space-x-2'>
          <PromptSelector
            loading={loading}
            prompts={prompts}
            selectedPrompt={selectedPrompt}
            handlePromptChange={handlePromptChange}
          />
        </div>
        <div className='ml-auto flex space-x-2'>
          <CopyButton copyHandler={copyResponse} />
          <ApiKey />
        </div>
      </div>

      <Textarea
        id='instructions'
        placeholder='Response...'
        className='h-[300px]'
        value={answer}
        readOnly
      />
      <div className='flex flex-col'>
        <Textarea
          id='instructions'
          disabled={loading}
          placeholder='Input your prompt here...'
          className='h-[120px]'
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className='ml-auto flex w-full space-x-2 sm:justify-between'>
        <div className='space-x-2'>
          {loading ? (
            <Button variant='outline' disabled>
              Please wait
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setLoading(true);
                const res = await aiCompletion(question);
                setAnswer(res.data);
                setLoading(false);
              }}
            >
              Submit
            </Button>
          )}
          <Button
            disabled={loading}
            variant='outline'
            onClick={() => {
              setQuestion('');
              setAnswer('');
            }}
          >
            Clear
          </Button>
        </div>
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

// Get the prompt array from redis
async function getPrompts(): Promise<any> {
  return fetch('/api/prompt/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
