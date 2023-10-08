import { Metadata } from 'next';

import { PromptCard } from '@/components/prompt-card';
import { prompts } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Prompts for Jarvis.',
};

export default function Prompts() {
  return (
    <div className='container grid gap-4 py-6'>
      {prompts.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
