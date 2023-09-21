'use client';

import { useEffect, useState } from 'react';

import { CheckIcon, ClipboardCopyIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';

interface CopyButtonProps {
  copyHandler?: any;
}

export function CopyButton({ copyHandler }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const onCopyClick = (event: any) => {
    copyHandler(event);
    setCopied(true);
  };

  return copied ? (
    <Button variant='outline'>
      <CheckIcon />
    </Button>
  ) : (
    <Button variant='outline' onClick={onCopyClick}>
      <ClipboardCopyIcon />
    </Button>
  );
}
