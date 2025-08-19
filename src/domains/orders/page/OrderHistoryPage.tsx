// File: src/domains/order/pages/OrderHistoryPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../store/orderSlice';
import type { AppDispatch, RootState } from '../../../core/store';
import Header from '../../../core/components/common/Header';
import Footer from '../../../core/components/common/Footer';

const OrderHistoryPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, loading, error } = useSelector(
        (state: RootState) => state.order
    );

    useEffect(() => {
        dispatch(fetchOrderHistory());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="text-center mt-10">
                Đang tải lịch sử đơn hàng...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-500">
                Bạn chưa có đơn hàng nào.
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 my-12">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Lịch sử đơn hàng
                </h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between items-center mb-4 border-b pb-4">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        Đơn hàng #{order.orderNumber}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Ngày đặt: {order.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-semibold ${order.status === 'Đã giao hàng' ? 'text-green-600' : 'text-yellow-600'}`}
                                    >
                                        {order.status}
                                    </p>
                                    <p className="text-2xl font-bold mt-2">
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Sản phẩm:
                                </h3>
                                <ul className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center text-gray-700"
                                        >
                                            <span>
                                                {item.product.name} x{' '}
                                                {item.quantity}
                                            </span>
                                            <span>
                                                $
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderHistoryPage;
