import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function UserDashboard({ user, customer, transactions }) {
  const handleLogout = () => {
    router.post('/logout');
  };

const handleDelete = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    router.delete(route('user.delete'));
  }
};
  return (
    <>
      <Head title="User Dashboard" />
      <Layout>
        <div className="min-h-screen max-w-4xl mx-auto p-6 pt-28">
          <h1 className="text-4xl font-bold mb-6">Welcome, {customer?.name || user.username}!</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Profile Information</h2>
            <p><strong>Email:</strong> {customer?.email || user.email}</p>
            <p><strong>Phone Number:</strong> {customer?.phone || 'N/A'}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Transaction ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Reservation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.transactionID} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{transaction.transactionID}</td>
                      <td className="border border-gray-300 px-4 py-2">${transaction.amount.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaction.transaction_type}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaction.payment_method}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaction.status}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaction.reservation?.date_time
                          ? new Date(transaction.created_at).toLocaleString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
