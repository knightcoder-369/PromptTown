'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { getToken, userId } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const token = await getToken({ template: 'supabase' });
            
            if (!token || !userId) {
                throw new Error('Authentication required');
            }

            const response = await fetch('/api/prompt/new', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId,
                    tag: post.tag
                })
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Failed to create prompt');
            }

            router.push('/');
            router.refresh();  
        }
        catch(error) {
            console.error('Error creating prompt:', error);
            setError(error.message);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Form 
                type="Create" 
                post={post} 
                setPost={setPost}
                submitting={submitting} 
                handleSubmit={createPrompt}
            />
        </div>
    )
}

export default CreatePrompt