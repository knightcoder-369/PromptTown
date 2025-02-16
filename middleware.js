import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export default clerkMiddleware(async (auth, req) => {
  const res = NextResponse.next();

  // Use the injected environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Supabase URL and Anon Key are required! Check your environment variables.',
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    if (auth.userId) {
      const session = req.cookies.get('__session')?.value;
      if (session) {
        supabase.auth.setAuth(session);
      }
    }
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  return res;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};