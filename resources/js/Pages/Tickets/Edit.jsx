import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import SelectInput from '@/Components/SelectInput.jsx';
import Select from 'react-select';

export default function Edit({ ticket, clients }) {



    const { data, setData, patch, processing, errors } = useForm({
        title: ticket.title || 'wala',
        description: ticket.description || 'wala',
           the_client: ticket.the_client || '',
        id: ticket.id || 'wala',
    });
 
    


    const submit = (e) => {
        e.preventDefault();

        patch(route('tickets.update', {id:ticket.id}));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Task
                </h2>
            }
        >
            <Head title="Edit Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                            <div className="min-w-full align-middle">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="title" value="Title" required />

                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="name"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />

                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="description" value="Description" required />

                                        <TextInput
                                            id="description"
                                            type="text"
                                            name="name"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('description', e.target.value)}
                                        />

                                        <InputError message={errors.description} className="mt-2" />
                                    </div>




                                <div className="mt-4 relative z-50">
                                    <InputLabel htmlFor="the_client" value="Assigned To" />

                                    <Select
                                        inputId="the_client"
                                        className="mt-1 w-full text-sm"
                                        classNamePrefix="react-select"
                                        options={clients}
                                        value={clients.find(option => option.value === parseInt(data.the_client || ticket.the_client))}
                                        onChange={(selectedOption) => setData('the_client', selectedOption?.value)}
                                        isClearable
                                        placeholder="Select a client..."
                                        menuPosition="absolute"
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                        }}
                                    />

                                    <InputError message={errors.the_client} className="mt-2" />
                                </div>

                                    <PrimaryButton className="mt-4" disabled={processing}> Save task </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
