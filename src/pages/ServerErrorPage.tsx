import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

const ServerErrorPage: React.FC = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className="text-6xl font-bold text-red-600 mb-4">
                        500
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Lỗi máy chủ nội bộ
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Đã xảy ra lỗi không mong muốn. Chúng tôi đang khắc phục
                        vấn đề này. Vui lòng thử lại sau ít phút.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Thử lại
                    </button>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Về trang chủ
                    </Link>
                </div>

                <div className="mt-12 bg-white rounded-lg p-6 border border-red-200">
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Thông tin kỹ thuật
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Nếu vấn đề tiếp tục xảy ra, vui lòng liên hệ với bộ phận
                        hỗ trợ kỹ thuật.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm">
                        <Link
                            to="/support"
                            className="text-red-600 hover:underline font-medium"
                        >
                            Liên hệ hỗ trợ
                        </Link>
                        <span className="hidden sm:inline text-gray-400">
                            •
                        </span>
                        <span className="text-gray-500">
                            Mã lỗi: {Date.now().toString(36).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerErrorPage;
