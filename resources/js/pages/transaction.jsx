import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function Transaction() {
  return (
    <>
      <Head title="Transaction" />
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">
          <h1 className="text-3xl font-bold">Welcome to Transaction!</h1>
        </div>
      </Layout>
    </>
  );
}
