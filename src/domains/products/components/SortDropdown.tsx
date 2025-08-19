type Option = {
    value: string;
    label: string;
};

type SortDropdownProps = {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
};

const SortDropdown = ({ value, onChange, options }: SortDropdownProps) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M9.293 12.95l.707.707L15 10l-5-5-.707.707L13.586 9H4v2h9.586l-4.293 4.293z" />
            </svg>
        </div>
    </div>
);

export default SortDropdown;
