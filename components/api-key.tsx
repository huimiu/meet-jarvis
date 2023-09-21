import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

export function ApiKey() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <Input id='apikey' className='h-8' placeholder='Input your API key' />
      </PopoverContent>
    </Popover>
  );
}
