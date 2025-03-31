import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Request:', request);
  return Response.json({ message: 'Hello, world!' });
}
