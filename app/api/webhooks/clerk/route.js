import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const payload = await request.json();
    const headersList = headers();
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 }
      );
    }

   
    const wh = new Webhook(WEBHOOK_SECRET);
    
    let evt;
    
 
    try {
      evt = wh.verify(
        JSON.stringify(payload),
        {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }
      );
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json(
        { error: 'Error verifying webhook' },
        { status: 400 }
      );
    }

 
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

 
    const eventType = evt.type;
    
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, ...attributes } = evt.data;
      
 
      const { error } = await supabase
        .from('users')
        .upsert({
          id: id,
          email: email_addresses[0].email_address,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error syncing to Supabase:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
      
      console.log('Successfully synced user to Supabase');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

