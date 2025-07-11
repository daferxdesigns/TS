import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import DangerButton from '@/Components/DangerButton.jsx';
import LinkButton from '@/Components/LinkButton.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState } from 'react';


export default function PostsIndex({ tickets, clients }) {
    const [statusFilter, setStatusFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const destroy = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tickets.destroy', { id }));
        }
    };

    const statusLabels = {
        open: 'Open',
        in_progress: 'In Progress',
        pending: 'Pending',
        resolved: 'Resolved',
        closed: 'Closed',
    };

 

    const filteredTickets = tickets.data
        .filter(ticket =>
            statusFilter ? ticket.status?.toLowerCase() === statusFilter.toLowerCase() : true
        )
        .filter(ticket => {
            const query = searchQuery.toLowerCase();
            return (
                ticket.ticket_number?.toLowerCase().includes(query) ||
                ticket.title?.toLowerCase().includes(query) ||
                ticket.serial_number?.toLowerCase().includes(query) ||
                clients[ticket.the_client]?.name?.toLowerCase().includes(query)
            );
        });

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

                                {/* ✅ Search and Filter Section */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search Ticket #, Title, Client, Serial #"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                                    />

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="pending">Pending</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>

                                        <Link
                                            href={route('tickets.create')}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                                        >
                                            Create A New Ticket
                                        </Link>
                                    </div>
                                </div>

                                {/* ✅ Table */}
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
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {ticket.ticket_number}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <Link
                                                        href={route('tickets.show', { id: ticket.id })}
                                                        className="text-blue-600 underline"
                                                    >
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {clients[ticket.the_client]?.id ? (
                                                <Link
                                                href={route('clients.show', { client: clients[ticket.the_client].id })}
                                                className="text-blue-600 underline"
                                                >
                                                {clients[ticket.the_client]?.name ?? 'N/A'}
                                                </Link>
                                            ) : (
                                                'N/A'
                                            )}
                                            </td>
                                                                                            </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full ${
                                                            ticket.status === 'open'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : ticket.status === 'in_progress'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : ticket.status === 'pending'
                                                                ? 'bg-orange-100 text-orange-800'
                                                                : ticket.status === 'resolved'
                                                                ? 'bg-green-100 text-green-800'
                                                                : ticket.status === 'closed'
                                                                ? 'bg-gray-200 text-gray-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        {statusLabels[ticket.status] ?? ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {ticket.serial_number}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    <LinkButton href={route('tickets.edit', { id: ticket.id })}>
                                                        Edit
                                                    </LinkButton>
                                                    <DangerButton
                                                        onClick={() => destroy(ticket.id)}
                                                        type="button"
                                                        className="ml-2 bg-red-600 px-3 py-2 text-xs font-semibold text-white uppercase tracking-widest rounded-md shadow-sm"
                                                    >
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
