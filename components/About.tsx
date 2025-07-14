import React from 'react';
import Button from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

const About: React.FC = () => {
  const { language } = useLanguage();
  const langContent = content[language];
  const aboutContent = langContent.about;
  // Add a dynamic timestamp for cache-busting
  const imageUrl = `/petr-hanovec.jpg?timestamp=${new Date().getTime()}`;

  return (
    <section className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="md:w-1/3">
            <img 
              src={imageUrl} 
              alt={aboutContent.imageAlt} 
              className="rounded-lg w-full ring-4 ring-slate-800"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{aboutContent.title}</h2>
            <div className="mt-6 space-y-4 text-slate-300 text-lg">
              <p>
                {aboutContent.p1}
              </p>
              <p>
                {aboutContent.p2}
              </p>
            </div>
            <div className="mt-8">
              <Button 
                href={langContent.socials.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                size="lg"
              >
                {aboutContent.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;