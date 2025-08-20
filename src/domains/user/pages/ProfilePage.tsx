import React, { useState, useEffect } from 'react';

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | '';
    joinDate: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
}

interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

interface Preferences {
    newsletter: boolean;
    promotions: boolean;
    orderUpdates: boolean;
    language: 'vi' | 'en';
    currency: 'USD' | 'VND';
}

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState<
        'profile' | 'addresses' | 'preferences' | 'security'
    >('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingAddress, setEditingAddress] = useState<string | null>(null);

    const [profile, setProfile] = useState<UserProfile>({
        id: '1',
        firstName: 'Nguyễn',
        lastName: 'Văn A',
        email: 'user@example.com',
        phone: '0123456789',
        avatar: 'https://via.placeholder.com/120/120/0066CC/FFFFFF?text=NA',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        joinDate: '2023-01-15',
        isEmailVerified: true,
        isPhoneVerified: false,
    });

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            type: 'home',
            name: 'Nhà riêng',
            address: '123 Đường ABC, Phường XYZ',
            city: 'TP. Hồ Chí Minh',
            state: 'HCM',
            zipCode: '70000',
            country: 'Việt Nam',
            isDefault: true,
        },
        {
            id: '2',
            type: 'work',
            name: 'Văn phòng',
            address: '456 Đường DEF, Phường UVW',
            city: 'TP. Hồ Chí Minh',
            state: 'HCM',
            zipCode: '70000',
            country: 'Việt Nam',
            isDefault: false,
        },
    ]);

    const [preferences, setPreferences] = useState<Preferences>({
        newsletter: true,
        promotions: false,
        orderUpdates: true,
        language: 'vi',
        currency: 'USD',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        // Simulate API call to fetch user data
        const fetchUserData = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const validateProfile = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!profile.firstName.trim()) newErrors.firstName = 'Vui lòng nhập họ';
        if (!profile.lastName.trim()) newErrors.lastName = 'Vui lòng nhập tên';
        if (!profile.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(profile.email))
            newErrors.email = 'Email không hợp lệ';
        if (!profile.phone.trim())
            newErrors.phone = 'Vui lòng nhập số điện thoại';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveProfile = async () => {
        if (!validateProfile()) return;

        setSaving(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsEditing(false);
        setSaving(false);
        setSuccessMessage('Thông tin đã được cập nhật thành công!');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfile({ ...profile, avatar: e.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const addAddress = () => {
        const newAddress: Address = {
            id: Date.now().toString(),
            type: 'home',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Việt Nam',
            isDefault: false,
        };
        setAddresses([...addresses, newAddress]);
        setEditingAddress(newAddress.id);
    };

    const deleteAddress = (id: string) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const setDefaultAddress = (id: string) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
    };

    const updateAddress = (id: string, updatedAddress: Partial<Address>) => {
        setAddresses(
            addresses.map((addr) =>
                addr.id === id ? { ...addr, ...updatedAddress } : addr
            )
        );
    };

    const saveAddress = (id: string) => {
        console.log('Saving address:', id);
        setEditingAddress(null);
        setSuccessMessage('Địa chỉ đã được cập nhật!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handlePasswordChange = async () => {
        const newErrors: Record<string, string> = {};

        if (!passwordForm.currentPassword)
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        if (!passwordForm.newPassword)
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        else if (passwordForm.newPassword.length < 8)
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
        if (passwordForm.newPassword !== passwordForm.confirmPassword)
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSaving(false);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setSuccessMessage('Mật khẩu đã được thay đổi thành công!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">
                        Đang tải thông tin tài khoản...
                    </p>
                </div>
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function setTwoFactorEnabled(_arg0: boolean): boolean {
        return true;
        throw new Error('Function not implemented.');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Tài khoản của tôi
                    </h1>
                    <p className="text-gray-600">
                        Quản lý thông tin cá nhân và tùy chọn tài khoản
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <svg
                            className="w-5 h-5 text-green-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-green-700">{successMessage}</span>
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* User Info Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white text-center">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={profile.avatar}
                                        alt="Avatar"
                                        className="w-20 h-20 rounded-full border-4 border-white object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <h3 className="text-xl font-semibold">
                                    {profile.firstName} {profile.lastName}
                                </h3>
                                <p className="text-blue-100 text-sm">
                                    Thành viên từ{' '}
                                    {formatJoinDate(profile.joinDate)}
                                </p>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="p-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                        activeTab === 'profile'
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>Thông tin cá nhân</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                        activeTab === 'addresses'
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Địa chỉ</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                        activeTab === 'preferences'
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Tùy chọn</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                        activeTab === 'security'
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <span>Bảo mật</span>
                                </button>

                                {/* Quick Links */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                        <span>Đơn hàng của tôi</span>
                                    </button>

                                    <button className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-red-700 hover:bg-red-50 transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Thông tin cá nhân
                                        </h2>
                                        {!isEditing ? (
                                            <button
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Chỉnh sửa
                                            </button>
                                        ) : (
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() =>
                                                        setIsEditing(false)
                                                    }
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    onClick={handleSaveProfile}
                                                    disabled={saving}
                                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                            Đang lưu...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            Lưu thay đổi
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-8">
                                        {/* Avatar Section */}
                                        <div className="flex items-center space-x-6">
                                            <div className="relative">
                                                <img
                                                    src={profile.avatar}
                                                    alt="Avatar"
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                                />
                                                {isEditing && (
                                                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                                                        <svg
                                                            className="w-6 h-6 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                handleAvatarChange
                                                            }
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {profile.firstName}{' '}
                                                    {profile.lastName}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {profile.email}
                                                </p>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            profile.isEmailVerified
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {profile.isEmailVerified
                                                            ? '✓ Email đã xác thực'
                                                            : '✗ Email chưa xác thực'}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            profile.isPhoneVerified
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {profile.isPhoneVerified
                                                            ? '✓ SĐT đã xác thực'
                                                            : '✗ SĐT chưa xác thực'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Two-Factor Authentication */}
                                            <div className="border border-gray-200 rounded-lg p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Xác thực hai yếu tố
                                                            (2FA)
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Tăng cường bảo mật
                                                            cho tài khoản của
                                                            bạn
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            defaultChecked={
                                                                false
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <p>
                                                        Khi bật tính năng này,
                                                        bạn sẽ cần nhập mã xác
                                                        thực từ ứng dụng
                                                        authenticator mỗi khi
                                                        đăng nhập.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Login Sessions */}
                                            <div className="border border-gray-200 rounded-lg p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                    Phiên đăng nhập
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    Chrome trên
                                                                    Windows
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Phiên hiện
                                                                    tại - TP. Hồ
                                                                    Chí Minh
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-green-600 font-medium">
                                                            Đang hoạt động
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    Safari trên
                                                                    iPhone
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    2 giờ trước
                                                                    - TP. Hồ Chí
                                                                    Minh
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button className="text-sm text-red-600 hover:text-red-800">
                                                            Đăng xuất
                                                        </button>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                                            Đăng xuất tất cả
                                                            phiên khác
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Account Deletion */}
                                            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                                                <h3 className="text-lg font-semibold text-red-900 mb-2">
                                                    Xóa tài khoản
                                                </h3>
                                                <p className="text-sm text-red-700 mb-4">
                                                    Hành động này không thể hoàn
                                                    tác. Tất cả dữ liệu của bạn
                                                    sẽ bị xóa vĩnh viễn.
                                                </p>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                                    Yêu cầu xóa tài khoản
                                                </button>
                                            </div>
                                        </div>
                                        {/* Personal Information Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Họ *
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={
                                                            profile.firstName
                                                        }
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                firstName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                            errors.firstName
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                    />
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                                        {profile.firstName}
                                                    </p>
                                                )}
                                                {errors.firstName && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.firstName}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tên *
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={profile.lastName}
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                lastName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                            errors.lastName
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                    />
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                                        {profile.lastName}
                                                    </p>
                                                )}
                                                {errors.lastName && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.lastName}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email *
                                                </label>
                                                {isEditing ? (
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            value={
                                                                profile.email
                                                            }
                                                            onChange={(e) =>
                                                                setProfile({
                                                                    ...profile,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                                                                errors.email
                                                                    ? 'border-red-500'
                                                                    : 'border-gray-300'
                                                            }`}
                                                        />
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                            {profile.isEmailVerified ? (
                                                                <svg
                                                                    className="w-5 h-5 text-green-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="w-5 h-5 text-red-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex-1">
                                                            {profile.email}
                                                        </p>
                                                        {!profile.isEmailVerified && (
                                                            <button className="px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                                                Xác thực
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Số điện thoại *
                                                </label>
                                                {isEditing ? (
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            value={
                                                                profile.phone
                                                            }
                                                            onChange={(e) =>
                                                                setProfile({
                                                                    ...profile,
                                                                    phone: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                                                                errors.phone
                                                                    ? 'border-red-500'
                                                                    : 'border-gray-300'
                                                            }`}
                                                        />
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                            {profile.isPhoneVerified ? (
                                                                <svg
                                                                    className="w-5 h-5 text-green-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="w-5 h-5 text-red-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex-1">
                                                            {profile.phone}
                                                        </p>
                                                        {!profile.isPhoneVerified && (
                                                            <button className="px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                                                Xác thực
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ngày sinh
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="date"
                                                        value={
                                                            profile.dateOfBirth
                                                        }
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                dateOfBirth:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                                        {new Date(
                                                            profile.dateOfBirth
                                                        ).toLocaleDateString(
                                                            'vi-VN'
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Giới tính
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={profile.gender}
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                gender: e.target
                                                                    .value as
                                                                    | 'male'
                                                                    | 'female'
                                                                    | 'other'
                                                                    | '',
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">
                                                            Chọn giới tính
                                                        </option>
                                                        <option value="male">
                                                            Nam
                                                        </option>
                                                        <option value="female">
                                                            Nữ
                                                        </option>
                                                        <option value="other">
                                                            Khác
                                                        </option>
                                                    </select>
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                                        {profile.gender ===
                                                        'male'
                                                            ? 'Nam'
                                                            : profile.gender ===
                                                                'female'
                                                              ? 'Nữ'
                                                              : profile.gender ===
                                                                  'other'
                                                                ? 'Khác'
                                                                : 'Chưa xác định'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === 'addresses' && (
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Địa chỉ giao hàng
                                        </h2>
                                        <button
                                            onClick={addAddress}
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                            Thêm địa chỉ mới
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className="border border-gray-200 rounded-lg p-6 relative"
                                            >
                                                {address.isDefault && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                            Mặc định
                                                        </span>
                                                    </div>
                                                )}

                                                {editingAddress ===
                                                address.id ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Tên địa chỉ
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        address.name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateAddress(
                                                                            address.id,
                                                                            {
                                                                                name: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    placeholder="Ví dụ: Nhà riêng, Văn phòng"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Loại địa chỉ
                                                                </label>
                                                                <select
                                                                    value={
                                                                        address.type
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateAddress(
                                                                            address.id,
                                                                            {
                                                                                type: e
                                                                                    .target
                                                                                    .value as
                                                                                    | 'home'
                                                                                    | 'work'
                                                                                    | 'other',
                                                                            }
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                >
                                                                    <option value="home">
                                                                        Nhà
                                                                        riêng
                                                                    </option>
                                                                    <option value="work">
                                                                        Văn
                                                                        phòng
                                                                    </option>
                                                                    <option value="other">
                                                                        Khác
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Địa chỉ chi tiết
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    address.address
                                                                }
                                                                onChange={(e) =>
                                                                    updateAddress(
                                                                        address.id,
                                                                        {
                                                                            address:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                placeholder="Số nhà, tên đường, phường/xã"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Thành phố
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        address.city
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateAddress(
                                                                            address.id,
                                                                            {
                                                                                city: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Tỉnh/Thành
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        address.state
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateAddress(
                                                                            address.id,
                                                                            {
                                                                                state: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Mã bưu điện
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        address.zipCode
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateAddress(
                                                                            address.id,
                                                                            {
                                                                                zipCode:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end space-x-3 pt-4">
                                                            <button
                                                                onClick={() =>
                                                                    setEditingAddress(
                                                                        null
                                                                    )
                                                                }
                                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                                            >
                                                                Hủy
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    saveAddress(
                                                                        address.id
                                                                    )
                                                                }
                                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                            >
                                                                Lưu địa chỉ
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900 text-lg">
                                                                    {
                                                                        address.name
                                                                    }
                                                                </h3>
                                                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mt-1">
                                                                    {address.type ===
                                                                    'home'
                                                                        ? 'Nhà riêng'
                                                                        : address.type ===
                                                                            'work'
                                                                          ? 'Văn phòng'
                                                                          : 'Khác'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                {!address.isDefault && (
                                                                    <button
                                                                        onClick={() =>
                                                                            setDefaultAddress(
                                                                                address.id
                                                                            )
                                                                        }
                                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                                    >
                                                                        Đặt mặc
                                                                        định
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() =>
                                                                        setEditingAddress(
                                                                            address.id
                                                                        )
                                                                    }
                                                                    className="text-gray-600 hover:text-gray-800"
                                                                >
                                                                    <svg
                                                                        className="w-4 h-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                {!address.isDefault && (
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteAddress(
                                                                                address.id
                                                                            )
                                                                        }
                                                                        className="text-red-600 hover:text-red-800"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 mb-2">
                                                            {address.address}
                                                        </p>
                                                        <p className="text-gray-600 text-sm">
                                                            {address.city},{' '}
                                                            {address.state}{' '}
                                                            {address.zipCode}
                                                        </p>
                                                        <p className="text-gray-600 text-sm">
                                                            {address.country}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === 'preferences' && (
                                <div className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            Tùy chọn cá nhân
                                        </h2>
                                        <p className="text-gray-600">
                                            Quản lý thông báo và ngôn ngữ hiển
                                            thị
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Email Notifications */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Thông báo email
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            Newsletter
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            Nhận thông tin về
                                                            sản phẩm mới và ưu
                                                            đãi
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={
                                                                preferences.newsletter
                                                            }
                                                            onChange={(e) =>
                                                                setPreferences({
                                                                    ...preferences,
                                                                    newsletter:
                                                                        e.target
                                                                            .checked,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            Khuyến mãi
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            Nhận thông báo về
                                                            các chương trình
                                                            khuyến mãi đặc biệt
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={
                                                                preferences.promotions
                                                            }
                                                            onChange={(e) =>
                                                                setPreferences({
                                                                    ...preferences,
                                                                    promotions:
                                                                        e.target
                                                                            .checked,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            Cập nhật đơn hàng
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            Nhận thông báo về
                                                            trạng thái đơn hàng
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={
                                                                preferences.orderUpdates
                                                            }
                                                            onChange={(e) =>
                                                                setPreferences({
                                                                    ...preferences,
                                                                    orderUpdates:
                                                                        e.target
                                                                            .checked,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Language & Currency */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Ngôn ngữ và tiền tệ
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Ngôn ngữ hiển thị
                                                    </label>
                                                    <select
                                                        value={
                                                            preferences.language
                                                        }
                                                        onChange={(e) =>
                                                            setPreferences({
                                                                ...preferences,
                                                                language: e
                                                                    .target
                                                                    .value as
                                                                    | 'vi'
                                                                    | 'en',
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="vi">
                                                            Tiếng Việt
                                                        </option>
                                                        <option value="en">
                                                            English
                                                        </option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tiền tệ
                                                    </label>
                                                    <select
                                                        value={
                                                            preferences.currency
                                                        }
                                                        onChange={(e) =>
                                                            setPreferences({
                                                                ...preferences,
                                                                currency: e
                                                                    .target
                                                                    .value as
                                                                    | 'USD'
                                                                    | 'VND',
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="VND">
                                                            VNĐ (Việt Nam Đồng)
                                                        </option>
                                                        <option value="USD">
                                                            USD (US Dollar)
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-end pt-6 border-t border-gray-200">
                                            <button
                                                onClick={async () => {
                                                    setSaving(true);
                                                    await new Promise(
                                                        (resolve) =>
                                                            setTimeout(
                                                                resolve,
                                                                1000
                                                            )
                                                    );
                                                    setSaving(false);
                                                    setSuccessMessage(
                                                        'Tùy chọn đã được lưu!'
                                                    );
                                                    setTimeout(
                                                        () =>
                                                            setSuccessMessage(
                                                                ''
                                                            ),
                                                        3000
                                                    );
                                                }}
                                                disabled={saving}
                                                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {saving ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Đang lưu...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        Lưu thay đổi
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            Bảo mật tài khoản
                                        </h2>
                                        <p className="text-gray-600">
                                            Quản lý mật khẩu và cài đặt bảo mật
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Change Password */}
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Thay đổi mật khẩu
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Mật khẩu hiện tại *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={
                                                            passwordForm.currentPassword
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordForm({
                                                                ...passwordForm,
                                                                currentPassword:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                            errors.currentPassword
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                        placeholder="Nhập mật khẩu hiện tại"
                                                    />
                                                    {errors.currentPassword && (
                                                        <p className="mt-1 text-sm text-red-500">
                                                            {
                                                                errors.currentPassword
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Mật khẩu mới *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={
                                                            passwordForm.newPassword
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordForm({
                                                                ...passwordForm,
                                                                newPassword:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                            errors.newPassword
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                        placeholder="Nhập mật khẩu mới"
                                                    />
                                                    {errors.newPassword && (
                                                        <p className="mt-1 text-sm text-red-500">
                                                            {errors.newPassword}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Mật khẩu phải có ít nhất
                                                        8 ký tự
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Xác nhận mật khẩu mới *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={
                                                            passwordForm.confirmPassword
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordForm({
                                                                ...passwordForm,
                                                                confirmPassword:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                            errors.confirmPassword
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                        placeholder="Nhập lại mật khẩu mới"
                                                    />
                                                    {errors.confirmPassword && (
                                                        <p className="mt-1 text-sm text-red-500">
                                                            {
                                                                errors.confirmPassword
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={
                                                            handlePasswordChange
                                                        }
                                                        disabled={saving}
                                                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        {saving ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                                Đang thay đổi...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg
                                                                    className="w-4 h-4 mr-2"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                                    />
                                                                </svg>
                                                                Thay đổi mật
                                                                khẩu
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Two-Factor Authentication */}
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Xác thực hai yếu tố
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                Bảo mật tài khoản của bạn bằng
                                                cách bật xác thực hai yếu tố.
                                                Bạn sẽ cần một ứng dụng xác thực
                                                như Google Authenticator hoặc
                                                Authy.
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setTwoFactorEnabled(
                                                        !setTwoFactorEnabled
                                                    )
                                                }
                                                className={`px-6 py-3 rounded-lg transition-colors ${
                                                    setTwoFactorEnabled(true)
                                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                            >
                                                {setTwoFactorEnabled(true)
                                                    ? 'Tắt xác thực hai yếu tố'
                                                    : 'Bật xác thực hai yếu tố'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
