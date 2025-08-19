/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../store/productSlice';
// import type { RootState, AppDispatch } from '../../../core/store';
// import ProductList from '../components/ProductList';

// const ProductsPage: React.FC = () => {
//    const dispatch = useDispatch<AppDispatch>();
//    const { products, loading, error } = useSelector(
//       (state: RootState) => state.products
//    );

//    useEffect(() => {
//       dispatch(fetchProducts());
//    }, [dispatch]);

//    if (loading) {
//       return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
//    }

//    if (error) {
//       return <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>;
//    }

//    return (
//       <div className="container mx-auto p-4">
//          <h1 className="text-3xl font-bold text-center mb-8">
//             Tất cả sản phẩm
//          </h1>
//          <ProductList products={products} />
//       </div>
//    );
// };

// export default ProductsPage;

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Grid,
    List,
    ChevronDown,
    Star,
    Heart,
    ShoppingCart,
    //  ArrowUpDown,
    X,
    Check,
} from 'lucide-react';

const ProductListingPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const [priceRange, setPriceRange] = useState([0, 50000000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    // Sample data
    const category = 'Electronics'; // This would come from URL params
    const totalProducts = 156;

    const products = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        name: `iPhone ${15 - (i % 3)} Pro${i % 2 === 0 ? ' Max' : ''}`,
        brand: ['Apple', 'Samsung', 'Xiaomi', 'Oppo'][i % 4],
        price: 15990000 + i * 1000000,
        originalPrice: 18990000 + i * 1200000,
        discount: Math.floor(Math.random() * 30) + 5,
        image: ['📱', '💻', '⌚', '🎧', '📷'][i % 5],
        rating: 4.0 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 500) + 50,
        isNew: i % 5 === 0,
        isBestSeller: i % 7 === 0,
        freeShipping: i % 3 === 0,
        inStock: i % 10 !== 9,
    }));

    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme'];
    const ratings = [5, 4, 3, 2, 1];

    const sortOptions = [
        { value: 'popularity', label: 'Phổ biến nhất' },
        { value: 'newest', label: 'Mới nhất' },
        { value: 'price-low', label: 'Giá: Thấp → Cao' },
        { value: 'price-high', label: 'Giá: Cao → Thấp' },
        { value: 'rating', label: 'Đánh giá cao' },
        { value: 'discount', label: 'Giảm giá nhiều' },
    ];

    const priceRanges: [number, number, string][] = [
        [0, 5000000, 'Dưới 5 triệu'],
        [5000000, 10000000, '5-10 triệu'],
        [10000000, 20000000, '10-20 triệu'],
        [20000000, 50000000, 'Trên 20 triệu'],
    ];

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const handleRatingChange = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating]
        );
    };

    const formatPrice = (price: number | bigint) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedRatings([]);
        setPriceRange([0, 50000000]);
    };

    const ProductCard = ({
        product,
        isListView = false,
    }: {
        product: any;
        isListView?: boolean;
    }) => (
        <div
            className={`group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden ${
                isListView ? 'flex' : ''
            }`}
        >
            {/* Product Image */}
            <div
                className={`relative ${isListView ? 'w-48 flex-shrink-0' : 'aspect-square'}`}
            >
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            -{product.discount}%
                        </span>
                    )}
                    {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            NEW
                        </span>
                    )}
                    {product.isBestSeller && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            HOT
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Search className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                {!product.inStock && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                            Hết hàng
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div
                className={`p-4 flex-1 ${isListView ? 'flex flex-col justify-between' : ''}`}
            >
                <div className={isListView ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">
                            {product.brand}
                        </span>
                        {product.freeShipping && (
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                                Miễn phí ship
                            </span>
                        )}
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            {product.rating.toFixed(1)} ({product.reviews})
                        </span>
                    </div>

                    <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-600">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>
                        {product.originalPrice > product.price && (
                            <div className="text-sm text-green-600 font-medium">
                                Tiết kiệm{' '}
                                {formatPrice(
                                    product.originalPrice - product.price
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    disabled={!product.inStock}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600">
                            Trang chủ
                        </a>
                        <span>›</span>
                        <span className="font-medium text-gray-900">
                            {category}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div
                        className={`${showFilters ? 'block' : 'hidden lg:block'} w-80 flex-shrink-0`}
                    >
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Bộ lọc
                                </h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Xóa tất cả
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">
                                    Khoảng giá
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Từ"
                                            value={priceRange[0]}
                                            onChange={(e) =>
                                                setPriceRange([
                                                    parseInt(e.target.value) ||
                                                        0,
                                                    priceRange[1],
                                                ])
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Đến"
                                            value={priceRange[1]}
                                            onChange={(e) =>
                                                setPriceRange([
                                                    priceRange[0],
                                                    parseInt(e.target.value) ||
                                                        50000000,
                                                ])
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {priceRanges.map(
                                            ([min, max, label]) => (
                                                <button
                                                    key={label}
                                                    onClick={() =>
                                                        setPriceRange([
                                                            min,
                                                            max,
                                                        ])
                                                    }
                                                    className="px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-left"
                                                >
                                                    {label}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">
                                    Thương hiệu
                                </h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {brands.map((brand) => (
                                        <label
                                            key={brand}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                                        >
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(
                                                        brand
                                                    )}
                                                    onChange={() =>
                                                        handleBrandChange(brand)
                                                    }
                                                    className="sr-only"
                                                />
                                                <div
                                                    className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                                                        selectedBrands.includes(
                                                            brand
                                                        )
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : 'border-gray-300 hover:border-blue-500'
                                                    }`}
                                                >
                                                    {selectedBrands.includes(
                                                        brand
                                                    ) && (
                                                        <Check className="w-3 h-3" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-700">
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">
                                    Đánh giá
                                </h4>
                                <div className="space-y-2">
                                    {ratings.map((rating) => (
                                        <label
                                            key={rating}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                                        >
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRatings.includes(
                                                        rating
                                                    )}
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            rating
                                                        )
                                                    }
                                                    className="sr-only"
                                                />
                                                <div
                                                    className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                                                        selectedRatings.includes(
                                                            rating
                                                        )
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : 'border-gray-300 hover:border-blue-500'
                                                    }`}
                                                >
                                                    {selectedRatings.includes(
                                                        rating
                                                    ) && (
                                                        <Check className="w-3 h-3" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(rating)].map(
                                                    (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4 text-yellow-400 fill-current"
                                                        />
                                                    )
                                                )}
                                                {[...Array(5 - rating)].map(
                                                    (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4 text-gray-300"
                                                        />
                                                    )
                                                )}
                                                <span className="text-sm text-gray-600 ml-1">
                                                    trở lên
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Filters Button */}
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Áp dụng bộ lọc
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {category}
                                    </h1>
                                    <p className="text-gray-600">
                                        Hiển thị{' '}
                                        {(currentPage - 1) * productsPerPage +
                                            1}
                                        -
                                        {Math.min(
                                            currentPage * productsPerPage,
                                            totalProducts
                                        )}{' '}
                                        trong tổng số {totalProducts} sản phẩm
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Bộ lọc
                                    </button>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) =>
                                                setSortBy(e.target.value)
                                            }
                                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {sortOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    {/* View Mode */}
                                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 transition-colors ${
                                                viewMode === 'grid'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 transition-colors ${
                                                viewMode === 'list'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedBrands.length > 0 ||
                            selectedRatings.length > 0) && (
                            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-gray-700">
                                        Bộ lọc đang áp dụng:
                                    </span>
                                    {selectedBrands.map((brand) => (
                                        <span
                                            key={brand}
                                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {brand}
                                            <button
                                                onClick={() =>
                                                    handleBrandChange(brand)
                                                }
                                                className="hover:bg-blue-200 rounded-full p-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {selectedRatings.map((rating) => (
                                        <span
                                            key={rating}
                                            className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {rating}⭐+
                                            <button
                                                onClick={() =>
                                                    handleRatingChange(rating)
                                                }
                                                className="hover:bg-yellow-200 rounded-full p-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Products Grid/List */}
                        <div
                            className={`mb-8 ${
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                    : 'space-y-4'
                            }`}
                        >
                            {products
                                .slice(0, productsPerPage)
                                .map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isListView={viewMode === 'list'}
                                    />
                                ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>

                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:border-blue-500'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500">
                                Tiếp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
