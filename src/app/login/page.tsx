'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

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
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      router.push("/dashboard");
    } else {
      setError(data.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors relative">
      {/* Tombol kembali di pojok kiri bawah */}
      <a
        href="/"
        className="fixed bottom-6 left-6 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition z-50"
      >
        ← Back to Portfolio
      </a>
      {/* Tombol mode di pojok kanan atas */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition shadow"
          title="Toggle Dark Mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
      {/* Card Login */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col items-center mb-8">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4 shadow">
            <LogIn className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </span>
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-center">Sign In</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center text-base">
            Welcome back! Please login to access your dashboard.
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Your password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}