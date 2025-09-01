'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  const form = e.target as HTMLFormElement;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem("token", data.token); // simpan token
    router.push("/dashboard");
  } else {
    setError(data.message || "Login gagal");
  }
};
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-black dark:text-gray-100 transition-colors">
      {/* Tombol kembali di pojok kanan bawah */}
      <a
        href="/"
        className="fixed bottom-6 left-6 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition z-50"
      >
        ← 
      </a>
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8"
      >
        
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Your password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}