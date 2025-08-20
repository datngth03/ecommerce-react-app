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

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const fakeCart: CartItem[] = [
        {
            product: {
                id: "1",
                name: "Áo thun nam",
                slug: "ao-thun-nam",
                description: "Áo thun cotton thoáng mát",
                price: 199000,
                originalPrice: 250000,
                discount: 20,
                rating: 4.5,
                reviewCount: 120,
                images: ["/img/shirt1.jpg"],
                brand: {
                    id: "b1",
                    name: "Local Brand",
                    slug: "local-brand",
                    logo: "/img/brand-logo.png",
                    description: "Thương hiệu thời trang local nổi tiếng",
                    categories: ["ao-thun", "quan-jeans"],
                },
                category: { id: "c1", name: "Áo thun", slug: "ao-thun" },
                inStock: true,
                stockCount: 50,
                tags: ["hot", "new"],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            quantity: 2,
        },
        {
            product: {
                id: "2",
                name: "Quần jeans nam",
                slug: "quan-jeans-nam",
                description: "Quần jeans form slim fit",
                price: 499000,
                rating: 4.7,
                reviewCount: 80,
                images: ["/img/jeans.jpg"],
                brand: {
                    id: "b2",
                    name: "Denim Pro",
                    slug: "Denim Pro",
                    logo: "/img/brand-logo.png",
                    description: "Thương hiệu thời trang local nổi tiếng",
                    categories: ["ao-thun", "quan-jeans"],
                },
                category: { id: "c2", name: "Quần jeans", slug: "quan-jeans" },
                inStock: true,
                stockCount: 30,
                tags: ["best-seller"],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            quantity: 1,
        },
    ];

    return fakeCart;
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
