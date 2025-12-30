import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json({
        message: 'Hello from the dynamic edge!',
        timestamp: new Date().toISOString(),
        random: Math.random(),
    });
}
