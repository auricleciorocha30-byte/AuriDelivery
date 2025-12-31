
import React, { useState } from 'react';
import { saveAdminLogin, checkAdminExists } from '../services/supabaseService';

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
  onBack: () => void;
  onGoToRegister: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack, onGoToRegister }) => {
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

    if (!validateEmail(email)) {
      setError('Por favor, insira um endereço de e-mail válido.');
      setLoading(false);
      return;
    }

    setSyncStatus('syncing');

    try {
      // Verifica se o gestor existe no Supabase
      const exists = await checkAdminExists(email);

      // Simulação de autenticação (Senha '123' para fins de demo ou validação real via Supabase Auth se implementado)
      if (password === '123') {
        // Se a conta não existe, avisamos mas permitimos entrar (para não bloquear o usuário caso a tabela não esteja pronta)
        // Em um sistema real, aqui checaríamos a senha via Auth.
        await saveAdminLogin(email);
        setSyncStatus('done');
        
        setTimeout(() => {
          onLoginSuccess(email);
        }, 500);
      } else {
        throw new Error('Senha incorreta.');
      }
    } catch (err: any) {
      setError(err.message || 'Falha na autenticação.');
      setLoading(false);
      setSyncStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-indigo-200 rotate-3">
                <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center">Gestão Auri</h2>
              <p className="text-slate-400 font-medium text-sm mt-2 text-center">
                Acesse o centro de comando logístico.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                  <i className="fa-solid fa-triangle-exclamation text-base"></i>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail Corporativo</label>
                <div className="relative group">
                  <i className="fa-solid fa-at absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
                  <input 
                    type="email" 
                    required
                    autoFocus
                    placeholder="gestor@auridelivery.com"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all text-slate-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Chave de Segurança</label>
                <div className="relative group">
                  <i className="fa-solid fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold transition-all text-slate-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
              >
                {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-unlock-keyhole"></i>}
                {syncStatus === 'syncing' ? 'Sincronizando...' : 'Entrar no Sistema'}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <button 
                onClick={onGoToRegister}
                className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest"
              >
                Criar nova conta de gestor
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
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
