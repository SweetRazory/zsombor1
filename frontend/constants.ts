export const apiURL =
  typeof process !== "undefined" && process.env.VITE_API_URL
    ? process.env.VITE_API_URL
    : "http://localhost:3000";
