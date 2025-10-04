import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://nworkstreamfrontend.vercel.app/api/users/search?q=${searchQuery}`,
        { baseURL: BASE_URL,
          withCredentials: true } // include cookie for auth
      );

      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSearchResults(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div style={{height:"auto", width: "300px", margin: "20px auto" }}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
      />

      {loading && <p style={{ marginTop: "10px" }}>Searching...</p>}

      {results.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: "10px 0 0",
            padding: "0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxHeight: "200px",
            overflowY: "auto",
            background: "#fff",
          }}
        >
          {results.map((user) => (
            <li
              key={user._id}
              style={{ padding: "10px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => window.location.assign(`/profile/${user._id}`)}
            >
              <img
                src={user.profilePic || "https://via.placeholder.com/40"}
                alt={user.fullName}
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
              />
              <div>
                <strong>{user.fullName}</strong>
                <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && <p style={{ marginTop: "10px", color: "#888" }}>No users found</p>}
    </div>
  );
};

export default UserSearchBar;
