import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          {!product.stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <span className="text-2xl font-bold text-gray-900">
                ₦{product.price}
            </span>

            <button
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">Add to Cart</span>
            </button>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
