import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Goals from './components/Goals';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

export type SectionKey = 'goals' | 'services' | 'process' | 'about' | 'references' | 'contact';

const App: React.FC = () => {
  const sections: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
    goals: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    references: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (sectionKey: SectionKey) => {
    sections[sectionKey].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-900">
        <Header onNavigate={scrollToSection} />
        <main>
          <Hero onCtaClick={() => scrollToSection('contact')} />
          <div ref={sections.goals} id="goals">
            <Goals />
          </div>
          <div ref={sections.services} id="services">
            <Services />
          </div>
          <div ref={sections.process} id="process">
            <Process />
          </div>
          <div ref={sections.about} id="about">
            <About />
          </div>
          <div ref={sections.references} id="references">
            <References />
          </div>
          <div ref={sections.contact} id="contact">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
