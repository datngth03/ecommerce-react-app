import React from 'react';
import {
    ShoppingCartIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-blue-600">
                    YourBrand
                </a>

                {/* Search bar */}
                <div className="flex-grow mx-4 max-w-xl">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full p-2 pl-10 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-500 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 text-gray-700">
                    <a
                        href="/profile"
                        className="flex items-center space-x-1 hover:text-blue-600"
                    >
                        <UserCircleIcon className="w-6 h-6" />
                        <span>Account</span>
                    </a>
                    <a
                        href="/cart"
                        className="relative flex items-center space-x-1 hover:text-blue-600"
                    >
                        <ShoppingCartIcon className="w-6 h-6" />
                        <span>Cart</span>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            0
                        </span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
