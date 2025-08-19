import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

// interface Product {
//     id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
// }

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
