import React from 'react';

const HelpCenterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Trung tâm trợ giúp
            </h1>
            <p className="text-gray-600 max-w-2xl text-center mb-6">
                Tìm câu trả lời cho các câu hỏi thường gặp hoặc duyệt theo danh
                mục để được hỗ trợ nhanh chóng.
            </p>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="font-semibold text-lg mb-2">
                        Tài khoản & Đăng nhập
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Hướng dẫn về đăng nhập, đổi mật khẩu và quản lý tài
                        khoản.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="font-semibold text-lg mb-2">
                        Đơn hàng & Thanh toán
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Theo dõi đơn hàng, phương thức thanh toán và vấn đề liên
                        quan.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="font-semibold text-lg mb-2">
                        Vận chuyển & Giao hàng
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Thông tin về thời gian giao hàng, phí ship và phương
                        thức giao.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="font-semibold text-lg mb-2">
                        Hoàn trả & Hoàn tiền
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Chính sách đổi trả và quy trình yêu cầu hoàn tiền.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;
