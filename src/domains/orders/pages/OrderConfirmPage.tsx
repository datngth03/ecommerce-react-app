import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { OrderDetails } from '../types';

const OrderConfirmationPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    // const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch order details
        const fetchOrderDetails = async () => {
            setLoading(true);

            // Mock order data - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockOrder: OrderDetails = {
                orderId: orderId || 'ORD-2024-001234',
                orderDate: new Date().toLocaleDateString('vi-VN'),
                status: 'confirmed',
                items: [
                    {
                        product: {
                            id: '1',
                            name: 'Áo thun nam',
                            slug: 'ao-thun-nam',
                            description: 'Áo thun cotton thoáng mát',
                            price: 199000,
                            originalPrice: 250000,
                            discount: 20,
                            rating: 4.5,
                            reviewCount: 120,
                            images: ['/img/shirt1.jpg'],
                            brand: {
                                id: 'b1',
                                name: 'Local Brand',
                                slug: 'local-brand',
                                logo: '/img/brand-logo.png',
                                description:
                                    'Thương hiệu thời trang local nổi tiếng',
                                categories: ['ao-thun', 'quan-jeans'],
                            },
                            category: {
                                id: 'c1',
                                name: 'Áo thun',
                                slug: 'ao-thun',
                            },
                            inStock: true,
                            stockCount: 50,
                            tags: ['hot', 'new'],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        },
                        quantity: 2,
                    },
                    {
                        product: {
                            id: '2',
                            name: 'Quần jeans nam',
                            slug: 'quan-jeans-nam',
                            description: 'Quần jeans form slim fit',
                            price: 499000,
                            rating: 4.7,
                            reviewCount: 80,
                            images: ['/img/jeans.jpg'],
                            brand: {
                                id: 'b2',
                                name: 'Denim Pro',
                                slug: 'Denim Pro',
                                logo: '/img/brand-logo.png',
                                description:
                                    'Thương hiệu thời trang local nổi tiếng',
                                categories: ['ao-thun', 'quan-jeans'],
                            },
                            category: {
                                id: 'c2',
                                name: 'Quần jeans',
                                slug: 'quan-jeans',
                            },
                            inStock: true,
                            stockCount: 30,
                            tags: ['best-seller'],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        },
                        quantity: 1,
                    },
                ],
                subtotal: 1699.97,
                shipping: 0,
                tax: 135.99,
                total: 1835.96,
                shippingAddress: {
                    name: 'Nguyễn Văn A',
                    address: '123 Đường ABC, Phường XYZ',
                    city: 'TP. Hồ Chí Minh',
                    state: 'HCM',
                    zipCode: '70000',
                    country: 'Việt Nam',
                    phone: '0123456789',
                    email: 'user@example.com',
                },
                paymentMethod: {
                    type: 'Credit Card',
                    cardLast4: '1234',
                },
                estimatedDelivery: new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                ).toLocaleDateString('vi-VN'),
            };

            setOrder(mockOrder);
            setLoading(false);
        };

        fetchOrderDetails();
    }, [orderId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Đã xác nhận';
            case 'processing':
                return 'Đang xử lý';
            case 'shipped':
                return 'Đang giao hàng';
            case 'delivered':
                return 'Đã giao hàng';
            default:
                return 'Không xác định';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">
                        Đang tải thông tin đơn hàng...
                    </p>
                </div>
            </div>
        );
    }

    if (!order) {
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
                        Không tìm thấy đơn hàng
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Đơn hàng không tồn tại hoặc đã bị xóa
                    </p>
                    <Link
                        to="/"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Đặt hàng thành công! 🎉
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng chúng
                        tôi
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Order Summary Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        Đơn hàng #{order.orderId}
                                    </h2>
                                    <p className="opacity-90">
                                        Đặt hàng ngày: {order.orderDate}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span
                                        className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)} bg-white bg-opacity-20 text-white border border-white border-opacity-30`}
                                    >
                                        {getStatusText(order.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Order Items */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    Sản phẩm đã đặt
                                </h3>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg bg-white"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-medium text-gray-900">
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-gray-600">
                                                    Số lượng: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    $
                                                    {(
                                                        item.product.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    $
                                                    {item.product.price.toFixed(
                                                        2
                                                    )}{' '}
                                                    × {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Tổng tiền
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span>
                                            ${order.subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span
                                            className={
                                                order.shipping === 0
                                                    ? 'text-green-600 font-medium'
                                                    : ''
                                            }
                                        >
                                            {order.shipping === 0
                                                ? 'Miễn phí'
                                                : `$${order.shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Thuế</span>
                                        <span>${order.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-2">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Tổng cộng</span>
                                            <span className="text-green-600">
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Shipping Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Thông tin giao hàng
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="space-y-2 text-gray-700">
                                            <p className="font-medium">
                                                {order.shippingAddress.name}
                                            </p>
                                            <p>
                                                {order.shippingAddress.address}
                                            </p>
                                            <p>
                                                {order.shippingAddress.city},{' '}
                                                {order.shippingAddress.state}{' '}
                                                {order.shippingAddress.zipCode}
                                            </p>
                                            <p>
                                                {order.shippingAddress.country}
                                            </p>
                                            <p className="pt-2 border-t border-gray-200">
                                                📱 {order.shippingAddress.phone}
                                            </p>
                                            <p>
                                                📧 {order.shippingAddress.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment & Delivery Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Thông tin thanh toán
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {order.paymentMethod.type}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    **** **** ****{' '}
                                                    {
                                                        order.paymentMethod
                                                            .cardLast4
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Dự kiến giao hàng
                                                </p>
                                                <p className="text-sm text-blue-600 font-medium">
                                                    {order.estimatedDelivery}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Tiếp theo sẽ có gì?
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        Xác nhận đơn hàng
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Chúng tôi sẽ gửi email xác nhận đơn hàng
                                        trong vòng 15 phút
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        Chuẩn bị hàng
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Đơn hàng sẽ được đóng gói và chuẩn bị
                                        trong 1-2 ngày làm việc
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        Giao hàng
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Đơn hàng sẽ được giao đến địa chỉ của
                                        bạn trong 2-3 ngày
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/orders"
                            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Xem lịch sử đơn hàng
                        </Link>

                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
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
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
