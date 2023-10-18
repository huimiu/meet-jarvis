import { createKysely } from '@vercel/postgres-kysely';

interface PromptsTable {
  id: string;
  name: string;
  messages: string;
  tags: string;
}

// Keys of this interface are table names.
export interface Database {
  prompts: PromptsTable;
}

export const db = createKysely<Database>();
export { sql } from 'kysely';
