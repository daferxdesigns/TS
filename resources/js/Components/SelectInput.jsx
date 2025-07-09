export default function SelectInput({
        options = {},
        className = '',
        ...props
}) {
    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
        >
            <option value="">-- please choose the option --</option>
            {Object.entries(options).map(([id, name]) => (
                <option key={id} value={id}>
                    {name}
                </option>
            ))}
        </select>
    );
};
