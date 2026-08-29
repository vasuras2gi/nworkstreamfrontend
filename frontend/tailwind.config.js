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
      // 1. Standard Built-in Themes (Jo string format me direct chalte hain)
      "light",
      "dark",
      "cyberpunk",
      "dracula",
      "luxury",
      "synthwave",
      "forest",
      "aqua",
      "nord",
      
      // 2. Custom Premium Themes (Inhe object banakar colors define karne padte hain)
      {
        midnight: {
          "base-100": "#0f172a",    // Deep slate background
          "primary": "#6366f1",     // Indigo
          "secondary": "#06b6d4",   // Cyan
          "base-content": "#f8fafc",// White text
          "neutral": "#1e293b",     // Card/Section background
        },
        executive: {
          "base-100": "#ffffff",    // Clean white background
          "primary": "#0f172a",     // Navy
          "secondary": "#cbd5e1",   // Soft slate
          "base-content": "#1e293b",// Charcoal text
          "neutral": "#f1f5f9",     // Light gray for cards
        },
        velvet: {
          "base-100": "#171114",    // Dark luxury background
          "primary": "#be123c",     // Rose
          "secondary": "#f59e0b",   // Amber
          "base-content": "#fff1f2",// Soft pink text
          "neutral": "#2a151b",     // Slightly lighter dark card
        },
        matrix: {
          "base-100": "#000000",    // Pure black background
          "primary": "#10b981",     // Neon green
          "secondary": "#059669",   // Emerald
          "base-content": "#e2e8f0",// Light slate text
          "neutral": "#111827",     // Dark gray card
        },
        hacker: {
          "base-100": "#0d1117",    // GitHub dark style background
          "primary": "#58a6ff",     // Blue
          "secondary": "#8b949e",   // Gray
          "base-content": "#c9d1d9",// Text
          "neutral": "#21262d",     // Border/Card color
        },
      },
    ],
  },
};