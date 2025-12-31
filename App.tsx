
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import DriverList from './components/DriverList';
import Deliveries from './components/Deliveries';
import TrackingView from './components/TrackingView';
import DeliveryForm from './components/DeliveryForm';
import DriverAppView from './components/DriverAppView';
import DriverLogin from './components/DriverLogin';
import AdminLogin from './components/AdminLogin';
import DriverSelfRegistration from './components/DriverSelfRegistration';
import LandingPage from './components/LandingPage';
import { Driver, VehicleType, DriverStatus, Delivery } from './types';

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
    eta: '12 min'
  }
];

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<'portal' | 'admin-login' | 'admin' | 'driver-login' | 'driver-app' | 'driver-register'>('portal');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [deliveries, setDeliveries] = useState<Delivery[]>(MOCK_DELIVERIES);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [loggedInDriver, setLoggedInDriver] = useState<Driver | null>(null);

  const handleRegisterDriver = (newDriver: Driver) => {
    setDrivers(prev => [newDriver, ...prev]);
    if (appMode === 'driver-register') {
      alert('Cadastro realizado com sucesso! Nossa equipe analisará seus dados em breve.');
      setAppMode('driver-login');
    }
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

  const handleDriverLogout = () => {
    setLoggedInDriver(null);
    setAppMode('portal');
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'drivers': return <DriverList drivers={drivers} />;
      case 'register': return <RegistrationForm onRegister={handleRegisterDriver} />;
      case 'deliveries': return <Deliveries deliveries={deliveries} onTrack={handleTrackDelivery} />;
      case 'new-delivery': return <DeliveryForm drivers={drivers} onLaunch={handleLaunchDelivery} />;
      case 'tracking': return selectedDelivery ? <TrackingView delivery={selectedDelivery} onBack={() => setActiveTab('deliveries')} /> : <Dashboard />;
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
        onLoginSuccess={() => setAppMode('admin')} 
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
      onLogout={handleDriverLogout}
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <Sidebar 
        activeTab={activeTab === 'tracking' ? 'deliveries' : activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setAppMode('portal')} 
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
        <button onClick={() => setActiveTab('deliveries')} className={`flex flex-col items-center gap-1 ${['deliveries', 'tracking'].includes(activeTab) ? 'text-indigo-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-box"></i>
          <span className="text-[10px] font-bold">Pedidos</span>
        </button>
        <button onClick={() => setAppMode('portal')} className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="text-[10px] font-bold">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default App;
