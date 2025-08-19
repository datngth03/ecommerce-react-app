import axios from 'axios';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Đọc từ biến môi trường
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý token xác thực
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    // Gọi API làm mới token
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { refreshToken });
                    const { accessToken } = res.data;
                    localStorage.setItem('accessToken', accessToken);
                    httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    // Lặp lại request ban đầu với token mới
                    return httpClient(originalRequest);
                } catch (err) {
                    // Làm mới token thất bại, đăng xuất người dùng
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    }
);


export default httpClient;