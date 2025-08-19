// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import FilterSidebar from '../components/FilterSidebar';
// import SortDropdown from '../components/SortDropdown';
// import Pagination from '../components/Pagination';
// import LoadingSpinner from '../../../shared/components/LoadingSpinner';
// import ErrorMessage from '../../../shared/components/ErrorMessage';
// import { useProducts } from '../hooks/useProducts';
// import { ProductFilters } from '../types/product';

// interface SortOption {
//     value: string;
//     label: string;
// }

// const SearchResultsPage: React.FC = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const query = searchParams.get('q') || '';
//     const category = searchParams.get('category') || '';
//     const brand = searchParams.get('brand') || '';
//     const minPrice = searchParams.get('minPrice') || '';
//     const maxPrice = searchParams.get('maxPrice') || '';
//     const sortBy = searchParams.get('sortBy') || 'relevance';
//     const page = parseInt(searchParams.get('page') || '1', 10);

//     const [filters, setFilters] = useState<ProductFilters>({
//         category,
//         brand,
//         minPrice,
//         maxPrice,
//         inStock: searchParams.get('inStock') === 'true',
//     });

//     const {
//         data: searchResults,
//         loading,
//         error,
//         refetch,
//     } = useProducts({
//         query,
//         filters,
//         sortBy,
//         page,
//         limit: 20,
//     });

//     const handleFilterChange = (newFilters: ProductFilters): void => {
//         setFilters(newFilters);
//         const params = new URLSearchParams(searchParams);

//         Object.entries(newFilters).forEach(([key, value]) => {
//             if (value && value !== '') {
//                 params.set(key, String(value));
//             } else {
//                 params.delete(key);
//             }
//         });

//         params.set('page', '1'); // Reset to first page
//         setSearchParams(params);
//     };

//     const handleSortChange = (newSort: string): void => {
//         const params = new URLSearchParams(searchParams);
//         params.set('sortBy', newSort);
//         params.set('page', '1');
//         setSearchParams(params);
//     };

//     const handlePageChange = (newPage: number): void => {
//         const params = new URLSearchParams(searchParams);
//         params.set('page', newPage.toString());
//         setSearchParams(params);
//     };

//     const handleAddToCart = (productId: string): void => {
//         // Add to cart logic
//         console.log('Adding to cart:', productId);
//     };

//     const handleAddToWishlist = (productId: string): void => {
//         // Add to wishlist logic
//         console.log('Adding to wishlist:', productId);
//     };

//     const sortOptions: SortOption[] = [
//         { value: 'relevance', label: 'Relevance' },
//         { value: 'price_low', label: 'Price: Low to High' },
//         { value: 'price_high', label: 'Price: High to Low' },
//         { value: 'rating', label: 'Customer Rating' },
//         { value: 'newest', label: 'Newest First' },
//     ];

//     if (loading) return <LoadingSpinner />;
//     if (error) return <ErrorMessage message={error} onRetry={refetch} />;

//     return (
//         <div className="search-results-page">
//             <div className="container mx-auto px-4 py-6">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Sidebar Filters */}
//                     <aside className="w-full lg:w-1/4">
//                         <FilterSidebar
//                             filters={filters}
//                             onFilterChange={handleFilterChange}
//                             availableCategories={
//                                 searchResults?.facets?.categories || []
//                             }
//                             availableBrands={
//                                 searchResults?.facets?.brands || []
//                             }
//                         />
//                     </aside>

//                     {/* Main Content */}
//                     <main className="w-full lg:w-3/4">
//                         {/* Header */}
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">
//                                     {query
//                                         ? `Search results for "${query}"`
//                                         : 'All Products'}
//                                 </h1>
//                                 <p className="text-gray-600 mt-1">
//                                     {searchResults?.total || 0} products found
//                                 </p>
//                             </div>
//                             <SortDropdown
//                                 value={sortBy}
//                                 onChange={handleSortChange}
//                                 options={sortOptions}
//                             />
//                         </div>

//                         {/* Products Grid */}
//                         {searchResults?.products?.length ? (
//                             <>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//                                     {searchResults.products.map((product) => (
//                                         <ProductCard
//                                             key={product.id}
//                                             product={product}
//                                             onAddToCart={handleAddToCart}
//                                             onAddToWishlist={
//                                                 handleAddToWishlist
//                                             }
//                                         />
//                                     ))}
//                                 </div>

//                                 <Pagination
//                                     currentPage={page}
//                                     totalPages={Math.ceil(
//                                         searchResults.total / 20
//                                     )}
//                                     onPageChange={handlePageChange}
//                                 />
//                             </>
//                         ) : (
//                             <div className="text-center py-12">
//                                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                                     No products found
//                                 </h3>
//                                 <p className="text-gray-600">
//                                     Try adjusting your search terms or filters
//                                 </p>
//                             </div>
//                         )}
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchResultsPage;
