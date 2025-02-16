import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to exchange Clerk JWT for Supabase session
export const exchangeClerkJWTForSupabaseSession = async (clerkToken) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'clerk',
    token: clerkToken,
  });

  if (error) {
    console.error('Error exchanging Clerk JWT for Supabase session:', error);
    return null;
  }

  return data.session;
};

export default supabase;