import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Save, Trash2, Plus, Image as ImageIcon, Type, LogOut, Briefcase, MessageSquare, Upload } from 'lucide-react';
import { PORTFOLIO_ITEMS, SITE_CONTENT, SERVICES, TESTIMONIALS, KEYS, APP_NAME } from '../constants';
import { Photo, SiteContent, ServicePackage, Testimonial } from '../types';

type Tab = 'text' | 'portfolio' | 'services' | 'testimonials';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('text');
  
  // Data State
  const [content, setContent] = useState<SiteContent>(SITE_CONTENT);
  const [portfolio, setPortfolio] = useState<Photo[]>(PORTFOLIO_ITEMS);
  const [services, setServices] = useState<ServicePackage[]>(SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  // Form State helpers
  const [newPhoto, setNewPhoto] = useState<Partial<Photo>>({ title: '', category: 'Portrait', src: '' });
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ name: '', role: '', text: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('LUMOS_ADMIN_AUTH');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      setIsAuthenticated(true);
      sessionStorage.setItem('LUMOS_ADMIN_AUTH', 'true');
    } else {
      alert('Invalid Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('LUMOS_ADMIN_AUTH');
  };

  // --- IMAGE PROCESSING (COMPRESSION) ---
  const processImage = (file: File, callback: (result: string) => void) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize logic: Max width 1000px to save LocalStorage space
        const maxWidth = 1000;
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG 0.7 quality
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setIsProcessing(false);
        callback(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // --- SAVE HANDLERS ---
  const saveContent = () => {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(content));
    alert('Text Content Saved!');
  };

  const savePortfolio = () => {
    try {
      localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(portfolio));
      alert('Portfolio Saved!');
    } catch (e) {
      alert('Error: Storage full. Try deleting old photos or uploading smaller images.');
    }
  };

  const saveServices = () => {
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
    alert('Services Saved!');
  };

  const saveTestimonials = () => {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    alert('Testimonials Saved!');
  };

  // --- CONTENT IMAGES ---
  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file, (base64) => {
        setContent({...content, aboutImage: base64});
      });
    }
  };

  // --- PORTFOLIO LOGIC ---
  const handlePhotoDelete = (id: number) => {
    if (confirm('Delete this photo?')) {
      const updated = portfolio.filter(p => p.id !== id);
      setPortfolio(updated);
      localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(updated));
    }
  };

  const handleAddPhoto = () => {
    if (!newPhoto.src || !newPhoto.title) {
      alert('Please provide Image URL and Title');
      return;
    }
    const newItem: Photo = {
      id: Date.now(),
      src: newPhoto.src,
      title: newPhoto.title,
      category: newPhoto.category || 'General'
    };
    const updated = [newItem, ...portfolio];
    
    try {
      // Try saving first to check quota
      localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(updated));
      setPortfolio(updated);
      setNewPhoto({ title: '', category: 'Portrait', src: '' });
      alert('Photo Added!');
    } catch (e) {
      alert('Storage Full! Please delete some photos first.');
    }
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file, (base64) => {
        setNewPhoto({ ...newPhoto, src: base64 });
      });
    }
  };

  // --- SERVICES LOGIC ---
  const handleServiceChange = (index: number, field: keyof ServicePackage, value: any) => {
    const updated = [...services];
    if (field === 'features') {
      updated[index].features = value.split('\n');
    } else {
      (updated[index] as any)[field] = value;
    }
    setServices(updated);
  };

  // --- TESTIMONIALS LOGIC ---
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text) {
      alert('Name and Quote are required');
      return;
    }
    const newItem: Testimonial = {
      id: Date.now(),
      name: newTestimonial.name || '',
      role: newTestimonial.role || '',
      text: newTestimonial.text || ''
    };
    const updated = [...testimonials, newItem];
    setTestimonials(updated);
    setNewTestimonial({ name: '', role: '', text: '' });
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(updated));
  };

  const handleDeleteTestimonial = (id: number) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(updated));
  };


  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="w-full max-w-md bg-neutral-900 p-8 rounded border border-neutral-800">
          <div className="flex justify-center mb-6 text-neutral-400">
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-serif text-center mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-neutral-700 p-3 text-white rounded focus:border-white outline-none"
            />
            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-neutral-200 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-neutral-950 text-white font-sans pb-20">
      <nav className="bg-neutral-900 border-b border-neutral-800 p-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-serif font-bold">{APP_NAME} <span className="text-neutral-500 text-sm font-sans font-normal ml-2">/ Control Panel</span></h1>
          <div className="flex items-center gap-4">
             <Link to="/" className="text-sm text-neutral-400 hover:text-white border-b border-transparent hover:border-white">View Site</Link>
             <button onClick={handleLogout} className="flex items-center text-sm text-neutral-400 hover:text-white">
               <LogOut size={16} className="mr-2" /> Logout
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto space-x-6 mb-8 border-b border-neutral-800 scrollbar-hide">
          {[
            { id: 'text', label: 'Global Content', icon: Type },
            { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
            { id: 'services', label: 'Services', icon: Briefcase },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`pb-4 px-2 flex items-center whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                ? 'border-b-2 border-white text-white' 
                : 'text-neutral-500 hover:text-white'
              }`}
            >
              <tab.icon size={18} className="mr-2" /> {tab.label}
            </button>
          ))}
        </div>

        {/* --- TEXT CONTENT EDITOR --- */}
        {activeTab === 'text' && (
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
              <h3 className="text-lg font-bold mb-4">Site Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-500 mb-1">Tagline (Homepage)</label>
                  <input 
                    value={content.tagline} 
                    onChange={(e) => setContent({...content, tagline: e.target.value})}
                    className="w-full bg-black p-3 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-neutral-500 mb-1">Contact Email</label>
                  <input 
                    value={content.contactEmail} 
                    onChange={(e) => setContent({...content, contactEmail: e.target.value})}
                    className="w-full bg-black p-3 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
              <h3 className="text-lg font-bold mb-4">About Page</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-500 mb-1">About Image</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-grow w-full">
                       <input 
                        value={content.aboutImage} 
                        onChange={(e) => setContent({...content, aboutImage: e.target.value})}
                        className="w-full bg-black p-3 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none mb-2" 
                        placeholder="Image URL..."
                      />
                       <label className="inline-flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-3 rounded border border-neutral-700 w-full md:w-auto justify-center transition-colors">
                          <Upload size={18} className="text-neutral-400" />
                          <span className="text-sm font-medium">Upload from Gallery</span>
                          <input type="file" accept="image/*" onChange={handleAboutImageUpload} className="hidden" />
                      </label>
                    </div>
                    {content.aboutImage && (
                      <div className="flex-shrink-0">
                         <img src={content.aboutImage} alt="Preview" className="w-24 h-32 object-cover rounded border border-neutral-700" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-neutral-500 mb-1">Bio Text</label>
                  <p className="text-xs text-neutral-500 mb-2">Separate paragraphs with a double line break.</p>
                  <textarea 
                    rows={8}
                    value={content.aboutText.join('\n\n')} 
                    onChange={(e) => setContent({...content, aboutText: e.target.value.split('\n\n')})}
                    className="w-full bg-black p-3 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            <button onClick={saveContent} className="flex items-center bg-white text-black px-8 py-3 rounded font-bold hover:bg-neutral-200 transition-colors">
              <Save size={18} className="mr-2" /> Save Content
            </button>
          </div>
        )}

        {/* --- PORTFOLIO EDITOR --- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8 animate-fade-in">
            {/* Add New */}
            <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
              <h3 className="text-lg font-bold mb-4 flex items-center"><Plus size={20} className="mr-2"/> Add New Photo</h3>
              
              {isProcessing && (
                <div className="mb-4 bg-neutral-800 p-2 rounded text-xs text-blue-400 animate-pulse">
                  Processing image... please wait.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase text-neutral-500 mb-1">Title</label>
                  <input 
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                    className="w-full bg-black p-2 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none"
                    placeholder="Photo Title"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase text-neutral-500 mb-1">Category</label>
                  <select 
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
                    className="w-full bg-black p-2 border border-neutral-800 rounded text-white focus:border-neutral-500 outline-none"
                  >
                    <option>Portrait</option>
                    <option>Landscape</option>
                    <option>Fashion</option>
                    <option>Architecture</option>
                    <option>Editorial</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="block text-xs uppercase text-neutral-500">Image Source</label>
                    <div className="flex gap-2 w-full">
                       <input 
                          value={newPhoto.src?.substring(0, 30) + (newPhoto.src && newPhoto.src.length > 30 ? '...' : '')}
                          readOnly
                          placeholder="Image Data"
                          className="flex-grow bg-black p-2 border border-neutral-800 rounded text-neutral-500 text-xs focus:border-neutral-500 outline-none cursor-not-allowed"
                        />
                       <label className={`bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded cursor-pointer border border-neutral-700 flex-shrink-0 flex items-center gap-2 transition-colors ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
                          <Upload size={18} className="text-neutral-400" />
                          <span className="text-sm font-medium">Upload</span>
                          <input type="file" accept="image/*" onChange={handlePortfolioUpload} className="hidden" />
                        </label>
                    </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                  <button 
                    onClick={handleAddPhoto} 
                    disabled={isProcessing}
                    className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-neutral-200 h-10 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Add to Gallery'}
                  </button>
              </div>

              {newPhoto.src && (
                <div className="mt-4 p-4 bg-black rounded border border-neutral-800">
                  <p className="text-xs text-neutral-500 mb-2">Preview:</p>
                  <img src={newPhoto.src} alt="Preview" className="h-40 object-contain rounded" />
                </div>
              )}
            </div>

            {/* Gallery List */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {portfolio.map(item => (
                <div key={item.id} className="relative group bg-neutral-900 rounded overflow-hidden border border-neutral-800">
                  <div className="aspect-square relative">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3">
                    <p className="font-bold truncate text-sm text-white">{item.title}</p>
                    <p className="text-xs text-neutral-500 uppercase">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => handlePhotoDelete(item.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SERVICES EDITOR --- */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <div key={idx} className="bg-neutral-900 p-6 rounded border border-neutral-800 flex flex-col gap-4">
                     <div>
                       <label className="block text-xs uppercase text-neutral-500 mb-1">Package Name</label>
                       <input 
                          value={service.title}
                          onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                          className="w-full bg-black p-2 border border-neutral-800 rounded text-white"
                        />
                     </div>
                     <div>
                       <label className="block text-xs uppercase text-neutral-500 mb-1">Price</label>
                       <input 
                          value={service.price}
                          onChange={(e) => handleServiceChange(idx, 'price', e.target.value)}
                          className="w-full bg-black p-2 border border-neutral-800 rounded text-white"
                        />
                     </div>
                     <div>
                       <label className="block text-xs uppercase text-neutral-500 mb-1">Description</label>
                       <textarea 
                          rows={2}
                          value={service.description}
                          onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
                          className="w-full bg-black p-2 border border-neutral-800 rounded text-white text-sm"
                        />
                     </div>
                     <div className="flex-grow">
                       <label className="block text-xs uppercase text-neutral-500 mb-1">Features (One per line)</label>
                       <textarea 
                          rows={5}
                          value={service.features.join('\n')}
                          onChange={(e) => handleServiceChange(idx, 'features', e.target.value)}
                          className="w-full bg-black p-2 border border-neutral-800 rounded text-white text-sm font-mono"
                        />
                     </div>
                  </div>
                ))}
             </div>
             <button onClick={saveServices} className="flex items-center bg-white text-black px-8 py-3 rounded font-bold hover:bg-neutral-200 transition-colors">
              <Save size={18} className="mr-2" /> Save Services
            </button>
          </div>
        )}

        {/* --- TESTIMONIALS EDITOR --- */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8 animate-fade-in">
             {/* Add New */}
             <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
               <h3 className="text-lg font-bold mb-4">Add Testimonial</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input 
                      placeholder="Client Name"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      className="w-full bg-black p-2 border border-neutral-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <input 
                      placeholder="Role / Title"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                      className="w-full bg-black p-2 border border-neutral-800 rounded text-white"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <textarea 
                      placeholder="Quote..."
                      rows={2}
                      value={newTestimonial.text}
                      onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
                      className="w-full bg-black p-2 border border-neutral-800 rounded text-white"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <button onClick={handleAddTestimonial} className="bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700 text-sm">
                      <Plus size={16} className="inline mr-1"/> Add Review
                    </button>
                  </div>
               </div>
             </div>

             <div className="space-y-4">
                {testimonials.map(item => (
                   <div key={item.id} className="bg-neutral-900 p-4 rounded border border-neutral-800 flex justify-between items-start group">
                      <div>
                        <p className="text-lg italic text-neutral-300 mb-2">"{item.text}"</p>
                        <p className="font-bold text-sm">{item.name} <span className="text-neutral-500 font-normal"> — {item.role}</span></p>
                      </div>
                      <button onClick={() => handleDeleteTestimonial(item.id)} className="text-neutral-600 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;