// resources/js/pages/admin_side/users/Index.jsx
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../admin';
import { pickBy } from 'lodash';

export default function UserIndex({ users, filters }) {
    const { data, setData, get, post, delete: inertiaDelete } = useForm({
        search: filters.search || '',
        // Initialize with a combined sort value, default to username_asc
        sort_by_order: filters.sort_by_order || 'username_asc',
    });

    const handleFilterChange = (e) => {
        e.preventDefault();
        // Parse the combined sort_by_order value
        const [sortBy, sortOrder] = data.sort_by_order.split('_');

        get(route('admin.users.index', { search: data.search, sort_by: sortBy, sort_order: sortOrder }), {}, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            only: ['users', 'filters'],
        });
    };

    const handlePaginationClick = (e, url) => {
        e.preventDefault();
        get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const handleDelete = (userId, userName) => {
        if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
            inertiaDelete(route('admin.users.destroy', userId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Re-fetch users after deletion to update the list
                    get(route('admin.users.index'), pickBy(data), { preserveState: true, preserveScroll: true });
                },
                onError: (errors) => {
                    console.error("Delete Error:", errors);
                    alert(Object.values(errors).join('\n'));
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        <i className="fas fa-plus mr-2"></i> CREATE NEW USER
                    </Link>
                </div>

                {/* Filter and Sort Form Section */}
                <form onSubmit={handleFilterChange} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        {/* Search Input */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Name, username, or email..."
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                            />
                        </div>

                        {/* Combined Sort By Dropdown */}
                        <div>
                            <label htmlFor="sort_by_order" className="block text-sm font-medium text-gray-700 mb-1">Sort by...</label>
                            <select
                                name="sort_by_order"
                                id="sort_by_order"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={data.sort_by_order}
                                onChange={(e) => setData('sort_by_order', e.target.value)}
                            >
                                <option value="username_asc">Username ↑</option>
                                <option value="username_desc">Username ↓</option>
                                <option value="role_asc">Role ↑</option>
                                <option value="role_desc">Role ↓</option>
                                <option value="created_at_desc">Date Added ↓</option>
                                <option value="created_at_asc">Date Added ↑</option>
                            </select>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                APPLY FILTERS
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                onClick={() => {
                                    setData({ search: '', sort_by_order: 'username_asc' }); // Reset combined filter
                                    get(route('admin.users.index'), {}, { preserveState: true, replace: true, only: ['users', 'filters'] });
                                }}
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>
                </form>

                {/* User List Table or "No Users" Message */}
                {users.data.length === 0 ? (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                        <p className="font-bold">No users found</p>
                        <p>No users match your current search and filter criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Removed ID column header */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERNAME</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE ADDED</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        {/* Removed ID data cell */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(user.id, user.username)}
                                                className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Links */}
                {users.links && users.links.length > 3 && (
                    <nav className="mt-6 flex justify-center">
                        <ul className="flex items-center -space-x-px">
                            {users.links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            link.active
                                                ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''} ${
                                            index === 0 ? 'rounded-l-md' : ''
                                        } ${
                                            index === users.links.length - 1 ? 'rounded-r-md' : ''
                                        }`}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        onClick={(e) => link.url && handlePaginationClick(e, link.url)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </AdminLayout>
    );
}