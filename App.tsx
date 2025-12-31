
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import DriverList from './components/DriverList';
import DriverApproval from './components/DriverApproval';
import Deliveries from './components/Deliveries';
import TrackingView from './components/TrackingView';
import DeliveryForm from './components/DeliveryForm';
import SettingsView from './components/SettingsView';
import DriverAppView from './components/DriverAppView';
import DriverLogin from './components/DriverLogin';
import AdminLogin from './components/AdminLogin';
import DriverSelfRegistration from './components/DriverSelfRegistration';
import LandingPage from './components/LandingPage';
import { Driver, VehicleType, DriverStatus, Delivery, StoreConfig } from './types';

const MOCK_DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    email: 'carlos@auri.com',
    phone: '(11) 98888-7777',
    vehicle: VehicleType.MOTORCYCLE,
    plate: 'ABC-1234',
    status: DriverStatus.ACTIVE,
    rating: 4.8,
    totalDeliveries: 452,
    joinedAt: '2023-01-15',
    bio: 'Experiente com frotas rápidas.'
  },
  {
    id: '2',
    name: 'Ana Beatriz',
    email: 'ana@auri.com',
    phone: '(11) 97777-6666',
    vehicle: VehicleType.BICYCLE,
    plate: '',
    status: DriverStatus.ACTIVE,
    rating: 4.9,
    totalDeliveries: 128,
    joinedAt: '2023-05-20',
    bio: 'Entregas sustentáveis.'
  },
  {
    id: '3',
    name: 'Roberto Santos',
    email: 'roberto@parceiro.com',
    phone: '(11) 91111-2222',
    vehicle: VehicleType.VAN,
    plate: 'GHI-9090',
    status: DriverStatus.PENDING,
    rating: 5.0,
    totalDeliveries: 0,
    joinedAt: '2024-03-01',
    bio: 'Possuo van própria e disponibilidade imediata para grandes volumes.'
  }
];

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: 'DEL-001',
    customerName: 'Mariana Silva',
    address: 'Av. Paulista, 1000 - Bela Vista',
    status: 'shipped',
    driverId: '1',
    timestamp: new Date().toISOString(),
    eta: '12 min',
    createdBy: 'Admin Master'
  }
];

const DEFAULT_STORE: StoreConfig = {
  name: 'Auri Central Matriz',
  address: 'Rua das Flores, 123 - Centro, São Paulo - SP'
};

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<'portal' | 'admin-login' | 'admin' | 'driver-login' | 'driver-app' | 'driver-register'>('portal');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [deliveries, setDeliveries] = useState<Delivery[]>(MOCK_DELIVERIES);
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_STORE);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [loggedInDriver, setLoggedInDriver] = useState<Driver | null>(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState<string | null>(null);

  const pendingCount = drivers.filter(d => d.status === DriverStatus.PENDING).length;

  const handleRegisterDriver = (newDriver: Driver) => {
    setDrivers(prev => [newDriver, ...prev]);
    if (appMode === 'driver-register') {
      alert('Cadastro realizado com sucesso! Nossa equipe analisará seus dados em breve.');
      setAppMode('driver-login');
    }
  };

  const handleApproveDriver = (id: string) => {
    setDrivers(prev => prev.map(d => 
      d.id === id ? { ...d, status: DriverStatus.ACTIVE } : d
    ));
  };

  const handleRejectDriver = (id: string) => {
    setDrivers(prev => prev.map(d => 
      d.id === id ? { ...d, status: DriverStatus.INACTIVE } : d
    ));
  };

  const handleLaunchDelivery = (newDelivery: Delivery) => {
    setDeliveries(prev => [newDelivery, ...prev]);
    setActiveTab('deliveries');
  };

  const handleTrackDelivery = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setActiveTab('tracking');
  };

  const handleAcceptDelivery = (deliveryId: string, driverId: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) return { ...d, status: 'shipped', driverId, isBroadcast: false };
      return d;
    }));
    
    setDrivers(prev => prev.map(dr => {
      if (dr.id === driverId) {
        const updated = { ...dr, status: DriverStatus.ON_DELIVERY };
        if (loggedInDriver?.id === dr.id) setLoggedInDriver(updated);
        return updated;
      }
      return dr;
    }));
  };

  const handleFinishDelivery = (deliveryId: string) => {
    let finishedDriverId = '';
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        finishedDriverId = d.driverId || '';
        return { ...d, status: 'delivered' };
      }
      return d;
    }));

    if (finishedDriverId) {
      setDrivers(prev => prev.map(dr => {
        if (dr.id === finishedDriverId) {
          const updated = { ...dr, status: DriverStatus.ACTIVE, totalDeliveries: dr.totalDeliveries + 1 };
          if (loggedInDriver?.id === dr.id) setLoggedInDriver(updated);
          return updated;
        }
        return dr;
      }));
    }
  };

  const handleDriverLogin = (driver: Driver) => {
    setLoggedInDriver(driver);
    setAppMode('driver-app');
  };

  const handleAdminLogin = (username: string) => {
    setLoggedInAdmin(username);
    setAppMode('admin');
  };

  const handleLogout = () => {
    setLoggedInAdmin(null);
    setLoggedInDriver(null);
    setAppMode('portal');
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'drivers': return <DriverList drivers={drivers} />;
      case 'approvals': return <DriverApproval drivers={drivers} onApprove={handleApproveDriver} onReject={handleRejectDriver} />;
      case 'register': return <RegistrationForm onRegister={handleRegisterDriver} />;
      case 'deliveries': return <Deliveries deliveries={deliveries} onTrack={handleTrackDelivery} />;
      case 'new-delivery': return <DeliveryForm drivers={drivers} onLaunch={handleLaunchDelivery} storeConfig={storeConfig} adminName={loggedInAdmin || 'Gestor'} />;
      case 'settings': return <SettingsView config={storeConfig} onUpdate={setStoreConfig} adminName={loggedInAdmin || 'Gestor'} onUpdateAdminName={setLoggedInAdmin} />;
      case 'tracking': return selectedDelivery ? <TrackingView delivery={selectedDelivery} storeConfig={storeConfig} onBack={() => setActiveTab('deliveries')} /> : <Dashboard />;
      default: return <Dashboard />;
    }
  };

  // Main Router
  if (appMode === 'portal') {
    return (
      <LandingPage onSelectMode={(mode) => {
        if (mode === 'admin') setAppMode('admin-login');
        if (mode === 'driver-login') setAppMode('driver-login');
        if (mode === 'driver-register') setAppMode('driver-register');
      }} />
    );
  }

  if (appMode === 'admin-login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleAdminLogin} 
        onBack={() => setAppMode('portal')} 
      />
    );
  }
  
  if (appMode === 'driver-login') return (
    <DriverLogin 
      drivers={drivers} 
      onLoginSuccess={handleDriverLogin} 
      onBack={() => setAppMode('portal')} 
      onGoToRegister={() => setAppMode('driver-register')}
    />
  );

  if (appMode === 'driver-register') return (
    <DriverSelfRegistration 
      onRegister={handleRegisterDriver} 
      onBack={() => setAppMode('portal')} 
    />
  );

  if (appMode === 'driver-app' && loggedInDriver) return (
    <DriverAppView 
      currentDriver={loggedInDriver} 
      deliveries={deliveries} 
      onAccept={handleAcceptDelivery}
      onFinish={handleFinishDelivery}
      onLogout={handleLogout}
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <Sidebar 
        activeTab={activeTab === 'tracking' ? 'deliveries' : activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        pendingCount={pendingCount}
        adminName={loggedInAdmin || 'Gestor'}
      />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{renderAdminContent()}</div>
      </main>
      
      {/* Mobile Nav Admin */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-chart-pie"></i>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button onClick={() => setActiveTab('approvals')} className={`flex flex-col items-center gap-1 relative ${activeTab === 'approvals' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-user-check"></i>
          <span className="text-[10px] font-bold">Aprovar</span>
          {pendingCount > 0 && (
            <span className="absolute -top-1 right-0 bg-yellow-400 text-indigo-900 text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-gear"></i>
          <span className="text-[10px] font-bold">Ajustes</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="text-[10px] font-bold">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default App;
