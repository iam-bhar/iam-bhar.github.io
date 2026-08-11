import AnimatedBackground from "@/app/components/ui/AnimatedBackground";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Experience from "@/app/components/sections/Experience";
import Skills from "@/app/components/sections/Skills";
import Education from "@/app/components/sections/Education";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
