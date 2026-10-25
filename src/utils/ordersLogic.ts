/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ProductListing,
  OrderRequest,
  OrderStatus,
  FulfillmentMethod
} from '../types';

export interface OrderPricingResult {
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
}

/**
 * Calculates item subtotal, delivery fee based on fulfillment method, and total amount.
 * Customer pickup is free (₹0). Local seller direct delivery is nominal (₹20).
 * External delivery/courier is standard benchmark (₹40).
 */
export function calculateOrderPricing(
  unitPrice: number,
  quantity: number,
  fulfillmentMethod: FulfillmentMethod
): OrderPricingResult {
  const safeQty = Math.max(1, Math.floor(quantity || 1));
  const safePrice = Math.max(0, unitPrice || 0);
  const subtotal = safePrice * safeQty;

  let deliveryFee = 0;
  if (fulfillmentMethod === 'seller_delivery') {
    deliveryFee = 20;
  } else if (fulfillmentMethod === 'external_delivery') {
    deliveryFee = 40;
  }

  return {
    subtotal,
    deliveryFee,
    totalPrice: subtotal + deliveryFee
  };
}

/**
 * Generates an honest unique Order Request ID.
 */
export function generateOrderId(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ORD-2026-${rand}`;
}

/**
 * Filters orders based on whether the user is viewing as customer or seller.
 */
export function filterOrdersByPerspective(
  orders: OrderRequest[],
  currentUserId: string,
  perspective: 'customer' | 'seller'
): OrderRequest[] {
  if (perspective === 'customer') {
    return orders.filter((o) => o.customerId === currentUserId);
  }
  return orders.filter((o) => o.sellerId === currentUserId);
}

/**
 * Validates and executes state transitions for order fulfillment.
 */
export function updateOrderStatus(
  order: OrderRequest,
  nextStatus: OrderStatus,
  note?: string,
  deliveryNotes?: string
): OrderRequest {
  const timestamp = new Date().toISOString();
  const nextHistory = [
    ...order.statusHistory,
    {
      status: nextStatus,
      timestamp,
      note: note || `Status updated to ${nextStatus}`
    }
  ];

  return {
    ...order,
    status: nextStatus,
    statusHistory: nextHistory,
    deliveryNotes: deliveryNotes !== undefined ? deliveryNotes : order.deliveryNotes,
    updatedAt: timestamp
  };
}

/**
 * Rejects / declines an order request with a specific reason.
 */
export function declineOrder(
  order: OrderRequest,
  reason: string
): OrderRequest {
  const timestamp = new Date().toISOString();
  return {
    ...order,
    status: 'declined',
    declineReason: reason || 'Seller is unable to fulfill at this time',
    statusHistory: [
      ...order.statusHistory,
      {
        status: 'declined',
        timestamp,
        note: `Declined: ${reason}`
      }
    ],
    updatedAt: timestamp
  };
}

/**
 * Filters marketplace listings by category, search text, and location keyword.
 */
export function filterListings(
  listings: ProductListing[],
  category: string,
  searchQuery: string,
  locationFilter: string = 'all'
): ProductListing[] {
  const query = searchQuery.trim().toLowerCase();
  const loc = locationFilter.trim().toLowerCase();

  return listings.filter((item) => {
    // 1. Category check
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // 2. Location check
    if (loc !== 'all') {
      const itemLoc = item.sellerLocation.toLowerCase();
      if (!itemLoc.includes(loc)) {
        return false;
      }
    }

    // 3. Search query check
    if (!query) return true;

    return (
      item.title.toLowerCase().includes(query) ||
      item.titleTa.toLowerCase().includes(query) ||
      item.titleHi.toLowerCase().includes(query) ||
      item.sellerName.toLowerCase().includes(query) ||
      item.sellerLocation.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });
}
