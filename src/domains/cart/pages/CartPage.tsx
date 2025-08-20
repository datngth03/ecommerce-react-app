import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchCart,
    updateQuantity,
    removeItemFromCart,
} from '../store/cartSlice';
import type { RootState, AppDispatch } from '../../../core/store';
import CartItem from '../components/CartItem';
import formatPrice from '../../../utils/formatters';

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector(
        (state: RootState) => state.cart
    );

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ productId, quantity }));
        }
    };

    const handleRemoveItem = (productId: string) => {
        dispatch(removeItemFromCart(productId));
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">
                        Đang tải giỏ hàng...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Có lỗi xảy ra
                    </h2>
                    <p className="text-red-500 mb-6">{error}</p>
                    <button
                        onClick={() => dispatch(fetchCart())}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg
                                className="w-16 h-16 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M7 13h10M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Giỏ hàng trống
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám
                            phá các sản phẩm tuyệt vời của chúng tôi!
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Main cart content
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Giỏ hàng của bạn
                    </h1>
                    <p className="text-gray-600">
                        {totalItems} sản phẩm trong giỏ hàng
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 mb-8 lg:mb-0">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Sản phẩm đã chọn
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <div
                                        key={item.product.id}
                                        className={`p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                    >
                                        <CartItem
                                            item={item}
                                            onUpdateQuantity={
                                                handleUpdateQuantity
                                            }
                                            onRemoveItem={handleRemoveItem}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                            <Link
                                to="/"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    />
                                </svg>
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Tóm tắt đơn hàng
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>
                                        Tạm tính ({totalItems} sản phẩm)
                                    </span>
                                    <span>{formatPrice(subtotal)} đ</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span
                                        className={
                                            shipping === 0
                                                ? 'text-green-600 font-medium'
                                                : ''
                                        }
                                    >
                                        {shipping === 0
                                            ? 'Miễn phí'
                                            : `${formatPrice(shipping)} đ`}
                                    </span>
                                </div>

                                {shipping > 0 && (
                                    <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                                        💡 Mua thêm $
                                        {formatPrice(50 - subtotal)} để được
                                        miễn phí vận chuyển!
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Thuế (8%)</span>
                                    <span>{formatPrice(tax)} đ</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Tổng cộng</span>
                                        <span>{formatPrice(total)} đ</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Tiến hành thanh toán
                            </Link>

                            {/* Security Badge */}
                            <div className="mt-6 text-center">
                                <div className="flex items-center justify-center text-sm text-gray-500">
                                    <svg
                                        className="w-4 h-4 mr-1 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    Thanh toán an toàn & bảo mật
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
