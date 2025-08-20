import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../core/store';
import React, { Suspense, type JSX } from 'react';

// === CORE PAGES ===
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';
import MaintenancePage from '../pages/MaintenancePage';

// === AUTHENTICATION ===
import LoginPage from '../domains/auth/pages/LoginPage';
import RegisterPage from '../domains/auth/pages/RegisterPage';
import ForgotPasswordPage from '../domains/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../domains/auth/pages/ResetPasswordPage';
import EmailVerificationPage from '../domains/auth/pages/EmailVerificationPage';

// === PRODUCTS & CATALOG ===
import ProductListingPage from '../domains/products/pages/ProductsPage';
// import SearchResultsPage from '../domains/products/pages/SearchResultsPage';
// import BrandPage from '../domains/products/pages/BrandPage';
// import ProductComparePage from '../domains/products/pages/ProductComparePage';
import CategoryPage from '../domains/products/pages/CategoryPage';

// === SHOPPING FLOW ===
import CartPage from '../domains/cart/pages/CartPage';
import CheckoutPage from '../features/checkout/pages/CheckoutPage';
// import OrderSuccessPage from '../features/checkout/pages/OrderSuccessPage';
// import PaymentPage from '../features/payment/pages/PaymentPage';
// import PaymentSuccessPage from '../features/payment/pages/PaymentSuccessPage';
// import PaymentFailedPage from '../features/payment/pages/PaymentFailedPage';

// === PROMOTIONS & DEALS ===
// import DealsPage from '../domains/promotions/pages/DealsPage';
// import FlashSalePage from '../domains/promotions/pages/FlashSalePage';
// import NewArrivalsPage from '../domains/promotions/pages/NewArrivalsPage';
// import CouponsPage from '../domains/promotions/pages/CouponsPage';
// import SeasonsalSalePage from '../domains/promotions/pages/SeasonalSalePage';

// === USER ACCOUNT (Lazy loaded for better performance) ===
const ProfilePage = React.lazy(
    () => import('../domains/user/pages/ProfilePage')
);
const OrderHistoryPage = React.lazy(
    () => import('../domains/orders/pages/OrderHistoryPage')
);
// const OrderDetailPage = React.lazy(
//     () => import('../domains/orders/pages/OrderDetailPage')
// );
// const WishlistPage = React.lazy(
//     () => import('../domains/wishlist/pages/WishlistPage')
// );
// const AddressBookPage = React.lazy(
//     () => import('../domains/user/pages/AddressBookPage')
// );
// const AccountSettingsPage = React.lazy(
//     () => import('../domains/user/pages/AccountSettingsPage')
// );
// const NotificationsPage = React.lazy(
//     () => import('../domains/user/pages/NotificationsPage')
// );
// const SecuritySettingsPage = React.lazy(
//     () => import('../domains/user/pages/SecuritySettingsPage')
// );

// // === LOYALTY & REWARDS ===
// const LoyaltyPage = React.lazy(
//     () => import('../domains/loyalty/pages/LoyaltyPage')
// );
// const ReferralPage = React.lazy(
//     () => import('../domains/loyalty/pages/ReferralPage')
// );
// const RewardsPage = React.lazy(
//     () => import('../domains/loyalty/pages/RewardsPage')
// );
// const PointsHistoryPage = React.lazy(
//     () => import('../domains/loyalty/pages/PointsHistoryPage')
// );

// // === CUSTOMER SERVICE ===
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import FAQPage from '../pages/FAQPage';
import HelpCenterPage from '../pages/HelpCenterPage';
import SupportPage from '../pages/SupportPage';
import LiveChatPage from '../pages/LiveChatPage';
import ShippingInfoPage from '../pages/ShippingInfoPage';
import ReturnPolicyPage from '../pages/ReturnPolicyPage';

// // === LEGAL & POLICIES ===
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import RefundPolicyPage from '../pages/RefundPolicyPage';

// // === VENDOR/SELLER (if marketplace) ===
// const SellerDashboardPage = React.lazy(
//     () => import('../domains/seller/pages/SellerDashboardPage')
// );
// const SellerProfilePage = React.lazy(
//     () => import('../domains/seller/pages/SellerProfilePage')
// );
// const SellerProductsPage = React.lazy(
//     () => import('../domains/seller/pages/SellerProductsPage')
// );
// const SellerOrdersPage = React.lazy(
//     () => import('../domains/seller/pages/SellerOrdersPage')
// );
// const SellerAnalyticsPage = React.lazy(
//     () => import('../domains/seller/pages/SellerAnalyticsPage')
// );

// // === ADMIN (if needed) ===
// const AdminDashboardPage = React.lazy(
//     () => import('../domains/admin/pages/AdminDashboardPage')
// );
// const AdminUsersPage = React.lazy(
//     () => import('../domains/admin/pages/AdminUsersPage')
// );
// const AdminProductsPage = React.lazy(
//     () => import('../domains/admin/pages/AdminProductsPage')
// );
// const AdminOrdersPage = React.lazy(
//     () => import('../domains/admin/pages/AdminOrdersPage')
// );

// === PRODUCT DETAILS (Lazy loaded) ===
const ProductDetailPage = React.lazy(
    () => import('../domains/products/pages/ProductDetailPage')
);

// === ROUTE GUARDS ===
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// const AdminRoute = ({ children }: { children: JSX.Element }) => {
//     const { isAuthenticated, user } = useSelector(
//         (state: RootState) => state.auth
//     );
//     return isAuthenticated && user?.role === 'admin' ? (
//         children
//     ) : (
//         <Navigate to="/login" />
//     );
// };

// const SellerRoute = ({ children }: { children: JSX.Element }) => {
//     const { isAuthenticated, user } = useSelector(
//         (state: RootState) => state.auth
//     );
//     return isAuthenticated &&
//         (user?.role === 'seller' || user?.role === 'admin') ? (
//         children
//     ) : (
//         <Navigate to="/login" />
//     );
// };

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                }
            >
                <Routes>
                    {/* === CORE ROUTES === */}
                    <Route path="/" element={<HomePage />} />

                    {/* === AUTHENTICATION === */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPasswordPage />}
                    />
                    <Route
                        path="/verify-email/:token"
                        element={<EmailVerificationPage />}
                    />

                    {/* === PRODUCTS & CATALOG === */}
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route
                        path="/products/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route
                        path="/category/:categoryId"
                        element={<CategoryPage />}
                    />
                    {/* <Route path="/brands/:brandId" element={<BrandPage />} /> */}
                    {/* <Route path="/search" element={<SearchResultsPage />} /> */}
                    {/* <Route path="/compare" element={<ProductComparePage />} /> */}

                    {/* === SHOPPING FLOW === */}
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                        path="/checkout"
                        element={
                            // <PrivateRoute>
                            <CheckoutPage />
                            // </PrivateRoute>
                        }
                    />
                    {/* <Route
                        path="/payment"
                        element={
                            <PrivateRoute>
                                <PaymentPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/payment-success"
                        element={<PaymentSuccessPage />}
                    />
                    <Route
                        path="/payment-failed"
                        element={<PaymentFailedPage />}
                    />
                    <Route
                        path="/order-success"
                        element={<OrderSuccessPage />}
                    /> */}

                    {/* === PROMOTIONS & DEALS === */}
                    {/* <Route path="/deals" element={<DealsPage />} />
                    <Route path="/flash-sale" element={<FlashSalePage />} />
                    <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                    <Route path="/coupons" element={<CouponsPage />} />
                    <Route
                        path="/seasonal-sale"
                        element={<SeasonsalSalePage />}
                    /> */}

                    {/* === USER ACCOUNT === */}
                    <Route
                        path="/profile"
                        element={
                            // <PrivateRoute>
                            <ProfilePage />
                            // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <PrivateRoute>
                                <OrderHistoryPage />
                            </PrivateRoute>
                        }
                    />
                    {/* <Route
                        path="/orders/:orderId"
                        element={
                            <PrivateRoute>
                                <OrderDetailPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/wishlist"
                        element={
                            <PrivateRoute>
                                <WishlistPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/addresses"
                        element={
                            <PrivateRoute>
                                <AddressBookPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <AccountSettingsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings/security"
                        element={
                            <PrivateRoute>
                                <SecuritySettingsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <PrivateRoute>
                                <NotificationsPage />
                            </PrivateRoute>
                        }
                    /> */}

                    {/* === LOYALTY & REWARDS === */}
                    {/* <Route
                        path="/loyalty"
                        element={
                            <PrivateRoute>
                                <LoyaltyPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/rewards"
                        element={
                            <PrivateRoute>
                                <RewardsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/points-history"
                        element={
                            <PrivateRoute>
                                <PointsHistoryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/referrals"
                        element={
                            <PrivateRoute>
                                <ReferralPage />
                            </PrivateRoute>
                        }
                    /> */}

                    {/* === SELLER/VENDOR ROUTES === */}
                    {/* <Route
                        path="/seller"
                        element={
                            <SellerRoute>
                                <SellerDashboardPage />
                            </SellerRoute>
                        }
                    />
                    <Route
                        path="/seller/profile"
                        element={
                            <SellerRoute>
                                <SellerProfilePage />
                            </SellerRoute>
                        }
                    />
                    <Route
                        path="/seller/products"
                        element={
                            <SellerRoute>
                                <SellerProductsPage />
                            </SellerRoute>
                        }
                    />
                    <Route
                        path="/seller/orders"
                        element={
                            <SellerRoute>
                                <SellerOrdersPage />
                            </SellerRoute>
                        }
                    />
                    <Route
                        path="/seller/analytics"
                        element={
                            <SellerRoute>
                                <SellerAnalyticsPage />
                            </SellerRoute>
                        }
                    /> */}

                    {/* === ADMIN ROUTES === */}
                    {/* <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboardPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <AdminRoute>
                                <AdminUsersPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            <AdminRoute>
                                <AdminProductsPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <AdminRoute>
                                <AdminOrdersPage />
                            </AdminRoute>
                        }
                    /> */}

                    {/* === CUSTOMER SERVICE === */}
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/live-chat" element={<LiveChatPage />} />
                    <Route path="/shipping" element={<ShippingInfoPage />} />
                    <Route path="/returns" element={<ReturnPolicyPage />} />

                    {/* === LEGAL & POLICIES === */}
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route path="/cookies" element={<CookiePolicyPage />} />
                    <Route
                        path="/refund-policy"
                        element={<RefundPolicyPage />}
                    />

                    {/* === ERROR PAGES === */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="/500" element={<ServerErrorPage />} />
                    <Route path="/maintenance" element={<MaintenancePage />} />

                    {/* === CATCH ALL === */}
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
