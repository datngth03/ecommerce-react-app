import httpClient from '../../../core/api/http-client';
import type { CartItem } from '../types';

export const cartService = {
    getCart: async (): Promise<CartItem[]> => {
        const response = await httpClient.get<CartItem[]>('/cart');
        return response.data;
    },
    addToCart: async (productId: string, quantity: number): Promise<CartItem[]> => {
        const response = await httpClient.post<CartItem[]>('/cart/add', { productId, quantity });
        return response.data;
    },
    removeFromCart: async (productId: string): Promise<CartItem[]> => {
        const response = await httpClient.post<CartItem[]>('/cart/remove', { productId });
        return response.data;
    },
    updateQuantity: async (productId: string, quantity: number): Promise<CartItem[]> => {
        const response = await httpClient.post<CartItem[]>('/cart/update', { productId, quantity });
        return response.data;
    },
};