import type { Product } from '../app/types/product';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface OrderItemRequest {
  productId: number | string;
  quantity: number;
}

export interface CheckoutData {
  items: OrderItemRequest[];
  shippingAddress: string;
  notes?: string;
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  priceAtOrder: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  shippingAddress?: string;
  notes?: string;
  items: OrderItemResponse[];
}

export interface AiConsultResponse {
  recommendation: string;
  recommendedProduct?: string;
}

/**
 * Fetch all perfume products from backend Spring Boot.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[API] Error fetching products:', error);
    throw error;
  }
}

/**
 * Consult AI Sommelier for fragrance recommendation based on notes and preferences.
 */
export async function consultAiSommelier(prompt: string): Promise<AiConsultResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/sommelier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`AI Sommelier error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[API] Error consulting AI Sommelier:', error);
    throw error;
  }
}

/**
 * Submit checkout order to backend with JWT Bearer token authorization.
 */
export async function submitOrder(token: string, checkoutData: CheckoutData): Promise<OrderResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers,
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Order submission failed: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error('[API] Error submitting order:', error);
    throw error;
  }
}

