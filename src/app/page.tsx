'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-black dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed w-full top-0 z-50 rounded-b-2xl">
        <h1 className="text-1xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide">AldrinFabieyo</h1>
        <ul className="hidden md:flex gap-8 font-medium">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 ml-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          <a
            href="/login"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4" id="hero">
        {/* Live Image Background */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
        />
        {/* Overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {/* Konten Hero */}
        <div className="relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            Hi, I’m <span className="text-indigo-600 dark:text-indigo-400">Fabio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl text-gray-100 mb-10"
          >
            A passionate Front-End Developer who loves building beautiful and user-friendly web applications. I'm actually a backend developer but I love front-end and try to learn some front end and here we are.
          </motion.p>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            View My Work
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors" id="about">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">About Me</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            I’m a backend developer and Front-End Developer with experience in React, TailwindCSS, databases and modern web technologies.
            I enjoy turning complex problems into simple, beautiful, and intuitive designs.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors" id="skills">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              'HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS', 'Git',
              'TypeScript', 'Next.js', 'Laravel', 'PHP', 'MySQL', 'manage databases'
            ].map(skill => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <p className="font-semibold text-gray-800 dark:text-gray-200">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors" id="projects">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400">Projects</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(p => (
              <motion.div
                key={p}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition"
              >
                <div className="h-44 bg-gradient-to-r from-indigo-400 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800"></div>
                <div className="p-6">
                  <h4 className="font-bold mb-2">Project {p}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Short description of the project goes here.</p>
                  <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">View Details</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 transition-colors" id="contact">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Get in Touch</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Feel free to reach out for collaborations or just a friendly hello 👋
          </p>
          <motion.a
            href="mailto:aldrin.leimena123@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Say Hello
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border-t dark:border-gray-700 transition-colors">
        © {new Date().getFullYear()} Aldrin Fabieyo Leimena. All rights reserved.
      </footer>
    </div>
  );
}