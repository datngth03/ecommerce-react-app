// import React, { useState } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import BrandHero from '../components/BrandHero';
// import CategoryFilter from '../components/CategoryFilter';
// import SortDropdown from '../components/SortDropdown';
// import Pagination from '../components/Pagination';
// import LoadingSpinner from '../../../shared/components/LoadingSpinner';
// import ErrorMessage from '../../../shared/components/ErrorMessage';
// import { useBrand } from '../hooks/useBrand';
// import { useProducts } from '../hooks/useProducts';

// interface BrandPageParams {
//     brandSlug: string;
// }

// interface SortOption {
//     value: string;
//     label: string;
// }

// const BrandPage: React.FC = () => {
//     const { brandSlug } = useParams<BrandPageParams>();
//     const [searchParams, setSearchParams] = useSearchParams();

//     const category = searchParams.get('category') || '';
//     const sortBy = searchParams.get('sortBy') || 'popularity';
//     const page = parseInt(searchParams.get('page') || '1', 10);

//     const {
//         data: brand,
//         loading: brandLoading,
//         error: brandError,
//     } = useBrand(brandSlug!);

//     const {
//         data: productsData,
//         loading: productsLoading,
//         error: productsError,
//         refetch,
//     } = useProducts({
//         brand: brandSlug,
//         filters: { category },
//         sortBy,
//         page,
//         limit: 24,
//     });

//     const handleCategoryChange = (newCategory: string): void => {
//         const params = new URLSearchParams(searchParams);
//         if (newCategory) {
//             params.set('category', newCategory);
//         } else {
//             params.delete('category');
//         }
//         params.set('page', '1');
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
//         console.log('Adding to cart:', productId);
//     };

//     const handleAddToWishlist = (productId: string): void => {
//         console.log('Adding to wishlist:', productId);
//     };

//     const sortOptions: SortOption[] = [
//         { value: 'popularity', label: 'Most Popular' },
//         { value: 'price_low', label: 'Price: Low to High' },
//         { value: 'price_high', label: 'Price: High to Low' },
//         { value: 'rating', label: 'Highest Rated' },
//         { value: 'newest', label: 'Newest' },
//     ];

//     if (brandLoading) return <LoadingSpinner />;
//     if (brandError) return <ErrorMessage message={brandError} />;
//     if (!brand) return <ErrorMessage message="Brand not found" />;

//     return (
//         <div className="brand-page">
//             {/* Brand Hero Section */}
//             <BrandHero brand={brand} totalProducts={productsData?.total || 0} />

//             <div className="container mx-auto px-4 py-8">
//                 {/* Filters and Sort */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <CategoryFilter
//                         categories={brand.categories || []}
//                         selectedCategory={category}
//                         onCategoryChange={handleCategoryChange}
//                     />

//                     <div className="flex items-center gap-4">
//                         <span className="text-sm text-gray-600">
//                             {productsData?.total || 0} products
//                         </span>
//                         <SortDropdown
//                             value={sortBy}
//                             onChange={handleSortChange}
//                             options={sortOptions}
//                         />
//                     </div>
//                 </div>

//                 {/* Products */}
//                 {productsLoading ? (
//                     <LoadingSpinner />
//                 ) : productsError ? (
//                     <ErrorMessage message={productsError} onRetry={refetch} />
//                 ) : productsData?.products?.length ? (
//                     <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//                             {productsData.products.map((product) => (
//                                 <ProductCard
//                                     key={product.id}
//                                     product={product}
//                                     showBrand={false} // Hide brand since we're on brand page
//                                     onAddToCart={handleAddToCart}
//                                     onAddToWishlist={handleAddToWishlist}
//                                 />
//                             ))}
//                         </div>

//                         <Pagination
//                             currentPage={page}
//                             totalPages={Math.ceil(productsData.total / 24)}
//                             onPageChange={handlePageChange}
//                         />
//                     </>
//                 ) : (
//                     <div className="text-center py-12">
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                             No products found
//                         </h3>
//                         <p className="text-gray-600">
//                             This brand doesn't have products in the selected
//                             category
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BrandPage;
