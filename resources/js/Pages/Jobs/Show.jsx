import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ShowJob({ job, auth }) {
    const [newNote, setNewNote] = useState('');

    const submitNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        router.post(
            route('outstandingjobs.notes.store', job.id),
            { note: newNote },
            {
                onSuccess: () => setNewNote(''),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Job Details – {job.client ? `${job.client.name} ${job.client.lastname}` : 'No Client'}
                </h2>
            }
        >
            <Head title="Job Details" />

            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Job Info */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Job Information</h3>
                        <p><span className="font-medium">Componentry:</span> {job.componentry || '-'}</p>
                        <p><span className="font-medium">Installation Date:</span> {job.installation_date || '-'}</p>
                        <p><span className="font-medium">Pre Approval:</span> {job.pre_approval || '-'}</p>
                        <p><span className="font-medium">Sales:</span> {job.sales || '-'}</p>
                        <p><span className="font-medium">Rebate:</span> {job.rebate || '-'}</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Client & Installer</h3>
                        <p>
                            <span className="font-medium">Client: </span>
                            {job.client ? (
                                <Link href={route('clients.show', job.client.id)} className="text-blue-600 underline">
                                    {job.client.name} {job.client.lastname}
                                </Link>
                            ) : 'No client'}
                        </p>
                        <p><span className="font-medium">Installer: </span>{job.installer ? `${job.installer.first_name} ${job.installer.last_name}` : 'No installer'}</p>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="bg-white shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-6">Installer Notes</h3>

                    <div className="space-y-4">
                        {(job.notes && job.notes.length > 0) ? (
                            job.notes.map((note) => (
                                <div key={note.id} className="border rounded-md p-4 bg-gray-50">
                                    <p className="text-gray-700">{note.content}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        By {note.user?.name || 'Unknown'} on {note.created_at}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No activity yet.</p>
                        )}
                    </div>

                    {/* Add Note */}
                    <form onSubmit={submitNote} className="mt-6 flex flex-col gap-2">
                        <textarea
                            value={newNote}
                            onChange={e => setNewNote(e.target.value)}
                            placeholder="Leave a note..."
                            className="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                        />
                        <PrimaryButton type="submit">
                            Add Note
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
