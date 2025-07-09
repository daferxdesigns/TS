import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import SelectInput from '@/Components/SelectInput.jsx';

export default function Edit({ task, users }) {
    
    const { data, setData, patch, processing, errors } = useForm({
        name: task.name,
        description: task.description,
        user_id: task.user_id,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('tasks.update', {id:task.id}));
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
                                        <InputLabel htmlFor="name" value="Name" required />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <InputError message={errors.name} className="mt-2" />
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

                                    <div className="mt-4">
                                        <InputLabel htmlFor="user_id" value="Assigned To" />

                                        <SelectInput
                                            options={users}
                                            value={data.user_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('user_id', e.target.value)}
                                        />

                                        <InputError message={errors.user_id} className="mt-2" />
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
