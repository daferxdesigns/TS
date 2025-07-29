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
        forklift: false,
        certificate_of_currency: '',
        electrical_contractor_number: '',
        expiry_date: '',
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
                forklift: data.forklift ? 1 : 0,
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
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* Two columns grid for text inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                    <div>
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

                                    {/* Business Name */}
                                    <div>
                                        <InputLabel htmlFor="business" value="Business Name" required />
                                        <TextInput
                                            id="business"
                                            name="business"
                                            type="text"
                                            value={data.business}
                                            className="mt-1 block w-full"
                                            onChange={e => setData('business', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.business} className="mt-2" />
                                    </div>

                                    {/* Certificate of Currency */}
                                    <div>
                                        <InputLabel htmlFor="certificate_of_currency" value="Certificate of Currency" />
                                        <TextInput
                                            id="certificate_of_currency"
                                            name="certificate_of_currency"
                                            type="text"
                                            value={data.certificate_of_currency}
                                            className="mt-1 block w-full"
                                            onChange={e => setData('certificate_of_currency', e.target.value)}
                                        />
                                        <InputError message={errors.certificate_of_currency} className="mt-2" />
                                    </div>

                                    {/* Electrical Contractor Number */}
                                    <div>
                                        <InputLabel htmlFor="electrical_contractor_number" value="Electrical Contractor Number" />
                                        <TextInput
                                            id="electrical_contractor_number"
                                            name="electrical_contractor_number"
                                            type="text"
                                            value={data.electrical_contractor_number}
                                            className="mt-1 block w-full"
                                            onChange={e => setData('electrical_contractor_number', e.target.value)}
                                        />
                                        <InputError message={errors.electrical_contractor_number} className="mt-2" />
                                    </div>

                                    {/* License Expiry */}
                                    <div>
                                        <InputLabel htmlFor="expiry_date" value="License Expiry" />
                                        <TextInput
                                            id="expiry_date"
                                            name="expiry_date"
                                            type="date"
                                            value={data.expiry_date}
                                            className="mt-1 block w-full"
                                            onChange={e => setData('expiry_date', e.target.value)}
                                        />
                                        <InputError message={errors.expiry_date} className="mt-2" />
                                    </div>
                                </div>

                                {/* Checkboxes inline */}
                                <div className="mt-6 flex flex-wrap gap-6">
                                    <div className="flex items-center">
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

                                    <div className="flex items-center">
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

                                    <div className="flex items-center">
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

                                    <div className="flex items-center">
                                        <input type="hidden" name="forklift" value="0" />
                                        <input
                                            id="forklift"
                                            name="forklift"
                                            type="checkbox"
                                            checked={data.forklift}
                                            onChange={e => setData('forklift', e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="forklift" className="text-sm font-medium text-gray-700">
                                            Forklift
                                        </label>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="mt-8">
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
