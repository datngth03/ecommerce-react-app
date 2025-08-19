// File: src/domains/user/components/ProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/userSlice';
import type { AppDispatch, RootState } from '../../../core/store';
import type { User } from '../types';

const ProfileForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector(
        (state: RootState) => state.user
    );

    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        email: '',
    });
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && formData.name && formData.email) {
            dispatch(
                updateUserProfile({
                    ...user,
                    name: formData.name,
                    email: formData.email,
                })
            );
        }
    };

    useEffect(() => {
        if (!loading && !error) {
            setSuccessMessage('Cập nhật hồ sơ thành công!');
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [loading, error]);

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
            {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Họ và tên
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                disabled={loading}
            >
                {loading ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
            </button>
        </form>
    );
};

export default ProfileForm;

// ---
