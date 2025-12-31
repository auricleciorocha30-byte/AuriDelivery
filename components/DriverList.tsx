
import React from 'react';
import { Driver, DriverStatus, VehicleType } from '../types';

interface DriverListProps {
  drivers: Driver[];
}

const DriverList: React.FC<DriverListProps> = ({ drivers }) => {
  const getStatusColor = (status: DriverStatus) => {
    switch (status) {
      case DriverStatus.ACTIVE: return 'bg-green-100 text-green-700';
      case DriverStatus.ON_DELIVERY: return 'bg-blue-100 text-blue-700';
      case DriverStatus.INACTIVE: return 'bg-gray-100 text-gray-700';
      case DriverStatus.PENDING: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header>
          <h1 className="text-2xl font-bold text-gray-800">Entregadores Parceiros</h1>
          <p className="text-gray-500">Gerencie e acompanhe o desempenho da sua frota.</p>
        </header>
        <div className="flex gap-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar entregador..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
          </div>
          <button className="bg-white p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            <i className="fa-solid fa-filter text-gray-600"></i>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Entregador</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Veículo</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Avaliação</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Entregas</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                        <img src={`https://picsum.photos/seed/${driver.id}/40/40`} alt="" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{driver.name}</p>
                        <p className="text-xs text-gray-500">{driver.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <i className={`fa-solid ${getVehicleIcon(driver.vehicle)} text-indigo-500`}></i>
                      <span className="text-sm">{driver.vehicle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                      <span className="font-bold text-sm">{driver.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-gray-700">{driver.totalDeliveries}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverList;
