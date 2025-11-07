import axios from "axios";

export const fpshApi = axios.create({
  baseURL: process.env.VITE_FPSH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});