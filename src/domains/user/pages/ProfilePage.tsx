// File: src/domains/user/pages/UserProfilePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userSlice';
import type { AppDispatch, RootState } from '../../../core/store';
import Header from '../../../core/components/common/Header';
import Footer from '../../../core/components/common/Footer';
import ProfileForm from '../components/ProfileForm';

const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="text-center mt-10">
                Đang tải hồ sơ người dùng...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-10 text-gray-500">
                Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 my-12">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Hồ sơ của bạn
                </h1>
                <div className="max-w-2xl mx-auto">
                    <ProfileForm />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserProfilePage;
