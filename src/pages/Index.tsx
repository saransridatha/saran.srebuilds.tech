import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ParticleField from "@/components/ParticleField";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import MountainRidge from "@/components/MountainRidge";
import DeploymentOverlay from "@/components/DeploymentOverlay";
import AltitudeTracker from "@/components/AltitudeTracker";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Index = () => {
  useEffect(() => {
    // Force scroll to top on refresh
    window.scrollTo(0, 0);
    
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Ensure GSAP knows about the new dimensions after layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <AltitudeTracker />
      <DeploymentOverlay />
      <ParticleField />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <MountainRidge />
      </main>
    </>
  );
};

export default Index;
