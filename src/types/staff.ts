export interface Table {
  id: string;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  capacity: number;
  customers: Customer[];
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  order: Order;
  isPaid: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: 'waiter' | 'chef' | 'manager';
}