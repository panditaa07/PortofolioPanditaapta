// src/components/ProjectDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  Home,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

/**
 * ProjectDetails.jsx (final, cleaned)
 * - premium look (glass + neon accents)
 * - back button
 * - fixed portfolio breadcrumb navigation (no 404)
 * - black decorative lines beside subtitle (visible)
 * - robust localStorage checks + image fallback
 */

/* Icon mapping */
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

function TechChip({ tech }) {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 text-sm font-medium text-white/90"
    >
      <Icon className="w-4 h-4 text-[#6C63FF]" />
      <span>{tech}</span>
    </motion.span>
  );
}

function FeatureItem({ feature, i }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.36, delay: i * 0.06 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-md"
    >
      <div className="flex gap-3 items-start">
        <div className="mt-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#3B82F6]" />
        <p className="text-sm leading-relaxed text-white/90">{feature}</p>
      </div>
    </motion.li>
  );
}

function ProjectStats({ project }) {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[#6C63FF]/20">
          <Code2 className="w-5 h-5 text-[#6C63FF]" />
        </div>
        <div>
          <div className="text-xl font-semibold text-white/95">{techStackCount}</div>
          <div className="text-xs text-white/60">Total Teknologi</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[#3B82F6]/20">
          <Layers className="w-5 h-5 text-[#3B82F6]" />
        </div>
        <div>
          <div className="text-xl font-semibold text-white/95">{featuresCount}</div>
          <div className="text-xs text-white/60">Fitur Utama</div>
        </div>
      </div>
    </div>
  );
}

const handlePrivateRepo = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // scroll top on mount
    window.scrollTo(0, 0);

    try {
      const raw = localStorage.getItem("projects");
      const stored = raw ? JSON.parse(raw) : [];
      const found = Array.isArray(stored) ? stored.find((p) => String(p.id) === String(id)) : null;

      if (!found) {
        Swal.fire({
          icon: "error",
          title: "Project Not Found",
          text: "The project you are looking for does not exist.",
          background: "#030014",
          color: "#ffffff",
        });
        navigate("/");
        return;
      }

      setProject({
        ...found,
        TechStack: Array.isArray(found.TechStack) ? found.TechStack : found.TechStack ? [found.TechStack] : [],
        Features: Array.isArray(found.Features) ? found.Features : found.Features ? [found.Features] : [],
        Github: found.Github ?? null,
        Link: found.Link ?? null,
        Img: found.Img ?? found.cover ?? "",
        Title: found.Title ?? found.name ?? "Untitled Project",
        Description: found.Description ?? found.description ?? "",
      });
    } catch (err) {
      // Failed reading projects from localStorage
      // fallback: show toast + navigate home
      Swal.fire({
        icon: "error",
        title: "Data Error",
        text: "Terjadi kesalahan membaca data project. Mengarahkan ke beranda.",
        background: "#030014",
        color: "#ffffff",
      });
      navigate("/");
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto border-4 border-t-[#6C63FF] rounded-full animate-spin border-white/10" />
          <p className="mt-4 text-white/90">Loading project...</p>
        </div>
      </div>
    );
  }

  // safe image fallback
  const imgSrc =
    project.Img && typeof project.Img === "string" && project.Img.trim()
      ? project.Img
      : "https://via.placeholder.com/1600x900?text=No+Image"; // fallback; replace with local fallback if preferred

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#030014] text-white relative overflow-hidden"
    >
      {/* decorative blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-[#6C63FF]/30 to-[#3B82F6]/20 opacity-30" />
        <div className="absolute -right-24 top-8 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-[#3B82F6]/30 to-[#6C63FF]/20 opacity-28 hidden sm:block" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Breadcrumb / header area */}
      <div className="pt-8 px-4 md:px-6 max-w-7xl mx-auto relative">
        <nav className="flex items-center gap-3 text-sm text-white/60">
          <button onClick={() => navigate("//")} className="flex items-center gap-2 hover:text-white transition">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-white/40" />
          <span className="text-white/90 truncate max-w-[36ch]">{project.Title}</span>
        </nav>
      </div>

      {/* Floating Back Button - accessible */}
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-4 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/6 border border-white/12 text-white/95 backdrop-blur-md hover:bg-white/8 transition"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </motion.button>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[56vh] md:min-h-[72vh] flex items-center"
      >
        <div className="absolute inset-0">
          <motion.img
            src={imgSrc}
            alt={project.Title}
            className="w-full h-full object-cover"
            onLoad={() => setImgLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/95 via-transparent to-[#030014]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/12 via-transparent to-[#3B82F6]/12" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#6C63FF] to-[#3B82F6]"
          >
            {project.Title}
          </motion.h1>

          {/* black decorative lines besides subtitle */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-black/90" />
            <div className="text-center max-w-3xl">
              <motion.p
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-white/90 leading-relaxed"
              >
                {project.Description}
              </motion.p>
            </div>
            <div className="w-12 h-0.5 bg-black/90" />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {project.Link && (
              <motion.a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6C63FF]/20 to-[#3B82F6]/20 border border-white/12 hover:from-[#6C63FF]/30 hover:to-[#3B82F6]/30 transition shadow-lg"
                aria-label="Live demo"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">Live Demo</span>
              </motion.a>
            )}

            <motion.a
              href={project.Github ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !handlePrivateRepo(project.Github) && e.preventDefault()}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/6 border border-white/12 hover:bg-white/8 transition shadow-md"
              aria-label="Repository"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Repository</span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-[#6C63FF]" />
                <h3 className="text-xl font-semibold text-white/90">Project Overview</h3>
              </div>

              <p className="text-sm text-white/85 leading-relaxed mb-6">{project.Description}</p>

              <ProjectStats project={project} />
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-[#6C63FF]" />
                <h3 className="text-xl font-semibold text-white/90">Technologies Used</h3>
              </div>

              {project.TechStack && project.TechStack.length ? (
                <div className="flex flex-wrap gap-3">
                  {project.TechStack.map((t, i) => (
                    <TechChip key={i} tech={t} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60">No technologies listed.</p>
              )}
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md"
            >
              <h4 className="text-lg font-semibold text-white/90 mb-4">Project Links</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                {project.Link && (
                  <motion.a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF]/15 to-[#3B82F6]/15 border border-white/12"
                  >
                    <ExternalLink className="w-4 h-4" /> <span>View Live Demo</span>
                  </motion.a>
                )}

                <motion.a
                  href={project.Github ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !handlePrivateRepo(project.Github) && e.preventDefault()}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/6 border border-white/12"
                >
                  <Github className="w-4 h-4" /> <span>View Source Code</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white/90">Key Features</h4>
                <div className="text-sm text-white/60">{project.Features?.length || 0} items</div>
              </div>

              {project.Features && project.Features.length ? (
                <ul className="flex flex-col gap-3">
                  {project.Features.map((f, idx) => (
                    <FeatureItem key={idx} feature={f} i={idx} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/60">No features added.</p>
              )}
            </motion.div>
          </aside>
        </div>
      </main>

      {/* responsive tweak */}
      <style>{`
        @media (max-width: 640px) {
          h1 { font-size: 1.8rem; }
        }
      `}</style>
    </motion.div>
  );
}
