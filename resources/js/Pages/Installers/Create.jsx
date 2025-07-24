import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function CreateInstaller() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        suburb: '',
        state: '',
        postcode: '',
        battery: false,
        grid: false,
        solar: false,
    });

    const submit = (e) => {
        e.preventDefault();

        // Convert boolean to 1 or 0 before sending
        post(route('installers.store'), {
            data: {
                ...data,
                battery: data.battery ? 1 : 0,
                grid: data.grid ? 1 : 0,
                solar: data.solar ? 1 : 0,
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Installer
                </h2>
            }
        >
            <Head title="Add Installer" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* First Name */}
                                <div>
                                    <InputLabel htmlFor="first_name" value="First Name" required />
                                    <TextInput
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={data.first_name}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('first_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>

                                {/* Last Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="last_name" value="Last Name" required />
                                    <TextInput
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={data.last_name}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('last_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>

                                {/* Phone */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Contact Number" required />
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('phone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" required />
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Address */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" required />
                                    <TextInput
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('address', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                {/* Suburb */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="suburb" value="Suburb" required />
                                    <TextInput
                                        id="suburb"
                                        name="suburb"
                                        type="text"
                                        value={data.suburb}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('suburb', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.suburb} className="mt-2" />
                                </div>

                                {/* State */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="state" value="State" required />
                                    <TextInput
                                        id="state"
                                        name="state"
                                        type="text"
                                        value={data.state}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('state', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.state} className="mt-2" />
                                </div>

                                {/* Postcode */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="postcode" value="Postcode" required />
                                    <TextInput
                                        id="postcode"
                                        name="postcode"
                                        type="text"
                                        value={data.postcode}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('postcode', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.postcode} className="mt-2" />
                                </div>

                                {/* Battery */}
                                <div className="mt-4 flex items-center">
                                    <input type="hidden" name="battery" value="0" />
                                    <input
                                        id="battery"
                                        name="battery"
                                        type="checkbox"
                                        checked={data.battery}
                                        onChange={e => setData('battery', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="battery" className="text-sm font-medium text-gray-700">
                                        Battery
                                    </label>
                                </div>

                                {/* Grid */}
                                <div className="mt-2 flex items-center">
                                    <input type="hidden" name="grid" value="0" />
                                    <input
                                        id="grid"
                                        name="grid"
                                        type="checkbox"
                                        checked={data.grid}
                                        onChange={e => setData('grid', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="grid" className="text-sm font-medium text-gray-700">
                                        Grid
                                    </label>
                                </div>

                                {/* Solar */}
                                <div className="mt-2 flex items-center">
                                    <input type="hidden" name="solar" value="0" />
                                    <input
                                        id="solar"
                                        name="solar"
                                        type="checkbox"
                                        checked={data.solar}
                                        onChange={e => setData('solar', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="solar" className="text-sm font-medium text-gray-700">
                                        Solar
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Add Installer
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
