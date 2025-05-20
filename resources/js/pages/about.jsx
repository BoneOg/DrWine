import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function About() {
  return (
    <>
      <Head/>
      <Layout>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
        <p className="text-gray-600">Learn about DrWine’s story and our amazing team.</p>
      </Layout>
    </>
  );
}
