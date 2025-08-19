/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../store/authSlice';
import type { AppDispatch } from '../../../core/store';
import { Chrome } from 'lucide-react';

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (options: {
                        client_id: string;
                        callback: (response: GoogleCredentialResponse) => void;
                        use_fedcm_for_prompt?: boolean;
                    }) => void;
                    renderButton: (
                        parent: HTMLElement,
                        options: {
                            theme?: 'outline' | 'filled_blue' | 'filled_black';
                            size?: 'large' | 'medium' | 'small';
                            text?:
                                | 'signin_with'
                                | 'signup_with'
                                | 'continue_with'
                                | 'signin';
                            width?: string | number;
                        }
                    ) => void;
                };
            };
        };
    }
}

interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
}

interface GoogleLoginButtonProps {
    onError?: (error: string) => void;
    disabled?: boolean;
    useCustomStyle?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
    onError,
    disabled = false,
    useCustomStyle = true,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const googleButtonRef = useRef<HTMLDivElement>(null);
    const hiddenButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGoogleScript = () => {
            if (window.google) {
                setIsGoogleLoaded(true);
                initializeGoogle();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;

            script.onload = () => {
                setIsGoogleLoaded(true);
                initializeGoogle();
            };

            script.onerror = () => {
                console.error('Failed to load Google Identity Services');
                setLoginError('Không thể tải dịch vụ đăng nhập Google');
                onError?.('Không thể tải dịch vụ đăng nhập Google');
            };

            document.head.appendChild(script);
        };

        const initializeGoogle = () => {
            if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
                console.error('Google client ID not found');
                setLoginError('Cấu hình Google không hợp lệ');
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                    use_fedcm_for_prompt: false,
                });

                // Render the actual Google button (hidden)
                if (hiddenButtonRef.current) {
                    window.google.accounts.id.renderButton(
                        hiddenButtonRef.current,
                        {
                            theme: 'outline',
                            size: 'large',
                            text: 'continue_with',
                            width: '300',
                        }
                    );
                }
            } catch (error) {
                console.error('Failed to initialize Google Sign-In:', error);
                setLoginError('Không thể khởi tạo đăng nhập Google');
                onError?.('Không thể khởi tạo đăng nhập Google');
            }
        };

        const handleCredentialResponse = async (
            response: GoogleCredentialResponse
        ) => {
            setIsLoading(true);
            setLoginError('');

            try {
                const result = await dispatch(
                    loginWithGoogle(response.credential)
                );

                if (loginWithGoogle.fulfilled.match(result)) {
                    navigate('/');
                } else {
                    const errorPayload = result.payload as any;
                    const errorMessage =
                        errorPayload?.message ||
                        result.error?.message ||
                        'Đăng nhập Google thất bại';
                    setLoginError(errorMessage);
                    onError?.(errorMessage);
                    console.error('Google login failed:', result.error);
                }
            } catch (error) {
                const errorMessage = 'Có lỗi xảy ra khi đăng nhập';
                setLoginError(errorMessage);
                onError?.(errorMessage);
                console.error('Google login error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadGoogleScript();
    }, [dispatch, navigate, onError]);

    const handleCustomButtonClick = () => {
        if (!isGoogleLoaded || disabled || isLoading) {
            return;
        }

        // Find and click the hidden Google button
        const googleButton = hiddenButtonRef.current?.querySelector(
            'div[role="button"]'
        ) as HTMLElement;
        if (googleButton) {
            googleButton.click();
        } else {
            console.error('Google button not found');
            setLoginError('Không thể tìm thấy nút đăng nhập Google');
            onError?.('Không thể tìm thấy nút đăng nhập Google');
        }
    };

    if (!useCustomStyle) {
        // Return the native Google button
        return (
            <div className="w-full">
                <div
                    ref={googleButtonRef}
                    className="w-full flex justify-center"
                ></div>
                {loginError && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{loginError}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Hidden Google button */}
            <div
                ref={hiddenButtonRef}
                className="hidden"
                style={{
                    display: 'none',
                    visibility: 'hidden',
                    position: 'absolute',
                    left: '-9999px',
                }}
            ></div>

            {/* Custom styled button */}
            <button
                type="button"
                onClick={handleCustomButtonClick}
                disabled={disabled || isLoading || !isGoogleLoaded}
                className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                ) : (
                    <Chrome className="w-5 h-5 text-gray-600" />
                )}
                {isLoading ? 'Đang xử lý...' : 'Tiếp tục với Google'}
            </button>

            {loginError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">
                        {loginError}
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoogleLoginButton;
