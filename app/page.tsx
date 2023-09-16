import { Metadata } from 'next'
import Image from 'next/image'

import { MaxLengthSelector } from '@/components/maxlength-selector'
import { ModelSelector } from '@/components/model-selector'
import { PresetActions } from '@/components/preset-actions'
import { PresetSelector } from '@/components/preset-selector'
import { TemperatureSelector } from '@/components/temperature-selector'
import { TopPSelector } from '@/components/top-p-selector'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { presets } from '@/data/presets'

import { models, types } from '../data/models'

export const metadata: Metadata = {
  title: "Jarvis",
  description: "The AI Assistant for working and living better.",
};

export default function PlaygroundPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"></div>
        <Separator />

        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="flex-col space-y-4 sm:flex md:order-2">
              <ModelSelector types={types} models={models} />
              <TemperatureSelector defaultValue={[0.56]} />
              <MaxLengthSelector defaultValue={[256]} />
              <TopPSelector defaultValue={[0.9]} />
            </div>
            <div className="md:order-1">
              <div className="flex flex-col w-full space-y-2">
                <div className="grid gap-2">
                  <div className="flex flex-col">
                    <Textarea
                      id="instructions"
                      placeholder="Input prompt..."
                    />
                  </div>
                  <div className="ml-auto flex w-full space-x-2 sm:justify-between">
                    <div className="space-x-2">
                      <PresetSelector presets={presets} />
                      <Button variant="outline">Submit</Button>
                      <Button variant="outline">Clear</Button>
                    </div>
                    <PresetActions />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Card>
                      <CardContent>Test</CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
