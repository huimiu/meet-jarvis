import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

export function ApiInfo() {
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [deploymentName, setDeploymentName] = useState('');

  useEffect(() => {
    getConfigurations()
      .then((res) => {
        setApiKey(res.apiKey);
        setApiEndpoint(res.apiEndpoint);
        setDeploymentName(res.deploymentName)
      })
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='grid gap-1.5'>
            <Label htmlFor='apikey'>API Key</Label>
            <Input id='apikey' className='h-8' placeholder='API key' value={apiKey} />
          </div>
          <div className='grid gap-1.5'>
            <Label htmlFor='apiEndpoint'>API Endpoint</Label>
            <Input
              id='apiEndpoint'
              className='h-8'
              placeholder='API Endpoint'
              value={apiEndpoint}
            />
          </div>
          <div className='grid gap-1.5'>
            <Label htmlFor='deploymentName'>Deployment Name</Label>
            <Input
              id='deploymentName'
              className='h-8'
              placeholder='Deployment Name'
              value={deploymentName}
            />
          </div>
          <div>
            <Button>Update</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

async function getConfigurations(): Promise<any> {
  return fetch('/api/configuration/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
async function updateConfigruations(apiKey: string, apiEndpoint: string, deploymentName: string): Promise<any> {
  return fetch('/api/configuration/update', {
    method: 'POST',
    body: JSON.stringify({
      apiKey,
      apiEndpoint,
      deploymentName
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
