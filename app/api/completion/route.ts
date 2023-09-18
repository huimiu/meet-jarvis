
import { NextRequest, NextResponse } from 'next/server';

import { prompts } from '@/data/prompts';

export async function POST(req: NextRequest) {
  // call Azure OpenAI API with fetch
  try {
    const response = await fetch(`${process.env.AZURE_OAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OAI_API_VERSION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': `${process.env.AZURE_OAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          ...prompts[0].messages,
        {
          "role": "user",
          "content": (await req.json()).content
        }]
      }),
    })
    const res = await response.json();
    return NextResponse.json({ data: res.choices[0].message.content });
  } catch (e) {
    return NextResponse.error()
  }

}