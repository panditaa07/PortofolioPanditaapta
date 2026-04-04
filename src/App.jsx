import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./index.css";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Skills from "./components/Skills";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome, showContent }) => {
    return (
        <>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen
                        onLoadingComplete={() => setShowWelcome(false)}
                    />
                )}
            </AnimatePresence>

            <div
                className={`transition-opacity duration-500 ${
                    showContent ? "opacity-100" : "opacity-0"
                }`}
            >
                <Navbar />
                <AnimatedBackground />
                <Home />
                <About />
                <Skills />
                <Portofolio />
                <ContactPage />

                <footer className="text-center py-4">
                    <hr className="my-3 border-gray-400 opacity-15 mx-auto" />
                    <span className="text-sm text-gray-500">
                        © 2025 <a className="hover:underline">Pandita™</a>. All Rights
                        Reserved.
                    </span>
                </footer>
            </div>
        </>
    );
};

const ProjectPageLayout = () => (
    <>
        <ProjectDetails />
        <footer className="text-center py-4">
            <hr className="my-3 border-gray-400 opacity-15 mx-auto" />
            <span className="text-sm text-gray-500">
                © 2025 <a className="hover:underline">Pandita™</a>. All Rights Reserved.
            </span>
        </footer>
    </>
);

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!showWelcome) {
            setTimeout(() => setShowContent(true), 100);
        }
    }, [showWelcome]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LandingPage
                        showWelcome={showWelcome}
                        setShowWelcome={setShowWelcome}
                        showContent={showContent}
                    />
                }
            />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;