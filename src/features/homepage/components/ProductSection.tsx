import React from 'react';
import ProductList from '../../../domains/products/components/ProductList';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductSectionProps {
    title: string;
    products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <ProductList products={products} />
        </div>
    );
};

export default ProductSection;
