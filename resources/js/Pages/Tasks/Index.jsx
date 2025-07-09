import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage.jsx';
import DangerButton from '@/Components/DangerButton.jsx';
import LinkButton from '@/Components/LinkButton.jsx';
import Pagination from '@/Components/Pagination.jsx';

export default function PostsIndex({ tasks }) {
    const destroy = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tasks.destroy', { id }));
        }
    }

    const excerpt = (value, length = 50) => {
        return value.length > length ? value.substring(0, length) + '...' : value
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                            <div className="min-w-full align-middle">
                                <AlertMessage />

                                <Link href={route('tasks.create')} className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                    Add new task
                                </Link>

                                <table className="min-w-full divide-y divide-gray-200 border mt-4">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Name</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left">
                                                <span className="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">Description</span>
                                            </th>
                                            <th className="bg-gray-50 px-6 py-3 text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 divide-solid">
                                        {tasks && tasks.data && tasks.data.map((task) => (
                                            <tr key={task.id}>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    {task.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    {excerpt(task.description)}
                                                </td>
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                                    <LinkButton href={route('tasks.edit', { id: task.id })}>
                                                        Edit
                                                    </LinkButton>
                                                    <DangerButton onClick={() => destroy(task.id)} type="button" className="ml-2 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
                                                        Delete
                                                    </DangerButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination links={tasks.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
