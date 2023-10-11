import { Skeleton } from '@/components/ui/skeleton';

export function PromptCardLoading() {
  return (
    <div className='grid gap-4 px-6 py-4'>
      <Skeleton className='h-4 w-32' />
      <Skeleton className='h-[60px] w-full' />
      <div className='flex gap-2'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-4 w-12' />
      </div>
    </div>
  );
}
