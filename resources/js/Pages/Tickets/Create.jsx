import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import Select from 'react-select';

export default function Create({ users, clients, installers }) {
  // Safely convert objects to arrays if needed
  const safeClients = Array.isArray(clients) ? clients : Object.values(clients || {});
  const safeUsers = Array.isArray(users) ? users : Object.values(users || {});
  const safeInstallers = Array.isArray(installers) ? installers : Object.values(installers || {});

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    user_id: null,
    serial_number: '',
    the_client: null,
    installer_id: null,
  });

  const clientOptions = safeClients.map((client) => ({
    value: client.id,
    label: `${client.name} ${client.lastname}`,
  }));

  const userOptions = safeUsers.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const installerOptions = safeInstallers.map((installer) => ({
    value: installer.id,
    label: `${installer.first_name} ${installer.last_name}`,
  }));

  const submit = (e) => {
    e.preventDefault();
    post(route('tickets.store'));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          New Ticket
        </h2>
      }
    >
      <Head title="New Ticket" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-show shadow-sm sm:rounded-lg">
            <div className="overflow-show overflow-x-auto p-6 bg-white border-b border-gray-200">
              <form onSubmit={submit} className="min-w-full">
                <div>
                  <InputLabel htmlFor="title" value="Title" required />
                  <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title', e.target.value)}
                    required
                  />
                  <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="description" value="Description" required />
                  <TextInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('description', e.target.value)}
                    required
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="serial_number" value="Serial Number" />
                  <TextInput
                    id="serial_number"
                    type="text"
                    name="serial_number"
                    value={data.serial_number}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('serial_number', e.target.value)}
                    
                  />
                  <InputError message={errors.serial_number} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="the_client" value="Client" required />
                  <Select
  inputId="the_client"
  options={clientOptions}
  value={clientOptions.find((option) => option.value === data.the_client) || null}
  onChange={(option) => setData('the_client', option ? option.value : null)}
  className="mt-1"
  classNamePrefix="select"
  placeholder="Select a client..."
  isClearable
  menuPortalTarget={document.body} // ✅ renders menu outside overflow-hidden container
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ✅ keeps it on top
  }}
/>

                  <InputError message={errors.the_client} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_id" value="Assigned To" />
                  <Select
                    inputId="user_id"
                    options={userOptions}
                    value={userOptions.find((option) => option.value === data.user_id) || null}
                    onChange={(option) => setData('user_id', option ? option.value : null)}
                    className="mt-1"
                    classNamePrefix="select"
                    placeholder="Assign to user..."
                    isClearable
                  />
                  <InputError message={errors.user_id} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="installer_id" value="Assign Installer" />
                  <Select
                    inputId="installer_id"
                    options={installerOptions}
                    value={installerOptions.find((option) => option.value === data.installer_id) || null}
                    onChange={(option) => setData('installer_id', option ? option.value : null)}
                    className="mt-1"
                    classNamePrefix="select"
                    placeholder="Assign installer..."
                    isClearable
                  />
                  <InputError message={errors.installer_id} className="mt-2" />
                </div>

                <PrimaryButton className="mt-4" disabled={processing}>
                  Save Ticket
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
