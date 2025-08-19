import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="max-w-3xl w-full bg-white shadow rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-4">Điều khoản dịch vụ</h1>
                <p className="text-gray-600 mb-4">
                    Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các
                    điều khoản sau.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    1. Sử dụng dịch vụ
                </h2>
                <p className="text-gray-600 mb-4">
                    Bạn chỉ được sử dụng dịch vụ cho mục đích hợp pháp.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    2. Tài khoản người dùng
                </h2>
                <p className="text-gray-600 mb-4">
                    Bạn chịu trách nhiệm bảo mật tài khoản và mật khẩu.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    3. Giới hạn trách nhiệm
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi không chịu trách nhiệm đối với thiệt hại gián tiếp
                    hoặc ngẫu nhiên.
                </p>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
