import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // Import the helper
import { useUser } from '@clerk/nextjs'; // Import useUser
import { useAuth } from '@clerk/nextjs'; // Import useAuth for getToken
import Link  from 'next/link';

const Form = ({ type, post, setPost, submitting }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    // Initialize the Supabase client
    const supabase = createClientComponentClient();

    // Get the JWT token from Clerk
    const token = await getToken({ template: 'supabase' });

    // Set the Supabase auth session with the token
    const { data: authData, error: authError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: '', // Optional: Add a refresh token if needed
    });

    if (authError) {
      console.error('Error setting auth session:', authError);
      return;
    }

    // Insert data into the `prompts` table
    const { data, error } = await supabase
      .from('prompts') // Use the correct table name
      .insert([{ ...post, user_id: user.id }]);

    if (error) {
      console.error('Error submitting form:', error);
    } else {
      console.log('Form submitted successfully:', data);
    }
 };


return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            title="Please enter your AI prompt"
            className='form_textarea'
            onInvalid={(e) => e.target.setCustomValidity('Please enter your AI prompt')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            title="Please enter at least one tag"
            className='form_input'
            onInvalid={(e) => e.target.setCustomValidity('Please enter at least one tag')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
