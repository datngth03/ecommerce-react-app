import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../domains/auth/store/authSlice';
import productReducer from '../../domains/products/store/productSlice';
import cartReducer from '../../domains/cart/store/cartSlice';
import userReducer from '../../domains/user/store/userSlice';
import orderReducer from '../../domains/orders/store/orderSlice';


// Chúng ta sẽ thêm các reducer từ các domain khác vào đây sau
const rootReducer = {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,

};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;