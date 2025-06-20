import React from 'react';
import { usePage } from '@inertiajs/react';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import Layout from '../Components/Layout/DesignLayout';

const Orders: React.FC = () => {
  const { orders } = usePage().props as {
    orders: Array<{
      id: number;
      total: number;
      status: string;
      created_at: string;
      items: Array<{
        quantity: number;
        price: number;
        product: {
          name: string;
          image: string;
          price: number;
        };
      }>;
    }>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your order history and current status</p>
      </div>

      {(!orders || orders.length === 0) ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
          <a href="/products" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                    <span className="text-lg font-bold text-gray-900">₦{Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Items ({order.items.length})</h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.product?.image ?? '/placeholder.png'}
                        alt={item.product?.name ?? 'Product'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.product?.name ?? 'Unnamed Product'}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ₦{(item.product?.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                If you have questions about your order, contact support.
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Orders.layout = (page) => <Layout>{page}</Layout>;
export default Orders;
