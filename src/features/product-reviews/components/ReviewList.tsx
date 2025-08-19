import React, { useEffect, useState } from 'react';
import { reviewService } from '../services/reviewService';

interface Review {
    id: string;
    userId: string;
    comment: string;
    rating: number;
}

interface ReviewListProps {
    productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data =
                    await reviewService.getReviewsByProductId(productId);
                setReviews(data);
            } catch (error) {
                console.error('Failed to fetch reviews', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);

    if (loading) return <div>Đang tải đánh giá...</div>;

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h3>
            {reviews.length === 0 ? (
                <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-gray-100 p-4 rounded-md mb-4"
                    >
                        <div className="flex items-center mb-2">
                            <span className="font-semibold">
                                {review.userId}
                            </span>
                            <span className="ml-2 text-yellow-500">
                                {'★'.repeat(review.rating)}
                            </span>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
