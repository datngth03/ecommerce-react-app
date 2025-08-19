// File: src/domains/order/services/orderService.ts
// File: src/domains/order/services/orderService.ts
import type { Order } from '../types';
import type { Product } from '../../products/types';

// Giả lập dữ liệu sản phẩm
const mockProducts: Product[] = [
    {
        id: 'prod-1', name: 'Sách giáo khoa Hóa học', description: 'Sách Hóa học lớp 12', price: 15.00, imageUrl: 'https://placehold.co/100x100',
        category_id: '1'
    },
    {
        id: 'prod-2', name: 'Bút bi xanh', description: 'Bút bi Thiên Long', price: 2.50, imageUrl: 'https://placehold.co/100x100',
        category_id: '1'
    },
    {
        id: 'prod-3', name: 'Tập vở', description: 'Vở 200 trang', price: 5.00, imageUrl: 'https://placehold.co/100x100',
        category_id: '1'
    },
];

// Giả lập dữ liệu đơn hàng
const mockOrders: Order[] = [
    {
        id: 'order-1',
        orderNumber: 'ORD-0001',
        date: '2025-07-28',
        status: 'Đã giao hàng',
        total: 35.00,
        items: [
            { product: mockProducts[0], quantity: 2 },
            { product: mockProducts[1], quantity: 2 },
        ],
    },
    {
        id: 'order-2',
        orderNumber: 'ORD-0002',
        date: '2025-07-30',
        status: 'Đang xử lý',
        total: 10.00,
        items: [
            { product: mockProducts[2], quantity: 2 },
        ],
    },
];

export const orderService = {
    // Giả lập API call để lấy danh sách đơn hàng của người dùng
    fetchOrders: async (): Promise<Order[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockOrders);
            }, 500);
        });
    },
};