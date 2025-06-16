import React, { useState } from 'react';
import { usePage,router } from '@inertiajs/react';
import { Package, Users, ShoppingCart, TrendingUp, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Layout/Header';

interface User {
  role: string;
}

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  created_at: string;
  user_id: number;
  items: OrderItem[];
  status: string;
  total: number;
}

interface Category {
  id: number;
  name: string;
}

interface UserAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { props } = usePage();
    const { users = [], products = [], orders = [], categories = [] } = props as {
    user: UserAccount[];
    products: Product[];
    orders: Order[];
    categories: Category[];
    };

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'users'>('overview');
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // FIX 1: Add missing productForm state
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: '',
    price: 0,
    stock: 0,
    image: ''
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = users.length;

  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openViewOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOrderModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
    setIsEditProductModalOpen(true);
  };

  const openDeleteProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  // Form handlers
  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
    ...prev,
    [name]: ['price', 'stock', 'category_id'].includes(name) ? Number(value) : value
    }));
  };

    const handleAddProduct = () => {
    router.post('/products', productForm, {
        onSuccess: () => {
        toast.success('Product added successfully!');
        setIsAddProductModalOpen(false);
        setProductForm({
            name: '',
            category_id: '',
            price: 0,
            stock: 0,
            image: ''
        });
        },
          onError: (errors) => {
            console.error(errors);
            toast.error('Failed to add product.');
        },
    });
    };

const handleUpdateProduct = () => {
  if (!selectedProduct) return;

  router.delete(`/products/${selectedProduct.id}`, productForm, {
    onSuccess: () => {
      toast.success('Product updated successfully!');
      setIsEditProductModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to update product.');
    }
  });
};

const handleDeleteProduct = () => {
  if (!selectedProduct) return;

  router.delete(`/products/${selectedProduct.id}`, {
    onSuccess: () => {
      toast.success(`"${selectedProduct.name}" deleted successfully!`);
      setIsDeleteProductModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to delete product.');
    }
  });
};

const categoryMap = new Map(categories.map(c => [c.id, c.name]));



  return (
     <>
    <Header />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToastContainer />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your store and monitor performance</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'users', 'orders', 'products'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Revenue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₦{totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 text-sm font-medium">+12.5%</span>
                <span className="text-gray-600 text-sm ml-2">from last month</span>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-blue-600 text-sm font-medium">+8.2%</span>
                <span className="text-gray-600 text-sm ml-2">from last month</span>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-purple-600 text-sm font-medium">+3 new</span>
                <span className="text-gray-600 text-sm ml-2">this week</span>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers</p>
                  <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-orange-600 text-sm font-medium">+15.3%</span>
                <span className="text-gray-600 text-sm ml-2">from last month</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₦{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                                                      onClick={() => openViewOrderModal(order)}
                                                      className="text-blue-600 hover:text-blue-900"
                                                      title="View"
                                                    >
                                                      <Eye className="w-4 h-4" />
                                                    </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                                                  onClick={() => openViewOrderModal(order)}
                                                  className="text-blue-600 hover:text-blue-900"
                                                  title="View"
                                                >
                                                  <Eye className="w-4 h-4" />
                                                </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
            <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
            </div>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        )}


      {/* Products Tab */}
{activeTab === 'products' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            {/* FIX 2: Add onClick handler for Add Product button */}
            <button
              onClick={() => {
                setIsAddProductModalOpen(true);
                setProductForm({
                  name: '',
                  category_id: '',
                  price: 0,
                  stock: 0,
                  image: ''
                });
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{categoryMap.get(product.category_id) || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₦{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {/* FIX 3: Remove broken View button for products */}
                        <button
                            onClick={() => openEditProductModal(product)}
                            className="text-green-600 hover:text-green-900"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => openDeleteProductModal(product)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* View Order Modal */}
      {isViewOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Order #{selectedOrder.id}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Customer Name</p>
                  <p className="font-medium">{selectedOrder.user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-medium">₦{selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Order Items</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {item.product.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ₦{Number(item.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            ₦{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setIsViewOrderModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Add/Edit Product Modal */}
      {(isAddProductModalOpen || isEditProductModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">
                {isAddProductModalOpen ? 'Add New Product' : 'Edit Product'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    name="category_id"
                    value={productForm.category_id}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddProductModalOpen(false);
                  setIsEditProductModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={isAddProductModalOpen ? handleAddProduct : handleUpdateProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                {isAddProductModalOpen ? 'Add Product' : 'Update Product'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
            {isDeleteProductModalOpen && selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">Confirm Deletion</h3>
                  </div>
                  <div className="p-6">
                    <p className="mb-4">
                      Are you sure you want to delete <strong className="text-red-600">"{selectedProduct.name}"</strong>?
                      This action cannot be undone.
                    </p>
                    <div className="flex items-center p-4 bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5 text-red-600 mr-3" />
                      <p className="text-red-700">All product data will be permanently removed</p>
                    </div>
                  </div>
                  <div className="p-6 border-t flex justify-end space-x-3">
                    <button
                      onClick={() => setIsDeleteProductModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteProduct}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
     </>
  );
};
export default AdminDashboard;
