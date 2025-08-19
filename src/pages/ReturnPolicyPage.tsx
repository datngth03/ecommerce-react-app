import React from 'react';
import { RotateCcw } from 'lucide-react';

const ReturnPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                        <RotateCcw className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Chính sách đổi trả
                    </h1>
                    <p className="text-gray-600">
                        Thông tin về hoàn trả và đổi sản phẩm
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng</li>
                        <li>
                            Sản phẩm phải còn nguyên tem, nhãn, chưa qua sử dụng
                        </li>
                        <li>Hoàn tiền qua phương thức thanh toán ban đầu</li>
                        <li>Liên hệ CSKH để được hướng dẫn chi tiết</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicyPage;
