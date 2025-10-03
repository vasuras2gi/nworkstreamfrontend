import React, { useState, useEffect, useCallback } from "react";
import { fetchPosts } from "../lib/api";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import useToggleLike from "../hooks/useLike";
import * as jwtDecode from "jwt-decode";
import { Link } from "react-router-dom"; // ⚠️ IMPORTANT: Changed to 'react-router-dom' for <Link>

// --- CONSTANT ---
const POSTS_PER_LOAD = 10; 
// ----------------

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { toggleLikeMutation } = useToggleLike();
  const [commentText, setCommentText] = useState({}); // Keep this if needed elsewhere

  // NEW STATE for Pagination/Loading
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState(null); // The _id of the last post fetched

  // Get userId from JWT stored in localStorage
  let userid = null;
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // @ts-ignore
      const decoded = jwtDecode.default(token);
      userid = decoded.userId;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // --- NEW: Function to load posts using the cursor ---
  const loadPosts = useCallback(async () => {
    // 🛑 SCALABILITY CHECK: Prevent multiple concurrent requests or fetching when done
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      // 1. Fetch posts using the cursor
      // NOTE: Your 'fetchPosts' API utility must be updated to accept (cursor, limit)
      const { posts: newPosts, nextCursor: newCursor, hasMore: moreAvailable } = await fetchPosts(nextCursor, POSTS_PER_LOAD);
      
      // 2. Append new posts to the feed
      setPosts((prev) => [...prev, ...newPosts]);
      
      // 3. Update pagination state
      setNextCursor(newCursor);
      setHasMore(moreAvailable);
      
    } catch (error) {
      console.error("Error loading posts:", error);
      // If error, stop trying to fetch more
      setHasMore(false); 
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, nextCursor]); // Dependencies ensure fresh state is used

  // Initial load (runs once on component mount)
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // --- NEW: Infinite Scroll Event Handler ---
  const handleScroll = useCallback(() => {
    // Check if the user is near the bottom (e.g., within 200px)
    const isNearBottom = 
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 200;

    if (isNearBottom && !isLoading && hasMore) {
      loadPosts();
    }
  }, [isLoading, hasMore, loadPosts]);

  // Attach and clean up scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); // Dependency on handleScroll (which itself depends on loadPosts)
  

  // Optimistic like update (Remains the same)
  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes?.includes(userid)
                ? post.likes.filter((id) => id !== userid)
                : [...(post.likes || []), userid],
            }
          : post
      )
    );
    toggleLikeMutation(postId);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-900 text-white p-4 rounded-2xl shadow-md border border-gray-700"
          >
            {/* ... (Existing User Info, Post Content, and Actions remain the same) ... */}
            
            {/* User Info */}
            <Link to={`/profile/${post.user?._id}`}>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={post.user?.profilePic || "https://via.placeholder.com/40"}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {post.user?.fullName || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-400">{post.user?.email}</p>
                </div>
              </div>
            </Link>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-base">{post.text}</p>

              {post.media && (
                <div className="mt-3">
                  {/* if media is base64 from backend */}
                  {post.media.data && post.media.contentType ? (
                    <img
                      className="rounded-xl max-h-72 object-cover w-full"
                      src={`data:${post.media.contentType};base64,${post.media.data}`}
                      alt="post media"
                    />
                  ) : (
                    // if media is a URL
                    <img
                      className="rounded-xl max-h-72 object-cover w-full"
                      src={post.media}
                      alt="post media"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between text-gray-400 text-sm mt-2">
              <button
                onClick={() => handleLike(post._id)}
                className={`flex items-center space-x-1 ${
                  post.likes?.includes(userid)
                    ? "text-pink-500"
                    : "hover:text-pink-500"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>{post.likes?.length || 0} Likes</span>
              </button>
            </div>
          </div>
        ))
      ) : !isLoading ? (
        <p className="text-center text-gray-400">No posts yet</p>
      ) : null}
      
      {/* 🛑 Loading and End Indicators */}
      {isLoading && <p className="text-center text-blue-400 p-4">Loading more posts...</p>}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 p-4">You've reached the end of the feed.</p>
      )}
    </div>
  );
};

export default Feed;