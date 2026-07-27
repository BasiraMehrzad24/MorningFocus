import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
export default function Landing() {
  return (
    <main className="min-h-screen bg-[#FFF9F2] dark:bg-[#03045E]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
