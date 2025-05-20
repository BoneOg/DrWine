import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
  return (
    <>
      <Head/>
      <Layout>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-gray-600">Reach out to us for any inquiries or reservations.</p>
      </Layout>
    </>
  );
}
