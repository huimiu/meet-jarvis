import { Metadata } from 'next';

import { PromptCard } from '@/components/prompt-card';
import { prompts } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Prompts for Jarvis.',
};

export default function Prompts() {
  return (
    <div className='grid md:gap-4 xl:gap-4 p-4 md:w-2/3 m-auto'>
      {prompts.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
