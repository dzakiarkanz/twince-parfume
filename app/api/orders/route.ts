import { NextResponse } from 'next/server';
import { saveOrder, type OrderCustomer, type OrderItem } from '../../lib/orderStore';

type CreateOrderBody = {
  items?: unknown;
  customer?: unknown;
  totalAmount?: unknown;
  status?: unknown;
  createdAt?: unknown;
};

function isOrderItem(value: unknown): value is OrderItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.name === 'string'
    && typeof item.price === 'number'
    && Number.isFinite(item.price)
    && item.price >= 0
    && typeof item.quantity === 'number'
    && Number.isInteger(item.quantity)
    && item.quantity > 0;
}

function isCustomer(value: unknown): value is OrderCustomer {
  if (!value || typeof value !== 'object') return false;
  const customer = value as Record<string, unknown>;
  return ['name', 'phone', 'address'].every((key) => customer[key] === undefined || typeof customer[key] === 'string');
}

export async function POST(request: Request) {
  let body: CreateOrderBody;
  try {
    body = await request.json() as CreateOrderBody;
  } catch {
    return NextResponse.json({ success: false, message: 'Body JSON tidak valid.' }, { status: 400 });
  }

  const items = body.items;
  const totalAmount = body.totalAmount;
  const createdAt = body.createdAt;
  const status = body.status;

  if (!Array.isArray(items) || items.length === 0 || !items.every(isOrderItem)) {
    return NextResponse.json({ success: false, message: 'Items pesanan tidak valid.' }, { status: 400 });
  }
  if (!isCustomer(body.customer)) {
    return NextResponse.json({ success: false, message: 'Data customer tidak valid.' }, { status: 400 });
  }
  if (typeof totalAmount !== 'number' || !Number.isFinite(totalAmount) || totalAmount < 0) {
    return NextResponse.json({ success: false, message: 'Total pesanan tidak valid.' }, { status: 400 });
  }
  const calculatedTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  if (calculatedTotal !== totalAmount) {
    return NextResponse.json({ success: false, message: 'Total pesanan tidak sesuai dengan item.' }, { status: 400 });
  }
  if (status !== 'PENDING' && status !== 'CONFIRMED') {
    return NextResponse.json({ success: false, message: 'Status pesanan tidak valid.' }, { status: 400 });
  }
  if (typeof createdAt !== 'string' || Number.isNaN(Date.parse(createdAt))) {
    return NextResponse.json({ success: false, message: 'createdAt harus berupa tanggal ISO yang valid.' }, { status: 400 });
  }

  const order = saveOrder({
    items,
    customer: body.customer && typeof body.customer === 'object' ? body.customer as OrderCustomer : {},
    totalAmount,
    status,
    createdAt
  });

  return NextResponse.json({
    success: true,
    orderId: order.orderId,
    message: 'Pesanan berhasil dicatat'
  }, { status: 201 });
}
