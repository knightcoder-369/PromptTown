"use client";
import {  useAuth } from "@clerk/nextjs";  
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
// import {dark} from '@clerk/nextjs';

const Nav = () => {
  const { userId } = useAuth();

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="our logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptTown</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          {!userId ? (
            <div className="black_btn">
               <SignedOut>
                <SignInButton />
               </SignedOut>
            </div>
           
          ) : (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
        </div>
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex">
        {/* Add mobile navigation items here */}
      </div>
    </nav>
  );
};

export default Nav;

