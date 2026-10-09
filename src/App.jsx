import { useCallback, useEffect, useState } from "react";
import Loader from "./components/common/Loader.jsx";
import Navbar from "./components/navigation/Navbar.jsx";
import ScrollDots from "./components/navigation/ScrollDots.jsx";
import Footer from "./components/common/Footer.jsx";
import CvModal from "./components/common/CvModal.jsx";
import Hero from "./sections/Hero/Hero.jsx";
import About from "./sections/About/About.jsx";
import Skills from "./sections/Skills/Skills.jsx";
import Experience from "./sections/Experience/Experience.jsx";
import Education from "./sections/Education/Education.jsx";
import Projects from "./sections/Projects/Projects.jsx";
import Certifications from "./sections/Certifications/Certifications.jsx";
import Collaboration from "./sections/Collaboration/Collaboration.jsx";
import Testimonials from "./sections/Testimonials/Testimonials.jsx";
import Contact from "./sections/Contact/Contact.jsx";

// =========================================================
//                           App
// =========================================================

// The loader stays until the hero portrait is decoded AND this much time
// has passed. HERO_GIVE_UP_MS only exists so a stalled request cannot
// trap the visitor behind the loader forever.
const MIN_LOADER_MS = 2000;
const HERO_GIVE_UP_MS = 15000;

export default function App() {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [heroSettled, setHeroSettled] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleHeroSettled = useCallback(() => setHeroSettled(true), []);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADER_MS);
    const giveUpTimer = setTimeout(() => setHeroSettled(true), HERO_GIVE_UP_MS);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(giveUpTimer);
    };
  }, []);

  const loading = !(minTimeElapsed && heroSettled);

  return (
    <>
      <Loader visible={loading} />
      <Navbar onDownloadCv={() => setCvModalOpen(true)} />
      <ScrollDots />
      <main>
        <Hero onImageSettled={handleHeroSettled} />
        <About onDownloadCv={() => setCvModalOpen(true)} />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Collaboration />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CvModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </>
  );
}
