// components/ProductCard.tsx
import React from 'react';
import type { ProductCardProps } from '../types/index';
import { ShoppingCart, Heart, Scale } from 'lucide-react'; // nice icons

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onAddToWishlist,
    onCompare,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col">
            {/* Product Image */}
            <img
                src={product.images?.[0] ?? '/placeholder.png'}
                alt={product.name}
                className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold truncate">
                    {product.name}
                </h3>
                <p className="text-gray-700 mt-2 font-bold">
                    ${product.price.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-4 space-x-2">
                    <button
                        onClick={() => onAddToCart?.(product)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <ShoppingCart size={16} />
                        Add
                    </button>
                    <button
                        onClick={() => onAddToWishlist?.(product)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                        <Heart size={18} />
                    </button>
                    <button
                        onClick={() => onCompare?.(product)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        <Scale size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
