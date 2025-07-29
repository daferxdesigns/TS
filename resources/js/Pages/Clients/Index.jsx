import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState, useRef, useEffect } from 'react';

function DropdownMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-gray-200 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
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

export default function ClientsIndex({ clients }) {
  const [searchQuery, setSearchQuery] = useState('');

  const destroy = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      router.delete(route('clients.destroy', id));
    }
  };

  const filteredClients = clients.data.filter(client => {
    const query = searchQuery.toLowerCase();
    return (
      client.name?.toLowerCase().includes(query) ||
      client.lastname?.toLowerCase().includes(query)
    );
  });

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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                />
              </div>

              <table className="min-w-full divide-y divide-gray-200 border mt-4">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Address</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact Number</th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 divide-solid">
                  {filteredClients.length > 0 ? (
                    filteredClients.map(client => (
                      <tr key={client.id}>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <Link
                            href={route('clients.show', client.id)}
                            className="text-blue-600 underline"
                          >
                            {client.name} {client.lastname}
                          </Link>
                        </td>
                       
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate whitespace-nowrap">{client.address}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{client.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap text-right">
                          <DropdownMenu
                            onEdit={() => router.visit(route('clients.edit', client.id))}
                            onDelete={() => destroy(client.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
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
    </AuthenticatedLayout>
  );
}
