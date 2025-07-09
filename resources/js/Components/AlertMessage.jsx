import { usePage } from '@inertiajs/react'

export default function AlertMessage({ className = '', ...props }) {
    const message = usePage().props.message;

    return (
        <div>
            {message && (
                <div
                    {...props}
                    className={
                        'w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 ' +
                        className
                    }
                >
                    { message }
                </div>
            )}
        </div>
    );
}
