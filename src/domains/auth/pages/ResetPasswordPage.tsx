import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Mật khẩu đã được đặt lại thành công!');
            navigate('/login');
        }, 2000);
    };

    const isStrong =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Đặt lại mật khẩu
                    </h1>
                    <p className="text-gray-600">
                        Nhập mật khẩu mới để tiếp tục
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                Mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {password && (
                                <div className="text-xs space-y-1">
                                    <div
                                        className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Check className="w-3 h-3" /> Ít nhất 8
                                        ký tự
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Check className="w-3 h-3" /> Có chữ hoa
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Check className="w-3 h-3" /> Có số
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirm ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isStrong}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                                <>
                                    Đặt lại mật khẩu
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
