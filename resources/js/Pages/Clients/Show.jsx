import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, clients }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Client: ${clients.name} ${clients.lastname}`} />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Panel - Profile Summary */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-600">
                            {clients.name.charAt(0)}{clients.lastname.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold mt-4">{clients.name} {clients.lastname}</h2>
                        <p className="text-gray-500 text-sm">Client ID: #{clients.id}</p>

                        <div className="mt-6 space-y-2 w-full text-left">
                            <p><span className="font-semibold">Phone:</span> {clients.phone}</p>
                            <p><span className="font-semibold">Email:</span> {clients.email_address || 'N/A'}</p>
                            <p><span className="font-semibold">Address:</span><br /> {clients.address}</p>
                            <p><span className="font-semibold">Suburb:</span> {clients.suburb}</p>
                            <p><span className="font-semibold">State:</span> {clients.state}</p>
                            <p><span className="font-semibold">Postcode:</span> {clients.postcode}</p>
                        </div>
                    </div>

                    {/* Right Panel - Tickets */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
                        <h3 className="text-2xl font-bold mb-4">Related Tickets</h3>

                        {clients.tickets && clients.tickets.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {clients.tickets.map(ticket => (
                                    <li key={ticket.id} className="py-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Link 
                                                    href={route('tickets.show', { id: ticket.id })}
                                                    className="text-lg font-semibold text-blue-600 hover:underline"
                                                >
                                                    {ticket.title}
                                                </Link>
                                                <p className="text-sm text-gray-500">Status: {ticket.status}</p>
                                            </div>
                                            <span className="text-sm text-gray-400">Ticket ID: #{ticket.id}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No tickets found for this client.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
