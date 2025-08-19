import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Clock, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const MaintenancePage: React.FC = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        hours: 2,
        minutes: 30,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Logo/Brand */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        YourStore
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="mb-12">
                    <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
                        <Clock className="w-16 h-16 text-blue-600" />
                    </div>

                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Đang bảo trì hệ thống
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                        Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm
                        mua sắm tốt hơn cho bạn.
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Thời gian hoàn thành dự kiến
                    </h3>
                    <div className="flex justify-center space-x-4">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold rounded-lg p-4 mb-2 min-w-[80px]">
                                {timeRemaining.hours
                                    .toString()
                                    .padStart(2, '0')}
                            </div>
                            <span className="text-gray-600 text-sm font-medium">
                                Giờ
                            </span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold rounded-lg p-4 mb-2 min-w-[80px]">
                                {timeRemaining.minutes
                                    .toString()
                                    .padStart(2, '0')}
                            </div>
                            <span className="text-gray-600 text-sm font-medium">
                                Phút
                            </span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold rounded-lg p-4 mb-2 min-w-[80px]">
                                {timeRemaining.seconds
                                    .toString()
                                    .padStart(2, '0')}
                            </div>
                            <span className="text-gray-600 text-sm font-medium">
                                Giây
                            </span>
                        </div>
                    </div>
                </div>

                {/* Features Preview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Những tính năng mới sắp ra mắt
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-green-600 font-bold">
                                    ✓
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">
                                Thanh toán nhanh hơn
                            </h4>
                            <p className="text-sm text-gray-600">
                                Tích hợp nhiều phương thức thanh toán mới
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-600 font-bold">
                                    ⚡
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">
                                Tốc độ tải trang
                            </h4>
                            <p className="text-sm text-gray-600">
                                Cải thiện hiệu suất lên đến 50%
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-purple-600 font-bold">
                                    ★
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">
                                Giao diện mới
                            </h4>
                            <p className="text-sm text-gray-600">
                                Thiết kế hiện đại và thân thiện hơn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                        Nhận thông báo khi website hoạt động trở lại
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Đăng ký
                        </button>
                    </div>
                </div>

                {/* Social Links & Contact */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Facebook className="w-5 h-5 text-blue-600" />
                        </a>
                        <a
                            href="#"
                            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Twitter className="w-5 h-5 text-blue-400" />
                        </a>
                        <a
                            href="#"
                            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Instagram className="w-5 h-5 text-pink-600" />
                        </a>
                    </div>
                    <div className="text-gray-600">
                        <p className="mb-2">Cần hỗ trợ khẩn cấp?</p>
                        <div className="flex flex-col sm:flex-row gap-4 text-sm">
                            <a
                                href="mailto:support@yourstore.com"
                                className="text-blue-600 hover:underline"
                            >
                                support@yourstore.com
                            </a>
                            <span className="hidden sm:inline text-gray-400">
                                •
                            </span>
                            <a
                                href="tel:+84123456789"
                                className="text-blue-600 hover:underline"
                            >
                                +84 123 456 789
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
