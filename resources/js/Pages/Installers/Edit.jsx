import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, installer }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: installer.first_name || '',
        last_name: installer.last_name || '',
        phone: installer.phone || '',
        email_address: installer.email_address || '',
        address: installer.address || '',
        state: installer.state || '',
        business: installer.business || '',
        grid: installer.grid == 1 ? 1 : 0,
        battery: installer.battery == 1 ? 1 : 0,
        solar: installer.solar == 1 ? 1 : 0,
        forklift: installer.forklift == 1 ? 1 : 0,
        electrical_contractor_number: installer.electrical_contractor_number || '',
        certificate_of_currency: installer.certificate_of_currency || '',
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

                            <div>
                                <InputLabel htmlFor="business" value="Business Name" />
                                <TextInput id="business" type="text" value={data.business} onChange={(e) => setData('business', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.business} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="electrical_contractor_number" value="Electrical Contractor Number" />
                                <TextInput id="electrical_contractor_number" type="text" value={data.electrical_contractor_number} onChange={(e) => setData('electrical_contractor_number', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.electrical_contractor_number} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="certificate_of_currency" value="Certificate of Currency" />
                                <TextInput id="certificate_of_currency" type="text" value={data.certificate_of_currency} onChange={(e) => setData('certificate_of_currency', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.certificate_of_currency} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.grid === 1}
                                        onChange={(e) => setData('grid', e.target.checked ? 1 : 0)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">Grid Connected</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.battery === 1}
                                        onChange={(e) => setData('battery', e.target.checked ? 1 : 0)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">Battery System</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.solar === 1}
                                        onChange={(e) => setData('solar', e.target.checked ? 1 : 0)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">Solar System</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.forklift === 1}
                                        onChange={(e) => setData('forklift', e.target.checked ? 1 : 0)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">Forklift</span>
                                </label>
                            </div>

                            <div className="pt-6">
                                <PrimaryButton disabled={processing}>Update Installer</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border space-y-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Current Info</h3>

                        <div className="text-sm text-gray-800">
                            <span className="font-medium">Business:</span> {installer.business || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-800">
                            <span className="font-medium">Electrical No.:</span> {installer.electrical_contractor_number || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-800">
                            <span className="font-medium">Certificate:</span> {installer.certificate_of_currency || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
