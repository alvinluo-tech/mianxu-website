import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VideoSection from "./components/VideoSection";
import Features from "./components/Features";
import Story from "./components/Story";
import Download from "./components/Download";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ScrollTrigger } from "./lib/gsap";

export default function App() {
  // 资源加载完成后刷新 ScrollTrigger 度量
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 1200);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main id="top" className="relative min-h-screen overflow-x-hidden bg-ink text-paper">
      <Navbar />
      <Hero />
      <About />
      <VideoSection />
      <Features />
      <Story />
      <Download />
      <Contact />
      <Footer />
    </main>
  );
}
