import { NextResponse } from 'next/server';

import { Prompt } from '@/data/prompts';
import { db } from '@/lib/kysely';

export async function GET() {
  try {
    const records = await db.selectFrom('prompts').selectAll().execute();
    let prompts: Prompt[] = [];
    records.forEach((r) => {
      prompts.push({
        id: r.id,
        name: r.name,
        messages: JSON.parse(r.messages),
        tags: r.tags.split(','),
      });
    });
    return NextResponse.json({ data: prompts });
  } catch (e) {
    return NextResponse.error();
  }
}
