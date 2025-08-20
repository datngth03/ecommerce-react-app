import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../core/store';
import { fetchProductById } from '../store/productSlice';
import { Helmet } from 'react-helmet';
import ReviewList from '../../../features/product-reviews/components/ReviewList';
import ReviewForm from '../../../features/product-reviews/components/ReviewForm';
import { addItemToCart } from '../../cart/store/cartSlice';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { currentProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { items: cartItems } = useSelector((state: RootState) => state.cart);

    const [quantity, setQuantity] = useState<number>(1);
    const [reviewRefresher, setReviewRefresher] = useState<number>(0);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    // Memoized calculations
    const totalPrice = useMemo(() => {
        return currentProduct
            ? (currentProduct.price * quantity).toFixed(2)
            : '0.00';
    }, [currentProduct, quantity]);

    const isInCart = useMemo(() => {
        return currentProduct
            ? cartItems.some((item) => item.product.id === currentProduct.id)
            : false;
    }, [cartItems, currentProduct]);

    // Fetch product data
    const fetchProductAndReviews = useCallback(() => {
        if (id) {
            dispatch(fetchProductById(id));
            setReviewRefresher((prev) => prev + 1);
        }
    }, [dispatch, id]);

    useEffect(() => {
        fetchProductAndReviews();
    }, [fetchProductAndReviews]);

    // Redirect if invalid product ID
    useEffect(() => {
        if (id && !loading && !currentProduct && !error) {
            navigate('/404', { replace: true });
        }
    }, [id, loading, currentProduct, error, navigate]);

    // Handle add to cart with loading state
    const handleAddToCart = useCallback(async () => {
        if (!currentProduct || isAddingToCart) return;

        setIsAddingToCart(true);
        try {
            await dispatch(
                addItemToCart({
                    productId: currentProduct.id,
                    quantity,
                })
            ).unwrap();

            // Optional: Show success message or update UI
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            // Handle error (show toast, etc.)
        } finally {
            setIsAddingToCart(false);
        }
    }, [currentProduct, quantity, dispatch, isAddingToCart]);

    // Handle quantity change with validation
    const handleQuantityChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(
                1,
                Math.min(99, Number(e.target.value) || 1)
            );
            setQuantity(value);
        },
        []
    );

    // Handle image error
    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="animate-pulse">
                    <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-md">
                        <div className="lg:w-1/2">
                            <div className="w-full h-96 bg-gray-300 rounded-md"></div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="h-8 bg-gray-300 rounded mb-4"></div>
                            <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-6 w-2/3"></div>
                            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center mt-10">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">
                            Có lỗi xảy ra
                        </h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchProductAndReviews}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Product not found
    if (!currentProduct) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center mt-10">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Không tìm thấy sản phẩm
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị
                            xóa.
                        </p>
                        <Link
                            to="/products"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
                        >
                            Xem tất cả sản phẩm
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>{currentProduct.name} | E-Commerce</title>
                <meta name="description" content={currentProduct.description} />
                <meta property="og:title" content={currentProduct.name} />
                <meta
                    property="og:description"
                    content={currentProduct.description}
                />
                <meta property="og:image" content={currentProduct.images[0]} />
                <meta property="og:type" content="product" />
            </Helmet>

            {/* Breadcrumb Navigation */}
            <nav className="mb-6 text-sm text-gray-600">
                <Link to="/" className="hover:text-blue-600">
                    Trang chủ
                </Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-blue-600">
                    Sản phẩm
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{currentProduct.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-md">
                {/* Product Image */}
                <div className="lg:w-1/2">
                    {!imageError ? (
                        <img
                            src={currentProduct.images[0]}
                            alt={currentProduct.name}
                            className="w-full h-auto rounded-md object-cover max-h-96"
                            onError={handleImageError}
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-200 rounded-md flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <svg
                                    className="w-16 h-16 mx-auto mb-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>Không thể tải hình ảnh</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        {currentProduct.name}
                    </h1>

                    <div className="mb-4">
                        <span className="text-3xl font-bold text-red-500">
                            ${currentProduct.price.toFixed(2)}
                        </span>
                        {quantity > 1 && (
                            <span className="text-lg text-gray-600 ml-4">
                                Tổng: ${totalPrice}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {currentProduct.description}
                    </p>

                    {/* Stock Status */}
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-green-600 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-semibold text-green-800">
                                Còn hàng
                            </span>
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="quantity"
                                className="font-semibold text-gray-700"
                            >
                                Số lượng:
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max="99"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-20 border border-gray-300 rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`flex-1 px-6 py-3 rounded-md text-lg font-semibold transition-all duration-200 ${
                                    isAddingToCart
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : isInCart
                                          ? 'bg-green-500 hover:bg-green-600'
                                          : 'bg-blue-500 hover:bg-blue-600'
                                } text-white`}
                            >
                                {isAddingToCart ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Đang thêm...
                                    </span>
                                ) : isInCart ? (
                                    '✓ Đã có trong giỏ hàng'
                                ) : (
                                    'Thêm vào giỏ hàng'
                                )}
                            </button>

                            {/* Buy Now Button */}
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/cart');
                                }}
                                disabled={isAddingToCart}
                                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>

                    {/* Additional Product Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 rounded-md">
                            <h4 className="font-semibold text-gray-800 mb-1">
                                Giao hàng
                            </h4>
                            <p className="text-gray-600">
                                Miễn phí giao hàng cho đơn hàng trên $50
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                            <h4 className="font-semibold text-gray-800 mb-1">
                                Bảo hành
                            </h4>
                            <p className="text-gray-600">
                                12 tháng bảo hành chính hãng
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                            <h4 className="font-semibold text-gray-800 mb-1">
                                Đổi trả
                            </h4>
                            <p className="text-gray-600">
                                Đổi trả trong 30 ngày
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                            <h4 className="font-semibold text-gray-800 mb-1">
                                Hỗ trợ
                            </h4>
                            <p className="text-gray-600">
                                Hỗ trợ 24/7 qua hotline
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Specifications */}
            {currentProduct.specifications && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Thông số kỹ thuật
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(currentProduct.specifications).map(
                            ([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between py-2 border-b border-gray-200"
                                >
                                    <span className="font-medium text-gray-700 capitalize">
                                        {key}:
                                    </span>
                                    <span className="text-gray-900">
                                        {typeof value === 'object' &&
                                        value !== null
                                            ? JSON.stringify(value)
                                            : String(value)}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Đánh giá sản phẩm
                </h2>

                {currentProduct && (
                    <ReviewList
                        productId={currentProduct.id}
                        key={reviewRefresher}
                    />
                )}

                {/* Review Form */}
                <div className="mt-8">
                    {isAuthenticated ? (
                        currentProduct && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                    Viết đánh giá
                                </h3>
                                <ReviewForm
                                    productId={currentProduct.id}
                                    onReviewSubmitted={fetchProductAndReviews}
                                />
                            </div>
                        )
                    ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                            <p className="text-blue-800 mb-4">
                                Bạn cần đăng nhập để viết đánh giá sản phẩm
                            </p>
                            <div className="space-x-4">
                                <Link
                                    to="/login"
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors inline-block"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products Section Placeholder */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Sản phẩm liên quan
                </h2>
                <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
                    <p>Sản phẩm liên quan sẽ được hiển thị ở đây</p>
                    <p className="text-sm mt-2">
                        (Tính năng này sẽ được phát triển trong tương lai)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
