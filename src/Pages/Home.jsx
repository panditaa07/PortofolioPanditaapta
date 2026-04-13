import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Mail, ExternalLink, Instagram, Linkedin, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie.json";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block badge-position" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full glass-bg border border-white/10">
        <span className="text-gradient sm:text-sm text-[0.7rem] font-medium flex items-center font-body">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-accent-purple" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="hero-title font-bold tracking-tight font-heading">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-accent-purple to-accent-blue blur-2xl opacity-20"></span>
        <span className="relative text-gradient">
          Software
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-accent-purple to-accent-blue blur-2xl opacity-20"></span>
        <span className="relative text-gradient">
          engineering
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full glass-bg border border-white/10 text-sm text-text-secondary hover:text-text-primary hover:border-accent-purple/30 transition-all duration-300 font-body">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-accent-blue rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 glass-bg rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-text-primary font-medium z-10 font-body">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-text-primary ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-blue rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl glass-bg p-2 flex items-center justify-center border border-white/10 group-hover:border-accent-purple/30 transition-all duration-300">
        <Icon className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Businessman", "Trader", "Content Creator"];
const TECH_STACK = ["HTML, CSS, JavaScript", "React.js", "PHP & MySQL", "Laravel Framework", "UI/UX Design (Figma)"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/panditaa07" },
  { icon: Instagram, link: "https://www.instagram.com/panditaapta_?igsh=aDd6eXNoM2ZrNTNx&utm_source=qr" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/pandita-apta-99a5943a7?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [animationError, setAnimationError] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // AOS initialization
  useEffect(() => {
    const initAOS = () => { AOS.init({ once: true, offset: 10 }); };
    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => { setScrollY(window.scrollY); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsLoaded(true); return () => setIsLoaded(false); }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) { setText(prev => prev + WORDS[wordIndex][charIndex]); setCharIndex(prev => prev + 1); }
      else { setTimeout(() => setIsTyping(false), PAUSE_DURATION); }
    } else {
      if (charIndex > 0) { setText(prev => prev.slice(0, -1)); setCharIndex(prev => prev - 1); }
      else { setWordIndex(prev => (prev + 1) % WORDS.length); setIsTyping(true); }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => { const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED); return () => clearTimeout(timeout); }, [handleTyping]);

  return (
    <div className="min-h-screen bg-background-primary overflow-hidden hero-padding" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between hero-gap">

          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-1">
            <StatusBadge />
            <MainTitle />
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <span className="hero-subtitle text-text-secondary font-light font-body">
                {text}
              </span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-accent-purple to-accent-blue ml-1 animate-pulse"></span>
            </div>
            <p className="hero-description text-text-muted max-w-full lg:max-w-xl leading-relaxed font-light mx-auto lg:mx-0 font-body">
              Mengubah ide menjadi website profesional dengan desain dan performa maksimal.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {TECH_STACK.map((tech, index) => <TechStack key={index} tech={tech} />)}
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
              <CTAButton href="#Contact" text="Contact" icon={Mail} />
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              {SOCIAL_LINKS.map((social, index) => <SocialLink key={index} {...social} />)}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center order-2 mt-6 lg:mt-0" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="relative flex items-center justify-center w-full h-full">
              <div className={`absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 rounded-full blur-xl transition-all duration-500 ${isHovering ? "opacity-30 scale-110" : "opacity-20 scale-100"}`}></div>
              <div className="relative flex justify-center items-center z-10 transition-transform duration-500"
                   style={{ width: "clamp(70%, 80%, 90%)", maxWidth: "clamp(35vw, 45vw, 55vw)", height: "auto", transform: `translateY(${scrollY * 0.05}px)` }}>
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className={`w-full h-auto transition-all duration-500 ${isHovering ? "scale-105 brightness-110" : "scale-100"} ${animationLoaded ? "opacity-100" : "opacity-0"}`}
                  onDOMLoaded={() => { setAnimationLoaded(true); setAnimationError(false); }}
                  onError={(error) => { // Lottie animation failed to load
 setAnimationError(true); setAnimationLoaded(false); }}
                />
              </div>
              <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${isHovering ? "opacity-30" : "opacity-15"}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "70%", height: "70%" }}>
                  <div className="w-full h-full bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 blur-2xl rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(Home);
