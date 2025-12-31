
import React, { useState } from 'react';
import { StoreConfig } from '../types';

interface SettingsViewProps {
  config: StoreConfig;
  adminName: string;
  onUpdate: (newConfig: StoreConfig) => void;
  onUpdateAdminName: (newName: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ config, adminName, onUpdate, onUpdateAdminName }) => {
  const [storeData, setStoreData] = useState<StoreConfig>(config);
  const [userData, setUserData] = useState({ name: adminName });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      onUpdate(storeData);
      onUpdateAdminName(userData.name);
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Ajustes do Sistema</h1>
        <p className="text-gray-500">Gerencie as informações da loja e do seu perfil de gestor.</p>
      </header>

      {showToast && (
        <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <i className="fa-solid fa-circle-check"></i>
          <span className="font-bold text-sm">Configurações atualizadas com sucesso!</span>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Perfil do Usuário */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-900 text-white rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-user-gear text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Seu Perfil de Usuário</h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome de Exibição (Operador)</label>
              <div className="relative">
                <i className="fa-solid fa-signature absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome completo"
                  className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                  value={userData.name}
                  onChange={(e) => setUserData({ name: e.target.value })}
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Localização da Unidade */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-store text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Dados da Loja</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome da Unidade</label>
                <div className="relative">
                  <i className="fa-solid fa-tag absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Auri Central"
                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                    value={storeData.name}
                    onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Endereço de Origem Padrão</label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-5 top-12 -translate-y-1/2 text-gray-300"></i>
                  <textarea 
                    required
                    rows={2}
                    placeholder="Endereço da loja"
                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                    value={storeData.address}
                    onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSaving ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fa-solid fa-floppy-disk"></i>
            )}
            {isSaving ? 'Salvando Ajustes...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsView;
