/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderPricing,
  filterOrdersByPerspective,
  updateOrderStatus,
  declineOrder,
  filterListings
} from './ordersLogic';
import { ProductListing, OrderRequest } from '../types';

test('Orders Logic - calculateOrderPricing handles customer pickup with zero delivery fee', () => {
  const result = calculateOrderPricing(45, 3, 'customer_pickup');
  assert.equal(result.subtotal, 135);
  assert.equal(result.deliveryFee, 0);
  assert.equal(result.totalPrice, 135);
});

test('Orders Logic - calculateOrderPricing adds nominal seller delivery fee', () => {
  const result = calculateOrderPricing(120, 2, 'seller_delivery');
  assert.equal(result.subtotal, 240);
  assert.equal(result.deliveryFee, 20);
  assert.equal(result.totalPrice, 260);
});

test('Orders Logic - calculateOrderPricing adds standard external delivery fee', () => {
  const result = calculateOrderPricing(180, 1, 'external_delivery');
  assert.equal(result.subtotal, 180);
  assert.equal(result.deliveryFee, 40);
  assert.equal(result.totalPrice, 220);
});

test('Orders Logic - filterOrdersByPerspective filters orders for customer vs seller correctly', () => {
  const mockOrders: OrderRequest[] = [
    {
      id: 'ORD-1',
      listingId: 'list-1',
      listingTitle: 'Batter',
      sellerId: 'SELLER-A',
      sellerName: 'Selvi',
      sellerLocation: 'Puducherry',
      customerId: 'USER-1',
      customerName: 'Kani',
      customerPhone: '98401',
      customerLocation: 'Puducherry',
      quantity: 1,
      unitPrice: 45,
      deliveryFee: 0,
      totalPrice: 45,
      fulfillmentMethod: 'customer_pickup',
      deliveryAddressOrPickupNotes: 'At shop',
      status: 'pending_seller_approval',
      statusHistory: [],
      paymentMethod: 'cash_on_delivery',
      placedAt: '2026-01-20T00:00:00Z',
      updatedAt: '2026-01-20T00:00:00Z'
    },
    {
      id: 'ORD-2',
      listingId: 'list-2',
      listingTitle: 'Masala',
      sellerId: 'USER-1', // USER-1 is seller here
      sellerName: 'Kani',
      sellerLocation: 'Puducherry',
      customerId: 'CUST-B',
      customerName: 'Revathi',
      customerPhone: '98402',
      customerLocation: 'Karaikal',
      quantity: 2,
      unitPrice: 120,
      deliveryFee: 20,
      totalPrice: 260,
      fulfillmentMethod: 'seller_delivery',
      deliveryAddressOrPickupNotes: 'Door delivery',
      status: 'accepted_in_preparation',
      statusHistory: [],
      paymentMethod: 'direct_upi_at_pickup',
      placedAt: '2026-01-20T00:00:00Z',
      updatedAt: '2026-01-20T00:00:00Z'
    }
  ];

  const customerOrders = filterOrdersByPerspective(mockOrders, 'USER-1', 'customer');
  assert.equal(customerOrders.length, 1);
  assert.equal(customerOrders[0].id, 'ORD-1');

  const sellerOrders = filterOrdersByPerspective(mockOrders, 'USER-1', 'seller');
  assert.equal(sellerOrders.length, 1);
  assert.equal(sellerOrders[0].id, 'ORD-2');
});

test('Orders Logic - updateOrderStatus advances status and preserves history', () => {
  const initialOrder: OrderRequest = {
    id: 'ORD-100',
    listingId: 'list-1',
    listingTitle: 'Batter',
    sellerId: 'SELLER-A',
    sellerName: 'Selvi',
    sellerLocation: 'Puducherry',
    customerId: 'CUST-1',
    customerName: 'Kani',
    customerPhone: '98401',
    customerLocation: 'Puducherry',
    quantity: 1,
    unitPrice: 45,
    deliveryFee: 0,
    totalPrice: 45,
    fulfillmentMethod: 'customer_pickup',
    deliveryAddressOrPickupNotes: 'Pickup',
    status: 'pending_seller_approval',
    statusHistory: [
      { status: 'pending_seller_approval', timestamp: '2026-01-20T06:00:00Z', note: 'Placed' }
    ],
    paymentMethod: 'cash_on_delivery',
    placedAt: '2026-01-20T06:00:00Z',
    updatedAt: '2026-01-20T06:00:00Z'
  };

  const accepted = updateOrderStatus(initialOrder, 'accepted_in_preparation', 'Accepted by Selvi');
  assert.equal(accepted.status, 'accepted_in_preparation');
  assert.equal(accepted.statusHistory.length, 2);
  assert.equal(accepted.statusHistory[1].status, 'accepted_in_preparation');

  const ready = updateOrderStatus(accepted, 'ready_for_pickup', 'Packed in food-grade pouch', 'Ready at counter');
  assert.equal(ready.status, 'ready_for_pickup');
  assert.equal(ready.deliveryNotes, 'Ready at counter');
  assert.equal(ready.statusHistory.length, 3);
});

test('Orders Logic - declineOrder marks order as declined with reason', () => {
  const initialOrder: OrderRequest = {
    id: 'ORD-200',
    listingId: 'list-1',
    listingTitle: 'Batter',
    sellerId: 'SELLER-A',
    sellerName: 'Selvi',
    sellerLocation: 'Puducherry',
    customerId: 'CUST-1',
    customerName: 'Kani',
    customerPhone: '98401',
    customerLocation: 'Puducherry',
    quantity: 1,
    unitPrice: 45,
    deliveryFee: 0,
    totalPrice: 45,
    fulfillmentMethod: 'customer_pickup',
    deliveryAddressOrPickupNotes: 'Pickup',
    status: 'pending_seller_approval',
    statusHistory: [],
    paymentMethod: 'cash_on_delivery',
    placedAt: '2026-01-20T06:00:00Z',
    updatedAt: '2026-01-20T06:00:00Z'
  };

  const declined = declineOrder(initialOrder, 'Out of morning raw material batch');
  assert.equal(declined.status, 'declined');
  assert.equal(declined.declineReason, 'Out of morning raw material batch');
  assert.equal(declined.statusHistory.length, 1);
});

test('Orders Logic - filterListings searches across title, seller, and location', () => {
  const listings: ProductListing[] = [
    {
      id: 'l1',
      sellerId: 's1',
      sellerName: 'Selvi',
      sellerLocation: 'Lawspet, Puducherry',
      title: 'Fresh Batter',
      titleTa: 'மாவு',
      titleHi: 'बैटर',
      description: 'Stone ground idli batter',
      descriptionTa: 'ஆட்டுக்கல் மாவு',
      descriptionHi: 'ताज़ा बैटर',
      type: 'product',
      category: 'food',
      price: 45,
      unit: '1 kg',
      unitTa: '1 கிலோ',
      unitHi: '1 किलो',
      minOrderQuantity: 1,
      preparationTime: 'Same day',
      fulfillmentOptions: ['customer_pickup'],
      isAvailable: true,
      imageIcon: '🥣'
    },
    {
      id: 'l2',
      sellerId: 's2',
      sellerName: 'Fatima',
      sellerLocation: 'Triplicane, Chennai',
      title: 'School Uniform Tailoring',
      titleTa: 'சீருடை தையல்',
      titleHi: 'यूनिफॉर्म सिलाई',
      description: 'Stitching service',
      descriptionTa: 'தையல் வேலை',
      descriptionHi: 'सिलाई सेवा',
      type: 'service',
      category: 'tailoring',
      price: 280,
      unit: 'per garment',
      unitTa: 'ஒரு ஆடை',
      unitHi: 'प्रति कपड़ा',
      minOrderQuantity: 1,
      preparationTime: '2 days',
      fulfillmentOptions: ['customer_pickup', 'seller_delivery'],
      isAvailable: true,
      imageIcon: '🧵'
    }
  ];

  const foodOnly = filterListings(listings, 'food', '');
  assert.equal(foodOnly.length, 1);
  assert.equal(foodOnly[0].id, 'l1');

  const chennaiOnly = filterListings(listings, 'all', '', 'chennai');
  assert.equal(chennaiOnly.length, 1);
  assert.equal(chennaiOnly[0].id, 'l2');

  const keywordSearch = filterListings(listings, 'all', 'tailoring');
  assert.equal(keywordSearch.length, 1);
  assert.equal(keywordSearch[0].id, 'l2');
});
