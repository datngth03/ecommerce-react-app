import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';
import SubcategoryNav from '../components/SubcategoryNav';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { useCategory } from '../hooks/useCategory';
import { useProducts } from '../hooks/useProducts';
import type { ProductFilters, Category, Product } from '../types/index';

type CategoryPageParams = Record<string, string | undefined>;

interface SortOption {
    value: string;
    label: string;
}

const CategoryPage: React.FC = () => {
    const { categorySlug, subcategorySlug } =
        useParams<CategoryPageParams>() as {
            categorySlug: string;
            subcategorySlug?: string;
        };
    const [searchParams, setSearchParams] = useSearchParams();

    const brand = searchParams.get('brand') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sortBy = searchParams.get('sortBy') || 'popularity';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [filters, setFilters] = useState<ProductFilters>({
        brand,
        minPrice,
        maxPrice,
        inStock: searchParams.get('inStock') === 'true',
        rating: searchParams.get('rating') || '',
    });

    const {
        data: category,
        loading: categoryLoading,
        error: categoryError,
    } = useCategory(categorySlug!);

    const {
        data: productsData,
        loading: productsLoading,
        error: productsError,
        refetch,
    } = useProducts({
        category: subcategorySlug || categorySlug,
        filters,
        sortBy,
        page,
        limit: 24,
    });

    const handleFilterChange = (newFilters: ProductFilters): void => {
        setFilters(newFilters);
        const params = new URLSearchParams(searchParams);

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && value !== '') {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });

        params.set('page', '1');
        setSearchParams(params);
    };

    const handleSortChange = (newSort: string): void => {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', newSort);
        params.set('page', '1');
        setSearchParams(params);
    };

    const handlePageChange = (newPage: number): void => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    const handleAddToCart = (product: Product) => {
        console.log('Add to cart:', product.id);
    };

    const handleAddToWishlist = (product: Product) => {
        console.log('Add to wishlist:', product.id);
    };

    const handleAddToCompare = (product: Product) => {
        console.log('Compare:', product.id);
    };

    const sortOptions: SortOption[] = [
        { value: 'popularity', label: 'Most Popular' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Customer Rating' },
        { value: 'newest', label: 'Newest First' },
        { value: 'discount', label: 'Biggest Discount' },
    ];

    if (categoryLoading) return <LoadingSpinner />;
    if (categoryError) return <ErrorMessage message={categoryError} />;
    if (!category) return <ErrorMessage message="Category not found" />;

    const currentCategory: Category | undefined = subcategorySlug
        ? category.subcategories?.find(
              (sub: { slug: string }) => sub.slug === subcategorySlug
          )
        : category;

    return (
        <div className="category-page">
            {/* Category Hero */}
            <CategoryHero
                category={currentCategory || category}
                parentCategory={subcategorySlug ? category : undefined}
                totalProducts={productsData?.total || 0}
            />

            {/* Subcategory Navigation */}
            {!subcategorySlug && category.subcategories?.length && (
                <SubcategoryNav
                    subcategories={category.subcategories}
                    parentSlug={categorySlug!}
                />
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-1/4">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            availableBrands={productsData?.facets?.brands || []}
                            categorySpecificFilters={
                                category.filterOptions || []
                            }
                            showCategoryFilter={false}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {currentCategory?.name || category.name}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {productsData?.total || 0} products
                                </p>
                            </div>
                            <SortDropdown
                                value={sortBy}
                                onChange={handleSortChange}
                                options={sortOptions}
                            />
                        </div>

                        {/* Products */}
                        {productsLoading ? (
                            <LoadingSpinner />
                        ) : productsError ? (
                            <ErrorMessage
                                message={productsError}
                                onRetry={refetch}
                            />
                        ) : productsData?.products?.length ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                    {productsData.products.map(
                                        (product: Product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                onAddToWishlist={
                                                    handleAddToWishlist
                                                }
                                                onCompare={handleAddToCompare}
                                            />
                                        )
                                    )}
                                </div>

                                <Pagination
                                    currentPage={page}
                                    totalPages={Math.ceil(
                                        productsData.total / 24
                                    )}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-600">
                                    Try adjusting your filters or check back
                                    later
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
