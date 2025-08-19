import httpClient from '../../../core/api/http-client';
import type { Category, Product, ProductFilters } from '../types';

interface ProductResponse {
    products: Product[];
    total: number;
    facets?: {
        brands: string[];
        // Có thể thêm các filter khác nếu cần, ví dụ:
        // colors?: string[];
        // sizes?: string[];
    };

}

export const productService = {
    // 🛍️ Products
    createProduct: async (data: Partial<Product>): Promise<Product> => {
        const response = await httpClient.post<Product>('/products', data);
        return response.data;
    },

    getProducts: async (
        filters?: ProductFilters,
        sortBy?: string,
        page: number = 1,
        limit: number = 24
    ): Promise<ProductResponse> => {
        const params = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    params.set(key, String(value));
                }
            });
        }

        if (sortBy) params.set('sortBy', sortBy);
        params.set('page', page.toString());
        params.set('limit', limit.toString());

        const response = await httpClient.get<ProductResponse>(`/products?${params.toString()}`);
        return response.data;
    },

    getProductById: async (id: string): Promise<Product> => {
        const response = await httpClient.get<Product>(`/products/${id}`);
        return response.data;
    },

    updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
        const response = await httpClient.put<Product>(`/products/${id}`, data);
        return response.data;
    },

    deleteProduct: async (id: string): Promise<{ message: string }> => {
        const response = await httpClient.delete<{ message: string }>(`/products/${id}`);
        return response.data;
    },

    searchProducts: async (query: string): Promise<Product[]> => {
        const response = await httpClient.get<Product[]>(`/search?q=${encodeURIComponent(query)}`);
        return response.data;
    },

    // 🗂️ Categories

    createCategory: async (data: Partial<Category>): Promise<{ id: string }> => {
        const response = await httpClient.post<{ id: string }>('/categories', data);
        return response.data;
    },

    getCategoryById: async (id: string): Promise<Category> => {
        const response = await httpClient.get<Category>(`/categories/${id}`);
        return response.data;
    },

    getCategoryBySlug: async (slug: string): Promise<Category> => {
        const response = await httpClient.get<Category>(`/categories/slug/${slug}`);
        return response.data;
    },

    getCategories: async (): Promise<Category[]> => {
        const response = await httpClient.get<Category[]>('/categories');
        return response.data;
    },
};