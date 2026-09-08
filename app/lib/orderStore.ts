export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderCustomer = {
  name?: string;
  phone?: string;
  address?: string;
};

export type Order = {
  orderId: string;
  items: OrderItem[];
  customer: OrderCustomer;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED';
  createdAt: string;
};

type OrderStore = {
  orders: Order[];
  sequence: number;
};

declare global {
  // eslint-disable-next-line no-var
  var twinceOrderStore: OrderStore | undefined;
}

const store: OrderStore = globalThis.twinceOrderStore ?? { orders: [], sequence: 0 };
globalThis.twinceOrderStore = store;

export function saveOrder(order: Omit<Order, 'orderId'>): Order {
  store.sequence += 1;
  const orderId = `TW-ORD-${String(store.sequence).padStart(4, '0')}`;
  const savedOrder = { ...order, orderId };
  store.orders.push(savedOrder);
  return savedOrder;
}
