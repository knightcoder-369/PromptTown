// app/api/prompt/new/route.js
import { getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
    try {
        const { userId, prompt, tag } = await req.json();
        
        // Get the auth session
        const { userId: clerkUserId } = getAuth(req);
        
        if (!clerkUserId || clerkUserId !== userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { 
                status: 401 
            });
        }

        if (!prompt || !tag) {
            return new Response(JSON.stringify({ error: "Prompt and tag are required" }), { 
                status: 400 
            });
        }

        // Initialize Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials are not properly configured');
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Insert the prompt into Supabase
        const { data, error } = await supabase
            .from('prompts')
            .insert([
                {
                    user_id: userId,
                    prompt,
                    tag,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return new Response(JSON.stringify({ error: error.message }), { 
                status: 500 
            });
        }

        return new Response(JSON.stringify(data[0]), { 
            status: 201 
        });
    } catch (error) {
        console.error('Error creating prompt:', error);
        return new Response(JSON.stringify({ error: error.message || "Failed to create prompt" }), { 
            status: 500 
        });
    }
}