import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api/v1';

type SpringBootOrderItemDto = {
  productId: string;
  quantity: number;
};

type SpringBootOrderDto = {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: SpringBootOrderItemDto[];
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Format JSON request tidak valid.' }, { status: 400 });
  }

  // Normalisasi data dari frontend (mendukung format DTO langsung maupun nested customer)
  const customerName = (
    typeof body.customerName === 'string'
      ? body.customerName
      : body.customer && typeof body.customer === 'object' && 'name' in body.customer
      ? String((body.customer as Record<string, unknown>).name || '')
      : ''
  ).trim();

  const customerPhone = (
    typeof body.customerPhone === 'string'
      ? body.customerPhone
      : body.customer && typeof body.customer === 'object' && 'phone' in body.customer
      ? String((body.customer as Record<string, unknown>).phone || '')
      : ''
  ).trim();

  const shippingAddress = (
    typeof body.shippingAddress === 'string'
      ? body.shippingAddress
      : body.customer && typeof body.customer === 'object' && 'address' in body.customer
      ? String((body.customer as Record<string, unknown>).address || '')
      : ''
  ).trim();

  const rawItems = Array.isArray(body.items) ? body.items : [];
  const items: SpringBootOrderItemDto[] = rawItems
    .map((item: unknown) => {
      if (!item || typeof item !== 'object') return null;
      const obj = item as Record<string, unknown>;
      const productId = typeof obj.productId === 'string' ? obj.productId : typeof obj.id === 'string' ? obj.id : '';
      const quantity = typeof obj.quantity === 'number' && Number.isInteger(obj.quantity) ? obj.quantity : 1;
      return { productId: productId.trim(), quantity };
    })
    .filter((item): item is SpringBootOrderItemDto => Boolean(item && item.productId && item.quantity > 0));

  // Validasi input sebelum dikirim ke Spring Boot
  if (!customerName) {
    return NextResponse.json({ success: false, message: 'Nama pelanggan (customerName) wajib diisi.' }, { status: 400 });
  }
  if (!customerPhone) {
    return NextResponse.json({ success: false, message: 'Nomor telepon (customerPhone) wajib diisi.' }, { status: 400 });
  }
  if (!shippingAddress) {
    return NextResponse.json({ success: false, message: 'Alamat pengiriman (shippingAddress) wajib diisi.' }, { status: 400 });
  }
  if (items.length === 0) {
    return NextResponse.json({ success: false, message: 'Daftar produk pesanan (items) harus memiliki minimal 1 item yang valid.' }, { status: 400 });
  }

  const payload: SpringBootOrderDto = {
    customerName,
    customerPhone,
    shippingAddress,
    items
  };

  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      const errorMessage = data?.message || data?.error || 'Gagal membuat pesanan di backend Spring Boot.';
      return NextResponse.json({ success: false, message: errorMessage }, { status: backendResponse.status });
    }

    return NextResponse.json(
      {
        success: true,
        orderId: data?.orderNumber || data?.id,
        order: data,
        message: 'Pesanan berhasil dibuat'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error forwarding order to Spring Boot:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke backend Spring Boot di http://localhost:8080. Pastikan server aktif.'
      },
      { status: 502 }
    );
  }
}
