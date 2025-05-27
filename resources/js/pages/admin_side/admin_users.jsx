// resources/js/pages/admin_side/users/Index.jsx
import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../admin'; // Assuming admin.jsx is your main admin layout
import { pickBy } from 'lodash'; // You might need to install lodash: npm install lodash

// resources/js/pages/admin_side/users/Index.jsx
// ... imports ...

export default function UserIndex({ users, filters }) {
    const { data, setData, get, post, delete: inertiaDelete } = useForm({
        search: filters.search || '',
        sort_by: filters.sort_by || 'username', // **CHANGE DEFAULT SORT TO 'username'**
        sort_order: filters.sort_order || 'asc',
    });

    // ... handleFilterChange, handlePaginationClick, handleDelete functions ...

    return (
        <AdminLayout>
            <Head title="Admin Users" />
            <div className="container-fluid mt-4">
                {/* ... other parts ... */}

                {/* Search and Sort Form - Adjust options if needed */}
                <form onSubmit={handleFilterChange} className="mb-4 bg-light p-3 rounded shadow-sm">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <label htmlFor="search" className="form-label visually-hidden">Search</label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="form-control"
                                placeholder="Search by name, username or email..." // Update placeholder
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="sort_by" className="form-label visually-hidden">Sort By</label>
                            <select
                                name="sort_by"
                                id="sort_by"
                                className="form-select"
                                value={data.sort_by}
                                onChange={(e) => setData('sort_by', e.target.value)}
                            >
                                <option value="username">Username (Alphabetical)</option> {/* **CHANGE TO USERNAME** */}
                                <option value="name">Name (Alphabetical)</option>       {/* New option */}
                                <option value="created_at">Date Added</option>
                                <option value="role">Role</option>
                            </select>
                        </div>
                        {/* ... rest of the form ... */}
                    </div>
                </form>

                {/* Table display */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Username</th> {/* **CHANGE HEADER** */}
                                <th>Name</th>    {/* **ADD HEADER FOR NEW NAME FIELD** */}
                                <th>Email</th>
                                <th>Role</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td> {/* **DISPLAY USERNAME** */}
                                    <td>{user.name || 'N/A'}</td> {/* **DISPLAY NEW NAME FIELD** */}
                                    <td>{user.email}</td>
                                    <td>{user.role || 'user'}</td>
                                    <td>{new Date(user.created_at).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user.id, user.username)} // Use username for confirm
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... pagination ... */}
            </div>
        </AdminLayout>
    );
}