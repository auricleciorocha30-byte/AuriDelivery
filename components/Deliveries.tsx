
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
          <div key={delivery.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {delivery.status === 'shipped' ? 'Em Trânsito' : delivery.status}
              </div>
              <span className="text-xs text-gray-400 font-medium">#{delivery.id}</span>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{delivery.customerName}</h3>
              <p className="text-sm text-gray-500 flex items-start gap-2 mb-4">
                <i className="fa-solid fa-location-dot mt-1 text-indigo-500"></i>
                {delivery.address}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${delivery.driverId}/32/32`} alt="Driver" />
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold">Entregador Responsável</p>
                  <p>Carlos Oliveira</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Previsão</p>
                <p className="text-sm font-bold text-indigo-600">{delivery.eta || 'Calculando...'}</p>
              </div>
              <button 
                onClick={() => onTrack(delivery)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
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
