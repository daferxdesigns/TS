import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

function DropdownMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

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
        type="button"
      >
        ⋮
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstallersIndex({ installers, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const destroy = (id) => {
    if (confirm('Are you sure you want to delete this installer?')) {
      router.delete(route('installers.destroy', id));
    }
  };

  useEffect(() => {
    const query = searchQuery.trim();

    const delayedSearch = debounce(() => {
      router.get(route('installers.index'), { search: query }, { preserveState: true, replace: true });
    }, 400);

    delayedSearch();

    return () => delayedSearch.cancel();
  }, [searchQuery]);

  const filteredInstallers = installers.data;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Installers</h2>}
    >
      <Head title="Installers" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <AlertMessage />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <Link
                  href={route('installers.create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition"
                >
                  + Add New Installer
                </Link>

                <input
                  type="text"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                />
              </div>

              <table className="min-w-full divide-y divide-gray-200 border">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Address</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact Number</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Battery</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Grid</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Solar</th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Forklift</th>
                    <th className="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInstallers.length > 0 ? (
                    filteredInstallers.map(installer => (
                      <tr key={installer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Link href={route('installers.show', installer.id)} className="text-blue-600 underline">
                            {installer.first_name} {installer.last_name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                          {installer.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {installer.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {installer.battery ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {installer.grid ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {installer.solar ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {installer.forklift ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <DropdownMenu
                            onEdit={() => router.visit(route('installers.edit', installer.id))}
                            onDelete={() => destroy(installer.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                        No installers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {installers.links && <Pagination links={installers.links} />}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
