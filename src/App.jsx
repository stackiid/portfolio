import { useEffect, useState } from "react";
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
export default function App() {
  const [loading, setLoading] = useState(true);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  useEffect(() => {
    const finishLoading = () => {
      // Small minimum so the loader never just flashes on fast connections.
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      return () => window.removeEventListener("load", finishLoading);
    }
  }, []);

  return (
    <>
      <Loader visible={loading} />
      <Navbar onDownloadCv={() => setCvModalOpen(true)} />
      <ScrollDots />
      <main>
        <Hero />
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
