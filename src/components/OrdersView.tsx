/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Package,
  ShoppingBag,
  Store,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  AlertCircle,
  Phone,
  Calendar,
  Sparkles,
  Info,
  DollarSign,
  User,
  ShieldCheck,
  Check,
  X,
  Volume2
} from 'lucide-react';
import {
  Language,
  ActiveTab,
  UserProfile,
  ProductListing,
  OrderRequest,
  OrderStatus,
  FulfillmentMethod
} from '../types';
import { communityListings, initialSampleOrders } from '../data/ordersData';
import {
  calculateOrderPricing,
  generateOrderId,
  filterOrdersByPerspective,
  updateOrderStatus,
  declineOrder,
  filterListings
} from '../utils/ordersLogic';
import { translations } from '../data/translations';
import { formatCurrency } from '../utils/calculator';
import { speakText } from '../utils/speech';

interface OrdersViewProps {
  lang: Language;
  userProfile: UserProfile;
  onNavigateBack?: () => void;
  onNavigate?: (tab: ActiveTab) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  lang,
  userProfile,
  onNavigateBack,
  onNavigate,
}) => {
  const t = translations[lang];

  // Active view mode: customer browsing/ordering vs seller order management
  const [viewMode, setViewMode] = useState<'customer' | 'seller'>('customer');
  const [activeTab, setActiveTab] = useState<'browse' | 'my_orders'>('browse');

  // Listings state
  const [listings, setListings] = useState<ProductListing[]>(communityListings);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Orders persistence in localStorage
  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return initialSampleOrders;
  });

  const saveOrders = (updated: OrderRequest[]) => {
    setOrders(updated);
    try {
      localStorage.setItem('sherise_orders', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Ordering modal state
  const [selectedListing, setSelectedListing] = useState<ProductListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderFulfillment, setOrderFulfillment] = useState<FulfillmentMethod>('customer_pickup');
  const [orderAddressNotes, setOrderAddressNotes] = useState<string>('');
  const [orderCustomReqs, setOrderCustomReqs] = useState<string>('');
  const [orderSuccessToast, setOrderSuccessToast] = useState<string | null>(null);

  // Seller Action Modal States
  const [declineModalOrder, setDeclineModalOrder] = useState<OrderRequest | null>(null);
  const [declineReasonText, setDeclineReasonText] = useState<string>('');
  const [fulfillmentNoteModalOrder, setFulfillmentNoteModalOrder] = useState<OrderRequest | null>(null);
  const [deliveryNoteInput, setDeliveryNoteInput] = useState<string>('');

  // Filter listings based on controls
  const filteredListings = filterListings(listings, categoryFilter, searchQuery, locationFilter);

  // Customer orders (orders placed by user)
  const customerOrders = orders.filter((o) => o.customerId === userProfile.id);

  // Seller orders (orders where logged-in user is seller or demo orders for testing)
  const sellerOrders = orders.filter(
    (o) => o.sellerId === userProfile.id || o.sellerId === 'SHERISE-DEMO-7842'
  );

  const pendingSellerCount = sellerOrders.filter(
    (o) => o.status === 'pending_seller_approval'
  ).length;

  // Open ordering modal for a listing
  const handleOpenOrderModal = (listing: ProductListing) => {
    setSelectedListing(listing);
    setOrderQuantity(listing.minOrderQuantity || 1);
    setOrderFulfillment(listing.fulfillmentOptions[0] || 'customer_pickup');
    setOrderAddressNotes(userProfile.location || '');
    setOrderCustomReqs('');
  };

  // Submit order request
  const handlePlaceOrderRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    const pricing = calculateOrderPricing(
      selectedListing.price,
      orderQuantity,
      orderFulfillment
    );

    const newOrder: OrderRequest = {
      id: generateOrderId(),
      listingId: selectedListing.id,
      listingTitle: selectedListing.title,
      sellerId: selectedListing.sellerId,
      sellerName: selectedListing.sellerName,
      sellerLocation: selectedListing.sellerLocation,
      customerId: userProfile.id,
      customerName: userProfile.name,
      customerPhone: userProfile.trustedContactPhone || '9840199000',
      customerLocation: userProfile.location,
      quantity: orderQuantity,
      unitPrice: selectedListing.price,
      deliveryFee: pricing.deliveryFee,
      totalPrice: pricing.totalPrice,
      fulfillmentMethod: orderFulfillment,
      deliveryAddressOrPickupNotes: orderAddressNotes.trim() || 'Customer will collect in person',
      customRequirements: orderCustomReqs.trim() || undefined,
      status: 'pending_seller_approval',
      statusHistory: [
        {
          status: 'pending_seller_approval',
          timestamp: new Date().toISOString(),
          note: `Order request submitted for ${orderQuantity} ${selectedListing.unit}`
        }
      ],
      paymentMethod: orderFulfillment === 'customer_pickup' ? 'direct_upi_at_pickup' : 'cash_on_delivery',
      placedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    setSelectedListing(null);

    try {
      confetti({ particleCount: 35, spread: 55 });
    } catch {
      // ignore
    }

    setOrderSuccessToast(
      lang === 'ta'
        ? `ஆர்டர் ${newOrder.id} வெற்றிகரமாக அனுப்பப்பட்டது! விற்பனையாளரின் உறுதிப்படுத்தலுக்காக காத்திருக்கிறது.`
        : lang === 'hi'
        ? `ऑर्डर ${newOrder.id} सफलतापूर्वक भेजा गया! विक्रेता की स्वीकृति की प्रतीक्षा है।`
        : `Order request ${newOrder.id} submitted! Awaiting seller review.`
    );
    setTimeout(() => setOrderSuccessToast(null), 5000);
    setActiveTab('my_orders');
  };

  // Seller Action: Accept
  const handleSellerAccept = (order: OrderRequest) => {
    const updated = orders.map((o) => {
      if (o.id === order.id) {
        return updateOrderStatus(
          o,
          'accepted_in_preparation',
          'Seller accepted the order request and began preparation.'
        );
      }
      return o;
    });
    saveOrders(updated);
  };

  // Seller Action: Open Decline Modal
  const handleOpenDeclineModal = (order: OrderRequest) => {
    setDeclineModalOrder(order);
    setDeclineReasonText(
      lang === 'ta'
        ? 'தற்போது மூலப்பொருள் இருப்பு இல்லை / அதிக ஆர்டர்கள் உள்ளன'
        : 'Out of stock for this batch / High volume of orders'
    );
  };

  // Seller Action: Confirm Decline
  const handleConfirmDecline = () => {
    if (!declineModalOrder) return;
    const updated = orders.map((o) => {
      if (o.id === declineModalOrder.id) {
        return declineOrder(o, declineReasonText.trim());
      }
      return o;
    });
    saveOrders(updated);
    setDeclineModalOrder(null);
  };

  // Seller Action: Mark Ready for Pickup
  const handleMarkReadyForPickup = (order: OrderRequest) => {
    const updated = orders.map((o) => {
      if (o.id === order.id) {
        return updateOrderStatus(
          o,
          'ready_for_pickup',
          'Order is packed and ready for customer in-person collection.',
          'Ready at seller location'
        );
      }
      return o;
    });
    saveOrders(updated);
  };

  // Seller Action: Mark Out for Delivery with custom note
  const handleOpenDeliveryNoteModal = (order: OrderRequest) => {
    setFulfillmentNoteModalOrder(order);
    setDeliveryNoteInput(
      order.fulfillmentMethod === 'seller_delivery'
        ? 'Seller is self-delivering on two-wheeler'
        : 'Dispatched via local auto driver / courier service'
    );
  };

  const handleConfirmOutForDelivery = () => {
    if (!fulfillmentNoteModalOrder) return;
    const updated = orders.map((o) => {
      if (o.id === fulfillmentNoteModalOrder.id) {
        return updateOrderStatus(
          o,
          'out_for_delivery',
          'Dispatched for delivery to customer address.',
          deliveryNoteInput.trim()
        );
      }
      return o;
    });
    saveOrders(updated);
    setFulfillmentNoteModalOrder(null);
  };

  // Seller Action: Complete Order
  const handleMarkCompleted = (order: OrderRequest) => {
    const updated = orders.map((o) => {
      if (o.id === order.id) {
        return updateOrderStatus(
          o,
          'completed',
          'Order successfully received and payment settled in person.'
        );
      }
      return o;
    });
    saveOrders(updated);
    try {
      confetti({ particleCount: 25, spread: 45 });
    } catch {
      // ignore
    }
  };

  // Audio speech
  const handleSpeakOverview = () => {
    const text =
      lang === 'ta'
        ? 'ஆர்டர்கள் மற்றும் உள்ளூர் சந்தை: சுயதொழில் செய்யும் பெண்களின் தயாரிப்புகள் மற்றும் சேவைகளை எளிதாக ஆர்டர் செய்யலாம் அல்லது விற்பனையாளராக கோரிக்கைகளை ஏற்கலாம்.'
        : lang === 'hi'
        ? 'ऑर्डर्स और स्थानीय बाजार: आत्मनिर्भर महिलाओं के उत्पादों और सेवाओं का ऑर्डर करें या विक्रेता के रूप में ऑर्डर प्रबंधित करें।'
        : 'Community Orders: Browse and request products from local women entrepreneurs, or manage incoming orders as a seller with transparent fulfillment.';
    speakText(text, lang);
  };

  // Helper for status badge styling and text
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending_seller_approval':
        return {
          label: lang === 'ta' ? 'விற்பனையாளர் பார்வைக்கு நிலுவையில்' : lang === 'hi' ? 'स्वीकृति हेतु लंबित' : 'Pending Seller Review',
          className: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'accepted_in_preparation':
        return {
          label: lang === 'ta' ? 'ஏற்றுக்கொள்ளப்பட்டது (தயாரிப்பில்)' : lang === 'hi' ? 'स्वीकृत (तैयारी में)' : 'Accepted & In Preparation',
          className: 'bg-blue-100 text-blue-900 border-blue-300'
        };
      case 'ready_for_pickup':
        return {
          label: lang === 'ta' ? 'சேகரிப்புக்கு தயார்' : lang === 'hi' ? 'पिकअप हेतु तैयार' : 'Ready for Pickup',
          className: 'bg-purple-100 text-purple-900 border-purple-300'
        };
      case 'out_for_delivery':
        return {
          label: lang === 'ta' ? 'விநியோகத்திற்கு அனுப்பப்பட்டது' : lang === 'hi' ? 'डिलीवरी हेतु रवाना' : 'Out for Delivery',
          className: 'bg-indigo-100 text-indigo-900 border-indigo-300'
        };
      case 'completed':
        return {
          label: lang === 'ta' ? 'நிறைவடைந்தது (பணம் பெறப்பட்டது)' : lang === 'hi' ? 'सफलतापूर्वक पूर्ण' : 'Completed & Settled',
          className: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      case 'declined':
        return {
          label: lang === 'ta' ? 'நிராகரிக்கப்பட்டது' : lang === 'hi' ? 'अस्वीकृत' : 'Declined by Seller',
          className: 'bg-rose-100 text-rose-900 border-rose-300'
        };
      default:
        return { label: status, className: 'bg-stone-100 text-stone-700 border-stone-300' };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateBack || (() => onNavigate?.('dashboard'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-medium text-stone-800 transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.common.back}</span>
          </button>
          <span className="text-stone-400">/</span>
          <span className="font-bold text-stone-900">
            {lang === 'ta' ? 'ஆர்டர்கள்' : lang === 'hi' ? 'ऑर्डर्स' : 'Orders'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Local Commerce • No Fake Tracking</span>
          </span>
          <button
            type="button"
            onClick={handleSpeakOverview}
            className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition"
            title="Read section aloud"
            aria-label="Read section aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner with Customer / Seller Mode Toggle */}
      <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-rose-100">
              <Package className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {lang === 'ta'
                  ? 'சுயதொழில் பெண்கள் சந்தை & முன்பதிவு'
                  : lang === 'hi'
                  ? 'महिला उद्यमी उत्पाद एवं सेवा बाजार'
                  : 'Micro-Enterprise Commerce Network'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'ta'
                ? 'உள்ளூர் தயாரிப்புகள், சேவைகள் & ஆர்டர்கள்'
                : lang === 'hi'
                ? 'स्थानीय उत्पाद, सेवाएं एवं ऑर्डर प्रबंधन'
                : 'Community Products, Services & Orders'}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் ஊர் பெண்களின் வீட்டு தயாரிப்புகளை ஆர்டர் செய்யுங்கள். பெண்கள் தங்கள் வாடிக்கையாளர் ஆர்டர்களை வெளிப்படையாக நிர்வகிக்கலாம்.'
                : lang === 'hi'
                ? 'स्थानीय महिलाओं के घरेलू उत्पाद व सिलाई सेवाएं ऑर्डर करें, या विक्रेता के रूप में ऑर्डर स्वीकार करें।'
                : 'Request genuine homemade foods, tailoring services, and artisanal crafts directly from verified women sellers. Transparent status updates with zero fake tracking.'}
            </p>
          </div>

          {/* Perspective Switcher: Customer vs Seller */}
          <div className="flex bg-black/25 p-1 rounded-2xl border border-white/20 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setViewMode('customer');
                setActiveTab('browse');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                viewMode === 'customer'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-rose-100 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'ta' ? 'வாடிக்கையாளர் பார்வை' : lang === 'hi' ? 'ग्राहक मोड' : 'Customer View'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('seller');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 relative ${
                viewMode === 'seller'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-rose-100 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{lang === 'ta' ? 'விற்பனையாளர் பிரிவு' : lang === 'hi' ? 'विक्रेता डैशबोर्ड' : 'Seller Dashboard'}</span>
              {pendingSellerCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black flex items-center justify-center animate-bounce">
                  {pendingSellerCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      {orderSuccessToast && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-3 animate-fadeIn shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{orderSuccessToast}</span>
        </div>
      )}

      {/* VIEW 1: CUSTOMER PERSPECTIVE */}
      {viewMode === 'customer' && (
        <div className="space-y-6">
          {/* Sub Navigation: Browse vs My Orders */}
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'browse'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>
                {lang === 'ta'
                  ? 'தயாரிப்புகள் & சேவைகள்'
                  : lang === 'hi'
                  ? 'उत्पाद व सेवाएं'
                  : 'Browse Catalog'}
              </span>
              <span className="px-1.5 py-0.2 bg-black/15 rounded-md text-[10px]">
                {filteredListings.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('my_orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'my_orders'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {lang === 'ta' ? 'என் ஆர்டர்கள்' : lang === 'hi' ? 'मेरे ऑर्डर्स' : 'My Orders'}
              </span>
              <span className="px-1.5 py-0.2 bg-black/15 rounded-md text-[10px]">
                {customerOrders.length}
              </span>
            </button>
          </div>

          {/* TAB A: BROWSE CATALOG */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {/* Filters Bar */}
              <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        lang === 'ta'
                          ? 'தயாரிப்பு, சேவை அல்லது ஊர் தேடுக...'
                          : 'Search items, tailoring, dry fish, batter...'
                      }
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="all">
                        {lang === 'ta' ? 'அனைத்து பிரிவுகளும்' : 'All Categories'}
                      </option>
                      <option value="food">
                        {lang === 'ta' ? 'உணவு & தானிய மாவு' : 'Food & Batter'}
                      </option>
                      <option value="tailoring">
                        {lang === 'ta' ? 'தையல் & ஆடை சேவைகள்' : 'Tailoring & Garments'}
                      </option>
                      <option value="pooja_flowers">
                        {lang === 'ta' ? 'பூஜை & மலர் மாலைகள்' : 'Pooja & Flowers'}
                      </option>
                      <option value="handicraft">
                        {lang === 'ta' ? 'கைவினைப் பொருட்கள்' : 'Handicrafts'}
                      </option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="all">
                        {lang === 'ta' ? 'அனைத்து மாவட்டங்களும்' : 'All Districts'}
                      </option>
                      <option value="puducherry">🌴 Puducherry</option>
                      <option value="karaikal">🌊 Karaikal</option>
                      <option value="thirunallar">🪔 Thirunallar</option>
                      <option value="madurai">🌸 Madurai</option>
                      <option value="chennai">🏛️ Chennai</option>
                      <option value="coimbatore">🧵 Coimbatore</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-3xl p-2 bg-rose-50 rounded-2xl border border-rose-100">
                          {item.imageIcon}
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.type === 'service'
                                ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            }`}
                          >
                            {item.type === 'service' ? 'Service' : 'Product'}
                          </span>
                          <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                            ⭐ {item.rating} ({item.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-stone-900 leading-snug">
                          {lang === 'ta' ? item.titleTa : lang === 'hi' ? item.titleHi : item.title}
                        </h3>
                        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {lang === 'ta' ? item.descriptionTa : lang === 'hi' ? item.descriptionHi : item.description}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-2xl space-y-1.5 text-xs text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span className="font-semibold text-stone-900">{item.sellerName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{item.sellerLocation}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{item.preparationTime}</span>
                        </div>
                      </div>

                      {/* Delivery options badges */}
                      <div className="flex flex-wrap gap-1 text-[10px] text-stone-600">
                        {item.fulfillmentOptions.map((opt) => (
                          <span
                            key={opt}
                            className="px-2 py-0.5 bg-stone-100 rounded-md font-medium"
                          >
                            {opt === 'customer_pickup'
                              ? '🏠 Self-Pickup'
                              : opt === 'seller_delivery'
                              ? '🛵 Local Delivery'
                              : '📦 Courier'}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-semibold">
                          Price
                        </div>
                        <div className="text-base font-extrabold text-stone-900">
                          {formatCurrency(item.price, lang)}
                          <span className="text-[11px] font-normal text-stone-500 ml-1">
                            / {lang === 'ta' ? item.unitTa : lang === 'hi' ? item.unitHi : item.unit}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenOrderModal(item)}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
                      >
                        <span>{lang === 'ta' ? 'முன்பதிவு / ஆர்டர்' : 'Place Request'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB B: CUSTOMER ORDERS HISTORY */}
          {activeTab === 'my_orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900">
                  {lang === 'ta' ? 'நீங்கள் செய்த ஆர்டர்கள்' : 'Your Order Requests History'}
                </h2>
                <span className="text-xs text-stone-500">
                  {customerOrders.length} order request(s)
                </span>
              </div>

              {customerOrders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-3">
                  <Package className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">
                    {lang === 'ta' ? 'நீங்கள் இன்னும் எந்த ஆர்டரும் செய்யவில்லை.' : 'You have not placed any order requests yet.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('browse')}
                    className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl text-xs"
                  >
                    {lang === 'ta' ? 'தயாரிப்புகளை காண்க' : 'Browse Products & Services'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {customerOrders.map((order) => {
                    const badge = getStatusBadge(order.status);
                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                              {order.id}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-400">
                            {new Date(order.placedAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="space-y-1">
                            <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                              Item & Quantity
                            </span>
                            <span className="font-bold text-stone-900 block text-sm">
                              {order.listingTitle}
                            </span>
                            <span className="text-stone-600 block">
                              Qty: {order.quantity} × {formatCurrency(order.unitPrice, lang)}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                              Seller & Pickup Location
                            </span>
                            <span className="font-bold text-stone-900 block">
                              {order.sellerName}
                            </span>
                            <span className="text-stone-600 block">
                              📍 {order.sellerLocation}
                            </span>
                          </div>

                          <div className="space-y-1 bg-stone-50 p-3 rounded-2xl">
                            <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                              Fulfillment & Payment
                            </span>
                            <span className="font-bold text-stone-800 block">
                              {order.fulfillmentMethod === 'customer_pickup'
                                ? '🏠 In-Person Pickup (₹0 fee)'
                                : order.fulfillmentMethod === 'seller_delivery'
                                ? '🛵 Seller Direct Delivery (₹20)'
                                : '📦 External Courier (₹40)'}
                            </span>
                            <span className="text-emerald-700 font-extrabold text-sm block">
                              Total: {formatCurrency(order.totalPrice, lang)}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              Payment: Direct Cash / UPI at handoff
                            </span>
                          </div>
                        </div>

                        {/* Delivery or Decline notes if any */}
                        {order.deliveryNotes && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-start gap-2">
                            <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block">Seller Fulfillment Update:</span>
                              <p className="text-[11px]">{order.deliveryNotes}</p>
                            </div>
                          </div>
                        )}

                        {order.declineReason && (
                          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block">Decline Reason from Seller:</span>
                              <p className="text-[11px]">{order.declineReason}</p>
                            </div>
                          </div>
                        )}

                        {/* History Timeline */}
                        <div className="pt-2 border-t border-stone-100">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                            Status Timeline
                          </span>
                          <div className="space-y-1 text-[11px] text-stone-600">
                            {order.statusHistory.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <span className="font-mono text-stone-400 text-[10px]">
                                  {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="font-medium text-stone-800">{step.note || step.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SELLER MANAGEMENT PERSPECTIVE */}
      {viewMode === 'seller' && (
        <div className="space-y-6">
          {/* Seller Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                Total Orders
              </span>
              <span className="text-xl font-black text-stone-900 mt-1 block">
                {sellerOrders.length}
              </span>
            </div>

            <div className="bg-amber-50 p-4 rounded-3xl border border-amber-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-amber-800 uppercase block">
                Pending Action
              </span>
              <span className="text-xl font-black text-amber-950 mt-1 block">
                {pendingSellerCount}
              </span>
            </div>

            <div className="bg-blue-50 p-4 rounded-3xl border border-blue-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-blue-800 uppercase block">
                In Preparation
              </span>
              <span className="text-xl font-black text-blue-950 mt-1 block">
                {sellerOrders.filter((o) => o.status === 'accepted_in_preparation').length}
              </span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase block">
                Completed
              </span>
              <span className="text-xl font-black text-emerald-950 mt-1 block">
                {sellerOrders.filter((o) => o.status === 'completed').length}
              </span>
            </div>
          </div>

          {/* Seller Explanatory Notice */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-3 text-xs text-stone-700">
            <Store className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block text-stone-900">
                Seller Order Processing Protocol:
              </span>
              <p className="text-[11px] leading-relaxed text-stone-600">
                Review each customer request honestly. If you have capacity, click “Accept” to start preparation. If out of stock, decline politely with a reason. Once ready, choose between customer pickup, self-delivery on your two-wheeler, or third-party courier.
              </p>
            </div>
          </div>

          {/* Incoming Orders List */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-900">
              {lang === 'ta' ? 'உங்களுக்கான விற்பனை கோரிக்கைகள்' : 'Incoming Customer Order Requests'}
            </h2>

            {sellerOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-2">
                <Store className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold text-stone-700">
                  No order requests have been assigned to your profile yet.
                </p>
                <p className="text-xs text-stone-500">
                  Switch to Customer View to place a test order request.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sellerOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                            {order.id}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          Placed: {new Date(order.placedAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        {/* Customer details */}
                        <div className="space-y-1">
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                            Customer Details
                          </span>
                          <span className="font-bold text-stone-900 block text-sm">
                            {order.customerName}
                          </span>
                          <span className="text-stone-600 block">
                            📞 {order.customerPhone}
                          </span>
                          <span className="text-stone-500 block text-[11px]">
                            📍 {order.customerLocation}
                          </span>
                        </div>

                        {/* Item requested */}
                        <div className="space-y-1">
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                            Requested Item
                          </span>
                          <span className="font-bold text-stone-900 block">
                            {order.listingTitle}
                          </span>
                          <span className="text-stone-600 block">
                            Quantity: {order.quantity}
                          </span>
                          {order.customRequirements && (
                            <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md block text-[11px]">
                              Note: {order.customRequirements}
                            </span>
                          )}
                        </div>

                        {/* Settlement & fulfillment details */}
                        <div className="space-y-1 bg-stone-50 p-3 rounded-2xl">
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                            Delivery Preference & Value
                          </span>
                          <span className="font-bold text-stone-800 block">
                            {order.fulfillmentMethod === 'customer_pickup'
                              ? '🏠 Customer Pickup'
                              : order.fulfillmentMethod === 'seller_delivery'
                              ? '🛵 Seller Direct Delivery'
                              : '📦 External Courier Delivery'}
                          </span>
                          <span className="text-emerald-700 font-extrabold text-sm block">
                            Total to Collect: {formatCurrency(order.totalPrice, lang)}
                          </span>
                          <span className="text-[10px] text-stone-500 block">
                            Address/Notes: {order.deliveryAddressOrPickupNotes}
                          </span>
                        </div>
                      </div>

                      {/* Seller Action Buttons */}
                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] text-stone-500">
                          Last Updated: {new Date(order.updatedAt).toLocaleTimeString()}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* When Pending */}
                          {order.status === 'pending_seller_approval' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenDeclineModal(order)}
                                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition border border-stone-200"
                              >
                                {lang === 'ta' ? 'நிராகரி' : 'Decline'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSellerAccept(order)}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{lang === 'ta' ? 'ஏற்றுக்கொள் (தயாரிக்கத் தொடங்கு)' : 'Accept & Start Preparation'}</span>
                              </button>
                            </>
                          )}

                          {/* When In Preparation */}
                          {order.status === 'accepted_in_preparation' && (
                            <>
                              {order.fulfillmentMethod === 'customer_pickup' ? (
                                <button
                                  type="button"
                                  onClick={() => handleMarkReadyForPickup(order)}
                                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
                                >
                                  <Store className="w-3.5 h-3.5" />
                                  <span>{lang === 'ta' ? 'சேகரிப்புக்கு தயார் என குறிக்க' : 'Mark Ready for In-Person Pickup'}</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenDeliveryNoteModal(order)}
                                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>{lang === 'ta' ? 'விநியோகத்திற்கு அனுப்பு' : 'Mark Out for Delivery'}</span>
                                </button>
                              )}
                            </>
                          )}

                          {/* When Ready for Pickup or Out for Delivery */}
                          {(order.status === 'ready_for_pickup' || order.status === 'out_for_delivery') && (
                            <button
                              type="button"
                              onClick={() => handleMarkCompleted(order)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{lang === 'ta' ? 'முடிக்கப்பட்டு பணம் பெறப்பட்டது' : 'Mark Completed (Payment Settled)'}</span>
                            </button>
                          )}

                          {/* Completed or Declined states */}
                          {order.status === 'completed' && (
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Order Closed & Settled</span>
                            </span>
                          )}

                          {order.status === 'declined' && (
                            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              <span>Declined: {order.declineReason}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: CUSTOMER ORDER PLACEMENT MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-rose-50 rounded-2xl border border-rose-100">
                  {selectedListing.imageIcon}
                </span>
                <div>
                  <h3 className="font-bold text-base text-stone-900 leading-snug">
                    {lang === 'ta' ? selectedListing.titleTa : selectedListing.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Seller: {selectedListing.sellerName} • {selectedListing.sellerLocation}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedListing(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlaceOrderRequest} className="space-y-4 text-xs">
              {/* Quantity */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'தேவையான அளவு / எண்ணிக்கை:' : 'Quantity / Units:'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={selectedListing.minOrderQuantity || 1}
                    max={50}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-24 p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold text-center text-sm"
                  />
                  <span className="text-stone-600 font-medium">
                    {lang === 'ta' ? selectedListing.unitTa : selectedListing.unit}
                  </span>
                </div>
              </div>

              {/* Fulfillment Method Selection */}
              <div>
                <label className="font-bold text-stone-700 block mb-1.5">
                  {lang === 'ta' ? 'விநியோக விருப்பம் (Fulfillment):' : 'Fulfillment Preference:'}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {selectedListing.fulfillmentOptions.includes('customer_pickup') && (
                    <label
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between ${
                        orderFulfillment === 'customer_pickup'
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500 shadow-2xs'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="fulfillment"
                          value="customer_pickup"
                          checked={orderFulfillment === 'customer_pickup'}
                          onChange={() => setOrderFulfillment('customer_pickup')}
                          className="text-rose-600"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block">
                            {lang === 'ta' ? 'நேரடி சேகரிப்பு (Customer Pickup)' : 'In-Person Collection (Self-Pickup)'}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Collect directly at seller’s address in {selectedListing.sellerLocation}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-700">₹0 fee</span>
                    </label>
                  )}

                  {selectedListing.fulfillmentOptions.includes('seller_delivery') && (
                    <label
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between ${
                        orderFulfillment === 'seller_delivery'
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500 shadow-2xs'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="fulfillment"
                          value="seller_delivery"
                          checked={orderFulfillment === 'seller_delivery'}
                          onChange={() => setOrderFulfillment('seller_delivery')}
                          className="text-rose-600"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block">
                            {lang === 'ta' ? 'விற்பனையாளர் நேரடி விநியோகம்' : 'Seller Direct Delivery (Local)'}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Seller delivers to your door on her two-wheeler
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-700">+₹20</span>
                    </label>
                  )}

                  {selectedListing.fulfillmentOptions.includes('external_delivery') && (
                    <label
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between ${
                        orderFulfillment === 'external_delivery'
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500 shadow-2xs'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="fulfillment"
                          value="external_delivery"
                          checked={orderFulfillment === 'external_delivery'}
                          onChange={() => setOrderFulfillment('external_delivery')}
                          className="text-rose-600"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block">
                            {lang === 'ta' ? 'வெளிப்புற கூரியர் / ஆட்டோ' : 'Local Courier / Auto Rickshaw'}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Third-party local courier dispatch at actual rates
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-700">+₹40</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Delivery Address / Notes */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {orderFulfillment === 'customer_pickup'
                    ? lang === 'ta' ? 'சேகரிக்க வரும் நேரம் / குறிப்பு:' : 'Expected Pickup Time / Notes:'
                    : lang === 'ta' ? 'விநியோக முகவரி:' : 'Delivery Address:'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={orderAddressNotes}
                  onChange={(e) => setOrderAddressNotes(e.target.value)}
                  placeholder="e.g. Door 14, 2nd Street, Near Pillayar Temple / Saturday 4:30 PM"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              {/* Custom Requirements */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'சிறப்பு தேவைகள் (விருப்பத்திற்குரியது):' : 'Special Notes or Custom Requests (Optional):'}
                </label>
                <input
                  type="text"
                  value={orderCustomReqs}
                  onChange={(e) => setOrderCustomReqs(e.target.value)}
                  placeholder="e.g. Less spicy, delivery before 8:00 AM, specific blouse measurements"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Price Calculation Box */}
              {(() => {
                const pricing = calculateOrderPricing(
                  selectedListing.price,
                  orderQuantity,
                  orderFulfillment
                );
                return (
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal:</span>
                      <span>{formatCurrency(pricing.subtotal, lang)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Fulfillment / Delivery Fee:</span>
                      <span>{formatCurrency(pricing.deliveryFee, lang)}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-stone-900 border-t border-stone-200 pt-1.5 text-sm">
                      <span>Total Request Amount:</span>
                      <span className="text-rose-700">{formatCurrency(pricing.totalPrice, lang)}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Transparent Settlement Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {lang === 'ta'
                    ? 'கட்டணக் கொள்கை: பணம் அல்லது UPI (GPay/PhonePe) மூலம் டெலிவரியின் போதோ அல்லது சேகரிக்கும் போதோ விற்பனையாளரிடம் நேரடியாக செலுத்தவும். போலி முன்கூட்டிய பணப்பரிவர்த்தனை எதுவும் இல்லை.'
                    : 'Transparent Payment Policy: Pay directly upon in-person pickup or delivery via Cash or UPI (GPay/PhonePe). No fake payment gateway claims.'}
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 font-semibold"
                >
                  {t.common.close}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shadow-xs"
                >
                  {lang === 'ta' ? 'கோரிக்கையை அனுப்புக' : 'Submit Order Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SELLER DECLINE REASON MODAL */}
      {declineModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4 animate-scaleUp text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Decline Order Request ({declineModalOrder.id})</span>
              </h3>
              <button
                type="button"
                onClick={() => setDeclineModalOrder(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-stone-600">
              Please provide a polite reason for the customer so they can adjust their request:
            </p>

            <textarea
              rows={3}
              value={declineReasonText}
              onChange={(e) => setDeclineReasonText(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl resize-none font-medium"
            />

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDeclineModalOrder(null)}
                className="px-3.5 py-2 text-stone-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SELLER FULFILLMENT / DELIVERY NOTE MODAL */}
      {fulfillmentNoteModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4 animate-scaleUp text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span>Dispatch Fulfillment Update ({fulfillmentNoteModalOrder.id})</span>
              </h3>
              <button
                type="button"
                onClick={() => setFulfillmentNoteModalOrder(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-stone-600">
              Enter delivery dispatch details (e.g. self-delivery vehicle timing, or driver name and contact number):
            </p>

            <input
              type="text"
              value={deliveryNoteInput}
              onChange={(e) => setDeliveryNoteInput(e.target.value)}
              placeholder="e.g. Self-delivery en route, arriving at 7:30 AM"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
            />

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFulfillmentNoteModalOrder(null)}
                className="px-3.5 py-2 text-stone-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmOutForDelivery}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
