import { RefreshCw } from 'lucide-react';

const ErrorMessage = ({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) => (
    <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg p-6">
        <p className="text-lg font-medium mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
                <RefreshCw className="inline-block mr-2" size={16} /> Thử lại
            </button>
        )}
    </div>
);
export default ErrorMessage;
