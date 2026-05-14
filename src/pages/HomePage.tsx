import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAB from '../components/FAB';
import ScrollToHash from '../components/ScrollToHash';
import Hero from '../components/Hero';
import ParticleCanvas from '../components/ParticleCanvas';
import CoreCommandSuiteMarquee from '../components/CoreCommandSuiteMarquee';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import CommandCenter from '../components/CommandCenter';
import TestimonialsSection from '../components/TestimonialsSection';
import ProcessTimeline from '../components/ProcessTimeline';
import ServiceEcosystem from '../components/ServiceEcosystem';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <ScrollToHash />
      <Navbar />

      <main className="overflow-hidden">
        <div className="relative">
          <ParticleCanvas />
          <div className="relative z-10">
            <Hero />
            <CoreCommandSuiteMarquee />
          </div>
        </div>

        <AboutSection />

        <ExperienceSection />

        <section id="portfolio" className="relative scroll-mt-28 border-t border-on-surface/5 bg-surface">
          <CommandCenter />
        </section>

        <ProcessTimeline sectionId="approach" />

        <TestimonialsSection />

        <section id="services" className="scroll-mt-28 border-t border-on-surface/5 bg-surface-container-high/80">
          <ServiceEcosystem />
        </section>
      </main>

      <Footer />
      <FAB />
    </div>
  );
}
