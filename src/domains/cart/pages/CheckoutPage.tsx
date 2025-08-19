// File: src/features/checkout/pages/CheckoutPage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../core/store';
import Header from '../../../core/components/common/Header';
import Footer from '../../../core/components/common/Footer';

const CheckoutPage: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.cart);
    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 my-12">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Thanh toán
                </h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Thông tin đơn hàng */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-xl font-bold mb-4">
                                Thông tin đơn hàng
                            </h2>
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center justify-between border-b pb-2 mb-2"
                                >
                                    <span>
                                        {item.product.name} x {item.quantity}
                                    </span>
                                    <span>
                                        $
                                        {(
                                            item.product.price * item.quantity
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between mt-4">
                                <span className="font-bold">Tổng tiền</span>
                                <span className="font-bold">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Phần thông tin người dùng, vận chuyển, thanh toán sẽ được phát triển sau */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">
                                Thông tin giao hàng & thanh toán
                            </h2>
                            <p className="text-gray-600">
                                Đây là trang placeholder. Chức năng chi tiết sẽ
                                được bổ sung.
                            </p>
                        </div>
                    </div>

                    {/* Tổng quan thanh toán */}
                    <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md self-start sticky top-20">
                        <h2 className="text-xl font-bold mb-4">
                            Tổng quan đơn hàng
                        </h2>
                        <div className="flex justify-between mb-2">
                            <span>Tổng sản phẩm:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Phí vận chuyển:</span>
                            <span>$0.00</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Tổng thanh toán:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 mt-6">
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;
