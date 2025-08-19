import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-300 mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Trang không tìm thấy
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã
                        được di chuyển.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Về trang chủ
                    </Link>

                    <Link
                        to="/search"
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Tìm kiếm sản phẩm
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Quay lại trang trước
                    </button>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>
                        Cần hỗ trợ?{' '}
                        <Link
                            to="/contact"
                            className="text-blue-600 hover:underline"
                        >
                            Liên hệ với chúng tôi
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
