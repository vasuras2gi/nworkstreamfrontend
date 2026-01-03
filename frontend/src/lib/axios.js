import axios from "axios";

// const BASE_URL = import.meta.env.MODE === "development" ? "https://nworkstreambackend.onrender.com/api" : "https://nworkstreambackend.onrender.com/api";
const BASE_URL = "https://nworkstreambackend.onrender.com/api";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
