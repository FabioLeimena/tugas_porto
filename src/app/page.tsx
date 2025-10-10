'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Mail, Instagram, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


/* --- types --- */
type Home = {
  id?: number;
  name?: string;
  description?: string;
  profile_image?: string;
};
type About = { id?: number; about_text?: string; };
type Skill = { id: number; skill_name: string; };
type Project = { id: number; project_image?: string; title?: string; description?: string; };
type Contacts = { id?: number; whatsapp?: string; instagram?: string; email?: string; };

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  const [home, setHome] = useState<Home | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contacts | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

useEffect(() => {
  async function fetchAll() {
    try {
      const [homeRes, aboutRes, skillsRes, projectsRes, contactsRes] = await Promise.all([
        fetch("/api/home"),
        fetch("/api/about"),
        fetch("/api/skills"),
        fetch("/api/projects"),
        fetch("/api/contacts"),
      ]);

      if (homeRes.ok) setHome(await homeRes.json());
      if (aboutRes.ok) setAbout(await aboutRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json() || []);
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        console.log("Projects fetched:", data);
        setProjects(data || []);
      }
      if (contactsRes.ok) {
        const data = await contactsRes.json();
        console.log("Contacts fetched:", data);
        setContacts(data);
      }
    } catch (err) {
      console.error("fetchAll error:", err);
    }
  }
  fetchAll();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors">
    {/* Navbar */}
 <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    <a href="/" className="flex items-center gap-2">
      <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide">
        {home?.name ?? "Aldrin"}
      </span>
      <span className="hidden md:inline-block px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 ml-2">
        Portfolio
      </span>
    </a>

    {/* Menu navigasi */}
    <ul className="hidden md:flex gap-8 font-medium">
      {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase()}`}
            className="relative px-2 py-1 transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>

    {/* Dark Mode + Login */}
    <div className="flex items-center gap-2">
      {/* Dark Mode Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition shadow"
        title="Toggle Dark Mode"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-800" />
        )}
      </button>

      {/* Login Button */}
      <a
        href="/login"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
      >
        Login
      </a>
    </div>
  </div>
</nav>


    {/* Hero */}
<section className="relative h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-20 gap-10" id="home">
  {/* Background tetap */}
  <img
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
  />
  <div className="absolute inset-0 bg-black/40 z-10"></div>

  <div className="relative z-20 text-left max-w-xl">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl font-extrabold mb-4"
    >
      <span className="text-indigo-500">{home?.name ?? "Fabio"}</span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="text-lg md:text-xl text-gray-200 mb-6"
    >
      {home?.description ?? "A passionate developer..."}
    </motion.p>
    <motion.a
      href="#projects"
      whileHover={{ scale: 1.05 }}
      className="inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white shadow-lg"
    >
      View My Work
    </motion.a>
  </div>

  {/* Foto profile bisa berubah */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="relative z-20"
  >
    <img
      src={home?.profile_image ?? "https://avatars.githubusercontent.com/u/9919"}
      alt="Profile"
      className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-indigo-600"
    />
  </motion.div>
</section>

      {/* About */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors" id="about">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">About Me</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{about?.about_text ?? "About text..."}</p>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 ..." id="skills">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {skills.length > 0 ? skills.map(s => (
              <motion.div key={s.id} whileHover={{ scale: 1.05 }} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{s.skill_name}</p>
              </motion.div>
            )) : <p className="col-span-full text-gray-500">No skills yet.</p>}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 ...">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400">Projects</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map(p => (
              <motion.div key={p.id} whileHover={{ scale: 1.03 }} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition">
                <img src={p.project_image ?? "/placeholder.png"} alt={p.title} className="w-full h-44 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold mb-2">{p.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{p.description}</p>
                </div>
              </motion.div>
            )) : <p className="col-span-full text-gray-500">No projects yet.</p>}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contact" className="py-20 ...">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">Contact</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {contacts?.whatsapp && (
  <motion.a
    href={`https://wa.me/${contacts.whatsapp}`}
    className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
  >
    <FaWhatsapp className="mx-auto mb-3 text-green-500 text-3xl" />
    <h4 className="font-semibold">WhatsApp</h4>
    <p>{contacts.whatsapp}</p>
  </motion.a>
)}
            {contacts?.email && <motion.a href={`mailto:${contacts.email}`} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"><Mail className="mx-auto mb-3"/> <h4 className="font-semibold">Email</h4> <p>{contacts.email}</p></motion.a>}
            {contacts?.instagram && <motion.a href={`https://instagram.com/${contacts.instagram}`} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"><Instagram className="mx-auto mb-3"/> <h4 className="font-semibold">Instagram</h4> <p>@{contacts.instagram}</p></motion.a>}
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border-t dark:border-gray-700 transition-colors">© {new Date().getFullYear()} {home?.name ?? "Portfolio"}. All rights reserved.</footer>
    </div>
  );
}
