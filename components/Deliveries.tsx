
import React from 'react';
import { Delivery } from '../types';

interface DeliveriesProps {
  deliveries: Delivery[];
  onTrack: (delivery: Delivery) => void;
}

const Deliveries: React.FC<DeliveriesProps> = ({ deliveries, onTrack }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Entregas</h1>
        <p className="text-gray-500">Acompanhe o status de todos os pedidos em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl hover:shadow-indigo-100/20 transition-all border-b-4 border-b-indigo-500">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                {delivery.status === 'shipped' ? 'Em Trânsito' : delivery.status === 'delivered' ? 'Concluído' : 'Aguardando'}
              </div>
              <span className="text-[10px] text-gray-400 font-black">#{delivery.id}</span>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{delivery.customerName}</h3>
              <p className="text-xs text-gray-500 flex items-start gap-2 mb-4 italic">
                <i className="fa-solid fa-location-dot mt-1 text-indigo-500"></i>
                {delivery.address}
              </p>
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600">
                    <i className="fa-solid fa-user-gear text-xs"></i>
                  </div>
                  <div className="text-[10px]">
                    <p className="text-gray-400 uppercase font-black">Operador Responsável</p>
                    <p className="font-bold text-gray-700">{delivery.createdBy || 'Sistema Auri'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 shadow-sm flex items-center justify-center text-white">
                    <i className="fa-solid fa-motorcycle text-xs"></i>
                  </div>
                  <div className="text-[10px]">
                    <p className="text-indigo-200 uppercase font-black">Entregador</p>
                    <p className="font-bold text-indigo-900">{delivery.driverId ? 'Designado' : 'Aguardando Aceite'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">Chegada</p>
                <p className="text-sm font-black text-indigo-600">{delivery.eta || 'Calculando...'}</p>
              </div>
              <button 
                onClick={() => onTrack(delivery)}
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <i className="fa-solid fa-map-location-dot"></i>
                Rastrear
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
