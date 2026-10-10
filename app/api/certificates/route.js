import { NextResponse } from 'next/server';
import { getCertificates } from '@/lib/dataUtils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const certificates = getCertificates();
    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Error reading certificates:", error);
    return NextResponse.json({ certificates: [] });
  }
}
