import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div
            className="mt-4 flex items-center justify-center rounded-lg px-3 py-2 text-sm text-gray-600"
        >
            {links && links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url ?? ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={
                        'mt-4 flex items-center justify-center rounded-lg px-3 py-2 text-sm text-gray-600 ' +
                        (link.active ? 'bg-gray-200' : '') +
                        (!link.url ? '!text-gray-300' : '')
                    }
                />
            ))}
        </div>
    );
};
