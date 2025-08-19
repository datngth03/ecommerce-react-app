import React from 'react';
import { FaTshirt, FaDesktop, FaBook, FaGem, FaHome } from 'react-icons/fa';

const categories = [
    { name: 'Apparel', icon: FaTshirt },
    { name: 'Electronics', icon: FaDesktop },
    { name: 'Books', icon: FaBook },
    { name: 'Home Goods', icon: FaHome },
    { name: 'Jewelry', icon: FaGem },
];

export const CategoryList: React.FC = () => {
    return (
        <div className="my-12">
            <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
            <div className="flex justify-between space-x-12">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="flex-1 flex flex-col items-center justify-center p-6 border-none rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <category.icon className="w-12 h-12 text-blue-600 mb-2" />
                        <span className="text-lg font-semibold">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
