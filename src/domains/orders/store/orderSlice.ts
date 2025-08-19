
// File: src/domains/order/store/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../services/orderService';
import type { Order } from '../types';

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

// Async thunk để lấy lịch sử đơn hàng
export const fetchOrderHistory = createAsyncThunk(
    'order/fetchOrderHistory',
    async () => {
        const response = await orderService.fetchOrders();
        return response;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý fetchOrderHistory
            .addCase(fetchOrderHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Không thể lấy lịch sử đơn hàng';
            });
    },
});
export default orderSlice.reducer;