import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function middleware(req) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.next();
    }

    // Add some debug logging
    console.log('Syncing user:', userId);

    // Fetch Clerk user data
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Clerk user data');
      return NextResponse.next();
    }

    const user = await response.json();

    // Sync user with Supabase
    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: user.email_addresses[0].email_address,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error syncing user to Supabase:', error);
    } else {
      console.log('Successfully synced user to Supabase');
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
