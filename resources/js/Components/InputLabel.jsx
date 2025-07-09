export default function InputLabel({
    value,
    required = false,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}{required && (
                <span>*</span>
        )}
        </label>
    );
}
