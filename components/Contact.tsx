import React, { useState } from 'react';
import Button from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    gdpr: false,
  });
  const [status, setStatus] = useState<Status>('idle');
  const { language } = useLanguage();
  const langContent = content[language].contact;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Pro finální nasazení si vytvořte vlastní endpoint na formspree.io a nahraďte URL níže
    const formspreeEndpoint = 'https://formspree.io/f/xeqyqgpr'; // Toto je veřejný testovací endpoint

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '', gdpr: false });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">{langContent.title}</h2>
          <p className="mt-4 text-lg text-slate-300">
            {langContent.subtitle}
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto bg-slate-800 text-slate-200 rounded-lg shadow-2xl p-8 md:p-12">
          {status === 'success' ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-green-500">{langContent.success.title}</h3>
              <p className="mt-2 text-slate-400">{langContent.success.subtitle}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300">{langContent.form.name}</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300">{langContent.form.company}</label>
                  <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">{langContent.form.email}</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300">{langContent.form.phone}</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300">{langContent.form.message}</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="gdpr" name="gdpr" type="checkbox" required checked={formData.gdpr} onChange={handleChange} className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-slate-500 rounded bg-slate-700" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="gdpr" className="font-medium text-slate-300">{langContent.form.gdpr}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-right">
                <Button type="submit" size="lg" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Odesílání...' : langContent.form.submit}
                </Button>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-4 text-center">
                  Omlouváme se, došlo k chybě. Zkuste to prosím znovu později.
                </p>
              )}
            </form>
          )}
        </div>
        <div className="mt-12 text-center text-slate-300 space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-12">
            <a href="mailto:petr.hanovec@outlook.cz" className="flex items-center justify-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                petr.hanovec@outlook.cz
            </a>
            <a href="tel:+420724349424" className="flex items-center justify-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.024 11.024 0 006.214 6.214l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V5a1 1 0 011-1h.001z" /></svg>
                +420 724 349 424
            </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;