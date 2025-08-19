// src/core/components/common/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ShopVN
                        </h5>
                        <p className="text-gray-400 mb-4">
                            Nền tảng mua sắm trực tuyến hàng đầu Việt Nam
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700">
                                f
                            </div>
                            <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center cursor-pointer hover:bg-pink-700">
                                ig
                            </div>
                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700">
                                yt
                            </div>
                        </div>
                    </div>

                    <div>
                        <h6 className="font-semibold mb-4">Về chúng tôi</h6>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Giới thiệu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Tin tức
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-semibold mb-4">Hỗ trợ</h6>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Hướng dẫn mua hàng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Bảo mật
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-semibold mb-4">Liên hệ</h6>
                        <div className="space-y-2 text-gray-400">
                            <p>📞 1900-123-456</p>
                            <p>📧 support@shopvn.com</p>
                            <p>📍 123 Nguyễn Văn A, Q.1, TP.HCM</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 ShopVN. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
