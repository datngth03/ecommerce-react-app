import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../core/store';
import { fetchProductById } from '../store/productSlice';
import { Helmet } from 'react-helmet';
import ReviewList from '../../../features/product-reviews/components/ReviewList';
import ReviewForm from '../../../features/product-reviews/components/ReviewForm';
import { addItemToCart } from '../../cart/store/cartSlice';
// import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const [quantity, setQuantity] = useState<number>(1);
    const [reviewRefresher, setReviewRefresher] = useState<number>(0);

    const fetchProductAndReviews = () => {
        if (id) {
            dispatch(fetchProductById(id));
            // Cập nhật state để kích hoạt lại component ReviewList
            setReviewRefresher((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchProductAndReviews();
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (currentProduct) {
            dispatch(addItemToCart({ productId: currentProduct.id, quantity }));
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                Đang tải chi tiết sản phẩm...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="text-center mt-10">Không tìm thấy sản phẩm.</div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>{currentProduct.name} | E-Commerce</title>
                <meta name="description" content={currentProduct.description} />
            </Helmet>
            <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-md">
                <div className="lg:w-1/2">
                    <img
                        src={currentProduct.imageUrl}
                        alt={currentProduct.name}
                        className="w-full h-auto rounded-md"
                    />
                </div>
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-bold mb-4">
                        {currentProduct.name}
                    </h1>
                    <p className="text-2xl font-bold text-red-500 mb-4">
                        ${currentProduct.price.toFixed(2)}
                    </p>
                    <p className="text-gray-700 mb-6">
                        {currentProduct.description}
                    </p>

                    {/* Tình trạng tồn kho - Giả định */}
                    <div className="mb-4">
                        <span className="font-semibold text-green-600">
                            Còn hàng
                        </span>
                    </div>

                    {/* Hành động mua hàng */}
                    <div className="flex items-center gap-4 mb-6">
                        <label className="font-semibold">Số lượng:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="w-20 border rounded px-2 py-1"
                        />
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>

            {/* Thêm phần Reviews ở đây */}
            <div className="mt-12">
                {currentProduct && (
                    <ReviewList
                        productId={currentProduct.id}
                        key={reviewRefresher}
                    />
                )}
                {isAuthenticated ? (
                    currentProduct && (
                        <ReviewForm
                            productId={currentProduct.id}
                            onReviewSubmitted={fetchProductAndReviews}
                        />
                    )
                ) : (
                    <p className="mt-8 text-center text-gray-600">
                        Vui lòng{' '}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            đăng nhập
                        </Link>{' '}
                        để viết đánh giá.
                    </p>
                )}
            </div>
            {/* Phần gợi ý sản phẩm sẽ được thêm ở bước sau */}
        </div>
    );
};

export default ProductDetailPage;
