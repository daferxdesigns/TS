import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { CheckCircle2 } from 'lucide-react'; // make sure you run `npm install lucide-react`

export default function Edit({ auth, installer }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: installer.first_name || '',
        last_name: installer.last_name || '',
        phone: installer.phone || '',
        email_address: installer.email_address || '',
        address: installer.address || '',
        state: installer.state || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('installers.update', installer.id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Edit Installer" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main form */}
                    <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Installer</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name" required />
                                <TextInput id="first_name" type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name" required />
                                <TextInput id="last_name" type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.last_name} className="mt-2" />
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

                            <PrimaryButton disabled={processing}>Update Installer</PrimaryButton>
                        </form>
                    </div>

                    {/* Sidebar info */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border space-y-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Additional Information</h3>

                        <div className="text-sm text-gray-800">
                            <span className="font-medium">Business Name:</span>{' '}
                            {installer.business || 'N/A'}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <CheckCircle2 className={`w-5 h-5 ${installer.grid ? 'text-green-500' : 'text-gray-300'}`} />
                            Grid Connected
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <CheckCircle2 className={`w-5 h-5 ${installer.battery ? 'text-green-500' : 'text-gray-300'}`} />
                            Battery System
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <CheckCircle2 className={`w-5 h-5 ${installer.solar ? 'text-green-500' : 'text-gray-300'}`} />
                            Solar System
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
