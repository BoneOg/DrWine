import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function Menu() {
  return (
    <>
      <Head />
      <Layout>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Menu</h2>
        <p className="text-gray-600">Explore our selection of food and drinks.</p>
      </Layout>
    </>
  );
}
