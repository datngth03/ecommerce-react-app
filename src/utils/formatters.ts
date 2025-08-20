
const formatPrice = (price: number | bigint) => {
    // Check if the price is a valid number
    if (typeof price !== 'number' || isNaN(price)) {
        return 'N/A';
    }

    // Use Intl.NumberFormat to handle locale-specific formatting.
    // 'vi-VN' uses dot (.) for thousands separator.
    // 'minimumFractionDigits: 2' ensures that the number always has at least two decimal places.
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 2,
    }).format(price);
};

export default formatPrice;