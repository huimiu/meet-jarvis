import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const reqJson = await req.json();
  try {
    const name = reqJson.name;
    const messages = reqJson.messages;
    const tags = reqJson.tags;

    if (!name || !messages || !tags) {
      throw new Error('Invalid prompt');
    }

    const id = uuidv4();

    await sql`INSERT INTO Prompts (Id, Name, Messages, Tags) VALUES (${id}, ${name}, ${messages}, ${tags});`;
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
