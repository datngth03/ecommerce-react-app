type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => (
    <div className="flex justify-center items-center space-x-2 mt-8">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
            Trước
        </button>
        <span className="px-4 py-2 border rounded-md bg-cyan-600 text-white font-bold">
            {currentPage}
        </span>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
            Sau
        </button>
    </div>
);
export default Pagination;
