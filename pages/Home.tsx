import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import TransitionWrapper from '../components/TransitionWrapper';
import { TAGLINE, PORTFOLIO_ITEMS } from '../constants';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Select a subset for the mini gallery
  const featuredImages = PORTFOLIO_ITEMS.slice(0, 3);

  return (
    <TransitionWrapper>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://picsum.photos/id/26/1920/1080")',
              filter: 'brightness(0.6) grayscale(100%)'
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter mb-6"
          >
            LUMOS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm md:text-lg uppercase tracking-[0.3em] text-neutral-300 mb-10"
          >
            {TAGLINE}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button to="/portfolio" variant="outline">View Portfolio</Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
          <div className="w-[1px] h-12 bg-neutral-700 overflow-hidden">
            <div className="w-full h-1/2 bg-white animate-[fadeIn_1.5s_infinite_linear] -translate-y-full" />
          </div>
        </motion.div>
      </div>

      {/* Featured Section */}
      <section className="py-24 md:py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-4">Latest Work</h2>
              <div className="h-1 w-20 bg-white"></div>
            </div>
            <Button to="/portfolio" variant="outline" className="mt-6 md:mt-0 hidden md:inline-flex group">
              Full Gallery <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{img.category}</span>
                  <h3 className="text-xl font-serif">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button to="/portfolio" variant="outline">Full Gallery</Button>
          </div>
        </div>
      </section>

      {/* Philosophy Snippet */}
      <section className="py-24 bg-neutral-900 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-serif italic text-neutral-400 mb-8 leading-relaxed">
            "Photography is not just about capturing a face, but about capturing the soul behind it. 
            We strive to create timeless art in every frame."
          </h2>
          <Button to="/about" variant="primary">Read Our Story</Button>
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default Home;