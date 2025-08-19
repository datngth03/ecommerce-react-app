import httpClient from '../../../core/api/http-client';

export const reviewService = {
    getReviewsByProductId: async (productId: string) => {
        const response = await httpClient.get(`/reviews?productId=${productId}`);
        return response.data;
    },
    submitReview: async (reviewData: unknown) => {
        const response = await httpClient.post('/reviews', reviewData);
        return response.data;
    },
};