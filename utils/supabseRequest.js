import { supabaseClient } from "./supabaseClient";

export const getPrompt = async ({ userId, token }) => {
    try {
        const supabase = await supabaseClient(token);
        const { data: prompt, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", userId);
            
        if (error) throw error;
        return prompt;
    } catch (error) {
        console.error('Error fetching prompt:', error);
        return null;
    }
};