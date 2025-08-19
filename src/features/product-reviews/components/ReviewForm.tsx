import React, { useState } from 'react';
import { reviewService } from '../services/reviewService';
import Button from '../../../core/components/common/Button';

interface ReviewFormProps {
    productId: string;
    onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    productId,
    onReviewSubmitted,
}) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await reviewService.submitReview({ productId, rating, comment });
            alert('Đánh giá của bạn đã được gửi!');
            setComment('');
            setRating(5);
            onReviewSubmitted(); // Gọi callback để làm mới danh sách
        } catch (error) {
            console.error('Failed to submit review', error);
            alert('Đã có lỗi xảy ra khi gửi đánh giá.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 border rounded-md bg-white">
            <h3 className="text-xl font-bold mb-4">Viết đánh giá của bạn</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Đánh giá
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} sao
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bình luận
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <Button onClick={() => {}} disabled={loading}>
                    {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Button>
            </form>
        </div>
    );
};

export default ReviewForm;
