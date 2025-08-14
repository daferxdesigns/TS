import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState } from 'react';

function DropdownMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        ⋮
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientsIndex({ clients, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const destroy = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      router.delete(route('clients.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Clients</h2>}
    >
      <Head title="Clients" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
              <AlertMessage />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <Link
                  href={route('clients.create')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                >
                  + Add New Client
                </Link>

                <input
                  type="text"
                  placeholder="Search by Name or Lastname"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // Send search to backend
                    router.get(route('clients.index'), { search: e.target.value }, { preserveState: true, replace: true });
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                />
              </div>

              <table className="min-w-full divide-y divide-gray-200 border mt-4 text-sm">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Name</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Address</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Contact Number</th>
                    <th className="bg-gray-50 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.data.length > 0 ? (
                    clients.data.map(client => (
                      <tr key={client.id}>
                        <td className="px-4 py-2 text-blue-600 underline whitespace-nowrap">
                          <Link href={route('clients.show', client.id)}>
                            {client.name} {client.lastname}
                          </Link>
                        </td>
                        <td className="px-4 py-2 max-w-xs truncate">{client.address}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{client.phone}</td>
                        <td className="px-4 py-2 text-right">
                          <DropdownMenu
                            onEdit={() => router.visit(route('clients.edit', client.id))}
                            onDelete={() => destroy(client.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                        No clients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination works when not searching */}
              {clients.links && <Pagination links={clients.links} />}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
