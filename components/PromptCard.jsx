'use client'
import { useState } from "react";
import Image from "next/image";
// import { create } from "@models/user.model";

// Define a list of static prompts
const staticPrompts = [
  {
    id: 1,
    prompt: "Describe the process of integrating a third-party API into a React application and explain the code involved.",
    tag: "webdev",
    creator: {
      image: '/public/assets/images/user1.jpg',
      username: 'User 1',
      email: 'user1@gmail.com'
    }
  },
  {
    id: 2,
    prompt: "I am a Web Developer learning [ language/framework ]. Suggest learning resources such as tutorials, documentation, and online courses for mastering a particular [ language/framework ].",
    tag: "skills",
    creator: {
      image: '/public/assets/user1.jpg',
      username: 'eunwoo',
      email: 'eunwoo_cgmail.com'
    }
  },
  {
    id:3,
    prompt:"Write an engaging X-word summary suitable for [specify which kind of promotional material], providing a snapshot of the most intriguing aspects of our upcoming book release, fostering reader anticipation. [provide some information about the book]",
    tag:"summary",
    creator:{
      image:"/public/assets/images/useer1.jpg",
      username:"yi chan",
      email:"hanyichan#@gmail.com"
    }
  },
  // Add more prompts as needed
];

const PromptCard = ({ post = {}, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  const [imageError, setImageError] = useState(false)

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 4000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image || '/default-image.jpg'}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="flex-satoshi font-semibold text-gray-900">
              {post.creator?.username || 'Unknown User'}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {post.creator?.email || 'No email provided'}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt="copy icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt || 'No prompt available'}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag || 'notag'}
      </p>
    </div>
  );
};

const StaticPromptsPage = () => {
  const handleTagClick = (tag) => {
    console.log(`Tag clicked: ${tag}`);
    // You can add more logic here, like filtering prompts by tag
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Prompts</h1>
      <div className="prompts_layout">
        {staticPrompts.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};

export default StaticPromptsPage;
