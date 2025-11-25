import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import { PORTFOLIO_ITEMS } from '../constants';
import { Photo } from '../types';

const Portfolio: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(PORTFOLIO_ITEMS.map(item => item.category)))];
  
  const filteredItems = filter === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  const openLightbox = (photo: Photo) => setSelectedPhoto(photo);
  const closeLightbox = () => setSelectedPhoto(null);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex(p => p.id === selectedPhoto.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= PORTFOLIO_ITEMS.length) newIndex = 0;
    if (newIndex < 0) newIndex = PORTFOLIO_ITEMS.length - 1;
    
    setSelectedPhoto(PORTFOLIO_ITEMS[newIndex]);
  };

  return (
    <TransitionWrapper className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Selected Works</h1>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs md:text-sm uppercase tracking-[0.2em] transition-colors pb-1 border-b ${
                  filter === cat 
                    ? 'text-white border-white' 
                    : 'text-neutral-500 border-transparent hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer aspect-[3/4] overflow-hidden bg-neutral-900"
                onClick={() => openLightbox(item)}
              >
                <img 
                  src={item.src} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-serif text-white">{item.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-neutral-300 mt-2">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <X size={32} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block"
            >
              <ChevronLeft size={40} />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-h-full max-w-full"
            >
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                className="max-h-[85vh] max-w-full shadow-2xl"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-2xl font-serif">{selectedPhoto.title}</h3>
                <p className="text-sm uppercase tracking-widest text-neutral-400 mt-1">{selectedPhoto.category}</p>
              </div>
            </motion.div>

            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionWrapper>
  );
};

export default Portfolio;