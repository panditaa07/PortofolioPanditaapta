import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems
                .map((item) => {
                    const section = document.querySelector(item.href);
                    if (!section) return null;

                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 150,
                        height: section.offsetHeight,
                    };
                })
                .filter(Boolean);

            const position = window.scrollY;

            const active = sections.find(
                (s) => position >= s.offset && position < s.offset + s.height
            );

            if (active) setActiveSection(active.id);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);

        if (section) {
            const top = section.offsetTop - 100;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }

        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-background-primary"
                    : scrolled
                    ? "glass-bg shadow-glass"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto hero-padding">
                <div className="flex items-center justify-between h-16">
                    <a
                        href="#Home"
                        onClick={(e) => scrollToSection(e, "#Home")}
                        className="text-xl font-bold text-gradient font-heading"
                    >
                        Pandita
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="group relative px-1 py-2 text-sm font-medium"
                            >
                                <span
                                    className={`relative z-10 transition-colors ${
                                        activeSection === item.href.substring(1)
                                            ? "text-gradient font-semibold"
                                            : "text-text-secondary group-hover:text-text-primary"
                                    }`}
                                >
                                    {item.label}
                                </span>

                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-purple to-accent-blue transition-transform origin-left ${
                                        activeSection === item.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 transition-transform ${
                            isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                        }`}
                    >
                        {isOpen ? <X className="w-6 h-6" color="white" /> : <Menu className="w-6 h-6" color="white" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 py-6 space-y-4 glass-bg mx-4 rounded-2xl">
                    {navItems.map((item, i) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block text-lg transition-all ${
                                activeSection === item.href.substring(1)
                                    ? "text-gradient font-semibold"
                                    : "text-text-secondary hover:text-text-primary"
                            }`}
                            style={{
                                transitionDelay: `${i * 80}ms`,
                                transform: isOpen
                                    ? "translateX(0)"
                                    : "translateX(40px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;