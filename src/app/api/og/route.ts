import { NextRequest } from 'next/server'
import ogs from 'open-graph-scraper'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  

  if (typeof url !== 'string') {
    return Response.json({ error: 'URL must be a string' }, { status: 400 })
  }

  try {
    const { result } = await ogs({ url })
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch OpenGraph data' }, { status: 500 })
  }
}