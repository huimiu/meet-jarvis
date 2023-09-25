'use client';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Prompt } from '@/data/prompts';

import { Badge } from './ui/badge';

interface PromptCardProp {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProp) {
  const router = useRouter();
  return (
    <Card
      className='hover:cursor-pointer'
      onClick={(e) => {
        router.push(`/prompt/${prompt.id}`);
      }}
    >
      <CardHeader className='grid items-start'>
        <div>
          <CardTitle>{prompt.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{JSON.stringify(prompt.messages)}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className='flex space-x-4 items-center'>
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant='outline' className='font-normal'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
