
import React from 'react';

interface LandingPageProps {
  onSelectMode: (mode: 'admin' | 'driver-login' | 'driver-register') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos Visuais de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-800 rounded-full blur-[150px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[150px] opacity-30"></div>

      <div className="max-w-5xl w-full z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <i className="fa-solid fa-truck-fast text-yellow-400 text-xl"></i>
          <span className="text-white font-bold tracking-[0.2em] uppercase text-xs">AuriDelivery Ecosystem</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
          Logística inteligente para <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">negócios que não param.</span>
        </h1>
        
        <p className="text-indigo-200 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-medium opacity-80">
          Escolha como deseja acessar a plataforma. Gerencie sua operação ou comece a lucrar com suas entregas hoje mesmo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card Admin */}
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-left hover:bg-white/10 transition-all hover:scale-[1.02] hover:border-indigo-400 shadow-2xl flex flex-col">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform">
              <i className="fa-solid fa-chart-line text-white text-3xl"></i>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Painel Gestor</h3>
            <p className="text-indigo-300 text-sm leading-relaxed mb-10 flex-1">
              Administre frotas, monitore entregas em tempo real, gerencie pagamentos e visualize métricas de desempenho da sua unidade.
            </p>
            <button 
              onClick={() => onSelectMode('admin')}
              className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-xl"
            >
              Acessar Gestão
            </button>
          </div>

          {/* Card Driver */}
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-left hover:bg-white/10 transition-all hover:scale-[1.02] hover:border-green-400 shadow-2xl flex flex-col">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform">
              <i className="fa-solid fa-motorcycle text-white text-3xl"></i>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">App Entregador</h3>
            <p className="text-indigo-300 text-sm leading-relaxed mb-10 flex-1">
              Receba ofertas de corridas, escolha seus horários e acompanhe seus ganhos em tempo real com nosso app intuitivo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => onSelectMode('driver-login')}
                className="bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-colors"
              >
                Fazer Login
              </button>
              <button 
                onClick={() => onSelectMode('driver-register')}
                className="bg-green-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-400 transition-colors"
              >
                Seja Parceiro
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-200">
           <div className="flex items-center gap-2 text-white font-black italic text-xl">AURILOG</div>
           <div className="flex items-center gap-2 text-white font-black italic text-xl">FASTFLEET</div>
           <div className="flex items-center gap-2 text-white font-black italic text-xl">GO-DELIVERY</div>
        </div>

        <p className="mt-16 text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; 2024 Auri Technology Group. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
