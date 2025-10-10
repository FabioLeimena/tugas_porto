'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, User as UserIcon, Zap as SkillIcon, Folder as ProjectIcon, Mail as MailIcon,
  ChevronLeft, ChevronRight, Image as ImageIcon, Plus, Trash2
} from "lucide-react";

/* ---------------- Types ---------------- */
type Section = "home" | "about" | "skills" | "projects" | "contact";

type Home = { id?: number; profile_image?: string | null; name?: string; description?: string; };
type About = { id?: number; about_text?: string; };
type Skill = { id: number; skill_name: string; };
type Project = { id: number; project_image?: string | null; title?: string; description?: string; };
type Contacts = { id?: number; whatsapp?: string; instagram?: string; email?: string; };

/* ---------------- Component ---------------- */

export default function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [active, setActive] = useState<Section>("home");
  const [darkMode, setDarkMode] = useState(false);

 /* ---------------- LOGIN PROTECTION ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token"); // ganti sesuai implementasi login-mu
    if (!token) {
      alert("Please login first!");
      window.location.href = "/login"; // redirect ke halaman login
    }
  }, []);

  // HOME
  const [homeName, setHomeName] = useState<string>("");
  const [homeDescription, setHomeDescription] = useState<string>("");
  const [homeImagePreview, setHomeImagePreview] = useState<string | null>(null);
  const homeImageFileRef = useRef<HTMLInputElement | null>(null);

  // ABOUT
  const [aboutText, setAboutText] = useState<string>("");

  // SKILLS
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");

  // PROJECTS
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const projectFileRef = useRef<HTMLInputElement | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);

  // CONTACTS
  const [contactWhatsapp, setContactWhatsapp] = useState<string>("");
  const [contactInstagram, setContactInstagram] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");

  const api = {
    home: "/api/home",
    about: "/api/about",
    skills: "/api/skills",
    projects: "/api/projects",
    contacts: "/api/contacts",
  };

  // helper: parse response that may be { data: xxx } or raw
  async function parseResponse(res: Response) {
    const json = await res.json().catch(() => null);
    return (json && (json.data ?? json)) ?? null;
  }

  /* ---------------- FETCHS ---------------- */
  const fetchHome = async () => {
    try {
      const res = await fetch(api.home);
      if (!res.ok) { setHomeName(""); setHomeDescription(""); setHomeImagePreview(null); return; }
      const payload = await parseResponse(res) as Home | null;
      setHomeName(payload?.name ?? "");
      setHomeDescription(payload?.description ?? "");
      setHomeImagePreview(payload?.profile_image ?? null);
    } catch (err) { console.error("fetchHome", err); }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch(api.about);
      if (!res.ok) { setAboutText(""); return; }
      const payload = await parseResponse(res) as About | null;
      setAboutText(payload?.about_text ?? "");
    } catch (err) { console.error("fetchAbout", err); }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch(api.skills);
      if (!res.ok) { setSkills([]); return; }
      const payload = await parseResponse(res) as Skill[] | null;
      setSkills(payload ?? []);
    } catch (err) { console.error("fetchSkills", err); }
  };

  const fetchProjects = async () => {
  try {
    const res = await fetch(api.projects);
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []); // ✅ aman kalau API error
  } catch (err) {
    console.error("fetchProjects", err);
    setProjects([]);
  }
};


  const fetchContacts = async () => {
  try {
    const res = await fetch(api.contacts);
    if (!res.ok) {
      setContactWhatsapp(""); setContactInstagram(""); setContactEmail("");
      return;
    }
    const payload = await res.json();
    setContactWhatsapp(payload?.whatsapp ?? "");
    setContactInstagram(payload?.instagram ?? "");
    setContactEmail(payload?.email ?? "");
  } catch (err) {
    console.error("fetchContacts", err);
  }
};


  useEffect(() => {
    if (active === "home") fetchHome();
    if (active === "about") fetchAbout();
    if (active === "skills") fetchSkills();
    if (active === "projects") fetchProjects();
    if (active === "contact") fetchContacts();
  }, [active]);

  /* ---------------- ACTIONS ---------------- */
  const saveHome = async () => {
    try {
      const fd = new FormData();
      fd.append("name", homeName);
      fd.append("description", homeDescription);
      if (homeImageFileRef.current?.files?.[0]) fd.append("profile_image", homeImageFileRef.current.files[0]);

      const res = await fetch(api.home, { method: "POST", body: fd });
      const ok = res.ok;
      const json = await res.json().catch(() => ({}));
      if (ok) { alert("Home saved"); fetchHome(); }
      else { alert("Error: " + (json.error ?? json.message ?? "unknown")); }
    } catch (err) { console.error(err); alert("Error saving home"); }
  };

  const saveAbout = async () => {
    try {
      const res = await fetch(api.about, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ about_text: aboutText }) });
      if (res.ok) { alert("About saved"); fetchAbout(); }
      else { const j = await res.json(); alert(j.error || "error"); }
    } catch (err) { console.error(err); alert("Error saving about"); }
  };

  const addSkill = async () => {
    if (!skillInput.trim()) return;
    try {
      const res = await fetch(api.skills, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ skill_name: skillInput }) });
      if (res.ok) { setSkillInput(""); fetchSkills(); }
      else { const j = await res.json(); alert(j.error || "error"); }
    } catch (err) { console.error(err); }
  };

  const deleteSkill = async (id: number) => {
  if (!confirm("Delete this skill?")) return;
  try {
    const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchSkills();
    else { const j = await res.json(); alert(j.error || "error"); }
  } catch (err) {
    console.error(err);
  }
};


  const addProject = async () => {
    if (!projectTitle.trim()) return alert("Title required");
    try {
      const fd = new FormData();
      fd.append("title", projectTitle);
      fd.append("description", projectDesc);
      if (projectFileRef.current?.files?.[0]) fd.append("project_image", projectFileRef.current.files[0]);

      const res = await fetch(api.projects, { method: "POST", body: fd });
      if (res.ok) {
        alert("Project added");
        setProjectTitle(""); setProjectDesc(""); setProjectImagePreview(null); if (projectFileRef.current) projectFileRef.current.value = "";
        fetchProjects();
      } else { const j = await res.json(); alert(j.error || "error"); }
    } catch (err) { console.error(err); alert("Error adding project"); }
  };

 const deleteProject = async (id: number) => {
  if (!confirm("Delete this project?")) return;
  try {
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
    else { const j = await res.json(); alert(j.error || "error"); }
  } catch (err) {
    console.error(err);
  }
};

  const saveContacts = async () => {
  try {
    const res = await fetch(api.contacts, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp: contactWhatsapp, instagram: contactInstagram, email: contactEmail })
    });

    if (res.ok) { alert("Contacts saved"); fetchContacts(); }
    else { const j = await res.json(); alert(j.error || "error"); }
  } catch (err) { console.error(err); alert("Error saving contacts"); }
};


  /* ---------------- Previews ---------------- */
  const onHomeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setHomeImagePreview(null); return; }
    const r = new FileReader();
    r.onload = () => setHomeImagePreview(String(r.result));
    r.readAsDataURL(file);
  };

  const onProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setProjectImagePreview(null); return; }
    const r = new FileReader();
    r.onload = () => setProjectImagePreview(String(r.result));
    r.readAsDataURL(file);
  };
 
  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors">
{/* Sidebar */}
<aside className={`fixed left-6 top-8 bottom-8 z-50 flex flex-col items-stretch ${sidebarExpanded ? "w-64" : "w-20"} backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 gap-4 shadow-xl transition-all`}>
  <button onClick={() => setSidebarExpanded(s => !s)} className="self-end p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/60 dark:hover:bg-gray-800/60 transition shadow" title={sidebarExpanded ? "Collapse" : "Expand"}>
    {sidebarExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>

  <div className="flex items-center gap-3 px-2">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600/20 dark:bg-indigo-500/20">
      <HomeIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
    </div>
    {sidebarExpanded && <div><div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-300">Aldrin</div><div className="text-xs text-gray-500 dark:text-gray-400">Portfolio Editor</div></div>}
  </div>

  <nav className="flex flex-col gap-2 mt-3">
    <NavButton expanded={sidebarExpanded} active={active === "home"} onClick={() => setActive("home")} Icon={HomeIcon} label="Home" />
    <NavButton expanded={sidebarExpanded} active={active === "about"} onClick={() => setActive("about")} Icon={UserIcon} label="About" />
    <NavButton expanded={sidebarExpanded} active={active === "skills"} onClick={() => setActive("skills")} Icon={SkillIcon} label="Skills" />
    <NavButton expanded={sidebarExpanded} active={active === "projects"} onClick={() => setActive("projects")} Icon={ProjectIcon} label="Projects" />
    <NavButton expanded={sidebarExpanded} active={active === "contact"} onClick={() => setActive("contact")} Icon={MailIcon} label="Contact" />
  </nav>

  {/* Logout & user info */}
  <div className="mt-auto px-2 w-full flex flex-col gap-2">
    {sidebarExpanded ? (
      <>
        <div className="text-xs text-gray-500 dark:text-gray-400">Signed in as</div>
        <div className="mt-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold w-full text-center text-sm truncate">guest@example.com</div>
      </>
    ) : null}

    {/* Logout Button */}
    <button
      onClick={() => {
        // contoh logout: hapus token/session & redirect
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
      className="mt-2 w-full px-3 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
    >
      {sidebarExpanded ? "Logout" : "⏻"}
    </button>
  </div>
</aside>

      {/* Main */}
      <main className="flex-1 ml-28 mr-8 p-8 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">Portfolio Editor</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Edit your portfolio content (fast mode)</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDarkMode(d => !d)} className="px-3 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 shadow hover:scale-105 transition">{darkMode ? "🌞" : "🌙"}</button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {/* HOME */}
              {active === "home" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><HomeIcon className="w-5 h-5 text-indigo-600" /> Edit Home</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input value={homeName} onChange={e => setHomeName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                      <label className="block text-sm font-medium mt-4 mb-2">Description</label>
                      <textarea value={homeDescription} onChange={e => setHomeDescription(e.target.value)} placeholder="Short description" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-[120px]" />
                      <div className="mt-6 flex items-center gap-3">
                        <button onClick={saveHome} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow hover:scale-105 transition">Save Changes</button>
                        <button onClick={fetchHome} className="px-4 py-2 rounded-lg border bg-white/50 dark:bg-gray-800/50">Reset</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg bg-gray-100 flex items-center justify-center">
                        {homeImagePreview ? <img src={homeImagePreview} alt="preview" className="w-full h-full object-cover" /> : <div className="text-sm text-gray-500">No image</div>}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input ref={homeImageFileRef} type="file" accept="image/*" onChange={onHomeFileChange} className="hidden" />
                        <button onClick={() => homeImageFileRef.current?.click()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Upload Photo</button>
                      </label>
                    </div>
                  </div>
                </section>
              )}

              {/* ABOUT */}
              {active === "about" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-600" /> Edit About</h2>
                  <label className="block text-sm font-medium mb-2">About Text</label>
                  <textarea value={aboutText} onChange={e => setAboutText(e.target.value)} placeholder="Write about yourself..." className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-[200px]" />
                  <div className="mt-4 flex gap-2">
                    <button onClick={saveAbout} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow">Save About</button>
                    <button onClick={fetchAbout} className="px-4 py-2 rounded-lg border">Reset</button>
                  </div>
                </section>
              )}

              {/* SKILLS */}
              {active === "skills" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><SkillIcon className="w-5 h-5 text-indigo-600" /> Edit Skills</h2>
                  <div className="flex gap-3 mb-4">
                    <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add a skill (e.g. React)" className="flex-1 px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                    <button onClick={addSkill} className="px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {skills.length === 0 ? <div className="text-sm text-gray-500 col-span-full">No skills yet.</div> : skills.map(s => (
                      <div key={s.id} className="flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border dark:border-gray-700">
                        <div className="text-sm font-medium">{s.skill_name}</div>
                        <button onClick={() => deleteSkill(s.id)} className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-800"><Trash2 className="w-4 h-4 text-red-500" /></button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {active === "projects" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ProjectIcon className="w-5 h-5 text-indigo-600" /> Projects</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input value={projectTitle} onChange={e => setProjectTitle(e.target.value)} placeholder="Project title" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                      <label className="block text-sm font-medium mt-4 mb-2">Description</label>
                      <textarea value={projectDesc} onChange={e => setProjectDesc(e.target.value)} placeholder="Project description" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-[120px]" />
                      <div className="mt-4 flex gap-3">
                        <button onClick={addProject} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold">Add Project</button>
                        <button onClick={() => { setProjectTitle(""); setProjectDesc(""); setProjectImagePreview(null); if (projectFileRef.current) projectFileRef.current.value = ""; }} className="px-4 py-2 rounded-lg border">Reset</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full h-40 rounded-lg overflow-hidden border-2 border-indigo-600 shadow bg-gray-100 flex items-center justify-center">
                        {projectImagePreview ? <img src={projectImagePreview} alt="proj preview" className="w-full h-full object-cover" /> : <div className="text-sm text-gray-500">No image</div>}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input ref={projectFileRef} type="file" accept="image/*" onChange={onProjectFileChange} className="hidden" />
                        <button onClick={() => projectFileRef.current?.click()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Upload Image</button>
                      </label>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Current Projects</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {projects.length === 0 ? <div className="text-sm text-gray-500 col-span-full">No projects yet.</div> : projects.map(p => (
                      <div key={p.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border dark:border-gray-700">
                        <div className="w-full h-36 rounded overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                          {p.project_image ? <img src={p.project_image} className="w-full h-full object-cover" alt={p.title} /> : <div className="text-sm text-gray-500">No image</div>}
                        </div>
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-sm text-gray-500 mb-3">{p.description}</div>
                        <div className="flex gap-2">
                          <button onClick={() => deleteProject(p.id)} className="px-3 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CONTACT */}
              {active === "contact" && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MailIcon className="w-5 h-5 text-indigo-600" /> Edit Contact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">WhatsApp</label>
                      <input value={contactWhatsapp} onChange={e => setContactWhatsapp(e.target.value)} placeholder="+628..." className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Instagram</label>
                      <input value={contactInstagram} onChange={e => setContactInstagram(e.target.value)} placeholder="yourusername" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="name@example.com" className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={saveContacts} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold">Save Contacts</button>
                    <button onClick={fetchContacts} className="px-4 py-2 rounded-lg border">Reset</button>
                  </div>
                </section>
              )}
            </motion.div> 
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- NavButton helper ---------------- */
function NavButton({ expanded, active, onClick, Icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${active ? "bg-indigo-600/10 dark:bg-indigo-500/20 ring-1 ring-indigo-500/30" : "hover:bg-white/50 dark:hover:bg-gray-800/50"}`}>
      <div className={`w-10 h-10 rounded-md flex items-center justify-center ${active ? "bg-indigo-600 text-white" : "bg-white/80 dark:bg-gray-800/80"}`}>
        <Icon className={`w-5 h-5 ${active ? "text-white" : "text-indigo-600 dark:text-indigo-300"}`} />
      </div>
      {expanded && <span className="font-medium">{label}</span>}
    </button>
  );
}
