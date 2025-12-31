
import React, { useState } from 'react';
import { Driver } from '../types';

interface DriverLoginProps {
  drivers: Driver[];
  onLoginSuccess: (driver: Driver) => void;
  onBack: () => void;
  onGoToRegister: () => void;
}

const DriverLogin: React.FC<DriverLoginProps> = ({ drivers, onLoginSuccess, onBack, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const driver = drivers.find(d => d.email.toLowerCase() === email.toLowerCase());
      
      if (driver) {
        onLoginSuccess(driver);
      } else {
        setError('E-mail não encontrado ou credenciais inválidas.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] h-[780px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col animate-in zoom-in duration-300">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-50"></div>
        
        <div className="flex-1 bg-white rounded-[2.5rem] overflow-hidden flex flex-col p-8 justify-center">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-truck-fast text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-800">AuriDelivery</h2>
            <p className="text-slate-400 text-sm font-medium">App do Entregador</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-[10px] font-bold rounded-xl border border-red-100 text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Seu E-mail</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="email" 
                  required
                  placeholder="exemplo@auri.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Senha</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-right-to-bracket"></i>}
              {loading ? 'Entrando...' : 'Acessar Conta'}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <button 
              onClick={onGoToRegister}
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest"
            >
              Quero ser um entregador
            </button>
            <br />
            <button 
              onClick={onBack}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.2em]"
            >
              Voltar ao Portal
            </button>
          </div>
        </div>
        
        <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mb-2 mt-4"></div>
      </div>
    </div>
  );
};

export default DriverLogin;
