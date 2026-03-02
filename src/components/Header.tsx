import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentView: 'home' | 'listing' | 'admin' | 'detail';
  onContactHover: (show: boolean) => void;
  showContactForm: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, onContactHover, showContactForm }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showRealEstateDropdown, setShowRealEstateDropdown] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', type: 'comprar' });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mensaje enviado con éxito para: ${formData.type}`);
    setFormData({ name: '', email: '', phone: '', message: '', type: 'comprar' });
    onContactHover(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRealEstateDropdown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHome = currentView === 'home';
  const headerBaseClass = isHome && !scrolled
    ? 'bg-transparent text-white'
    : 'bg-white text-leroy-black shadow-md border-b border-gray-100';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${headerBaseClass}`}>
      <div className="w-full px-8 py-3 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Contact Toggle */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-baseline gap-8">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
                <h1 className="font-serif text-xl md:text-3xl tracking-[0.15em] uppercase flex items-center group">
                  LeRoy <span className="ml-2 md:ml-3 font-light text-leroy-orange group-hover:text-leroy-black transition-colors duration-500">Residence</span>
                </h1>
              </div>
              <div className="hidden xl:flex gap-6">
                <button onClick={() => onNavigate('real_estate')} className="text-[10px] font-bold tracking-widest uppercase hover:text-leroy-orange transition-all">Propiedades en Venta</button>
                <button onClick={() => onNavigate('real_estate')} className="text-[10px] font-bold tracking-widest uppercase hover:text-leroy-orange transition-all">Propiedades en Arriendo</button>
              </div>
            </div>
            {/* Contact Buttons */}
            <div className="mt-4 flex flex-col items-start relative">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-2">Contáctame:</span>
              <div className="flex flex-col items-start gap-2">
                <button 
                  onMouseEnter={() => { setFormData(prev => ({ ...prev, type: 'vender' })); onContactHover(true); }}
                  onMouseLeave={() => onContactHover(false)}
                  className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-leroy-orange transition-colors"
                >
                  Quiero vender
                </button>
                <button 
                  onMouseEnter={() => { setFormData(prev => ({ ...prev, type: 'comprar' })); onContactHover(true); }}
                  onMouseLeave={() => onContactHover(false)}
                  className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-leroy-orange transition-colors"
                >
                  Quiero comprar
                </button>
                <button 
                  onMouseEnter={() => { setFormData(prev => ({ ...prev, type: 'arrendar' })); onContactHover(true); }}
                  onMouseLeave={() => onContactHover(false)}
                  className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-leroy-orange transition-colors"
                >
                  Quiero arrendar
                </button>
              </div>

              {/* Dropdown Contact Form */}
              <div 
                className={`absolute top-full left-0 mt-3 z-[110] transition-all duration-500 ${showContactForm ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                onMouseEnter={() => onContactHover(true)}
                onMouseLeave={() => onContactHover(false)}
              >
                <div className="bg-white p-2.5 rounded-md shadow-2xl border border-gray-100 w-56 md:w-60">
                  <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-leroy-black font-serif text-xs whitespace-nowrap">Contáctame:</h3>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="bg-transparent border-none p-0 text-[10px] font-serif text-leroy-orange outline-none cursor-pointer appearance-none"
                    >
                      <option value="vender">Quiero vender</option>
                      <option value="comprar">Quiero comprar</option>
                      <option value="arrendar">Quiero arrendar</option>
                    </select>
                  </div>
                  <form onSubmit={handleContactSubmit} className="space-y-1">
                    <input 
                      required
                      type="text" 
                      placeholder="Nombre" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded px-1.5 py-1 text-[8px] outline-none focus:border-leroy-orange transition-all text-leroy-black"
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <input 
                        required
                        type="email" 
                        placeholder="Correo" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded px-1.5 py-1 text-[8px] outline-none focus:border-leroy-orange transition-all text-leroy-black"
                      />
                      <input 
                        required
                        type="tel" 
                        placeholder="Teléfono" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded px-1.5 py-1 text-[8px] outline-none focus:border-leroy-orange transition-all text-leroy-black"
                      />
                    </div>
                    <textarea 
                      required
                      placeholder="Comentario" 
                      rows={1}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded px-1.5 py-1 text-[8px] outline-none focus:border-leroy-orange transition-all text-leroy-black resize-none"
                    ></textarea>
                    <button 
                      type="submit"
                      className="w-full bg-leroy-black text-white py-1 rounded text-[7px] font-bold uppercase tracking-widest hover:bg-leroy-orange transition-all mt-0.5"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-10">
            <button className="text-[10px] font-bold tracking-widest uppercase hover:text-leroy-orange transition-all">Favoritos</button>
            <button className="text-[10px] font-bold tracking-widest uppercase hover:text-leroy-orange transition-all">Revista</button>
          </nav>

          {/* Search Trigger */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`p-2 transition-colors ${!isHome || scrolled ? 'text-leroy-black' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Overlay Removed - Now integrated in Hero */}
    </header>
  );
};

export default Header;
