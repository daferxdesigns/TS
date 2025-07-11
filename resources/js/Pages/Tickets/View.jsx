import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import { useState } from 'react';

export default function TicketView({ ticket, clients, assignedUser, auth }) {
  // Comment form state
  const { data, setData, post, processing, errors } = useForm({
    comment: '',
  });

  // Editable description state and form
  const [editingDesc, setEditingDesc] = useState(false);
  const { data: descData, setData: setDescData, put, processing: processingDesc, errors: descErrors } = useForm({
    description: ticket.description || '',
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    post(route('comments.store', ticket.id), {
      preserveScroll: true,
      onSuccess: () => setData('comment', ''),
    });
  };

  // Save description automatically when textarea loses focus (blur)
 const handleDescriptionBlur = () => {
   
  console.log('Saving description...', descData.description);
  put(route('tickets.update', ticket.id), {
    description: descData.description,
    preserveScroll: true,
    onSuccess: () => {
      console.log('Save success');
      setEditingDesc(false);
    },
    onError: (errors) => {
      console.error('Save error', errors);
      setEditingDesc(false);
    },
  });
};


  // Optional: cancel editing and reset description to original if user presses Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditingDesc(false);
      setDescData('description', ticket.description || '');
    }
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">View Ticket</h2>}
    >
      <Head title="View Ticket" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Info */}
              <div className="bg-white shadow-sm rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                <p className="text-sm text-gray-500">Ticket ID: #{ticket.ticket_number}</p>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Assigned To:</span>{' '}
                  {clients.find((c) => c.value === ticket.the_client)?.label || 'Unassigned'}
                </p>
                <p className="mt-1">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 text-xs font-semibold uppercase rounded-full ${
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
                    {ticket.status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </p>
              </div>

              {/* Editable Description */}
              <div className="bg-white shadow-sm rounded-lg p-6 border">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Description</h4>

                {editingDesc ? (
                  <>
                    <textarea
                      rows="6"
                      className="w-full border rounded-md p-2 text-sm"
                      value={descData.description}
                      onChange={(e) => setDescData('description', e.target.value)}
                      onBlur={handleDescriptionBlur}
                      onKeyDown={handleKeyDown}
                      disabled={processingDesc}
                      autoFocus
                    />
                    <InputError message={descErrors.description} className="mt-2" />
                  </>
                ) : (
                  <p
                    className="text-gray-700 whitespace-pre-line cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => setEditingDesc(true)}
                    title="Click to edit description"
                  >
                    {descData.description || 'Click to add description'}
                  </p>
                )}
              </div>

              {/* Add Comment */}
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

              {/* Display Comments */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Comments</h4>
                {ticket.comments.length === 0 ? (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {ticket.comments.map((c) => (
                      <div key={c.id} className="border-t pt-2 text-sm text-gray-700">
                        <p>{c.comment}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          — {c.user?.name ?? 'Unknown'} at {new Date(c.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white shadow-sm rounded-lg p-6 border">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Progress</h4>
                <p className="text-sm text-gray-700">
                  Status: <strong>{ticket.status.replace('_', ' ').toUpperCase()}</strong>
                </p>
              </div>

              <div className="bg-white shadow-sm rounded-lg p-6 border">
                <h4 className="text-md font-semibold text-gray-800 mb-2">People Involved</h4>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>
                    <span className="font-medium">Client:</span>{' '}
                    {clients.find((c) => c.value === ticket.the_client)?.label || 'Unassigned'}
                  </li>
                  <li>
                    <span className="font-medium">Installer:</span> Unassigned
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
