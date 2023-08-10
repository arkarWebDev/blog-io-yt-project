import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect((_) => {
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post._id} />
      ))}
    </>
  );
};

export default HomePage;
