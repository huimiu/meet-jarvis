import { Metadata } from 'next';

import { PromptCard } from '@/components/prompt-card';
import { prompts } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Prompts for Jarvis.',
};

export default function Prompts() {
  return (
    <div className='grid md:gap-4 xl:gap-4 p-4 justify-center'>
      {prompts.map((p) => (
        <PromptCard prompt={p} />
      ))}
    </div>
  );
}
