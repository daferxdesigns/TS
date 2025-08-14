import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        last_name: '',
        phone: '',
        email_address: '',
        address: '',
        suburb:'',
        state: '',
        postcode: '',
    });

   const submit = (e) => {
    e.preventDefault();

    // If email is empty, set it to "POSTAL"
    const emailToSubmit = data.email_address.trim() === '' ? 'POSTAL' : data.email_address;

    // Validate email format if it's not "POSTAL"
    if (emailToSubmit !== 'POSTAL' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToSubmit)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Submit the form with possibly updated email
    post(route('clients.store'), {
        data: {
            ...data,
            email_address: emailToSubmit,
        },
    });
};

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Client
                </h2>
            }
        >
            <Head title="Add Client" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>

                                {/* First Name */}
                                <div>
                                    <InputLabel htmlFor="name" value="First Name" required />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Last Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="lastname" value="Last Name" required />

                                    <TextInput
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        value={data.lastlastname_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('lastname', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>

                                {/* Contact Number */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Contact Number" required />

                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={data.contact_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="email_address" value="Email" />

                                    <TextInput
                                        id="email_address"
                                        name="email_address"
                                        type="text"
                                        value={data.email_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email_address', e.target.value)}
                                        
                                    />

                                    <InputError message={errors.email_address} className="mt-2" />
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
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                 <div className="mt-4">
                                    <InputLabel htmlFor="suburb" value="Suburb" required />

                                    <TextInput
                                        id="suburb"
                                        name="suburb"
                                        type="text"
                                        value={data.suburb}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('suburb', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.address} className="mt-2" />
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
                                        onChange={(e) => setData('state', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.state} className="mt-2" />
                                </div>

                                {/* Zip Code */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="postcode" value="Post Code" required />

                                    <TextInput
                                        id="postcode"
                                        name="postcode"
                                        type="text"
                                        value={data.postcode}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('postcode', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.zip_code} className="mt-2" />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Add Client
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
