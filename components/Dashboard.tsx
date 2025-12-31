
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getAdminLogins } from '../services/supabaseService';

const data = [
  { name: 'Seg', entregas: 40 },
  { name: 'Ter', entregas: 30 },
  { name: 'Qua', entregas: 65 },
  { name: 'Qui', entregas: 45 },
  { name: 'Sex', entregas: 90 },
  { name: 'Sab', entregas: 120 },
  { name: 'Dom', entregas: 80 },
];

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`${color} p-4 rounded-xl text-white`}>
      <i className={`fa-solid ${icon} text-xl`}></i>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [recentLogins, setRecentLogins] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getAdminLogins();
      setRecentLogins(logs || []);
      setLoadingLogs(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
          <p className="text-gray-500">Bem-vindo de volta ao centro de controle AuriDelivery.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Supabase Cloud Live</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Entregadores Ativos" value="24" icon="fa-person-biking" color="bg-indigo-600" />
        <StatCard title="Entregas Hoje" value="156" icon="fa-box" color="bg-green-500" />
        <StatCard title="Tempo Médio" value="22 min" icon="fa-clock" color="bg-orange-500" />
        <StatCard title="Faturamento" value="R$ 4.520" icon="fa-wallet" color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Volume de Entregas (Semana)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEntregas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="entregas" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEntregas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Logs do Supabase */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Acessos Gestão</h3>
            <i className="fa-solid fa-cloud text-indigo-200"></i>
          </div>
          
          <div className="flex-1 space-y-4">
            {loadingLogs ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <i className="fa-solid fa-circle-notch fa-spin text-indigo-300 text-2xl"></i>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sincronizando logs...</p>
              </div>
            ) : recentLogins.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xs text-gray-400">Nenhum log persistido ainda.</p>
              </div>
            ) : (
              recentLogins.map((login, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-indigo-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 text-xs font-bold">
                    {login.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">{login.email}</p>
                    <p className="text-[9px] text-gray-400 font-medium">
                      {new Date(login.logged_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <i className="fa-solid fa-check-double text-[10px] text-green-400"></i>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              Auditoria de Segurança • Supabase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
