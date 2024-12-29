import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const departments = await db.departments.findMany();
  return NextResponse.json(departments);
}
