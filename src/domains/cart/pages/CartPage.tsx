// File: src/domains/cart/pages/CartPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchCart,
    updateQuantity,
    removeItemFromCart,
} from '../store/cartSlice';
import type { RootState, AppDispatch } from '../../../core/store';
import CartItem from '../components/CartItem'; // Import CartItem

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector(
        (state: RootState) => state.cart
    );

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ productId, quantity }));
        }
    };

    const handleRemoveItem = (productId: string) => {
        dispatch(removeItemFromCart(productId));
    };

    if (loading) {
        return <div className="text-center mt-10">Đang tải giỏ hàng...</div>;
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">
                Giỏ hàng của bạn
            </h1>
            {items.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p className="mb-4">Giỏ hàng của bạn đang trống.</p>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Quay lại trang chủ
                    </Link>
                </div>
            ) : (
                <>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {items.map((item) => (
                            <CartItem
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))}
                    </div>
                    <div className="mt-8 text-right">
                        <h2 className="text-2xl font-bold mb-4">
                            Tổng cộng: ${total.toFixed(2)}
                        </h2>
                        <Link
                            to="/checkout"
                            className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600"
                        >
                            Tiến hành thanh toán
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
