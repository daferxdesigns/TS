import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function InstallerProfile({ auth, installer }) {
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={`${installer.first_name} ${installer.last_name} Profile`} />

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-md shadow-md p-8 relative">
            {/* Installer Name */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              {installer.first_name} {installer.last_name}
            </h1>
            {/* Business Name */}
            <p className="text-gray-500 text-lg mb-6">
              {installer.business || 'No Business Name'}
            </p>

            {/* Edit link top-right */}
            <Link
              href={route('installers.edit', installer.id)}
              className="absolute top-6 right-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Edit Profile
            </Link>

            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Contact</h2>
                <p>Phone: {installer.phone || 'N/A'}</p>
                <p>Email: {installer.email_address || 'N/A'}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Address</h2>
                <p>{installer.address || 'N/A'}</p>
                <p>{installer.suburb || ''} {installer.state || ''} {installer.postcode || ''}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Licensing</h2>
                <p>Electrical Contractor No: {installer.electrical_contractor_number || 'N/A'}</p>
                <p>Certificate of Currency: {installer.certificate_of_currency || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bg-gray-50 rounded-md shadow-md p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Systems Connected
            </h2>

            {['grid', 'battery', 'solar', 'forklift'].map((system) => (
              <div key={system} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    installer[system] === 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {installer[system] === 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="capitalize text-gray-800 font-medium">
                  {{
                    grid: 'Grid Connected',
                    battery: 'Battery System',
                    solar: 'Solar System',
                    forklift: 'Forklift Certified',
                  }[system]}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
