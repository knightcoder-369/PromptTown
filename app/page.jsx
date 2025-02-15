import Feed from "@components/Feed"
import { ClerkProvider } from "@clerk/nextjs"

const Home = () => {
  return (
    <ClerkProvider>
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share 
        <br/>
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">prompttown is an open source AI prompting tool
         for modern world to dicover,create and share creative prompts
      </p>
      <Feed/>
    </section>
    </ClerkProvider>
  )
}

export default Home

