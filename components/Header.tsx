import React, { useState, useEffect } from 'react';
import { SectionKey } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

interface HeaderProps {
  onNavigate: (section: SectionKey) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const langContent = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = langContent.navLinks.map(link => ({...link, key: link.key as SectionKey}));

  const handleNavClick = (section: SectionKey) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 shadow-lg backdrop-blur-sm border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-slate-100 hover:text-orange-500 transition-colors">
              Petr Hanovec
            </a>
            <nav className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.key)}
                  className="text-sm font-medium text-slate-300 hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="hidden lg:flex items-center ml-4">
              <div className="text-sm font-semibold">
                <span className={`cursor-pointer transition-colors ${language === 'cs' ? 'text-slate-100' : 'text-slate-500 hover:text-white'}`} onClick={() => setLanguage('cs')}>CZ</span>
                <span className="text-slate-500 mx-1">/</span>
                <span className={`cursor-pointer transition-colors ${language === 'en' ? 'text-slate-100' : 'text-slate-500 hover:text-white'}`} onClick={() => setLanguage('en')}>EN</span>
              </div>
            </div>
            <button className="lg:hidden text-slate-200" onClick={() => setIsMenuOpen(true)} aria-label="Otevřít menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-6 py-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <a href="#" className="text-2xl font-bold text-slate-100" onClick={() => setIsMenuOpen(false)}>
              Petr Hanovec
            </a>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-200" aria-label="Zavřít menu">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                className="text-2xl text-slate-200 font-medium hover:text-orange-500 transition-colors"
              >
                {link.label}
              </button>
            ))}
             <div className="text-lg font-semibold mt-8">
              <span className={`cursor-pointer transition-colors ${language === 'cs' ? 'text-slate-100' : 'text-slate-500 hover:text-white'}`} onClick={() => setLanguage('cs')}>CZ</span>
              <span className="text-slate-500 mx-2">/</span>
              <span className={`cursor-pointer transition-colors ${language === 'en' ? 'text-slate-100' : 'text-slate-500 hover:text-white'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;