// eslint-disable-next-line react/prop-types
export default function Button({ children, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-[150px] px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 hover:border-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    )
}
