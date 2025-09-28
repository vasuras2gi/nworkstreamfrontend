import React from "react";
import Feed from "../components/Feed";
import CreatePost from "../components/CreatePost";

const Post = () => {
  return (
    <div className="flex gap-6 p-4 sm:p-6 lg:p-8">
      
      {/* Left: Scrollable Feed */}
      {/* 1. flex-1 max-w-full: Allows the feed to take up all available space.
         2. mx-auto: Centers the content in the middle of the available container.
         3. lg:max-w-xl lg:mx-0: Overrides the centering on large screens to make room for the fixed CreatePost. */}
      <div className="flex-1 max-w-full mx-auto lg:mx-0 lg:max-w-xl pr-2">
        <Feed />
      </div>

      {/* Right: Fixed Create Post (hidden on small screens, fixed on large screens) */}
      <div className="w-80 hidden lg:block fixed top-20 right-8 h-fit">
        <CreatePost />
      </div>
    </div>
  );
};

export default Post;