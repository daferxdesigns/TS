import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import Select from 'react-select';

export default function Edit({ ticket, clients, users }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title || '',
        serial_number: ticket.serial_number || '',
        description: ticket.description || '',
        the_client: ticket.the_client || '',
        user_id: ticket.user_id || '', // 👈 Added for assigning user
        id: ticket.id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tickets.update', { id: ticket.id }));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Task</h2>}
        >
            <Head title="Edit Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                            <div className="min-w-full align-middle">
                                <form onSubmit={submit}>
                                    {/* Title */}
                                    <div>
                                        <InputLabel htmlFor="title" value="Title" required />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    {/* Serial Number */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="serial_number" value="Serial Number" />
                                        <TextInput
                                            id="serial_number"
                                            type="text"
                                            value={data.serial_number}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('serial_number', e.target.value)}
                                        />
                                        <InputError message={errors.serial_number} className="mt-2" />
                                    </div>

                                    {/* Description */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="description" value="Description" required />
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                            rows="5"
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    {/* Assigned Client */}
                                    <div className="mt-4 relative z-40">
                                        <InputLabel htmlFor="the_client" value="Assigned To (Client)" />
                                        <Select
                                            inputId="the_client"
                                            className="mt-1 w-full text-sm"
                                            classNamePrefix="react-select"
                                            options={clients}
                                            value={clients.find(option => option.value === parseInt(data.the_client))}
                                            onChange={(selectedOption) => setData('the_client', selectedOption?.value)}
                                            isClearable
                                            placeholder="Select a client..."
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                        <InputError message={errors.the_client} className="mt-2" />
                                    </div>

                                    {/* Assigned User (Linked to tickets.user_id) */}
                                    <div className="mt-4 relative z-30">
                                        <InputLabel htmlFor="user_id" value="Assign to User" />
                                        <Select
                                            inputId="user_id"
                                            className="mt-1 w-full text-sm"
                                            classNamePrefix="react-select"
                                            options={users}
                                            value={users.find(option => option.value === parseInt(data.user_id))}
                                            onChange={(selectedOption) => setData('user_id', selectedOption?.value)}
                                            isClearable
                                            placeholder="Select a user..."
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                        <InputError message={errors.user_id} className="mt-2" />
                                    </div>

                                    {/* Save Button */}
                                    <PrimaryButton className="mt-4" disabled={processing}>
                                        Save Task
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
