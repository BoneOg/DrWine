import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function Checkout() {
  return (
    <>
      <Head title="Checkout" />
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-xl mx-auto p-6 text-center bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold text-green-600">Reservation Confirmed!</h1>
            <p className="mt-4 text-gray-700">Thank you. Your table has been reserved.</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
