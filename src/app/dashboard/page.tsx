'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Image as ImageIcon, Type, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

    useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed top-0 z-50 rounded-b-2xl">
        <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide">Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-32 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Welcome to Your Portfolio Dashboard</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Edit and customize your portfolio easily. Choose a section below to start editing!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Edit Background */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-md p-8 flex flex-col items-center transition"
          >
            <ImageIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-xl mb-2">Edit Background</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Change your portfolio background image or video to match your style.
            </p>
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition">
              Edit Background
            </button>
          </motion.div>

          {/* Card: Edit Hero Text */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-md p-8 flex flex-col items-center transition"
          >
            <Type className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-xl mb-2">Edit Hero Text</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Update your main introduction, tagline, or hero section description.
            </p>
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition">
              Edit Hero Text
            </button>
          </motion.div>

          {/* Card: Edit Skills */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-md p-8 flex flex-col items-center transition"
          >
            <Pencil className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-xl mb-2">Edit Skills</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Add, remove, or update your skills to showcase your expertise.
            </p>
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition">
              Edit Skills
            </button>
          </motion.div>

          {/* Card: Add New Section */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-md p-8 flex flex-col items-center transition"
          >
            <PlusCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-xl mb-2">Add New Section</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Add a new section to your portfolio, such as Projects or Testimonials.
            </p>
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition">
              Add Section
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}