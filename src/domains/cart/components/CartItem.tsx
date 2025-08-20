// File: src/domains/cart/components/CartItem.tsx
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { AppDispatch } from '../../../core/store';
// import { AppDispatch } from '../../../core/store';
import formatPrice from '../../../utils/formatters';
import type { CartItem as CartItemType } from '../types';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center space-x-4">
                <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {item.product.name}
                    </h3>
                    <p className="text-gray-600">
                        {formatPrice(item.product.price)} đ
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-800 w-8 text-center">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-800"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="w-28 text-right">
                    <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)} đ
                    </span>
                </div>
                <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                    aria-label={`Xóa ${item.product.name}`}
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;

// ---

// ---
