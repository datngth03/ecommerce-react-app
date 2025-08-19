import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import type { Category } from '../types';

export const useCategory = (slug: string) => {
    const [data, setData] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const response = await productService.getCategoryBySlug(slug);
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
        };

        fetchCategory();
    }, [slug]);

    return { data, loading, error };
};
