import { Link, useForm } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    usernameOrEmail: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-16 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Left Side: Wine Image */}
        <div className="hidden md:flex md:w-1/2 items-end justify-center relative bg-black">
          <img
            src="/assets/login-image.png"
            alt="Wine Glass"
            className="max-h-full md:max-h-[95%] w-auto object-contain absolute bottom-0"
          />
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="bg-black rounded-lg p-6 md:p-10 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              <span className="text-red-500">W</span>elcome back!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="usernameOrEmail"
                value={data.usernameOrEmail}
                onChange={(e) => setData('usernameOrEmail', e.target.value)}
                placeholder="Email or Username"
                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              {errors.usernameOrEmail && <p className="text-red-500">{errors.usernameOrEmail}</p>}
              {errors.password && <p className="text-red-500">{errors.password}</p>}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition"
              >
                {processing ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="mt-4 text-center text-white text-sm">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-red-500 hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Logo and Slogan */}
      <div className="text-center text-gray-800 px-4 mb-16">
        <img src="/assets/logo1.png" alt="Logo" className="mx-auto h-14 md:h-20 mb-3" />
        <p className="text-lg md:text-2xl font-serif">where food meets royalty</p>
      </div>
    </Layout>
  );
}
