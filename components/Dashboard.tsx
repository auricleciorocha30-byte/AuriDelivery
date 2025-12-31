
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo de volta ao centro de controle AuriDelivery.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Entregadores Ativos" value="24" icon="fa-person-biking" color="bg-indigo-600" />
        <StatCard title="Entregas Hoje" value="156" icon="fa-box" color="bg-green-500" />
        <StatCard title="Tempo Médio" value="22 min" icon="fa-clock" color="bg-orange-500" />
        <StatCard title="Faturamento" value="R$ 4.520" icon="fa-wallet" color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/40/40`} alt="Avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Ricardo Souza</p>
                    <p className="text-xs text-gray-500">Entrega finalizada em Pinheiros</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">Há 5 min</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-indigo-600 text-sm font-semibold hover:underline">Ver todas as atividades</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
