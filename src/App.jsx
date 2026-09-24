import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

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

const LandingPage = ({ showWelcome, setShowWelcome, showContent, projects, certificates }) => {
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
                <About projects={projects} certificates={certificates} />
                <Skills projects={projects} certificates={certificates} />
                <Portofolio projects={projects} certificates={certificates} />
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
    const [projects, setProjects] = useState(null);
    const [certificates, setCertificates] = useState(null);

    useEffect(() => {
        if (!showWelcome) {
            setTimeout(() => setShowContent(true), 100);
        }
    }, [showWelcome]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsResponse, certificatesResponse] = await Promise.all([
                    supabase.from("projects").select("*").order("id", { ascending: true }),
                    supabase.from("certificates").select("*").order("id", { ascending: true }),
                ]);

                if (projectsResponse.data) setProjects(projectsResponse.data);
                if (certificatesResponse.data) setCertificates(certificatesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LandingPage
                        showWelcome={showWelcome}
                        setShowWelcome={setShowWelcome}
                        showContent={showContent}
                        projects={projects}
                        certificates={certificates}
                    />
                }
            />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;