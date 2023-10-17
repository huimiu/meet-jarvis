import { NextRequest, NextResponse } from 'next/server';

import { kv } from '@vercel/kv';

export async function POST(req: NextRequest) {
  const reqJson = await req.json();
  try {
    NextResponse.json({ data: await kv.set(`prompt-${reqJson.id}`, reqJson) });
  } catch (e) {
    return NextResponse.error();
  }
}
