import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

const LogoPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="h-24 bg-slate-700 rounded-lg flex items-center justify-center p-4">
    <span className="text-slate-400 font-bold">{name}</span>
  </div>
);

const References: React.FC = () => {
  const { language } = useLanguage();
  const langContent = content[language].references;

  return (
    <section className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{langContent.title}</h2>
          <p className="mt-4 text-lg text-slate-400">
            {langContent.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {langContent.logos.map((logoName, index) => (
            <LogoPlaceholder key={index} name={logoName} />
          ))}
        </div>
        <p className="text-center mt-8 text-slate-500 italic">
          {langContent.placeholder}
        </p>
      </div>
    </section>
  );
};

export default References;
