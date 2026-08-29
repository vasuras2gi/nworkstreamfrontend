import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // 1. Standard Built-in Themes
      "light",
      "dark",
      "cyberpunk",
      "dracula",
      "luxury",
      "synthwave",
      "forest",
      "aqua",
      "nord",
      
      // 2. Custom Premium Themes (Har theme ka alag object hona zaroori hai)
      {
        midnight: {
          "base-100": "#0f172a",    
          "primary": "#6366f1",     
          "secondary": "#06b6d4",   
          "base-content": "#f8fafc",
          "neutral": "#1e293b",     
        },
      },
      {
        executive: {
          "base-100": "#ffffff",    
          "primary": "#0f172a",     
          "secondary": "#cbd5e1",   
          "base-content": "#1e293b",
          "neutral": "#f1f5f9",     
        },
      },
      {
        velvet: {
          "base-100": "#171114",    
          "primary": "#be123c",     
          "secondary": "#f59e0b",   
          "base-content": "#fff1f2",
          "neutral": "#2a151b",     
        },
      },
      {
        matrix: {
          "base-100": "#000000",    
          "primary": "#10b981",     
          "secondary": "#059669",   
          "base-content": "#e2e8f0",
          "neutral": "#111827",     
        },
      },
      {
        hacker: {
          "base-100": "#0d1117",    
          "primary": "#58a6ff",     
          "secondary": "#8b949e",   
          "base-content": "#c9d1d9",
          "neutral": "#21262d",     
        },
      },
    ],
  },
};