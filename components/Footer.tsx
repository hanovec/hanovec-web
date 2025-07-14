
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const langContent = content[language];
  const footerContent = langContent.footer;


  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {currentYear} Petr Hanovec | {footerContent.copyright}</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">{footerContent.privacy}</a>
          <a href={langContent.socials.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;