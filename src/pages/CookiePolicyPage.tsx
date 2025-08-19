import React from 'react';

const CookiePolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="max-w-3xl w-full bg-white shadow rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-4">Chính sách Cookie</h1>
                <p className="text-gray-600 mb-4">
                    Trang web của chúng tôi sử dụng cookie để cải thiện trải
                    nghiệm người dùng.
                </p>

                <h2 className="text-xl font-semibold mb-2">1. Cookie là gì?</h2>
                <p className="text-gray-600 mb-4">
                    Cookie là tệp nhỏ lưu trữ trên trình duyệt của bạn để nhận
                    diện và lưu tuỳ chọn.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    2. Chúng tôi dùng cookie để làm gì?
                </h2>
                <p className="text-gray-600 mb-4">
                    Lưu đăng nhập, phân tích hành vi, cá nhân hóa trải nghiệm.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    3. Quản lý cookie
                </h2>
                <p className="text-gray-600 mb-4">
                    Bạn có thể tắt cookie trong cài đặt trình duyệt.
                </p>
            </div>
        </div>
    );
};

export default CookiePolicyPage;
