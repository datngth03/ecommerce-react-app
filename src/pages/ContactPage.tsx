import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('📨 Tin nhắn của bạn đã được gửi!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Liên hệ
                    </h1>
                    <p className="text-gray-600">
                        Hãy để lại lời nhắn cho chúng tôi
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên của bạn"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Lời nhắn"
                            rows={4}
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition"
                        >
                            Gửi tin nhắn
                        </button>
                    </form>

                    <div className="flex justify-between text-gray-600">
                        <p className="flex items-center gap-2">
                            <Phone className="w-5 h-5" /> 0123-456-789
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail className="w-5 h-5" /> support@example.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
