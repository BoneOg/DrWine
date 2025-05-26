    import React from 'react';
    import { Head } from '@inertiajs/react';

    export default function Transaction({ transaction }) { // Renamed to Transaction to match file for clarity
        // Destructure nested data for easier access
        const { reservation } = transaction;
        const customer = reservation?.customer; // Optional chaining in case reservation or customer is null

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
                <Head title="Transaction Details" />

                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-2xl border border-gray-200">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                        Transaction Details
                    </h1>

                    {transaction ? (
                        <div className="space-y-5">
                            {/* Customer Information Section */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h2 className="text-xl font-semibold text-blue-700 mb-3">Customer Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                    <p>
                                        <strong className="font-medium text-gray-800">Name:</strong> {customer?.name || 'N/A'}
                                    </p>
                                    <p>
                                        <strong className="font-medium text-gray-800">Phone:</strong> {customer?.phone || 'N/A'}
                                    </p>
                                    <p className="col-span-1 sm:col-span-2">
                                        <strong className="font-medium text-gray-800">Email:</strong> {customer?.email || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Reservation Details Section */}
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h2 className="text-xl font-semibold text-green-700 mb-3">Reservation Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                    {(() => {
                                    const dateTime = new Date(reservation?.date_time);
                                    const dateStr = dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
                                    const timeStr = dateTime.toLocaleTimeString('en-US', {
                                        timeZone: 'UTC',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

                                    return (
                                        <>
                                        <p>
                                            <strong className="font-medium text-gray-800">Date:</strong> {dateStr}
                                        </p>
                                        <p>
                                            <strong className="font-medium text-gray-800">Time Slot:</strong> {timeStr}
                                        </p>
                                        </>
                                    );
                                    })()}
                                    <p>
                                        <strong className="font-medium text-gray-800">Guest Size:</strong> {reservation?.size || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Payment and Status Section */}
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">Payment & Status</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                    <p>
                                        <strong className="font-medium text-gray-800">Payment Method:</strong> {transaction.payment_method || 'N/A'}
                                    </p>
                                    <p>
                                        <strong className="font-medium text-gray-800">Reservation Fee:</strong> ${parseFloat(transaction.amount).toFixed(2) || '0.00'}
                                    </p>
                                    <p className="col-span-1 sm:col-span-2">
                                        <strong className="font-medium text-gray-800">Status:</strong>
                                        <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            Confirmed
                                        </span>
                                    </p>
                                    <p className="col-span-1 sm:col-span-2 text-sm text-gray-500">
                                        <strong className="font-medium text-gray-800">Transaction ID:</strong> {transaction.transactionID || transaction.id || 'N/A'}
                                    </p>
                                    <p className="col-span-1 sm:col-span-2 text-sm text-gray-500">
                                        <strong className="font-medium text-gray-800">Date & Time:</strong> {new Date(transaction.created_at).toLocaleString() || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg">No transaction details found.</p>
                    )}

                    <div className="mt-8 text-center">
                        <a
                            href="/" // Link back to home or another relevant page
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Go to Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    