import React from 'react';
import { Check } from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import Button from '../components/Button';
import { SERVICES, TESTIMONIALS } from '../constants';

const Services: React.FC = () => {
  return (
    <TransitionWrapper className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Invest in Art</h1>
          <p className="text-neutral-400">
            We offer tailored packages designed to meet specific needs, from personal portraits to large-scale commercial campaigns.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx} 
              className="border border-neutral-800 bg-neutral-900/50 p-8 flex flex-col hover:border-neutral-600 transition-colors duration-300"
            >
              <h3 className="text-xl font-serif mb-2">{service.title}</h3>
              <p className="text-neutral-500 text-sm mb-6 h-10">{service.description}</p>
              <div className="text-3xl font-light mb-8">{service.price}</div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-neutral-300">
                    <Check size={16} className="mr-3 mt-0.5 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button to="/contact" variant="outline" className="w-full">Book Now</Button>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-neutral-900 -mx-6 px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">Client Words</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="text-center">
                  <div className="text-4xl font-serif text-neutral-700 mb-6">"</div>
                  <p className="text-lg text-neutral-300 italic mb-6 leading-relaxed">
                    {t.text}
                  </p>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-sm">{t.name}</div>
                    <div className="text-xs text-neutral-500 mt-1">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </TransitionWrapper>
  );
};

export default Services;