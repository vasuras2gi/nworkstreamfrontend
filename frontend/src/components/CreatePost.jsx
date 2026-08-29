import React, {useRef, useState } from "react";
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
      await axiosInstance.post("/post/create", formData, {
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
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <div className="bg-base-200 text-base-content p-6 rounded-2xl shadow-xl border border-base-content/15">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 rounded-xl bg-base-100 text-base-content border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
            placeholder="What's on your mind?"
            value={text}
            ref={textInputRef}
            onChange={(e) => setText(e.target.value)}
          />
          
          <input 
            ref={fileInputRef} 
            type="file" 
            className="file-input file-input-bordered file-input-primary w-full bg-base-100 text-base-content"
            onChange={(e) => setFile(e.target.files[0])} 
          />

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl text-white font-semibold cursor-pointer"
          > 
            Upload Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;



// import React, { useRef, useState } from "react";
// import { axiosInstance } from "../lib/axios";

// const CreatePost = () => {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);

//   const fileInputRef = useRef(null); 
//   const textInputRef = useRef(null); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("text", text);
//     if (file) formData.append("file", file);

//     try {
//       await axiosInstance.post("/post/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post created successfully!");
//       setText("");
//       setFile(null);

//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""; 
//       }

//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <>
//       <div className="w-50 hidden lg:block fixed justify-center align-middle h-fit">
//         <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-3">Create Post</h2>
//           <form onSubmit={handleSubmit}>
//             <textarea
//               className="w-full p-2 rounded bg-gray-700 text-white mb-2"
//               placeholder="What's on your mind?"
//               value={text}
//               ref={textInputRef}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <input ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files[0])} />

//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 text-white px-4 mt-4 py-2 rounded-lg w-full"
//             > Upload
//             </button>
//           </form>
//         </div>
//       </div>
//     </>

//   );
// };

// export default CreatePost;
