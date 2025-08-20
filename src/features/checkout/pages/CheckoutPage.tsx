import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import type { RootState } from '../../../core/store';
import type { Product } from '../../../domains/products/types';

interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    sameAsShipping: boolean;
}

interface CartItemType {
    product: Product;
    quantity: number;
}
// --- Dữ liệu giả cho items ---
const MOCK_CART_ITEMS: CartItemType[] = [
    {
        product: {
            id: '1',
            name: 'Áo thun nam',
            slug: 'ao-thun-nam',
            description: 'Áo thun cotton thoáng mát',
            price: 199000,
            originalPrice: 250000,
            discount: 20,
            rating: 4.5,
            reviewCount: 120,
            images: ['/img/shirt1.jpg'],
            brand: {
                id: 'b1',
                name: 'Local Brand',
                slug: 'local-brand',
                logo: '/img/brand-logo.png',
                description: 'Thương hiệu thời trang local nổi tiếng',
                categories: ['ao-thun', 'quan-jeans'],
            },
            category: { id: 'c1', name: 'Áo thun', slug: 'ao-thun' },
            inStock: true,
            stockCount: 50,
            tags: ['hot', 'new'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        quantity: 2,
    },
    {
        product: {
            id: '2',
            name: 'Quần jeans nam',
            slug: 'quan-jeans-nam',
            description: 'Quần jeans form slim fit',
            price: 499000,
            rating: 4.7,
            reviewCount: 80,
            images: ['/img/jeans.jpg'],
            brand: {
                id: 'b2',
                name: 'Denim Pro',
                slug: 'Denim Pro',
                logo: '/img/brand-logo.png',
                description: 'Thương hiệu thời trang local nổi tiếng',
                categories: ['ao-thun', 'quan-jeans'],
            },
            category: { id: 'c2', name: 'Quần jeans', slug: 'quan-jeans' },
            inStock: true,
            stockCount: 30,
            tags: ['best-seller'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        quantity: 1,
    },
];

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    // Sử dụng useState để giả lập dữ liệu từ Redux
    const [items] = useState<CartItemType[]>(MOCK_CART_ITEMS);
    // const { items } = useSelector((state: RootState) => state.cart);

    const [currentStep, setCurrentStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Vietnam',
    });

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        sameAsShipping: true,
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [items, navigate]);

    // Calculate totals
    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const steps = [
        { id: 1, title: 'Thông tin giao hàng', icon: '📍' },
        { id: 2, title: 'Phương thức thanh toán', icon: '💳' },
        { id: 3, title: 'Xác nhận đơn hàng', icon: '✅' },
    ];

    const validateShipping = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!shippingInfo.firstName.trim())
            newErrors.firstName = 'Vui lòng nhập họ';
        if (!shippingInfo.lastName.trim())
            newErrors.lastName = 'Vui lòng nhập tên';
        if (!shippingInfo.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
            newErrors.email = 'Email không hợp lệ';
        if (!shippingInfo.phone.trim())
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        if (!shippingInfo.address.trim())
            newErrors.address = 'Vui lòng nhập địa chỉ';
        if (!shippingInfo.city.trim())
            newErrors.city = 'Vui lòng nhập thành phố';
        if (!shippingInfo.zipCode.trim())
            newErrors.zipCode = 'Vui lòng nhập mã bưu chính';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!paymentInfo.cardNumber.replace(/\s/g, ''))
            newErrors.cardNumber = 'Vui lòng nhập số thẻ';
        else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16)
            newErrors.cardNumber = 'Số thẻ không hợp lệ';
        if (!paymentInfo.expiryDate)
            newErrors.expiryDate = 'Vui lòng nhập ngày hết hạn';
        if (!paymentInfo.cvv) newErrors.cvv = 'Vui lòng nhập CVV';
        else if (paymentInfo.cvv.length < 3) newErrors.cvv = 'CVV không hợp lệ';
        if (!paymentInfo.cardholderName.trim())
            newErrors.cardholderName = 'Vui lòng nhập tên chủ thẻ';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateShipping()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validatePayment()) {
            setCurrentStep(3);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Redirect to success page or show success message
        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
        navigate('/');
        setIsProcessing(false);
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    if (items.length === 0) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Thanh toán
                    </h1>
                    <p className="text-gray-600">Hoàn tất đơn hàng của bạn</p>
                </div>

                {/* Progress Steps */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${
                                        currentStep >= step.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    {currentStep > step.id ? '✓' : step.icon}
                                </div>
                                <div className="ml-3">
                                    <p
                                        className={`text-sm font-medium ${
                                            currentStep >= step.id
                                                ? 'text-blue-600'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Bước {step.id}
                                    </p>
                                    <p
                                        className={`text-xs ${
                                            currentStep >= step.id
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`hidden md:block w-20 h-0.5 ml-8 ${
                                            currentStep > step.id
                                                ? 'bg-blue-600'
                                                : 'bg-gray-200'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 mb-8 lg:mb-0">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {/* Step 1: Shipping Information */}
                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Thông tin giao hàng
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingInfo.firstName}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.firstName
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập họ của bạn"
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingInfo.lastName}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.lastName
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập tên của bạn"
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={shippingInfo.email}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.email
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="email@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại *
                                            </label>
                                            <input
                                                type="tel"
                                                value={shippingInfo.phone}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.phone
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="0123456789"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Địa chỉ *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingInfo.address}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        address: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.address
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="Số nhà, tên đường"
                                            />
                                            {errors.address && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.address}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thành phố *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingInfo.city}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        city: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.city
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="Hồ Chí Minh"
                                            />
                                            {errors.city && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tỉnh/Thành phố
                                            </label>
                                            <select
                                                value={shippingInfo.state}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        state: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">
                                                    Chọn tỉnh/thành
                                                </option>
                                                <option value="HCM">
                                                    TP. Hồ Chí Minh
                                                </option>
                                                <option value="HN">
                                                    Hà Nội
                                                </option>
                                                <option value="DN">
                                                    Đà Nẵng
                                                </option>
                                                <option value="HP">
                                                    Hải Phòng
                                                </option>
                                                <option value="CT">
                                                    Cần Thơ
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mã bưu chính *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingInfo.zipCode}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        zipCode: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.zipCode
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="70000"
                                            />
                                            {errors.zipCode && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.zipCode}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Quốc gia
                                            </label>
                                            <select
                                                value={shippingInfo.country}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        country: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="Vietnam">
                                                    Việt Nam
                                                </option>
                                                <option value="USA">
                                                    United States
                                                </option>
                                                <option value="Canada">
                                                    Canada
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Information */}
                            {currentStep === 2 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Thông tin thanh toán
                                    </h2>

                                    {/* Payment Methods */}
                                    <div className="mb-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="border-2 border-blue-600 rounded-lg p-4 text-center bg-blue-50">
                                                <div className="text-2xl mb-2">
                                                    💳
                                                </div>
                                                <p className="text-sm font-medium text-blue-700">
                                                    Thẻ tín dụng
                                                </p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 text-center opacity-50">
                                                <div className="text-2xl mb-2">
                                                    📱
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Ví điện tử
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    (Sắp có)
                                                </p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 text-center opacity-50">
                                                <div className="text-2xl mb-2">
                                                    🏦
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Chuyển khoản
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    (Sắp có)
                                                </p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 text-center opacity-50">
                                                <div className="text-2xl mb-2">
                                                    💵
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Tiền mặt
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    (Sắp có)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số thẻ *
                                            </label>
                                            <input
                                                type="text"
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardNumber:
                                                            formatCardNumber(
                                                                e.target.value
                                                            ),
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.cardNumber
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                            />
                                            {errors.cardNumber && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.cardNumber}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ngày hết hạn *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        paymentInfo.expiryDate
                                                    }
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            expiryDate:
                                                                formatExpiryDate(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        })
                                                    }
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.expiryDate
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                    }`}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                />
                                                {errors.expiryDate && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.expiryDate}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={paymentInfo.cvv}
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            cvv: e.target.value.replace(
                                                                /\D/g,
                                                                ''
                                                            ),
                                                        })
                                                    }
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.cvv
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                    }`}
                                                    placeholder="123"
                                                    maxLength={4}
                                                />
                                                {errors.cvv && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.cvv}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên chủ thẻ *
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    paymentInfo.cardholderName
                                                }
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardholderName:
                                                            e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.cardholderName
                                                        ? 'border-red-500'
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="NGUYEN VAN A"
                                            />
                                            {errors.cardholderName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.cardholderName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="sameAsShipping"
                                                checked={
                                                    paymentInfo.sameAsShipping
                                                }
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        sameAsShipping:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="sameAsShipping"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Địa chỉ thanh toán giống địa chỉ
                                                giao hàng
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Order Confirmation */}
                            {currentStep === 3 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Xác nhận đơn hàng
                                    </h2>

                                    {/* Order Summary */}
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Sản phẩm đã đặt
                                            </h3>
                                            {items.map((item) => (
                                                <div
                                                    key={item.product.id}
                                                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Số lượng:{' '}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        $
                                                        {(
                                                            item.product.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Địa chỉ giao hàng
                                            </h3>
                                            <p>
                                                {shippingInfo.firstName}{' '}
                                                {shippingInfo.lastName}
                                            </p>
                                            <p>{shippingInfo.address}</p>
                                            <p>
                                                {shippingInfo.city},{' '}
                                                {shippingInfo.state}{' '}
                                                {shippingInfo.zipCode}
                                            </p>
                                            <p>{shippingInfo.country}</p>
                                            <p className="mt-2">
                                                📧 {shippingInfo.email}
                                            </p>
                                            <p>📱 {shippingInfo.phone}</p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">
                                                Phương thức thanh toán
                                            </h3>
                                            <p>
                                                💳 Thẻ tín dụng kết thúc bằng{' '}
                                                {paymentInfo.cardNumber.slice(
                                                    -4
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {paymentInfo.cardholderName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                                <div>
                                    {currentStep > 1 && (
                                        <button
                                            onClick={() =>
                                                setCurrentStep(currentStep - 1)
                                            }
                                            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                                />
                                            </svg>
                                            Quay lại
                                        </button>
                                    )}
                                </div>

                                <div>
                                    {currentStep < 3 ? (
                                        <button
                                            onClick={handleNext}
                                            className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Tiếp tục
                                            <svg
                                                className="w-5 h-5 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isProcessing}
                                            className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Đặt hàng
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Tóm tắt đơn hàng
                            </h3>

                            {/* Items Summary */}
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {item.quantity}x
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ${item.product.price} ×{' '}
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                $
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Tạm tính ({totalItems} sản phẩm)
                                    </span>
                                    <span className="text-gray-900">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Phí vận chuyển
                                    </span>
                                    <span
                                        className={`${shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}`}
                                    >
                                        {shipping === 0
                                            ? 'Miễn phí'
                                            : `${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                {shipping > 0 && subtotal < 50 && (
                                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                                        💡 Mua thêm $
                                        {(50 - subtotal).toFixed(2)} để miễn phí
                                        vận chuyển!
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Thuế (8%)
                                    </span>
                                    <span className="text-gray-900">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">
                                            Tổng cộng
                                        </span>
                                        <span className="text-lg font-bold text-green-600">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Security & Guarantees */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        Thanh toán an toàn SSL
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Đảm bảo hoàn tiền 30 ngày
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        Giao hàng nhanh 2-3 ngày
                                    </div>
                                </div>
                            </div>

                            {/* Support Contact */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-2">
                                    Cần hỗ trợ?
                                </p>
                                <div className="space-y-1">
                                    <a
                                        href="tel:1900-xxxx"
                                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        Hotline: 1900-xxxx
                                    </a>
                                    <a
                                        href="mailto:support@example.com"
                                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        support@example.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Back to Cart */}
                        <div className="mt-6">
                            <Link
                                to="/cart"
                                className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 font-medium transition-colors py-2"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    />
                                </svg>
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
