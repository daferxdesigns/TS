import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import DangerButton from '@/Components/DangerButton.jsx';
import LinkButton from '@/Components/LinkButton.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState } from 'react';

export default function ClientsIndex({ clients }) {
    const [searchQuery, setSearchQuery] = useState('');

    const destroy = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('clients.destroy', { client: id }));
        }
    };

    // Filter clients by name or lastname matching search query
    const filteredClients = clients.data.filter(client => {
        const query = searchQuery.toLowerCase();
        return (
            client.name.toLowerCase().includes(query) ||
            client.lastname.toLowerCase().includes(query)
        );
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Clients
                </h2>
            }
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                            <div className="min-w-full align-middle">
                                <AlertMessage />

                              {/* Header controls */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                    <Link
                                        href={route('clients.create')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition"
                                    >
                                        + Add New Client
                                    </Link>

                                    <input
                                        type="text"
                                        placeholder="Search by Name or Lastname"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                                    />
                                </div>
                                {/* Clients Table */}
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Name
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Lastname
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Address
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                                Contact Number
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 divide-solid">
                                        {filteredClients.length > 0 ? (
                                            filteredClients.map(client => (
                                                <tr key={client.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                       <Link href={route('clients.show', { client: client.id })} className="text-blue-600 underline">
                                                        {client.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.lastname}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                                        {client.address}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.phone}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <LinkButton href={`/clients/${client.id}/edit`}>
                                                            Edit
                                                        </LinkButton>
                                                        <DangerButton
                                                            onClick={() => destroy(client.id)}
                                                            type="button"
                                                            className="ml-2 bg-red-600 px-3 py-2 text-xs font-semibold text-white uppercase tracking-widest rounded-md shadow-sm"
                                                        >
                                                            Delete
                                                        </DangerButton>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    No clients found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {clients.links && <Pagination links={clients.links} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
