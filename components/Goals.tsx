import React from 'react';
import { RocketLaunchIcon, TrophyIcon, GlobeAltIcon, BriefcaseIcon } from '../constants';
import Card from './ui/Card';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

const iconMap = [
  <RocketLaunchIcon className="h-10 w-10 text-orange-500" />,
  <TrophyIcon className="h-10 w-10 text-orange-500" />,
  <GlobeAltIcon className="h-10 w-10 text-orange-500" />,
  <BriefcaseIcon className="h-10 w-10 text-orange-500" />,
];


const Goals: React.FC = () => {
  const { language } = useLanguage();
  const langContent = content[language].goals;

  return (
    <section className="py-20 md:py-28 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{langContent.title}</h2>
          <p className="mt-4 text-lg text-slate-400">
            {langContent.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {langContent.items.map((goal, index) => (
            <Card key={index} className="text-center hover:bg-slate-700/50 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-4">
                {iconMap[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{goal.title}</h3>
              <p className="text-slate-400">{goal.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals;
