import React, { useState } from 'react';
import { Send } from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <TransitionWrapper className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h1 className="text-4xl md:text-6xl font-serif mb-8">Let's Create Together</h1>
            <p className="text-neutral-400 mb-12 text-lg font-light leading-relaxed">
              We are currently accepting bookings for the 2024-2025 season. Please fill out the form, and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</h3>
                <p className="text-xl">hello@lumos.photography</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Studio</h3>
                <p className="text-xl">1024 Grand Ave, Suite 300<br/>Los Angeles, CA 90015</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-neutral-900 p-8 md:p-12">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black mb-4">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-serif">Message Sent</h3>
                <p className="text-neutral-400">Thank you for reaching out. We will be in touch shortly.</p>
                <Button onClick={() => setStatus('idle')} variant="outline" className="mt-4">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full bg-black border-b border-neutral-700 focus:border-white outline-none py-3 text-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full bg-black border-b border-neutral-700 focus:border-white outline-none py-3 text-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Inquiry Type</label>
                  <select 
                    id="type" 
                    className="w-full bg-black border-b border-neutral-700 focus:border-white outline-none py-3 text-white transition-colors appearance-none"
                  >
                    <option>Portrait Session</option>
                    <option>Event Coverage</option>
                    <option>Editorial / Commercial</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    required 
                    className="w-full bg-black border-b border-neutral-700 focus:border-white outline-none py-3 text-white transition-colors resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" variant="primary" className="w-full">
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </TransitionWrapper>
  );
};

export default Contact;