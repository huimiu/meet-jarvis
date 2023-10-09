import { Skeleton } from '@/components/ui/skeleton';

export function PromptLoading() {
  return (
    <div className='grid gap-6 px-2 md:px-20'>
      <div className='grid gap-3'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-[240px] w-full' />
      </div>
      <div className='grid gap-3'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='grid gap-3'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='flex w-full space-x-2'>
        <Skeleton className='ml-auto h-4 w-12' />
        <Skeleton className='h-4 w-12' />
      </div>
    </div>
  );
}
