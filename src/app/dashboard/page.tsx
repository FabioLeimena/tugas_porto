'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Image as ImageIcon, Type, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    if (!token) {
      router.replace("/login");
    }
    setEmail(userEmail);
  }, [router]);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-5 shadow-lg bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide">Dashboard</span>
          {email && (
            <span className="mt-1 px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold w-fit">
              {email}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition shadow"
            title="Toggle Dark Mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
            Welcome to Your Portfolio Dashboard
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Edit and customize your portfolio easily.<br className="hidden md:block" />
            Choose a section below to start editing!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card: Edit Background */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
            className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-xl rounded-3xl shadow-xl p-10 flex flex-col items-center transition"
          >
            <ImageIcon className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mb-6" />
            <h3 className="font-bold text-2xl mb-3">Edit Background</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Change your portfolio background image or video to match your style.
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow hover:scale-105 transition">
              Edit Background
            </button>
          </motion.div>

          {/* Card: Edit Hero Text */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
            className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-xl rounded-3xl shadow-xl p-10 flex flex-col items-center transition"
          >
            <Type className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mb-6" />
            <h3 className="font-bold text-2xl mb-3">Edit Hero Text</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Update your main introduction, tagline, or hero section description.
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow hover:scale-105 transition">
              Edit Hero Text
            </button>
          </motion.div>

          {/* Card: Edit Skills */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
            className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-xl rounded-3xl shadow-xl p-10 flex flex-col items-center transition"
          >
            <Pencil className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mb-6" />
            <h3 className="font-bold text-2xl mb-3">Edit Skills</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Add, remove, or update your skills to showcase your expertise.
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow hover:scale-105 transition">
              Edit Skills
            </button>
          </motion.div>

          {/* Card: Add New Section */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
            className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-xl rounded-3xl shadow-xl p-10 flex flex-col items-center transition"
          >
            <PlusCircle className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mb-6" />
            <h3 className="font-bold text-2xl mb-3">Add New Section</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Add a new section to your portfolio, such as Projects or Testimonials.
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow hover:scale-105 transition">
              Add Section
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}