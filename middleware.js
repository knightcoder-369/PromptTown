import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

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

  const supabase = createMiddlewareClient({ req, res }, { supabaseUrl, supabaseKey });

  if (auth.userId) {
    await supabase.auth.setAuth({
      token: req.cookies.get('__session')?.value,
      type: 'bearer',
    });
  }

  return res;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};