
import React from 'react';
import { Driver, DriverStatus, VehicleType } from '../types';

interface DriverApprovalProps {
  drivers: Driver[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const DriverApproval: React.FC<DriverApprovalProps> = ({ drivers, onApprove, onReject }) => {
  const pendingDrivers = drivers.filter(d => d.status === DriverStatus.PENDING);

  const getVehicleIcon = (vehicle: VehicleType) => {
    switch (vehicle) {
      case VehicleType.BICYCLE: return 'fa-bicycle';
      case VehicleType.MOTORCYCLE: return 'fa-motorcycle';
      case VehicleType.CAR: return 'fa-car';
      case VehicleType.VAN: return 'fa-truck-ramp-box';
      default: return 'fa-truck';
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Aprovar Novos Parceiros</h1>
        <p className="text-gray-500">Analise os dados e decida quem fará parte da frota AuriDelivery.</p>
      </header>

      {pendingDrivers.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
            <i className="fa-solid fa-user-clock text-4xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-400">Nenhuma aprovação pendente</h3>
          <p className="text-gray-400 text-sm mt-2">Novos cadastros aparecerão aqui automaticamente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingDrivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden border-2 border-indigo-100">
                    <img src={`https://picsum.photos/seed/${driver.id}/64/64`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{driver.name}</h3>
                    <p className="text-sm text-gray-400">{driver.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <i className={`fa-solid ${getVehicleIcon(driver.vehicle)} text-indigo-500 text-xs`}></i>
                       <span className="text-xs font-bold text-gray-600 uppercase">{driver.vehicle} {driver.plate && `• ${driver.plate}`}</span>
                    </div>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Pendente
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl mb-6 flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Apresentação / Bio</p>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{driver.bio || 'Nenhuma bio fornecida pelo candidato.'}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onReject(driver.id)}
                  className="py-3 rounded-xl border-2 border-red-50 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-user-xmark"></i>
                  Recusar
                </button>
                <button 
                  onClick={() => onApprove(driver.id)}
                  className="py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-user-check"></i>
                  Aprovar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverApproval;
