export const GET = async (request) => {
    try {
      let { data: prompts, error } = await supabase
        .from("prompts")
        .select("*, creator(*)");  
  
      if (error) throw error;
  
       
      return new Response(JSON.stringify(prompts || []), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify([]), { status: 500 });
    }
  };
  
