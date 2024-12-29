import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const fields = await db.fields.findMany();
  return NextResponse.json(fields);
}
