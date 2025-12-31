
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
    notes: '',
    originMode: 'store' as 'store' | 'custom',
    customOriginAddress: ''
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
      originName: formData.originMode === 'store' ? storeConfig.name : 'Origem Esporádica',
      originAddress: formData.originMode === 'store' ? storeConfig.address : formData.customOriginAddress,
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
      setFormData({ 
        customerName: '', 
        address: '', 
        driverId: '', 
        notes: '', 
        originMode: 'store', 
        customOriginAddress: '' 
      });
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Lançar Nova Entrega</h1>
        <p className="text-gray-500">Registre o pedido, defina a origem e escolha o entregador.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-bounce">
            <i className="fa-solid fa-circle-check text-xl"></i>
            <span className="font-bold text-sm">Pedido lançado com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção de Origem */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ponto de Partida</label>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, originMode: 'store'})}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    formData.originMode === 'store' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  Minha Loja
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, originMode: 'custom'})}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    formData.originMode === 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  Outro Local
                </button>
              </div>
            </div>

            {formData.originMode === 'store' ? (
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center gap-4 animate-in fade-in slide-in-from-left-2">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <i className="fa-solid fa-warehouse"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase">Loja Configurada</p>
                  <p className="text-sm font-bold text-indigo-900">{storeConfig.name}</p>
                  <p className="text-[10px] text-indigo-400 truncate max-w-[250px]">{storeConfig.address}</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 space-y-3 animate-in fade-in slide-in-from-right-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                    <i className="fa-solid fa-truck-ramp-box"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-amber-500 uppercase">Origem Esporádica</p>
                    <p className="text-xs font-bold text-amber-900 leading-tight">Defina o endereço onde o entregador deve retirar este pedido.</p>
                  </div>
                </div>
                <div className="relative">
                  <i className="fa-solid fa-location-arrow absolute left-4 top-1/2 -translate-y-1/2 text-amber-400"></i>
                  <input
                    type="text"
                    required
                    placeholder="Endereço completo da retirada esporádica"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 bg-white focus:border-amber-500 outline-none transition-all text-sm font-medium"
                    value={formData.customOriginAddress}
                    onChange={(e) => setFormData({...formData, customOriginAddress: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Dados do Cliente / Destino */}
            <div className="pt-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Dados do Destinatário</label>
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Nome do Cliente"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    required
                    placeholder="Endereço de Entrega (Destino)"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Atribuição */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Atribuição de Entrega</label>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, driverId: ''})}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                    !formData.driverId 
                    ? 'border-indigo-600 bg-white shadow-md' 
                    : 'border-transparent bg-gray-100 hover:bg-gray-200 text-gray-500'
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
                      formData.driverId ? 'border-indigo-600 shadow-md font-bold' : 'border-gray-100 text-gray-400'
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
            className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
            {loading ? 'Processando Lançamento...' : formData.driverId ? 'Confirmar Entrega Direta' : 'Iniciar Disparo para Todos'}
          </button>
        </form>
      </div>

      <div className="bg-indigo-900 p-6 rounded-2xl flex gap-4 text-white">
        <i className="fa-solid fa-circle-info text-yellow-400 mt-1"></i>
        <div className="text-xs">
          <p className="font-bold mb-1">Dica de Logística</p>
          <p className="text-indigo-200 leading-relaxed">
            Ao utilizar uma <strong>Origem Esporádica</strong>, o sistema calculará o trajeto do entregador partindo diretamente do novo endereço informado, garantindo previsões de chegada mais precisas para o cliente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
