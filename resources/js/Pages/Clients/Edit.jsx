import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, client }) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        lastname: client.lastname || '',
        phone: client.phone || '',
        email_address: client.email_address || '',
        address: client.address || '',
        state: client.state || '',
        postcode: client.postcode || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('clients.update', client.id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Edit Client" />

            <div className="py-12 max-w-4xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Client</h2>
                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <InputLabel htmlFor="name" value="First Name" required />
                            <TextInput id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="lastname" value="Last Name" required />
                            <TextInput id="lastname" type="text" value={data.lastname} onChange={(e) => setData('lastname', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.lastname} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Contact Number" />
                            <TextInput id="phone" type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email_address" value="Email" />
                            <TextInput id="email_address" type="email" value={data.email_address} onChange={(e) => setData('email_address', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.email_address} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="state" value="State" />
                            <TextInput id="state" type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.state} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="postcode" value="Zip Code" />
                            <TextInput id="postcode" type="text" value={data.postcode} onChange={(e) => setData('postcode', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.postcode} className="mt-2" />
                        </div>

                        <PrimaryButton disabled={processing}>Update Client</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
