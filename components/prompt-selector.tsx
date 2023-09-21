'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { PopoverProps } from '@radix-ui/react-popover';

import { Prompt } from '../data/prompts';

interface PromptSelectorProps extends PopoverProps {
  loading: boolean;
  prompts: Prompt[];
  selectedPrompt?: Prompt;
  handlePromptChange: (prompt: Prompt) => void;
}

export function PromptSelector({
  prompts,
  selectedPrompt,
  handlePromptChange,
  loading,
  ...props
}: PromptSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          disabled={loading}
          variant='outline'
          role='combobox'
          aria-label='Select a prompt...'
          aria-expanded={open}
          className='flex-1 justify-between min-w-[400px]'
        >
          {selectedPrompt ? selectedPrompt.name : 'Load a prompt...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandInput placeholder='Search prompts...' />
          <CommandEmpty>No prompts found.</CommandEmpty>
          <CommandGroup heading='Language'>
            {prompts.map((p) => (
              <CommandItem
                key={p.id}
                onSelect={() => {
                  handlePromptChange(p);
                  setOpen(false);
                }}
              >
                {p.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedPrompt?.id === p.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup className='pt-0'>
            <CommandItem onSelect={() => router.push('/examples')}>
              More prompts
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
