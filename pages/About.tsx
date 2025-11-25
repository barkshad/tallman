import React from 'react';
import TransitionWrapper from '../components/TransitionWrapper';

const About: React.FC = () => {
  return (
    <TransitionWrapper className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src="https://picsum.photos/id/338/800/1200" 
                alt="Photographer" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 right-0 bg-white text-black px-6 py-2">
                <p className="text-xs uppercase tracking-widest font-bold">Lumos Founder</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              We see the world in lights and shadows.
            </h1>
            
            <div className="space-y-6 text-neutral-400 leading-relaxed font-light text-lg">
              <p>
                Founded in 2018, LUMOS began with a simple philosophy: photography should feel less like a record and more like a memory. We strip away the unnecessary, focusing on raw emotion, composition, and the natural interplay of light.
              </p>
              <p>
                Our approach is distinctly minimalist and cinematic. Whether it's a high-fashion editorial or an intimate wedding, we bring a director's eye to every shoot. We don't just take pictures; we craft scenes that stand the test of time.
              </p>
              <p>
                Based in Los Angeles but available worldwide, we are seekers of beauty in the brutalist and the organic alike.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
              <div>
                <span className="text-4xl font-serif text-white block mb-2">5+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">Years Experience</span>
              </div>
              <div>
                <span className="text-4xl font-serif text-white block mb-2">150+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">Projects Completed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TransitionWrapper>
  );
};

export default About;