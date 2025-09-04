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

export default function OutstandingJobsIndex({ jobs, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const destroy = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      router.delete(route('outstandingjobs.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Outstanding Jobs</h2>}
    >
      <Head title="Outstanding Jobs" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
              <AlertMessage />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <Link
                  href={route('outstandingjobs.create')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                >
                  + Add New Job
                </Link>

                <input
                  type="text"
                  placeholder="Search by Client or Installer"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    router.get(route('outstandingjobs.index'), { search: e.target.value }, { preserveState: true, replace: true });
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-80"
                />
              </div>

              <table className="min-w-full divide-y divide-gray-200 border mt-4 text-sm">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Client</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Installer</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Componentry</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Installation Date</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Notes</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Pre Approval</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Sales</th>
                    <th className="bg-gray-50 px-4 py-2 text-left font-medium uppercase text-gray-500">Rebate</th>
                    <th className="bg-gray-50 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.data.length > 0 ? (
                    jobs.data.map(job => (
                      <tr key={job.id}>
                        <td className="px-4 py-2 text-blue-600 underline whitespace-nowrap">
                          <Link href={route('outstandingjobs.show', job.id)}>
                            {job.client?.name || '-'} {job.client?.lastname || ''}
                          </Link>
                        </td>
                 <td className="px-4 py-2 whitespace-nowrap">
  {job.installer ? `${job.installer.first_name} ${job.installer.last_name}` : '-'}
</td>
                        <td className="px-4 py-2">{job.componentry}</td>
                        <td className="px-4 py-2">{job.installation_date}</td>
                        <td className="px-4 py-2">{job.notes}</td>
                        <td className="px-4 py-2">{job.pre_approval}</td>
                        <td className="px-4 py-2">{job.sales}</td>
                        <td className="px-4 py-2">{job.rebate}</td>
                        <td className="px-4 py-2 text-right">
                          <DropdownMenu
                            onEdit={() => router.visit(route('outstandingjobs.edit', job.id))}
                            onDelete={() => destroy(job.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-2 text-center text-gray-500">
                        No jobs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {jobs.links && <Pagination links={jobs.links} />}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
