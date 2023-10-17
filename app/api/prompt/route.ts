import { NextRequest, NextResponse } from 'next/server';

import { kv } from '@vercel/kv';

export async function GET(req: NextRequest) {
  const reqJson = await req.json();
  try {
    NextResponse.json({ data: await kv.get(`prompt-${reqJson.id}`) });
  } catch (e) {
    return NextResponse.error();
  }
}
