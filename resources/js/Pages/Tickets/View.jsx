import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import Select from 'react-select';

export default function TicketView({ ticket, clients, assignedUser  }) {
    const { data, setData, patch, processing, errors } = useForm({
        comment: '', // for comment or update section
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // patch or post route here for comment submission
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Ticket
                </h2>
            }
        >
            <Head title="View Ticket" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* ✅ Main content area */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* ✅ Ticket Top Info */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border">
                                <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                                <p className="text-sm text-gray-500">Ticket ID: #{ticket.ticket_number}</p>
                                <p className="mt-2 text-sm text-gray-700">
                                    <span className="font-medium">Assigned To:</span>{' '}
                                    {
                                        clients.find(c => c.value === ticket.the_client)?.label || 'Unassigned'
                                    }
                                </p>
                                <p className="mt-1">
                                    <span className="font-medium">Status:</span>{' '}
                                    <span className={`px-2 py-1 text-xs font-semibold uppercase rounded-full
                                        ${
                                            ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                                            ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                            ticket.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                            ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                            ticket.status === 'closed' ? 'bg-gray-200 text-gray-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {ticket.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </span>
                                </p>
                            </div>

                            {/* ✅ Description */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border">
                                <h4 className="text-md font-semibold text-gray-800 mb-2">Description</h4>
                                <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
                            </div>

                            {/* ✅ Comment / Update Section */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border">
                                <h4 className="text-md font-semibold text-gray-800 mb-2">Add Update / Comment</h4>
                                <form onSubmit={handleCommentSubmit}>
                                    <textarea
                                        rows="4"
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        className="w-full border rounded-md p-2 text-sm"
                                        placeholder="Write your comment or update here..."
                                    />
                                    <InputError message={errors.comment} className="mt-2" />

                                    <PrimaryButton className="mt-4" disabled={processing}>
                                        Submit Comment
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>

                        {/* ✅ Right Sidebar */}
                        <div className="space-y-6">
                            {/* Progress Section */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border">
                                <h4 className="text-md font-semibold text-gray-800 mb-2">Progress</h4>
                                <p className="text-sm text-gray-700">Status: <strong>{ticket.status.replace('_', ' ').toUpperCase()}</strong></p>
                                {/* Optionally add progress bar here */}
                            </div>

                            {/* People Involved */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border">
                            <h4 className="text-md font-semibold text-gray-800 mb-2">People Involved</h4>
                           <ul className="text-sm text-gray-700 list-disc list-inside">
                            <li>
                                <span className="font-medium">Client:</span>{' '}
                                {clients.find(c => c.value === ticket.the_client)?.label || 'Unassigned'}
                            </li>
                            <li>
                                <span className="font-medium">Assigned Agent:</span>{' '}
                                {assignedUser?.name || 'Unassigned'}
                            </li>
                        </ul>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
