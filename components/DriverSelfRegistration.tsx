
import React, { useState } from 'react';
import { VehicleType, DriverStatus, Driver } from '../types';

interface DriverSelfRegistrationProps {
  onRegister: (driver: Driver) => void;
  onBack: () => void;
}

const DriverSelfRegistration: React.FC<DriverSelfRegistrationProps> = ({ onRegister, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: VehicleType.MOTORCYCLE,
    plate: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newDriver: Driver = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle: formData.vehicle,
      plate: formData.plate,
      status: DriverStatus.PENDING, // Cadastro via app entra como pendente
      rating: 5.0,
      totalDeliveries: 0,
      joinedAt: new Date().toISOString(),
      bio: formData.bio
    };

    setTimeout(() => {
      onRegister(newDriver);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] h-[780px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-50"></div>
        
        <div className="flex-1 bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
          <header className="bg-white border-b border-slate-100 p-6 pt-10 flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="text-xl font-black text-slate-800">Seja Parceiro</h2>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                Junte-se à maior rede de entregas da região. Complete seus dados para análise.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">E-mail</label>
                <input 
                  type="email" 
                  required
                  placeholder="exemplo@auri.com"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Veículo</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all appearance-none"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({...formData, vehicle: e.target.value as VehicleType})}
                  >
                    {Object.values(VehicleType).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Placa</label>
                  <input 
                    type="text" 
                    placeholder="AAA-0000"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm uppercase transition-all"
                    value={formData.plate}
                    onChange={(e) => setFormData({...formData, plate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Sua Bio (Opcional)</label>
                <textarea 
                  rows={2}
                  placeholder="Conte-nos sua experiência..."
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 mt-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
                {loading ? 'Enviando...' : 'Finalizar Cadastro'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mb-2 mt-4"></div>
      </div>
    </div>
  );
};

export default DriverSelfRegistration;
