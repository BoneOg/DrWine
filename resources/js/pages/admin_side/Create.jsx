import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from './admin_sidebar';

export default function UserCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '', // **ADD USERNAME FIELD**
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    // ... submit function ...

    return (
        <AdminLayout>
            <Head title="Create New User" />
            <div className="container mt-4">
                {/* ... header ... */}
                <div className="card shadow-sm p-4">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label> {/* **ADD USERNAME INPUT** */}
                            <input
                                id="username"
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required // Username is typically required and unique
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name (Optional)</label> {/* **CHANGE LABEL FOR NAME** */}
                            <input
                                id="name"
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                // Make 'required' optional or remove if 'name' is truly optional
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        {/* ... email, password, confirm password, role fields ... */}

                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing ? 'Creating...' : 'Create User'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}