import React from 'react';

const RefundPolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="max-w-3xl w-full bg-white shadow rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-4">
                    Chính sách hoàn tiền
                </h1>
                <p className="text-gray-600 mb-4">
                    Chúng tôi mong bạn hài lòng với đơn hàng, nhưng nếu không,
                    bạn có thể yêu cầu hoàn tiền.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    1. Điều kiện hoàn tiền
                </h2>
                <p className="text-gray-600 mb-4">
                    Sản phẩm phải còn nguyên trạng, trong vòng 7 ngày kể từ khi
                    nhận.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    2. Quy trình hoàn tiền
                </h2>
                <p className="text-gray-600 mb-4">
                    Liên hệ bộ phận hỗ trợ, gửi sản phẩm và chờ xác nhận.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    3. Thời gian xử lý
                </h2>
                <p className="text-gray-600 mb-4">
                    Hoàn tiền sẽ được xử lý trong 5–7 ngày làm việc.
                </p>
            </div>
        </div>
    );
};

export default RefundPolicyPage;
