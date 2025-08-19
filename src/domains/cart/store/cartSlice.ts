// File: src/domains/cart/store/cartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../services/cartService';
import type { CartItem } from '../types';

interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await cartService.getCart();
    return response;
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (payload: { productId: string, quantity: number }) => {
    const response = await cartService.addToCart(payload.productId, payload.quantity);
    return response;
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async (payload: { productId: string, quantity: number }) => {
    const response = await cartService.updateQuantity(payload.productId, payload.quantity);
    return response;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (productId: string) => {
    const response = await cartService.removeFromCart(productId);
    return response;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý action fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            })
            // Xử lý action addItemToCart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add item to cart';
            })
            // Xử lý action updateQuantity
            .addCase(updateQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update item quantity';
            })
            // Xử lý action removeItemFromCart
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove item from cart';
            });
    },
});

export default cartSlice.reducer;
