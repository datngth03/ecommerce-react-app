import React from 'react';
import { Truck } from 'lucide-react';

const ShippingInfoPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                        <Truck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Thông tin vận chuyển
                    </h1>
                    <p className="text-gray-600">
                        Chi tiết về giao hàng và vận chuyển
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Thời gian giao hàng: 2-5 ngày làm việc</li>
                        <li>Miễn phí giao hàng cho đơn hàng từ 500.000đ</li>
                        <li>Hỗ trợ giao hàng toàn quốc</li>
                        <li>Kiểm tra hàng trước khi thanh toán (COD)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfoPage;
