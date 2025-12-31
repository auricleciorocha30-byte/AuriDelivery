
export enum VehicleType {
  BICYCLE = 'Bicicleta',
  MOTORCYCLE = 'Moto',
  CAR = 'Carro',
  VAN = 'Van'
}

export enum DriverStatus {
  ACTIVE = 'Ativo',
  INACTIVE = 'Inativo',
  PENDING = 'Pendente Approval',
  ON_DELIVERY = 'Em Entrega'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface StoreConfig {
  name: string;
  address: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  vehicle: VehicleType;
  plate?: string;
  status: DriverStatus;
  rating: number;
  totalDeliveries: number;
  joinedAt: string;
  bio: string;
}

export interface Delivery {
  id: string;
  customerName: string;
  address: string;
  originName?: string;
  originAddress?: string;
  status: 'pending' | 'shipped' | 'delivered';
  driverId?: string;
  timestamp: string;
  currentLocation?: Coordinates;
  destination?: Coordinates;
  eta?: string;
  isBroadcast?: boolean;
  createdBy?: string; // Nome do gestor que criou a entrega
}
