
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  // call Azure OpenAI API with fetch
  try {
    const response = await fetch(`${process.env.AZURE_OAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OAI_API_VERSION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': `${process.env.AZURE_OAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{
          "role": "system",
          "content": "Hello, I'm Hui. I'm a chatbot that can help you with your Azure OpenAI questions."
        },
        {
          "role": "user",
          "content": "What is Azure OpenAI?"
        },
        {
          "role": "assistant",
          "content": "Azure OpenAI is a cloud-based service that provides advanced natural language processing over the cloud."
        },
        {
          "role": "user",
          "content": "What is Azure OpenAI's pricing?"
        }]
      }),
    })
    const data = await response.json();
    const res = data.choices[0].message.content;
    return NextResponse.json({ response: res });
  } catch (e) {
    return NextResponse.error()
  }

}