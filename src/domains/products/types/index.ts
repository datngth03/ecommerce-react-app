// export interface Product {
//     id: string;
//     name: string;
//     price: number;
//     description: string;
//     imageUrl: string;
//     category_id: string;
// }


// export interface Category {
//     id: string;
//     name: string;
//     description: string;
// }



export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    images: string[];
    brand: Brand;
    category: Category;
    inStock: boolean;
    stockCount: number;
    specifications?: Record<string, unknown>;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description?: string;
    categories: string[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    subcategories?: Category[];
    filterOptions?: FilterOption[];
}

export interface FilterOption {
    key: string;
    label: string;
    type: 'checkbox' | 'range' | 'select';
    options?: { value: string; label: string; count?: number }[];
}

export interface ProductFilters {
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: boolean;
    rating?: string;
    [key: string]: unknown;
}



export interface ProductSearchParams {
    query?: string;
    filters?: ProductFilters;
    sortBy?: string;
    page?: number;
    limit?: number;
    ids?: string[];
    includeSpecs?: boolean;
    brand?: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
    facets?: {
        categories: { name: string; count: number }[];
        brands: { name: string; count: number }[];
    };
}

export interface ComparisonData {
    highlights: Record<string, string[]>;
    summary: string[];
}


export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onAddToWishlist?: (product: Product) => void;
    onCompare?: (product: Product) => void;
}
