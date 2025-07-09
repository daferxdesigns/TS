
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import DangerButton from '@/Components/DangerButton.jsx';
import LinkButton from '@/Components/LinkButton.jsx';
import Pagination from '@/Components/Pagination.jsx';



import { useState } from 'react';

export default function PostsIndex({ tickets,clients }) {
    const [statusFilter, setStatusFilter] = useState('');

    const destroy = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tickets.destroy', { id }));
        }
    };

    const excerpt = (value, length = 50) => {
        return value.length > length ? value.substring(0, length) + '...' : value;
    };

    const statusLabels = {
    open: 'Open',
    in_progress: 'In Progress',
    pending: 'Pending',
    resolved: 'Resolved',
    closed: 'Closed',
    };

    // Filter tickets by status if a filter is selected
    const filteredTickets = statusFilter
        ? tickets.data.filter(ticket => ticket.status?.toLowerCase() === statusFilter.toLowerCase())
        : tickets.data;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tickets
                </h2>
            }
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                            <div className="min-w-full align-middle">
                                <AlertMessage />

                                <div className="flex justify-between items-center mb-4">
                                    <Link href={route('tickets.create')} className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                      Create A New Ticket
                                    </Link>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="border-gray-300 rounded-md shadow-sm text-sm"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>

                                <table className="min-w-full divide-y divide-gray-200 border mt-4">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Ticket Number</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Title</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Client</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Status</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Serial Number</span>
                                            </th>
                                            
                                            <th className="bg-gray-50 px-6 py-3 text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 divide-solid">
                                        {filteredTickets.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    {ticket.ticket_number}
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    <Link href={route('tickets.show', { id: ticket.id })} className="text-blue-600 underline"> {ticket.title} </Link>
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    {clients[ticket.the_client]?.name ?? 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full
                                                            ${
                                                                ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                                                                ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                ticket.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                                ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                                ticket.status === 'closed' ? 'bg-gray-200 text-gray-700' :
                                                                'bg-gray-100 text-gray-600'
                                                            }`}
                                                    >
                                                        {statusLabels[ticket.status] ?? ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    {ticket.serial_number}
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    <LinkButton href={route('tickets.edit', { id: ticket.id })}>
                                                        Edit
                                                    </LinkButton>
                                                    <DangerButton onClick={() => destroy(ticket.id)} type="button" className="ml-2 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
                                                        Delete
                                                    </DangerButton>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination links={tickets.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
