
type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function MoviePagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
        <div className="flex items-center justify-center gap-3 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 cursor-pointer rounded flex items-center justify-center text-white font-bold text-base transition-colors ${page === currentPage ? "bg-[#2BD17E]" : "bg-[#092C39]"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="cursor-pointer text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}
