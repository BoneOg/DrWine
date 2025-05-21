import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function Checkout() {
  return (
    <>
      <Head title="Checkout" />
      <Layout>
        <div className="max-w-xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold">Reservation Confirmed!</h1>
          <p className="mt-4">Thank you. Your table has been reserved.</p>
        </div>
      </Layout>
    </>
  );
}
