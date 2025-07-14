import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

const Process: React.FC = () => {
  const { language } = useLanguage();
  const langContent = content[language].process;

  return (
    <section className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{langContent.title}</h2>
          <p className="mt-4 text-lg text-slate-400">
            {langContent.subtitle}
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700" aria-hidden="true"></div>
            <div className="space-y-16">
              {langContent.steps.map((step, index) => (
                <div key={index} className="relative flex items-center justify-between">
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-5/12">
                        <h3 className="text-2xl font-bold text-slate-100">{step.title}</h3>
                        <p className="mt-2 text-slate-400">{step.description}</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number.slice(1)}
                      </div>
                      <div className="w-5/12"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-5/12"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number.slice(1)}
                      </div>
                      <div className="w-5/12">
                        <h3 className="text-2xl font-bold text-slate-100">{step.title}</h3>
                        <p className="mt-2 text-slate-400">{step.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
