import React, { useState } from 'react';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    UserPlus,
    ArrowRight,
    Chrome,
    Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        if (!acceptTerms) {
            setError('Vui lòng đồng ý với điều khoản dịch vụ');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Handle register logic here
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
        }, 2000);
    };

    const handleGoogleRegister = () => {
        // Handle Google register
        console.log('Google register clicked');
    };

    const handleLogin = () => {
        // Navigate to login
        navigate('/login');
        console.log('Navigate to login');
    };

    const isPasswordStrong =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tạo tài khoản
                    </h1>
                    <p className="text-gray-600">
                        Tham gia cùng chúng tôi ngay hôm nay
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="your@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`h-2 w-full rounded-full ${
                                                password.length < 4
                                                    ? 'bg-red-200'
                                                    : password.length < 8
                                                      ? 'bg-yellow-200'
                                                      : isPasswordStrong
                                                        ? 'bg-green-200'
                                                        : 'bg-orange-200'
                                            }`}
                                        >
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    password.length < 4
                                                        ? 'w-1/3 bg-red-500'
                                                        : password.length < 8
                                                          ? 'w-2/3 bg-yellow-500'
                                                          : isPasswordStrong
                                                            ? 'w-full bg-green-500'
                                                            : 'w-3/4 bg-orange-500'
                                                }`}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-xs space-y-1">
                                        <div
                                            className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}
                                        >
                                            <Check className="w-3 h-3" />
                                            Ít nhất 8 ký tự
                                        </div>
                                        <div
                                            className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}
                                        >
                                            <Check className="w-3 h-3" />
                                            Có chữ hoa
                                        </div>
                                        <div
                                            className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}
                                        >
                                            <Check className="w-3 h-3" />
                                            Có số
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {confirmPassword &&
                                password !== confirmPassword && (
                                    <p className="text-red-500 text-xs">
                                        Mật khẩu không khớp
                                    </p>
                                )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-3">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptTerms}
                                    onChange={(e) =>
                                        setAcceptTerms(e.target.checked)
                                    }
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="terms"
                                    className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                                        acceptTerms
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-300 hover:border-green-500'
                                    }`}
                                >
                                    {acceptTerms && (
                                        <Check className="w-3 h-3" />
                                    )}
                                </label>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Tôi đồng ý với{' '}
                                <a
                                    href="#"
                                    className="text-green-600 hover:underline font-medium"
                                >
                                    Điều khoản dịch vụ
                                </a>{' '}
                                và{' '}
                                <a
                                    href="#"
                                    className="text-green-600 hover:underline font-medium"
                                >
                                    Chính sách bảo mật
                                </a>
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-red-600 text-sm font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Register Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !acceptTerms}
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                                <>
                                    Tạo tài khoản
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center py-4">
                            <div className="border-t border-gray-200 w-full"></div>
                            <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                                hoặc
                            </span>
                            <div className="border-t border-gray-200 w-full"></div>
                        </div>

                        {/* Google Register */}
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                        >
                            <Chrome className="w-5 h-5 text-gray-600" />
                            Đăng ký với Google
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                Đã có tài khoản?{' '}
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                                >
                                    Đăng nhập ngay
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
