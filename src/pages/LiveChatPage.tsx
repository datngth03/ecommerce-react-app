import React, { useState } from 'react';

const LiveChatPage: React.FC = () => {
    const [messages, setMessages] = useState<
        { from: 'user' | 'bot'; text: string }[]
    >([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: 'user', text: input }]);
        setInput('');

        // fake bot reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    from: 'bot',
                    text: 'Cảm ơn bạn, chúng tôi sẽ phản hồi sớm nhất!',
                },
            ]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Chat</h1>

            <div className="w-full max-w-md flex flex-col bg-white rounded-xl shadow p-4">
                <div className="flex-1 overflow-y-auto mb-4 max-h-80 space-y-2">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-2 rounded-lg max-w-xs ${
                                msg.from === 'user'
                                    ? 'bg-blue-500 text-white ml-auto'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveChatPage;
