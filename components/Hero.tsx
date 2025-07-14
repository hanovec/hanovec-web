import React from 'react';
import Button from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';


interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { language } = useLanguage();
  const langContent = content[language].hero;
  // Add a dynamic timestamp for cache-busting
  const imageUrl = `/petr-hanovec.jpg?timestamp=${new Date().getTime()}`;

  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {langContent.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0">
            {langContent.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={onCtaClick} size="lg">
              {langContent.cta1}
            </Button>
            <Button href="#goals" variant="secondary" size="lg">
              {langContent.cta2}
            </Button>
          </div>
        </div>
        <div className="relative mt-12 md:mt-0 md:w-1/2 lg:w-2/5 h-80 md:h-auto">
           <div className="absolute inset-0">
              <img 
                src={imageUrl}
                alt={langContent.alt} 
                className="object-cover w-full h-full rounded-full opacity-80 ring-4 ring-slate-800"
              />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;