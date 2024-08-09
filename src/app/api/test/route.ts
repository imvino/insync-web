// src/app/api/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Hello from Next.js!' });
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({ message: 'Received POST request', data: body });
}

// Add other HTTP methods as needed (PUT, DELETE, etc.)