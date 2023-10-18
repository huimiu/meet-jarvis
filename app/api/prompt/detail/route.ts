import { NextRequest, NextResponse } from 'next/server';

import { Prompt } from '@/data/prompts';
import { db } from '@/lib/kysely';

export async function POST(req: NextRequest) {
  const reqJson = await req.json();
  try {
    const id = reqJson.id;
    if (!id) {
      throw new Error('Invalid param!');
    }
    const record = await db
      .selectFrom('prompts')
      .selectAll()
      .where('id', '=', reqJson.id)
      .executeTakeFirst();
    if (!record) {
      throw new Error('No record!');
    }
    const prompt: Prompt = {
      id: record.id,
      name: record.name,
      messages: JSON.parse(record.messages),
      tags: record.tags.split(','),
    };
    return NextResponse.json({ ...prompt }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
