'use client';
import { useState, useEffect } from "react"; 
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  if (!Array.isArray(data)) {
    console.error("Expected an array but received:", data);
    return null;  
  }
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}   
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt'); 
        const data = await response.json();
        if(Array.isArray(data)){
          setPosts(data);
        }
        else{
          console.log("expected an array but recieved",data);
        }
          
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

