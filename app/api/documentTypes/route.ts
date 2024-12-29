import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const documentTypes = await db.documentTypes.findMany();
  return NextResponse.json(documentTypes);
}
