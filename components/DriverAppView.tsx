
import React from 'react';
import { Driver, Delivery } from '../types';

interface DriverAppViewProps {
  currentDriver: Driver;
  deliveries: Delivery[];
  onAccept: (deliveryId: string, driverId: string) => void;
  onFinish: (deliveryId: string) => void;
  onLogout: () => void;
}

const DriverAppView: React.FC<DriverAppViewProps> = ({ currentDriver, deliveries, onAccept, onFinish, onLogout }) => {
  const availableDeliveries = deliveries.filter(d => d.status === 'pending' && (!d.driverId || d.isBroadcast));
  const myDeliveries = deliveries.filter(d => d.driverId === currentDriver.id && d.status === 'shipped');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      {/* Mock Mobile Phone Container */}
      <div className="w-full max-w-[380px] h-[780px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[10px] border-slate-800 relative overflow-hidden flex flex-col animate-in zoom-in duration-500">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 py-4 text-white text-[11px] font-bold">
          <span>{new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-signal"></i>
            <i className="fa-solid fa-wifi"></i>
            <div className="w-6 h-3 border border-white/40 rounded-sm relative flex items-center px-0.5">
              <div className="h-2 bg-white w-3/4 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Island Simulation */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-50"></div>

        {/* App Content */}
        <div className="flex-1 bg-gray-50 rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner">
          <header className="bg-indigo-600 p-6 pt-8 text-white relative">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-80 font-medium">Bom trabalho,</p>
                <h2 className="text-xl font-bold">{currentDriver.name.split(' ')[0]} 👋</h2>
              </div>
              <button 
                onClick={onLogout}
                className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md hover:bg-white/30 transition-colors"
                title="Sair da Conta"
              >
                <i className="fa-solid fa-right-from-bracket text-lg"></i>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">Ganhos Hoje</p>
                <p className="text-lg font-black text-indigo-600">R$ 42,80</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">Entregas</p>
                <p className="text-lg font-black text-indigo-600">{currentDriver.totalDeliveries}</p>
              </div>
            </div>

            {/* Online Status Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span className="text-sm font-bold text-gray-700">Você está Online</span>
              </div>
              <div className="w-11 h-6 bg-green-500 rounded-full relative p-1 flex items-center justify-end">
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            {/* In Route Section */}
            {myDeliveries.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Minha Rota</h3>
                {myDeliveries.map(delivery => (
                  <div key={delivery.id} className="bg-indigo-900 p-5 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-arrow text-indigo-400"></i>
                        <span className="text-[10px] font-bold tracking-widest">PEDIDO ATIVO</span>
                      </div>
                      <span className="text-[10px] opacity-40">#{delivery.id}</span>
                    </div>
                    <p className="text-lg font-bold mb-1">{delivery.customerName}</p>
                    <p className="text-xs text-indigo-200 mb-6 leading-relaxed">
                      {delivery.address}
                    </p>
                    <button 
                      onClick={() => onFinish(delivery.id)}
                      className="w-full bg-yellow-400 text-indigo-900 py-4 rounded-2xl font-black text-xs hover:bg-yellow-300 active:scale-95 transition-all shadow-lg shadow-yellow-400/20 uppercase tracking-widest"
                    >
                      Finalizar Entrega
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Opportunities Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Oportunidades</h3>
              {availableDeliveries.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-radar text-gray-300 text-2xl"></i>
                  </div>
                  <p className="text-xs text-gray-400 font-bold">Procurando pedidos ao seu redor...</p>
                </div>
              ) : (
                availableDeliveries.map(delivery => (
                  <div key={delivery.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 group animate-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-indigo-600 tracking-widest mb-1 uppercase">Nova Entrega</span>
                        <p className="font-bold text-gray-800 text-base">{delivery.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-green-600">R$ 15,90</p>
                        <p className="text-[10px] font-bold text-gray-400">Entrega imediata</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <i className="fa-solid fa-map-pin text-indigo-500"></i>
                      <span className="truncate font-medium">{delivery.address}</span>
                    </div>
                    <button 
                      onClick={() => onAccept(delivery.id, currentDriver.id)}
                      className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg shadow-indigo-100"
                    >
                      <i className="fa-solid fa-bolt text-yellow-400"></i>
                      Aceitar Agora
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <nav className="bg-white border-t border-gray-100 p-4 pb-6 flex justify-around items-center">
            <div className="flex flex-col items-center gap-1 text-indigo-600">
              <i className="fa-solid fa-motorcycle text-xl"></i>
              <span className="text-[9px] font-black uppercase tracking-tighter">Corridas</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-indigo-400 transition-colors">
              <i className="fa-solid fa-wallet text-xl"></i>
              <span className="text-[9px] font-black uppercase tracking-tighter">Carteira</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-indigo-400 transition-colors">
              <i className="fa-solid fa-circle-user text-xl"></i>
              <span className="text-[9px] font-black uppercase tracking-tighter">Perfil</span>
            </div>
          </nav>
        </div>

        {/* Home Indicator */}
        <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mb-2 mt-4"></div>
      </div>
    </div>
  );
};

export default DriverAppView;
