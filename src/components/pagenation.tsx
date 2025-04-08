
interface PagenationProps {
    setPage: any,
    page: any,
    limit: any,
    setLimit: any
}

export default function Pagenation({ setPage, page, limit, setLimit }: PagenationProps) {
    return (
        <div className="d-flex justify-content-end align-items-center gap-2 mt-4 p-3">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded"
            >
                Prev
            </button>
            <span>Page {page}</span>
            <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
            >
                Next
            </button>

            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="ml-4 px-2 py-1 border rounded"
            >
                {[5, 10, 25, 50].map((l) => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>
        </div>

    )
}