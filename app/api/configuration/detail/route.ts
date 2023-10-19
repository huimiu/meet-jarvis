import { NextResponse } from 'next/server';

import { kv } from '@vercel/kv';

export async function POST() {
  try {
    const records = await kv.hgetall('user-0001');
    return NextResponse.json({ data: records }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
