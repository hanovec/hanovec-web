import React, { useState } from 'react';
import { CheckCircleIcon } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';


const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { language } = useLanguage();
  const langContent = content[language].services;

  return (
    <section className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{langContent.title}</h2>
          <p className="mt-4 text-lg text-slate-400">
            {langContent.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 rounded-lg bg-slate-800 p-2">
          {langContent.items.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 rounded-md text-center font-semibold transition-all duration-300 ${
                activeTab === index 
                ? 'bg-slate-700 text-orange-500' 
                : 'bg-transparent text-slate-300 hover:bg-slate-700'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
        
        <div className="mt-8">
          {langContent.items.map((service, index) => (
            <div key={index} className={`${activeTab === index ? 'block' : 'hidden'}`}>
              <div className="bg-slate-800 p-8 md:p-12 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{service.detail.title}</h3>
                <p className="mt-4 text-slate-400">{service.detail.text}</p>
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-200 mb-4">{service.detail.col1Title}</h4>
                    <ul className="space-y-3 text-slate-300">
                      {service.detail.col1Points?.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-200 mb-4">{service.detail.col2Title}</h4>
                    {service.detail.bmc ? (
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-slate-300">
                        {service.detail.bmc.map((item, i) => (
                          <div key={i} className="bg-slate-700 p-2 rounded text-center">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-3 text-slate-300">
                        {service.detail.col2Points?.map((point, i) => (
                          <li key={i} className="flex items-start">
                             <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
