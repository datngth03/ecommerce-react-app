// import React from 'react';
import { Info } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                        <Info className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Về chúng tôi
                    </h1>
                    <p className="text-gray-600">
                        Tìm hiểu thêm về sứ mệnh và giá trị của chúng tôi
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                        Chúng tôi là một đội ngũ đam mê công nghệ và thương mại
                        điện tử, với mục tiêu mang đến trải nghiệm mua sắm trực
                        tuyến tiện lợi, an toàn và đáng tin cậy.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Giá trị cốt lõi của chúng tôi:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Khách hàng là trung tâm</li>
                        <li>Chất lượng sản phẩm đáng tin cậy</li>
                        <li>Hỗ trợ tận tình và nhanh chóng</li>
                        <li>Không ngừng đổi mới và cải tiến</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Chúng tôi tin rằng với sự đồng hành của bạn, chúng tôi
                        sẽ tiếp tục phát triển và mang đến nhiều giá trị hơn nữa
                        trong tương lai.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
