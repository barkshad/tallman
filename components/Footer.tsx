import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, Lock, Phone } from 'lucide-react';
import { APP_NAME, SITE_CONTENT, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-serif tracking-widest uppercase">{APP_NAME}</h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Timeless photography for those who value the art of storytelling through light and shadow.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-neutral-500">Contact</h3>
          <p className="text-neutral-300">{SITE_CONTENT.contactEmail}</p>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
            +254 718 507 972
          </a>
          <p className="text-neutral-300">Nairobi, Kenya</p>
        </div>

        {/* Social */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-neutral-500">Follow</h3>
          <div className="flex space-x-6">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="WhatsApp">
              <Phone size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href={`mailto:${SITE_CONTENT.contactEmail}`} className="text-neutral-400 hover:text-white transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="text-neutral-600 text-xs tracking-wider mb-4 md:mb-0 uppercase">
          &copy; {new Date().getFullYear()} {APP_NAME} PHOTOGRAPHY. ALL RIGHTS RESERVED.
        </div>
        <Link to="/admin" className="text-neutral-800 hover:text-neutral-600 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest">
          <Lock size={12} /> Admin Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
