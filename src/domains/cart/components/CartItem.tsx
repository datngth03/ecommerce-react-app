// File: src/domains/cart/components/CartItem.tsx
import React from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { AppDispatch } from '../../../core/store';
// import { AppDispatch } from '../../../core/store';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemoveItem,
}) => {
    return (
        <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-4">
                <Link to={`/products/${item.product.id}`}>
                    <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                </Link>
                <div>
                    <h2 className="font-semibold text-lg">
                        <Link
                            to={`/products/${item.product.id}`}
                            className="hover:text-blue-600"
                        >
                            {item.product.name}
                        </Link>
                    </h2>
                    <p className="text-gray-500">
                        ${item.product.price.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center">
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                            onUpdateQuantity(
                                item.product.id,
                                Number(e.target.value)
                            )
                        }
                        className="w-12 text-center border-t border-b px-1 py-1"
                        min="1"
                    />
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Xóa
                </button>
                <span className="font-bold text-red-500">
                    ${(item.product.price * item.quantity).toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default CartItem;

// ---

// ---
