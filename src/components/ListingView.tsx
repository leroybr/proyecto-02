import React from 'react';
import { Property } from '../types';
import { MapPin, ArrowLeft } from 'lucide-react';

interface ListingViewProps {
  category: string;
  properties: Property[];
  onClearFilters: () => void;
  onPropertyClick: (id: string) => void;
  onGoHome: () => void;
}

const ListingView: React.FC<ListingViewProps> = ({ properties, onPropertyClick, onGoHome }) => {
  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onGoHome} className="text-gray-400 hover:text-black transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-5xl font-serif">Propiedades de Lujo</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {properties.map((p) => (
          <div 
            key={p.id} 
            className="group cursor-pointer"
            onClick={() => onPropertyClick(p.id)}
          >
            <div className="aspect-[4/5] overflow-hidden mb-6 relative">
              <img 
                src={p.imageUrl} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                {p.currency} {p.price.toLocaleString()}
              </div>
            </div>
            <h3 className="text-2xl font-serif mb-2 group-hover:text-orange-500 transition-colors">{p.title}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{p.subtitle}</p>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{p.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingView;
