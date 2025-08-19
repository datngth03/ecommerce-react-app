import httpClient from '../../../core/api/http-client';

export const authService = {
    login: async (credentials: unknown) => {
        const response = await httpClient.post('/auth/login', credentials);
        const { accessToken, refreshToken, user } = response.data;
        // Lưu token vào localStorage để sử dụng sau này
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return user;
    },
    loginWithGoogle: async (token: string) => {
        const response = await httpClient.post('/auth/google-login', { token });
        const { accessToken, refreshToken, user } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return user;
    },


    register: async (userData: unknown) => {
        const response = await httpClient.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },
};