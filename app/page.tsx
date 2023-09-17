import { Metadata } from 'next'
import Image from 'next/image'

import { ChatPanel } from '@/components/chat-panel'
import { MaxLengthSelector } from '@/components/maxlength-selector'
import { ModelSelector } from '@/components/model-selector'
import { TemperatureSelector } from '@/components/temperature-selector'
import { TopPSelector } from '@/components/top-p-selector'
import { Separator } from '@/components/ui/separator'

import { models, types } from '../data/models'

export const metadata: Metadata = {
  title: 'Jarvis',
  description: 'The AI Assistant for working and living better.',
}

export default function PlaygroundPage() {
  return (
    <>
      <div className='md:hidden'>
        <Image
          src='/examples/playground-light.png'
          width={1280}
          height={916}
          alt='Playground'
          className='block dark:hidden'
        />
        <Image
          src='/examples/playground-dark.png'
          width={1280}
          height={916}
          alt='Playground'
          className='hidden dark:block'
        />
      </div>
      <div className='hidden h-full flex-col md:flex'>
        <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'></div>
        <Separator />

        <div className='container h-full py-6'>
          <div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]'>
            <div className='flex-col space-y-4 sm:flex md:order-2'>
              <ModelSelector types={types} models={models} />
              <TemperatureSelector defaultValue={[0.56]} />
              <MaxLengthSelector defaultValue={[256]} />
              <TopPSelector defaultValue={[0.9]} />
            </div>
            <div className='md:order-1'>
              <div className='flex flex-col w-full space-y-2'>
                <ChatPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
