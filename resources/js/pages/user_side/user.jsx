// resources/js/pages/user_side/user.jsx

import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function UserDashboard({ user, customer, transactions }) {
  const handleLogout = () => {
    router.post('/logout');
  };

  const handleDelete = () => {
    if (
      confirm('Are you sure you want to delete your account? This action cannot be undone.')
    ) {
      router.post(route('user.delete'));
    }
  };

  return (
    <>
      <Head title="User Dashboard" />
      <Layout>
        <div className="min-h-screen max-w-5xl mx-auto pt-28 px-6 md:px-8 pb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Welcome, {customer?.name || user.username}!
          </h1>

          {/* Profile Info */}
          <div className="mb-10 bg-white shadow rounded p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile Information</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {customer?.email || user.email}</p>
              <p><strong>Phone Number:</strong> {customer?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mb-10 bg-white shadow rounded p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaction History</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Transaction ID</th>
                      <th className="px-4 py-2 border">Amount</th>
                      <th className="px-4 py-2 border">Type</th>
                      <th className="px-4 py-2 border">Payment</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Reservation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.transactionID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 border">{transaction.transactionID}</td>
                        <td className="px-4 py-2 border">${transaction.amount.toFixed(2)}</td>
                        <td className="px-4 py-2 border">{transaction.transaction_type}</td>
                        <td className="px-4 py-2 border">{transaction.payment_method}</td>
                        <td className="px-4 py-2 border">
                          <span className={`px-2 py-1 rounded text-white text-xs font-semibold
                            ${transaction.status === 'paid' ? 'bg-green-500' :
                              transaction.status === 'pending' ? 'bg-yellow-500' :
                              transaction.status === 'failed' ? 'bg-red-500' :
                              'bg-gray-400'}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {transaction.reservation?.date_time
                            ? (() => {
                                const dateTime = new Date(transaction.reservation.date_time);
                                const dateStr = dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
                                const timeStr = dateTime.toLocaleTimeString('en-US', {
                                  timeZone: 'UTC',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                });
                                return `${dateStr} ${timeStr}`;
                              })()
                            : 'N/A'}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
