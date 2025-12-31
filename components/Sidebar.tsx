
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  pendingCount: number;
  adminName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, pendingCount, adminName }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'drivers', icon: 'fa-users', label: 'Entregadores' },
    { id: 'approvals', icon: 'fa-user-check', label: 'Aprovações', badge: pendingCount },
    { id: 'register', icon: 'fa-user-plus', label: 'Cadastrar Entregador' },
    { id: 'deliveries', icon: 'fa-box', label: 'Lista de Entregas' },
    { id: 'new-delivery', icon: 'fa-truck-ramp-box', label: 'Lançar Entrega' },
    { id: 'settings', icon: 'fa-gear', label: 'Configurações' },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white min-h-screen p-4 flex flex-col hidden md:flex">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="bg-yellow-400 p-2 rounded-lg text-indigo-900">
          <i className="fa-solid fa-truck-fast text-xl"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">AuriDelivery</span>
      </div>

      <div className="bg-indigo-800/50 rounded-2xl p-4 mb-6 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border border-indigo-400 font-bold text-xs">
            {adminName.substring(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest">Administrador</p>
            <p className="text-sm font-bold truncate">{adminName}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id 
                ? 'bg-indigo-700 text-white shadow-lg' 
                : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-yellow-400 text-indigo-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="p-4 bg-indigo-800 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider">Sistema Online</p>
          </div>
          <p className="text-xs text-white/80 leading-tight italic">Painel de Controle</p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm"
        >
          <i className="fa-solid fa-right-from-bracket w-5"></i>
          Encerrar Sessão
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
