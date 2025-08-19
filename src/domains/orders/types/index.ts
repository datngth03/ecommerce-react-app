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