import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import useTheme from "../hooks/useTheme";

export default function Landing() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <main className="min-h-screen bg-[#FFF9F2] dark:bg-[#03045E]">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
