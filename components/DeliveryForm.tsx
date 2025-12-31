
import React, { useState } from 'react';
import { Delivery, Driver, DriverStatus, StoreConfig } from '../types';

interface DeliveryFormProps {
  drivers: Driver[];
  storeConfig: StoreConfig;
  onLaunch: (delivery: Delivery) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ drivers, storeConfig, onLaunch }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    driverId: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activeDrivers = drivers.filter(d => d.status === DriverStatus.ACTIVE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isBroadcast = !formData.driverId;

    const newDelivery: Delivery = {
      id: `DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.customerName,
      address: formData.address,
      status: isBroadcast ? 'pending' : 'shipped',
      driverId: formData.driverId || undefined,
      timestamp: new Date().toISOString(),
      eta: `${Math.floor(15 + Math.random() * 30)} min`,
      isBroadcast: isBroadcast
    };

    // Simulate API delay
    setTimeout(() => {
      onLaunch(newDelivery);
      setLoading(false);
      setSuccess(true);
      setFormData({ customerName: '', address: '', driverId: '', notes: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Lançar Nova Entrega</h1>
        <p className="text-gray-500">Registre o pedido e selecione se deseja enviar para todos ou um entregador específico.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-bounce">
            <i className="fa-solid fa-circle-check text-xl"></i>
            <span className="font-bold text-sm">Pedido lançado com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                <i className="fa-solid fa-warehouse"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Origem da Entrega</p>
                <p className="text-sm font-bold text-slate-700">{storeConfig.name}</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[250px]">{storeConfig.address}</p>
              </div>
              <div className="ml-auto">
                 <span className="text-[9px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-black uppercase">Fixo</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Cliente</label>
              <input
                type="text"
                required
                placeholder="Ex: Maria Oliveira"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço de Entrega (Destino)</label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  required
                  placeholder="Rua, Número, Bairro, Cidade"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <label className="block text-sm font-bold text-indigo-900 mb-3">Atribuição de Entrega</label>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, driverId: ''})}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                    !formData.driverId 
                    ? 'border-indigo-600 bg-white shadow-md' 
                    : 'border-transparent bg-indigo-100/50 hover:bg-indigo-100 text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <i className="fa-solid fa-tower-broadcast text-xl"></i>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">Disparar para todos</p>
                      <p className="text-[10px] opacity-70">O primeiro que aceitar no app leva</p>
                    </div>
                  </div>
                  {!formData.driverId && <i className="fa-solid fa-circle-check text-indigo-600 text-xl"></i>}
                </button>

                <div className="relative">
                  <select
                    className={`w-full px-4 py-3 pl-12 rounded-xl border-2 outline-none transition-all appearance-none bg-white ${
                      formData.driverId ? 'border-indigo-600 shadow-md' : 'border-transparent border-gray-100'
                    }`}
                    value={formData.driverId}
                    onChange={(e) => setFormData({...formData, driverId: e.target.value})}
                  >
                    <option value="">Ou escolher um entregador fixo...</option>
                    {activeDrivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.vehicle})
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-user-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
            {loading ? 'Lançando...' : formData.driverId ? 'Confirmar Entrega Direta' : 'Iniciar Disparo para Todos'}
          </button>
        </form>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3">
        <i className="fa-solid fa-circle-info text-yellow-600 mt-1"></i>
        <p className="text-xs text-yellow-800 leading-relaxed">
          As entregas são calculadas partindo de <strong>{storeConfig.address}</strong>.
        </p>
      </div>
    </div>
  );
};

export default DeliveryForm;
