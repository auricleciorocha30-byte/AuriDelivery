
import React, { useState } from 'react';
import { VehicleType, DriverStatus, Driver } from '../types';
import { analyzeDriverProfile } from '../services/geminiService';

interface RegistrationFormProps {
  onRegister: (driver: Driver) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: VehicleType.MOTORCYCLE,
    plate: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // AI Analysis call
    const analysis = await analyzeDriverProfile(formData.bio, formData.vehicle);
    setAiAnalysis(analysis);

    const newDriver: Driver = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle: formData.vehicle,
      plate: formData.plate,
      status: DriverStatus.PENDING,
      rating: 5.0,
      totalDeliveries: 0,
      joinedAt: new Date().toISOString(),
      bio: formData.bio
    };

    onRegister(newDriver);
    setLoading(false);
    // Optional: reset form after delay or success message
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Cadastrar Novo Entregador</h1>
        <p className="text-gray-500">Preencha as informações para integrar um novo parceiro à rede AuriDelivery.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Veículo</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value as VehicleType})}
                >
                  {Object.values(VehicleType).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placa (se aplicável)</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase"
                value={formData.plate}
                onChange={(e) => setFormData({...formData, plate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Apresentação</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Conte um pouco sobre a experiência do entregador..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-solid fa-user-check"></i>
              )}
              {loading ? 'Processando...' : 'Cadastrar Entregador'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
              Análise de Perfil AI
            </h3>
            {aiAnalysis ? (
              <div className="text-sm text-gray-600 leading-relaxed bg-indigo-50 p-4 rounded-xl italic">
                {aiAnalysis}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Preencha a bio e clique em cadastrar para ver a análise inteligente do Auri-AI.</p>
            )}
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
            <h3 className="font-bold text-yellow-800 mb-2">Dica de Sucesso</h3>
            <p className="text-sm text-yellow-700">Entregadores com perfil detalhado e foto profissional têm 40% mais chances de serem selecionados para rotas premium.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
