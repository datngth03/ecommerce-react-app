import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="max-w-3xl w-full bg-white shadow rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-4">Chính sách bảo mật</h1>
                <p className="text-gray-600 mb-4">
                    Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính
                    sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ
                    liệu.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    1. Thông tin chúng tôi thu thập
                </h2>
                <p className="text-gray-600 mb-4">
                    Email, số điện thoại, thông tin giao dịch...
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    2. Cách chúng tôi sử dụng
                </h2>
                <p className="text-gray-600 mb-4">
                    Để xử lý đơn hàng, cung cấp dịch vụ và cải thiện trải nghiệm
                    người dùng.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    3. Bảo mật thông tin
                </h2>
                <p className="text-gray-600 mb-4">
                    Thông tin của bạn được mã hóa và chỉ dùng cho mục đích dịch
                    vụ.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
