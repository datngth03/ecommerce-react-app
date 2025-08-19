// File: src/domains/user/services/userService.ts
import type { User } from '../types';

// Giả lập dữ liệu người dùng
let mockUser: User = {
    id: 'user-1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
};

export const userService = {
    // Giả lập API call để lấy thông tin người dùng
    fetchProfile: async (): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockUser);
            }, 500);
        });
    },

    // Giả lập API call để cập nhật thông tin người dùng
    updateProfile: async (updatedUser: User): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockUser = { ...mockUser, ...updatedUser };
                resolve(mockUser);
            }, 500);
        });
    },
};
