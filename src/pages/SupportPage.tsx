import React from 'react';

const SupportPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Hỗ trợ khách hàng
            </h1>
            <p className="text-gray-600 max-w-xl text-center mb-6">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy chọn một kênh liên hệ
                bên dưới.
            </p>

            <div className="space-y-4 w-full max-w-md">
                <a
                    href="mailto:support@example.com"
                    className="block w-full p-4 bg-white shadow rounded-xl border hover:shadow-lg transition"
                >
                    📧 Email: support@example.com
                </a>
                <a
                    href="tel:+84123456789"
                    className="block w-full p-4 bg-white shadow rounded-xl border hover:shadow-lg transition"
                >
                    ☎️ Hotline: +84 123 456 789
                </a>
                <a
                    href="/livechat"
                    className="block w-full p-4 bg-blue-600 text-white shadow rounded-xl hover:bg-blue-700 transition text-center"
                >
                    💬 Trò chuyện trực tuyến
                </a>
            </div>
        </div>
    );
};

export default SupportPage;
