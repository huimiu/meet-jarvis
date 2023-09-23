'use client';

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
  return (
    <Card className='hover:cursor-pointer'>
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
            <Badge variant='outline' className='font-normal'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
