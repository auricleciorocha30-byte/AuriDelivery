
import React, { useState, useEffect } from 'react';
import { Delivery, StoreConfig } from '../types';

interface TrackingViewProps {
  delivery: Delivery;
  storeConfig: StoreConfig;
  onBack: () => void;
}

const TrackingView: React.FC<TrackingViewProps> = ({ delivery, storeConfig, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 70 });

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0; // Restart for simulation
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Calculate current point on a simple curve for the visual "map"
  useEffect(() => {
    // Simple path simulation from (20,70) to (80,30)
    const startX = 20;
    const endX = 80;
    const startY = 70;
    const endY = 30;

    const currentX = startX + (endX - startX) * (progress / 100);
    const currentY = startY + (endY - startY) * (progress / 100) + Math.sin(progress * 0.1) * 5;

    setPosition({ x: currentX, y: currentY });
  }, [progress]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Rastreamento do Pedido #{delivery.id}</h1>
      </div>

      <div className="flex-1 relative bg-slate-100 rounded-3xl overflow-hidden shadow-inner border-4 border-white">
        {/* Simple Simulated Map Grid */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Simulated Roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0,50 Q 50,20 100,50" stroke="#e2e8f0" strokeWidth="2" fill="none" />
          <path d="M 20,100 L 80,0" stroke="#e2e8f0" strokeWidth="2" fill="none" />
          <path d="M 0,30 Q 50,80 100,30" stroke="#e2e8f0" strokeWidth="2" fill="none" />
          
          {/* Active Delivery Path */}
          <path 
            d={`M 20,70 Q 50,${70 + Math.sin(50 * 0.1) * 5} 80,30`} 
            stroke="#4f46e5" 
            strokeWidth="0.5" 
            fill="none" 
            strokeDasharray="2,2" 
          />
        </svg>

        {/* Origin Marker (Dinamizado) */}
        <div className="absolute left-[20%] bottom-[30%] -translate-x-1/2 -translate-y-1/2">
          <div className="bg-indigo-600 p-2 rounded-full shadow-lg">
            <i className="fa-solid fa-store text-white text-xs"></i>
          </div>
          <p className="text-[10px] font-bold text-indigo-900 mt-1 whitespace-nowrap">{storeConfig.name}</p>
        </div>

        {/* Destination Marker */}
        <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2">
          <div className="bg-green-500 p-2 rounded-full shadow-lg animate-bounce">
            <i className="fa-solid fa-house-user text-white text-xs"></i>
          </div>
          <p className="text-[10px] font-bold text-green-900 mt-1 whitespace-nowrap">{delivery.customerName}</p>
        </div>

        {/* Driver Marker (The Moving Element) */}
        <div 
          className="absolute transition-all duration-100 ease-linear z-10"
          style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-full animate-ping"></div>
            <div className="bg-white p-2 rounded-full shadow-xl border-2 border-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-motorcycle text-indigo-600 text-lg"></i>
            </div>
          </div>
        </div>

        {/* Info Card Floating */}
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/driver-1/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Carlos Oliveira</h4>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                <span className="text-sm font-bold">4.8</span>
                <span className="text-xs text-gray-400 ml-1">• Honda CG 160</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Chegada em</p>
              <p className="text-lg font-bold text-indigo-600">8 min</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Distância</p>
              <p className="text-lg font-bold text-gray-700">1.2 km</p>
            </div>
          </div>

          <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <i className="fa-solid fa-comment-dots"></i>
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
