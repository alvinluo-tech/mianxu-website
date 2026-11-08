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
import { ThemeProvider } from "./lib/theme";
import { I18nProvider, useI18n } from "./i18n";
import { ScrollTrigger } from "./lib/gsap";

/** 语言切换时同步 <title> 与 meta description */
function MetaSync() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));
  }, [t]);
  return null;
}

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
    <ThemeProvider>
      <I18nProvider>
        <MetaSync />
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
      </I18nProvider>
    </ThemeProvider>
  );
}
