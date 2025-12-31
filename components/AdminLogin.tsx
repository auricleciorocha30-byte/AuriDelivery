
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulação de delay de segurança
    setTimeout(() => {
      if (password === '123') {
        onLoginSuccess();
      } else {
        setError('Senha administrativa incorreta. Tente novamente.');
        setLoading(false);
      }
    }, 800);
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
                <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Painel Gestor</h2>
              <p className="text-slate-500 font-medium text-sm mt-2 text-center">
                Acesso restrito para administradores AuriDelivery.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-500 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                  <i className="fa-solid fa-circle-exclamation text-base"></i>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="password" 
                    required
                    autoFocus
                    placeholder="Sua senha master"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-lg transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-right-to-bracket"></i>
                )}
                {loading ? 'Autenticando...' : 'Entrar no Sistema'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={onBack}
                className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Voltar ao Portal
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                Tecnologia AuriDelivery &copy; 2024 - Todos os direitos reservados
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
