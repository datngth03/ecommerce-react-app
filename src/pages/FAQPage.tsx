import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'Làm sao để đặt hàng?',
        a: 'Bạn có thể đặt hàng bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán.',
    },
    {
        q: 'Phương thức thanh toán?',
        a: 'Chúng tôi hỗ trợ thanh toán qua thẻ, ví điện tử và COD.',
    },
    {
        q: 'Thời gian giao hàng?',
        a: 'Thông thường từ 2-5 ngày làm việc tùy khu vực.',
    },
];

const FAQPage = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Câu hỏi thường gặp
                </h1>

                <div className="space-y-4">
                    {faqs.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
                        >
                            <button
                                onClick={() =>
                                    setOpen(open === idx ? null : idx)
                                }
                                className="w-full flex justify-between items-center font-medium text-gray-800"
                            >
                                {item.q}
                                <ChevronDown
                                    className={`w-5 h-5 transform transition ${open === idx ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {open === idx && (
                                <p className="mt-3 text-gray-600">{item.a}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
