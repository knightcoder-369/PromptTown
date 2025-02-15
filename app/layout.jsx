// import Nav from '@components/Nav';
import '@styles/globals.css';
import {dark} from '@clerk/themes';
// import Provider from "./Provider";

import Nav from '@components/Nav';
import { ClerkLoaded, ClerkLoading} from '@clerk/nextjs';
import { ClerkProvider } from '@clerk/nextjs';
export const metadata={
  title:'PromptTown',
  description:'discover & share AI prompts',
}

const RootLayout = ( {children} ) => {
  return(
    <ClerkProvider appearance={{baseTheme: dark}}>
     <html lang='en'>
      <body>
       
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
              <Nav/>
            <ClerkLoading>
              <div className='flex items-center justify-center h-screen text-2xl'>
                loading...
              </div>
              
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
            
       
       </main>
    
      </body>
     </html>
     </ClerkProvider>
  )
}

export default RootLayout;
