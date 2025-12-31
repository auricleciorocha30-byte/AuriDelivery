
import React, { useState } from 'react';
import { StoreConfig } from '../types';

interface SettingsViewProps {
  config: StoreConfig;
  onUpdate: (newConfig: StoreConfig) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<StoreConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simular salvamento
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Configurações da Loja</h1>
        <p className="text-gray-500">Defina o ponto de partida das suas entregas e informações da unidade.</p>
      </header>

      {showToast && (
        <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <i className="fa-solid fa-circle-check"></i>
          <span className="font-bold text-sm">Configurações atualizadas com sucesso!</span>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600">
              <i className="fa-solid fa-store text-3xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Localização da Unidade</h3>
              <p className="text-sm text-gray-400">Este endereço será usado como origem em todos os cálculos de rota.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome da Loja / Unidade</label>
              <div className="relative">
                <i className="fa-solid fa-tag absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Auri Central Matriz"
                  className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Endereço Completo de Partida</label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-5 top-14 -translate-y-1/2 text-gray-300"></i>
                <textarea 
                  required
                  rows={3}
                  placeholder="Rua, Número, Bairro, Cidade, CEP"
                  className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isSaving ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fa-solid fa-floppy-disk"></i>
            )}
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </form>
      </div>

      <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h4 className="font-bold mb-2">Por que configurar o endereço?</h4>
          <p className="text-sm text-indigo-200 leading-relaxed">
            Ao cadastrar o endereço da sua loja, o sistema AuriDelivery calcula automaticamente o tempo de deslocamento dos entregadores até você e o tempo estimado de chegada ao cliente, otimizando toda a logística da operação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
