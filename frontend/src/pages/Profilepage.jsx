import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../lib/axios";
// IMPORTANT: Import your auth hook so we know if the logged-in user is viewing their OWN profile
import useAuthUser from "../hooks/useAuthUser"; 

const ProfilePage = () => {
  const { id } = useParams();
  const { authUser } = useAuthUser(); // Get current logged in user
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // --- Edit Mode States ---
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editJobRole, setEditJobRole] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const friendsCount = user?.friends?.length || 0;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}`);
        setUser(res.data);
        // Initialize edit states with existing data
        setEditBio(res.data.bio || "");
        setEditJobRole(res.data.learningLanguage || "");
        setEditAvatar(res.data.profilePic || "");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const ress = await axiosInstance.get(`/post/user/${id}`);
        setPosts(ress.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUser();
    fetchPosts();
  }, [id]);

  // ✅ DiceBear Avatar Generator
  const generateRandomAvatar = () => {
    // Generate a random string for the seed
    const randomSeed = Math.random().toString(36).substring(7);
    // Use the exact Lorelei style API from your screenshot
    const newAvatarUrl = `https://api.dicebear.com/10.x/lorelei/svg?seed=${randomSeed}`;
    setEditAvatar(newAvatarUrl);
  };

  // ✅ Save Profile Handler
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // NOTE: You must have a PUT route in your backend to handle this!
      // Example: router.put("/update", protectRoute, updateUserProfile);
      await axiosInstance.put(`/users/update`, {
        bio: editBio,
        learningLanguage: editJobRole,
        profilePic: editAvatar,
      });

      // Update local UI state immediately
      setUser((prev) => ({
        ...prev,
        bio: editBio,
        learningLanguage: editJobRole,
        profilePic: editAvatar,
      }));
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-400">Loading profile...</p>
      </div>
    );
  }

  // Check if the current profile belongs to the logged-in user
  const isOwnProfile = 
    authUser?._id === user?._id || 
    authUser?.id === user?._id || 
    authUser?._id === user?.id;

    // Debugging ke liye in dono ko console me print karke dekho
  console.log("Logged In User ID:", authUser?._id || authUser?.id);
  console.log("Profile Page User ID:", user?._id || user?.id);
  console.log("Is Own Profile?:", isOwnProfile);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      
      {/* Profile Card */}
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 max-w-md w-full border border-gray-700 relative">
        
        {/* Edit Button (Only visible if it's your own profile) */}
        {isOwnProfile && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-white transition"
          >
            Edit Profile
          </button>
        )}

        <div className="flex flex-col items-center">
          {/* Avatar Section */}
          <div className="relative">
            <img
              src={isEditing ? editAvatar : (user.profilePic || `https://api.dicebear.com/10.x/lorelei/svg?seed=${user.fullName}`)}
              alt="profile"
              className="w-28 h-28 rounded-full shadow-md border-2 border-gray-500 object-cover bg-white"
            />
            {isEditing && (
              <button 
                onClick={generateRandomAvatar}
                className="mt-3 text-xs bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-full text-white transition w-full"
              >
                🎲 Roll Avatar
              </button>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white">
            {user?.fullName || "Guest User"}
          </h1>
          <p className="text-gray-400 text-sm">{user.email || "No email available"}</p>

          {/* Conditional Rendering: Edit Mode vs View Mode */}
          {isEditing ? (
            <div className="w-full mt-4 space-y-3">
              <div>
                <label className="text-xs text-gray-400">Job Role / Status</label>
                <input 
                  type="text" 
                  value={editJobRole} 
                  onChange={(e) => setEditJobRole(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 text-sm"
                  placeholder="e.g. Full Stack Developer"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Bio</label>
                <textarea 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 text-sm"
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Normal View Mode */}
              <p className="mt-3 text-center text-blue-400 font-medium">
                {user.learningLanguage || "No job role added"}
              </p>
              <p className="mt-2 text-center text-gray-300">
                {user.bio || "This user hasn’t added a bio yet."}
              </p>
            </>
          )}

          {/* Stats */}
          <div className="flex justify-evenly w-full mt-6 border-t border-gray-700 pt-4 text-white">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">{posts.length || 0}</span>
              <span className="text-sm text-gray-400">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">{friendsCount}</span>
              <span className="text-sm text-gray-400">Friends</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Posts Grid */}
      <div className="mt-10 max-w-4xl w-full">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => {
              // Since you fixed the backend to send URLs, this is much simpler now!
              const mediaSrc = post.media;

              return (
                <div key={post._id} className="relative group cursor-pointer">
                  {mediaSrc ? (
                    <img
                      src={mediaSrc}
                      alt="post"
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-40 bg-gray-800 text-gray-400 rounded-md p-2 text-center text-sm">
                      {post.text.substring(0, 50)}...
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition rounded-md">
                    ❤️ {post.likes?.length || 0}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;