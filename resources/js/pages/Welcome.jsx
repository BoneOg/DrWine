import { Head } from '@inertiajs/react';

export default function Welcome() {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">what haffen vella!</h1>
        <p className="mt-4 text-gray-600 text-lg">
          This is a basic welcome page built with Inertia.js and React.
        </p>
      </div>
    </>
  );
}
