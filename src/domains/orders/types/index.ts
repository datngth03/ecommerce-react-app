// File: src/domains/order/types.ts

import type { Product } from "../../products/types";

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'Đã giao hàng' | 'Đang xử lý' | 'Đã hủy';
    total: number;
    items: OrderItem[];
}



export interface OrderDetails {
    orderId: string;
    orderDate: string;
    status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
        email: string;
    };
    paymentMethod: {
        type: string;
        cardLast4: string;
    };
    estimatedDelivery: string;
}