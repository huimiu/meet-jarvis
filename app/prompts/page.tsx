import { PromptCard } from '@/components/prompt-card';

export default function Prompts() {
  return (
    <div className='grid md:gap-4 xl:gap-4 p-4 justify-center'>
      <PromptCard />
      <PromptCard />
    </div>
  );
}
