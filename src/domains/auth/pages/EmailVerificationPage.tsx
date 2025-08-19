import React, { useState } from 'react';
import { MailCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);
    const navigate = useNavigate();

    const handleResend = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResent(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                    <MailCheck className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Xác minh email của bạn
                </h1>
                <p className="text-gray-600 mb-6">
                    Chúng tôi đã gửi liên kết xác minh đến email của bạn. Vui
                    lòng kiểm tra hộp thư.
                </p>

                {resent && (
                    <p className="text-green-600 text-sm mb-4">
                        Liên kết mới đã được gửi!
                    </p>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <>
                                Gửi lại liên kết
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full border border-gray-200 py-3 px-6 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Quay lại đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
