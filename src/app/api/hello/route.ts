import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        message: 'Hello from the dynamic API!',
        timestamp: new Date().toISOString(),
        random: Math.random(),
    });
}
