import { NextRequest, NextResponse } from 'next/server';

import { kv } from '@vercel/kv';

export async function POST(req: NextRequest) {
  const reqJson = await req.json();
  try {
    const apiKey = reqJson.apiKey;
    const apiEndpoint = reqJson.apiEndpoint;
    const deploymentName = reqJson.deploymentName;
    if (!apiKey || !apiEndpoint || !deploymentName) {
      throw new Error('Invalid param!');
    }
    await kv.hset('user-0001', { apiKey, apiEndpoint, deploymentName });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
