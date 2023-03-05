export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://shopfully-technical-interview.vercel.app/api"
    : "http://localhost:3000/api";
