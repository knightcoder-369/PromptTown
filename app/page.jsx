'use client'

import Feed from "@components/Feed"
import { ClerkProvider, useAuth } from "@clerk/nextjs" // Changed to useAuth
import PromptCard from "@components/PromptCard"

const Home = () => {
  const { getToken } = useAuth(); // Changed from useSession to useAuth

  const handleToken = async () => {
    try {
      const token = await getToken(); // Using getToken directly from useAuth
      console.log('JWT Token:', token);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  return (
    <ClerkProvider>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & share
          <br />
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          prompttown is an open source AI prompting tool
          for modern world to discover, create and share creative prompts
        </p>
        <div>
          <button onClick={handleToken}>Get Token</button>
        </div>
        
        <Feed />
        <PromptCard />
      </section>
    </ClerkProvider>
  )
}

export default Home

