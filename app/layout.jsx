import '@styles/globals.css';
import {dark} from '@clerk/themes';
import Nav from '@components/Nav';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'PromptTown',
  description: 'discover & share AI prompts',
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <ClerkProvider appearance={{baseTheme: dark}}>
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
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout;
