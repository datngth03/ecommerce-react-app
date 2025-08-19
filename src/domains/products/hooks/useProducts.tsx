import { useEffect, useState, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product, ProductFilters } from '../types';

interface ProductsResponse {
    products: Product[];
    total: number;
    facets?: {
        brands: string[];
        // You can add more facets here later if needed
    };
}

export const useProducts = ({
    category,
    filters,
    sortBy,
    page,
    limit,
}: {
    category: string;
    filters: ProductFilters;
    sortBy: string;
    page: number;
    limit: number;
}) => {
    const [data, setData] = useState<ProductsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts({
                category,
                filters,
                sortBy,
                page,
                limit,
            });
            setData(response);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch products');
            }
        } finally {
            setLoading(false);
        }
    }, [category, filters, sortBy, page, limit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { data, loading, error, refetch: fetchProducts };
};
