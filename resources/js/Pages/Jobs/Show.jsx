import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import { useState } from 'react';


export default function ShowJob({ job, clients, auth }) {
  const [newNote, setNewNote] = useState('');

  // Form state for adding a note
  const {
    data: noteData,
    setData: setNoteData,
    post: postNote,
    processing: processingNote,
    errors: noteErrors,
  } = useForm({
    note: '',
  });

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteData.note.trim()) return;

    postNote(route('outstandingjobs.notes.store', job.id), {
      preserveScroll: true,
      onSuccess: () => setNoteData('note', ''),
    });
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Job Details – {job.client ? `${job.client.name} ${job.client.lastname}` : 'No Client'}
          </h2>
          <a
            href={route('outstandingjobs.edit', { id: job.id })}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
          >
            Edit
          </a>
        </div>
      }
    >
      <Head title="Job Details" />

      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                <a href={route('clients.show', job.client.id)} className="text-blue-600 underline">
                  {job.client.name} {job.client.lastname}
                </a>
              ) : 'No client'}
            </p>
            <p><span className="font-medium">Installer: </span>{job.installer ? `${job.installer.first_name} ${job.installer.last_name}` : 'No installer'}</p>
          </div>
        </div>

        {/* Notes Timeline */}
        <div className="bg-white shadow-sm sm:rounded-lg p-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-6">Installer Notes Timeline</h3>

          <div className="relative border-l-2 border-gray-300 pl-6">
            {job.notes && job.notes.length > 0 ? (
              job.notes.map(note => (
                <div key={note.id} className="mb-8 relative">
                  <span className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-2 border-white"></span>
                  <div className="ml-4 bg-gray-50 p-4 rounded-md border">
                    <p className="text-sm text-gray-700">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {note.user?.name || 'Unknown'} on {new Date(note.created_at).toLocaleString(undefined, {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 ml-4">No activity yet.</p>
            )}
          </div>

          {/* Add New Note */}
          <form onSubmit={handleNoteSubmit} className="mt-6 flex flex-col gap-2">
            <textarea
              value={noteData.note}
              onChange={e => setNoteData('note', e.target.value)}
              placeholder="Leave a note..."
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200"
            />
            <InputError message={noteErrors.note} className="mt-2" />
            <PrimaryButton type="submit" disabled={processingNote}>
              Add Note
            </PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
