import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    id: string;
    orderId: string;
    orderDate: string;
    status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    total: number;
    itemCount: number;
}

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Simulate API call to fetch order history
        const fetchOrders = async () => {
            setLoading(true);

            // Mock order data - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const mockOrders: Order[] = [
                {
                    id: '1',
                    orderId: 'ORD-2024-001234',
                    orderDate: '2024-08-18',
                    status: 'delivered',
                    items: [
                        {
                            id: '1',
                            name: 'iPhone 15 Pro Max 256GB',
                            price: 1199.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                        {
                            id: '2',
                            name: 'AirPods Pro (2nd Gen)',
                            price: 249.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                    ],
                    total: 1535.96,
                    itemCount: 2,
                },
                {
                    id: '2',
                    orderId: 'ORD-2024-001235',
                    orderDate: '2024-08-15',
                    status: 'shipped',
                    items: [
                        {
                            id: '3',
                            name: 'MacBook Air M3 15-inch',
                            price: 1299.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                        {
                            id: '4',
                            name: 'Magic Mouse 2',
                            price: 79.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                    ],
                    total: 1459.97,
                    itemCount: 2,
                },
                {
                    id: '3',
                    orderId: 'ORD-2024-001236',
                    orderDate: '2024-08-10',
                    status: 'processing',
                    items: [
                        {
                            id: '5',
                            name: 'iPad Pro 12.9-inch M4',
                            price: 1099.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                        {
                            id: '6',
                            name: 'Apple Pencil Pro',
                            price: 129.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                        {
                            id: '7',
                            name: 'Magic Keyboard for iPad Pro',
                            price: 349.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                    ],
                    total: 1663.96,
                    itemCount: 3,
                },
                {
                    id: '4',
                    orderId: 'ORD-2024-001237',
                    orderDate: '2024-08-05',
                    status: 'cancelled',
                    items: [
                        {
                            id: '8',
                            name: 'Apple Watch Ultra 2',
                            price: 799.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                    ],
                    total: 863.99,
                    itemCount: 1,
                },
                {
                    id: '5',
                    orderId: 'ORD-2024-001238',
                    orderDate: '2024-07-28',
                    status: 'delivered',
                    items: [
                        {
                            id: '9',
                            name: 'Mac Studio M2 Ultra',
                            price: 3999.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                        {
                            id: '10',
                            name: 'Studio Display',
                            price: 1599.99,
                            quantity: 1,
                            image: '/api/placeholder/60/60',
                        },
                    ],
                    total: 5911.97,
                    itemCount: 2,
                },
            ];

            setOrders(mockOrders);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
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
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
                return (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            case 'processing':
                return (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            case 'shipped':
                return (
                    <svg
                        className="w-4 h-4"
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
                );
            case 'delivered':
                return (
                    <svg
                        className="w-4 h-4"
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
                );
            case 'cancelled':
                return (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch =
            searchQuery === '' ||
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">
                        Đang tải lịch sử đơn hàng...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Lịch sử đơn hàng
                    </h1>
                    <p className="text-gray-600">
                        Theo dõi và quản lý các đơn hàng của bạn
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Status Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Tất cả ({orders.length})
                            </button>
                            <button
                                onClick={() => setFilter('delivered')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === 'delivered'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Đã giao (
                                {
                                    orders.filter(
                                        (o) => o.status === 'delivered'
                                    ).length
                                }
                                )
                            </button>
                            <button
                                onClick={() => setFilter('shipped')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === 'shipped'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Đang giao (
                                {
                                    orders.filter((o) => o.status === 'shipped')
                                        .length
                                }
                                )
                            </button>
                            <button
                                onClick={() => setFilter('processing')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === 'processing'
                                        ? 'bg-yellow-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Đang xử lý (
                                {
                                    orders.filter(
                                        (o) => o.status === 'processing'
                                    ).length
                                }
                                )
                            </button>
                            <button
                                onClick={() => setFilter('cancelled')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === 'cancelled'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Đã hủy (
                                {
                                    orders.filter(
                                        (o) => o.status === 'cancelled'
                                    ).length
                                }
                                )
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm theo mã đơn hàng hoặc sản phẩm..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery
                                ? 'Không tìm thấy đơn hàng'
                                : 'Chưa có đơn hàng nào'}
                        </h3>
                        <p className="text-gray-600 mb-8">
                            {searchQuery
                                ? 'Thử tìm kiếm với từ khóa khác hoặc xem tất cả đơn hàng'
                                : 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!'}
                        </p>
                        {searchQuery ? (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilter('all');
                                }}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Xem tất cả đơn hàng
                            </button>
                        ) : (
                            <Link
                                to="/"
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Bắt đầu mua sắm
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Đơn hàng #{order.orderId}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Đặt ngày:{' '}
                                                    {formatDate(
                                                        order.orderDate
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                                            >
                                                {getStatusIcon(order.status)}
                                                <span className="ml-1">
                                                    {getStatusText(
                                                        order.status
                                                    )}
                                                </span>
                                            </span>
                                            <p className="text-lg font-bold text-gray-900">
                                                ${order.total.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.slice(0, 3).map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center space-x-4"
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-medium text-gray-900 truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Số lượng:{' '}
                                                        {item.quantity} × $
                                                        {item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <p className="text-base font-semibold text-gray-900">
                                                        $
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {order.items.length > 3 && (
                                            <div className="text-center py-2">
                                                <p className="text-sm text-gray-500">
                                                    Và {order.items.length - 3}{' '}
                                                    sản phẩm khác...
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
                                        <Link
                                            to={`/orders/${order.orderId}`}
                                            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Xem chi tiết
                                        </Link>

                                        {order.status === 'delivered' && (
                                            <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                                Mua lại
                                            </button>
                                        )}

                                        {order.status === 'shipped' && (
                                            <button className="flex-1 px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium">
                                                Theo dõi đơn hàng
                                            </button>
                                        )}

                                        {(order.status === 'confirmed' ||
                                            order.status === 'processing') && (
                                            <button className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                                Hủy đơn hàng
                                            </button>
                                        )}

                                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                            Liên hệ hỗ trợ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Statistics */}
                {orders.length > 0 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {orders.length}
                            </div>
                            <div className="text-sm text-gray-600">
                                Tổng đơn hàng
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {
                                    orders.filter(
                                        (o) => o.status === 'delivered'
                                    ).length
                                }
                            </div>
                            <div className="text-sm text-gray-600">
                                Đã giao thành công
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                $
                                {orders
                                    .reduce(
                                        (sum, order) => sum + order.total,
                                        0
                                    )
                                    .toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">
                                Tổng chi tiêu
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-yellow-600 mb-2">
                                $
                                {orders.length > 0
                                    ? (
                                          orders.reduce(
                                              (sum, order) => sum + order.total,
                                              0
                                          ) / orders.length
                                      ).toFixed(0)
                                    : '0'}
                            </div>
                            <div className="text-sm text-gray-600">
                                Trung bình/đơn
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Shopping */}
                <div className="mt-12 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
    );
};

export default OrderHistoryPage;
