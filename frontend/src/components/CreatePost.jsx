import React, { useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null); 
  const textInputRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      await axiosInstance.post("/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created successfully!");
      setText("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }

    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="w-50 hidden lg:block fixed justify-center align-middle h-fit">
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white mb-2"
              placeholder="What's on your mind?"
              value={text}
              ref={textInputRef}
              onChange={(e) => setText(e.target.value)}
            />
            <input ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 mt-4 py-2 rounded-lg w-full"
            > Upload
            </button>
          </form>
        </div>
      </div>
    </>

  );
};

export default CreatePost;
