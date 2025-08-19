// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../core/store';
// import { fetchProducts } from '../domains/products/store/productSlice';

// // Import các components đã tạo
// import Header from '../core/components/common/Header';
// import Footer from '../core/components/common/Footer';
// import Banner from '../features/homepage/components/Banner';
// import { CategoryList } from '../features/homepage/components/CategoryList';
// import ProductSection from '../features/homepage/components/ProductSection';

// const HomePage: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { products, loading, error } = useSelector(
//         (state: RootState) => state.products
//     );

//     // console.log('[HomePage] Render - products length:', products?.length);

//     useEffect(() => {
//         // Gọi API từ backend (microservice product-service) để lấy danh sách sản phẩm
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     // Giả định các dữ liệu gợi ý, bán chạy nhất và đánh giá cao từ Recommendation/Review services
//     const productList = products || [];
//     console.log('Product List:', typeof productList, productList);

//     const recommendedProducts = productList.slice(0, 4);
//     const bestSellingProducts = productList.slice(4, 8);
//     const topRatedProducts = productList.slice(8, 12);

//     return (
//         <>
//             <Header />
//             <div className="container mx-auto p-4 bg-primaryBg">
//                 <Banner />
//                 <CategoryList />

//                 {loading ? (
//                     <div className="text-center p-8">Loading products...</div>
//                 ) : (
//                     <>
//                         <ProductSection
//                             title="For You"
//                             products={recommendedProducts}
//                         />
//                         <ProductSection
//                             title="Bestsellers"
//                             products={bestSellingProducts}
//                         />
//                         <ProductSection
//                             title="Top-Rated"
//                             products={topRatedProducts}
//                         />
//                     </>
//                 )}

//                 {error && (
//                     <div className="text-center p-8 text-red-500">
//                         Error: {error}
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default HomePage;

import React, { useState } from 'react';
import {
    Search,
    ShoppingCart,
    User,
    Heart,
    Menu,
    Star,
    ArrowRight,
    Truck,
    Shield,
    Headphones,
    RefreshCw,
} from 'lucide-react';
import Footer from '../core/components/common/Footer';

const EcommerceHomepage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState(3);

    // Sample data
    const categories = [
        {
            id: 1,
            name: 'Electronics',
            image: '📱',
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: 2,
            name: 'Fashion',
            image: '👕',
            color: 'from-pink-500 to-pink-600',
        },
        {
            id: 3,
            name: 'Home & Garden',
            image: '🏡',
            color: 'from-green-500 to-green-600',
        },
        {
            id: 4,
            name: 'Sports',
            image: '⚽',
            color: 'from-orange-500 to-orange-600',
        },
        {
            id: 5,
            name: 'Books',
            image: '📚',
            color: 'from-purple-500 to-purple-600',
        },
        {
            id: 6,
            name: 'Beauty',
            image: '💄',
            color: 'from-red-500 to-red-600',
        },
    ];

    const featuredProducts = [
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            price: '29,990,000₫',
            originalPrice: '32,990,000₫',
            image: '📱',
            rating: 4.8,
            reviews: 234,
            discount: '9%',
        },
        {
            id: 2,
            name: 'MacBook Air M2',
            price: '25,990,000₫',
            originalPrice: '28,990,000₫',
            image: '💻',
            rating: 4.9,
            reviews: 456,
            discount: '10%',
        },
        {
            id: 3,
            name: 'AirPods Pro',
            price: '5,990,000₫',
            originalPrice: '6,990,000₫',
            image: '🎧',
            rating: 4.7,
            reviews: 789,
            discount: '14%',
        },
        {
            id: 4,
            name: 'Apple Watch Series 9',
            price: '8,990,000₫',
            originalPrice: '9,990,000₫',
            image: '⌚',
            rating: 4.6,
            reviews: 321,
            discount: '10%',
        },
    ];

    const handleAddToCart = () => {
        setCartItems((prev) => prev + 1);
        // Handle add to cart logic
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top bar */}
                    <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Truck className="w-4 h-4" />
                                <span>Miễn phí vận chuyển đơn từ 500k</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Hotline: 1900-123-456</span>
                            <span>Theo dõi đơn hàng</span>
                        </div>
                    </div>

                    {/* Main header */}
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ShopVN
                            </h1>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                                    Tìm
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <Heart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </button>

                            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItems}
                                </span>
                            </button>

                            <div className="flex items-center gap-2 pl-4 border-l">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-gray-900">
                                        Chào, User!
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tài khoản & Đơn hàng
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="py-3 border-t">
                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                                <Menu className="w-5 h-5" />
                                <span className="font-medium">Danh mục</span>
                            </button>
                            <div className="flex items-center gap-6 text-sm">
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Trang chủ
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Sản phẩm hot
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Flash Sale
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Thương hiệu
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Về chúng tôi
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-5xl font-bold mb-4 leading-tight">
                                Khám phá <br />
                                <span className="text-yellow-300">
                                    Thế giới mua sắm
                                </span>
                            </h2>
                            <p className="text-xl mb-6 text-blue-100">
                                Hàng triệu sản phẩm chính hãng, giá tốt nhất thị
                                trường
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                    Mua sắm ngay
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                    Tìm hiểu thêm
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                                <div className="text-6xl mb-4">🛍️</div>
                                <h3 className="text-2xl font-bold mb-2">
                                    Flash Sale
                                </h3>
                                <p className="text-blue-100 mb-4">
                                    Giảm đến 70% hôm nay
                                </p>
                                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                                    Còn 2:45:30
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        Danh mục nổi bật
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group cursor-pointer"
                            >
                                <div
                                    className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 text-center text-white transform group-hover:scale-105 transition-all duration-200 shadow-lg group-hover:shadow-xl`}
                                >
                                    <div className="text-4xl mb-3">
                                        {category.image}
                                    </div>
                                    <h4 className="font-semibold text-sm">
                                        {category.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-3xl font-bold text-gray-900">
                            Sản phẩm nổi bật
                        </h3>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                            Xem tất cả
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden"
                            >
                                <div className="relative p-6">
                                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                        -{product.discount}
                                    </div>
                                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                    </button>

                                    <div className="text-6xl text-center mb-4">
                                        {product.image}
                                    </div>

                                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {product.name}
                                    </h4>

                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-500 ml-1">
                                            ({product.reviews})
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-red-600">
                                                {product.price}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                {product.originalPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => handleAddToCart()}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-700"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Miễn phí vận chuyển
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Đơn hàng từ 500.000đ
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Bảo hành chính hãng
                            </h4>
                            <p className="text-gray-600 text-sm">
                                100% sản phẩm chính hãng
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RefreshCw className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Đổi trả dễ dàng
                            </h4>
                            <p className="text-gray-600 text-sm">
                                30 ngày đổi trả miễn phí
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Headphones className="w-8 h-8 text-orange-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Hỗ trợ 24/7
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Tư vấn mọi lúc mọi nơi
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EcommerceHomepage;
