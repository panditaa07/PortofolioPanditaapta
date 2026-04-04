import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Briefcase, Rocket, Code, Award, Globe, ArrowUpRight } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const SkillCard = ({ icon: Icon, title, description, highlights, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)] border border-white/10 hover:border-accent-purple/30 overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full glass-bg mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-accent-purple group-hover:text-accent-blue transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary mb-3 font-heading group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4 font-body">
          {description}
        </p>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-text-secondary font-body">Key Expertise:</h4>
          <ul className="space-y-1">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center text-xs text-text-muted font-body">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full mr-2 flex-shrink-0"></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-purple/20 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 glass-card rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)] h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center glass-bg transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-text-primary" />
        </div>
        <span
          className="text-4xl font-bold text-text-primary font-heading"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p
          className="text-sm uppercase tracking-wider text-text-secondary mb-2 font-body"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-xs text-text-muted font-body"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent-purple transition-colors" />
        </div>
      </div>
    </div>
  </div>
);

const Skills = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  // Memoized calculations for stats
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  const skillsData = [
    {
      icon: LineChart,
      title: "Trade",
      description: "Berpengalaman dalam analisa pasar, manajemen risiko, dan pengambilan keputusan berbasis data untuk berbagai instrumen trading.",
      highlights: [
        "Technical & Fundamental Analysis",
        "Risk Management Strategy",
        "Price Action Mastery",
        "Crypto, Forex"
      ]
    },
    {
      icon: Briefcase,
      title: "Business",
      description: "Fokus pada pengembangan bisnis, strategi pemasaran, dan menciptakan nilai jangka panjang yang berkelanjutan.",
      highlights: [
        "Strategic Planning",
        "Business Development",
        "Marketing & Negotiation"
      ]
    },
    {
      icon: Rocket,
      title: "Digital Creator & Developer",
      description: "Menciptakan pengalaman digital modern melalui inovasi, desain, dan teknologi.",
      highlights: [
        "UI/UX Modern",
        "Fullstack Web Development",
        "Branding & Creative Direction",
        "Performance Optimization"
      ]
    }
  ];

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-accent-purple to-accent-blue",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-accent-blue to-accent-purple",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-accent-purple to-accent-blue",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div className="min-h-screen bg-background-primary overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] py-16" id="Skills">
      <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="600">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient font-heading mb-4">
          My Expertise
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto text-base sm:text-lg font-body">
          Combining trading expertise, business acumen, and digital innovation to create impactful solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {skillsData.map((skill, index) => (
          <SkillCard key={index} {...skill} index={index} />
        ))}
      </div>

      {/* Statistics Cards Section */}
      <div className="mt-16">
        <div className="text-center mb-8" data-aos="fade-up" data-aos-duration="600">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient font-heading mb-4">
            Achievements
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base sm:text-lg font-body">
            Key milestones and accomplishments in my journey
          </p>
        </div>
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Skills;
