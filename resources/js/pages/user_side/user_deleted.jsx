import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function UserDeleted({ message }) {
  return (
    <>
      <Head title="Account Deleted" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">{message}</h1>
          <p className="text-lg text-gray-700 mb-6">Your account has been deleted.</p>
          <Link
            href={route('reservation')}
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Back to Reservation
          </Link>
        </div>
      </Layout>
    </>
  );
}
