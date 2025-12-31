
import React, { useState } from 'react';
import { saveAdminLogin } from '../services/supabaseService';

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done'>('idle');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação de formato de e-mail
    if (!validateEmail(email)) {
      setError('Por favor, insira um endereço de e-mail válido.');
      setLoading(false);
      return;
    }

    // Regra de validação local (Senha mock '123')
    if (password === '123') {
      setSyncStatus('syncing');
      
      // Salva o login no Supabase (Persistência externa com o E-mail)
      await saveAdminLogin(email);
      
      setSyncStatus('done');
      
      // Simulação de delay para feedback visual de sincronização
      setTimeout(() => {
        onLoginSuccess(email);
      }, 500);
    } else {
      setTimeout(() => {
        setError('Senha administrativa incorreta. Tente novamente.');
        setLoading(false);
        setSyncStatus('idle');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-800 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>

      <div className="max-w-md w-full z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
                <i className="fa-solid fa-user-shield text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Painel Gestor</h2>
              <p className="text-slate-500 font-medium text-sm mt-2 text-center">
                Identifique-se com seu e-mail administrativo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-50 text-red-500 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                  <i className="fa-solid fa-circle-exclamation text-base"></i>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail de Acesso</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="email" 
                    required
                    autoFocus
                    placeholder="gestor@auridelivery.com"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha Master</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-80"
              >
                {syncStatus === 'syncing' ? (
                  <i className="fa-solid fa-cloud-arrow-up animate-bounce"></i>
                ) : loading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-right-to-bracket"></i>
                )}
                {syncStatus === 'syncing' ? 'Verificando...' : loading ? 'Autenticando...' : 'Entrar no Sistema'}
              </button>
            </form>

            <div className="mt-8 text-center flex flex-col items-center gap-4">
              <button 
                onClick={onBack}
                className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Voltar ao Portal
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Conexão Segura Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
