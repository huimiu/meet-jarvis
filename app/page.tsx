import { Metadata } from 'next'
import Image from 'next/image'

import { CodeViewer } from '@/components/code-viewer'
import { MaxLengthSelector } from '@/components/maxlength-selector'
import { ModelSelector } from '@/components/model-selector'
import { PresetActions } from '@/components/preset-actions'
import { PresetSave } from '@/components/preset-save'
import { PresetSelector } from '@/components/preset-selector'
import { PresetShare } from '@/components/preset-share'
import { TemperatureSelector } from '@/components/temperature-selector'
import { TopPSelector } from '@/components/top-p-selector'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { presets } from '@/data/presets'

import { models, types } from '../data/models'

export const metadata: Metadata = {
  title: "Jarvis",
  description: "The AI Assistant for working and living better.",
}

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
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Jarvis</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <ModelSelector types={types} models={models} />
                <TemperatureSelector defaultValue={[0.56]} />
                <MaxLengthSelector defaultValue={[256]} />
                <TopPSelector defaultValue={[0.9]} />
              </div>
              <div className="md:order-1">
                <div className="ml-auto flex w-full space-x-2 sm:justify-start">
                  <PresetSelector presets={presets} />
                  <PresetSave />
                  <div className="hidden space-x-2 md:flex">
                    <CodeViewer />
                    <PresetShare />
                  </div>
                  <PresetActions />
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full gap-6 lg:grid-cols-2">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-1 flex-col space-y-2">
                        <Label htmlFor="input">Input</Label>
                        <Textarea
                          id="input"
                          placeholder="We is going to the market."
                          className="flex-1 lg:min-h-[580px]"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea
                          id="instructions"
                          placeholder="Fix the grammar."
                        />
                      </div>
                    </div>
                    <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}